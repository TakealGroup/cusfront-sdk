// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  _resetAnalyticsForTests,
  identify,
  initAnalytics,
  maskRecordedText,
  page,
  posthogDistinctId,
  resetAnalytics,
  sanitizeProperties,
  sanitizeUrl,
  setAnalyticsConsent,
  setAnalyticsZone,
  track,
  type AnalyticsOptions,
  type PostHogLike,
} from "./analytics.js";
import { analyticsIds, forgetAnalyticsIds } from "./resources/attribution.js";

/**
 * The analytics layer. PostHog is a fake handed in through `load` (or put
 * in place of the script), Metrica is observed through `window.ym` and the
 * script tags on the page. Nothing leaves the test.
 */

const UUID = "3f2a9c1e-7b4d-4e8a-9f10-2b3c4d5e6f70";

type Fake = { [K in keyof PostHogLike]-?: ReturnType<typeof vi.fn> };

function fakePostHog(): Fake {
  return {
    init: vi.fn(),
    capture: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
    get_distinct_id: vi.fn(() => "ph-distinct-1"),
    register: vi.fn(),
    set_config: vi.fn(),
    startSessionRecording: vi.fn(),
    stopSessionRecording: vi.fn(),
    opt_in_capturing: vi.fn(),
    opt_out_capturing: vi.fn(),
  };
}

const w = window as unknown as { ym?: { a?: unknown[][] }; posthog?: unknown };
const flush = () => new Promise((r) => setTimeout(r, 0));
const scripts = () => Array.from(document.querySelectorAll("script")).map((s) => s.src);
const ymCalls = () => (w.ym?.a ?? []).map((args) => Array.from(args as ArrayLike<unknown>));

async function start(
  opts: Partial<AnalyticsOptions> & Pick<AnalyticsOptions, "zone">,
  ph = fakePostHog(),
) {
  initAnalytics({
    posthog: {
      key: "phc_test",
      host: "https://example.com/ingest",
      load: async () => ph as unknown as PostHogLike,
    },
    metrika: { counterId: 12345678 },
    ...opts,
  });
  await flush();
  return ph;
}

function initConfig(ph: Fake): Record<string, unknown> {
  return ph.init.mock.calls[0]![1] as Record<string, unknown>;
}

type MaskTextFn = (text: string, element?: Element | null) => string;

/** The `maskTextFn` handed to rrweb at init. */
function maskText(ph: Fake): MaskTextFn {
  const rec = initConfig(ph).session_recording as { maskTextFn: MaskTextFn };
  return rec.maskTextFn;
}

function recording(sessionRecording: boolean | undefined, ph: Fake) {
  return {
    key: "k",
    sessionRecording,
    load: async () => ph as unknown as PostHogLike,
  };
}

/** Every config a zone change handed to posthog-js. */
function zoneChanges(ph: Fake): Record<string, unknown>[] {
  return ph.set_config.mock.calls.map((c) => c[0] as Record<string, unknown>);
}

afterEach(() => {
  _resetAnalyticsForTests();
  delete w.ym;
  delete w.posthog;
  document.head.innerHTML = "";
  vi.restoreAllMocks();
});

describe("sanitizeUrl", () => {
  it("cuts ids from the path, secrets from the query and drops the fragment", () => {
    expect(
      sanitizeUrl(
        `https://example.com/cards/${UUID}/details?utm_source=tg&token=abc&email=a%40b.io&card=4242&page=2#k=v`,
      ),
    ).toBe("https://example.com/cards/:id/details?utm_source=tg&card=:id&page=:id");
  });

  it("handles numeric ids, hex and long tokens, and relative addresses", () => {
    expect(sanitizeUrl("/u/12345/r/9f8e7d6c5b4a39281706f5e4d3c2b1a0")).toBe("/u/:id/r/:id");
    expect(sanitizeUrl("/reset/aZ3kP9qL2mN8xV4bR7tY1wE")).toBe("/reset/:id");
    expect(sanitizeUrl(`/cards/card-${UUID}`)).toBe("/cards/card-:id");
  });

  it("keeps slugs and campaign tags", () => {
    expect(
      sanitizeUrl("https://example.com/blog/how-to-top-up-2026?utm_campaign=spring-2026"),
    ).toBe("https://example.com/blog/how-to-top-up-2026?utm_campaign=spring-2026");
  });

  it("drops a parameter whose value is an address or a phone", () => {
    expect(sanitizeUrl("/?ref=john%40example.com&q=%2B7%20999%20123-45-67&lang=ru")).toBe(
      "/?lang=ru",
    );
  });
});

