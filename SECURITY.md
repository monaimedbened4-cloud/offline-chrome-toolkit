# Security Policy

## Threat model in one line

Every extension in this toolkit runs entirely in your browser. There is no server, no account, no API key and no network request — so there is no data in transit to intercept and no backend to breach.

## What each extension can touch

| Extension | Permissions | Why |
|---|---|---|
| Tab Session Saver | `tabs`, `storage` | Read tab URLs/titles to save them; store sessions in `chrome.storage.local` |
| Reading Ruler & Focus Mode | `storage`, `activeTab`, `scripting` | Store your slider settings; draw the overlay on the page you are reading |
| Snippet Vault | `storage`, `activeTab`, `scripting` | Store snippets locally; insert the chosen snippet into the focused field |

All data lives in `chrome.storage.local`, which is scoped to your browser profile on your own machine. Nothing is synced. Uninstalling an extension removes its data.

## Supported versions

The latest release on the `main` branch is supported. Older tags receive no fixes.

## Reporting a vulnerability

Please **do not** open a public issue for a security problem. Instead, use GitHub's **Security → Report a vulnerability** (private vulnerability reporting) on this repository.

Include:

- Which extension is affected
- Chrome version and OS
- Steps to reproduce
- The impact you believe it has

You can expect an initial response within 7 days. Confirmed issues will be fixed in a patch release and credited in the release notes unless you prefer otherwise.

## Out of scope

- Issues that require the user to install a separately malicious extension
- Attacks that require physical access to an already-unlocked machine
- Pages that block all content scripts (e.g. `chrome://`, the Chrome Web Store) — these are Chrome restrictions, not bugs here
