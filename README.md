<div align="center">

<img src="docs/icons/banner.png" alt="Offline Chrome Toolkit" width="620">

# Offline Chrome Toolkit

**Three Manifest V3 Chrome extensions that do one job each — and never touch the network.**

No API keys. No accounts. No AI services. No backend. No telemetry. No dependencies.

[![License: MIT](https://img.shields.io/badge/License-MIT-6c8cff.svg?style=flat-square)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-3b82f6?style=flat-square)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Offline First](https://img.shields.io/badge/Network_calls-0-10b981?style=flat-square)](#-the-offline-guarantee)
[![Dependencies](https://img.shields.io/badge/Dependencies-0-8b5cf6?style=flat-square)](#-zero-dependencies)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-f59e0b?style=flat-square)](CONTRIBUTING.md)

</div>

---

## 📖 What this is

A small monorepo of three browser extensions built around one constraint: **everything must work with the Wi-Fi off.**

Most "productivity extension" listings today are a thin UI wrapped around somebody else's API — which means an account, a quota, a privacy policy and an outage you cannot fix. These three do real work using only the Chrome extension APIs and `chrome.storage.local`. Your data never leaves your machine because there is nowhere for it to go.

Each extension is independent. Install one, install all three, or copy a folder into your own project.

---

## 🧩 The extensions

<table>
<tr>
<td width="110" align="center"><img src="docs/icons/tab-session-saver.png" width="88"></td>
<td>

### 🗂️ [Tab Session Saver](tab-session-saver/)

Save your open tabs as a named session and restore the whole set in one click. Export and import as JSON so your sessions are a file you own.

**APIs:** `chrome.tabs` · `chrome.storage.local` · `chrome.windows`
**Permissions:** `tabs`, `storage`

</td>
</tr>
<tr>
<td width="110" align="center"><img src="docs/icons/reading-ruler.png" width="88"></td>
<td>

### 📏 [Reading Ruler & Focus Mode](reading-ruler/)

A reading guide line that follows your cursor while everything else dims, plus live text-size and contrast controls for any page.

**APIs:** content scripts · CSS custom properties · `chrome.storage.onChanged`
**Permissions:** `storage`, `activeTab`, `scripting`

</td>
</tr>
<tr>
<td width="110" align="center"><img src="docs/icons/snippet-vault.png" width="88"></td>
<td>

### 🔐 [Snippet Vault](snippet-vault/)

Store the text you retype constantly and drop it into any field with a click or `Alt+Shift+V`. Works with React and Vue inputs.

**APIs:** `chrome.scripting.executeScript` · `chrome.commands` · `chrome.storage.local`
**Permissions:** `storage`, `activeTab`, `scripting`

</td>
</tr>
</table>

---

## 🚀 Install

### From a release (recommended)

1. Download the `.zip` for the extension you want from the [**Releases**](../../releases) page
2. Unzip it somewhere you will keep it — Chrome loads it from that folder every launch
3. Open `chrome://extensions`
4. Turn on **Developer mode** (top-right toggle)
5. Click **Load unpacked** and select the unzipped folder

### From source

```bash
git clone https://github.com/monaimedbened4-cloud/offline-chrome-toolkit.git
cd offline-chrome-toolkit
```

Then **Load unpacked** and pick any of `tab-session-saver/`, `reading-ruler/`, or `snippet-vault/`.

> **After installing Reading Ruler**, reload any tabs that were already open — content scripts only attach to pages loaded after install.

### Build the ZIPs yourself

```bash
bash scripts/build.sh
# → dist/tab-session-saver-v1.0.0.zip
# → dist/reading-ruler-v1.0.0.zip
# → dist/snippet-vault-v1.0.0.zip
```

---

## 🔒 The offline guarantee

Every extension here is auditable in an afternoon. Here is the full accounting:

| Check | Result |
|---|---|
| `fetch()` calls | **0** |
| `XMLHttpRequest` | **0** |
| Remote scripts or stylesheets | **0** |
| Remote fonts | **0** — system font stack only |
| Analytics / telemetry | **0** |
| `host_permissions` | **none requested** |
| API keys or tokens | **none** |
| Accounts or sign-in | **none** |
| Data leaving the device | **none** |

The [CI workflow](.github/workflows/package.yml) fails the build if a `fetch(` or `XMLHttpRequest` ever appears in the source. The guarantee is enforced, not just promised.

All data lives in `chrome.storage.local`, scoped to your browser profile on your own machine. It is not synced to Google. Uninstalling an extension deletes its data.

---

## 📦 Zero dependencies

There is no `package.json`, no `node_modules`, no bundler, no transpiler and no framework. Every extension is:

- Plain `manifest.json` (Manifest V3)
- Plain HTML for the popup
- Plain CSS, hand-written, one file per extension
- Plain ES2022 JavaScript, no build step

You can read any file in this repo top to bottom and know exactly what it does. That is the point.

---

## 🎨 Design system

All three extensions share one visual language so they look like a set in your toolbar and in your popups.

| Token | Value | Use |
|---|---|---|
| Surface | `#12141a` | Popup background |
| Card | `#1b1f27` | List rows, switches |
| Border | `#2b313d` | All 1px borders |
| Text | `#e8ecf3` | Primary text |
| Muted | `#8b94a6` | Labels, metadata |
| Accent | `#6c8cff` | Primary buttons, focus, sliders |

Icons are generated programmatically — a rounded square with a diagonal gradient and a single white glyph — at 16, 48, 128 and 256 px. Blue for tabs, violet for reading, green for the vault.

---

## 🗂️ Repository layout

```
offline-chrome-toolkit/
├── tab-session-saver/        # 🗂️ Extension 1
│   ├── manifest.json
│   ├── popup.html / popup.css / popup.js
│   ├── icons/                # 16, 48, 128, 256
│   └── README.md
├── reading-ruler/            # 📏 Extension 2
│   ├── manifest.json
│   ├── content.js / content.css
│   ├── popup.html / popup.css / popup.js
│   ├── icons/
│   └── README.md
├── snippet-vault/            # 🔐 Extension 3
│   ├── manifest.json
│   ├── popup.html / popup.css / popup.js
│   ├── icons/
│   └── README.md
├── docs/icons/               # Icon assets for this README
├── scripts/build.sh          # Packages all three into dist/
├── .github/workflows/        # Manifest validation + offline check + ZIP build
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE                   # MIT
```

---

## 🌐 Browser support

Built against Chrome's Manifest V3 APIs. Tested on Chrome; should work unmodified on any Chromium browser that supports MV3:

| Browser | Status |
|---|---|
| Chrome 110+ | ✅ Supported |
| Edge 110+ | ✅ Expected to work |
| Brave | ✅ Expected to work |
| Opera / Vivaldi | ✅ Expected to work |
| Firefox | ⚠️ Needs a manifest adjustment (`browser_specific_settings`) |
| Safari | ❌ Different extension model |

---

## 🤝 Contributing

Contributions are welcome. The one hard rule: **nothing may call the network, require a key, or add a dependency.** See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide, the local dev loop, and what a new extension needs to be accepted.

Found a security issue? Please use private vulnerability reporting rather than a public issue — see [SECURITY.md](SECURITY.md).

---

## 📄 License

[MIT](LICENSE) © 2026 AYOUB OU HAMMADI

Use it, fork it, ship it, sell it. Just keep the notice.

---

<div align="center">

**If one of these saves you five minutes a week, star the repo so the next person finds it.** ⭐

</div>
