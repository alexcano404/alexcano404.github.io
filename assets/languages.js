(() => {
  const messages = window.siteMessages;
  let language = 'en';
  const originals = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: node => node.parentElement.closest('script, style, .language-picker, .theme-toggle') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
  });
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (messages[node.textContent.trim()]) originals.push([node, node.textContent]);
  }
  const attributes = [];
  document.querySelectorAll('[alt], [aria-label], [title]').forEach(element => {
    if (element.closest('.language-picker')) return;
    ['alt', 'aria-label', 'title'].forEach(name => {
      const value = element.getAttribute(name);
      if (value && messages[value]) attributes.push([element, name, value]);
    });
  });
  const originalTitle = document.title;
  const translate = text => language === 'en' ? text : messages[text]?.[language === 'es' ? 0 : 1] || text;
  window.siteTranslate = translate;
  const picker = document.querySelector('.language-picker');
  const toggle = document.querySelector('.language-toggle');
  const panel = document.querySelector('.language-options');
  const close = () => { panel.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
  function refreshControls() {
    const dark = document.documentElement.dataset.theme === 'dark';
    const theme = document.querySelector('.theme-toggle');
    theme.textContent = translate(dark ? 'Light mode' : 'Dark mode');
    theme.setAttribute('aria-label', translate(dark ? 'Switch to light mode' : 'Switch to dark mode'));
    const pause = document.querySelector('#pause');
    const label = translate(pause.getAttribute('aria-pressed') === 'true' ? 'Resume rotation' : 'Pause rotation');
    pause.setAttribute('aria-label', label);
    pause.title = label;
  }
  function setLanguage(next) {
    language = ['en', 'es', 'zh'].includes(next) ? next : 'en';
    document.documentElement.lang = language === 'zh' ? 'zh-Hans' : language;
    originals.forEach(([node, original]) => { node.textContent = original.replace(original.trim(), translate(original.trim())); });
    attributes.forEach(([element, name, original]) => element.setAttribute(name, translate(original)));
    document.title = translate(originalTitle);
    toggle.textContent = {en:'Languages',es:'Idiomas',zh:'语言'}[language] + ' ▾';
    toggle.setAttribute('aria-label', {en:'Choose language',es:'Elegir idioma',zh:'选择语言'}[language]);
    panel.setAttribute('aria-label', {en:'Languages',es:'Idiomas',zh:'语言'}[language]);
    panel.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    refreshControls();
    try { localStorage.setItem('alejandro-language', language); } catch {}
  }
  toggle.addEventListener('click', () => { const open = panel.hidden; panel.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); });
  panel.addEventListener('click', event => {
    const button = event.target.closest('[data-language]');
    if (button) { setLanguage(button.dataset.language); close(); toggle.focus(); }
  });
  document.addEventListener('click', event => { if (!picker.contains(event.target)) close(); });
  picker.addEventListener('focusout', event => { if (!picker.contains(event.relatedTarget)) close(); });
  picker.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); toggle.focus(); } });
  document.querySelector('.theme-toggle').addEventListener('click', refreshControls);
  document.querySelector('#pause').addEventListener('click', refreshControls);
  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', refreshControls);
  let saved = 'en';
  try { saved = localStorage.getItem('alejandro-language') || 'en'; } catch {}
  setLanguage(saved);
})();
