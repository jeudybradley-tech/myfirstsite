/* ═══════════════════════════════════════════════════════════
   TEMPLATE « SITE IMMERSIF » — content.js
   ► L'UNIQUE FICHIER À RÉÉCRIRE pour produire un nouveau site.
   Renommer en content.js dans le projet cible. La partie
   « injection » en bas de fichier est le moteur de remplissage :
   la copier TELLE QUELLE, ne réécrire que window.SITE_CONTENT.

   Version adaptée au Québec (Montréal & Rive-Sud).

   Schéma narratif (rôle de conversion de chaque bloc) :
   1. ACCROCHE       — hook : promesse + identité en 3 secondes
   2. POSITIONNEMENT — positioning : ce que je fais, pour qui, où
   3. DÉMARCHE       — manifesto : pourquoi moi (différenciation)
   4. PREUVE         — proof : réalisations (masonry) OU features (bento)
   5. DEVISE         — motto : 3 mots-clés géants + légendes
   6-7. PROCESSUS    — universes : « X en 3 étapes » + visuels posés
   8. PREUVE SOCIALE — testimonial : un client parle
   9. OBJECTIONS     — objections : « Pas de… Juste… »
   10. CONVERSION    — contact : e-mail + réassurance
   ═══════════════════════════════════════════════════════════ */

