/**
 * The SDK's own version, sent as the default `X-Takeal-Client` version.
 *
 * Kept as a plain constant so every entry point (ESM, CJS, the
 * sub-exports) reads the same value without a JSON import or a bundler
 * `define`. `src/version.test.ts` checks it matches `package.json`, so a
 * release bump that forgets this file fails the test run.
 */
export const SDK_VERSION = "0.3.7";
