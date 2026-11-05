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
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/jeudybradley@gmail.com';
  var INTERAC_EMAIL = '';
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
    keratine:   { name: 'Kératine',   img: 'assets/apres-m.webp' }
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
  var spy = [['top', document.getElementById('accueil')], ['services', svc], ['avant-apres', document.getElementById('avant-apres')], ['proprietaire', document.getElementById('proprietaire')], ['comment', document.getElementById('comment')], ['soumission', book]];

  function prog(el) { return parseFloat(getComputedStyle(el).getPropertyValue('--sc-p')) || 0; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  // ------------------------------------------------------------ per frame --
  var lastForm = null, lastTab = null;
  function frame() {
    // Services rail: each card settles as it comes in from the right edge.
    var sr = svc.getBoundingClientRect();
    if (!reduce && sr.bottom > 0 && sr.top < innerHeight) {
      for (var i = 0; i < railItems.length; i++) {
        var r = railItems[i].getBoundingClientRect();
        railItems[i].style.setProperty('--k', clamp01((innerWidth - r.left) / (r.width * 0.85)).toFixed(3));
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
    var atForm = book.getBoundingClientRect().top < innerHeight * 0.55;
    if (atForm !== lastForm) { docEl.classList.toggle('at-form', atForm); lastForm = atForm; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // ------------------------------------- the sign clip beside the curls --
  // Plays on a loop, muted, only while it is on screen; never under reduced
  // motion, where its poster stays.
  var loops = Array.prototype.slice.call(document.querySelectorAll('video.loop'));
  var phoneMq = matchMedia('(max-width: 760px)');
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
  var touched = false;
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
  if (!reduce && 'IntersectionObserver' in window && compares[0]) {
    var nudge = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        nudge.disconnect();
        if (touched) return;
        var el = en.target, t0 = null, keys = [[0, 50], [0.35, 30], [0.75, 66], [1, 50]];
        function step(ts) {
          if (touched) return;
          if (t0 === null) t0 = ts;
          var k = Math.min(1, (ts - t0) / 1600), i = 1;
          while (i < keys.length - 1 && k > keys[i][0]) i++;
          var a = keys[i - 1], b = keys[i], u = (k - a[0]) / (b[0] - a[0]);
          u = u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
          setPos(el, a[1] + (b[1] - a[1]) * u);
          if (k < 1) requestAnimationFrame(step);
        }
        setTimeout(function () { requestAnimationFrame(step); }, 350);
      });
    }, { threshold: 0.6 });
    nudge.observe(compares[0]);
  }

  // Tabs switch the transformation; the caption follows.
  var baTabs = Array.prototype.slice.call(document.querySelectorAll('.ba__tabs [role="tab"]'));
  var baCaption = document.querySelector('[data-ba-caption]');
  function showView(tab, focus) {
    baTabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      panel.hidden = !on;
      if (on) { var c = panel.querySelector('[data-compare]'); if (c) setPos(c, 50); }
    });
    if (baCaption && tab.getAttribute('data-caption')) baCaption.textContent = tab.getAttribute('data-caption');
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

  // ------------------------------------------------- choosing services --
  var picks = [];
  var boxes = Array.prototype.slice.call(form.querySelectorAll('input[name="services"]'));

  function render() {
    slip.textContent = picks.length ? 'Ma soumission · ' + picks.length : 'Ma soumission';
    docEl.classList.toggle('has-picks', picks.length > 0);
    document.querySelectorAll('[data-add]').forEach(function (b) {
      var on = picks.indexOf(b.getAttribute('data-add')) > -1;
      b.setAttribute('aria-pressed', String(on));
      var st = b.querySelector('[data-state]');
      if (st) st.textContent = on ? 'Choisi' : 'Choisir';
    });
    boxes.forEach(function (bx) { if (SERVICES[bx.value]) bx.checked = picks.indexOf(bx.value) > -1; });
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
      if (picks.indexOf(id) > -1) remove(id); else add(id, b.querySelector('img'));
    });
  });
  boxes.forEach(function (bx) {
    bx.addEventListener('change', function () {
      if (!SERVICES[bx.value]) return;
      if (bx.checked) add(bx.value, null); else remove(bx.value);
    });
  });
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
    if (!chosenDay) { slotsTitle.textContent = 'Choisis d\'abord un jour.'; return; }
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
      'Pour confirmer ta place, envoie ensuite 20 $ par virement Interac à ' + INTERAC_EMAIL + ', avec ton nom et la date dans le message.';
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
    var picked = boxes.filter(function (b) { return b.checked; }).map(function (b) { return SERVICES[b.value] ? SERVICES[b.value].name : b.value; });
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
