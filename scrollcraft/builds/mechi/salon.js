/* Salon de coiffure Mechi. Page code only: the engine is untouched.
   Everything here reads the engine's --sc-p off an act, or answers the visitor. */
(function () {
  'use strict';

  // ---------------------------------------------------------------------
  // À COMPLÉTER
  // FORM_ENDPOINT : l'adresse qui reçoit les demandes (ex. un formulaire
  //   Formspree : https://formspree.io/f/xxxxxxx). Requête POST, en
  //   multipart/form-data (la photo d'inspiration y est jointe si elle existe).
  //   Tant que c'est vide, rien n'est envoyé et le formulaire le dit.
  // INTERAC_EMAIL : l'adresse qui reçoit les virements Interac du dépôt.
  //   Tant que c'est vide, la page dit que l'adresse viendra avec la réponse.
  // ---------------------------------------------------------------------
  var FORM_ENDPOINT = '';
  var INTERAC_EMAIL = '';

  var SERVICES = {
    lissage:  { name: 'Lissage soyeux',  img: 'assets/lissage-m.webp' },
    coupe:    { name: 'Coupe et frange', img: 'assets/coupe-m.webp' },
    couleur:  { name: 'Couleur',         img: 'assets/cuivre-m.webp' },
    brushing: { name: 'Brushing',        img: 'assets/apres-m.webp' }
  };

  var docEl = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var depot = document.getElementById('depot');
  var svc = document.getElementById('services');
  var book = document.getElementById('soumission');
  var railEl = svc.querySelector('.rail');
  var railItems = Array.prototype.slice.call(svc.querySelectorAll('.card, .rail__end'));
  var finalEl = document.querySelector('[data-final]'), finalCta = finalEl.querySelector('a');
  var form = document.getElementById('form');
  var announce = document.querySelector('[data-announce]');
  var slip = document.querySelector('[data-slip]');

  function prog(el) { return parseFloat(getComputedStyle(el).getPropertyValue('--sc-p')) || 0; }
  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }

  // ------------------------------------------------------------ per frame --
  var lastFinal = null, lastForm = null;
  function frame() {
    // The deposit act ends on "Ta chaise t'attend": make its link reachable
    // only once it is actually on screen.
    var shown = prog(depot) > 0.72;
    if (shown !== lastFinal) {
      finalEl.setAttribute('aria-hidden', String(!shown));
      finalCta.tabIndex = shown ? 0 : -1;
      lastFinal = shown;
    }

    // Services rail: each card settles as it comes in from the right edge.
    var sr = svc.getBoundingClientRect();
    if (!reduce && sr.bottom > 0 && sr.top < innerHeight) {
      for (var i = 0; i < railItems.length; i++) {
        var r = railItems[i].getBoundingClientRect();
        railItems[i].style.setProperty('--k', clamp01((innerWidth - r.left) / (r.width * 0.85)).toFixed(3));
      }
    }

    // The request pill steps aside once the form itself is on screen.
    var atForm = book.getBoundingClientRect().top < innerHeight * 0.55;
    if (atForm !== lastForm) { docEl.classList.toggle('at-form', atForm); lastForm = atForm; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

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
  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  var iso = today.toISOString().slice(0, 10);
  form.elements.date1.min = iso; form.elements.date2.min = iso;

  if (INTERAC_EMAIL) {
    var span = form.querySelector('[data-interac]');
    span.textContent = 'à ';
    var strong = document.createElement('strong'); strong.textContent = INTERAC_EMAIL; span.appendChild(strong);
    form.querySelector('[data-done-depot]').textContent =
      'Pour confirmer ta place, envoie ensuite 20 $ par virement Interac à ' + INTERAC_EMAIL + ', avec ton nom et la date dans le message.';
  }

  var MESSAGES = {
    cheveux: 'Décris tes cheveux aujourd\'hui et ce qui te dérange.',
    date1: 'Choisis au moins une journée.',
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

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.classList.remove('is-error'); status.textContent = '';
    var order = ['cheveux', 'date1', 'nom', 'telephone', 'courriel', 'accepte_depot'];
    for (var i = 0; i < order.length; i++) {
      var el = form.elements[order[i]];
      var empty = el.type === 'checkbox' ? !el.checked : !el.value.trim();
      if (empty || !el.checkValidity()) { fail(MESSAGES[order[i]], el); return; }
    }
    var d2 = form.elements.date2;
    if (d2.value && !d2.checkValidity()) { fail('La deuxième journée doit être aujourd\'hui ou plus tard.', d2); return; }

    var first = form.elements.nom.value.trim().split(/\s+/)[0];
    if (!FORM_ENDPOINT) {
      status.textContent = 'Merci ' + first + '. Le formulaire n\'est pas encore relié à la boîte de réception du salon, donc ta demande n\'a pas été envoyée.';
      return;
    }

    var data = new FormData(form);
    data.append('_subject', 'Demande de soumission : ' + form.elements.nom.value.trim());
    submit.disabled = true; status.textContent = 'Envoi en cours…';
    fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error(String(res.status));
        status.textContent = '';
        form.querySelectorAll('fieldset, .deposit, .send').forEach(function (n) { n.hidden = true; });
        done.classList.add('is-on'); done.focus();
      })
      .catch(function () {
        fail('La demande n\'a pas pu être envoyée. Vérifie ta connexion et réessaie.', null);
      })
      .then(function () { submit.disabled = false; });
  });
})();
