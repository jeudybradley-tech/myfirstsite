/* Golden JB · page script.
   The engine (scrollcraft.js) is mounted first and never edited. Everything
   below is this page's own: language, index, the hanging chain (signature),
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

  /* ------------------------------------- the hanging chain (signature) --
     A silver chain of oval links hangs from under the index on the right.
     Verlet physics: scroll speed swings it, the pointer pushes it, and it
     settles on its own. A small gold tag stamped JB hangs at the end. */
  var canvas = document.getElementById('chain');
  var ctx = canvas.getContext('2d');
  var N = 22, pts = [], seg = 14, chainW = 220, chainH = 0, dpr = 1;
  var anchorX = 0, anchorY = 0, lastScroll = scrollY, impulse = 0, ptr = null, idle = 0, chainOn = true;

  function layoutChain() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    var phone = innerWidth <= 700;
    chainH = phone ? innerHeight * 0.3 : innerHeight * 0.56;
    chainW = phone ? 120 : 240;
    seg = chainH / N;
    canvas.width = Math.round(chainW * dpr); canvas.height = Math.round((chainH + 80) * dpr);
    canvas.style.width = chainW + 'px'; canvas.style.height = (chainH + 80) + 'px';
    canvas.style.top = (phone ? 50 : 58) + 'px';
    canvas.style.right = (phone ? 0 : Math.max(8, innerWidth * 0.035)) + 'px';
    anchorX = chainW / 2; anchorY = 4;
    pts = [];
    for (var i = 0; i <= N; i++) pts.push({ x: anchorX, y: anchorY + i * seg, px: anchorX, py: anchorY + i * seg });
    if (!reduce) for (var j = 1; j <= N; j++) pts[j].px -= j * 0.35;   // a first, small swing on arrival
  }

  function step() {
    var g = 0.42, damp = 0.985;
    for (var i = 1; i <= N; i++) {
      var q = pts[i], vx = (q.x - q.px) * damp, vy = (q.y - q.py) * damp;
      q.px = q.x; q.py = q.y;
      q.x += vx + impulse * (i / N); q.y += vy + g;
      if (ptr) {
        var dx = q.x - ptr.x, dy = q.y - ptr.y, d2 = dx * dx + dy * dy;
        if (d2 < 1600 && d2 > 0.01) { var d = Math.sqrt(d2), f = (40 - d) / d * 0.5; q.x += dx * f; q.y += dy * f; }
      }
    }
    impulse *= 0.8;
    for (var k = 0; k < 14; k++) {
      pts[0].x = anchorX; pts[0].y = anchorY;
      for (var s = 0; s < N; s++) {
        var a = pts[s], b = pts[s + 1], ddx = b.x - a.x, ddy = b.y - a.y;
        var dist = Math.sqrt(ddx * ddx + ddy * ddy) || 0.001, diff = (dist - seg) / dist;
        if (s === 0) { b.x -= ddx * diff; b.y -= ddy * diff; }
        else { a.x += ddx * diff * 0.5; a.y += ddy * diff * 0.5; b.x -= ddx * diff * 0.5; b.y -= ddy * diff * 0.5; }
      }
      for (var m = 1; m <= N; m++) pts[m].x = Math.max(6, Math.min(chainW - 6, pts[m].x));
    }
  }

  function drawChain() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, chainW, chainH + 80);
    var steel = ctx.createLinearGradient(0, 0, chainW, 0);
    steel.addColorStop(0, '#8d9096'); steel.addColorStop(0.45, '#eef0f2'); steel.addColorStop(0.6, '#c9ccd1'); steel.addColorStop(1, '#7c7f85');
    ctx.lineCap = 'round';
    for (var i = 0; i < N; i++) {
      var a = pts[i], b = pts[i + 1], mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      var ang = Math.atan2(b.y - a.y, b.x - a.x), len = seg * 0.74;
      ctx.save(); ctx.translate(mx, my); ctx.rotate(ang);
      ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 6; ctx.shadowOffsetY = 3;
      ctx.strokeStyle = steel;
      ctx.beginPath();
      if (i % 2 === 0) { ctx.lineWidth = Math.max(1.6, seg * 0.13); ctx.ellipse(0, 0, len, seg * 0.38, 0, 0, Math.PI * 2); }
      else { ctx.lineWidth = Math.max(1.8, seg * 0.16); ctx.moveTo(-len * 0.9, 0); ctx.lineTo(len * 0.9, 0); }
      ctx.stroke();
      ctx.restore();
    }
    // the tag
    var e = pts[N], p = pts[N - 1], ang2 = Math.atan2(e.y - p.y, e.x - p.x) - Math.PI / 2;
    ctx.save(); ctx.translate(e.x, e.y); ctx.rotate(ang2);
    ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4;
    var gold = ctx.createLinearGradient(-14, 0, 14, 30);
    gold.addColorStop(0, '#f0d79a'); gold.addColorStop(0.5, '#d2ae66'); gold.addColorStop(1, '#8f6d2c');
    ctx.fillStyle = gold;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-13, 4, 26, 32, 4) : ctx.rect(-13, 4, 26, 32); ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#120f0a';
    ctx.beginPath(); ctx.arc(0, 10, 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.font = 'italic 600 13px "Cormorant Garamond", serif'; ctx.textAlign = 'center';
    ctx.fillText('JB', 0, 29);
    ctx.restore();
  }

  function chainVisibility() {
    // Desktop: the chain hangs through both objects and steps aside before the
    // lateral room, so it never covers a caption or the order plate.
    // Phone: hero only, where it sits beside the label, not over text.
    var phone = innerWidth <= 700, room = document.querySelector('.room').getBoundingClientRect().top;
    var on = phone ? scrollY < innerHeight * 0.7 : room > innerHeight * 0.6;
    if (on !== chainOn) { chainOn = on; canvas.style.opacity = on ? '1' : '0'; }
  }

  addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse' || reduce) return;
    var r = canvas.getBoundingClientRect();
    ptr = { x: e.clientX - r.left, y: e.clientY - r.top }; idle = 0;
  }, { passive: true });
  document.addEventListener('pointerleave', function () { ptr = null; });

  /* ------------------------------------------------------------- loop --- */
  var raf = 0;
  function frameLoop() {
    raf = 0;
    var dy = scrollY - lastScroll; lastScroll = scrollY;
    if (!reduce && dy) { impulse += Math.max(-6, Math.min(6, dy * 0.05)); idle = 0; }
    chainVisibility();
    if (chainOn && !reduce) {
      step(); drawChain();
      var energy = 0;
      for (var i = 1; i <= N; i++) energy += Math.abs(pts[i].x - pts[i].px) + Math.abs(pts[i].y - pts[i].py);
      idle = energy < 0.05 ? idle + 1 : 0;
    }
    drawLoupe();
    spy();
    if (!document.hidden && (idle < 30 || !chainOn)) raf = requestAnimationFrame(frameLoop);
  }
  function wake() { idle = 0; if (!raf) raf = requestAnimationFrame(frameLoop); }
  addEventListener('scroll', wake, { passive: true });
  addEventListener('pointermove', wake, { passive: true });
  document.addEventListener('visibilitychange', wake);
  addEventListener('resize', function () { layoutChain(); if (loupe) loupeGeometry(); if (reduce) settleStatic(); wake(); });

  function settleStatic() { for (var i = 0; i < 160; i++) step(); drawChain(); }

  layoutChain();
  if (loupe) loupeGeometry();
  if (reduce) settleStatic();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (reduce) drawChain(); else wake(); });
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
  // "Commander" from a label pre-selects that piece once
  document.querySelectorAll('.label__ask').forEach(function (a) {
    a.addEventListener('click', function () {
      var key = a.closest('#n2') ? 'trefle-noir' : a.closest('#n1') ? 'maille-ovale' : null;
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
