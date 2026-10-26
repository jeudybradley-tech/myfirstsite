/* TIMELESS page script.
   Everything bespoke lives here: Lenis, the two frame sequences in which the
   reader's scroll takes a watch apart (the hero, and the second watch in
   layers), the scroll-lit words, the collection rising with the scroll, the
   ring of 88, and the waitlist form. The engine
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

  // ---- scroll-lit words (act 2 and "Custom made"): one span per word, lit
  // from the act's --sc-p in CSS -------------------------------------------
  [].forEach.call(document.querySelectorAll('[data-lit]'), function (p) {
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
  });

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
  var layersAct = actOf('.layers');
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

  // Arriving with a section in the address (the order page's "back to the
  // collection" link): the pinned acts change the page's length after the
  // browser has placed it, so land on the section again once all is laid out.
  if (/^#[a-z][\w-]*$/.test(location.hash) && location.hash !== '#debug') {
    var landOn = function () {
      var t = document.querySelector(location.hash);
      if (!t) return;
      var y = location.hash === '#waitlist' ? maxScroll() : t.getBoundingClientRect().top + scrollY;
      if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
      else window.scrollTo(0, y);
    };
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    requestAnimationFrame(landOn);
    addEventListener('load', function () { requestAnimationFrame(landOn); }, { once: true });
  }

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
  // FRAMES: a sequence of stills from a clip, loaded for a phone on a train
  // =========================================================================
  // The rest of the files arrive once start() is called, coarse to fine
  // (every eighth, then every fourth...), so the whole gesture works early
  // and only gets smoother.
  // Two ways in. 'bitmap': each frame is fetched as a small file and only
  // decoded near where the reader is, off the main thread, then let go (a
  // decoded frame is 6 to 8 MB; a whole set decoded, half a gigabyte).
  // 'image': plain images, left to the browser. A sequence starts with
  // 'bitmap' where the browser offers it and drops to 'image' for good at the
  // first sign of trouble (a refused or stalled download, a file that is not
  // an image, a decode that fails), so the watch always moves.
  // o.win: how many frames ahead stay decoded (half as many behind); o.keyEvery:
  // every n-th frame stays decoded for good once it arrives, so a fast flick
  // always has a frame close by to show instead of jumping across the clip.
  function Frames(o) {
    var N = o.n, WIN = o.win || 6, KEY = o.keyEvery || 0;
    var files = new Array(N);   // Blob in 'bitmap' mode, a loaded Image in 'image' mode
    var bmp = new Array(N);     // something drawImage can draw at once
    var pending = new Array(N);
    var mode = typeof createImageBitmap === 'function' && typeof fetch === 'function' &&
      typeof Blob === 'function' ? 'bitmap' : 'image';
    var proved = false, decoding = 0, want = 0, heading = 1, queued = false;
    var changed = o.changed || function () {};
    function keep(i) { return i === 0 || (KEY > 0 && i % KEY === 0); }

    function viaImage(i) {
      return new Promise(function (done) {
        if (bmp[i] && !bmp[i].close) { done(); return; }
        var img = new Image();
        img.decoding = 'async';
        img.onload = function () {
          // decoded before it is drawn, so drawing it never stalls a scroll
          var mark = function () {
            files[i] = img;
            if (bmp[i] && bmp[i].close) bmp[i].close();
            bmp[i] = img; changed();
            if (i === 0 && o.first) o.first();
            done();
          };
          if (img.decode) img.decode().then(mark, mark); else mark();
        };
        img.onerror = function () { done(); };
        img.src = o.url(i);
      });
    }
    function fallBack() {
      if (mode === 'image') return;
      mode = 'image';
      // whatever already arrived as a file comes again as an image, from cache
      for (var i = 1; i < N; i++) if (files[i] instanceof Blob) viaImage(i);
    }
    function fetchFrame(i) {
      if (mode !== 'bitmap') return viaImage(i);
      var ctl = typeof AbortController === 'function' ? new AbortController() : null;
      var stall = setTimeout(function () { if (ctl) ctl.abort(); fallBack(); }, 15000);
      return fetch(o.url(i), ctl ? { signal: ctl.signal } : {}).then(function (r) {
        var type = r.headers.get('content-type') || '';
        if (!r.ok || type.indexOf('image/') !== 0) throw new Error('not a frame');
        return r.blob();
      }).then(function (b) {
        clearTimeout(stall);
        if (mode !== 'bitmap') return viaImage(i);
        files[i] = b;
        if (proved) { if (keep(i)) decode(i, true); pump(); return; }
        // the first file proves the path end to end: decode it once, now,
        // and give up on the path if that fails or takes too long
        return new Promise(function (ok) {
          var slow = setTimeout(function () { fallBack(); ok(viaImage(i)); }, 8000);
          createImageBitmap(b).then(function (t) {
            clearTimeout(slow);
            if (t.close) t.close();
            if (mode === 'bitmap') { proved = true; pump(); }
            ok();
          }, function () { clearTimeout(slow); fallBack(); ok(viaImage(i)); });
        });
      }, function () { clearTimeout(stall); fallBack(); return viaImage(i); });
    }
    function decode(i, force) {
      if (i < 0 || i >= N || bmp[i] || pending[i] || !(files[i] instanceof Blob)) return;
      if (!force && decoding >= 2) return;
      pending[i] = true; decoding++;
      createImageBitmap(files[i]).then(function (b) {
        pending[i] = false; decoding--;
        if (mode !== 'bitmap' || (!keep(i) && Math.abs(i - want) > WIN + 3)) { if (b.close) b.close(); }
        else { bmp[i] = b; changed(); }
        pump();
      }, function () { pending[i] = false; decoding--; fallBack(); viaImage(i); });
    }
    // Decode outward from where the reader is, further ahead than behind,
    // two at a time; release what is well behind.
    function pump() {
      if (mode !== 'bitmap') return;
      for (var d = 0; d <= WIN && decoding < 2; d++) {
        decode(want + d * heading);
        if (d && d <= WIN / 2) decode(want - d * heading);
      }
      // the keyframes that arrived before the path was proved
      for (var q = 0; KEY && q < N && decoding < 3; q += KEY) decode(q, true);
      for (var i = 0; i < N; i++) {
        if (bmp[i] && bmp[i].close && !keep(i) && Math.abs(i - want) > WIN + 3) { bmp[i].close(); bmp[i] = null; }
      }
    }
    function start() {
      if (queued) return;
      queued = true;
      var order = [];
      [8, 4, 2, 1].forEach(function (step) {
        for (var i = 0; i < N; i += step) if (order.indexOf(i) < 0 && !(i === 0 && bmp[0])) order.push(i);
      });
      var next = 0;
      var run = function () { if (next < order.length) fetchFrame(order[next++]).then(run); };
      for (var c = 0; c < 4; c++) run();
    }
    return {
      bmp: bmp,
      start: start,
      viaImage: viaImage,
      // a frame already on screen elsewhere (a poster) stands in for frame i
      seed: function (i, img) { files[i] = img; bmp[i] = img; changed(); },
      // where the reader is now, so decoding follows them
      aim: function (k) { if (k !== want) { heading = k > want ? 1 : -1; want = k; pump(); } },
      nearest: function (i) {
        if (bmp[i]) return bmp[i];
        for (var d = 1; d < N; d++) {
          if (i - d >= 0 && bmp[i - d]) return bmp[i - d];
          if (i + d < N && bmp[i + d]) return bmp[i + d];
        }
        return null;
      },
      info: function () {
        var nf = 0, nb = 0;
        for (var z = 0; z < N; z++) { if (files[z]) nf++; if (bmp[z]) nb++; }
        return 'loading ' + mode + (proved ? ' (proved)' : '') + ', files ' + nf + '/' + N + ', drawable ' + nb;
      }
    };
  }

  // =========================================================================
  // HERO: the whole watch on arrival, taken apart by the reader's scroll
  // =========================================================================
  var hero = (function () {
    var stage = document.querySelector('.hero__stage');
    if (!stage || !heroAct) return { layout: function () {}, render: function () {} };
    var plate = stage.querySelector('.hero__plate');
    var dust = stage.querySelector('.hero__dust');
    var poster = stage.querySelector('.hero__poster');
    var name = stage.querySelector('.hero__name');
    var scrim = stage.querySelector('.hero__scrim');
    var lowLines = [].slice.call(stage.querySelectorAll('.hero__line--b'));
    var box = name.querySelector('.hero__letters');
    var letters = [].slice.call(box.children);
    var GAPS = letters.length - 1, MID = GAPS / 2;   // spaces between the letters, the middle letter
    var pctx = plate.getContext('2d', { alpha: false });
    var dctx = dust.getContext('2d');

    // Stills from the supplied clip (10 s, 24 fps, on black). SRC is the clip
    // frame each file holds: every sixth while the watch only draws closer,
    // every second while the crystal lifts and the parts fly, every third
    // while they drift, every second again while they come back together,
    // then a few as it rests. Each file carries 200 rows of strap fading up
    // into the dark above the source frame.
    var SRC = [0, 6, 12, 18, 24, 30, 36, 44,
               46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90,
               93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138,
               140, 142, 144, 146, 148, 150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180,
               186, 196, 208, 222, 239];
    var N = SRC.length, FW = 1560, FH = 1280;
    var HX = 776, HY = 660, HR = 420;   // the case in the first frame, in file pixels
    var CANVAS = '#0b0a09';

    var L = null, lastKey = '', live = false;
    // Phones get a lighter set (1040 wide instead of 1560): about half the
    // bytes, under half the memory, and each frame decodes twice as fast,
    // which is what keeps a quick flick smooth on a phone.
    var small = phoneMQ.matches || (innerWidth < innerHeight && innerWidth < 900);
    var seq = Frames({
      n: N,
      win: small ? 10 : 8,
      keyEvery: 8,
      url: function (i) { return 'assets/' + (small ? 'frames-s' : 'frames') + '/w' + String(i).padStart(2, '0') + '.webp'; },
      changed: function () { lastKey = ''; },
      first: function () { start(); }
    });
    var intro = { start: 0, done: reduce, armed: false };
    var motes = [];
    // Opened with #debug, a small panel says what the hero sees, so a reader
    // whose watch does not move can send a screenshot of it.
    var dbg = null, dbgTick = 0;
    if (location.hash === '#debug') {
      dbg = document.createElement('pre');
      dbg.className = 'tn-debug';
      document.body.appendChild(dbg);
    }

    // Frame 0 is the poster itself: already on screen, already decoded.
    function posterReady() {
      seq.seed(0, poster);
      start();
    }
    function start() {
      if (live) return;
      live = true;
      stage.classList.add('is-live');
      if (!intro.done && !intro.armed) { intro.armed = true; intro.start = performance.now() + 120; }
      // the rest waits until the page itself has finished arriving
      if (document.readyState === 'complete') seq.start();
      else addEventListener('load', seq.start, { once: true });
      setTimeout(seq.start, 4000);
    }
    if (poster.complete && poster.naturalWidth) posterReady();
    else {
      poster.addEventListener('load', posterReady, { once: true });
      poster.addEventListener('error', function () { seq.viaImage(0); }, { once: true });
    }
    // If the footage is slow, never hold the name hostage to it.
    setTimeout(function () { if (!live) intro.done = true; }, 2600);

    // Scroll to clip time. A short still landing, the watch draws closer, the
    // crystal lifts and the parts fly, they drift (the widest stretch, so the
    // reader can hold them there), they come back together, it rests whole,
    // and the light goes out.
    function clipFrame(p) {
      if (p < 0.04) return 0;
      if (p < 0.14) return lerp(0, 44, (p - 0.04) / 0.1);
      if (p < 0.3) return lerp(44, 90, (p - 0.14) / 0.16);
      if (p < 0.5) return lerp(90, 138, (p - 0.3) / 0.2);
      if (p < 0.68) return lerp(138, 180, (p - 0.5) / 0.18);
      if (p < 0.86) return lerp(180, 239, (p - 0.68) / 0.18);
      return 239;
    }
    function slot(s) {
      var k = 0;
      while (k < N - 2 && SRC[k + 1] <= s) k++;
      return { a: k, b: k + 1, f: clamp01((s - SRC[k]) / (SRC[k + 1] - SRC[k])) };
    }

    function layout() {
      var W = stage.clientWidth, H = stage.clientHeight;
      // Stacked (name above the watch) whenever the screen is taller than it
      // is wide; side by side otherwise, down to a gallery thumbnail.
      var phone = W / H < 1;
      stage.classList.toggle('is-stacked', phone);
      // Twice the CSS pixels at most: past that a phone paints a third more for
      // a difference the eye does not see, and a scroll can stutter.
      var dpr = Math.min(devicePixelRatio || 1, 2);
      plate.width = Math.round(W * dpr); plate.height = Math.round(H * dpr);
      // The dust is soft points of light, redrawn every frame: one canvas
      // pixel per CSS pixel is all it needs, a quarter of the work at 2x.
      dust.width = Math.round(W); dust.height = Math.round(H);
      L = { W: W, H: H, dpr: dpr, phone: phone, g: gutterPx(W) };
      // The case is as large as the parts allow: when they fly, the furthest
      // screw travels 1.35 case radii to the left of the centre.
      if (phone) {
        root.classList.remove('tn-tiny');
        L.R = Math.min(W * 0.38, H * 0.26);
        L.hx = W * 0.5; L.hy = H * 0.52;
      } else {
        L.R = Math.min(H * 0.36, W * 0.25, 400);
        L.hx = W * (W / H > 1.9 ? 0.6 : 0.62); L.hy = H * 0.5;
        // The strap runs off the bottom of the screen, 0.62 case radii either
        // side of the centre: keep it clear of the corner link. Below 340 px
        // of height (a gallery thumbnail, not a reader) the corner links go.
        var tiny = H < 340;
        root.classList.toggle('tn-tiny', tiny);
        var cta = document.querySelector('.chrome__cta');
        if (cta && !tiny) {
          var cl = cta.getBoundingClientRect().left;
          if (cl > 0) L.hx = Math.min(L.hx, cl - L.R * 0.62 - 8);
        }
      }
      L.s0 = L.R / HR;
      layoutName();
      if (phone) {
        // Stacked: the strap, as it comes out of the dark (about 1.3 case
        // radii above the centre), starts below the first line, and the case
        // ends above the lower lines.
        var top = L.nameTop + L.size * 1.12 + 40, k = (HY - 110) / HR;
        L.R = Math.min(L.R, (H * 0.82 - top) / (k + 1));
        L.hy = Math.max(L.hy, top + k * L.R);
        L.s0 = L.R / HR;
      }
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
        L.T0 = 0.2; L.T1 = 0.06;
        var room = L.hx - L.R - L.g - clamp(W * 0.04, 16, 56);
        size = Math.min(clamp(W * 0.078, 48, 150), room / ((sum100 + GAPS * L.T0 * 100) / 100));
        L.nameLeft = L.g;
        L.nameTop = L.hy - size * 0.62;
      } else {
        L.T0 = 0.24; L.T1 = 0.1;
        size = Math.min(W * 0.125, 64, W * 0.88 / ((sum100 + GAPS * L.T0 * 100) / 100));
        L.nameLeft = 0;
        L.nameTop = H * 0.11;
      }
      L.size = size;
      L.k = size / 100;
      L.w = w100.map(function (w) { return w * L.k; });
      L.sum = sum100 * L.k;
      name.style.setProperty('--name-size', size + 'px');
      name.style.left = L.nameLeft + 'px';
      name.style.top = L.nameTop + 'px';
      root.classList.add('tn-ready');
      var lineY = L.nameTop + size * 1.12 + 14;
      stage.style.setProperty('--line-a-x', (L.phone ? W / 2 : L.nameLeft + size * 0.04) + 'px');
      stage.style.setProperty('--line-a-y', lineY + 'px');
      stage.style.setProperty('--line-a-max', (L.phone ? W * 0.86 : Math.max(L.hx - L.R - L.g - 16, 120)) + 'px');
      // under the name, a size in proportion to it, never above the text size
      if (L.phone) stage.style.removeProperty('--line-a-fs');
      else stage.style.setProperty('--line-a-fs', clamp(size * 0.24, 10, 15) + 'px');
    }

    function rectFor(push) {
      var s = L.s0 * push;
      return { x: L.hx - HX * s, y: L.hy - HY * s, w: FW * s, h: FH * s };
    }
    function positionPoster() {
      var r = rectFor(1);
      poster.style.left = r.x + 'px'; poster.style.top = r.y + 'px';
      poster.style.width = r.w + 'px'; poster.style.height = r.h + 'px';
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
          z: z, r: (0.5 + rnd() * 1.1) * z, a: 0.16 + rnd() * 0.36,
          v: 6 + rnd() * 10, ph: rnd() * Math.PI * 2
        });
      }
    }

    // The strap already fades into the dark at the top of each file; this
    // makes sure no edge of the file is ever visible, whatever the viewport.
    function feather(ctx, r) {
      var g, fw = r.w * 0.08, fh = r.h * 0.08;
      var edge = function (x0, y0, x1, y1, fx, fy, fwid, fhei) {
        g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, 'rgba(11,10,9,1)'); g.addColorStop(1, 'rgba(11,10,9,0)');
        ctx.fillStyle = g; ctx.fillRect(fx, fy, fwid, fhei);
      };
      edge(r.x, 0, r.x + fw, 0, r.x - 1, r.y - 1, fw + 1, r.h + 2);
      edge(r.x + r.w, 0, r.x + r.w - fw, 0, r.x + r.w - fw, r.y - 1, fw + 1, r.h + 2);
      edge(0, r.y, 0, r.y + fh, r.x - 1, r.y - 1, r.w + 2, fh + 1);
      edge(0, r.y + r.h, 0, r.y + r.h - fh, r.x - 1, r.y + r.h - fh, r.w + 2, fh + 1);
    }

    function draw(fi, push) {
      var sl = slot(fi);
      return drawPair(sl.a, sl.b, sl.f, push);
    }
    function drawPair(ka, kb, f, push) {
      var ia = seq.nearest(ka); if (!ia) return false;
      var ib = f > 0.02 && seq.bmp[kb] ? seq.bmp[kb] : null;
      if (ia !== seq.bmp[ka]) ib = null;
      var sl = { f: f };
      var r = rectFor(push);
      pctx.setTransform(L.dpr, 0, 0, L.dpr, 0, 0);
      pctx.globalAlpha = 1;
      pctx.fillStyle = CANVAS; pctx.fillRect(0, 0, L.W, L.H);
      pctx.drawImage(ia, r.x, r.y, r.w, r.h);
      if (ib) { pctx.globalAlpha = sl.f; pctx.drawImage(ib, r.x, r.y, r.w, r.h); pctx.globalAlpha = 1; }
      feather(pctx, r);
      return true;
    }

    function render(now) {
      if (!L) return;
      var rect = stage.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= L.H) return;
      var p = heroAct.p;
      // The frames follow the scroll under reduced motion too: they only move
      // when the reader does, and they are the page's content (the client's
      // ask is to watch it come apart). Reduced motion drops what moves on
      // its own instead: the smooth-scroll easing, this push, the dust, the
      // letters gathering and drifting.
      var fi = clipFrame(p);
      var push = reduce ? 1 : 1 + 0.04 * smooth(p);
      var light = 1 - 0.9 * smooth((p - 0.9) / 0.1);

      var k0 = slot(fi).a;
      seq.aim(k0);
      var key = fi.toFixed(2) + '|' + push.toFixed(4);
      if (key !== lastKey && live) {
        if (draw(fi, push)) lastKey = key;
      }
      var lo = light.toFixed(3);
      if (plate.style.opacity !== lo) plate.style.opacity = lo;

      ptr.x += (ptr.tx - ptr.x) * 0.06; ptr.y += (ptr.ty - ptr.y) * 0.06;

      // the name tracks in on arrival, then tightens before the watch opens
      var T = reduce ? L.T0 : lerp(L.T0, L.T1, smooth(p / 0.24));
      var centerShift = L.phone ? (L.W - (L.sum + GAPS * T * L.size)) / 2 : 0;
      for (var i = 0; i < letters.length; i++) {
        var dx = i * T * L.size, op = 1;
        if (!intro.done) {
          var e = intro.armed ? easeOut((now - intro.start - Math.abs(i - MID) * 70) / 1150) : 0;
          dx += (1 - e) * (i - MID) * 0.55 * L.size;
          op = e;
        }
        letters[i].style.transform = 'translate3d(' + dx.toFixed(2) + 'px,0,0)';
        letters[i].style.opacity = op < 1 ? op.toFixed(3) : '';
      }
      if (!intro.done && intro.armed && now - intro.start > 1150 + MID * 70 + 40) intro.done = true;
      var by = reduce ? 0 : -p * L.H * 0.06;
      box.style.transform = 'translate3d(' + (centerShift - ptr.x * 7).toFixed(2) + 'px,' + (by - ptr.y * 4).toFixed(2) + 'px,0)';

      // near atmosphere: dust in the lamp light, faster than everything behind it
      dctx.setTransform(1, 0, 0, 1, 0, 0);
      dctx.clearRect(0, 0, L.W, L.H);
      if (!reduce && light > 0.05) {
        var ts = now / 1000;
        for (var m = 0; m < motes.length; m++) {
          var d = motes[m];
          var yy = d.y - ts * d.v * d.z - p * L.H * 0.55 * d.z;
          yy = ((yy % (L.H + 40)) + L.H + 40) % (L.H + 40) - 20;
          var xx = d.x + Math.sin(ts * 0.3 + d.ph) * 6 * d.z - ptr.x * 20 * d.z;
          var a = d.a * light * (0.6 + 0.4 * Math.sin(ts * 0.8 + d.ph));
          dctx.fillStyle = 'rgba(255,238,206,' + a.toFixed(3) + ')';
          dctx.beginPath(); dctx.arc(xx, yy, d.r, 0, Math.PI * 2); dctx.fill();
        }
      }
      // The scrim only exists for the lines it protects, so the watch is never
      // dimmed while nothing is written over it.
      var need = 0;
      for (var q = 0; q < lowLines.length; q++) need = Math.max(need, parseFloat(lowLines[q].style.opacity || '0'));
      var so = need.toFixed(3);
      if (scrim.style.opacity !== so) scrim.style.opacity = so;
      stage.setAttribute('data-sc-verify-state', Math.round(fi * 10) + ' ' + push.toFixed(3) + ' ' + lo + ' ' + T.toFixed(3));
      if (dbg && ++dbgTick % 10 === 0) {
        dbg.textContent = seq.info() +
          '\nreduced motion ' + reduce + ', smooth scroll ' + !!lenis +
          '\nscrollY ' + Math.round(scrollY) + ', page ' + document.documentElement.scrollHeight + ', view ' + innerWidth + 'x' + innerHeight +
          '\nhero p ' + p.toFixed(3) + ', clip frame ' + fi.toFixed(1) + ', drawn ' + (lastKey ? 'yes' : 'no');
      }
      root.classList.toggle('is-docked', p > 0.3);
    }

    return { layout: layout, render: render };
  })();

  // =========================================================================
  // ANOTHER WATCH, IN LAYERS: the second clip, taken apart by the scroll
  // =========================================================================
  var layers = (function () {
    var stage = document.querySelector('.layers__stage');
    if (!stage || !layersAct) return { layout: function () {}, render: function () {} };
    var plate = stage.querySelector('.layers__plate');
    var head = stage.querySelector('.layers__head');
    var list = stage.querySelector('.layers__parts');
    var ctx = plate.getContext('2d', { alpha: false });
    var parts = [].slice.call(stage.querySelectorAll('.layers__parts li')).map(function (li) {
      return { el: li, on: +li.getAttribute('data-on'), off: +li.getAttribute('data-off'), lit: false };
    });
    // Stills from the supplied clip (8 s, 24 fps, 1280x720 on black, cut to
    // 880 around the watch): every third frame, and the last.
    var SRC = [];
    for (var f = 0; f < 190; f += 3) SRC.push(f);
    SRC.push(191);
    var N = SRC.length, FW = 880, FH = 720;
    var L = null, lastKey = '', live = false;
    var seq = Frames({
      n: N,
      win: 24,             // these frames are small (2.5 MB decoded): keep many ready
      keyEvery: 4,
      url: function (i) { return 'assets/layers/l' + String(i).padStart(2, '0') + '.webp'; },
      changed: function () {
        lastKey = '';
        if (!live && seq.bmp[0]) { live = true; stage.classList.add('is-live'); }
      }
    });
    // Nothing of this clip loads with the page: it starts when the reader is
    // a screen and a half away.
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        for (var e = 0; e < es.length; e++) if (es[e].isIntersecting) { seq.start(); io.disconnect(); return; }
      }, { rootMargin: '150% 0px' });
      io.observe(layersAct.el);
    } else {
      addEventListener('load', function () { setTimeout(seq.start, 1500); }, { once: true });
    }

    // Scroll to clip time: a still landing on the whole watch, the layers
    // lift one by one (the widest stretch), they hold, they settle back.
    function clipFrame(p) {
      if (p < 0.06) return 0;
      if (p < 0.42) return lerp(0, 90, (p - 0.06) / 0.36);
      if (p < 0.6) return lerp(90, 138, (p - 0.42) / 0.18);
      if (p < 0.92) return lerp(138, 191, (p - 0.6) / 0.32);
      return 191;
    }
    function slot(t) {
      var k = 0;
      while (k < N - 2 && SRC[k + 1] <= t) k++;
      return { a: k, b: k + 1, f: clamp01((t - SRC[k]) / (SRC[k + 1] - SRC[k])) };
    }

    function layout() {
      var W = stage.clientWidth, H = stage.clientHeight;
      var stacked = W / H < 1;
      stage.classList.toggle('is-stacked', stacked);
      var dpr = Math.min(devicePixelRatio || 1, 2);
      plate.width = Math.round(W * dpr); plate.height = Math.round(H * dpr);
      // The wrist runs across the screen. On a wide screen the stack of
      // layers stands right of centre, the frame as tall as the screen. On a
      // tall one the words sit above and below it, so the frame is sized to
      // the gap between them: the crystal at its highest (row 31 of the clip)
      // stops under the heading, the case (row 700) above the layer names,
      // whatever the phone's height.
      var sc, x, y;
      if (stacked) {
        var top = head.offsetTop + head.offsetHeight + 12;
        var bottom = list.offsetTop - 10;
        sc = (bottom - top) / (700 - 31);
        if (!(sc > 0.2)) sc = Math.max(W * 1.9 / FW, H * 0.7 / FH);
        sc = Math.min(sc, W * 0.92 / 330);          // the stack is about 330 wide
        x = W / 2 - FW * sc / 2;
        y = (sc > 0.2 && bottom > top) ? top - 31 * sc : H * 0.55 - FH * sc / 2;
      } else {
        sc = Math.max(H / FH, W * 0.62 / FW);
        x = W * 0.6 - FW * sc / 2; y = H * 0.5 - FH * sc / 2;
      }
      L = { W: W, H: H, dpr: dpr, x: x, y: y, w: FW * sc, h: FH * sc };
      lastKey = '';
    }

    function feather(r) {
      // the arm leaves the frame at both sides: let it go into the dark slowly
      var fw = r.w * 0.22, fh = r.h * 0.06;
      var edge = function (x0, y0, x1, y1, fx, fy, fwid, fhei) {
        var g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, 'rgba(11,10,9,1)'); g.addColorStop(1, 'rgba(11,10,9,0)');
        ctx.fillStyle = g; ctx.fillRect(fx, fy, fwid, fhei);
      };
      edge(r.x, 0, r.x + fw, 0, r.x - 1, r.y - 1, fw + 1, r.h + 2);
      edge(r.x + r.w, 0, r.x + r.w - fw, 0, r.x + r.w - fw, r.y - 1, fw + 1, r.h + 2);
      edge(0, r.y, 0, r.y + fh, r.x - 1, r.y - 1, r.w + 2, fh + 1);
      edge(0, r.y + r.h, 0, r.y + r.h - fh, r.x - 1, r.y + r.h - fh, r.w + 2, fh + 1);
    }

    function render() {
      if (!L) return;
      var rect = stage.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= L.H) return;
      var fi = clipFrame(layersAct.p), sl = slot(fi);
      seq.aim(sl.a);
      var key = fi.toFixed(2);
      if (key !== lastKey) {
        var ia = seq.nearest(sl.a);
        if (ia) {
          var ib = sl.f > 0.02 && ia === seq.bmp[sl.a] && seq.bmp[sl.b] ? seq.bmp[sl.b] : null;
          ctx.setTransform(L.dpr, 0, 0, L.dpr, 0, 0);
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#0b0a09'; ctx.fillRect(0, 0, L.W, L.H);
          ctx.drawImage(ia, L.x, L.y, L.w, L.h);
          if (ib) { ctx.globalAlpha = sl.f; ctx.drawImage(ib, L.x, L.y, L.w, L.h); ctx.globalAlpha = 1; }
          feather(L);
          lastKey = key;
        }
      }
      // each layer is named, in gold, while it is off the case
      var n = 0;
      for (var i = 0; i < parts.length; i++) {
        var on = fi >= parts[i].on && fi < parts[i].off;
        if (on !== parts[i].lit) { parts[i].lit = on; parts[i].el.classList.toggle('is-lit', on); }
        if (on) n++;
      }
      stage.setAttribute('data-sc-verify-state', Math.round(fi * 10) + ' ' + n);
    }

    return { layout: layout, render: render };
  })();

  // =========================================================================
  // THE COLLECTION: the watches move with the scroll
  // =========================================================================
  // The cards rise at different speeds, column by column, and each photograph
  // drifts inside its frame, slower than its card: two depths. Reduced motion
  // leaves them still.
  var collection = (function () {
    var sec = document.querySelector('.coll');
    if (!sec || reduce) return { layout: function () {}, render: function () {} };
    var cards = [].slice.call(sec.querySelectorAll('.piece'));
    var photos = cards.map(function (c) { return c.querySelector('.piece__photo'); });
    var cols = 4, amp = 120, last = -1;
    var SPEED = { 1: [0.8], 2: [0.55, 1.1], 4: [0.5, 1.05, 0.7, 1.25] };
    function layout() {
      cols = innerWidth <= 359 ? 1 : innerWidth <= 1000 ? 2 : 4;
      amp = Math.min(140, innerHeight * 0.15) * (cols === 4 ? 1 : 0.7);
      last = -1;
    }
    function render() {
      var r = sec.getBoundingClientRect(), vh = innerHeight;
      if (r.bottom < -80 || r.top > vh + 80) return;
      // 0 as the section's top comes in from below, 1 as its bottom leaves above
      var t = clamp01((vh - r.top) / (vh + r.height));
      if (Math.abs(t - last) < 0.0004) return;
      last = t;
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.transform = 'translate3d(0,' + ((0.5 - t) * amp * SPEED[cols][i % cols]).toFixed(2) + 'px,0)';
        if (photos[i]) photos[i].style.transform = 'translate3d(0,' + ((t - 0.5) * 9).toFixed(2) + '%,0) scale(1.14)';
      }
    }
    return { layout: layout, render: render };
  })();

  // =========================================================================
  // "Custom made": its words light by the paragraph's own place on screen, so
  // they read the same beside the photograph or under it on a phone
  // =========================================================================
  var benchWords = (function () {
    var p = document.querySelector('.bench__text');
    if (!p) return { render: function () {} };
    var last = -1;
    function render() {
      var r = p.getBoundingClientRect(), vh = innerHeight;
      if (r.bottom < -80 || r.top > vh + 80) return;
      // 0 as the first line comes up past 88% of the screen, 1 by 46%
      var t = clamp01((vh * 0.88 - r.top) / (vh * 0.42));
      if (Math.abs(t - last) < 0.002) return;
      last = t;
      p.style.setProperty('--lp', t.toFixed(3));
    }
    return { render: render };
  })();

  // =========================================================================
  // chrome state, layout, the loop
  // =========================================================================
  function chrome() {
    if (!finaleAct) return;
    root.classList.toggle('is-closing', finaleAct.p > 0.4);
  }

  function layoutAll() { hero.layout(); layers.layout(); collection.layout(); }
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
    layers.render();
    collection.render();
    benchWords.render();
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