describe("advertising fields", () => {
  // Synthetic values throughout; the shapes are those an ad account fills in.
  const YCLID = "12345678901234567890";
  const SAMPLES = [
    // Short and long ids with prefixes.
    `https://example.com/?utm_source=yandex&utm_medium=cpc&utm_campaign=yd-123456789&utm_content=ad-8765432101-search&yclid=${YCLID}`,
    // Eight-digit ids, the case that worked before.
    `https://example.com/?utm_source=yandex&utm_medium=cpc&utm_campaign=yd-12345678&utm_content=ad-87654321&yclid=${YCLID}`,
    // The agency template: {campaign_name_lat}_{campaign_id}, {ad_id}, {keyword}.
    `https://example.com/landing?utm_source=yandex&utm_medium=cpc&utm_campaign=Brand_Search_rf_Card%20for%20things_C1_700000001&utm_content=17000000001&utm_term=virtual+card&yclid=${YCLID}`,
    // A bare 9-, 10- and 15-digit id.
    "https://example.com/?utm_campaign=700000001&utm_content=7000000001&utm_term=700000000000001",
    // Text codes.
    "https://example.com/?utm_source=telegram&utm_medium=post&utm_campaign=spring-promo&utm_content=banner.v2",
    // Other click ids.
    "https://example.com/?gclid=Cj0KCQiA_test-Value.1~x&fbclid=IwAR0synthetic_Value-1&msclkid=0123456789abcdef0123456789abcdef&rb_clickid=900000001-abc",
  ];

  it("keeps campaign tags and click ids byte for byte", () => {
    for (const url of SAMPLES) expect(sanitizeUrl(url)).toBe(url);
  });

  it("drops an address, a phone, a token or a card number in a tag, and only that tag", () => {
    const base = `https://example.com/?utm_source=yandex&utm_campaign=Brand_C1_700000001&yclid=${YCLID}`;
    const smuggled = [
      "utm_content=me%40example.invalid",
      "utm_content=call-%2B7%20900%20000-00-00",
      "utm_term=8%20(900)%20000-00-00",
      "utm_term=900-000-00-00",
      "utm_content=4242%204242%204242%204242",
      "utm_content=card-4242424242424242",
      "utm_content=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.c2lnbmF0dXJlLXRlc3Q",
      "utm_term=key_sk3Tq9Lz7Xc2Vb8Nm4Kd6Fg1",
    ];
    for (const extra of smuggled) {
      expect(sanitizeUrl(`${base}&${extra}`), extra).toBe(base);
    }
  });

  it("still drops personal data in other parameters of the same address", () => {
    const base = `https://example.com/?utm_source=yandex&utm_campaign=Brand_C1_700000001&utm_content=17000000001&yclid=${YCLID}`;
    expect(
      sanitizeUrl(
        `${base}&ref=me%40example.invalid&q=%2B7%20900%20000-00-00&n=4242424242424242&token=abc&order=700000001&lang=ru`,
      ),
    ).toBe(`${base}&lang=ru`);
    // A bare id outside the tags is still an id.
    expect(sanitizeUrl("https://example.com/?page=12&yclid=1")).toBe(
      "https://example.com/?page=:id&yclid=1",
    );
  });

  it("drops a click id with characters no click id has", () => {
    expect(sanitizeUrl("https://example.com/?gclid=me%40example.invalid&lang=ru")).toBe(
      "https://example.com/?lang=ru",
    );
    expect(sanitizeUrl("https://example.com/?yclid=%2B7%20900%20000%2000%2000")).toBe(
      "https://example.com/",
    );
  });

  it("the page view reaches Metrica with the tags and the 20-digit yclid, and the touch carries the same address", async () => {
    const url = SAMPLES[0]!;
    await start({ zone: "public", initialPageview: false });
    page(url);
    const hit = ymCalls().find((c) => c[1] === "hit");
    expect(hit?.[2]).toBe(url);
    expect(new URL(hit?.[2] as string).searchParams.get("yclid")).toBe(YCLID);
  });

  it("PostHog's copies of the tags keep their ids, the filter still holds for the rest", () => {
    expect(
      sanitizeProperties({
        utm_campaign: "Brand_C1_700000001",
        $initial_utm_content: "17000000001",
        $initial_gclid: "Cj0KCQiA_test",
        yclid: YCLID,
        utm_term: "+7 900 000-00-00",
        order: "700000001",
      }),
    ).toEqual({
      utm_campaign: "Brand_C1_700000001",
      $initial_utm_content: "17000000001",
      $initial_gclid: "Cj0KCQiA_test",
      yclid: YCLID,
    });
  });
});

