//#region src/index.ts
/** Host plugin name used in Loader diagnostics. */
const name = "web-theme-nord";

/**
 * Host half of the bundle. The theme is browser-only: the token layer is
 * registered in the Client module. This row exists so the bundle is part of
 * the composed profile and its Client module is served.
 * @param _ctx - Host plugin context.
 */
function apply(_ctx) {}

export { apply, name };
//#endregion
