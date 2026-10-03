/* PROPAGATE: page-local behaviour.
   The engine (scrollcraft.js) is untouched. Everything bespoke lives here:
   the codec fallback for the hero clip, the scene index, the spore plane,
   the exploded view (the signature move) and the turn-it-yourself close. */
(function () {
  'use strict';

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fineMQ = matchMedia('(hover: hover) and (pointer: fine)');
  // Same switch the engine uses to pick the square phone clip.
  var phoneMQ = matchMedia('(max-width: 860px), (hover: none) and (pointer: coarse)');

  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function clamp01(x) { return clamp(x, 0, 1); }
  function smooth(x) { x = clamp01(x); return x * x * (3 - 2 * x); }
  function easeOut(x) { x = clamp01(x); return 1 - Math.pow(1 - x, 3); }
  function easeInOut(x) { x = clamp01(x); return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }

  // ---- before mount -------------------------------------------------------
  // Chrome, Safari, Edge and Firefox all decode the H.264 masters. A browser
  // without H.264 (open-source Chromium builds) gets VP9 copies of the same
  // frames instead of a poster that never moves.
  var heroVideo = document.querySelector('.hero video[data-sc-scrub]');
  if (heroVideo) {
    var probe = document.createElement('video');
    var h264 = probe.canPlayType('video/mp4; codecs="avc1.640028"');
    var vp9 = probe.canPlayType('video/webm; codecs="vp9"');
    if (!h264 && vp9) {
      heroVideo.setAttribute('data-sc-src', heroVideo.getAttribute('data-webm'));
      heroVideo.setAttribute('data-sc-src-mobile', heroVideo.getAttribute('data-webm-mobile'));
    }
  }

  var peakEl = document.getElementById('exploded');
  // Under reduced motion the exploded view is two still frames, so it does not
  // need four and a half screens of pinned scroll.
  if (reduce && peakEl) peakEl.setAttribute('data-sc-span', '1.6');

  var sc = window.ScrollCraft.mount(document.body);
  function actFor(el) {
    for (var i = 0; i < sc.acts.length; i++) if (sc.acts[i].el === el) return sc.acts[i];
    return null;
  }

  // A deep link (#buy) is followed by the browser before the engine has sized
  // the pinned acts, so it lands short. Follow it again once they exist.
  if (location.hash && location.hash.length > 1) {
    var deep = document.getElementById(location.hash.slice(1));
    if (deep) requestAnimationFrame(function () { deep.scrollIntoView({ behavior: 'instant', block: 'start' }); });
  }

  // ---- keyboard focus in the pinned hero --------------------------------------
  // The hero copy fades out as the tee turns. A pinned stage keeps its controls
  // at one screen position for the whole pin, so the browser's own focus
  // scroll can park "Buy the tee" on a frame where it is invisible. Bring the
  // hero back to its opening frame whenever focus lands inside its copy.
  (function () {
    var hero = document.querySelector('.hero');
    var copy = hero && hero.querySelector('.hero__copy');
    var heroAct = hero && actFor(hero);
    if (!copy || !heroAct) return;
    document.addEventListener('focusin', function (e) {
      if (!copy.contains(e.target)) return;
      if (heroAct.p > 0.4 || scrollY > heroAct.top + heroAct.height) {
        window.scrollTo({ top: heroAct.top, behavior: 'instant' });
        sc.read();
      }
    });
  })();

  // ---- hero clip watchdog --------------------------------------------------
  // The engine reveals a clip on a timer even when no frame ever painted, so a
  // blocked blob URL or a missing codec would leave an empty stage. Keep the
  // poster up until the video has actually shown a frame once.
  (function () {
    var hero = document.querySelector('.hero');
    if (!hero || !heroVideo || reduce) return;
    var everOk = false, failed = false;
    function check() {
      if (heroVideo.readyState >= 2 && !heroVideo.error) everOk = true;
      var revealed = hero.classList.contains('sc-has-clip');
      hero.classList.toggle('clip-missing', revealed && (failed || !everOk));
    }
    heroVideo.addEventListener('error', function () { failed = true; check(); });
    heroVideo.addEventListener('loadeddata', check);
    heroVideo.addEventListener('seeked', check);
    var n = 0, iv = setInterval(function () { check(); if (everOk || failed || ++n > 40) clearInterval(iv); }, 400);
  })();

  // ---- scene index ---------------------------------------------------------
  (function () {
    var links = Array.prototype.slice.call(document.querySelectorAll('.scenes a'));
    if (!links.length) return;
    var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var tops = [], current = -1, pending = false;
    function measure() {
      tops = targets.map(function (t) { return t ? t.getBoundingClientRect().top + scrollY : 0; });
      current = -1;
    }
    function spy() {
      var y = scrollY + innerHeight * 0.45, cur = 0;
      for (var i = 0; i < tops.length; i++) if (tops[i] <= y) cur = i;
      if (cur === current) return;
      current = cur;
      links.forEach(function (a, i) { a.setAttribute('aria-current', i === cur ? 'true' : 'false'); });
    }
    measure(); spy();
    addEventListener('scroll', function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { pending = false; spy(); });
    }, { passive: true });
    addEventListener('resize', function () { measure(); spy(); });
    addEventListener('load', function () { measure(); spy(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { setTimeout(function () { measure(); spy(); }, 60); });
  })();

  // ---- hero spores: the near plane leans with the pointer -------------------
  (function () {
    var wrap = document.querySelector('.hero__spores');
    if (!wrap || reduce || !fineMQ.matches) return;
    var tx = 0, ty = 0, x = 0, y = 0, running = false;
    function step() {
      x += (tx - x) * 0.08; y += (ty - y) * 0.08;
      wrap.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0)';
      if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) requestAnimationFrame(step);
      else running = false;
    }
    addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse' || scrollY > innerHeight * 2.6) return;
      tx = (e.clientX / innerWidth - 0.5) * -30;
      ty = (e.clientY / innerHeight - 0.5) * -18;
      if (!running) { running = true; requestAnimationFrame(step); }
    }, { passive: true });
  })();

  // ---- the exploded view ----------------------------------------------------
  // The back of the tee is cut into Voronoi shards. Scroll blasts them out in
  // depth, holds them in a slow drift while labels pin themselves to real
  // parts of the shirt, then flies them home. On the way back each shard swaps
  // green for blue a beat after its neighbour nearer the centre, so the new
  // colour spreads across the shirt.
  (function () {
    if (!peakEl) return;
    var stage = peakEl.querySelector('.peak__stage');
    var cv = peakEl.querySelector('.peak__canvas');
    var ctx = cv && cv.getContext ? cv.getContext('2d') : null;
    if (!ctx) return;
    var act = actFor(peakEl);
    var glowG = peakEl.querySelector('.peak__glow--g');
    var glowB = peakEl.querySelector('.peak__glow--b');
    var svg = peakEl.querySelector('.peak__leaders');
    var lines = svg.querySelectorAll('line');
    var dots = svg.querySelectorAll('circle');
    if (reduce) stage.setAttribute('data-sc-verify-hold', 'true');

    // Shared space: the green render's pixels. The blue render was scaled and
    // aligned to it by the print, so both images are 1160x1200 and line up.
    var SW = 1160, SH = 1200;
    var HOME = { x: 583, y: 608, w: 794, h: 944 };   // the tee, in shared px
    var ORIGIN = { x: 574, y: 545 };                 // where the blast starts: the print
    var PIVOT = { x: 583, y: 545 };                  // the point the camera looks at
    var F = 1500;                                    // focal length, shared px

    var imgG = new Image(), imgB = new Image(), loaded = 0, dirty = true;
    function onImg() { loaded++; dirty = true; if (loaded === 2) solidity(); }

    // How much of each shard is tee rather than empty background, measured
    // once on a small copy of each image. Empty pieces stay invisible in
    // flight instead of drifting around as dark polygons.
    function solidity() {
      if (!shards.length) return;
      var w = 145, h = 150, c = document.createElement('canvas');
      c.width = w; c.height = h;
      var x = c.getContext('2d', { willReadFrequently: true });
      var g, b;
      try {
        x.drawImage(imgG, 0, 0, w, h); g = x.getImageData(0, 0, w, h).data;
        x.clearRect(0, 0, w, h);
        x.drawImage(imgB, 0, 0, w, h); b = x.getImageData(0, 0, w, h).data;
      } catch (err) { return; }
      shards.forEach(function (sh) {
        var n = 0, sg = 0, sb = 0;
        for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
          var X = (i + 0.5) * SW / w, Y = (j + 0.5) * SH / h;
          if (!inside(X - sh.cx, Y - sh.cy, sh.poly)) continue;
          var o = (j * w + i) * 4; n++;
          if (g[o + 3] > 128 && (0.3 * g[o] + 0.59 * g[o + 1] + 0.11 * g[o + 2]) > 9) sg++;
          if (b[o + 3] > 128 && (0.3 * b[o] + 0.59 * b[o + 1] + 0.11 * b[o + 2]) > 17) sb++;
        }
        sh.solidG = n ? sg / n : 0;
        sh.solidB = n ? sb / n : 0;
      });
      dirty = true;
    }
    imgG.onload = onImg; imgB.onload = onImg;
    imgG.decoding = 'async'; imgB.decoding = 'async';
    imgG.src = 'assets/shard-green.webp';
    imgB.src = 'assets/shard-blue.webp';

    function rng(seed) {
      return function () {
        seed = (seed + 0x6D2B79F5) | 0;
        var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    function clipHalf(poly, ax, ay, bx, by) {
      var mx = (ax + bx) / 2, my = (ay + by) / 2, nx = bx - ax, ny = by - ay, out = [];
      for (var i = 0; i < poly.length; i++) {
        var P = poly[i], Q = poly[(i + 1) % poly.length];
        var dp = (P[0] - mx) * nx + (P[1] - my) * ny;
        var dq = (Q[0] - mx) * nx + (Q[1] - my) * ny;
        if (dp <= 0) out.push(P);
        if ((dp <= 0) !== (dq <= 0)) {
          var t = dp / (dp - dq);
          out.push([P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t]);
        }
      }
      return out;
    }
    function centroid(poly) {
      var a = 0, cx = 0, cy = 0;
      for (var i = 0; i < poly.length; i++) {
        var p = poly[i], q = poly[(i + 1) % poly.length];
        var c = p[0] * q[1] - q[0] * p[1];
        a += c; cx += (p[0] + q[0]) * c; cy += (p[1] + q[1]) * c;
      }
      a *= 0.5;
      if (Math.abs(a) < 1e-6) return [poly[0][0], poly[0][1]];
      return [cx / (6 * a), cy / (6 * a)];
    }
    function inside(x, y, poly) {
      var c = false;
      for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        var a = poly[i], b = poly[j];
        if (((a[1] > y) !== (b[1] > y)) && (x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0])) c = !c;
      }
      return c;
    }

    var anchors = Array.prototype.map.call(peakEl.querySelectorAll('.peak__label'), function (el) {
      var a = el.getAttribute('data-anchor').split(' ').map(parseFloat);
      var d = el.getAttribute('data-dir').split(' ').map(parseFloat);
      return { el: el, tag: el.querySelector('.peak__tag'), x: a[0], y: a[1], ux: d[0], uy: d[1], shard: null };
    });

    var shards = [], order = [];
    function build(count) {
      var R = rng(20261003), sites = [], tries = 0, minD = count > 40 ? 64 : 80;
      // Denser around the print, sparser in the empty margin.
      while (sites.length < count && tries < 40000) {
        tries++;
        var x = R() * SW, y = R() * SH;
        var dx = (x - ORIGIN.x) / 380, dy = (y - ORIGIN.y) / 440;
        if (R() > 0.2 + 0.8 * Math.exp(-(dx * dx + dy * dy))) continue;
        var ok = true;
        for (var j = 0; j < sites.length; j++) {
          var ex = sites[j][0] - x, ey = sites[j][1] - y;
          if (ex * ex + ey * ey < minD * minD) { ok = false; break; }
        }
        if (ok) sites.push([x, y]);
      }
      var rect = [[0, 0], [SW, 0], [SW, SH], [0, SH]], maxD = 1;
      shards = sites.map(function (site, i) {
        var poly = rect;
        for (var j = 0; j < sites.length; j++) if (j !== i) poly = clipHalf(poly, site[0], site[1], sites[j][0], sites[j][1]);
        var c = centroid(poly);
        var local = poly.map(function (p) { return [p[0] - c[0], p[1] - c[1]]; });
        var vx = c[0] - ORIGIN.x, vy = c[1] - ORIGIN.y, d = Math.sqrt(vx * vx + vy * vy) || 1;
        maxD = Math.max(maxD, d);
        var ang = Math.atan2(vy, vx) + (R() - 0.5) * 0.7;
        return {
          poly: local, cx: c[0], cy: c[1], d: d,
          ux: Math.cos(ang), uy: Math.sin(ang) - 0.05,
          dist: 0.32 * d + 30 + R() * 120,
          z: R() * 1.7 - 0.7,
          rot: (R() - 0.5) * 1.1,
          tx: (R() - 0.5) * 1.8, ty: (R() - 0.5) * 1.2,
          solidG: 1, solidB: 1,
          onTee: Math.abs(c[0] - HOME.x) < HOME.w / 2 && Math.abs(c[1] - HOME.y) < HOME.h / 2
        };
      });
      shards.forEach(function (s) { s.dn = s.d / maxD; });
      order = shards.slice().sort(function (a, b) { return a.z - b.z; });
      if (loaded === 2) solidity();
      anchors.forEach(function (A) {
        A.shard = null;
        for (var i = 0; i < shards.length; i++) {
          if (inside(A.x - shards[i].cx, A.y - shards[i].cy, shards[i].poly)) { A.shard = shards[i]; break; }
        }
      });
    }

    var embers = [];
    (function () {
      var R = rng(77);
      for (var i = 0; i < 64; i++) {
        embers.push({ x: -150 + R() * (SW + 300), y: -80 + R() * (SH + 160), z: R() * 1500 - 700, r: 0.8 + R() * 2.2, warm: R() < 0.35 });
      }
    })();

    var W = 0, H = 0, dpr = 1, s = 1, CX = 0, CY = 0, phone = false;
    function layout() {
      var r = stage.getBoundingClientRect();
      W = r.width; H = r.height; phone = phoneMQ.matches;
      dpr = Math.min(window.devicePixelRatio || 1, phone ? 1.5 : 2);
      cv.width = Math.max(1, Math.round(W * dpr));
      cv.height = Math.max(1, Math.round(H * dpr));
      svg.setAttribute('viewBox', '0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0));
      if (phone) { s = Math.min(0.58 * H / HOME.h, 0.84 * W / HOME.w); CX = W * 0.5; CY = H * 0.36; }
      else { s = Math.min(0.82 * H / HOME.h, 0.56 * W / HOME.w); CX = W * 0.52; CY = H * 0.47; }
      anchors.forEach(function (A) { A.w = A.tag.getBoundingClientRect().width; });
      var want = phone ? 34 : 46;
      if (shards.length !== want) build(want);
      var gx = (CX / W * 100).toFixed(1) + '%';
      glowG.style.setProperty('--gx', gx); glowB.style.setProperty('--gx', gx);
      dirty = true;
    }

    function timeline(p) {
      var e;
      if (p < 0.1) e = 0;                                     // held still: the breath
      else if (p < 0.3) e = easeOut((p - 0.1) / 0.2);         // the blast, decelerating
      else if (p < 0.66) e = 1 + 0.08 * (p - 0.3) / 0.36;     // frozen: a slow drift
      else e = 1.08 * (1 - easeInOut((p - 0.66) / 0.22));     // home again
      var cam = 230 * smooth((p - 0.26) / 0.4) * (1 - smooth((p - 0.62) / 0.24));
      return { e: Math.max(e, 0), cam: cam };
    }
    function mixOf(sh, p) { return smooth((p - 0.7 - 0.12 * sh.dn) / 0.06); }

    function project(x, y, z, cam, offX, offY) {
      var k = F / Math.max(F - z - cam, 380);
      return { x: CX + (x - PIVOT.x) * s * k + offX * (k - 1), y: CY + (y - PIVOT.y) * s * k + offY * (k - 1), k: k };
    }
    function pose(sh, e, cam, offX, offY) {
      var P = project(sh.cx + sh.ux * sh.dist * e, sh.cy + sh.uy * sh.dist * e, sh.z * 440 * e, cam, offX, offY);
      var sx = Math.cos(sh.tx * e), sy = Math.cos(sh.ty * e);
      P.sx = (sx < 0 ? -1 : 1) * Math.max(Math.abs(sx), 0.08);
      P.sy = (sy < 0 ? -1 : 1) * Math.max(Math.abs(sy), 0.08);
      P.rot = sh.rot * e;
      return P;
    }

    function drawShard(sh, e, cam, p, offX, offY) {
      var P = pose(sh, e, cam, offX, offY);
      var m = mixOf(sh, p), sc = s * P.k, poly = sh.poly, i;
      if (m < 0.001 && sh.solidG < 0.01) return 0;           // empty and green: nothing to draw
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.translate(P.x, P.y);
      ctx.rotate(P.rot);
      ctx.scale(sc * P.sx, sc * P.sy);
      ctx.beginPath();
      ctx.moveTo(poly[0][0], poly[0][1]);
      for (i = 1; i < poly.length; i++) ctx.lineTo(poly[i][0], poly[i][1]);
      ctx.closePath();
      // Far pieces fade into the dark rather than being painted over, so an
      // empty corner of a shard never shows up as a dark polygon.
      var depth = 1 - Math.min(0.62, Math.max(0, 1 - P.k) * 1.3);
      // A shard that is only background joins the blue tee as it lands.
      var showB = sh.solidB > 0.12 ? 1 : 1 - smooth((e - 0.03) / 0.22);
      ctx.save();
      ctx.clip();
      if (m < 1) { ctx.globalAlpha = depth; ctx.drawImage(imgG, -sh.cx, -sh.cy); }
      if (m > 0 && showB > 0) { ctx.globalAlpha = m * depth * showB; ctx.drawImage(imgB, -sh.cx, -sh.cy); }
      ctx.restore();
      var edgeA = Math.min(1, e) * (1 - m) * smooth(sh.solidG * 3);
      if (e > 0.02 && edgeA > 0.02) {         // a cut edge catching the light
        ctx.globalAlpha = edgeA * (0.16 + 0.14 * clamp01(P.k - 1)) * depth;
        ctx.strokeStyle = '#cfe56a';
        ctx.lineWidth = 1 / sc;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      return m;
    }

    function drawEmbers(e, cam, p, offX, offY, side) {
      var a = smooth(e / 0.5);
      if (a < 0.01) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (var i = 0; i < embers.length; i++) {
        var E = embers[i];
        if ((E.z < 0 ? -1 : 1) !== side) continue;
        var P = project(E.x, E.y - 160 * p, E.z * Math.min(e, 1), cam, offX, offY);
        if (P.x < -20 || P.x > W + 20 || P.y < -20 || P.y > H + 20) continue;
        ctx.globalAlpha = a * (E.warm ? 0.75 : 0.6) * clamp01(P.k);
        ctx.fillStyle = E.warm ? '#ffae5a' : '#cfe76a';
        ctx.beginPath();
        ctx.arc(P.x, P.y, E.r * Math.min(P.k, 2.2), 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function placeLabels(e, cam, offX, offY) {
      var Lx = phone ? 34 : 110, Ly = phone ? 46 : 78, edge = phone ? 12 : 28, nav = phone ? 0 : 150;
      for (var i = 0; i < anchors.length; i++) {
        var A = anchors[i], sh = A.shard;
        var op = parseFloat(A.tag.style.opacity || '0');
        if (!sh || op < 0.01) {
          lines[i].style.opacity = '0'; dots[i].style.opacity = '0';
          continue;
        }
        var P = pose(sh, e, cam, offX, offY), sc = s * P.k;
        var lx = (A.x - sh.cx) * sc * P.sx, ly = (A.y - sh.cy) * sc * P.sy;
        var cr = Math.cos(P.rot), sr = Math.sin(P.rot);
        var ax = P.x + lx * cr - ly * sr, ay = P.y + lx * sr + ly * cr;
        var bx = ax + A.ux * Lx, by = ay + A.uy * Ly;
        // Keep every label whole on screen, clear of the chrome.
        var w = A.w || 160;
        bx = A.ux < 0 ? clamp(bx, edge + w + 8, W - edge) : clamp(bx, edge, W - edge - w - 8 - nav);
        by = clamp(by, phone ? 64 : 84, H - (phone ? 170 : 120));
        A.el.style.transform = 'translate3d(' + (bx + (A.ux < 0 ? -8 : 8)).toFixed(1) + 'px,' + by.toFixed(1) + 'px,0)';
        lines[i].setAttribute('x1', ax.toFixed(1)); lines[i].setAttribute('y1', ay.toFixed(1));
        lines[i].setAttribute('x2', bx.toFixed(1)); lines[i].setAttribute('y2', by.toFixed(1));
        dots[i].setAttribute('cx', ax.toFixed(1)); dots[i].setAttribute('cy', ay.toFixed(1));
        lines[i].style.opacity = (op * 0.55).toFixed(3);
        dots[i].style.opacity = op.toFixed(3);
      }
    }

    function drawWhole(img, alpha) {
      ctx.setTransform(dpr * s, 0, 0, dpr * s, dpr * (CX - PIVOT.x * s), dpr * (CY - PIVOT.y * s));
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = 1;
    }

    var px = 0, py = 0, ptx = 0, pty = 0;
    function draw(p) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      if (loaded < 2) return;
      var e, cam, mix = 0, i;

      if (reduce) {
        // Two still frames and an opacity crossfade, nothing travels.
        var k = smooth((p - 0.62) / 0.16);
        e = 1; cam = 120;
        if (k < 1) for (i = 0; i < order.length; i++) drawShard(order[i], 1, cam, 0, 0, 0);
        if (k > 0) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.globalAlpha = k; ctx.fillStyle = '#020202'; ctx.fillRect(0, 0, cv.width, cv.height);
          drawWhole(imgB, k);
        }
        mix = k;
        glowG.style.opacity = ((1 - k) * 0.7).toFixed(3);
        glowB.style.opacity = (k * 0.95).toFixed(3);
        stage.setAttribute('data-sc-verify-state', 'still|' + (k > 0.5 ? 'blue' : 'green'));
        placeLabels(1, cam, 0, 0);
        return;
      }

      var T = timeline(p);
      e = T.e; cam = T.cam;
      var w = clamp01((e - 0.25) / 0.6), offX = px * 46 * w, offY = py * 30 * w;
      var allBlue = p >= 0.9, allGreen = p < 0.7;
      if (e < 0.0005 && cam < 0.5 && (allBlue || allGreen)) {
        drawWhole(allBlue ? imgB : imgG, 1);   // assembled: one exact draw, no seams
        mix = allBlue ? 1 : 0;
      } else {
        var sum = 0;
        drawEmbers(e, cam, p, offX, offY, -1);
        for (i = 0; i < order.length; i++) sum += drawShard(order[i], e, cam, p, offX, offY);
        drawEmbers(e, cam, p, offX, offY, 1);
        mix = sum / order.length;
      }
      glowG.style.opacity = (smooth(e / 0.6) * (1 - mix) * 0.95).toFixed(3);
      glowB.style.opacity = (mix * 0.95).toFixed(3);
      stage.setAttribute('data-sc-verify-state', e.toFixed(2) + '|' + mix.toFixed(2) + '|' + Math.round(cam));
      placeLabels(e, cam, offX, offY);
    }

    var lastP = -1;
    function loop() {
      requestAnimationFrame(loop);
      if (act && !act.live) return;
      px += (ptx - px) * 0.08; py += (pty - py) * 0.08;
      var p = act ? act.p : 0;
      var moving = Math.abs(ptx - px) > 0.002 || Math.abs(pty - py) > 0.002;
      if (p === lastP && !dirty && !moving) return;
      lastP = p; dirty = false;
      draw(p);
    }

    if (fineMQ.matches && !reduce) {
      addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        ptx = e.clientX / innerWidth * 2 - 1;
        pty = e.clientY / innerHeight * 2 - 1;
      }, { passive: true });
    }
    var lastW = innerWidth;
    addEventListener('resize', function () {
      if (innerWidth === lastW && phoneMQ.matches) return;   // URL bar only
      lastW = innerWidth; layout();
    });
    phoneMQ.addEventListener && phoneMQ.addEventListener('change', layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { layout(); });
    layout();
    requestAnimationFrame(loop);
  })();

  // ---- your turn: turn it, pick a print and a size, buy ---------------------
  (function () {
    // Paste the shop's product URL here to switch Buy on. The chosen print and
    // size are added to it as ?print=blue&size=L.
    var CHECKOUT_URL = '';

    var section = document.getElementById('buy');
    var stageEl = document.getElementById('viewer-stage');
    var img = document.getElementById('viewer-img');
    var range = document.getElementById('turn-range');
    var view = document.getElementById('viewer-view');
    var buyBtn = document.getElementById('buy-btn');
    var status = document.getElementById('buy-status');
    if (!section || !img || !stageEl) return;
    var figure = stageEl.closest('.viewer');

    var SETS = { green: { pre: 'g', n: 31, name: 'green' }, blue: { pre: 'b', n: 33, name: 'blue' } };
    var cache = { green: [], blue: [] };
    var print = 'blue', t = 0, shown = img.getAttribute('src');

    function url(set, i) { return 'assets/turn/' + SETS[set].pre + '-' + (i < 9 ? '0' : '') + (i + 1) + '.webp'; }
    function preload(set) {
      if (cache[set].length) return;
      for (var i = 0; i < SETS[set].n; i++) {
        var im = new Image();
        im.decoding = 'async';
        im.onload = function () { if (set === print) render(); };
        im.src = url(set, i);
        cache[set][i] = im;
      }
    }
    function viewName(v) { return v < 0.3 ? 'Back' : v < 0.68 ? 'Side' : 'Front'; }
    function render() {
      var S = SETS[print], i = Math.round(t * (S.n - 1)), u = url(print, i), im = cache[print][i];
      if (u !== shown && (!im || im.complete)) { img.src = u; shown = u; }
      var v = viewName(t);
      view.textContent = v;
      img.alt = 'The PROPAGATE tee with the ' + S.name + ' print, ' + v.toLowerCase() + ' view.';
      range.value = String(Math.round(t * 1000));
      range.setAttribute('aria-valuetext', v + ' view');
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (!entries.some(function (en) { return en.isIntersecting; })) return;
        preload(print); preload(print === 'blue' ? 'green' : 'blue');
        io.disconnect();
      }, { rootMargin: '0px 0px 150% 0px' });
      io.observe(section);
    } else { preload('blue'); preload('green'); }

    // Drag to turn. No pointer capture and no pointer lock: the drag listens on
    // the window, and touch-action keeps vertical scrolling free on phones.
    var drag = null;
    stageEl.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      drag = { x: e.clientX, t: t, w: stageEl.getBoundingClientRect().width || 1 };
      figure.classList.add('is-dragging');
      preload(print);
    });
    addEventListener('pointermove', function (e) {
      if (!drag) return;
      t = clamp01(drag.t + (e.clientX - drag.x) / (drag.w * 0.9));
      render();
    }, { passive: true });
    function endDrag() { if (!drag) return; drag = null; figure.classList.remove('is-dragging'); }
    addEventListener('pointerup', endDrag);
    addEventListener('pointercancel', endDrag);

    range.addEventListener('input', function () { t = clamp01(parseFloat(range.value) / 1000); render(); });

    function chosenSize() { var r = document.querySelector('input[name="size"]:checked'); return r ? r.value : ''; }
    function updateBuy() {
      if (!CHECKOUT_URL) return;
      var size = chosenSize();
      buyBtn.href = size
        ? CHECKOUT_URL + (CHECKOUT_URL.indexOf('?') > -1 ? '&' : '?') + 'print=' + print + '&size=' + encodeURIComponent(size)
        : '#buy';
    }
    Array.prototype.forEach.call(document.querySelectorAll('input[name="print"]'), function (r) {
      r.addEventListener('change', function () {
        if (!r.checked) return;
        print = r.value;
        section.setAttribute('data-print', print);
        preload(print);
        shown = '';
        render(); updateBuy();
        status.textContent = '';
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('input[name="size"]'), function (r) {
      r.addEventListener('change', function () { updateBuy(); status.textContent = ''; });
    });
    buyBtn.addEventListener('click', function (e) {
      var size = chosenSize();
      if (!size) {
        e.preventDefault();
        status.textContent = 'Pick a size first.';
        var first = document.querySelector('input[name="size"]');
        if (first) first.focus();
        return;
      }
      if (!CHECKOUT_URL) {
        e.preventDefault();
        status.textContent = 'Checkout is not connected yet. Your pick: ' +
          (print === 'blue' ? 'Blue' : 'Green') + ' print, size ' + size + '.';
      }
    });
    render();
  })();
})();