describe("sanitizeProperties", () => {
  it("drops personal keys, keeps money and company names", () => {
    const out = sanitizeProperties({
      email: "a@b.io",
      user_email: "x",
      phone: "1",
      phoneNumber: "1",
      name: "Alice",
      first_name: "Alice",
      lastName: "Smith",
      holder_name: "ALICE SMITH",
      username: "alice",
      amount_minor: 1234567890,
      amount: "1234567890",
      currency: "USD",
      merchant_name: "Steam",
      plan: "pro",
    });
    expect(out).toEqual({
      amount_minor: 1234567890,
      amount: "1234567890",
      currency: "USD",
      merchant_name: "Steam",
      plan: "pro",
    });
  });

  it("drops values that look like an e-mail, a phone or a card number, and redacts them inside text", () => {
    const out = sanitizeProperties({
      contact: "alice@example.com",
      note: "+7 (999) 123-45-67",
      pan: "4242 4242 4242 4242",
      label: "Write to support@example.com or call +44 20 7946 0958",
      last4: "4242",
      when: "2026-09-28T10:00:00Z",
    });
    expect(out).toEqual({
      label: "Write to [email] or call [number]",
      last4: "4242",
      when: "2026-09-28T10:00:00Z",
    });
  });

  it("cleans page addresses and nested autocapture data, and leaves PostHog's own ids alone", () => {
    const out = sanitizeProperties({
      $current_url: `https://example.com/cards/${UUID}?token=x`,
      $pathname: "/cards/123",
      $session_id: "01924d7e-1234-7000-8000-123456789012",
      distinct_id: "12345678-1234-4123-8123-123456789012",
      $os_name: "Mac OS X",
      $elements: [{ tag_name: "a", $el_text: "mail me: a@b.io", attr__href: `/cards/${UUID}` }],
      $elements_chain: `a:text="a@b.io"attr__href="/cards/${UUID}"nth-child="1"`,
      $set: { email: "a@b.io", plan: "pro" },
    });
    expect(out).toEqual({
      $current_url: "https://example.com/cards/:id",
      $pathname: "/cards/:id",
      $session_id: "01924d7e-1234-7000-8000-123456789012",
      distinct_id: "12345678-1234-4123-8123-123456789012",
      $os_name: "Mac OS X",
      $elements: [{ tag_name: "a", $el_text: "mail me: [email]", attr__href: "/cards/:id" }],
      $elements_chain: 'a:text="[email]"attr__href="/cards/:id"nth-child="1"',
      $set: { plan: "pro" },
    });
  });
});

