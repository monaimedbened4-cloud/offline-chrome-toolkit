const $ = (s) => document.querySelector(s);
const KEY = 'sessions';
const msg = (t) => { $('#msg').textContent = t; setTimeout(() => ($('#msg').textContent = ''), 2500); };

async function getSessions() {
  const d = await chrome.storage.local.get(KEY);
  return Array.isArray(d[KEY]) ? d[KEY] : [];
}
const setSessions = (s) => chrome.storage.local.set({ [KEY]: s });

async function render() {
  const sessions = await getSessions();
  const ul = $('#list');
  ul.innerHTML = '';
  if (!sessions.length) { ul.innerHTML = '<li class="m">No saved sessions yet.</li>'; return; }
  sessions.forEach((s, i) => {
    const li = document.createElement('li');
    const d = new Date(s.created).toLocaleString();
    li.innerHTML = `<div class="t"><div><b></b><div class="m">${s.tabs.length} tabs · ${d}</div></div>
      <div class="acts"><button data-a="open" data-i="${i}">Open</button><button data-a="del" data-i="${i}">✕</button></div></div>`;
    li.querySelector('b').textContent = s.name;
    ul.appendChild(li);
  });
}

$('#save').addEventListener('click', async () => {
  const name = $('#name').value.trim() || new Date().toLocaleString();
  const query = $('#onlyCurrent').checked ? { currentWindow: true } : {};
  const tabs = (await chrome.tabs.query(query))
    .filter((t) => t.url && /^https?:|^file:/.test(t.url))
    .map((t) => ({ url: t.url, title: t.title || t.url, pinned: !!t.pinned }));
  if (!tabs.length) return msg('No savable tabs found.');
  const sessions = await getSessions();
  sessions.unshift({ name, created: Date.now(), tabs });
  await setSessions(sessions);
  $('#name').value = '';
  msg(`Saved ${tabs.length} tabs.`);
  render();
});

$('#list').addEventListener('click', async (e) => {
  const b = e.target.closest('button'); if (!b) return;
  const sessions = await getSessions();
  const s = sessions[+b.dataset.i]; if (!s) return;
  if (b.dataset.a === 'open') {
    const win = await chrome.windows.create({ url: s.tabs[0].url });
    for (const t of s.tabs.slice(1)) chrome.tabs.create({ windowId: win.id, url: t.url, pinned: t.pinned });
  } else {
    sessions.splice(+b.dataset.i, 1);
    await setSessions(sessions);
    render();
  }
});

$('#export').addEventListener('click', async () => {
  const sessions = await getSessions();
  const url = URL.createObjectURL(new Blob([JSON.stringify(sessions, null, 2)], { type: 'application/json' }));
  await chrome.downloads?.download?.({ url, filename: 'tab-sessions.json' }).catch(() => {});
  const a = document.createElement('a'); a.href = url; a.download = 'tab-sessions.json'; a.click();
  msg('Exported.');
});

$('#importBtn').addEventListener('click', () => $('#file').click());
$('#file').addEventListener('change', async (e) => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const incoming = JSON.parse(await f.text());
    if (!Array.isArray(incoming)) throw new Error('bad format');
    const clean = incoming.filter((s) => s && s.name && Array.isArray(s.tabs));
    await setSessions([...clean, ...(await getSessions())]);
    msg(`Imported ${clean.length} sessions.`); render();
  } catch { msg('Invalid JSON file.'); }
  e.target.value = '';
});

render();
