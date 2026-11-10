# Contributing

Thanks for considering a contribution! This is a zero-dependency, offline-first monorepo — keeping it that way is the main rule.

## Ground rules

1. **No runtime dependencies.** No npm packages shipped in an extension, no bundlers, no frameworks. Plain HTML, CSS and ES2022 JavaScript.
2. **No network calls.** No `fetch`, no `XMLHttpRequest`, no remote fonts, no analytics, no telemetry. If a feature needs a server, it does not belong here.
3. **No API keys, no accounts, no AI services.** Every feature must work on a plane with the Wi-Fi off.
4. **Least privilege in `manifest.json`.** Never add a permission a feature does not strictly need. If you add one, explain why in the PR.
5. **Manifest V3 only.**

## Local development

```bash
git clone https://github.com/<you>/offline-chrome-toolkit.git
cd offline-chrome-toolkit
```

Then in Chrome:

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top-right)
3. Click **Load unpacked**
4. Select one of the extension folders (e.g. `tab-session-saver/`)

Reload the extension from `chrome://extensions` after each change. For `reading-ruler`, also reload any page you are testing on, since it uses a content script.

## Pull requests

- One extension or one fix per PR.
- Describe what you changed and how you tested it manually (which Chrome version, which pages).
- Keep the visual language consistent: dark surface `#12141a`, card `#1b1f27`, border `#2b313d`, accent `#6c8cff`.
- Run `bash scripts/build.sh` to confirm every extension still packages cleanly.

## Adding a new extension

A new extension is welcome if it does one job well, offline. Include:

- `manifest.json` (MV3)
- `icons/icon16.png`, `icon48.png`, `icon128.png`
- A `README.md` in its folder
- An entry in the root `README.md` table

## Reporting bugs

Open an issue with: Chrome version, OS, the extension name, steps to reproduce, and what you expected instead.
