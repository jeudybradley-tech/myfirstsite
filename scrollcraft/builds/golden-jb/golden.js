/* Golden JB · page script.
   The engine (scrollcraft.js) is mounted first and never edited. Everything
   below is this page's own: opening, language, index, the N° 3 finish
   switch, the N° 4 and N° 5 women / men compare, and the order plate. */
(function () {
  'use strict';

  /* ---------------------------------------------------------- settings --
     Fill these in when they exist. Empty = hidden / not sent. */
  var ORDER_ENDPOINT = '';      // URL that receives a POST in JSON (see README)
  var INSTAGRAM      = '';      // e.g. 'https://instagram.com/goldenjb'
  var WHATSAPP       = '';      // e.g. 'https://wa.me/15145550123'
  var PRICE          = 20;      // dollars, per bracelet

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* ----------------------------------------------------------- opening --
     The markup put the name on black (html.gjb-open). It holds a little over
     six seconds (under three with reduced motion), then fades; a scroll, a
     click, a touch or a key ends it at once. */
  (function () {
    if (!root.classList.contains('gjb-open')) return;
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      root.classList.add('gjb-opened');
      setTimeout(function () { root.classList.remove('gjb-open', 'gjb-opened'); }, 1850);
    }
    setTimeout(finish, reduce ? 2600 : 6400);
    ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(function (t) {
      addEventListener(t, finish, { once: true, passive: true });
    });
    addEventListener('scroll', function () { if (scrollY > 2) finish(); }, { passive: true });
  })();
  ScrollCraft.mount(document.body);
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------- language -- */
  var lang = 'fr';
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function setLang(next) {
    lang = next === 'en' ? 'en' : 'fr';
    root.lang = lang;
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.dataset.fr === undefined) el.dataset.fr = el.textContent;
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.fr;
    });
    document.querySelectorAll('[data-en-alt]').forEach(function (el) {
      if (el.dataset.frAlt === undefined) el.dataset.frAlt = el.alt;
      el.alt = lang === 'en' ? el.dataset.enAlt : el.dataset.frAlt;
    });
    document.querySelectorAll('[data-en-aria]').forEach(function (el) {
      if (el.dataset.frAria === undefined) el.dataset.frAria = el.getAttribute('aria-label') || '';
      el.setAttribute('aria-label', lang === 'en' ? el.dataset.enAria : el.dataset.frAria);
    });
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    document.title = lang === 'en' ? 'Golden JB · Stainless steel bracelets' : 'Golden JB · Bracelets en acier inoxydable';
    var ol = document.getElementById('opening-line');
    if (ol) ol.textContent = lang === 'en' ? 'Worn every day, kept for good.' : 'Porté chaque jour, gardé pour toujours.';
    updateTotal();
    store('gjb-lang', lang);
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  /* ----------------------------------------------------------- socials -- */
  [['instagram', INSTAGRAM], ['whatsapp', WHATSAPP]].forEach(function (s) {
    if (!s[1]) return;
    document.querySelectorAll('[data-social="' + s[0] + '"]').forEach(function (a) { a.href = s[1]; a.hidden = false; });
    var box = document.querySelector('.order__social');
    if (box) box.hidden = false;
  });

  /* ------------------------------------------------------- index spy --- */
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));
  function spy() {
    var mid = innerHeight * 0.45, here = null;
    spyLinks.forEach(function (a) {
      var t = document.getElementById(a.dataset.spy);
      if (t && t.getBoundingClientRect().top <= mid) here = a;
    });
    spyLinks.forEach(function (a) { a.classList.toggle('is-here', a === here); });
  }

  /* --------------------------------------------- N° 3 · the finish --- */
  // One bangle, two finishes: the switch shows that photo and sets which
  // finish "Commander" adds to the order.
  var n3ask = document.getElementById('n3-ask');
  document.querySelectorAll('[data-finish-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.finishBtn;
      document.querySelectorAll('[data-finish-btn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      document.querySelectorAll('#n3 [data-finish]').forEach(function (pic) {
        pic.hidden = pic.dataset.finish !== f;
        if (!pic.hidden) { var im = pic.querySelector('img'); if (im) im.loading = 'eager'; }
      });
      if (n3ask) n3ask.dataset.piece = f === 'dore' ? 'jonc-dore' : 'jonc-argent';
    });
  });

  /* ------------------------------- N° 4 · women / men, drag to compare --
     The same bracelet on two wrists. A drag moves the line (vertical page
     scroll stays free on touch); a hidden range input carries the keyboard
     and screen readers. Femme / Homme picks which pair is shown. */
  var compares = Array.prototype.slice.call(document.querySelectorAll('[data-compare]'));
  var touched = false;
  function setPos(el, pct) {
    pct = Math.max(0, Math.min(100, pct));
    el.style.setProperty('--pos', pct.toFixed(2) + '%');
    var r = el.querySelector('.compare__range'); if (r && +r.value !== Math.round(pct)) r.value = Math.round(pct);
  }
  compares.forEach(function (el) {
    var range = el.querySelector('.compare__range'), dragging = false;
    function fromEvent(e) { var b = el.getBoundingClientRect(); setPos(el, (e.clientX - b.left) / b.width * 100); }
    el.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true; touched = true; el.classList.add('is-dragging');
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      fromEvent(e);
    });
    el.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    function stop() { dragging = false; el.classList.remove('is-dragging'); }
    el.addEventListener('pointerup', stop);
    el.addEventListener('pointercancel', stop);
    el.addEventListener('lostpointercapture', stop);
    range.addEventListener('input', function () { touched = true; setPos(el, +range.value); });
  });
  // Show once that the line moves: a small sweep when the frame first comes
  // into view, unless the reader already moved it or prefers less motion.
  function sweep(el) {
    var t0 = null, keys = [[0, 50], [0.35, 30], [0.75, 68], [1, 50]];
    function stepFn(ts) {
      if (touched) return;
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / 1600), i = 1;
      while (i < keys.length - 1 && k > keys[i][0]) i++;
      var a = keys[i - 1], b = keys[i], u = (k - a[0]) / (b[0] - a[0]);
      u = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      setPos(el, a[1] + (b[1] - a[1]) * u);
      if (k < 1) requestAnimationFrame(stepFn);
    }
    setTimeout(function () { requestAnimationFrame(stepFn); }, 450);
  }
  // One sweep per section (N° 4, N° 5), the first time its frame is in view.
  if (!reduce && 'IntersectionObserver' in window && compares.length) {
    var nudge = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        nudge.unobserve(en.target);
        if (!touched) sweep(en.target);
      });
    }, { threshold: 0.6 });
    compares.forEach(function (c) { if (!c.hidden) nudge.observe(c); });
  }
  // Each Femme / Homme switch only drives the frames of its own section.
  document.querySelectorAll('[data-wearer-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var w = btn.dataset.wearerBtn, sec = btn.closest('section');
      sec.querySelectorAll('[data-wearer-btn]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      sec.querySelectorAll('[data-compare]').forEach(function (c) {
        var on = c.dataset.wearer === w;
        c.hidden = !on;
        if (on) {
          c.querySelectorAll('img').forEach(function (im) { im.loading = 'eager'; });
          setPos(c, 50);
          if (!reduce) { touched = false; sweep(c); }
        }
      });
    });
  });

  /* ------------------------------------------------------------- loop ---
     One frame per scroll: the index. Nothing runs while the page is still. */
  var raf = 0;
  function frameLoop() { raf = 0; spy(); }
  function wake() { if (!raf) raf = requestAnimationFrame(frameLoop); }
  addEventListener('scroll', wake, { passive: true });
  addEventListener('resize', wake);
  wake();

  /* -------------------------------------------------------- the order --- */
  var form = document.getElementById('order-form');
  var statusEl = document.getElementById('order-status');
  var totalEl = document.getElementById('order-total');
  var qty = {};
  function money(n) { return lang === 'en' ? '$' + n : n + ' $'; }
  function updateTotal() {
    var n = 0;
    Object.keys(qty).forEach(function (k) { n += qty[k]; });
    if (totalEl) totalEl.textContent = money(n * PRICE);
    var bag = document.getElementById('bag-count');
    if (bag) { bag.textContent = n; bag.hidden = n === 0; }
  }
  document.querySelectorAll('.piece').forEach(function (row) {
    var key = row.dataset.piece, out = row.querySelector('output');
    qty[key] = 0;
    row.querySelectorAll('[data-step]').forEach(function (b) {
      b.addEventListener('click', function () {
        qty[key] = Math.max(0, Math.min(9, qty[key] + Number(b.dataset.step)));
        out.textContent = qty[key]; updateTotal();
      });
    });
  });
  // "Commander" from a label pre-selects its piece (data-piece) once
  document.querySelectorAll('.label__ask').forEach(function (a) {
    a.addEventListener('click', function () {
      var key = a.dataset.piece || null;
      if (key && qty[key] === 0) {
        qty[key] = 1;
        document.querySelector('.piece[data-piece="' + key + '"] output').textContent = '1';
        updateTotal();
      }
    });
  });

  var T = {
    none:    { fr: 'Choisissez au moins un bracelet.', en: 'Choose at least one bracelet.' },
    fields:  { fr: 'Il manque votre nom ou un courriel valide.', en: 'Your name or a valid email is missing.' },
    offline: { fr: 'Les commandes ne sont pas encore branchées, donc rien n’a été envoyé.', en: 'Ordering is not connected yet, so nothing was sent.' },
    sending: { fr: 'Envoi…', en: 'Sending…' },
    ok:      { fr: 'Merci. Votre commande est envoyée, nous vous répondons par courriel.', en: 'Thank you. Your order was sent, we will reply by email.' },
    fail:    { fr: 'L’envoi n’a pas fonctionné. Réessayez dans un moment.', en: 'Sending failed. Please try again in a moment.' }
  };
  function say(key, kind) {
    statusEl.textContent = T[key][lang];
    statusEl.className = 'order__status' + (kind ? ' is-' + kind : '');
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var items = Object.keys(qty).filter(function (k) { return qty[k] > 0; }).map(function (k) { return { piece: k, qty: qty[k] }; });
    if (!items.length) return say('none', 'error');
    if (!form.name.value.trim() || !form.email.checkValidity() || !form.email.value.trim()) return say('fields', 'error');
    if (!ORDER_ENDPOINT) return say('offline', 'error');
    var total = items.reduce(function (n, it) { return n + it.qty * PRICE; }, 0);
    var btn = form.querySelector('.order__send');
    btn.disabled = true; say('sending');
    fetch(ORDER_ENDPOINT, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items, total: total, name: form.name.value.trim(), email: form.email.value.trim(),
        phone: form.phone.value.trim(), note: form.note.value.trim(), lang: lang
      })
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      say('ok', 'ok'); form.reset();
      Object.keys(qty).forEach(function (k) { qty[k] = 0; });
      document.querySelectorAll('.piece output').forEach(function (o) { o.textContent = '0'; });
      updateTotal();
    }).catch(function () { say('fail', 'error'); })
      .then(function () { btn.disabled = false; });
  });

  var saved = store('gjb-lang');
  setLang(saved === 'en' ? 'en' : 'fr');   // French by default; the visitor's choice is remembered
})();
