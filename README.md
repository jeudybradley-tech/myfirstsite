# myfirstsite

Sites en scroll construits avec le skill scroll-craft (moteur `scrollcraft.js` / `scrollcraft.css`).

Le skill lui-même est dans `.claude/skills/scroll-craft/` (version 0.3.1, licence MIT, de Nate Herk) : toute session Claude Code ouverte sur ce dépôt le charge automatiquement.

| Site | Fichier | Contenu |
|---|---|---|
| **TIMELESS** | `scrollcraft/builds/tenebre/index.html` | Montre squelette en or jaune 18 carats, édition de 88, construite à partir de la vidéo fournie : à l'ouverture la montre est entière, le scroll la démonte puis la remonte ; ensuite les détails, le dessin éclaté avec les specs, l'anneau des 88 et la liste d'attente. Brief, plan et vérifications dans `BRIEF.md` à côté. |
| **PROPAGATE** | `scrollcraft/builds/propagate/index.html` | Le t-shirt PROPAGATE, construit à partir des deux vidéos fournies. Brief, plan et vérifications dans `BRIEF.md` à côté. |
| **Salon de coiffure Mechi** | `scrollcraft/builds/mechi/index.html` | Salon de coiffure : services à choisir en cliquant sur les photos, demande de soumission et dépôt de 20 $ par Interac. Brief et vérifications dans `BRIEF.md`. |
| **Nitsy Fashion** | `scrollcraft/builds/nitsy/index.html` | Salon de coiffure, style premium, tresse dessinée en code. Formulaire de contact à brancher. |
| **Nitsy Fashion, le film** | `scrollcraft/builds/nitsy-film/index.html` | Version « film continu » avec les photos envoyées (à remplacer par celles du salon). |
| ALBA | `index.html` | Exemple inventé (canette de café protéiné). |
| Maison Jeudy | `maison.html` | Exemple inventé (boutique d'objets). |

## Voir un site en local

Les vidéos sont chargées par `fetch`, donc il faut un petit serveur, pas un double-clic :

```bash
cd scrollcraft/builds/tenebre      # ou scrollcraft/builds/propagate
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## TIMELESS : à compléter

- **Liste d'attente :** coller l'adresse qui recevra les inscriptions dans `WAITLIST_ENDPOINT`, en haut de `scrollcraft/builds/tenebre/tenebre.js` (requête POST en JSON `{ name, email }`). Tant que c'est vide, le formulaire dit « The waitlist is not connected yet, so nothing was sent. » et n'envoie rien.
- **Innovation :** la section qui suit « Up close » montre une deuxième montre (vidéo `Watch_components_lifting_and_rea…mp4`, fond assombri) dont le défilement soulève le verre, le cadran et le mouvement. Son titre est « Innovation » (il remplace « The Regent ») et sa phrase, qui se termine par « Build your wrist. », s'allume mot à mot. Les caractéristiques de l'édition (42 mm, or jaune 18 carats, 72 h, 217 composants) sont sous le prix.
- **Collection :** quatre montres dans la section « The collection », avant le prix et la liste d'attente, avec vos quatre photos (`assets/collection/`). Les noms et les prix sont des exemples, marqués « Example ». Ces photos montrent des montres d'autres marques (Charlie, Bipfol, Rotary, logo visible) : à remplacer par vos propres photos, ou à utiliser avec l'accord de leurs propriétaires, avant de rendre le site public.
- **Photo de l'horloger :** la photo (`7.jpg`) est derrière « Crafted in darkness » (`assets/story-watchmaker.webp`). Sur grand écran elle occupe la gauche et se fond dans le noir avant le texte ; sur téléphone, elle occupe le haut de l'écran et le texte est en dessous. On ne sait pas d'où vient cette photo : vérifier les droits, ou la remplacer, avant de rendre le site public.
- **Section « Closer » :** vos trois photos (cadran avec tourbillon, mouvement ouvert, horloger à l'établi) remplacent les anciens détails (`assets/detail-tourbillon.webp`, `detail-movement.webp`, `detail-bench.webp`). Elles montrent d'autres montres (un nom de marque est visible sur le cadran) : vérifier les droits, ou les remplacer, avant de rendre le site public.
- **Commandes :** un clic sur une montre de « The collection » ouvre sa page de commande (`scrollcraft/builds/tenebre/order.html#nocturne`, etc.) : grande photo, nom, prix, formulaire « Place your order » (nom, e-mail, téléphone et note facultatifs) et les trois autres montres en dessous. Aucun paiement sur la page. Pour recevoir les commandes, coller une adresse dans `ORDER_ENDPOINT`, en haut de `order.js` (requête POST en JSON `{ piece, name, email, phone, note }`). Tant que c'est vide, le formulaire dit « Ordering is not connected yet, so nothing was sent. » et n'envoie rien. Les noms, descriptions et prix sont à changer à deux endroits : les cartes dans `index.html` et la liste `PIECES` dans `order.js`.
- **« Custom made » :** entre « Crafted in darkness » et « Up close », la photo de l'horloger à la loupe (`assets/bench-loupe.webp`) avec le titre « Custom made » et une phrase à côté. Vérifier les droits de cette photo, ou la remplacer, avant de rendre le site public.
- **Écran d'ouverture :** à la première visite, la page s'ouvre sur « TIMELESS » et « Transcends eras without losing value » révélés par un bloc lumineux, puis l'accueil apparaît (un peu plus de 6 s, puis un fondu lent ; un défilement, un clic ou une touche le passe). À chaque ouverture de la page, sauf au retour depuis la page de commande. Le texte se change dans `index.html`, juste après `<body>`.
- **Logo :** `assets/logo.webp` (fond transparent) en haut de page et en pied de page, `assets/logo-m.webp` pour le téléphone ; l'icône d'onglet reprend les ciseaux. Les couleurs du site suivent le logo : noir #120e09 et or #c59d5a.
- **Rendez-vous :** un calendrier (à partir de demain, 60 jours à l'avance) et les heures du jour choisi, aux 30 minutes. Heures d'ouverture données par la propriétaire : du mercredi au vendredi, de 9 h 30 à 16 h 30 (dernier créneau à 15 h 30), fermé du samedi au mardi. Elles sont affichées au-dessus du calendrier et dans le pied de page. Tout se règle en haut de `salon.js` (`HOURS`, `SLOT_MINUTES`, `LAST_START_BEFORE_CLOSE`, `BOOK_AHEAD_DAYS`). La demande envoie les champs `date` (AAAA-MM-JJ) et `heure` (HH:MM) ; le salon confirme l'heure dans sa réponse.
- **Vidéos :** dans la section « Au salon », après l'avant / après. Les boucles avancent au défilement ; à côté, la cliente devant l'enseigne (`assets/enseigne.mp4`, `-m.mp4` pour le téléphone) joue en boucle, sans son, seulement quand elle est à l'écran. Pas de vidéo à l'accueil, à la demande de la cliente. Fichiers `assets/boucles.mp4` et `assets/boucles-m.mp4` pour le téléphone, encodés avec `encode.sh` du skill (sans son). Image fixe `boucles-poster.webp` pendant le chargement.
- **Polices :** Inter Tight (capitales très fines) et Cormorant Garamond (italique, et droite pour l'écran d'ouverture), d'après votre image de référence ; fichiers et licences libres (OFL) dans `scrollcraft/builds/tenebre/assets/fonts/`.
- **Nom :** « TIMELESS ». Il apparaît dans `index.html` (titre, `<h1>` lettre par lettre, logo du coin, pied de page). Le dossier garde son nom de travail, `tenebre/`.
- **Vidéo :** le site est fait entièrement à partir de `Watch_disassembles_and_reassembles_1080p_20261010143027.mp4`, la version sur fond noir (73 images fixes dans `assets/frames/`, détails et photo du dessin dans `assets/`). Seule la première image est chargée avec la page ; les autres suivent ensuite, une sur huit d'abord, et ne sont décodées que près de l'endroit où l'on se trouve dans la page. Les caractéristiques affichées (42 mm, or jaune 18 carats, 72 h, 217 composants, édition de 88, 48 000 $) sont les vôtres : la page ne peut pas vérifier le métal.

## PROPAGATE : à compléter

- **Achat :** coller l'adresse de la page produit de la boutique dans `CHECKOUT_URL`, en haut de la partie « your turn » de `scrollcraft/builds/propagate/propagate.js`. La couleur et la taille choisies y sont ajoutées (`?print=blue&size=L`). Tant que c'est vide, le bouton affiche « Checkout is not connected yet ».
- **Tailles :** S à XXL sont des valeurs provisoires, à ajuster dans `index.html`.
- **Prix, matière, grammage :** non indiqués, car inconnus.

## MECHI : à compléter

- **Recevoir les demandes :** coller l'adresse d'un service de formulaire dans `FORM_ENDPOINT`, en haut de `scrollcraft/builds/mechi/salon.js` (par exemple Formspree : `https://formspree.io/f/...`). La demande part en POST `multipart/form-data` avec les champs `services`, `avant`, `apres`, `photo`, `date`, `heure`, `nom`, `telephone`, `courriel`, `accepte_depot`. Tant que c'est vide, le formulaire dit « Le formulaire n'est pas encore relié à la boîte de réception du salon, donc ta demande n'a pas été envoyée. » La photo d'inspiration n'est acceptée que par les services qui prennent les fichiers (chez Formspree, un forfait payant).
- **Dépôt Interac :** coller l'adresse courriel qui reçoit les virements dans `INTERAC_EMAIL`, au même endroit. Tant que c'est vide, la page dit que l'adresse est donnée dans la réponse du salon.
- **Règle affichée :** 20 $ déduits de la facture ; gardés si la cliente ne vient pas ou annule moins de 24 h avant. Le site ne peut pas vérifier qu'un virement a été reçu : c'est la propriétaire qui confirme la place à la réception.
- **Services :** quatre cartes (lissage, coupe et frange, couleur, brushing) avec vos photos, « Prix sur devis ». Un clic choisit le service ; il est ajouté à « Ma soumission » et coché dans le formulaire. Les textes sont dans `index.html` et la liste `SERVICES` dans `salon.js`.
- **Avant / Après :** une cliente, vue de dos et de profil (onglets « De dos » / « De profil »). Le visage de la photo de profil « avant » est recadré. La légende « des mèches blondes, une coupe dégradée et un brushing » est à confirmer par la propriétaire.
- **Visages :** les visages qui apparaissaient dans les miroirs (photos lissage et brushing) sont floutés. Vérifier l'accord des clientes avant de rendre le site public.
- **Inconnus :** adresse, téléphone, prix. Rien de tout ça n'est affiché.
- **Mise en ligne :** `.github/workflows/site-mechi.yml` publie ce dossier sur GitHub Pages à chaque mise à jour de `main`, une fois Settings > Pages > Source réglé sur « GitHub Actions ».
- **Polices :** Inter Tight (titres en majuscules très fines, textes) et Cormorant Garamond (italique), les mêmes que TIMELESS, licence libre (OFL), dans `scrollcraft/builds/mechi/assets/fonts/`.
