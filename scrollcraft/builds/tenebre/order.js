/* TIMELESS order page.
   Shows the piece named in the address (order.html#nocturne), the other
   three below it, and sends the order request. */
(function () {
  'use strict';

  // ---- your turn ---------------------------------------------------------
  // A URL that accepts a JSON POST of { piece, name, email, phone, note }.
  // While it is empty the form says plainly that nothing was sent.
  var ORDER_ENDPOINT = '';
  // The pieces. Keep the names, words and prices the same as the cards in
  // index.html (section "The collection"): every one is an example for now.
  var PIECES = [
    { id: 'meridian', name: 'Meridian', desc: 'Steel, blue dial, tan leather', price: '$4,800',
      img: 'assets/collection/meridian.webp', w: 588, h: 736,
      alt: 'A steel skeleton watch with a blue dial on a tan leather strap, worn under the cuff of a suede jacket' },
    { id: 'nocturne', name: 'Nocturne', desc: 'Rose gold, moon phase, brown leather', price: '$6,900',
      img: 'assets/collection/nocturne.webp', w: 581, h: 726,
      alt: 'A rose gold skeleton watch with a moon phase and an open balance wheel on a brown leather strap, worn under a white shirt cuff' },
    { id: 'atelier', name: 'Atelier', desc: 'Aged bronze, tachymeter, black leather', price: '$3,600',
      img: 'assets/collection/atelier.webp', w: 736, h: 920,
      alt: 'An aged bronze skeleton watch with a tachymeter bezel on a riveted black leather strap, on a wooden desk' },
    { id: 'sovereign', name: 'Sovereign', desc: 'Yellow gold, black dial, black leather', price: '$5,400',
      img: 'assets/collection/sovereign.webp', w: 589, h: 736,
      alt: 'A yellow gold skeleton watch with a black dial and gold baton hands on a black leather strap, worn under a dark knit sleeve' }
  ];
  // ------------------------------------------------------------------------

  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel) { return document.querySelector(sel); };
  var photo = $('.op__photo'), form = $('#order-form');
  var pieceIn = form.querySelector('input[name="piece"]');
  var nameIn = $('#or-name'), mailIn = $('#or-email'), phoneIn = $('#or-phone'), noteIn = $('#or-note');
  var btn = form.querySelector('button'), status = form.querySelector('.close__status');
  var list = $('.op-more__list');
  var current = null;

  var find = function (id) {
    for (var i = 0; i < PIECES.length; i++) if (PIECES[i].id === id) return PIECES[i];
    return PIECES[0];
  };
  var say = function (msg, kind) {
    status.textContent = msg;
    status.classList.toggle('is-error', kind === 'error');
    status.classList.toggle('is-ok', kind === 'ok');
  };

  var show = function (first) {
    var p = find(location.hash.slice(1));
    if (current === p) return;
    current = p;
    document.title = 'Order ' + p.name + ' · TIMELESS';
    $('.op__name').textContent = p.name;
    $('.op__desc').textContent = p.desc;
    $('.op__price').textContent = p.price;
    pieceIn.value = p.id;
    photo.src = p.img; photo.width = p.w; photo.height = p.h; photo.alt = p.alt;
    if (!first) {
      say('');
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      if (!reduce) { photo.classList.remove('is-in'); void photo.offsetWidth; photo.classList.add('is-in'); }
    }
    list.textContent = '';
    PIECES.forEach(function (o) {
      if (o === p) return;
      var li = document.createElement('li');
      li.innerHTML = '<a class="op-more__item" href="order.html#' + o.id + '">' +
        '<span class="op-more__fig"><img src="' + o.img + '" width="' + o.w + '" height="' + o.h + '" loading="lazy" decoding="async" alt=""></span>' +
        '<span class="op-more__name"></span><span class="op-more__price"></span></a>';
      li.querySelector('.op-more__name').textContent = o.name;
      li.querySelector('.op-more__price').textContent = o.price;
      list.appendChild(li);
    });
  };
  show(true);
  var hops = 0;                       // pieces opened from "The others"
  addEventListener('hashchange', function () { hops++; show(false); });

  // Back to the collection: when the reader came from the home page, step
  // back past the pieces they opened here, so the home page returns to where
  // they were; otherwise follow the link.
  $('.op-back').addEventListener('click', function (e) {
    var ref = document.referrer;
    if (ref && ref.indexOf(location.origin) === 0 && !/order\.html/.test(ref) && history.length > hops + 1) {
      e.preventDefault();
      history.go(-(hops + 1));
    }
  });

  [nameIn, mailIn].forEach(function (el) {
    el.addEventListener('input', function () { el.removeAttribute('aria-invalid'); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = nameIn.value.trim(), mail = mailIn.value.trim();
    var okMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail);
    if (!name) { nameIn.setAttribute('aria-invalid', 'true'); say('Please leave a name.', 'error'); nameIn.focus(); return; }
    if (!okMail) { mailIn.setAttribute('aria-invalid', 'true'); say('That email address does not look complete.', 'error'); mailIn.focus(); return; }
    if (!ORDER_ENDPOINT) {
      say('Ordering is not connected yet, so nothing was sent.', 'error');
      return;
    }
    btn.disabled = true; say('Sending.');
    fetch(ORDER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ piece: current.id, name: name, email: mail, phone: phoneIn.value.trim(), note: noteIn.value.trim() })
    }).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      form.reset(); pieceIn.value = current.id;
      say('Thank you. We will write about your ' + current.name + ' shortly.', 'ok');
    }).catch(function () {
      say('That did not go through. Please try again in a moment.', 'error');
    }).then(function () { btn.disabled = false; });
  });
})();
