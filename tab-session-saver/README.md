# 🗂️ Tab Session Saver

Save the tabs you have open as a named session, then bring them all back later with one click. Export everything to a JSON file you own.

<img src="icons/icon128.png" width="96" alt="Tab Session Saver icon">

## Why

Tab hoarding is a real workflow. You have twelve tabs open for one piece of research and you need the machine back. Closing them loses the thread; leaving them open eats memory. This saves the set, closes the loop, and restores it exactly when you need it.

## Features

- **Save a session** — all tabs in the current window, or every window, under the name you give it
- **Restore** — reopens the whole set in a fresh window, preserving pinned tabs
- **Delete** individual sessions
- **Export / Import JSON** — your sessions are a plain file: back them up, move them between machines, keep them in a repo
- `chrome://` and extension pages are skipped automatically, since Chrome cannot reopen them anyway

## Install (unpacked)

1. Download this folder, or the ZIP from [Releases](../../releases)
2. Open `chrome://extensions`
3. Turn on **Developer mode**
4. Click **Load unpacked** and select the `tab-session-saver` folder

## Permissions

| Permission | Why it is needed |
|---|---|
| `tabs` | Read the URL and title of your open tabs so they can be saved |
| `storage` | Keep your sessions in `chrome.storage.local` on this machine |

No `host_permissions`, no content scripts, no network access.

## Storage format

```json
[
  {
    "name": "Q4 research",
    "created": 1762732800000,
    "tabs": [
      { "url": "https://example.com", "title": "Example", "pinned": false }
    ]
  }
]
```

## License

MIT — see [LICENSE](../LICENSE)
