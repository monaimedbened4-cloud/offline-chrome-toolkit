# 🔐 Snippet Vault

Store the text you retype constantly — addresses, replies, code blocks, signatures — and drop it into any field with one click or a keyboard shortcut.

<img src="icons/icon128.png" width="96" alt="Snippet Vault icon">

## Why

Everyone has a handful of paragraphs they type over and over: a support reply, a bio, a shipping address, a boilerplate commit message. Cloud snippet managers want an account and a subscription for this. It is a local key-value store with a paste button.

## Features

- **Save snippets** with a label and body
- **Paste into the focused field** on the current page — works with `<input>`, `<textarea>` and `contenteditable`
- **Copy to clipboard** as a fallback, and automatically when no field is focused
- **Live search** across labels and bodies
- **Export / Import JSON** — your snippets are a plain file you own
- **Keyboard shortcut** `Alt+Shift+V` opens the vault, remappable at `chrome://extensions/shortcuts`
- Inserts at the cursor position and fires an `input` event, so React and Vue fields update correctly

## Install (unpacked)

1. Download this folder, or the ZIP from [Releases](../../releases)
2. Open `chrome://extensions`
3. Turn on **Developer mode**
4. Click **Load unpacked** and select the `snippet-vault` folder

## Permissions

| Permission | Why it is needed |
|---|---|
| `storage` | Keep your snippets in `chrome.storage.local` on this machine |
| `activeTab`, `scripting` | Insert the chosen snippet into the field you have focused |

Script injection happens only when you click **Paste**, and only on the tab you are looking at. Nothing is sent anywhere.

## Storage format

```json
[
  { "id": "uuid", "title": "Signature", "body": "Best,\nAyoub", "created": 1762732800000 }
]
```

## License

MIT — see [LICENSE](../LICENSE)
