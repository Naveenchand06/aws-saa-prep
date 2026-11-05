/* Shared theme switch for the non-Vue pages.
   Uses the same localStorage entry as the cheatsheet ('cs.v2' → theme),
   so picking light or dark on any page applies everywhere. Dark is the default. */
(function () {
  var KEY = 'cs.v2';

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function current() { return read().theme || 'dark'; }
  function apply(t) { document.documentElement.setAttribute('data-theme', t); }

  apply(current());

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.site-nav-inner');
    if (!nav) return;
    var btn = document.createElement('button');
    btn.className = 'theme-btn';
    btn.type = 'button';
    function label() {
      var dark = current() === 'dark';
      btn.textContent = dark ? '☀️' : '🌙';
      btn.title = dark ? 'Light theme' : 'Dark theme';
    }
    btn.addEventListener('click', function () {
      var s = read();
      s.theme = current() === 'dark' ? 'light' : 'dark';
      localStorage.setItem(KEY, JSON.stringify(s));
      apply(s.theme);
      label();
    });
    label();
    nav.appendChild(btn);
  });
})();