describe("zones", () => {
  it("public: autocapture with texts, heatmaps, no recording; Metrica without Webvisor", async () => {
    const ph = await start({ zone: "public" });
    expect(ph.init).toHaveBeenCalledWith("phc_test", expect.any(Object));
    expect(initConfig(ph)).toMatchObject({
      api_host: "https://example.com/ingest",
      person_profiles: "identified_only",
      autocapture: true,
      mask_all_text: false,
      enable_heatmaps: true,
      disable_session_recording: true,
      capture_pageview: false,
    });
    expect(typeof initConfig(ph).before_send).toBe("function");
    expect(ph.register).toHaveBeenCalledWith({ zone: "public" });
    expect(scripts()).toContain("https://mc.yandex.ru/metrika/tag.js");
    expect(ymCalls()[0]).toEqual([
      12345678,
      "init",
      {
        defer: true,
        webvisor: false,
        clickmap: false,
        trackLinks: false,
        accurateTrackBounce: true,
      },
    ]);
  });

  it.each(["cabinet", "miniapp"] as const)(
    "%s: no texts, everything masked, no recording by default",
    async (zone) => {
      const ph = await start({ zone });
      expect(initConfig(ph)).toMatchObject({
        autocapture: { capture_copied_text: false },
        mask_all_text: true,
        mask_all_element_attributes: true,
        enable_heatmaps: false,
        disable_session_recording: true,
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: "*",
          blockClass: "ph-no-capture",
        },
      });
      expect(maskText(ph)("4242 balance 10")).toBe("**** ******* **");
    },
  );

  it.each(["cabinet", "miniapp"] as const)(
    "%s: Metrica is never loaded, whatever is called",
    async (zone) => {
      await start({ zone });
      track("signup_started");
      track("signup_completed", { method: "email" });
      identify(UUID);
      page("/cards");
      resetAnalytics();
      await flush();
      expect(w.ym).toBeUndefined();
      expect(scripts().some((s) => s.includes("yandex"))).toBe(false);
    },
  );

  it("recording in the cabinet only with its flag", async () => {
    const ph = fakePostHog();
    await start({
      zone: "cabinet",
      posthog: { key: "k", sessionRecording: true, load: async () => ph as unknown as PostHogLike },
    });
    expect(initConfig(ph).disable_session_recording).toBe(false);
  });

  it("warns when Metrica is on a cabinet page anyway", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    (w as { ym?: unknown }).ym = () => {};
    await start({ zone: "cabinet" });
    expect(warn).toHaveBeenCalledOnce();
  });

  it("leaving the public zone silences Metrica and masks PostHog", async () => {
    const ph = await start({ zone: "public" });
    setAnalyticsZone("cabinet");
    const before = ymCalls().length;
    track("signup_completed");
    page("/cards/42");
    await flush();
    expect(ymCalls().length).toBe(before);
    expect(ph.set_config).toHaveBeenCalledWith(expect.objectContaining({ mask_all_text: true }));
    expect(ph.register).toHaveBeenLastCalledWith({ zone: "cabinet" });
    expect(ph.capture).toHaveBeenCalledWith("signup_completed", {});
  });

  it("entering the public zone loads Metrica then, not before", async () => {
    await start({ zone: "cabinet" });
    expect(w.ym).toBeUndefined();
    setAnalyticsZone("public");
    track("signup_started");
    expect(ymCalls().map((c) => c[1])).toEqual(["init", "getClientID", "reachGoal"]);
  });

  it("keeps Metrica's ClientID for the server's conversions", async () => {
    forgetAnalyticsIds();
    await start({ zone: "public" });
    const ask = ymCalls().find((c) => c[1] === "getClientID");
    expect(ask).toBeDefined();
    (ask?.[2] as (id: unknown) => void)(1700000000123456789n.toString());
    expect(analyticsIds()?.metrika_client_id).toBe("1700000000123456789");
    forgetAnalyticsIds();
    expect(analyticsIds()?.metrika_client_id).toBeUndefined();
  });
});

