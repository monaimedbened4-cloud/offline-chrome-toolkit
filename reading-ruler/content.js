(() => {
  if (window.__rrLoaded) return; window.__rrLoaded = true;
  const D = document;
  let state = { on: false, height: 46, dim: 0.55, fs: 110, bigger: false, contrast: false, ct: 1.15 };
  let els = null;

  function build() {
    if (els) return els;
    const mk = (id) => { const e = D.createElement('div'); e.id = id; return e; };
    els = { ruler: mk('rr-ruler'), top: mk('rr-dim-top'), bot: mk('rr-dim-bot') };
    Object.values(els).forEach((e) => D.documentElement.appendChild(e));
    return els;
  }
  function destroy() {
    if (els) { Object.values(els).forEach((e) => e.remove()); els = null; }
    D.removeEventListener('mousemove', move);
  }
  function move(e) {
    if (!state.on) return;
    const { ruler, top, bot } = build();
    const h = state.height, y = Math.max(0, e.clientY - h / 2);
    ruler.style.height = h + 'px'; ruler.style.top = y + 'px';
    top.style.top = '0px'; top.style.height = y + 'px';
    bot.style.top = y + h + 'px'; bot.style.height = Math.max(0, innerHeight - (y + h)) + 'px';
  }
  function apply() {
    const r = D.documentElement;
    r.style.setProperty('--rr-dim', state.dim);
    r.style.setProperty('--rr-fs', state.fs + '%');
    r.style.setProperty('--rr-ct', state.ct);
    r.classList.toggle('rr-bigger-text', !!state.bigger);
    r.classList.toggle('rr-contrast', !!state.contrast);
    if (state.on) { build(); D.addEventListener('mousemove', move, { passive: true }); }
    else destroy();
  }

  chrome.storage.local.get('rr').then((d) => { state = { ...state, ...(d.rr || {}) }; apply(); });
  chrome.storage.onChanged.addListener((c) => { if (c.rr) { state = { ...state, ...c.rr.newValue }; apply(); } });
})();
