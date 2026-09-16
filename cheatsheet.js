/* Cheatsheet page:
   - auto-built table of contents
   - collapsible sections (click a heading)
   - live search across every table row and service card
*/
(function () {
  var guide = document.querySelector('.guide');
  var searchEl = document.getElementById('cs-search');
  var toggleAllBtn = document.getElementById('btn-toggle-all');
  var countEl = document.getElementById('filter-count');
  var tocEl = document.getElementById('cs-toc');

  /* ---- 1. Group each <h2> with the content that follows it ---- */
  var sections = [];

  Array.prototype.slice.call(guide.children).forEach(function (node) {
    if (node.tagName === 'H2') {
      sections.push({ heading: node, nodes: [] });
    } else if (sections.length && !node.classList.contains('exam-nav')) {
      sections[sections.length - 1].nodes.push(node);
    }
  });

  sections.forEach(function (s, i) {
    s.body = document.createElement('div');
    s.body.className = 'section-body';
    guide.insertBefore(s.body, s.nodes[0] || s.heading.nextSibling);
    s.nodes.forEach(function (n) { s.body.appendChild(n); });

    // Every searchable unit in this section: table rows and service cards.
    s.items = Array.prototype.slice.call(
      s.body.querySelectorAll('.guide-table tbody tr, .svc')
    );
    s.collapsed = false;

    s.heading.id = 'sec-' + i;
    s.heading.classList.add('collapsible');
    s.heading.setAttribute('role', 'button');
    s.heading.setAttribute('tabindex', '0');
    s.heading.setAttribute('aria-expanded', 'true');

    if (s.items.length) {
      var badge = document.createElement('span');
      badge.className = 'section-count';
      s.heading.appendChild(badge);
      s.badge = badge;
    }

    s.heading.addEventListener('click', function () { setCollapsed(s, !s.collapsed); });
    s.heading.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setCollapsed(s, !s.collapsed);
      }
    });

    // Table of contents entry, using the heading text without the badge.
    var link = document.createElement('a');
    link.className = 'cs-toc-link';
    link.href = '#sec-' + i;
    link.textContent = s.heading.textContent.replace(/\s*\d+$/, '');
    tocEl.appendChild(link);
    s.tocLink = link;
  });

  function setCollapsed(s, collapsed) {
    s.collapsed = collapsed;
    s.heading.classList.toggle('collapsed', collapsed);
    s.heading.setAttribute('aria-expanded', String(!collapsed));
    s.body.hidden = collapsed;
    syncToggleAllLabel();
  }

  function syncToggleAllLabel() {
    var anyOpen = sections.some(function (s) { return !s.collapsed && !s.heading.hidden; });
    toggleAllBtn.textContent = anyOpen ? 'Collapse all' : 'Expand all';
  }

  toggleAllBtn.addEventListener('click', function () {
    var collapse = toggleAllBtn.textContent === 'Collapse all';
    sections.forEach(function (s) { setCollapsed(s, collapse); });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- 2. Live search ---- */
  var total = sections.reduce(function (n, s) { return n + s.items.length; }, 0);

  function apply(query) {
    var q = query.trim().toLowerCase();
    var shown = 0;

    sections.forEach(function (s) {
      var visible = 0;

      s.items.forEach(function (item) {
        var match = !q || item.textContent.toLowerCase().indexOf(q) !== -1;
        item.hidden = !match;
        if (match) visible++;
      });

      shown += visible;

      // A section with no matching rows disappears entirely while searching.
      var empty = s.items.length > 0 && visible === 0;
      s.heading.hidden = empty;
      s.body.hidden = empty || s.collapsed;
      if (s.tocLink) s.tocLink.hidden = empty;
      if (s.badge) s.badge.textContent = q ? visible + ' of ' + s.items.length : s.items.length;
    });

    countEl.textContent = q
      ? shown + ' of ' + total + ' entries'
      : total + ' entries';

    syncToggleAllLabel();
  }

  searchEl.addEventListener('input', function () { apply(searchEl.value); });
  searchEl.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { searchEl.value = ''; apply(''); }
  });

  apply('');
})();