window.SITE_CONTENT = {

  brand: {
    name: 'Bradley & Co',                       // wordmark (header, loader, footer géant)
    title: 'Bradley & Co — Architecture, rénovation et agrandissement, Montréal',  // <title> SEO
    description: 'Bradley & Co, atelier d’architecture à Montréal et sur la Rive-Sud : rénovation, agrandissement et ajout d’étage, dans le respect de la maison existante.',  // meta description
    kicker: 'BRADLEY & CO — ARCHITECTURE, MONTRÉAL',  // ligne mono au-dessus du titre hero
    copyright: '© 2026 — MONTRÉAL, QUÉBEC',
    signature: 'DESSINÉ À LA MAIN, BÂTI POUR NOS HIVERS',  // clin d'œil bas de footer
    socials: [
      { label: 'INSTAGRAM ↗', url: 'https://www.instagram.com/' },
      { label: 'LINKEDIN ↗', url: 'https://www.linkedin.com/' }
    ]
  },

  /* 2 ancres + CTA du header — un mot chacun, CAPS */
  nav: { proof: 'PROJETS', universes: 'MÉTHODE', cta: 'CONTACT' },

  /* 1 · ACCROCHE — « line1 / line2a [image qui naît et devient
     plein écran] line2b ». Total line2a+line2b : court (nowrap). */
  hook: {
    line1: 'Ce qui existe déjà,',
    line2a: 'mérite',
    line2b: 'mieux.',
    image: 'images/hero.jpg',                       // 3:2 — le moment émotionnel
    imageAlt: 'Maison contemporaine en bois et crépi blanc, éclairée le soir',
    floaters: [                                     // 10 visuels du pasteboard (mix portrait/paysage)
      'images/fl-01.jpg',
      'images/fl-02.jpg',
      'images/fl-03.jpg',
      'images/fl-04.jpg',
      'images/fl-05.jpg',
      'images/fl-06.jpg',
      'images/fl-07.jpg',
      'images/fl-08.jpg',
      'images/fl-09.jpg',
      'images/fl-10.jpg'
    ]
  },

  /* 2 · POSITIONNEMENT — ≤ 42 caractères (affiché nowrap, en blanc
     sur l'image plein écran) */
  positioning: 'Rénover, agrandir, surélever — Montréal.',

  /* 3 · DÉMARCHE — [[…]] = ce qu'entoure l'ovale dessiné :
     2 à 3 MOTS MAXIMUM, JAMAIS une phrase entière (l'ovale est un tracé
     à la main : au-delà de 3 mots il s'étire et cesse d'être lisible). */
  manifesto: {
    text: 'Démolir est rarement la bonne réponse. Du bungalow au triplex, nous partons de ce qui est là — la structure, la lumière, l’histoire — et nous ajoutons [[le strict nécessaire]] pour que la maison vive une seconde fois.'
  },

  /* 4 · PREUVE — layout: 'masonry' (8 photos de réalisations)
     ou 'bento' (4 features illustrées : big, tall, tall, big) */
  proof: {
    layout: 'masonry',
    kicker: 'RÉALISATIONS CHOISIES',
    title: 'Huit maisons, une seconde vie',
    sub: 'Bungalows, plex et maisons de ville de Montréal et de la Rive-Sud, transformés sans être effacés.',
    meta: 'HUIT PROJETS — 2019 → 2026',
    /* — layout 'masonry' : exactement 8 items — */
    projects: [
      { img: 'images/p-01.jpg', title: 'Maison de pierre, Saint-Lambert', meta: 'RÉNOVATION COMPLÈTE — 2025' },
      { img: 'images/p-02.jpg', title: 'Cottage, Boucherville', meta: 'TERRASSE COUVERTE — 2022' },
      { img: 'images/p-03.jpg', title: 'Maison de ville, Brossard', meta: 'NOUVELLE FAÇADE — 2025' },
      { img: 'images/p-04.jpg', title: 'Bungalow, Saint-Bruno', meta: 'AGRANDISSEMENT ARRIÈRE — 2023' },
      { img: 'images/p-05.jpg', title: 'Shoebox, Rosemont', meta: 'AJOUT D’ÉTAGE — 2024' },
      { img: 'images/p-06.jpg', title: 'Bungalow 1960, Longueuil', meta: 'TRANSFORMATION — 2023' },
      { img: 'images/p-07.jpg', title: 'Maison 1950, Ahuntsic', meta: 'AGRANDISSEMENT BOIS — 2022' },
      { img: 'images/p-08.jpg', title: 'Loft, Saint-Henri', meta: 'CONVERSION D’USINE — 2021' }
    ]
  },

  /* 5 · DEVISE — 3 mots (train horizontal scrubé), hint d'une ligne */
  motto: {
    kicker: 'CE QUI GUIDE CHAQUE PROJET',
    words: [
      { word: 'Garder', hint: 'Chaque mur conservé, c’est du carbone qui n’est pas émis.' },
      { word: 'Ouvrir', hint: 'Faire entrer la lumière, même en plein mois de janvier.' },
      { word: 'Durer', hint: 'Des matériaux sains, pensés pour nos hivers.' }
    ]
  },

  /* 6-7 · PROCESSUS — « introA introB [visuel] introC » puis les étapes.
     Scène 100 % TYPOGRAPHIQUE : compteur géant, aucune image.
     SEULE `image` est utilisée — c'est le visuel du zoom d'intro,
     1800×1200 (3:2), celui que le rideau de lames vient couper. */
  universes: {
    introA: 'Une',
    introB: 'maison,',
    introC: '3 étapes.',
    cta: 'Parlons-en →',                            // CTA final (ovale dessiné)
    image: 'images/process.jpg',                    // le zoom d'intro (le SEUL visuel de la scène)
    items: [
      { name: 'Le relevé', meta: 'ÉTAPE — 01', desc: 'Nous mesurons, inspectons et photographions l’existant. Un bon diagnostic, c’est un chantier sans mauvaise surprise.' },
      { name: 'Le projet', meta: 'ÉTAPE — 02', desc: 'Plans, maquette 3D et estimation des coûts : vous voyez votre future maison et votre budget avant de vous engager.' },
      { name: 'Le chantier', meta: 'ÉTAPE — 03', desc: 'Permis de la Ville, choix d’un entrepreneur licencié RBQ et suivi chaque semaine, jusqu’à la fin des travaux.' }
    ]
  },

  /* 8 · PREUVE SOCIALE — un avis client, court et crédible.
     quote  : UNE ou DEUX phrases, COMPLÈTES et AUTONOMES — elles doivent
              se lire seules, sans dépendre du chiffre. Sans guillemets :
              la scène les dessine. Ce que dirait vraiment un client, pas
              un slogan.
     figure : le résultat marquant, préfixe optionnel (+, −, ×) ; il monte
              de 0 au scroll. À INVENTER si l'utilisateur n'en donne pas —
              plausible pour le secteur — puis à faire valider.
     unit   : 4 caractères max (m², %, j, k€…).
     kicker : le contexte du projet, en CAPS.
     Sans `figure`, la citation reprend toute la place (repli automatique).
     ⚠ EXEMPLE : à remplacer par un vrai avis client avant toute mise en ligne. */
  testimonial: {
    kicker: 'AJOUT D’ÉTAGE, ROSEMONT',
    figure: '+450',
    unit: 'pi²',
    quote: 'On pensait devoir déménager en banlieue pour avoir une chambre de plus. Ils ont trouvé l’espace au-dessus de nos têtes, sans rien enlever au charme de la maison.',
    author: 'CLAIRE M. — PROPRIÉTAIRE'
  },

  /* 9 · OBJECTIONS — 3 freins + la chute (pill = mot entouré) */
  objections: {
    items: ['Pas de démolition inutile.', 'Pas de budget qui dérape.', 'Pas d’entrepreneur fantôme.'],
    finale: 'Juste une maison',
    pill: 'réinventée.'
  },

  /* 10 · CONVERSION */
  contact: {
    kicker: 'UNE MAISON À TRANSFORMER?',
    email: 'jeudybradley@gmail.com',
    reassurance: 'RÉPONSE SOUS 48 H — PREMIÈRE RENCONTRE SANS ENGAGEMENT'
  },

  /* traînée sous la souris (finale) — 20 visuels, petits formats mixtes */
  trail: [
    'images/t-01.jpg',
    'images/t-02.jpg',
    'images/t-03.jpg',
    'images/t-04.jpg',
    'images/t-05.jpg',
    'images/t-06.jpg',
    'images/t-07.jpg',
    'images/t-08.jpg',
    'images/t-09.jpg',
    'images/t-10.jpg',
    'images/t-11.jpg',
    'images/t-12.jpg',
    'images/t-13.jpg',
    'images/t-14.jpg',
    'images/t-15.jpg',
    'images/t-16.jpg',
    'images/t-17.jpg',
    'images/t-18.jpg',
    'images/t-19.jpg',
    'images/t-20.jpg'
  ]
};