describe("track", () => {
  it("sends one event to PostHog and, for a sign-up goal on a public page, to Metrica", async () => {
    const ph = await start({ zone: "public", initialPageview: false });
    track("signup_completed", {
      method: "email",
      email: "a@b.io",
      amount_minor: 500,
      currency: "USD",
    });
    await flush();
    expect(ph.capture).toHaveBeenCalledWith("signup_completed", {
      method: "email",
      amount_minor: 500,
      currency: "USD",
    });
    expect(ymCalls()).toContainEqual([
      12345678,
      "reachGoal",
      "signup_completed",
      { method: "email", amount_minor: 500, currency: "USD" },
    ]);
  });

  it("keeps deposits, cards and subscriptions out of Metrica: the server sends them", async () => {
    const ph = await start({ zone: "public", initialPageview: false });
    track("deposit_confirmed", { amount_minor: 1000, currency: "USD" });
    await flush();
    expect(ph.capture).toHaveBeenCalledWith("deposit_confirmed", {
      amount_minor: 1000,
      currency: "USD",
    });
    expect(ymCalls().filter((c) => c[1] === "reachGoal")).toEqual([]);
  });

  it("accepts only names from the dictionary", async () => {
    const ph = await start({ zone: "public", initialPageview: false });
    // @ts-expect-error: not in the dictionary
    track("clicked_something");
    await flush();
    expect(ph.capture).not.toHaveBeenCalled();
  });

  it("does nothing before initAnalytics", () => {
    expect(() => track("signup_started")).not.toThrow();
  });

  it("PostHog's own events pass the same filter", async () => {
    const ph = await start({ zone: "public" });
    const beforeSend = initConfig(ph).before_send as (e: unknown) => unknown;
    expect(
      beforeSend({
        event: "$autocapture",
        properties: { $current_url: "https://example.com/u/77", $el_text: "a@b.io" },
        $set: { name: "A" },
      }),
    ).toEqual({
      event: "$autocapture",
      properties: { $current_url: "https://example.com/u/:id" },
      $set: {},
    });
    expect(beforeSend(null)).toBeNull();
  });
});

describe("pages and identity", () => {
  it("sends cleaned page views once per address", async () => {
    const ph = await start({ zone: "public", initialPageview: false });
    page(`https://example.com/cards/${UUID}?token=x`);
    page(`https://example.com/cards/${UUID}`);
    page("https://example.com/pricing");
    await flush();
    const views = ph.capture.mock.calls.filter((c) => c[0] === "$pageview").map((c) => c[1]);
    expect(views).toEqual([
      { $current_url: "https://example.com/cards/:id" },
      { $current_url: "https://example.com/pricing", $referrer: "https://example.com/cards/:id" },
    ]);
    expect(
      ymCalls()
        .filter((c) => c[1] === "hit")
        .map((c) => c[2]),
    ).toEqual(["https://example.com/cards/:id", "https://example.com/pricing"]);
  });

  it("sends the first page view on init", async () => {
    const ph = await start({ zone: "cabinet" });
    expect(ph.capture).toHaveBeenCalledWith(
      "$pageview",
      expect.objectContaining({ $current_url: expect.any(String) }),
    );
  });

  it("identifies by the platform's user id and resets on sign-out", async () => {
    const ph = await start({ zone: "public" });
    identify(UUID);
    resetAnalytics();
    await flush();
    expect(ph.identify).toHaveBeenCalledWith(UUID);
    expect(ymCalls()).toContainEqual([12345678, "setUserID", UUID]);
    expect(ph.reset).toHaveBeenCalledOnce();
  });

  it("gives PostHog's distinct id for sign-up", async () => {
    expect(await posthogDistinctId()).toBeUndefined();
    await start({ zone: "public" });
    expect(await posthogDistinctId()).toBe("ph-distinct-1");
  });

  it("a second initAnalytics does nothing", async () => {
    const ph = await start({ zone: "public" });
    const other = fakePostHog();
    await start({ zone: "cabinet" }, other);
    expect(other.init).not.toHaveBeenCalled();
    expect(ph.init).toHaveBeenCalledOnce();
  });
});

describe("PostHog from its script", () => {
  it("loads array.js from the proxy host and replays calls once it runs", async () => {
    initAnalytics({
      zone: "cabinet",
      posthog: { key: "phc_test", host: "https://example.com/ingest/" },
      initialPageview: false,
    });
    track("card_issued", { amount_minor: 500, currency: "EUR" });
    const tag = document.querySelector<HTMLScriptElement>(
      'script[src="https://example.com/ingest/static/array.js"]',
    );
    expect(tag).not.toBeNull();
    const placeholder = w.posthog as { __SV: number; _i: unknown[][] };
    expect(placeholder.__SV).toBe(1);
    expect(placeholder._i[0]![0]).toBe("phc_test");
    expect(placeholder._i[0]![1]).toMatchObject({
      api_host: "https://example.com/ingest",
      mask_all_text: true,
    });

    const ph = fakePostHog();
    w.posthog = ph;
    tag!.dispatchEvent(new Event("load"));
    await flush();
    expect(ph.capture).toHaveBeenCalledWith("card_issued", { amount_minor: 500, currency: "EUR" });
    expect(ph.init).not.toHaveBeenCalled();
  });

  it("uses PostHog's assets host when no proxy is set", () => {
    initAnalytics({ zone: "public", posthog: { key: "phc_test" }, initialPageview: false });
    expect(scripts()).toContain("https://eu-assets.i.posthog.com/static/array.js");
  });

  it("gives up quietly when the script is blocked", async () => {
    initAnalytics({ zone: "public", posthog: { key: "phc_test" }, initialPageview: false });
    document.querySelector("script")!.dispatchEvent(new Event("error"));
    track("signup_started");
    expect(await posthogDistinctId(50)).toBeUndefined();
  });
});

