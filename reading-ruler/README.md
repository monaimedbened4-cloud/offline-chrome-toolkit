# 📏 Reading Ruler & Focus Mode

A reading guide line that tracks your cursor, dims everything above and below it, and gives you instant text-size and contrast controls on any page.

<img src="icons/icon128.png" width="96" alt="Reading Ruler icon">

## Why

Long articles are hard to track line by line, especially on wide layouts. A physical ruler under the line you are reading is a decades-old trick for exactly this. This is that ruler, in the browser, plus the two accessibility knobs people reach for most: bigger text and more contrast.

## Features

- **Reading ruler** — a translucent band that follows the pointer
- **Focus dimming** — everything outside the band darkens, with adjustable strength
- **Adjustable band height** — 20px to 140px
- **Bigger, looser text** — scales body text 100–180% and opens up line height
- **Contrast boost** — 1.0× to 1.8× via a CSS filter
- Settings apply **live to every open tab**, no reload needed
- Everything persists across browser restarts

## Install (unpacked)

1. Download this folder, or the ZIP from [Releases](../../releases)
2. Open `chrome://extensions`
3. Turn on **Developer mode**
4. Click **Load unpacked** and select the `reading-ruler` folder
5. Reload any tabs that were already open before installing

## Permissions

| Permission | Why it is needed |
|---|---|
| `storage` | Remember your slider settings |
| `activeTab`, `scripting` | Draw the overlay on the page you are reading |

The content script runs locally and makes no network requests.

## Notes

- Chrome blocks content scripts on `chrome://` pages, the Chrome Web Store, and some PDF viewers. The ruler will not appear there — that is a browser restriction, not a bug.
- The overlay is `pointer-events: none`, so it never blocks clicks or text selection.

## License

MIT — see [LICENSE](../LICENSE)