/* ═══════════════════════════════════════════════════════════
   INJECTION — NE PAS MODIFIER (remplit le DOM avant app.js)
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.SITE_CONTENT;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const set = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };

  document.title = C.brand.title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', C.brand.description);

  // chrome
  set('.loader-wordmark', C.brand.name);
  set('.dock-wordmark', C.brand.name);
  set('.dock-link[href="#travaux"]', C.nav.proof);
  set('.dock-link[href="#explorer"]', C.nav.universes);
  set('.dock-cta', C.nav.cta);

  // 1 · accroche
  set('#heroKicker', C.brand.kicker);
  set('#heroLine1', C.hook.line1);
  const hls = $$('#heroLine2 .hl');
  if (hls.length === 2) { hls[0].textContent = C.hook.line2a; hls[1].textContent = C.hook.line2b; }
  const g1 = $('#grow1 img');
  if (g1) { g1.src = C.hook.image; g1.alt = C.hook.imageAlt; }
  $$('.floaters .fl img').forEach((img, i) => { if (C.hook.floaters[i]) img.src = C.hook.floaters[i]; });

  // 2 · positionnement (un span par mot)
  const intro = $('#spotIntro');
  if (intro) intro.innerHTML = C.positioning.split(' ').map((w) => `<span>${w}</span>`).join(' ');

  // 3 · démarche
  const fill = $('#fillText');
  if (fill) {
    fill.innerHTML = C.manifesto.text.replace(
      /\[\[(.+?)\]\]/,
      '<span class="boxed" id="boxedPhrase">$1<svg class="box-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="boxPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>'
    );
  }

  // 4 · preuve : masonry (8 photos) ou bento (4 features big/tall/tall/big)
  const head = $$('.coll-head > *');
  if (head.length === 4) {
    head[0].textContent = C.proof.kicker;
    head[1].textContent = C.proof.title;
    head[2].textContent = C.proof.sub;
    head[3].textContent = C.proof.meta;
  }
  const grid = $('#collGrid');
  if (grid && C.proof.layout === 'bento') {
    grid.className = 'bento-grid';
    grid.innerHTML = C.proof.features.map((f) =>
      `<figure class="card${f.size ? ' b-' + f.size : ''}"><div class="card-img"><img src="${f.illu}" alt="${f.title}"></div><figcaption>${f.title}<span class="mono">${f.meta}</span></figcaption></figure>`
    ).join('');
  } else if (grid) {
    grid.className = 'coll-grid';
    const SPEEDS = [-0.05, 0.06, -0.028, 0.085];
    grid.innerHTML = SPEEDS.map((s, ci) =>
      `<div class="col" data-pspeed="${s}">` +
      C.proof.projects.slice(ci * 2, ci * 2 + 2).map((p) =>
        `<figure class="card"><div class="card-img"><img src="${p.img}" alt="${p.title} — ${p.meta}"></div><figcaption>${p.title}<span class="mono">${p.meta}</span></figcaption></figure>`
      ).join('') + '</div>'
    ).join('');
  }

  // 5 · devise (train de mots-clés)
  set('#mottoKicker', C.motto.kicker);
  const mtrack = $('#mottoTrack');
  if (mtrack) mtrack.innerHTML = C.motto.words.map((w) => `<span class="mw">${w.word}</span>`).join('');

  // 6-7 · processus immersif (visuels posés un à un)
  set('#nw1', C.universes.introA);
  set('#nw2', C.universes.introB);
  set('#nw3', C.universes.introC);
  const g2 = $('#grow2 img');
  if (g2) g2.src = C.universes.image || (C.universes.items[0] || {}).img || g2.src;
  const psteps = $('#psteps');
  if (psteps) {
    psteps.innerHTML = C.universes.items.map((u) =>
      `<div class="pstep"><span class="pstep-meta mono ash">${u.meta}</span><h3>${u.name}</h3><p>${u.desc || ''}</p></div>`
    ).join('');
  }
  const sCta = $('#stepsCtaLink');
  if (sCta) sCta.childNodes[0].textContent = C.universes.cta;

  // 8 · preuve sociale — le chiffre qui frappe
  set('#figKicker', C.testimonial.kicker || '');
  const figM = String(C.testimonial.figure || '').trim().match(/^([^\d.,+-]*[+\u2212-]?)\s*(-?[\d.,]+)/);
  set('#figPre', figM ? figM[1] : '');
  set('#figVal', figM ? figM[2] : '');
  set('#figUnit', C.testimonial.unit || '');
  set('#quoteText', C.testimonial.quote);
  set('#quoteAuthor', C.testimonial.author);

  // 9 · objections
  C.objections.items.forEach((t, i) => set('#fs' + (i + 1), t));
  const fs4 = $('#fs4');
  if (fs4) {
    fs4.innerHTML = `${C.objections.finale} <span class="pill" id="pillPhrase">${C.objections.pill}<svg class="pill-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="pillPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>`;
  }
  $$('#trail img').forEach((img, i) => { img.src = C.trail[i % C.trail.length]; });

  // 10 · conversion
  set('.footer-kicker', C.contact.kicker);
  const mail = $('.footer-mail');
  if (mail) { mail.href = 'mailto:' + C.contact.email; mail.querySelector('.footer-mail-text').textContent = C.contact.email; }
  set('.footer-reassurance', C.contact.reassurance);
  const fname = $('#footerName');
  if (fname) { fname.textContent = C.brand.name; fname.setAttribute('aria-label', C.brand.name); }
  const bottom = $$('.footer-bottom > p');
  if (bottom.length === 3) {
    bottom[0].textContent = C.brand.copyright;
    bottom[1].innerHTML = C.brand.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('&nbsp;&nbsp;&nbsp;');
    bottom[2].textContent = C.brand.signature;
  }
})();
