const $ = (s) => document.querySelector(s);
const KEY = 'snippets';
const msg = (t) => { $('#msg').textContent = t; setTimeout(() => ($('#msg').textContent = ''), 2200); };

async function get() { const d = await chrome.storage.local.get(KEY); return Array.isArray(d[KEY]) ? d[KEY] : []; }
const set = (v) => chrome.storage.local.set({ [KEY]: v });

// Injected into the page: paste text into the focused field, else copy to clipboard.
function insertIntoPage(text) {
  const el = document.activeElement;
  const editable = el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && /text|search|email|url|tel|password|number/.test(el.type || 'text')) || el.isContentEditable);
  if (editable && !el.isContentEditable) {
    const s = el.selectionStart ?? el.value.length, e = el.selectionEnd ?? s;
    el.value = el.value.slice(0, s) + text + el.value.slice(e);
    el.selectionStart = el.selectionEnd = s + text.length;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return 'inserted';
  }
  if (editable) { document.execCommand('insertText', false, text); return 'inserted'; }
  return 'nofield';
}

async function render() {
  const q = $('#search').value.trim().toLowerCase();
  const items = (await get()).filter((s) => !q || s.title.toLowerCase().includes(q) || s.body.toLowerCase().includes(q));
  const ul = $('#list'); ul.innerHTML = '';
  if (!items.length) { ul.innerHTML = '<li class="p">No snippets.</li>'; return; }
  items.forEach((s) => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="t"><b></b><div class="acts"><button data-a="paste">Paste</button><button data-a="copy">Copy</button><button data-a="del">✕</button></div></div><div class="p"></div>`;
    li.querySelector('b').textContent = s.title;
    li.querySelector('.p').textContent = s.body.replace(/\s+/g, ' ').slice(0, 80);
    li.querySelectorAll('button').forEach((b) => (b.dataset.id = s.id));
    ul.appendChild(li);
  });
}

$('#list').addEventListener('click', async (e) => {
  const b = e.target.closest('button'); if (!b) return;
  const items = await get();
  const s = items.find((x) => x.id === b.dataset.id); if (!s) return;
  if (b.dataset.a === 'del') { await set(items.filter((x) => x.id !== s.id)); return render(); }
  if (b.dataset.a === 'copy') { await navigator.clipboard.writeText(s.body); return msg('Copied.'); }
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  try {
    const [r] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: insertIntoPage, args: [s.body] });
    if (r?.result === 'inserted') { msg('Inserted.'); window.close(); }
    else { await navigator.clipboard.writeText(s.body); msg('No focused field — copied instead.'); }
  } catch { await navigator.clipboard.writeText(s.body); msg('Page blocked scripts — copied instead.'); }
});

$('#save').addEventListener('click', async () => {
  const title = $('#title').value.trim(), body = $('#body').value;
  if (!title || !body.trim()) return msg('Label and text required.');
  await set([{ id: crypto.randomUUID(), title, body, created: Date.now() }, ...(await get())]);
  $('#title').value = ''; $('#body').value = ''; $('#add').open = false;
  msg('Saved.'); render();
});

$('#search').addEventListener('input', render);
$('#export').addEventListener('click', async () => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(await get(), null, 2)], { type: 'application/json' }));
  const a = document.createElement('a'); a.href = url; a.download = 'snippets.json'; a.click(); msg('Exported.');
});
$('#importBtn').addEventListener('click', () => $('#file').click());
$('#file').addEventListener('change', async (e) => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const inc = JSON.parse(await f.text());
    const clean = (Array.isArray(inc) ? inc : []).filter((s) => s && s.title && typeof s.body === 'string')
      .map((s) => ({ id: s.id || crypto.randomUUID(), title: s.title, body: s.body, created: s.created || Date.now() }));
    await set([...clean, ...(await get())]); msg(`Imported ${clean.length}.`); render();
  } catch { msg('Invalid JSON.'); }
  e.target.value = '';
});

render();