describe("session recording", () => {
  const ZONES = ["public", "cabinet", "miniapp"] as const;

  it.each(ZONES)(
    "%s with the flag: recording on, inputs masked, ph-no-capture blocked",
    async (zone) => {
      const ph = fakePostHog();
      await start({ zone, posthog: recording(true, ph) });
      expect(initConfig(ph)).toMatchObject({
        disable_session_recording: false,
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: "*",
          blockClass: "ph-no-capture",
        },
      });
      const text = maskText(ph)("Balance 120.50 USD", document.body);
      expect(text).toBe(zone === "public" ? "Balance 120.50 USD" : "******* ****** ***");
    },
  );

  it.each(ZONES)("%s without the flag: never recording", async (zone) => {
    const ph = fakePostHog();
    await start({ zone, posthog: recording(undefined, ph) });
    expect(initConfig(ph).disable_session_recording).toBe(true);
    for (const next of ["public", "cabinet", "miniapp", "public"] as const) setAnalyticsZone(next);
    await flush();
    expect(ph.startSessionRecording).not.toHaveBeenCalled();
    for (const cfg of zoneChanges(ph)) expect(cfg.disable_session_recording).toBeUndefined();
  });

  it("public -> cabinet -> public keeps one recording and flips the masking", async () => {
    const ph = fakePostHog();
    await start({ zone: "public", posthog: recording(true, ph) });
    const mask = maskText(ph);
    expect(mask("Sign up", document.body)).toBe("Sign up");

    setAnalyticsZone("cabinet");
    // Masked at once, before PostHog has even seen the zone change.
    expect(mask("a@b.io", document.body)).toBe("******");
    await flush();

    setAnalyticsZone("public");
    expect(mask("Pricing", document.body)).toBe("Pricing");
    await flush();

    expect(ph.startSessionRecording).not.toHaveBeenCalled();
    expect(ph.stopSessionRecording).not.toHaveBeenCalled();
    expect(zoneChanges(ph)).toHaveLength(2);
    for (const cfg of zoneChanges(ph)) {
      // Nothing that would make posthog-js stop or restart the recorder.
      expect(cfg).not.toHaveProperty("disable_session_recording");
      expect(cfg).not.toHaveProperty("session_recording");
    }
    expect(ph.register.mock.calls.map((c) => c[0])).toEqual([
      { zone: "public" },
      { zone: "cabinet" },
      { zone: "public" },
    ]);
  });

  it("masks by default: before initAnalytics, after it is gone, and in an unknown zone", async () => {
    expect(maskRecordedText("Card 4242")).toBe("**** ****");
    const ph = fakePostHog();
    await start({ zone: "public", posthog: recording(true, ph) });
    expect(maskRecordedText("Card 4242")).toBe("Card 4242");
    setAnalyticsZone("somewhere" as never);
    expect(maskRecordedText("Card 4242")).toBe("**** ****");
    _resetAnalyticsForTests();
    expect(maskText(ph)("Card 4242")).toBe("**** ****");
  });

  it("on a public page, masks inside ph-mask and inside a cabinet layout root", async () => {
    const ph = fakePostHog();
    await start({ zone: "public", posthog: recording(true, ph) });
    document.body.innerHTML = `
      <header><span class="ph-mask"><b id="email">a@b.io</b></span><span id="logo">Brand</span></header>
      <main data-analytics-zone="cabinet"><p id="balance">120.50</p></main>
      <section data-analytics-zone="public"><p id="promo">Free card</p></section>`;
    const el = (id: string) => document.getElementById(id);
    const mask = maskText(ph);
    expect(mask("a@b.io", el("email"))).toBe("******");
    expect(mask("120.50", el("balance"))).toBe("******");
    expect(mask("Brand", el("logo"))).toBe("Brand");
    expect(mask("Free card", el("promo"))).toBe("Free card");
    document.body.innerHTML = "";
  });

  it("masks when the element cannot be checked", async () => {
    const ph = fakePostHog();
    await start({ zone: "public", posthog: recording(true, ph) });
    const broken = {
      closest: () => {
        throw new Error("detached");
      },
    } as unknown as Element;
    expect(maskText(ph)("a@b.io", broken)).toBe("******");
  });
});

