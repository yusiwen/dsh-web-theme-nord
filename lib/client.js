/* Nord theme for the DSH Web GUI.
 *
 * The client half registers one token-override layer through `ctx.theme`. DSH's
 * theme presenter applies the layer inline on <body>, picking the light or dark
 * value from the active scheme, so the built-in Light / Dark / System switch
 * keeps working and both palettes become Nord.
 *
 * Palette provenance: Nord (https://www.nordtheme.com/) — Polar Night
 * #2E3440/#3B4252/#434C5E/#4C566A, Snow Storm #D8DEE9/#E5E9F0/#ECEFF4, Frost
 * #8FBCBB/#88C0D0/#81A1C1/#5E81AC, Aurora #BF616A/#D08770/#EBCB8B/#A3BE8C/#B48EAD.
 *
 * The map overrides the `--dsw-static-*` scale (which every alias token
 * references) plus the semantic tokens that carry literal colors (borders,
 * translucent menus, diff surfaces, syntax highlighting, onboarding).
 */
window.__ModuleLoader__.load({
  id: "dsh-web-theme-nord",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    /** One value per palette mode; `dark` defaults to `light` for scheme-invariant tokens. */
    const pair = (light, dark = light) => ({ light, dark });

    const NORD_TOKENS = {
      // ── Neutral ramp: Snow Storm surfaces (light) / Polar Night surfaces (dark).
      // Both ramps run light→dark by index so the stock alias choices keep their
      // meaning: low indices are ink in dark mode, high indices are surfaces.
      "--dsw-static-neutral-bluish-00": pair("#FCFDFE", "#FFFFFF"),
      "--dsw-static-neutral-bluish-50": pair("#F4F6FA", "#ECEFF4"),
      "--dsw-static-neutral-bluish-55": pair("#F0F3F8", "#E9EDF4"),
      "--dsw-static-neutral-bluish-60": pair("#ECEFF4", "#E5E9F0"),
      "--dsw-static-neutral-bluish-75": pair("#E5E9F0", "#DDE3ED"),
      "--dsw-static-neutral-bluish-90": pair("#E2E7EF", "#D8DEE9"),
      "--dsw-static-neutral-bluish-100": pair("#D8DEE9", "#D0D8E4"),
      "--dsw-static-neutral-bluish-150": pair("#D3DAE5", "#C9D2E0"),
      "--dsw-static-neutral-bluish-200": pair("#C7D0DD", "#C2CCDB"),
      "--dsw-static-neutral-bluish-300": pair("#B6C1D2", "#C5CEDD"),
      "--dsw-static-neutral-bluish-310": pair("#AFBCCD", "#C0C9D8"),
      "--dsw-static-neutral-bluish-400": pair("#93A1B7", "#A7B3C6"),
      "--dsw-static-neutral-bluish-500": pair("#7C8AA3", "#8E9BB1"),
      "--dsw-static-neutral-bluish-600": pair("#66768F", "#8492A9"),
      "--dsw-static-neutral-bluish-700": pair("#55637A", "#6A7890"),
      "--dsw-static-neutral-bluish-750": pair("#4C566A", "#4C566A"),
      "--dsw-static-neutral-bluish-800": pair("#434C5E", "#434C5E"),
      "--dsw-static-neutral-bluish-850": pair("#3B4252", "#3B4252"),
      "--dsw-static-neutral-bluish-875": pair("#363E4C", "#363E4C"),
      "--dsw-static-neutral-bluish-900": pair("#313845", "#313845"),
      "--dsw-static-neutral-bluish-950": pair("#2E3440", "#2E3440"),
      "--dsw-static-neutral-bluish-1000": pair("#232831", "#232831"),

      // Desaturated ramp for scrollbars, inline code, and idle states.
      "--dsw-static-neutral-00": pair("#FFFFFF", "#FFFFFF"),
      "--dsw-static-neutral-50": pair("#F7F8FA", "#ECEFF4"),
      "--dsw-static-neutral-100": pair("#EEF1F5", "#E2E7EF"),
      "--dsw-static-neutral-150": pair("#E9ECF2", "#DDE3ED"),
      "--dsw-static-neutral-200": pair("#DDE2EA", "#D8DEE9"),
      "--dsw-static-neutral-250": pair("#D6DCE6", "#D3DAE5"),
      "--dsw-static-neutral-300": pair("#C7CFDC", "#C5CEDD"),
      "--dsw-static-neutral-400": pair("#93A1B7", "#A7B3C6"),
      "--dsw-static-neutral-500": pair("#7C8AA3", "#8E9BB1"),
      "--dsw-static-neutral-550": pair("#6E7C93", "#7C8AA3"),
      "--dsw-static-neutral-600": pair("#66768F", "#6A7890"),
      "--dsw-static-neutral-700": pair("#4C566A", "#4C566A"),
      "--dsw-static-neutral-800": pair("#3A4353", "#434C5E"),
      "--dsw-static-neutral-850": pair("#333C4A", "#3B4252"),
      "--dsw-static-neutral-900": pair("#2C3440", "#313845"),
      "--dsw-static-neutral-1000": pair("#232831", "#232831"),

      // ── Frost scale for links, selection, focus, and business accents.
      "--dsw-static-blue-50": pair("#EDF3F8"),
      "--dsw-static-blue-50p": pair("#E9F1F7"),
      "--dsw-static-blue-75": pair("#E4EEF5"),
      "--dsw-static-blue-100": pair("#D7E6EF"),
      "--dsw-static-blue-300": pair("#A9C9DA"),
      "--dsw-static-blue-400": pair("#8FBCBB"),
      "--dsw-static-blue-450": pair("#7FAEC8"),
      "--dsw-static-blue-500": pair("#81A1C1"),
      "--dsw-static-blue-600": pair("#5E81AC"),
      "--dsw-static-blue-800": pair("#4A6B92"),
      "--dsw-static-blue-900": pair("#3B5675"),
      "--dsw-static-blue-950": pair("#2E4258"),

      "--dsw-static-deepseek-50": pair("#EDF3F8"),
      "--dsw-static-deepseek-100": pair("#DCE8F0"),
      "--dsw-static-deepseek-200": pair("#C9DEE9"),
      "--dsw-static-deepseek-300": pair("#AFCFDE"),
      "--dsw-static-deepseek-400": pair("#6E8FB8", "#88C0D0"),
      "--dsw-static-deepseek-450": pair("#7FAEC8"),
      "--dsw-static-deepseek-500": pair("#5E81AC", "#81A1C1"),
      "--dsw-static-deepseek-600": pair("#48688F"),
      "--dsw-static-deepseek-700-delete": pair("#3E5A7A"),
      "--dsw-static-deepseek-800": pair("#344B66"),
      "--dsw-static-deepseek-900": pair("#2A3C52"),

      // ── Aurora scale for status, diffs, and syntax.
      "--dsw-static-green-100": pair("#E9F0E2"),
      "--dsw-static-green-400": pair("#B7CCA4"),
      "--dsw-static-green-500": pair("#A3BE8C"),
      "--dsw-static-green-500-a08": pair("#A3BE8C14"),
      "--dsw-static-green-500-a12": pair("#A3BE8C1F"),
      "--dsw-static-green-900": pair("#2C3A2A"),

      "--dsw-static-red-50": pair("#FAF0F1"),
      "--dsw-static-red-100": pair("#F6E4E5"),
      "--dsw-static-red-400": pair("#CF858C", "#CF858C"),
      "--dsw-static-red-400-a12": pair("#CF858C1F"),
      "--dsw-static-red-500": pair("#B45A63", "#BF616A"),
      "--dsw-static-red-600": pair("#B45A63", "#CF858C"),
      "--dsw-static-red-600-a08": pair("#B45A6314", "#CF858C14"),
      "--dsw-static-red-900": pair("#3A272B"),

      "--dsw-static-amber-100": pair("#FBF5E7"),
      "--dsw-static-amber-400": pair("#EBCB8B"),
      "--dsw-static-amber-500": pair("#DDB25F"),
      "--dsw-static-amber-600": pair("#D08770"),
      "--dsw-static-amber-900": pair("#3A3027"),

      "--dsw-static-violet-400": pair("#B48EAD"),
      "--dsw-static-violet-600": pair("#96709A"),

      // ── Semantic tokens carrying literal colors.
      // Borders: Polar Night ink on light surfaces, Snow Storm ink on dark ones.
      "--dsw-alias-border-l1": pair("#2E34400A", "#D8DEE90F"),
      "--dsw-alias-border-l2": pair("#2E34401A", "#D8DEE91F"),
      "--dsw-alias-border-l2-darkmode-thin": pair("#2E34401A", "#D8DEE90F"),
      "--dsw-alias-border-l3": pair("#2E34401F", "#D8DEE929"),
      "--dsw-alias-border-l4": pair("#2E344029", "#D8DEE933"),
      "--dsw-alias-border-inverted": pair("#0000"),
      "--dsw-alias-border-inverted2": pair("#0000"),

      // Hover / active washes keep the Frost hue instead of the stock blue-black.
      "--dsw-alias-interactive-bg-hover": pair("#2E34400F", "#D8DEE914"),
      "--dsw-alias-interactive-bg-active": pair("#2E34401A", "#D8DEE924"),
      "--dsw-alias-interactive-bg-hover-accent": pair("#5E81AC24", "#88C0D03D"),
      "--dsw-alias-interactive-bg-hover-danger": pair("#BF616A0D", "#BF616A26"),

      // Translucent menus and masks.
      "--dsw-menu-surface-fill": pair("#ECEFF4B3", "#2E3440A3"),
      "--dsw-alias-menu-group-header-fill": pair("#ECEFF4F0", "#2E3440F0"),
      "--dsw-specific-menu": pair("#ECEFF4B3", "#2E3440A3"),
      "--dsw-alias-bg-mask-drop": pair("#FCFDFEB3", "#2E3440B3"),
      "--dsw-alias-bg-skeleton": pair("#2E34400A", "#D8DEE914"),

      // Links and the legacy brand accent.
      "--dsw-alias-link": pair("#4C6F96", "#88C0D0"),
      "--dsw-alias-brand-primary-new-colorprimary-new-color": pair("#5E81AC", "#88C0D0"),
      "--dsw-alias-bg-document-selection": pair(
        "color-mix(in srgb, #81A1C1 40%, transparent)",
        "color-mix(in srgb, #88C0D0 35%, transparent)"
      ),

      // Toolbar fills.
      "--dsw-alias-button-tool-bar-fill": pair("#4C566A80", "#1F242D80"),
      "--dsw-alias-button-tool-bar-fill-invisible": pair("#1F242D5C", "#1F242D5C"),
      "--dsw-alias-button-tool-bar-hover": pair("#4C566A99", "#1F242D99"),

      // File diffs: Aurora green / red surfaces.
      "--dsw-alias-file-diff-added-bg": pair("#EAF2E4", "#2C3A2A"),
      "--dsw-alias-file-diff-added-gutter": pair("#F2F7EE", "#24301F"),
      "--dsw-alias-file-diff-added-marker": pair("#7BA05B", "#A3BE8C"),
      "--dsw-alias-file-diff-deleted-bg": pair("#F8E8E9", "#3A272B"),
      "--dsw-alias-file-diff-deleted-gutter": pair("#FBEFEF", "#2E1F22"),
      "--dsw-alias-file-diff-deleted-marker": pair("#B0525B", "#BF616A"),

      // Syntax highlighting (Shiki tokens are declared on :root; body-level
      // inline values are what code blocks inherit from).
      "--shiki-token-constant": pair("#3E6E6C", "#8FBCBB"),
      "--shiki-token-string": pair("#5F7F4D", "#A3BE8C"),
      "--shiki-token-comment": pair("#7C8AA3", "#7C8AA3"),
      "--shiki-token-keyword": pair("#4C6F96", "#81A1C1"),
      "--shiki-token-parameter": pair("#A85E45", "#D08770"),
      "--shiki-token-function": pair("#4C6F96", "#88C0D0"),
      "--shiki-token-string-expression": pair("#5F7F4D", "#A3BE8C"),
      "--shiki-token-punctuation": pair("#55637A", "#D8DEE9"),
      "--shiki-token-link": pair("#4C6F96", "#88C0D0"),

      // Onboarding / welcome surfaces.
      "--dsw-alias-onboarding-accent": pair("#5E81AC", "#88C0D0"),
      "--dsw-gradient-onboarding-violet-stops": pair(
        "#6E4F78 33.102%, #B48EAD 50.954%, #D8C7DD 85.326%, #6E4F78"
      ),
      "--dsw-gradient-onboarding-blue-stops": pair(
        "#3E5F86 18.75%, #81A1C1 51.78%, #A9C9DA 86.252%, #3E5F86"
      ),
      "--dsw-gradient-onboarding-cyan-stops": pair(
        "#3E7A78 21.154%, #8FBCBB 50.954%, #C7E3E1 85.326%, #3E7A78"
      ),
      "--dsw-alias-onboarding-card-fill": pair(
        "color-mix(in srgb, #FCFDFE 80%, transparent)",
        "color-mix(in srgb, #3B4252 80%, transparent)"
      ),
      "--dsw-alias-onboarding-secondary-fill": pair("#FCFDFE", "#434C5E"),
      "--dsw-alias-onboarding-checkbox-border": pair(
        "color-mix(in srgb, #232831 20%, transparent)",
        "var(--dsw-alias-border-l2)"
      ),

      // Fade gradients behind thinking text.
      "--dsw-linear-gradient-think": pair(
        "linear-gradient(180deg, #FCFDFE 20.19%, #FCFDFE00 100%)",
        "linear-gradient(180deg, #2E3440 20.19%, #2E344000 100%)"
      ),
      "--dsw-linear-think-select": pair(
        "linear-gradient(180deg, #F4F6FA 20.19%, #F4F6FA00 100%)",
        "linear-gradient(180deg, #3B4252 20.19%, #3B425200 100%)"
      ),
    };

    /** Client plugin name used in Loader diagnostics. */
    const name = "web-theme-nord-client";
    /** Required service: the theme registry that owns the token layers. */
    const inject = ["theme"];

    /**
     * Register the Nord token layer for the lifetime of this plugin.
     * @param ctx - Client root context.
     */
    function apply(ctx) {
      ctx.effect(
        () => ctx.theme.overrideTokens("dsh-web-theme-nord", NORD_TOKENS),
        "dsh-web-theme-nord: Nord token layer"
      );
    }

    exports.apply = apply;
    exports.inject = inject;
    exports.name = name;
    return module.exports;
  },
});
