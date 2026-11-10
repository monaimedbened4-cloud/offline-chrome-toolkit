const ids = ['on', 'height', 'dim', 'bigger', 'fs', 'contrast', 'ct'];
const outs = { height: 'hO', dim: 'dO', fs: 'fO', ct: 'cO' };
const defaults = { on: false, height: 46, dim: 0.55, fs: 110, bigger: false, contrast: false, ct: 1.15 };

function paint(s) {
  for (const k of ids) {
    const el = document.getElementById(k);
    if (el.type === 'checkbox') el.checked = !!s[k]; else el.value = s[k];
  }
  for (const [k, o] of Object.entries(outs)) {
    document.getElementById(o).textContent = k === 'fs' ? s[k] + '%' : s[k];
  }
}

(async () => {
  const d = await chrome.storage.local.get('rr');
  let s = { ...defaults, ...(d.rr || {}) };
  paint(s);
  for (const k of ids) {
    document.getElementById(k).addEventListener('input', async (e) => {
      s[k] = e.target.type === 'checkbox' ? e.target.checked : Number(e.target.value);
      paint(s);
      await chrome.storage.local.set({ rr: s });
    });
  }
})();
