# dsh-web-theme-nord

A [Nord](https://www.nordtheme.com/) color theme for the DSH Web GUI. Both
built-in schemes are repainted: **Snow Storm** for light and **Polar Night**
for dark, with **Frost** accents and **Aurora** status and syntax colors.

The built-in Light / Dark / Follow system switch keeps working — this package
does not add a fourth appearance option; it changes what the two existing
schemes look like.

## Install

```sh
dsh plugin --profile web add dsh-web-theme-nord
```

With `dsh-hmr` enabled (the default Web profile), an open page picks the plugin
up through the module graph; otherwise restart `dsh web` and reload the page.
The theme applies to every session in that profile.

To remove it:

```sh
dsh plugin --profile web remove dsh-web-theme-nord
```

## How it works

`lib/client.js` is a normal DSH client bundle. On activation it registers one
token-override layer through `ctx.theme.overrideTokens('dsh-web-theme-nord', …)`.
DSH's theme presenter applies the layer inline on `<body>`, choosing each
token's `light` or `dark` value from the active scheme, so switching between
Light and Dark repaints immediately and the layer is removed cleanly when the
plugin unloads.

The layer overrides 128 tokens:

- the complete `--dsw-static-*` scale, which every semantic `--dsw-alias-*`
  token references — including hover washes, menus, code surfaces, and
  scrollbars;
- semantic tokens that carry literal colors: borders, translucent menus and
  masks, links, toolbar fills, file-diff surfaces, and thinking gradients;
- the Shiki syntax tokens;
- onboarding surfaces and the welcome gradients.

The static ramp is mode-aware: in light mode low indices are Snow Storm
surfaces and high indices are Polar Night ink; in dark mode the same indices
flip to Snow Storm ink and Polar Night surfaces. That keeps the stock alias
choices meaningful in both schemes without rewriting all aliases.

| Role | Light | Dark |
|---|---|---|
| Canvas / layers | `#FCFDFE` → `#E5E9F0` | `#2E3440` → `#434C5E` |
| Primary ink | `#232831` | `#ECEFF4` |
| Secondary ink | `#55637A` | `#C5CEDD` |
| Links / focus | `#4C6F96` / `#5E81AC` | `#88C0D0` |
| Success / error / warn | `#A3BE8C` / `#B45A63` / `#D08770` | `#A3BE8C` / `#CF858C` / `#D08770` |
| Syntax | Frost / Aurora, darkened for light | Nord's published Aurora palette |

## Compatibility

- DSH `>=0.2.1-rc.2 <0.3.0-0` (declared in `engines.dsh`).
- Depends on the `theme` client service provided by
  `@deepseek-ai/dsh-client-ui-theme`; `dsh.client.inject` declares the module
  dependency.
- No host-side services, no settings of its own, no network access.

## License

MIT
