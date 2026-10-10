/* TÉNÈBRE page script.
   Everything bespoke lives here: Lenis, the hero frame sequence with the name
   passing behind the watch, the scroll-lit words, the drawing that comes out of
   the photograph and apart, the ring of 88, and the waitlist form. The engine
   (scrollcraft.js) is untouched; this reads its act progress and nothing else. */
(function () {
  'use strict';

  // ---- your turn ---------------------------------------------------------
  // A URL that accepts a JSON POST of { name, email }. While it is empty the
  // form says plainly that nothing was sent.
  var WAITLIST_ENDPOINT = '';
  // ------------------------------------------------------------------------

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fineMQ = matchMedia('(hover: hover) and (pointer: fine)');
  var phoneMQ = matchMedia('(max-width: 760px)');
  var root = document.documentElement;

  var clamp = function (x, a, b) { return x < a ? a : x > b ? b : x; };
  var clamp01 = function (x) { return clamp(x, 0, 1); };
  var smooth = function (x) { x = clamp01(x); return x * x * (3 - 2 * x); };
  var easeOut = function (x) { x = clamp01(x); return 1 - Math.pow(1 - x, 3); };
  var easeInOut = function (x) { x = clamp01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var gutterPx = function (W) { return clamp(W * 0.05, 20, 88); };

  // ---- clip 2: pick a codec this browser decodes, before the engine reads it
  (function () {
    var v = document.querySelector('.macro video');
    if (!v) return;
    var h264 = v.canPlayType('video/mp4; codecs="avc1.640028"');
    var vp9 = v.canPlayType('video/webm; codecs="vp9"');
    if (!h264 && vp9) {
      v.setAttribute('data-sc-src', v.getAttribute('data-webm'));
      v.setAttribute('data-sc-src-mobile', v.getAttribute('data-webm-mobile'));
    }
  })();

  // Under reduced motion the clip is never fetched, so its poster is the
  // picture: use the frame with the crown and the date in it, not the first.
  if (reduce) {
    var mp = document.querySelector('.macro .sc-stage__poster');
    if (mp) mp.src = 'assets/macro-poster.webp';
  }

  // ---- story: one span per word, lit from the act's --sc-p in CSS ----------
  (function () {
    var p = document.querySelector('[data-lit]');
    if (!p) return;
    var words = p.textContent.trim().split(/\s+/);
    p.textContent = '';
    p.style.setProperty('--n', words.length);
    words.forEach(function (w, i) {
      var s = document.createElement('span');
      s.className = 'w';
      s.style.setProperty('--i', i);
      s.textContent = w;
      p.appendChild(s);
      if (i < words.length - 1) p.appendChild(document.createTextNode(' '));
    });
  })();

  // ---- the ring of 88 ------------------------------------------------------
  (function () {
    var svg = document.querySelector('.edition__ring');
    if (!svg) return;
    var NS = 'http://www.w3.org/2000/svg';
    for (var i = 0; i < 88; i++) {
      var a = (i / 88) * Math.PI * 2 - Math.PI / 2;
      var major = i % 11 === 0;
      var r0 = major ? 84 : 88.5, r1 = 96;
      var l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', (Math.cos(a) * r0).toFixed(3));
      l.setAttribute('y1', (Math.sin(a) * r0).toFixed(3));
      l.setAttribute('x2', (Math.cos(a) * r1).toFixed(3));
      l.setAttribute('y2', (Math.sin(a) * r1).toFixed(3));
      l.style.setProperty('--i', i);
      if (major) l.setAttribute('class', 'is-major');
      svg.appendChild(l);
    }
  })();

  var sc = ScrollCraft.mount(document.body);
  function actOf(sel) {
    var el = document.querySelector(sel);
    for (var i = 0; i < sc.acts.length; i++) if (sc.acts[i].el === el) return sc.acts[i];
    return null;
  }
  var heroAct = actOf('.hero');
  var explodeAct = actOf('.explode');
  var finaleAct = actOf('.finale');
  var maxScroll = function () { return Math.max(document.documentElement.scrollHeight - innerHeight, 0); };

  // ---- Lenis ---------------------------------------------------------------
  var lenis = null;
  if (!reduce && typeof window.Lenis === 'function') {
    lenis = new window.Lenis({ lerp: 0.085, wheelMultiplier: 0.95, smoothWheel: true, anchors: false });
    window.__lenis = lenis;
  }

  // Anchors glide through the page instead of jumping, and the waitlist link
  // lands with the cursor in the first field.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    var target = id === '#top' ? document.body : document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    var done = function () {
      if (id === '#waitlist') {
        var f = document.getElementById('wl-name');
        if (f) f.focus({ preventScroll: true });
      }
      try { history.replaceState(null, '', id === '#top' ? location.pathname : id); } catch (err) {}
    };
    // The waitlist lives at the end of a pinned act, so its place on the
    // page is the bottom of the document, not the top of its section.
    var y = id === '#top' ? 0 : id === '#waitlist' ? maxScroll() : target.getBoundingClientRect().top + scrollY;
    if (lenis) {
      lenis.scrollTo(y, { duration: id === '#top' ? 2.2 : 2.6, easing: easeInOut, onComplete: done });
    } else {
      window.scrollTo({ top: y, behavior: 'auto' });
      done();
    }
  });

  // Keyboard focus on the waitlist while the act is still showing the ring:
  // park the act where the form is lit (the end of the page) before the
  // engine's own focus handler runs, so focus never sits on a hidden field.
  document.addEventListener('focusin', function (e) {
    var ask = e.target.closest && e.target.closest('.finale__ask');
    if (!ask || parseFloat(getComputedStyle(ask).opacity || '1') > 0.85) return;
    var y = maxScroll();
    if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
    sc.read();
  });

  // ---- pointer (fine pointers only, never locked) ---------------------------
  var ptr = { tx: 0, ty: 0, x: 0, y: 0 };
  if (!reduce) {
    addEventListener('pointermove', function (e) {
      if (!fineMQ.matches || e.pointerType !== 'mouse') return;
      ptr.tx = (e.clientX / innerWidth - 0.5) * 2;
      ptr.ty = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // =========================================================================
  // HERO: canvas frame sequence, name between the plate and the watch
  // =========================================================================
  var hero = (function () {
    var stage = document.querySelector('.hero__stage');
    if (!stage || !heroAct) return { layout: function () {}, render: function () {} };
    var plate = stage.querySelector('.hero__plate');
    var watch = stage.querySelector('.hero__watch');
    var dust = stage.querySelector('.hero__dust');
    var poster = stage.querySelector('.hero__poster');
    var name = stage.querySelector('.hero__name');
    var box = name.querySelector('.hero__letters');
    var letters = [].slice.call(box.children);
    var pctx = plate.getContext('2d', { alpha: false });
    var wctx = watch.getContext('2d');
    var dctx = dust.getContext('2d');

    // Source geometry, in footage pixels. The camera never moves, so the head
    // sits at the same place in every frame and one matte fits all of them.
    var N = 87, SW = 720, SH = 1280, HX = 367.5, HY = 651.5, HR = 165.5;
    var MATTE = { x: 199, y: 402, w: 360, h: 601 };
    var STILL = 43;            // the best-lit frame, used under reduced motion
    var CANVAS = '#0b0a09';

    var frames = new Array(N), ready = new Array(N), matte = new Image(), matteReady = false;
    var L = null, lastKey = '', live = false;
    var intro = { start: 0, done: reduce, armed: false };
    var motes = [];

    function load(i) {
      var img = new Image();
      img.decoding = 'async';
      img.src = 'assets/frames/h' + String(i).padStart(2, '0') + '.webp';
      frames[i] = img;
      var mark = function () { ready[i] = true; lastKey = ''; maybeStart(); };
      img.onload = function () { (img.decode ? img.decode() : Promise.resolve()).then(mark, mark); };
    }
    matte.onload = function () { matteReady = true; lastKey = ''; maybeStart(); };
    matte.src = 'assets/watch-matte.png';
    if (reduce) { load(STILL); }
    else { load(0); load(STILL); for (var i = 1; i < N; i++) if (i !== STILL) load(i); }

    function maybeStart() {
      var first = reduce ? STILL : 0;
      if (!ready[first] || !matteReady || live) return;
      live = true;
      stage.classList.add('is-live');
      if (!intro.done && !intro.armed) { intro.armed = true; intro.start = performance.now() + 120; }
    }
    // If the footage is slow, never hold the name hostage to it.
    setTimeout(function () { if (!live) intro.done = true; }, 2600);

    function nearest(i) {
      if (ready[i]) return frames[i];
      for (var d = 1; d < N; d++) {
        if (i - d >= 0 && ready[i - d]) return frames[i - d];
        if (i + d < N && ready[i + d]) return frames[i + d];
      }
      return null;
    }

    function layout() {
      var W = stage.clientWidth, H = stage.clientHeight;
      var phone = phoneMQ.matches || W / H < 0.8;
      var dpr = Math.min(devicePixelRatio || 1, phone ? 2 : 1.5);
      [plate, watch, dust].forEach(function (c) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); });
      L = { W: W, H: H, dpr: dpr, phone: phone, g: gutterPx(W) };
      if (phone) {
        var s0 = Math.max(W / SW, H / SH) * 1.04;
        var hy = H * 0.56, top = clamp(hy - HY * s0, H - SH * s0, 0);
        L.s0 = s0; L.hx = W / 2 + (HX - SW / 2) * s0; L.hy = top + HY * s0;
      } else {
        var R = clamp(H * 0.215, 110, 250);
        L.s0 = R / HR; L.hx = W * (W / H > 1.9 ? 0.62 : 0.64); L.hy = H * 0.5;
      }
      layoutName();
      positionPoster();
      seedMotes();
      lastKey = '';
    }

    function layoutName() {
      var W = L.W, H = L.H;
      letters.forEach(function (s) { s.style.transform = 'none'; });
      name.style.setProperty('--name-size', '100px');
      var w100 = letters.map(function (s) { return s.getBoundingClientRect().width; });
      var sum100 = w100.reduce(function (a, b) { return a + b; }, 0);
      var size;
      if (!L.phone) {
        L.T0 = 0.2; L.T1 = 0.05;
        var headLeft = L.hx - HR * L.s0, tuck = 0.42;
        var unit = (sum100 + 6 * L.T0 * 100 - tuck * w100[6]) / 100;
        size = Math.min(clamp(W * 0.078, 48, 150), (headLeft - L.g) / unit);
        L.k = size / 100;
        L.nameLeft = headLeft + tuck * w100[6] * L.k - (sum100 * L.k + 6 * L.T0 * size);
        L.nameTop = L.hy - size * 0.62;
      } else {
        L.T0 = 0.24; L.T1 = 0.1;
        size = Math.min(W * 0.125, 64);
        L.k = size / 100;
        L.nameLeft = 0;
        L.nameTop = H * 0.12;
      }
      L.size = size;
      L.w = w100.map(function (w) { return w * L.k; });
      L.sum = sum100 * L.k;
      L.x0 = []; var acc = 0;
      for (var i = 0; i < L.w.length; i++) { L.x0.push(acc); acc += L.w[i]; }
      name.style.setProperty('--name-size', size + 'px');
      name.style.left = L.nameLeft + 'px';
      name.style.top = L.nameTop + 'px';
      root.classList.add('tn-ready');
      // the small line sits under the name, on the name's own left edge
      var lineY = L.nameTop + size * 1.12 + 14;
      stage.style.setProperty('--line-a-x', (L.phone ? W / 2 : L.nameLeft + size * 0.04) + 'px');
      stage.style.setProperty('--line-a-y', lineY + 'px');
    }

    function positionPoster() {
      var s = L.s0;
      poster.style.left = (L.hx - HX * s) + 'px';
      poster.style.top = (L.hy - HY * s) + 'px';
      poster.style.width = (SW * s) + 'px';
      poster.style.height = (SH * s) + 'px';
      poster.style.objectFit = 'fill';
    }

    function seedMotes() {
      motes = [];
      var n = L.phone ? 26 : 44;
      var seed = 7;
      var rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      for (var i = 0; i < n; i++) {
        var z = 0.35 + rnd() * 0.65;
        motes.push({
          x: L.hx + (rnd() - 0.5) * (L.phone ? L.W * 1.1 : L.W * 0.62),
          y: rnd() * L.H,
          z: z, r: (0.5 + rnd() * 1.1) * z, a: 0.18 + rnd() * 0.42,
          v: 6 + rnd() * 10, ph: rnd() * Math.PI * 2
        });
      }
    }

    function feather(ctx, x, y, w, h) {
      var g;
      var fw = w * 0.26;
      g = ctx.createLinearGradient(x, 0, x + fw, 0);
      g.addColorStop(0, 'rgba(11,10,9,1)'); g.addColorStop(1, 'rgba(11,10,9,0)');
      ctx.fillStyle = g; ctx.fillRect(x - 1, y, fw + 1, h);
      g = ctx.createLinearGradient(x + w, 0, x + w - fw, 0);
      g.addColorStop(0, 'rgba(11,10,9,1)'); g.addColorStop(1, 'rgba(11,10,9,0)');
      ctx.fillStyle = g; ctx.fillRect(x + w - fw, y, fw + 1, h);
      var fh = h * 0.12;
      g = ctx.createLinearGradient(0, y + h, 0, y + h - fh);
      g.addColorStop(0, 'rgba(11,10,9,1)'); g.addColorStop(1, 'rgba(11,10,9,0)');
      ctx.fillStyle = g; ctx.fillRect(x, y + h - fh, w, fh + 1);
    }

    function drawFrames(fi, push) {
      var A = Math.floor(fi), f = fi - A, B = Math.min(A + 1, N - 1);
      var ia = nearest(A); if (!ia) return false;
      var ib = f > 0.02 && ready[B] ? frames[B] : null;
      var s = L.s0 * push, x = L.hx - HX * s, y = L.hy - HY * s, w = SW * s, h = SH * s;

      pctx.setTransform(L.dpr, 0, 0, L.dpr, 0, 0);
      pctx.globalAlpha = 1;
      pctx.fillStyle = CANVAS; pctx.fillRect(0, 0, L.W, L.H);
      pctx.drawImage(ia, x, y, w, h);
      if (ib) { pctx.globalAlpha = f; pctx.drawImage(ib, x, y, w, h); pctx.globalAlpha = 1; }
      if (!L.phone) feather(pctx, x, y, w, h);

      wctx.setTransform(L.dpr, 0, 0, L.dpr, 0, 0);
      wctx.clearRect(0, 0, L.W, L.H);
      if (!L.phone && matteReady) {
        var mx = x + MATTE.x * s, my = y + MATTE.y * s, mw = MATTE.w * s, mh = MATTE.h * s;
        wctx.globalCompositeOperation = 'source-over';
        wctx.globalAlpha = 1;
        wctx.drawImage(ia, MATTE.x, MATTE.y, MATTE.w, MATTE.h, mx, my, mw, mh);
        if (ib) { wctx.globalAlpha = f; wctx.drawImage(ib, MATTE.x, MATTE.y, MATTE.w, MATTE.h, mx, my, mw, mh); wctx.globalAlpha = 1; }
        wctx.globalCompositeOperation = 'destination-in';
        wctx.drawImage(matte, mx, my, mw, mh);
        wctx.globalCompositeOperation = 'source-over';
      }
      return true;
    }

    function render(now) {
      if (!L) return;
      var rect = stage.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= L.H) return;
      var p = heroAct.p;
      var fi = reduce ? STILL : clamp(p / 0.86, 0, 1) * (N - 1);
      var push = reduce ? 1 : 1 + 0.065 * smooth(p);
      var light = 1 - 0.92 * smooth((p - 0.8) / 0.2);

      var key = fi.toFixed(2) + '|' + push.toFixed(4);
      if (key !== lastKey && live) { if (drawFrames(fi, push)) lastKey = key; }
      var lo = light.toFixed(3);
      if (plate.style.opacity !== lo) { plate.style.opacity = lo; watch.style.opacity = lo; }

      // pointer drift, eased
      ptr.x += (ptr.tx - ptr.x) * 0.06; ptr.y += (ptr.ty - ptr.y) * 0.06;

      // the name: out from behind the watch on arrival, then it tracks in
      var T = reduce ? L.T0 : lerp(L.T0, L.T1, smooth(p / 0.72));
      var t = intro.done ? 1 : 0;
      var centerShift = 0;
      if (L.phone) centerShift = (L.W - (L.sum + 6 * T * L.size)) / 2;
      for (var i = 0; i < letters.length; i++) {
        var dx = i * T * L.size, op = 1;
        if (!intro.done) {
          var e = intro.armed ? easeOut((now - intro.start - (6 - i) * 75) / 1250) : 0;
          if (!L.phone) {
            var slot = L.nameLeft + L.x0[i] + i * L.T0 * L.size + L.w[i] / 2;
            dx += (1 - e) * (L.hx - slot);
          } else {
            dx += (1 - e) * (i - 3) * 0.55 * L.size;
            op = e;
          }
        }
        letters[i].style.transform = 'translate3d(' + dx.toFixed(2) + 'px,0,0)';
        letters[i].style.opacity = op < 1 ? op.toFixed(3) : '';
      }
      if (!intro.done && intro.armed && now - intro.start > 1250 + 6 * 75 + 40) intro.done = true;
      var by = reduce ? 0 : -p * L.H * 0.06;
      box.style.transform = 'translate3d(' + (centerShift - ptr.x * 7).toFixed(2) + 'px,' + (by - ptr.y * 4).toFixed(2) + 'px,0)';

      // near atmosphere: dust in the light, faster than everything behind it
      dctx.setTransform(L.dpr, 0, 0, L.dpr, 0, 0);
      dctx.clearRect(0, 0, L.W, L.H);
      if (!reduce && light > 0.05) {
        var lit = 0.3 + 0.7 * Math.pow(Math.sin(Math.PI * clamp(fi / (N - 1), 0, 1)), 0.8);
        var ts = now / 1000;
        for (var m = 0; m < motes.length; m++) {
          var d = motes[m];
          var yy = d.y - ts * d.v * d.z - p * L.H * 0.55 * d.z;
          yy = ((yy % (L.H + 40)) + L.H + 40) % (L.H + 40) - 20;
          var xx = d.x + Math.sin(ts * 0.3 + d.ph) * 6 * d.z - ptr.x * 20 * d.z;
          var a = d.a * lit * light * (0.6 + 0.4 * Math.sin(ts * 0.8 + d.ph));
          dctx.fillStyle = 'rgba(255,238,206,' + a.toFixed(3) + ')';
          dctx.beginPath(); dctx.arc(xx, yy, d.r, 0, Math.PI * 2); dctx.fill();
        }
      }
      stage.setAttribute('data-sc-verify-state', Math.round(fi * 10) + ' ' + push.toFixed(3) + ' ' + lo + ' ' + T.toFixed(3));
      root.classList.toggle('is-docked', p > 0.84);
    }

    return { layout: layout, render: render };
  })();

  // =========================================================================
  // THE PEAK: the photograph becomes a drawing, tips back, comes apart
  // =========================================================================
  var anatomy = (function () {
    var stage = document.querySelector('.explode__stage');
    if (!stage || !explodeAct) return { layout: function () {}, render: function () {} };
    var cv = stage.querySelector('.explode__canvas');
    var ctx = cv.getContext('2d');
    var photo = stage.querySelector('.explode__photo');
    var scanEl = stage.querySelector('.explode__scan');
    var parts = [].slice.call(stage.querySelectorAll('.explode__parts li'));
    var specCase = stage.querySelector('[data-anchor="case"]');
    var specBarrel = stage.querySelector('[data-anchor="barrel"]');
    var specCount = stage.querySelector('[data-anchor="count"]');
    var GOLD = '201,166,107';
    var FILL = 'rgba(9,8,7,0.96)';
    var G = null, lastKey = '';

    // Seven layers, top (nearest the eye) to bottom. r and th in units of R.
    var LAYERS = [
      { name: 'crystal', r: 0.81, th: 0.03 },
      { name: 'bezel', r: 0.995, rin: 0.8, th: 0.07 },
      { name: 'hands', r: 0.7, th: 0 },
      { name: 'dial', r: 0.8, th: 0.025 },
      { name: 'movement', r: 0.88, th: 0.12 },
      { name: 'case', r: 1.0, th: 0.2 },
      { name: 'caseback', r: 0.93, th: 0.05 }
    ];

    function layout() {
      var W = stage.clientWidth, H = stage.clientHeight;
      var phone = phoneMQ.matches || W / H < 0.8;
      var dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      G = { W: W, H: H, dpr: dpr, phone: phone, g: gutterPx(W) };
      if (phone) {
        G.Rf = Math.min(W * 0.36, H * 0.22);
        G.Re = Math.min(W * 0.23, H * 0.135);
        G.cx = W * 0.4; G.cxf = W * 0.5; G.cy = H * 0.52;
        G.Dk = 0.62;
      } else {
        G.Rf = Math.min(H * 0.24, W * 0.2);
        G.Re = Math.min(H * 0.165, W * 0.13);
        G.cx = W * 0.5; G.cxf = W * 0.5; G.cy = H * 0.53;
        G.Dk = 0.56;
      }
      var size = 380 * (G.Rf / 165.5);
      G.photo = size;
      photo.style.setProperty('--photo-size', size + 'px');
      photo.style.setProperty('--photo-x', (G.cxf - size / 2) + 'px');
      photo.style.setProperty('--photo-y', (G.cy - size / 2) + 'px');
      [specCase, specBarrel, specCount].forEach(function (s) { s.__h = s.offsetHeight; s.__w = s.offsetWidth; });
      parts.forEach(function (li) { li.__w = li.offsetWidth; });
      lastKey = '';
    }

    // ---- projection --------------------------------------------------------
    // A point (x, y) in a layer's own plane, in units of R, with y toward 12
    // o'clock negative. The whole watch turns by rho in its plane, then tips
    // back about the screen's horizontal axis, so every circle projects to an
    // axis-aligned ellipse of radii (r, r*k).
    function P(x, y, oy) {
      var c = Math.cos(G.rho), s = Math.sin(G.rho);
      var X = (x * c - y * s) * G.R, Y = (x * s + y * c) * G.R;
      return [G.cx + X, G.cy + oy + Y * G.k];
    }
    function ell(ox, oy, r) { ctx.ellipse(ox, oy, r * G.R, r * G.R * G.k, 0, 0, Math.PI * 2); }
    function stroke(a, w) { ctx.strokeStyle = 'rgba(' + GOLD + ',' + a + ')'; ctx.lineWidth = w || 1; ctx.stroke(); }
    function poly(pts, oy) {
      ctx.beginPath();
      for (var i = 0; i < pts.length; i++) { var q = P(pts[i][0], pts[i][1], oy); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }
      ctx.closePath();
    }
    function radial(a, r0, r1, oy) {
      var p0 = P(Math.sin(a) * r0, -Math.cos(a) * r0, oy), p1 = P(Math.sin(a) * r1, -Math.cos(a) * r1, oy);
      ctx.moveTo(p0[0], p0[1]); ctx.lineTo(p1[0], p1[1]);
    }
    // A disc with real thickness: the silhouette of a short cylinder.
    function cylinder(oy, r, th, holeR) {
      var R = r * G.R, ry = R * G.k, h = th * G.R * G.st, x = G.cx, y = G.cy + oy;
      ctx.beginPath();
      if (h > 0.6) {
        ctx.moveTo(x + R, y);
        ctx.lineTo(x + R, y + h);
        ctx.ellipse(x, y + h, R, ry, 0, 0, Math.PI);
        ctx.lineTo(x - R, y);
        ctx.ellipse(x, y, R, ry, 0, Math.PI, Math.PI * 2);
      } else {
        ctx.ellipse(x, y, R, ry, 0, 0, Math.PI * 2);
      }
      if (holeR) { ctx.moveTo(x + holeR * G.R, y); ctx.ellipse(x, y, holeR * G.R, holeR * G.R * G.k, 0, 0, Math.PI * 2); }
      ctx.fillStyle = FILL; ctx.fill(holeR ? 'evenodd' : 'nonzero');
      stroke(0.95);
      if (h > 0.6) { ctx.beginPath(); ctx.ellipse(x, y, R, ry, 0, 0, Math.PI); stroke(0.95); }
    }
    function gear(cxp, cyp, oy, r, ang, spokes, teeth) {
      var c = P(cxp, cyp, oy);
      ctx.beginPath(); ctx.ellipse(c[0], c[1], r * G.R, r * G.R * G.k, 0, 0, Math.PI * 2);
      ctx.fillStyle = FILL; ctx.fill(); stroke(0.55, 0.8);
      // teeth: a dashed rim whose offset turns with the wheel
      var circ = Math.PI * 2 * r * G.R;
      var tooth = circ / (teeth * 2);
      ctx.save();
      ctx.setLineDash([tooth, tooth]);
      ctx.lineDashOffset = -ang * r * G.R;
      ctx.beginPath(); ctx.ellipse(c[0], c[1], (r + 0.012) * G.R, (r + 0.012) * G.R * G.k, 0, 0, Math.PI * 2);
      stroke(0.9, 1.6);
      ctx.restore();
      ctx.beginPath();
      for (var i = 0; i < spokes; i++) {
        var a = ang + (i / spokes) * Math.PI * 2;
        var q0 = P(cxp + Math.sin(a) * r * 0.22, cyp - Math.cos(a) * r * 0.22, oy);
        var q1 = P(cxp + Math.sin(a) * r * 0.86, cyp - Math.cos(a) * r * 0.86, oy);
        ctx.moveTo(q0[0], q0[1]); ctx.lineTo(q1[0], q1[1]);
      }
      stroke(0.6, 0.8);
      ctx.beginPath(); ctx.ellipse(c[0], c[1], 0.022 * G.R, 0.022 * G.R * G.k, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + GOLD + ',0.9)'; ctx.fill();
    }

    // ---- the seven layers ----------------------------------------------------
    function drawCaseback(oy, L) {
      cylinder(oy, L.r, L.th);
      ctx.beginPath(); ell(G.cx, G.cy + oy, 0.78); stroke(0.5, 0.8);
      ctx.beginPath(); ell(G.cx, G.cy + oy, 0.6); stroke(0.35, 0.8);
      ctx.beginPath(); ell(G.cx, G.cy + oy, 0.4); stroke(0.25, 0.8);
      ctx.beginPath();
      for (var i = 0; i < 6; i++) radial(i / 6 * Math.PI * 2 + 0.26, 0.84, 0.91, oy);
      stroke(0.8, 2);
    }
    function drawCase(oy, L) {
      var h = L.th * G.R * G.st;
      // lugs and the first link of the bracelet, under the case drum
      var blocks = [
        [[-0.64, -0.72], [0.64, -0.72], [0.62, -1.24], [-0.62, -1.24]],
        [[-0.64, 0.72], [0.64, 0.72], [0.62, 1.24], [-0.62, 1.24]],
        [[-0.53, -1.24], [0.53, -1.24], [0.53, -1.6], [-0.53, -1.6]],
        [[-0.53, 1.24], [0.53, 1.24], [0.53, 1.6], [-0.53, 1.6]]
      ];
      // The lugs and the first link match the photograph in the front view,
      // then step aside as the watch tips back, so the exploded drawing reads
      // as a clean stack rather than a tangle of flaps.
      var lugA = 1 - smooth((G.tiltT - 0.2) / 0.5);
      if (lugA > 0.01) {
      ctx.save();
      ctx.globalAlpha = lugA;
      for (var b = 0; b < blocks.length; b++) {
        if (h > 0.6) { poly(blocks[b], oy + h); stroke(0.3, 0.8); }
        poly(blocks[b], oy); ctx.fillStyle = FILL; ctx.fill(); stroke(0.85);
      }
      ctx.beginPath();
      [-1, 1].forEach(function (sgn) {
        [1.36, 1.48].forEach(function (yy) {
          var a = P(-0.53, sgn * yy, oy), c = P(0.53, sgn * yy, oy);
          ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]);
        });
        [-0.18, 0.18].forEach(function (xx) {
          var a = P(xx, sgn * 1.24, oy), c = P(xx, sgn * 1.6, oy);
          ctx.moveTo(a[0], a[1]); ctx.lineTo(c[0], c[1]);
        });
      });
      stroke(0.45, 0.8);
      ctx.restore();
      }
      // crown
      var crown = [[0.98, -0.12], [1.13, -0.12], [1.13, 0.12], [0.98, 0.12]];
      if (h > 0.6) { poly(crown, oy + h * 0.5); stroke(0.3, 0.8); }
      poly(crown, oy); ctx.fillStyle = FILL; ctx.fill(); stroke(0.9);
      ctx.beginPath();
      for (var g = -2; g <= 2; g++) { var a1 = P(1.06, g * 0.045, oy), a2 = P(1.13, g * 0.045, oy); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(a2[0], a2[1]); }
      stroke(0.5, 0.7);
      cylinder(oy, L.r, L.th);
      ctx.beginPath(); ell(G.cx, G.cy + oy, 0.87); stroke(0.45, 0.8);
    }
    function drawMovement(oy, L, gearA, balA) {
      cylinder(oy, L.r, L.th);
      // screws near the rim
      ctx.beginPath();
      [0.5, 2.6, 4.4].forEach(function (a) {
        var c = P(Math.sin(a) * 0.78, -Math.cos(a) * 0.78, oy);
        ctx.moveTo(c[0] + 0.035 * G.R, c[1]); ctx.ellipse(c[0], c[1], 0.035 * G.R, 0.035 * G.R * G.k, 0, 0, Math.PI * 2);
        var s0 = P(Math.sin(a) * 0.78 - 0.03, -Math.cos(a) * 0.78, oy), s1 = P(Math.sin(a) * 0.78 + 0.03, -Math.cos(a) * 0.78, oy);
        ctx.moveTo(s0[0], s0[1]); ctx.lineTo(s1[0], s1[1]);
      });
      stroke(0.6, 0.8);
      // the barrel and its mainspring
      gear(0.34, -0.24, oy, 0.26, gearA * 0.15, 0, 40);
      ctx.beginPath();
      var turns = 3.4, steps = 90;
      for (var i = 0; i <= steps; i++) {
        var u = i / steps, rr = 0.07 + u * 0.15, a = gearA * 0.15 + u * turns * Math.PI * 2;
        var q = P(0.34 + Math.sin(a) * rr, -0.24 - Math.cos(a) * rr, oy);
        i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]);
      }
      stroke(0.55, 0.8);
      // the train
      gear(0, 0, oy, 0.2, -gearA, 4, 32);
      gear(-0.34, -0.2, oy, 0.15, gearA * 2.2, 4, 26);
      gear(-0.45, 0.17, oy, 0.13, -gearA * 4, 4, 22);
      gear(-0.27, 0.43, oy, 0.085, gearA * 7, 3, 15);
      // pallet fork between the escape wheel and the balance
      ctx.beginPath();
      var f0 = P(-0.2, 0.47, oy), f1 = P(-0.02, 0.5, oy);
      ctx.moveTo(f0[0], f0[1]); ctx.lineTo(f1[0], f1[1]);
      stroke(0.8, 1.2);
      // the balance, swinging on its own time
      gear(0.16, 0.5, oy, 0.21, balA, 4, 1);
      ctx.beginPath();
      for (var j = 0; j <= 70; j++) {
        var u2 = j / 70, r2 = 0.02 + u2 * 0.12, a2 = balA * 0.6 + u2 * 4.2 * Math.PI * 2;
        var q2 = P(0.16 + Math.sin(a2) * r2, 0.5 - Math.cos(a2) * r2, oy);
        j ? ctx.lineTo(q2[0], q2[1]) : ctx.moveTo(q2[0], q2[1]);
      }
      stroke(0.4, 0.6);
    }
    function drawDial(oy, L) {
      cylinder(oy, L.r, L.th);
      ctx.beginPath();
      for (var i = 0; i < 60; i++) radial(i / 60 * Math.PI * 2, i % 5 ? 0.755 : 0.735, 0.78, oy);
      stroke(0.5, 0.7);
      // indices, a date window at three
      for (var h = 0; h < 12; h++) {
        if (h === 3) continue;
        var a = h / 12 * Math.PI * 2, cx = Math.sin(a) * 0.65, cy = -Math.cos(a) * 0.65, s = h === 0 ? 0.05 : 0.036;
        poly([[cx - s, cy - s], [cx + s, cy - s], [cx + s, cy + s], [cx - s, cy + s]], oy);
        stroke(0.9, 0.9);
      }
      poly([[0.47, -0.075], [0.65, -0.075], [0.65, 0.075], [0.47, 0.075]], oy);
      stroke(0.9, 0.9);
    }
    function hand(oy, deg, len, tail, w, a) {
      var r = deg * Math.PI / 180, sx = Math.sin(r), sy = -Math.cos(r), nx = -sy, ny = sx;
      poly([[-sx * tail + nx * w, -sy * tail + ny * w], [sx * len + nx * w * 0.5, sy * len + ny * w * 0.5],
            [sx * (len + w), sy * (len + w)], [sx * len - nx * w * 0.5, sy * len - ny * w * 0.5],
            [-sx * tail - nx * w, -sy * tail - ny * w]], oy);
      ctx.fillStyle = FILL; ctx.fill(); stroke(a, 1);
    }
    function drawHands(oy, secDeg) {
      hand(oy, 105, 0.45, 0.08, 0.034, 0.95);
      hand(oy, 283, 0.7, 0.1, 0.024, 0.95);
      hand(oy, secDeg, 0.75, 0.2, 0.008, 0.8);
      var c = P(0, 0, oy);
      ctx.beginPath(); ctx.ellipse(c[0], c[1], 0.04 * G.R, 0.04 * G.R * G.k, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + GOLD + ',0.9)'; ctx.fill();
    }
    function drawBezel(oy, L) {
      cylinder(oy, L.r, L.th, L.rin);
      ctx.beginPath();
      for (var i = 0; i < 72; i++) radial(i / 72 * Math.PI * 2, 0.82, 0.98, oy);
      stroke(0.42, 0.8);
    }
    function drawCrystal(oy, L) {
      var x = G.cx, y = G.cy + oy, R = L.r * G.R, h = L.th * G.R * G.st;
      ctx.beginPath(); ctx.ellipse(x, y, R, R * G.k, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + GOLD + ',0.03)'; ctx.fill(); stroke(0.75);
      if (h > 0.6) { ctx.beginPath(); ctx.ellipse(x, y + h, R, R * G.k, 0, 0, Math.PI); stroke(0.35, 0.8); }
      ctx.beginPath(); ctx.ellipse(x, y, R * 0.96, R * 0.96 * G.k, 0, 0, Math.PI * 2); stroke(0.25, 0.7);
      ctx.beginPath(); ctx.ellipse(x, y, R * 0.7, R * 0.7 * G.k, 0, Math.PI * 1.08, Math.PI * 1.36); stroke(0.6, 1.4);
    }

    function render(now) {
      if (!G) return;
      var rect = stage.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= G.H) return;
      var p = explodeAct.p;
      var scan = reduce ? 1 : smooth((p - 0.08) / 0.2);
      var tilt = reduce ? 1 : smooth((p - 0.27) / 0.17);
      var spread = reduce ? 1 : easeInOut((p - 0.42) / 0.4);
      var gearA = reduce ? 0 : p * Math.PI * 2 * 1.1;
      var tsec = now / 1000;
      var balA = reduce ? 0 : Math.sin(tsec * Math.PI * 2 * 1.25) * 1.1;
      var secDeg = reduce ? 0 : ((tsec * 6) % 360);   // the seconds hand keeps real time, in 1/8 s beats
      if (!reduce) secDeg = Math.floor(secDeg / 0.75) * 0.75;

      G.tiltT = tilt;
      G.R = lerp(G.Rf, G.Re, smooth(Math.max(tilt, 0)));
      G.cx = lerp(G.cxf, G.phone ? G.W * 0.4 : G.W * 0.5, smooth(tilt));
      var th = tilt * 64 * Math.PI / 180;
      G.k = Math.cos(th); G.st = Math.sin(th);
      G.rho = -0.36 * smooth(tilt);
      var D = G.Re * G.Dk * spread;

      // the scan line travels the whole drawing, not just the photograph
      var top = G.cy - 1.7 * G.Rf, bot = G.cy + 1.7 * G.Rf;
      var scanY = lerp(top, bot, scan);
      var cut = clamp((scanY - (G.cy - G.photo / 2)) / G.photo, 0, 1);
      photo.style.setProperty('--scan-cut', (cut * 100).toFixed(2) + '%');
      photo.style.visibility = cut >= 1 ? 'hidden' : 'visible';
      scanEl.style.setProperty('--scan-y', scanY.toFixed(1) + 'px');
      scanEl.style.setProperty('--scan-x', (G.cxf - G.photo * 0.62).toFixed(1) + 'px');
      scanEl.style.setProperty('--scan-w', (G.photo * 1.24).toFixed(1) + 'px');
      scanEl.style.setProperty('--scan-o', (scan > 0 && scan < 1 ? Math.pow(Math.sin(Math.PI * scan), 0.4) : 0).toFixed(3));

      ctx.setTransform(G.dpr, 0, 0, G.dpr, 0, 0);
      ctx.clearRect(0, 0, G.W, G.H);
      ctx.lineJoin = 'round';
      if (scan > 0) {
        ctx.save();
        if (scan < 1) { ctx.beginPath(); ctx.rect(0, 0, G.W, scanY); ctx.clip(); }
        for (var i = LAYERS.length - 1; i >= 0; i--) {
          var Lr = LAYERS[i], oy = (i - 3) * D;
          if (Lr.name === 'caseback') drawCaseback(oy, Lr);
          else if (Lr.name === 'case') drawCase(oy, Lr);
          else if (Lr.name === 'movement') drawMovement(oy, Lr, gearA, balA);
          else if (Lr.name === 'dial') drawDial(oy, Lr);
          else if (Lr.name === 'hands') drawHands(oy, secDeg);
          else if (Lr.name === 'bezel') drawBezel(oy, Lr);
          else drawCrystal(oy, Lr);
        }
        ctx.restore();
      }

      // labels for each layer, on the left, with a short leader
      var labelsOn = smooth((spread - 0.55) / 0.35);
      var colX = G.cx - 1.42 * G.R;
      ctx.beginPath();
      for (var j = 0; j < parts.length; j++) {
        var L2 = LAYERS[j], ly = G.cy + (j - 3) * D + L2.th * G.R * G.st * 0.5;
        var o = clamp01(labelsOn * 1.4 - j * 0.06);
        parts[j].style.opacity = o.toFixed(3);
        parts[j].style.transform = 'translate3d(' + (colX - parts[j].__w - 14).toFixed(1) + 'px,' + (ly - 6).toFixed(1) + 'px,0)';
        if (o > 0.02 && !G.phone) {
          ctx.moveTo(colX - 6, ly); ctx.lineTo(G.cx - L2.r * G.R - 8, ly);
        }
      }
      ctx.strokeStyle = 'rgba(' + GOLD + ',' + (0.35 * labelsOn).toFixed(3) + ')'; ctx.lineWidth = 0.8; ctx.stroke();

      // spec callouts on the right, tied to the parts they describe
      var specX = G.cx + (G.phone ? 1.22 : 1.5) * G.R + 14;
      var caseOy = 2 * D, mvOy = 1 * D;
      var aCase = P(1.13, 0, caseOy); aCase[1] += 0.2 * G.R * G.st * 0.5;
      var aBar = P(0.34, -0.24, mvOy);
      placeSpec(specCase, aCase, specX, 1);
      placeSpec(specBarrel, aBar, specX, -1);
      var cx0 = G.g, cy0 = G.H - G.g - specCount.__h - (G.phone ? 56 : 52);
      specCount.style.transform = 'translate3d(' + cx0 + 'px,' + cy0.toFixed(1) + 'px,0)';

      stage.setAttribute('data-sc-verify-state',
        scan.toFixed(2) + ' ' + tilt.toFixed(2) + ' ' + spread.toFixed(2) + ' ' + Math.round(gearA * 20));
    }

    // Keep the two right-hand callouts from colliding: the barrel's sits
    // above its anchor, the case's below.
    function placeSpec(el, anchor, x, dir) {
      var inner = el.firstElementChild;
      var o = parseFloat(inner.style.opacity || '0');
      var y = dir > 0 ? anchor[1] - el.__h * 0.3 : anchor[1] - el.__h * 0.7;
      el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
      if (o > 0.02) {
        var ly = dir > 0 ? y + el.__h * 0.3 : y + el.__h * 0.7;
        ctx.beginPath();
        ctx.moveTo(anchor[0], anchor[1]);
        ctx.lineTo(anchor[0] + 12, ly);
        ctx.lineTo(x - 10, ly);
        ctx.strokeStyle = 'rgba(' + GOLD + ',' + (0.7 * o).toFixed(3) + ')'; ctx.lineWidth = 0.8; ctx.stroke();
        ctx.beginPath(); ctx.arc(anchor[0], anchor[1], 2.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + GOLD + ',' + o.toFixed(3) + ')'; ctx.fill();
      }
    }

    return { layout: layout, render: render };
  })();

  // =========================================================================
  // chrome state, layout, the loop
  // =========================================================================
  function chrome() {
    if (!finaleAct) return;
    root.classList.toggle('is-closing', finaleAct.p > 0.4);
  }

  function layoutAll() { hero.layout(); anatomy.layout(); }
  layoutAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layoutAll(); });
  var lastW = innerWidth, lastH = innerHeight, rz = 0;
  addEventListener('resize', function () {
    if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 120 && (phoneMQ.matches)) return;
    lastW = innerWidth; lastH = innerHeight;
    cancelAnimationFrame(rz);
    rz = requestAnimationFrame(function () { sc.layout(); layoutAll(); });
  }, { passive: true });

  var lastY = -1;
  function frame(now) {
    if (lenis) lenis.raf(now);
    var y = scrollY;
    if (y !== lastY) { lastY = y; sc.read(); }
    hero.render(now);
    anatomy.render(now);
    chrome();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // =========================================================================
  // the waitlist
  // =========================================================================
  (function () {
    var form = document.getElementById('waitlist-form');
    if (!form) return;
    var nameIn = form.querySelector('#wl-name'), mailIn = form.querySelector('#wl-email');
    var btn = form.querySelector('button'), status = form.querySelector('.close__status');
    var say = function (msg, kind) {
      status.textContent = msg;
      status.classList.toggle('is-error', kind === 'error');
      status.classList.toggle('is-ok', kind === 'ok');
    };
    [nameIn, mailIn].forEach(function (el) {
      el.addEventListener('input', function () { el.removeAttribute('aria-invalid'); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = nameIn.value.trim(), mail = mailIn.value.trim();
      var okMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail);
      if (!name) { nameIn.setAttribute('aria-invalid', 'true'); say('Please leave a name.', 'error'); nameIn.focus(); return; }
      if (!okMail) { mailIn.setAttribute('aria-invalid', 'true'); say('That email address does not look complete.', 'error'); mailIn.focus(); return; }
      if (!WAITLIST_ENDPOINT) {
        say('The waitlist is not connected yet, so nothing was sent.', 'error');
        return;
      }
      btn.disabled = true; say('Sending.');
      fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: mail })
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.reset();
        say('Thank you. You are on the list.', 'ok');
      }).catch(function () {
        say('That did not go through. Please try again in a moment.', 'error');
      }).then(function () { btn.disabled = false; });
    });
  })();
})();
