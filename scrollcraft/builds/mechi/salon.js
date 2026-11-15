/* Salon de coiffure Mechi. Page code only: the engine is untouched.
   Everything here reads the engine's --sc-p off an act, or answers the visitor. */
(function () {
  'use strict';

  // ---------------------------------------------------------------------
  // RÉGLAGES
  // FORM_ENDPOINT : le service qui relaie chaque demande par courriel.
  //   Formspree (https://formspree.io) : coller l'adresse que Formspree donne
  //   en créant le formulaire, du type https://formspree.io/f/abcdwxyz. Les
  //   demandes arrivent à l'adresse courriel du compte Formspree.
  //   FormSubmit (https://formsubmit.co) : https://formsubmit.co/ajax/<adresse>.
  //   À la toute première demande, FormSubmit envoie un courriel d'activation
  //   à l'adresse : il faut cliquer « Activate » une fois.
  //   Laisser vide ('') pour ne rien envoyer : le formulaire le dit alors.
  // INTERAC_EMAIL : l'adresse qui reçoit les virements Interac du dépôt.
  //   Tant que c'est vide, la page dit que l'adresse viendra avec la réponse.
  // ---------------------------------------------------------------------
  var FORM_ENDPOINT = 'https://formspree.io/f/mwllzzaw';
  var INTERAC_EMAIL = 'jeudybradley@gmail.com';
  var PREVIEW = false;   // true only in the claude.ai preview copy, where nothing can be sent
  var FORMSPREE = /formspree\.io\//.test(FORM_ENDPOINT);

  // HEURES D'OUVERTURE (données par la propriétaire) : pour chaque jour,
  // [ouverture, fermeture], ou null si le salon est fermé. Le dernier créneau
  // proposé commence LAST_START_BEFORE_CLOSE minutes avant la fermeture.
  var HOURS = {
    1: null,                // lundi : fermé
    2: null,                // mardi : fermé
    3: ['09:30', '16:30'],  // mercredi
    4: ['09:30', '16:30'],  // jeudi
    5: ['09:30', '16:30'],  // vendredi
    6: null,                // samedi : fermé
    0: null                 // dimanche : fermé
  };
  var SLOT_MINUTES = 30;
  var LAST_START_BEFORE_CLOSE = 60;
  var BOOK_AHEAD_DAYS = 60;   // jusqu'à combien de jours à l'avance

  var SERVICES = {
    silkpress:  { name: 'Silk press', img: 'assets/lissage-m.webp' },
    permanente: { name: 'Permanente', img: 'assets/boucles-coupe-m.webp' },
    teinture:   { name: 'Teinture',   img: 'assets/couleur-m.webp' },
    keratine:   { name: 'Kératine',   img: 'assets/apres-m.webp' },
    shampoing:  { name: 'Shampoing traitant', img: 'assets/shampoing-m.webp' },
    botox:      { name: 'Botox capillaire',   img: 'assets/botox-m.webp' }
  };

  // OPTIONS : un service qui a des options ouvre une fenêtre pour les choisir
  // (une seule à la fois). Les prix affichés et envoyés dans la demande
  // viennent d'ici. img : la photo qui apparaît à côté de l'option quand on
  // la choisit ; sans img, c'est la photo du service.
  var OPTIONS = {
    permanente: [
      { id: 'bouclee',  name: 'Permanente bouclée',            price: '150 $ à 400 $, varie selon la longueur et la quantité', img: 'assets/opt-perm-bouclee.webp' },
      { id: 'souple',   name: 'Permanente ondulation souple',  price: '150 $ à 400 $, varie selon la longueur et la quantité', img: 'assets/opt-perm-souple.webp' }
    ],
    teinture: [
      { id: 'peroxyde',   name: 'Teinture au peroxyde',  price: '150 $ à 400 $, varie selon la longueur et la quantité' },
      { id: 'couleur',    name: 'Teinture couleur',      price: '150 $ à 400 $, varie selon la longueur et la quantité', img: 'assets/couleur-m.webp' },
      { id: 'balayage',   name: 'Balayage',              price: '150 $ à 400 $, varie selon la longueur et la quantité' },
      { id: 'meches',     name: 'Mèches',                price: '150 $ à 400 $, varie selon la longueur et la quantité', img: 'assets/ba-apres-dos-m.webp' },
      { id: 'cellophane', name: 'Cellophane capillaire', price: '150 $ à 400 $, varie selon la longueur et la quantité' }
    ]
  };

  var docEl = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var svc = document.getElementById('services');
  var book = document.getElementById('soumission');
  var railEl = svc.querySelector('.rail');
  var railItems = Array.prototype.slice.call(svc.querySelectorAll('.card, .rail__end'));
  var form = document.getElementById('form');
  var announce = document.querySelector('[data-announce]');
  var slip = document.querySelector('[data-slip]');
  var bar = document.querySelector('[data-bar]');
  var toggle = bar.querySelector('.bar__toggle'), toggleLabel = bar.querySelector('[data-toggle-label]');
  var tabs = Array.prototype.slice.call(bar.querySelectorAll('[data-tab]'));
  var spy = [['top', document.getElementById('accueil')], ['services', svc], ['avant-apres', document.getElementById('avant-apres')], ['produits', document.getElementById('produits')], ['boucles', document.getElementById('boucles')], ['proprietaire', document.getElementById('proprietaire')], ['comment', document.getElementById('comment')], ['soumission', document.getElementById('book-h')]];

  function prog(el) { return parseFloat(getComputedStyle(el).getPropertyValue('--sc-p')) || 0; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  // ------------------------------------------------- owner fact lines --
  // The lines around "Spécialités" and "Le salon" draw themselves in, one
  // after the other, each time the list comes back on screen: once it has
  // left the screen completely, it is reset and draws again on the way back.
  var facts = document.querySelector('.owner__facts');
  if (facts && !reduce && 'IntersectionObserver' in window) {
    facts.classList.add('will-draw');
    new IntersectionObserver(function (en) {
      var e = en[en.length - 1];
      if (e.intersectionRatio >= 0.4) facts.classList.add('is-drawn');
      else if (!e.isIntersecting) facts.classList.remove('is-drawn');
    }, { threshold: [0, 0.4] }).observe(facts);
  }

  // ------------------------------------------------------ smooth scroll --
  // The same feel as the immersive site: the page never jumps, it glides.
  // A mouse wheel only moves a target and the page eases toward it (a lerp
  // each frame). Menu links and "go to the steps" take a slow eased glide.
  // The page keeps its native scroll, so the engine's pinned acts still work.
  // Touch screens keep their own momentum; reduced motion keeps plain jumps.
  var fineWheel = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var sTarget = scrollY, sCur = scrollY, sRaf = 0, glide = null, SMOOTH = 0.09;
  function maxY() { return docEl.scrollHeight - innerHeight; }
  function sTick(now) {
    sRaf = 0;
    if (glide) {
      var t = Math.min(1, (now - glide.t0) / glide.d);
      var e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      sCur = glide.from + (glide.to - glide.from) * e;
      if (t >= 1) { glide = null; sTarget = sCur; }
    } else {
      sCur += (sTarget - sCur) * SMOOTH;
      if (Math.abs(sTarget - sCur) < 0.5) sCur = sTarget;
    }
    scrollTo({ top: sCur, behavior: 'instant' });
    if (glide || sCur !== sTarget) sRaf = requestAnimationFrame(sTick);
  }
  function sStop() { if (sRaf) cancelAnimationFrame(sRaf); sRaf = 0; glide = null; sCur = sTarget = scrollY; }
  function glideTo(y) {
    y = Math.max(0, Math.min(maxY(), y));
    if (reduce) { scrollTo({ top: y, behavior: 'instant' }); return; }
    sStop();
    var dist = Math.abs(y - scrollY);
    glide = { from: scrollY, to: y, t0: performance.now(), d: Math.min(1700, 700 + dist * 0.18) };
    sRaf = requestAnimationFrame(sTick);
  }
  function topOf(el) {
    return el.getBoundingClientRect().top + scrollY - (parseFloat(getComputedStyle(el).scrollMarginTop) || 0);
  }
  addEventListener('scroll', function () { if (!sRaf) sCur = sTarget = scrollY; }, { passive: true });
  ['mousedown', 'touchstart'].forEach(function (ev) { addEventListener(ev, sStop, { passive: true }); });

  // The scroll keys glide too: arrows, Space, Page up/down, Home and End.
  addEventListener('keydown', function (e) {
    if (reduce || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || document.querySelector('dialog[open]')) { sStop(); return; }
    var t = e.target, tag = t && t.tagName;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT|BUTTON|SUMMARY|A|AUDIO|VIDEO)$/.test(tag) && (e.key === ' ' || tag !== 'A' && tag !== 'BUTTON'))) { sStop(); return; }
    if (t && t.closest && t.closest('[role="slider"], [role="listbox"], [role="grid"], [role="tablist"], [role="radiogroup"]')) { sStop(); return; }
    var page = innerHeight * 0.85, d = null;
    switch (e.key) {
      case 'ArrowDown': d = 140; break;
      case 'ArrowUp': d = -140; break;
      case 'PageDown': d = page; break;
      case 'PageUp': d = -page; break;
      case ' ': d = e.shiftKey ? -page : page; break;
      case 'Home': e.preventDefault(); glideTo(0); return;
      case 'End': e.preventDefault(); glideTo(maxY()); return;
      default: sStop(); return;
    }
    e.preventDefault();
    if (glide) { glide = null; sTarget = sCur; }
    if (!sRaf) sCur = sTarget = scrollY;
    sTarget = Math.max(0, Math.min(maxY(), sTarget + d));
    if (!sRaf) sRaf = requestAnimationFrame(sTick);
  });

  if (fineWheel && !reduce) {
    addEventListener('wheel', function (e) {
      if (e.ctrlKey || e.defaultPrevented || document.querySelector('dialog[open]')) return;
      // A box that scrolls on its own keeps the wheel.
      for (var n = e.target; n && n.nodeType === 1 && n !== document.body; n = n.parentElement) {
        if (n.scrollHeight > n.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(n).overflowY)) return;
      }
      var dy = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? innerHeight : 1);
      if (!dy || Math.abs(e.deltaX) > Math.abs(dy)) return;
      e.preventDefault();
      if (glide) { glide = null; sTarget = sCur; }
      if (!sRaf) sCur = sTarget = scrollY;
      sTarget = Math.max(0, Math.min(maxY(), sTarget + dy));
      if (!sRaf) sRaf = requestAnimationFrame(sTick);
    }, { passive: false });
  }

  // In-page links glide to their section instead of jumping.
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.closest('dialog')) return;
    var id = a.getAttribute('href').slice(1);
    var el = id ? document.getElementById(id) : null;
    if (!el) return;
    e.preventDefault();
    glideTo(topOf(el));
    if (history.replaceState) history.replaceState(null, '', '#' + id);
  });

  // ------------------------------------------------------------ per frame --
  var lastForm = null, lastTab = null;
  // How it works: the pinned act's scroll progress picks the step shown.
  var howEl = document.getElementById('comment'), howRoll = document.querySelector('[data-how-roll]'), lastHow = -1;
  var howAt = 0, HOW_HOLD = 900, lastLift = -1;
  var howSteps = Array.prototype.slice.call(document.querySelectorAll('[data-how-steps] > li'));
  var howDots = Array.prototype.slice.call(document.querySelectorAll('.how__dots i'));
  if (!howRoll || !howSteps.length) howEl = null;
  function frame() {
    // Services rail: each card settles as it comes in from the right edge.
    var sr = svc.getBoundingClientRect();
    if (!reduce && sr.bottom > 0 && sr.top < innerHeight) {
      for (var i = 0; i < railItems.length; i++) {
        var r = railItems[i].getBoundingClientRect();
        railItems[i].style.setProperty('--k', clamp01((innerWidth - r.left) / (r.width * 0.85)).toFixed(3));
      }
    }

    if (howEl) {
      // The three steps share the first three quarters; then the steps fade
      // softly away and the request form behind them shows.
      var hp = prog(howEl), want = Math.max(0, Math.min(howSteps.length - 1, Math.floor(hp / 0.75 * howSteps.length)));
      var lift = reduce ? 0 : clamp01((hp - 0.8) / 0.2);
      lift = lift * lift * (3 - 2 * lift);
      if (lift !== lastLift) {
        howEl.style.setProperty('--fade', clamp01(lift / 0.45).toFixed(4));
        howEl.style.setProperty('--clear', clamp01((lift - 0.45) / 0.55).toFixed(4));
        howEl.classList.toggle('is-lifted', lift > 0.5); lastLift = lift;
      }
      // Never skip a step: move one step at a time, and keep each step on
      // screen at least HOW_HOLD ms, even after a fast flick.
      var hk = lastHow < 0 ? want : lastHow;
      if (want !== lastHow && lastHow >= 0 && performance.now() - howAt >= HOW_HOLD) hk = lastHow + (want > lastHow ? 1 : -1);
      if (hk !== lastHow) {
        howAt = performance.now();
        howRoll.style.setProperty('--k', hk);
        howSteps.forEach(function (li, j) { li.classList.toggle('is-on', j === hk); });
        howDots.forEach(function (d, j) { d.classList.toggle('is-on', j === hk); });
        lastHow = hk;
      }
    }

    // Top menu: underline the tab of the section being read.
    var cur = 'top';
    for (var k = 0; k < spy.length; k++) if (spy[k][1].getBoundingClientRect().top <= innerHeight * 0.35) cur = spy[k][0];
    if (cur !== lastTab) {
      tabs.forEach(function (a) { if (a.getAttribute('data-tab') === cur) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      lastTab = cur;
    }

    // The request pill steps aside once the form itself is on screen.
    var atForm = form.getBoundingClientRect().top < innerHeight * 0.55;
    if (atForm !== lastForm) { docEl.classList.toggle('at-form', atForm); lastForm = atForm; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // ------------------------------------- the sign clip beside the curls --
  // Plays on a loop, muted, only while it is on screen; never under reduced
  // motion, where its poster stays.
  var loops = Array.prototype.slice.call(document.querySelectorAll('video.loop'));
  var phoneMq = matchMedia('(max-width: 760px), (max-height: 500px) and (orientation: landscape)');
  if (!reduce && 'IntersectionObserver' in window) {
    var lio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) {
          if (!v.getAttribute('src')) { v.src = phoneMq.matches ? v.getAttribute('data-loop-mobile') : v.getAttribute('data-loop'); }
          var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
        } else if (!v.paused) v.pause();
      });
    }, { threshold: 0.25 });
    loops.forEach(function (v) { lio.observe(v); });
  }

  // ------------------------------------------------------- phone menu --
  function setMenu(open) {
    bar.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggleLabel.textContent = open ? 'Fermer' : 'Menu';
  }
  toggle.addEventListener('click', function () { setMenu(!bar.classList.contains('is-open')); });
  bar.querySelectorAll('.bar__nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && bar.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });
  document.addEventListener('click', function (e) { if (bar.classList.contains('is-open') && !bar.contains(e.target)) setMenu(false); });

  // ------------------------------- before / after: drag to compare --
  // Each frame clips its "after" layer from --pos. Pointer drags move the
  // line (vertical page scroll stays free on touch); a hidden range input
  // carries keyboard and screen-reader control and stays in sync.
  var compares = Array.prototype.slice.call(document.querySelectorAll('[data-compare]'));
  var lastTouch = -1e9;   // when the reader last moved a line
  function poke() { lastTouch = performance.now(); }
  function setPos(el, pct) {
    pct = Math.max(0, Math.min(100, pct));
    el.style.setProperty('--pos', pct.toFixed(2) + '%');
    var r = el.querySelector('.compare__range'); if (r && +r.value !== Math.round(pct)) r.value = Math.round(pct);
  }
  compares.forEach(function (el) {
    var range = el.querySelector('.compare__range');
    var dragging = false;
    function fromEvent(e) { var b = el.getBoundingClientRect(); setPos(el, (e.clientX - b.left) / b.width * 100); }
    el.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      dragging = true; poke(); el.classList.add('is-dragging');
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      fromEvent(e);
    });
    el.addEventListener('pointermove', function (e) { if (dragging) { poke(); fromEvent(e); } });
    function stop() { dragging = false; el.classList.remove('is-dragging'); }
    el.addEventListener('pointerup', stop);
    el.addEventListener('pointercancel', stop);
    el.addEventListener('lostpointercapture', stop);
    range.addEventListener('input', function () { poke(); setPos(el, +range.value); });
  });

  // The line glides from side to side on its own while the frame is on
  // screen. A drag or a key hands it to the reader; it starts again from
  // where it was left after a few idle seconds. Never under reduced motion.
  var AUTO_MIN = 22, AUTO_MAX = 78, AUTO_PERIOD = 5200, AUTO_IDLE = 6000;
  if (!reduce && 'IntersectionObserver' in window) {
    var mid = (AUTO_MIN + AUTO_MAX) / 2, amp = (AUTO_MAX - AUTO_MIN) / 2;
    compares.forEach(function (el) {
      var raf = 0, phase = 0, last = 0, running = false;
      function frame(ts) {
        raf = requestAnimationFrame(frame);
        if (ts - lastTouch < AUTO_IDLE || el.classList.contains('is-dragging')) { running = false; return; }
        if (!running) {   // (re)start from where the line is now
          var cur = parseFloat(el.style.getPropertyValue('--pos'));
          if (isNaN(cur)) cur = 50;
          phase = Math.asin(Math.max(-1, Math.min(1, (cur - mid) / amp)));
          running = true; last = ts; return;
        }
        phase += (ts - last) / AUTO_PERIOD * 2 * Math.PI; last = ts;
        setPos(el, mid + amp * Math.sin(phase));
      }
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !raf) { running = false; raf = requestAnimationFrame(frame); }
          else if (!en.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
        });
      }, { threshold: 0.3 }).observe(el);
    });
  }

  // Tabs switch the transformation.
  var baTabs = Array.prototype.slice.call(document.querySelectorAll('.ba__tabs [role="tab"]'));
  function showView(tab, focus) {
    baTabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) { var c = panel.querySelector('[data-compare]'); if (c) setPos(c, 50); }
    });
    if (focus) tab.focus();
  }
  baTabs.forEach(function (t, i) {
    t.addEventListener('click', function () { showView(t, false); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      showView(baTabs[(i + (e.key === 'ArrowRight' ? 1 : baTabs.length - 1)) % baTabs.length], true);
    });
  });

  // ------------------------------------- services window from the form --
  // "Modifier" in the form opens a window with every service, so the visitor
  // changes her choice without leaving the form. Services with options open
  // their options window on top. The page does not move.
  var svcsDlg = document.querySelector('[data-svcs]'), svcsList = svcsDlg && svcsDlg.querySelector('[data-svcs-list]');
  function renderSvcs() {
    if (!svcsList) return;
    svcsList.textContent = '';
    Object.keys(SERVICES).forEach(function (id) {
      var on = picks.indexOf(id) > -1, li = document.createElement('li'), bt = document.createElement('button');
      bt.type = 'button'; bt.className = 'svcs__item'; bt.setAttribute('data-id', id); bt.setAttribute('aria-pressed', String(on));
      var im = document.createElement('img'); im.src = SERVICES[id].img; im.alt = '';
      var tx = document.createElement('span'), b = document.createElement('b'), sm = document.createElement('small');
      b.textContent = SERVICES[id].name;
      sm.textContent = on ? (OPTIONS[id] && optNames(id).length ? optNames(id).join(', ') : 'Choisi') : (OPTIONS[id] ? 'Voir les options' : 'Ajouter');
      tx.appendChild(b); tx.appendChild(sm); bt.appendChild(im); bt.appendChild(tx); li.appendChild(bt); svcsList.appendChild(li);
    });
  }
  if (svcsDlg) {
    svcsList.addEventListener('click', function (e) {
      var bt = e.target.closest('.svcs__item'); if (!bt) return;
      var id = bt.getAttribute('data-id');
      if (OPTIONS[id]) { openOpts(id, null, bt); return; }
      if (picks.indexOf(id) > -1) remove(id); else add(id, null);
    });
    function closeSvcs() { if (typeof svcsDlg.close === 'function') svcsDlg.close(); else svcsDlg.removeAttribute('open'); }
    svcsDlg.querySelectorAll('[data-svcs-done], [data-svcs-close]').forEach(function (b) { b.addEventListener('click', closeSvcs); });
    svcsDlg.addEventListener('click', function (e) { if (e.target === svcsDlg) closeSvcs(); });
    // Keep the summary exactly where it was: the browser's scroll anchoring
    // would otherwise shift the page as the summary grows or shrinks.
    var svcsY = 0;
    svcsDlg.addEventListener('close', function () {
      stayPut = false; scrollTo(0, svcsY);
      var l = document.querySelector('[data-chosen] a'); if (l) l.focus({ preventScroll: true });
    });
    var chosenLine = document.querySelector('[data-chosen]');
    if (chosenLine) chosenLine.addEventListener('click', function (e) {
      if (!e.target.closest('a')) return;
      e.preventDefault();
      stayPut = true; svcsY = scrollY; renderSvcs();
      if (typeof svcsDlg.showModal === 'function') svcsDlg.showModal(); else svcsDlg.setAttribute('open', '');
      // Focus the title, not the first service: a focused service looked chosen.
      var h = svcsDlg.querySelector('#svcs-h'); if (h) h.focus({ preventScroll: true });
    });
  }

  // ------------------------------------------- products: rising cascade --
  // Each product rises and fades in when it reaches the screen; the ones on
  // the same row follow each other by a short delay. Nothing moves under
  // reduced motion, and without this script the products simply show.
  (function () {
    var list = document.querySelector('.prods');
    if (!list || reduce || !('IntersectionObserver' in window)) return;
    var items = Array.prototype.slice.call(list.children);
    list.classList.add('is-cascade');
    var io = new IntersectionObserver(function (entries) {
      var row = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left; });
      row.forEach(function (e, i) {
        e.target.style.setProperty('--d', (i * 140) + 'ms');
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (it) { io.observe(it); });
  })();

  // Touch screens have no hover: a finger on a product lifts and lights it,
  // and it settles back a moment after the finger leaves.
  Array.prototype.forEach.call(document.querySelectorAll('.prod'), function (p) {
    var t = 0;
    function on() { clearTimeout(t); document.querySelectorAll('.prod.is-lit').forEach(function (q) { if (q !== p) q.classList.remove('is-lit'); }); p.classList.add('is-lit'); }
    function off() { clearTimeout(t); t = setTimeout(function () { p.classList.remove('is-lit'); }, 900); }
    p.addEventListener('touchstart', on, { passive: true });
    p.addEventListener('touchend', off, { passive: true });
    p.addEventListener('touchcancel', off, { passive: true });
  });

  // ------------------------------------------- titles come into focus --
  // Each section title starts blurred and sharpens when it comes up from the
  // bottom of the screen (scrolling down). Scrolling back up toward the top
  // keeps titles sharp; once a title drops back below the screen, it blurs
  // again so the effect replays on the way down. Without the script, or under
  // reduced motion, titles just show.
  (function () {
    var titles = Array.prototype.slice.call(document.querySelectorAll('main h2.disp'));
    if (!titles.length || reduce || !('IntersectionObserver' in window)) return;
    docEl.classList.add('title-focus');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { if (e.intersectionRatio >= 0.35) e.target.classList.add('is-sharp'); return; }
        // Left through the bottom edge (the reader went back up): reset.
        if (e.boundingClientRect.top > (e.rootBounds ? e.rootBounds.bottom : innerHeight) - 1) e.target.classList.remove('is-sharp');
      });
    }, { threshold: [0, 0.35], rootMargin: '0px 0px -10% 0px' });
    titles.forEach(function (t) { io.observe(t); });
  })();

  // ------------------------------------------------- choosing services --
  var picks = [];
  var boxes = Array.prototype.slice.call(form.querySelectorAll('input[name="services"]'));
  var chosenOpts = {};   // service id -> ids of its chosen options
  function optNames(id) {
    return (chosenOpts[id] || []).map(function (o) {
      return OPTIONS[id].filter(function (x) { return x.id === o; })[0].name;
    });
  }

  function render() {
    slip.textContent = picks.length ? 'Ma soumission · ' + picks.length : 'Ma soumission';
    docEl.classList.toggle('has-picks', picks.length > 0);
    document.querySelectorAll('[data-add]').forEach(function (b) {
      var on = picks.indexOf(b.getAttribute('data-add')) > -1;
      b.setAttribute('aria-pressed', String(on));
      var st = b.querySelector('[data-state]');
      if (st) st.textContent = on ? 'Choisi' : (OPTIONS[b.getAttribute('data-add')] ? 'Voir les options' : 'Choisir');
    });
    boxes.forEach(function (bx) { if (SERVICES[bx.value]) bx.checked = picks.indexOf(bx.value) > -1; });
    // The form's summary: a photo and a name for each chosen service (the
    // chosen option's photo when it has one), then a link back to change it.
    var line = document.querySelector('[data-chosen]');
    if (line) {
      line.textContent = '';
      if (picks.length) {
        var list = document.createElement('ul'); list.className = 'chosen__list';
        picks.forEach(function (id) {
          var opts = OPTIONS[id] ? (chosenOpts[id] || []) : [];
          var o = opts.length ? OPTIONS[id].filter(function (x) { return x.id === opts[0]; })[0] : null;
          var li = document.createElement('li'), im = document.createElement('img'), tx = document.createElement('span');
          im.src = (o && o.img) || SERVICES[id].img; im.alt = ''; im.width = 120; im.height = 150;
          var b = document.createElement('b'); b.textContent = SERVICES[id].name; tx.appendChild(b);
          if (o) { var sm = document.createElement('small'); sm.textContent = o.name; tx.appendChild(sm); }
          li.appendChild(im); li.appendChild(tx); list.appendChild(li);
        });
        line.appendChild(list);
      } else line.append('Aucun service choisi. ');
      var a = document.createElement('a'); a.href = '#services'; a.textContent = picks.length ? 'Modifier' : 'Choisir un service'; line.appendChild(a);
    }
    if (typeof renderSvcs === 'function') renderSvcs();
    document.querySelectorAll('[data-opts-chosen]').forEach(function (n) {
      var id = n.getAttribute('data-opts-chosen');
      n.textContent = picks.indexOf(id) > -1 ? optNames(id).join(', ') : '';
    });
  }

  // The chosen photo flies into the pill, so the visitor sees where it went.
  function fly(fromEl, src, done) {
    if (reduce || !fromEl || docEl.classList.contains('at-form')) { done(); return; }
    var a = fromEl.getBoundingClientRect(), b = slip.getBoundingClientRect();
    if (!a.width || !b.width) { done(); return; }
    var img = document.createElement('img');
    img.className = 'fly'; img.src = src; img.alt = '';
    img.style.left = a.left + 'px'; img.style.top = a.top + 'px';
    img.style.width = a.width + 'px'; img.style.height = a.height + 'px';
    document.body.appendChild(img);
    var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    var s = Math.max(36 / a.width, 0.04);
    var anim = img.animate([
      { transform: 'translate(0,0) scale(1)', borderRadius: '12px', opacity: 1 },
      { transform: 'translate(' + dx * 0.55 + 'px,' + (dy * 0.55 - 40) + 'px) scale(' + (0.4 + s / 2) + ')', borderRadius: '40%', opacity: 1, offset: 0.55 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')', borderRadius: '50%', opacity: 0.4 }
    ], { duration: 700, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    anim.onfinish = function () { img.remove(); done(); };
  }

  function bump() {
    if (reduce) return;
    slip.classList.remove('is-bump'); void slip.offsetWidth; slip.classList.add('is-bump');
  }

  function add(id, fromEl) {
    if (picks.indexOf(id) > -1 || !SERVICES[id]) return;
    picks.push(id);
    render();
    fly(fromEl, SERVICES[id].img, bump);
    announce.textContent = SERVICES[id].name + ' ajouté à ta soumission.';
    goSteps();
  }
  // Once a service is chosen, take the visitor on to the steps.
  var stayPut = false;   // true while the services are edited from the form
  function goSteps() {
    var steps = document.getElementById('comment'); if (!steps || stayPut) return;
    setTimeout(function () { glideTo(topOf(steps)); }, reduce ? 0 : 750);
  }
  function remove(id) {
    var i = picks.indexOf(id); if (i < 0) return;
    picks.splice(i, 1);
    render();
    announce.textContent = SERVICES[id].name + ' retiré de ta soumission.';
  }

  document.querySelectorAll('[data-add]').forEach(function (b) {
    b.addEventListener('click', function () {
      var id = b.getAttribute('data-add');
      if (OPTIONS[id] && openOpts(id, b.querySelector('img'), b)) return;
      if (picks.indexOf(id) > -1) remove(id); else add(id, b.querySelector('img'));
    });
  });
  boxes.forEach(function (bx) {
    // In the form too, a service with options opens the window instead of ticking.
    bx.addEventListener('click', function (e) {
      if (!OPTIONS[bx.value]) return;
      e.preventDefault();
      openOpts(bx.value, null, bx);
    });
    bx.addEventListener('change', function () {
      if (!SERVICES[bx.value]) return;
      if (bx.checked) add(bx.value, null); else remove(bx.value);
    });
  });
  // ------------------------------------------------ the options window --
  // Opened by a service that has OPTIONS, from its card or its form photo.
  // Rows turn brown when chosen; the button adds, updates or removes the
  // service in "Ma soumission". Esc, Annuler, × or a click outside close it
  // without changing anything.
  var dlg = document.querySelector('[data-opts]');
  var dlgList = dlg && dlg.querySelector('[data-opts-list]');
  var dlgOk = dlg && dlg.querySelector('[data-opts-ok]');
  var dlgFor = null, dlgFrom = null, dlgBack = null;
  function okLabel() {
    var n = dlgList.querySelectorAll('input:checked').length, inPicks = picks.indexOf(dlgFor) > -1;
    dlgOk.textContent = n ? (inPicks ? 'Mettre à jour ma soumission' : 'Ajouter à ma soumission')
                          : (inPicks ? 'Retirer de ma soumission' : 'Ajouter à ma soumission');
    dlgOk.disabled = !n && !inPicks;
  }
  // The large photo beside the list shows the option just chosen.
  function showPhoto(optId) {
    var o = OPTIONS[dlgFor].filter(function (x) { return x.id === optId; })[0]; if (!o) return;
    var img = dlg.querySelector('[data-opts-img]'), fresh = img.cloneNode(false);
    fresh.src = o.img || SERVICES[dlgFor].img;
    img.replaceWith(fresh);   // a new node replays the fade-in
    dlg.querySelector('[data-opts-cap]').textContent = o.name;
  }
  function openOpts(id, fromImg, backTo) {
    if (!dlg || !OPTIONS[id]) return false;
    dlgFor = id; dlgFrom = fromImg; dlgBack = backTo;
    dlg.querySelector('[data-opts-service]').textContent = SERVICES[id].name;
    dlgList.textContent = '';
    OPTIONS[id].forEach(function (o) {
      var li = document.createElement('li'), lab = document.createElement('label'), cb = document.createElement('input');
      cb.type = 'checkbox'; cb.value = o.id; cb.checked = (chosenOpts[id] || []).indexOf(o.id) > -1;
      var nm = document.createElement('span'); nm.className = 'opts__name'; nm.textContent = o.name;
      var pr = document.createElement('span'); pr.className = 'opts__price'; pr.textContent = o.price;
      lab.appendChild(cb); lab.appendChild(nm); lab.appendChild(pr); li.appendChild(lab); dlgList.appendChild(li);
    });
    okLabel();
    var firstOn = dlgList.querySelector('input:checked'); if (firstOn) showPhoto(firstOn.value);
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    var first = dlgList.querySelector('input'); if (first) first.focus();
    return true;
  }
  function closeOpts() {
    if (typeof dlg.close === 'function') dlg.close(); else { dlg.removeAttribute('open'); dlg.dispatchEvent(new Event('close')); }
  }
  if (dlg) {
    dlgList.addEventListener('change', function (e) {
      // One option at a time: choosing one lets go of the others.
      if (e.target.checked) dlgList.querySelectorAll('input:checked').forEach(function (c) { if (c !== e.target) c.checked = false; });
      okLabel();
      if (e.target.checked) showPhoto(e.target.value);
      else { var on = dlgList.querySelector('input:checked'); if (on) showPhoto(on.value); }
    });
    dlg.querySelectorAll('[data-opts-cancel]').forEach(function (b) { b.addEventListener('click', closeOpts); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) closeOpts(); });   // the backdrop
    dlg.addEventListener('close', function () { if (dlgBack) dlgBack.focus({ preventScroll: true }); dlgFor = null; });
    dlgOk.addEventListener('click', function () {
      var id = dlgFor, from = dlgFrom;
      var ids = Array.prototype.map.call(dlgList.querySelectorAll('input:checked'), function (c) { return c.value; });
      chosenOpts[id] = ids;
      closeOpts();
      if (ids.length && picks.indexOf(id) < 0) add(id, from);
      else if (!ids.length && picks.indexOf(id) > -1) remove(id);
      else { render(); announce.textContent = SERVICES[id].name + ' : ' + optNames(id).join(', ') + '.'; }
    });
  }

  render();

  // A keyboard user tabbing through the rail: scroll the page to where the
  // focused card sits in view, since the rail moves with the page scroll.
  svc.addEventListener('focusin', function (e) {
    if (reduce) return;
    var item = e.target.closest('.card, .rail__end'); if (!item) return;
    var travel = railEl.scrollWidth - innerWidth;
    if (travel <= 0) return;
    var pTarget = clamp01((item.offsetLeft + item.offsetWidth / 2 - innerWidth / 2) / (travel * 1.04));
    var top = svc.getBoundingClientRect().top + scrollY;
    scrollTo({ top: top + pTarget * (svc.offsetHeight - innerHeight), behavior: 'instant' });
  });

  // ------------------------------------------------------------- form --
  var status = form.querySelector('[data-status]');
  var done = form.querySelector('[data-done]');
  var submit = form.querySelector('button[type="submit"]');
  // ------------------------------------------------ calendar and times --
  var MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  var DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  var calGrid = form.querySelector('[data-cal-grid]'), calMonth = form.querySelector('[data-cal-month]');
  var calPrev = form.querySelector('[data-cal-prev]'), calNext = form.querySelector('[data-cal-next]');
  var slotsEl = form.querySelector('[data-slots]'), slotsTitle = form.querySelector('[data-slots-title]');
  var pickEl = form.querySelector('[data-pick]');
  var dateIn = form.querySelector('[data-date]'), heureIn = form.querySelector('[data-heure]');
  var booker = form.querySelector('.booker');

  function atMidnight(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function isoDay(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function longDay(d) { return DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()]; }
  function mins(hhmm) { var p = hhmm.split(':'); return +p[0] * 60 + +p[1]; }
  function label(m) { var h = Math.floor(m / 60), mm = m % 60; return h + ' h ' + String(mm).padStart(2, '0'); }

  var first = atMidnight(new Date()); first.setDate(first.getDate() + 1);       // à partir de demain
  var last = new Date(first); last.setDate(last.getDate() + BOOK_AHEAD_DAYS - 1);
  var todayMid = atMidnight(new Date());
  var view = new Date(first.getFullYear(), first.getMonth(), 1);
  var chosenDay = null, chosenTime = null, focusDay = null;

  function bookable(d) { return d >= first && d <= last && !!HOURS[d.getDay()]; }

  function renderCal(focus) {
    calMonth.textContent = MONTHS[view.getMonth()] + ' ' + view.getFullYear();
    calPrev.disabled = view <= new Date(first.getFullYear(), first.getMonth(), 1);
    calNext.disabled = new Date(view.getFullYear(), view.getMonth() + 1, 1) > last;
    calGrid.textContent = '';
    var lead = (view.getDay() + 6) % 7;                     // lundi en premier
    for (var i = 0; i < lead; i++) calGrid.appendChild(document.createElement('span'));
    var n = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    var firstEnabled = null;
    for (var d = 1; d <= n; d++) {
      var day = new Date(view.getFullYear(), view.getMonth(), d);
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'cal__day'; b.textContent = d;
      b.setAttribute('data-day', isoDay(day));
      var ok = bookable(day);
      b.disabled = !ok;
      b.setAttribute('aria-label', longDay(day) + (ok ? '' : (HOURS[day.getDay()] ? ', non disponible' : ', fermé')));
      b.setAttribute('aria-pressed', String(!!chosenDay && isoDay(chosenDay) === isoDay(day)));
      if (+day === +todayMid) b.classList.add('is-today');
      b.tabIndex = -1;
      if (ok && !firstEnabled) firstEnabled = b;
      calGrid.appendChild(b);
    }
    // une seule case du calendrier dans l'ordre de tabulation ; les flèches déplacent
    var target = (focusDay && calGrid.querySelector('[data-day="' + isoDay(focusDay) + '"]:not(:disabled)'))
      || (chosenDay && calGrid.querySelector('[data-day="' + isoDay(chosenDay) + '"]')) || firstEnabled;
    if (target) { target.tabIndex = 0; if (focus) target.focus(); }
  }

  function renderSlots() {
    slotsEl.textContent = '';
    if (!chosenDay) { slotsTitle.textContent = ''; return; }
    slotsTitle.innerHTML = '';
    slotsTitle.append('Heures du ');
    var em = document.createElement('em'); em.textContent = longDay(chosenDay); slotsTitle.appendChild(em);
    var h = HOURS[chosenDay.getDay()], open = mins(h[0]), stop = mins(h[1]) - LAST_START_BEFORE_CLOSE;
    var group = null;
    for (var m = open; m <= stop; m += SLOT_MINUTES) {
      var g = m < 720 ? 'Matin' : m < 1020 ? 'Après-midi' : 'Soir';
      if (g !== group) { var p = document.createElement('p'); p.className = 'slots__group'; p.textContent = g; slotsEl.appendChild(p); group = g; }
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'slot'; b.setAttribute('role', 'radio');
      b.textContent = label(m); b.setAttribute('data-time', String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'));
      var on = chosenTime === b.getAttribute('data-time');
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on || (!chosenTime && m === open) ? 0 : -1;
      slotsEl.appendChild(b);
    }
  }

  function renderPick() {
    dateIn.value = chosenDay ? isoDay(chosenDay) : '';
    heureIn.value = chosenTime || '';
    pickEl.textContent = '';
    if (chosenDay && chosenTime) {
      pickEl.append('Ta demande : ');
      var st = document.createElement('strong');
      st.textContent = longDay(chosenDay) + ' à ' + label(mins(chosenTime));
      pickEl.appendChild(st); pickEl.append('.');
      booker.removeAttribute('aria-invalid');
    } else if (chosenDay) {
      pickEl.textContent = 'Choisis maintenant une heure.';
    }
  }

  calGrid.addEventListener('click', function (e) {
    var b = e.target.closest('.cal__day'); if (!b || b.disabled) return;
    var p = b.getAttribute('data-day').split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    if (!chosenDay || +d !== +chosenDay) chosenTime = null;
    chosenDay = d; focusDay = d;
    renderCal(true); renderSlots(); renderPick();
  });
  calGrid.addEventListener('keydown', function (e) {
    var b = e.target.closest('.cal__day'); if (!b) return;
    var step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (!step) return;
    e.preventDefault();
    var p = b.getAttribute('data-day').split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    for (var k = 0; k < 14; k++) {
      d.setDate(d.getDate() + step);
      if (d < first || d > last) return;
      if (bookable(d)) break;
    }
    focusDay = d;
    if (d.getMonth() !== view.getMonth() || d.getFullYear() !== view.getFullYear()) view = new Date(d.getFullYear(), d.getMonth(), 1);
    renderCal(true);
  });
  calPrev.addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); focusDay = null; renderCal(false); });
  calNext.addEventListener('click', function () { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); focusDay = null; renderCal(false); });

  slotsEl.addEventListener('click', function (e) {
    var b = e.target.closest('.slot'); if (!b) return;
    chosenTime = b.getAttribute('data-time');
    renderSlots(); renderPick();
    var again = slotsEl.querySelector('[data-time="' + chosenTime + '"]'); if (again) again.focus();
  });
  slotsEl.addEventListener('keydown', function (e) {
    var b = e.target.closest('.slot'); if (!b) return;
    var all = Array.prototype.slice.call(slotsEl.querySelectorAll('.slot')), i = all.indexOf(b);
    var j = { ArrowLeft: i - 1, ArrowUp: i - 1, ArrowRight: i + 1, ArrowDown: i + 1 }[e.key];
    if (j === undefined) return;
    e.preventDefault();
    var n = all[(j + all.length) % all.length]; n.click();
  });

  renderCal(false); renderSlots(); renderPick();

  if (INTERAC_EMAIL) {
    var span = form.querySelector('[data-interac]');
    span.textContent = 'à ';
    var strong = document.createElement('strong'); strong.textContent = INTERAC_EMAIL; span.appendChild(strong);
    form.querySelector('[data-done-depot]').textContent =
      'Pour réserver ta place, envoie 20 $ par Interac à ' + INTERAC_EMAIL + ' après notre confirmation.';
    Array.prototype.forEach.call(document.querySelectorAll('[data-interac-how]'), function (n) {
      n.textContent = ' à ';
      var b = document.createElement('strong'); b.textContent = INTERAC_EMAIL; n.appendChild(b);
    });
  }

  var MESSAGES = {
    cheveux: 'Décris tes cheveux aujourd\'hui et ce qui te dérange.',
    nom: 'Ajoute ton prénom et ton nom.',
    telephone: 'Ajoute un numéro de téléphone pour qu\'on puisse te joindre.',
    courriel: 'Ajoute un courriel valide pour recevoir notre réponse.',
    accepte_depot: 'Coche la case pour accepter la règle du dépôt.'
  };

  function fail(msg, el) {
    status.textContent = msg; status.classList.add('is-error');
    if (el) { el.setAttribute('aria-invalid', 'true'); el.focus(); }
  }
  function clear(e) { if (e.target.getAttribute('aria-invalid')) e.target.removeAttribute('aria-invalid'); }
  form.addEventListener('input', clear);
  form.addEventListener('change', clear);

  function showDone() {
    status.textContent = '';
    form.querySelectorAll('fieldset, .deposit, .send').forEach(function (n) { n.hidden = true; });
    done.classList.add('is-on'); done.focus();
  }

  // Classic POST to the service's own page: FormSubmit sends the email and
  // comes back to ?envoye=1; Formspree shows its thank-you page instead.
  function classicSend(payload) {
    status.textContent = 'Envoi en cours…';
    var f = document.createElement('form');
    f.method = 'POST';
    f.action = FORMSPREE ? FORM_ENDPOINT : FORM_ENDPOINT.replace('/ajax/', '/');
    f.acceptCharset = 'UTF-8';
    f.style.display = 'none';
    var back = location.origin + location.pathname + '?envoye=1#soumission';
    var all = FORMSPREE ? payload : Object.assign({}, payload, { _next: back });
    Object.keys(all).forEach(function (k) {
      var i = document.createElement('input'); i.type = 'hidden'; i.name = k; i.value = all[k]; f.appendChild(i);
    });
    document.body.appendChild(f);
    f.submit();
  }

  // Back from FormSubmit's page after a classic send.
  if (/[?&]envoye=1\b/.test(location.search)) {
    showDone();
    try { history.replaceState(null, '', location.pathname + '#soumission'); } catch (err) {}
    var anchor = document.getElementById('soumission'); if (anchor) anchor.scrollIntoView();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.classList.remove('is-error'); status.textContent = '';
    var order = ['cheveux', 'nom', 'telephone', 'courriel', 'accepte_depot'];
    if (!form.elements.cheveux.value.trim()) { fail(MESSAGES.cheveux, form.elements.cheveux); return; }
    if (!chosenDay) { booker.setAttribute('aria-invalid', 'true'); fail('Choisis le jour de ton rendez-vous dans le calendrier.', null); calGrid.querySelector('[tabindex="0"]').focus(); return; }
    if (!chosenTime) { booker.setAttribute('aria-invalid', 'true'); fail('Choisis l\'heure de ton rendez-vous.', null); slotsEl.querySelector('.slot').focus(); return; }
    for (var i = 1; i < order.length; i++) {
      var el = form.elements[order[i]];
      var empty = el.type === 'checkbox' ? !el.checked : !el.value.trim();
      if (empty || !el.checkValidity()) { fail(MESSAGES[order[i]], el); return; }
    }

    var firstName = form.elements.nom.value.trim().split(/\s+/)[0];
    if (PREVIEW) {
      status.textContent = 'Merci ' + firstName + '. Ceci est un aperçu : sur le vrai site, ta demande serait envoyée au salon par courriel. Rien n\'a été envoyé.';
      return;
    }
    if (!FORM_ENDPOINT) {
      status.textContent = 'Merci ' + firstName + '. Le formulaire n\'est pas encore relié à la boîte de réception du salon, donc ta demande n\'a pas été envoyée.';
      return;
    }

    // One clear table in the salon's inbox; "Reply" goes to the client.
    var picked = boxes.filter(function (b) { return b.checked; }).map(function (b) {
      var name = SERVICES[b.value] ? SERVICES[b.value].name : b.value, opts = OPTIONS[b.value] ? optNames(b.value) : [];
      return opts.length ? name + ' (' + opts.join(', ') + ')' : name;
    });
    var when = longDay(chosenDay) + ' à ' + label(mins(chosenTime));
    var payload = {
      'Services': picked.length ? picked.join(', ') : 'Aucun choisi',
      'Ses cheveux aujourd\'hui': form.elements.cheveux.value.trim(),
      'Ce qu\'elle aimerait': form.elements.souhait.value.trim() || '(rien de précisé)',
      'Rendez-vous demandé': when.charAt(0).toUpperCase() + when.slice(1),
      'Nom': form.elements.nom.value.trim(),
      'Téléphone': form.elements.telephone.value.trim(),
      'Courriel': form.elements.courriel.value.trim(),
      'Règle du dépôt acceptée': 'Oui',
      _subject: 'Demande de soumission : ' + form.elements.nom.value.trim() + ', ' + when,
      _replyto: form.elements.courriel.value.trim()
    };
    if (FORMSPREE) {
      payload._gotcha = form.elements._honey.value;   // Formspree's robot trap
    } else {
      payload._template = 'table';
      payload._captcha = 'false';
      payload._honey = form.elements._honey.value;
    }
    submit.disabled = true; status.textContent = 'Envoi en cours…';

    // Sent as an ordinary form body (no custom Content-Type), so the browser
    // makes a simple request with no CORS preflight. If the request still
    // cannot leave (a blocker, a strict browser), fall back to a classic form
    // POST through FormSubmit's own page, which returns here with ?envoye=1.
    var body = new URLSearchParams();
    Object.keys(payload).forEach(function (k) { body.append(k, payload[k]); });
    fetch(FORM_ENDPOINT, { method: 'POST', body: body, headers: { Accept: 'application/json' } })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (j) { return { ok: res.ok, j: j }; }); },
            function () { classicSend(payload); return null; })
      .then(function (r) {
        if (!r) return;
        // FormSubmit answers { success: true }, Formspree { ok: true }.
        var ok = r.ok && (r.j.success === true || r.j.success === 'true' || r.j.ok === true);
        if (!ok) {
          var msg = String(r.j.message || r.j.error || (r.j.errors || []).map(function (x) { return x.message; }).join(' '));
          if (/activ/i.test(msg)) {
            fail('Le formulaire du salon doit d\'abord être activé : un courriel d\'activation vient d\'être envoyé au salon. Réessaie un peu plus tard, ou appelle le 438-377-2535.', null);
          } else {
            fail('La demande n\'a pas pu être envoyée. Réessaie dans un moment, ou appelle le 438-377-2535.', null);
          }
          submit.disabled = false;
          return;
        }
        showDone();
        submit.disabled = false;
      })
      .catch(function () {
        fail('La demande n\'a pas pu être envoyée. Vérifie ta connexion et réessaie, ou appelle le 438-377-2535.', null);
        submit.disabled = false;
      });
  });
})();
