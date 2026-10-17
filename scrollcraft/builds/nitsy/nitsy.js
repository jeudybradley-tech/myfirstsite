/* Nitsy Fashion: page-local behaviour. The engine is untouched.
   La tresse: three strands down the right edge. Above the braid point they
   cross over and under; below it they hang loose. Scrolling moves the braid
   point down the screen, so the visitor's scroll does the braiding. */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var sc = window.ScrollCraft.mount(document.body);
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function smooth(x) { x = clamp01(x); return x * x * (3 - 2 * x); }

  var peakEl = document.getElementById('services'), peak = null;
  sc.acts.forEach(function (a) { if (a.el === peakEl) peak = a; });

  var cv = document.querySelector('.braid'), ctx = cv.getContext('2d');
  var COLORS = ['#E9A6B8', '#D9C3A5', '#8B5A7F'];
  var OUTLINE = '#120B10';
  var W = 0, H = 0, dpr = 1, narrow = false;
  function layout() {
    W = innerWidth; H = innerHeight; narrow = W <= 860;
    dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    draw();
  }

  function draw() {
    var max = Math.max(document.documentElement.scrollHeight - H, 1);
    var prog = reduce ? 1 : clamp01(scrollY / max);
    var pp = peak ? peak.p : 0;
    // At the peak the braid sweeps across the whole screen, then returns.
    var wide = reduce ? 0 : smooth((pp - 0.63) / 0.07) * (1 - smooth((pp - 0.73) / 0.07));
    var strip = narrow ? 0.10 : 0.18;
    var cx = W * (1 - strip / 2) * (1 - wide) + W * 0.5 * wide;
    var thick = (narrow ? 9 : 13) * (1 - wide) + Math.min(W, H) * 0.06 * wide;
    var amp = thick * 0.95 * (1 - wide) + W * 0.3 * wide;
    var yb = H * (0.08 + 0.92 * prog);                 // the braid point
    var period = thick * 7.5 * (1 + wide * 0.4);
    var k = Math.PI * 2 / period;
    var off = reduce ? 0 : scrollY * 0.9;
    var step = 4;
    // Each strand is cut into runs that stay in front or behind; all the
    // behind runs are painted first, so the strands pass over and under.
    var runs = [[], []];
    for (var i = 0; i < 3; i++) {
      var cur = null, side = null;
      for (var y = -thick * 2; y < H + thick * 2; y += step) {
        var b = smooth((yb - y) / (thick * 4));        // 1 braided, 0 loose
        var ph = k * (y + off) + i * 2.0944;
        var bx = cx + amp * Math.sin(ph), bz = Math.cos(ph);
        var lx = cx + (i - 1) * (amp * 1.3 + thick * 0.6) + Math.sin(y * 0.012 + i * 1.7) * thick * 0.5;
        var x = bx * b + lx * (1 - b);
        var front = b > 0.5 ? bz > 0 : i === 1;
        var sd = front ? 1 : 0;
        if (sd !== side) {
          if (cur) cur.pts.push([x, y]);
          cur = { i: i, pts: cur ? [cur.pts[cur.pts.length - 1]] : [] };
          runs[sd].push(cur); side = sd;
        }
        cur.pts.push([x, y]);
      }
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    [0, 1].forEach(function (sd) {
      runs[sd].forEach(function (R) {
        if (R.pts.length < 2) return;
        ctx.beginPath(); ctx.moveTo(R.pts[0][0], R.pts[0][1]);
        for (var n = 1; n < R.pts.length; n++) ctx.lineTo(R.pts[n][0], R.pts[n][1]);
        ctx.lineWidth = thick + 5; ctx.strokeStyle = OUTLINE; ctx.stroke();
        ctx.lineWidth = thick; ctx.strokeStyle = COLORS[R.i]; ctx.stroke();
        // a highlight down each strand so it reads as hair, not cable
        ctx.lineWidth = Math.max(2, thick * 0.18); ctx.strokeStyle = 'rgba(255,255,255,' + (sd ? 0.28 : 0.1) + ')'; ctx.stroke();
      });
    });
    // The tie: a band where braid meets loose hair, cream once the page is done.
    if (yb < H + 20 && wide < 0.1) {
      ctx.fillStyle = '#D9C3A5';
      var bw = amp * 2.4 + thick * 1.4;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(cx - bw / 2, yb - thick * 0.45, bw, thick * 0.9, thick * 0.45);
      else ctx.rect(cx - bw / 2, yb - thick * 0.45, bw, thick * 0.9);
      ctx.fill();
    }
    document.documentElement.setAttribute('data-sc-verify-state', prog.toFixed(3) + '|' + wide.toFixed(2));
  }

  var queued = false;
  addEventListener('scroll', function () {
    if (queued) return; queued = true;
    requestAnimationFrame(function () { queued = false; draw(); });
  }, { passive: true });
  addEventListener('resize', layout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  layout();

  // Contact form: nothing to send to yet, so say so plainly.
  var form = document.getElementById('contact-form'), status = document.getElementById('f-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements['name'].value.trim(), reach = form.elements['reach'].value.trim();
    if (!name) { status.textContent = 'Ajoute ton prénom.'; form.elements['name'].focus(); return; }
    if (!reach) { status.textContent = 'Ajoute un téléphone ou un Instagram pour qu\'on te réponde.'; form.elements['reach'].focus(); return; }
    status.textContent = 'Merci ' + name + ' ! Le formulaire n\'est pas encore relié à la boîte de réception du salon, ta demande (' + form.elements['service'].value + ') n\'a donc pas été envoyée.';
  });
})();