describe("consent", () => {
  it("without consent nothing is loaded and nothing records", async () => {
    const ph = fakePostHog();
    const load = vi.fn(async () => ph as unknown as PostHogLike);
    initAnalytics({
      zone: "public",
      consent: false,
      posthog: { key: "k", sessionRecording: true, load },
      metrika: { counterId: 12345678 },
    });
    track("signup_started");
    page("/pricing");
    identify(UUID);
    setAnalyticsZone("cabinet");
    setAnalyticsZone("public");
    await flush();
    expect(load).not.toHaveBeenCalled();
    expect(w.ym).toBeUndefined();
    expect(scripts()).toEqual([]);
    expect(await posthogDistinctId(10)).toBeUndefined();
  });

  it("consent given later loads PostHog with recording, sends the page view and the user", async () => {
    const ph = fakePostHog();
    initAnalytics({ zone: "public", consent: false, posthog: recording(true, ph) });
    identify(UUID);
    setAnalyticsConsent(true);
    await flush();
    expect(initConfig(ph).disable_session_recording).toBe(false);
    expect(ph.identify).toHaveBeenCalledWith(UUID);
    expect(ph.capture).toHaveBeenCalledWith(
      "$pageview",
      expect.objectContaining({ $current_url: expect.any(String) }),
    );
  });

  it("withdrawn in an open tab: recording stops, PostHog opts out, Metrica falls silent", async () => {
    const ph = fakePostHog();
    await start({ zone: "public", posthog: recording(true, ph), metrika: { counterId: 12345678 } });
    setAnalyticsConsent(false);
    const before = ymCalls().length;
    track("signup_started");
    page("/after-withdrawal");
    await flush();
    expect(ph.stopSessionRecording).toHaveBeenCalledOnce();
    expect(ph.opt_out_capturing).toHaveBeenCalledOnce();
    expect(ph.capture).not.toHaveBeenCalledWith("signup_started", expect.anything());
    expect(ymCalls().length).toBe(before);
  });

  it("given again: PostHog opts back in and the recording resumes, in any zone", async () => {
    const ph = fakePostHog();
    await start({ zone: "public", posthog: recording(true, ph), metrika: { counterId: 12345678 } });
    setAnalyticsConsent(false);
    setAnalyticsConsent(true);
    await flush();
    expect(ph.opt_in_capturing).toHaveBeenCalledOnce();
    expect(ph.startSessionRecording).toHaveBeenCalledOnce();
    expect(ph.init).toHaveBeenCalledOnce();
    track("signup_started");
    await flush();
    expect(ph.capture).toHaveBeenCalledWith("signup_started", {});
    expect(ymCalls().some((c) => c[1] === "reachGoal")).toBe(true);
  });

  it("given again without the flag: opts in, never starts a recording", async () => {
    const ph = fakePostHog();
    await start({ zone: "cabinet", posthog: recording(false, ph) });
    setAnalyticsConsent(false);
    setAnalyticsConsent(true);
    await flush();
    expect(ph.opt_in_capturing).toHaveBeenCalledOnce();
    expect(ph.startSessionRecording).not.toHaveBeenCalled();
  });

  it("does nothing before initAnalytics", () => {
    expect(() => setAnalyticsConsent(false)).not.toThrow();
  });
});
