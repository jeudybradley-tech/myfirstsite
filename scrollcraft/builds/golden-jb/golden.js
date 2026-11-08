/* Golden JB · page script.
   The engine (scrollcraft.js) is mounted first and never edited. Everything
   below is this page's own: language, index,
   the loupe pull-back (peak), and the order plate. */
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

  /* ------------------------------------------------- the rail settle --- */
  document.querySelectorAll('.room__rail > .room__item, .room__rail > .room__note').forEach(function (el, i) {
    el.style.setProperty('--i', i);
  });

  /* ------------------------------------------- 4 · the loupe (peak) --- */
  var loupe = document.querySelector('.loupe');
  var frame = loupe && loupe.querySelector('.loupe__frame');
  var limg = loupe && loupe.querySelector('.loupe__img');
  var llabel = loupe && loupe.querySelector('.loupe__label');
  var FX = 0.262, FY = 0.715, ASPECT = 1664 / 2496;   // the bracelet, in the photo
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var geo = null;

  function loupeGeometry() {
    var vw = innerWidth, vh = loupe.querySelector('.loupe__stage').clientHeight, phone = vw <= 700;
    var W1, H1, x1, y1;
    if (phone) {
      H1 = Math.min(vh * 0.42, (vw - 32) / ASPECT); W1 = H1 * ASPECT;
      x1 = (vw - W1) / 2; y1 = 64;
    } else {
      H1 = vh * 0.8; W1 = H1 * ASPECT;
      x1 = Math.max(vw * 0.3 - W1 / 2, vw * 0.05); y1 = (vh - H1) / 2 + 12;
    }
    var sx = vw * (phone ? 0.5 : 0.42), sy = vh * 0.5;          // where the bracelet sits at the start
    var W0 = Math.max(sx / FX, (vw - sx) / (1 - FX), sy / FY * ASPECT, (vh - sy) / (1 - FY) * ASPECT) * 1.04;
    geo = { vw: vw, vh: vh, phone: phone, W0: W0, W1: W1, H1: H1, x1: x1, y1: y1, sx: sx, sy: sy };
    if (llabel) {
      if (phone) {
        llabel.style.left = '16px'; llabel.style.right = '16px';
        llabel.style.top = (y1 + H1 + 20) + 'px'; llabel.style.bottom = 'auto';
      } else {
        llabel.style.left = (x1 + W1 + vw * 0.07) + 'px'; llabel.style.right = 'auto';
        llabel.style.top = '50%'; llabel.style.bottom = 'auto';
        llabel.style.translate = '0 -50%';
      }
    }
  }

  function drawLoupe() {
    if (!loupe || !geo) return;
    var r = loupe.getBoundingClientRect();
    var travel = r.height - geo.vh;
    var p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 1;
    if (r.bottom < 0 || r.top > geo.vh) return;
    var t = reduce ? 1 : ease(Math.min(1, Math.max(0, (p - 0.04) / 0.6)));
    var W = Math.exp(lerp(Math.log(geo.W0), Math.log(geo.W1), t));
    var fx = lerp(geo.sx, geo.x1 + FX * geo.W1, t);
    var fy = lerp(geo.sy, geo.y1 + FY * geo.H1, t);
    var left = fx - FX * W, top = fy - FY * (W / ASPECT);
    limg.style.transform = 'translate3d(' + left.toFixed(1) + 'px,' + top.toFixed(1) + 'px,0) scale(' + (W / 1000).toFixed(4) + ')';
    var ins = [geo.y1 * t, (geo.vw - geo.x1 - geo.W1) * t, (geo.vh - geo.y1 - geo.H1) * t, geo.x1 * t];
    frame.style.clipPath = 'inset(' + ins.map(function (v) { return v.toFixed(1) + 'px'; }).join(' ') + ' round ' + (3 * t).toFixed(1) + 'px)';
  }

  /* ------------------------------------------------------------- loop ---
     One frame per scroll or resize: the loupe and the index. Nothing runs
     while the page is still. */
  var raf = 0;
  function frameLoop() { raf = 0; drawLoupe(); spy(); }
  function wake() { if (!raf) raf = requestAnimationFrame(frameLoop); }
  addEventListener('scroll', wake, { passive: true });
  addEventListener('resize', function () { if (loupe) loupeGeometry(); wake(); });
  if (loupe) loupeGeometry();
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
