# MECHI : brief

Client answers verbatim where quoted; everything else is authored under the
client's "À toi de voir" (3 November 2026) and marked as such.

## What the client asked for

- "je veux que tu me créer un site de salon coiffure comme nitsy fashion."
- Deposit: "elle veut lorsqu'un client réserver un rendez-vous qu'elle fasse un
  dépôt de 20$ pour permettre de forcer le client à se pointer". Method chosen:
  **Virement Interac**. Rule chosen: **déduit du prix, gardé si la cliente ne
  vient pas ou annule moins de 24 h avant.**
- Quote request: "une section où que le client pourrait faire une demande de
  soumission lors de la prise de rendez-vous [...] le problème, le service ou
  la coupe qu'elle veut".
- Name: "salon de coiffure Meechi", corrected to **"Salon de coiffure Mechi"**.
- Services: "les photos que je t'ai fournir je veux que tu fais un service où
  que les gens peuvent cliquer et selectionner", "la même manière que tu avais
  fais pour le site nitsy fashion".
- "je veux pas l'option avant et après". The first version of this build was a
  Split stage (avant on one side, après on the other, the divider sweeping
  away at the deposit). It was taken out entirely on that instruction.

- Menu: "peux-tu installer un onglet", answered *Menu en haut du site*: a fixed bar with Accueil, Services, Comment ça marche, Le dépôt and the CTA; the tab of the section being read is underlined; on phones a Menu button opens the list.

- Type: "je veux que tu utilise la même typographie qui est dans l'image" (the TIMELESS "CUSTOM MADE" panel): Inter Tight at weight 200 in capitals for every title, its emphasis in Cormorant Garamond italic capitals; introductions in the italic serif; labels, buttons, form and small print in Inter Tight.

- Logo: "voici le logo", a black plaque with gold scrollwork, "Salon de Coiffure Mechi" in gold script and gold scissors, on a transparent ground. It replaces the hero wordmark and signs the footer; the favicon is its scissors. The page's palette now follows it: the logo's black `#120e09` for the dark grounds, its gold `#c59d5a` as the accent (`#7a5a1c` on the ivory ground, 5.5:1), ivory `#f3efe8`. The top menu keeps the name in type, in gold, since the logo's script is unreadable at bar size.

- Appointment: "je veux qu'un calandrier et l'heure, je ne veux pas une deuxième journée". The two date fields and the time-of-day menu are replaced by a month calendar (from tomorrow, 60 days ahead, closed days struck through) and the day's half-hour times grouped Matin / Après-midi / Soir; the choice reads back as one line ("Ta demande : jeudi 5 novembre à 14 h 00."). Opening hours, given by the client: Wednesday to Friday 9 h 30 to 16 h 30, closed Saturday to Tuesday; set in `HOURS` at the top of `salon.js`, shown above the calendar and in the footer. Last bookable start 15 h 30 (one hour before closing).

- Videos: two portrait clips from the salon, asked for as "Vidéo au défilement". The client in front of the Mechi sign was the hero for one round, then removed on "je ne veux pas de video à l'accueil": the hero is back to the logo and two photos. The long curls in the chair stay, as the page's one `scrub` act (2.4vh) after the before/after. The sign clip then came back "à côtés des boucles": a smaller frame overlapping the curls frame (its caption "Devant notre enseigne" removed at the client's request), playing on a muted loop only while on screen (the engine scrubs one clip per act); on phones it is a small inset at the top right; under reduced motion it holds its poster. Encoded with `encode.sh` (dense GOP, no audio), 608x1080 and a 720p phone variant. On phones the clip goes full bleed under a top and bottom scrim.

- TikTok: "tik tok: Salondecoiffuremechi [...] je veux que ça apparaît dans la section il y a des vidéos". A pill under the section's button: TikTok mark, "Plus de vidéos sur TikTok", **@salondecoiffuremechi**, linking to https://www.tiktok.com/@salondecoiffuremechi in a new tab. The address could not be opened from the build environment; the client should test it.

- Owner: "est-ce que tu penses une biographie de la propriétaire serait bon ?", placed "juste après la section de vidéo". Section `#proprietaire` (photo, name, three or four sentences, facts: experience, training, specialties, languages, one quote), with a menu tab "La propriétaire". Filled from what the client gave: "son nom est Mercedes", her profile photo, and her flyer (specialties: brushing et mise en plis, coupe moderne, coloration et mèches, traitements capillaires, lissage et botox capillaire, toutes textures; the motto "Une beauté qui vous ressemble"; 8025 Léonard de Vinci, Montréal; 438-377-2535, now also in the footer). Experience, training and languages are unknown, so those rows were dropped rather than invented. The photo was sharpened with ElevenLabs (Topaz upscale v2, 2x, about 485 credits) but the result could not be downloaded from the build environment (elevenlabsusercontent.com blocked), so the original photo is on the page for now. The deploy workflow fails while any `data-todo` remains. The menu switches to its Menu button below 1240 px so the extra tab never wraps.

- Colour card: "peux-tu ajouter et remplacer cette photo dans les services" (dark hair with red highlights). It replaces the copper photo on the colour card, renamed "Coloration et mèches" as on the owner's flyer, in the rail and in the form; the copper photo stays in the hero.

- Cut card: "ajouter et remplace cette photo avec la photo coupe et frange" (defined curls, no bangs). It replaces the curtain-bang bob on the cut card, renamed "Coupe et boucles" so the title matches the photo; the form value stays `coupe`. The old photo is no longer used and was removed from the build.

- Services named by the client: "deuxième photo c'est une permanente, troisième c'est une teinture, quatrième c'est une kératine" (and the first a silk press: "je veux le titre soit changé par Silk press"). Cards and form entries renamed Silk press, Permanente, Teinture, Kératine; the values sent with a request follow (`silkpress`, `permanente`, `teinture`, `keratine`). Descriptions say what the service gives, never the process ("je ne veux pas le processus") so the salon reads the real service.

- Before / after, second version: "peux-tu ajouter ces photos dans la section avant et après [...] un autre modèle de présentation" (natural hair before, silk press after), model chosen "Curseur à glisser". One frame per transformation, before on the left and after on the right, the reader drags the line (pointer, touch with vertical scroll left free, or keyboard through a hidden range input); tabs Silk press / Blond lumineux switch transformation and caption (the dos/profil buttons were removed on "je ne veux pas les bouton de dos de profil"; the blond keeps its back view, the profile pair is gone); the line sweeps once on first view (not under reduced motion).

- Social section: "section de réseaux je veux un titre et description accrochant". The video section becomes the TikTok invitation: label "Sur TikTok", title "Les coulisses de Mechi.", line "Des boucles qui rebondissent, des silk press qui brillent, des couleurs qui changent tout. Abonne-toi pour voir les prochaines transformations en premier.", button "Abonne-toi sur TikTok". On phones the label sits on a dark pill so it reads over the clip.

- Menu logo: "je veux que ce logo soit dans le milieu de l'onglet". The transparent logo (not the newly sent copy, which has an opaque ground) sits centered in the top bar, which grows to 5.5rem (4.75rem below 1270px); the tabs split around it, Accueil to La propriétaire on the left, Comment ça marche, Le dépôt and the CTA on the right. Below 1270px the tabs fold into the Menu button and the logo stays centered.

- "enlever cette section" (the pinned deposit statement with the giant 20 $, and "Ta chaise t'attend"): removed, with its menu tab. The deposit rule still reads in the three steps, the form (with consent) and the footer.
- Service frames, "de les rendre d'un autre modèle": arch frames (photo in a salon-mirror arch, fine gold filet set off around it, the tick on the arch's foot, text centred, a short gold rule above price and button), titles all in gold italic capitals. Card width now follows the screen height so a card always fits below the menu (1280x720 and 375x667 checked).

- Menu format: "je veux l'onglet aille une format comme la photo" (a floating, rounded, frosted-glass nav). The bar is now a pill inset from the edges (4.75rem tall, .8rem from the top), translucent black with a backdrop blur, a faint ivory border and a soft shadow; the logo stays centred, tabs split around it, the gold CTA on the right. --bar-h now counts the pill plus its offsets. "Comment ça marche" then moved to the left group on request, so the right side holds only the CTA; with five tabs on the left the Menu button takes over below 1350px (an opaque rounded panel under the pill).

- Video model, "as-tu un autre modèle comment les vidéos peuvent être présentées", chose "Deux téléphones": the section is now a flow act; both portrait clips play muted on a loop (only while on screen, posters under reduced motion) inside gold-edged phone frames, side by side, tilted -4/+4 degrees and staggered, each tagged @salondecoiffuremechi; title, line, TikTok pill and CTA centred above. Phone size follows the screen height so both fit below the menu. The page therefore has no scrubbed clip any more.

- Hero, last version: "dans la section d'accueil je veux que ça soit le fond d'écran, je veux que la photo soit sombre et enlève les autres photos", then "je ne veux pas le logo" and "enlève ces parties" (the tagline and the two buttons). The hero is now the salon interior full bleed (framed family photo on the shelf blurred), darkened by a left-weighted gradient and a fade into the next section, with a slow parallax; on it only a gold kicker "Salon de coiffure · Montréal" and the h1 "Une beauté qui vous ressemble." (the salon's motto from the flyer; the h1 also carries the salon's name for screen readers). The logo stays in the menu; the CTA stays in the menu. The copper and silk-press photos left the hero; the copper file and the large logo file were removed as unused.

- Requests by email: "je vais utiliser mon courriel pour recevoir les demandes" (jeudybradley@gmail.com). FormSubmit's AJAX endpoint, JSON body with French labels, `_replyto` set to the client, `_template: table`, a honeypot field. Handles the first-use activation reply and network failure with plain messages and the salon's phone number. The file field was replaced by a line inviting the client to send her inspiration photo by replying (FormSubmit's AJAX endpoint does not carry files). Tested against a mocked endpoint only; no real email was sent from the build environment.
- Formspree: "je pense que formspree va le faire" (after a Google Forms option was offered, then dropped). `FORM_ENDPOINT` accepts a `https://formspree.io/f/…` address; the code spots it and sends the same labelled answers with `_subject`, `_replyto` and `_gotcha` (Formspree's honeypot) instead of FormSubmit's `_template`, `_captcha`, `_honey`. Success is `{ ok: true }`; error text is read from `errors[].message`. The classic fallback posts to the same Formspree address, without `_next`. Tested with mocked formspree.io routes: success (one simple POST, done panel), error (message with the phone number), outage (classic fallback).
- Live endpoint set to `https://formspree.io/f/mwllzzaw` (the owner's Formspree form, jeudybradley@gmail.com). formspree.io cannot be reached from the build environment, so the real delivery is confirmed only by a request sent from the live site.

## Assets

The client's own salon photos: lissage (black bob), coupe et frange (dark bob
with curtain bangs), couleur cuivrée, brushing (long brown layers). Faces
reflected in mirrors are blurred. A fifth photo (long wavy hair in the chair)
was a "before" and is no longer used. The client then sent one client's
before/after, back and profile ("je veux que tu fais un avant et après avec ces
photos"): they are a section of their own, not the page's concept. The face in
the profile "avant" is cropped out. Caption (authored, to confirm): "des mèches
blondes, une coupe dégradée et un brushing".

## Shape (client-directed)

Like the Nitsy Fashion film site, at the client's request:

`flow(hero: darkened salon photo, motto) > pan(services rail) > flow(avant / après) > flow(TikTok, two phones) > flow(the owner) > flow(three steps) >
pin(the deposit) > flow(request form)`, 8 acts, about 16 viewport-heights.

| Beat | Device | Why |
|---|---|---|
| Recognition | `flow` + `parallax` | The name at poster scale and two real results at two depths |
| Choice | `pan`, cards are buttons | As on Nitsy: the page holds and the services slide in; a click chooses one |
| Proof | `flow` + `reveal` | One real client, avant beside après; tabs switch back and profile views; the après wipes in |
| Clarity | `flow` + `in` | Three numbered steps, a real sequence |
| Peak | `pin` + cues + `--sc-p` | "Un dépôt de 20 $ garde ta place.", the rule line by line beside a large 20 $, then "Ta chaise t'attend." |
| Commitment | `flow` | The request form, with the chosen services already ticked |

**Signature move**: choosing a service (in the rail or in the form) flies its
photo into the *Ma soumission* pill, which counts the picks and takes you to
the form; the form arrives with those services ticked.

**Feeling curve**: welcome, envie, clarté, soulagement then engagement,
facilité. Peak sentence: "J'ai vu le gros 20 $ et j'ai compris : ma place est
gardée." Tell-someone: "C'est le site où tu cliques sur les coiffures que tu
veux et ta demande se remplit toute seule."

## Business rules on the page

- The request comes first: services, *Tes cheveux aujourd'hui* (required),
  *Ce que tu aimerais*, optional inspiration photo, the chosen day and time, name, phone, email.
- The salon replies with the advised service, duration, price and time; the
  client then sends 20 $ by Interac to confirm, and must tick that she accepts
  the deposit rule.
- `FORM_ENDPOINT` is set (FormSubmit, see below); `INTERAC_EMAIL` stays empty until
  the salon provides it, and the page says so plainly instead of pretending.

## Unknown, so not stated

Prices ("Prix sur devis" on every card), team.

## Verification (4 November 2026)

`shoot.mjs` at 1440x900 and 390x844: no dead scroll, every cue clears 4.5:1,
no console errors. Rail travel measured (941 px desktop, 1486 px phone).
Functional test, desktop and phone: choosing from the rail and from the form
cards, pill count, unchoosing, form validation, the not-connected message.
Not verified: a real phone, a real form endpoint.
- Experience: "elle fait de la coiffure pendant 25 ans". The bio now opens with it ("Mercedes coiffe depuis 25 ans et dirige le Salon…") and the facts list starts with Expérience : 25 ans de coiffure. Checked at 1440 and 390: four facts, no horizontal overflow.
- Service card frame: after a sheet of six frame models, the owner sent a reference image of a soft rounded rectangle ("je veux une forme comme ça"). The arch and its gold hairline frame are gone: the photo is a rounded rectangle (radius 1.75rem, about 10 % of the card), with a soft drop shadow. A chosen card gets a gold ring set 5px off the photo; the focus outline moved out to 11px so it never sits on that ring. Checked at 1440 and 390 with a card chosen.
- "je veux aussi ce cadre pour la section en bas": the four service photos in the request form (.pick__ph) take the same rounded rectangle (radius 1.25rem, about 10 % of their width); the chosen photo's gold outline follows the curve. Checked at 1440 and 390.
- Colour: "Applique le beige". From a Peintures MF ad, "MF 0251 – Alchimie", tried first as a separate preview, then applied. The :root tokens change in place (names kept so every rule still works): --slate #d3ba9c (the beige ground that replaced black), --on-slate #2a1a0a, --on-slate-soft #33220f, --porc #f5ede1, --on-porc #1f160c, --on-porc-soft #2f2519, --gold #66431f (the brown accent that replaced gold), --gold-deep #6e4a22. A labelled block at the end of the styles finishes the switch:
  - cream glass menu;
  - a beige veil on the salon photo only behind the motto (left on desktop, bottom on phones), at the owner's request that the photo stay visible;
  - brown shadows, and cream ink on brown;
  - cards no longer fade while sliding in, and descriptions are weight 500 with the TikTok italic at 600 ("je veux que les descriptions soient visibles, plus noir").
  Checked at 1440 and 390: every section, the open phone menu, no horizontal overflow, no console errors.
- "je veux moins de beige" (on the hero): the left beige veil is gone; a soft cream glow sits only behind the motto (radial, about a third of the screen), with a faint left tint, and the motto has a cream halo. On phones the veil starts lower (from 38 %) and is lighter (.55 to .75). The salon photo now shows in full colour around the text. Checked at 1440, 713 and 390.
- "je veux qu'il ressemble exactement à mon image" (her screenshot of the larger-screen hero): on phones the motto now sits in the middle of the photo (align-content: center) instead of at the bottom, the photo stays in full colour (only a short fade to beige at the very bottom), and a cream glow drawn by .hero__copy::before (radial, closest-side) follows the text block. Checked at 390.
- Fifth service: "je veux que tu mets un nouveau service shampoing traitant" (then "annuler", then "continue"). The owner's photo (736 x 1104, a woman's long brown hair rinsed at the basin) is cropped to 3:4 (736 x 981, top wall trimmed) as shampoing.webp, plus shampoing-m.webp at 600 x 800. Added as a rail card after Kératine, a sixth .pick option, and SERVICES.shampoing in salon.js. Description says what it gives, not how: "nourrit la fibre et apaise le cuir chevelu, pour des cheveux propres, doux et légers". The form grid goes to five columns, three below 1100 px, two on phones. Checked at 1440, 1000 and 390: the card is reachable in the pan and the closing CTA still shows, choosing it ticks the form option, no overflow, no console errors. The photo's source is unknown (its width matches Pinterest's): flagged in the README.
- Products section: "créer une section de produit entre glisse et les coulisses de Mechi", with the owner's photo of the Moroccanoil Stylist Set (Coffret Styliste) on the salon counter. #produits (flow) sits between #avant-apres and #boucles:
  - a sand ground (--porc-2) between the cream before/after and the beige TikTok;
  - the photo on the left in the same rounded rectangle as the service cards;
  - on the right: label "En vente au salon", h2 "Tes soins, à la maison.", an italic lead, a cream card listing only the products whose names are legible on their boxes in the photo, a note to ask the salon for price and stock, and a CTA "Appeler le salon" (tel:).
  - No price and no full contents are invented; the README lists them as unknown. Not added to the menu: a sixth link would run into the centred logo at 1350 to 1440 px.
  Checked at 1440 and 390: section order, no overflow, no console errors, no missing files.
- "à la place d'écrire coulisses écris tendance": the TikTok title is now "Les tendances de Mechi." (plural, to agree with « Les »).
- "ENLÈVE" (two screenshots): removed the before/after caption ("Des cheveux naturels crépus, transformés par un silk press…", which also changed with the tabs) together with the tabs' data-caption attributes and the caption code in salon.js, and the TikTok paragraph ("Des boucles qui rebondissent…"). Tabs still switch the slider. Checked at 1440 and 390, no console errors.
- Product cards: "je veux que ces produits soient dans un cadre comme les services de cheveux", with four Moroccanoil product shots (brand photos on a cream wall and stone ledge).
  - Each photo is cropped to 4:5 (sides trimmed on the wide ones, a little top on the tall one), never upscaled: prod-hydratant 570x712, prod-volume 600x750, prod-traitement 399x499, prod-sans-rincage 600x750.
  - Under the set in #produits, a row titled "Aussi en vente au salon": four cards, each with the same rounded frame and shadow as the service cards, the name in the service-name style (italic caps, brown), a one-line benefit taken from the label, and size plus "Prix en salon".
  - Four columns, two below 1000 px and on phones.
  - Checked at 1440, 900 and 390: no overflow, no console errors, no missing files.
- "je veux pareil pour ça" (the set photo), then "je veux qu'il soit dans la même section": the Moroccanoil Stylist Set leaves its large photo-plus-list layout and becomes the first of five product cards in one row, framed and styled like the others.
  - Its photo is cropped to 4:5 from the bottom of the original: prod-coffret 600x750. produits.webp and produits-m.webp are removed.
  - The section head (label, title, lead, note, call button) is now centred above the row.
  - The cards sit in five columns, three below 1100 px and two on phones; on phones the set spans both columns.
  - Rules for the old two-column layout are gone.
  - Checked at 1440, 900 and 390: five cards, no overflow, no console errors, no missing files.
- Hair bundles: "pareille" with a photo of two body-wave bundles in their bags (labels "STYLE: R-BW 18\" COLOR: NATURAL").
  - Added as a sixth card, "Mèches ondulées": "Paquets de cheveux ondulés (body wave), couleur naturelle.", 18 po · Prix en salon.
  - The photo is cropped to 4:5 keeping both labels: prod-meches 600x750.
  - Nothing is claimed about the hair's origin.
  - The lead now reads "Des soins Moroccanoil et des mèches, en vente au salon…".
  - The grid becomes three across (max 62rem) on every screen above 760 px, two on phones; the set no longer spans two columns on phones, so six cards make even rows.
  - Checked at 1440, 900 and 390.
- "je ne veux pas de crochet lors des sélections", then "c'est pareil pour la catégorie en haut": the check circles are gone from the service cards (.card__tick) and from the form photos (.pick__tick), markup and styles. A choice still shows: on a service card, the brown ring around the photo and the "Choisi" pill; on a form photo, the brown outline and "Choisi". Checked at 1440 and 390.
- "enlève" on the hero text, then "Tout le texte" (asked: the small line only, all text, or the cream glow). The hero is now the salon photo alone, in full colour, with only a short fade into the beige at the bottom, on every screen. The kicker, the visible motto and both cream glows (desktop radial, phone .hero__copy::before) are gone with their rules. The page keeps one h1, for screen readers only: "Salon de coiffure Mechi, à Montréal : une beauté qui vous ressemble." The motto still appears in the owner section. Checked at 1440, 713 and 390.
- "je veux que le bouton glisse glisse automatiquement et ajoute mon courriel jeudybradley@gmail.com dans les sections qui ont besoin de faire le virement".
  - Slider: the one-time nudge is replaced by an automatic glide. The line follows a sine between 22 % and 78 % with a 5.2 s period, only while the frame is on screen (IntersectionObserver, rAF stopped off screen). A drag, a pointer move while dragging or a key on the hidden range hands it to the reader. After 6 s idle it resumes from where it was left. Nothing moves under reduced motion. Tested: glides, stays at 15 % after a drag for the idle time, then resumes; no motion with reduced motion; no console errors.
  - Interac: INTERAC_EMAIL = jeudybradley@gmail.com, at the owner's request, on a public page. It shows in the deposit box, in the "Demande envoyée" panel, and in step 3 of "Comment ça marche" through a new [data-interac-how] span filled by the same code. To swap for Mercedes's address at handover.
- "est-ce que tu peux rendre le curseur moins gros": the compare knob goes from 3.4rem (54 px) to 2.25rem (36 px), its arrows from 22 to 15 px (stroke 2.4), the light halo from 4 to 3 px and the shadow one step lighter. Dragging still works anywhere on the photo, so the smaller knob costs nothing. Checked at 1440 and 390.
- Colour options: the owner sent five Teinture options with prices and wants a click on Teinture to offer them. Then: "pose-moi des questions". Answers: a window over the page, several options at once, the same in the form, and no preference for other prices (they keep "Prix sur devis").
  - OPTIONS.teinture in salon.js holds names and prices; a single <dialog class="opts"> lists them, built by JS.
  - Rows show name and price; a chosen row turns brown with a "Choisi" pill. The native checkbox is visually hidden, keeping with "no checkmarks".
  - The button reads Ajouter / Mettre à jour / Retirer, and is disabled when nothing is chosen and nothing was. Esc, Annuler, × or a click on the backdrop close without change; focus returns to the opener.
  - The rail card opens it instead of toggling; its state pill says "Voir les options" until chosen, and its foot says "À partir de 130 $". In the form, a click on the Teinture photo is intercepted (preventDefault) and opens the same window.
  - The chosen options show under Teinture on the card and in the form, and go to Formspree as "Teinture (Balayage, Cellophane capillaire)".
  - Tested at 1440 and 390: open from the card and the form; add two; Esc keeps them; remove all; Kératine still ticks normally; payload text correct; no console errors.
- "lorsqu'on sélectionne une option la photo apparaît" and "la photo apparaît à côté de l'option".
  - A first try put one large photo frame in the window; it was replaced within the same turn.
  - Now each option row holds a hidden thumbnail (.opts__thumb, 4.4 x 5.5 rem, rounded). It slides open beside the option when chosen (width, margin and opacity transition, none under reduced motion).
  - OPTIONS entries take an optional img and fall back to the service photo. Teinture couleur uses couleur-m.webp and Mèches uses ba-apres-dos-m.webp (the blond highlights after-photo). Peroxyde, balayage and cellophane wait for their own photos.
  - The window is 34 rem wide.
  - Checked at 1440 and 390: thumbnails 0 px when not chosen, 70 px when chosen, no console errors.
- "annuler": the option photos are reverted (commit reverted), so the colour window is back to names, prices and the "Choisi" pill, with no images.
- "annule pas": the option photos are back exactly as before the undo (files restored from that commit). Teinture couleur and Mèches have their own photos, and the other three show the service photo until the owner sends theirs.
- "150 $ à 400 $ varie selon la longueur et quantité. je veux le tableau plus grand je veux bien voir les photos": prices now read "150 $ à 400 $, varie selon la longueur et la quantité" (peroxyde: "150 $ et plus, selon la longueur et la quantité"). The window is 46 rem wide; a chosen option's photo is 8 x 10 rem on a computer and the full width of its row (4:3) on a phone, above the name. Unchosen rows stay compact. Checked at 1440 and 390.
- Prices: cellophane and peroxyde are now "150 $ à 400 $, varie selon la longueur et la quantité" like the others; the Teinture card reads "À partir de 150 $".
- Permanente options, "fait pareil comme la teinture": OPTIONS.permanente with Permanente bouclée, ondulation souple, spirale and classique (the owner's fourth item was just "permanente"; named "classique" to tell it apart), all at 150 $ à 400 $, varie selon la longueur et la quantité. Card says "À partir de 150 $" and "Voir les options"; form photo opens the same window; photo fallback is the permanente photo. Tested: four options, choosing spirale ticks the form and shows under Permanente, Teinture still shows its five.
- "quand je sélectionne une option la photo apparaît en grand à côté": the small in-row thumbnails are replaced by one large photo (.opts__ph, 4:5, rounded, name tag) beside the list. It appears only once an option is chosen (:has), the window widening to 64 rem; on phones it sits above the list at 4:3. It shows the option just chosen, or another still chosen when one is unticked, fading in. The close button sits above it on a cream disc. Checked at 1440 and 390.
- "je ne veux pas le bouton choisir": the Choisir/Choisi pill is gone from the option rows; a chosen row shows by its brown double border and tinted background, and its large photo.
- Option photo: "Permanente bouclée" gets the owner's photo (long brown spiral curls from the back), cropped to 4:5 as opt-perm-bouclee.webp (600x750).
- Option photo: "Permanente ondulation souple" gets the owner's photo (soft light-brown waves, from the side), cropped to 4:5 as opt-perm-souple.webp.
- "je ne veux pas que les gens prennent plein de choix en même temps": options are now one at a time. Choosing an option clears the others (checkboxes kept, so tapping the chosen one again clears it and the button reads Retirer). The hint reads "Choisis une option."
- "efface l'option permanente spirale, classique": Permanente now has two options, bouclée and ondulation souple, both with the owner's photos.
- Sixth service "Botox capillaire" ("ajoute un cadre de botox capillaire"), with the owner's photo (black mid-length straight hair on a red top; 1200x1600, botox.webp and botox-m.webp). Rail card after Shampoing traitant ("Un soin qui gaine et répare la fibre, pour des cheveux lisses, brillants et doux, sans frisottis.", Prix sur devis), a sixth form option, SERVICES.botox. The form grid is now three across (max 52rem), two on phones, so six photos make two even rows.
- Owner photo frame, "comme ça sans le message à côté" (reference: a rounded photo with a wide soft shadow and a caption pill, the pill not wanted). The thin gold outline and 3px corners are gone. The frame is now a 2rem-rounded rectangle with a wide, light brown shadow. The scroll reveal (data-sc-reveal, which animates clip-path and so cut the shadow) becomes a plain fade-in (data-sc-in), and the <picture> fills the frame, removing a light strip at its foot. No caption added. Checked at 1440 and 390.
- "mettre la section soins dans la barre d'onglets" and "quand je passe la souris sur les produits, que ça soulève et lumineux".
  - A sixth menu link "Soins" (#produits), tracked by the scroll spy.
  - To fit six links beside the centred logo: the compact link padding now applies up to 1720 px, and the Menu button takes over below 1500 px (was 1350). Checked at 1500, 1501, 1560, 1640, 1720, 1721 and 1920: links never reach the logo.
  - Product cards on a mouse hover: the frame rises 12 px and grows 2 %, gains a warm golden glow ring, and the photo brightens. Hover-capable pointers only; no lift under reduced motion.
- New hero image, "mets cette image comme nouvelle page d'accueil": a 1920x1080 photo of long straight black hair from the back in a beige salon, with empty wall on the left. accueil.webp (full) and accueil-m.webp (a 670x1080 crop on the woman for phones) replace salon.webp and salon-m.webp, which are deleted. object-position 72% 40% keeps her in frame on narrower screens. Still no text on the hero. Checked at 1440, 713 and 390.
- Hero again: "utilise cette photo… rends-la sombre comme la deuxième photo" (a stock-looking portrait of a woman with long flowing brown hair; reference: a dark muted photo with a large title on the left), then "le logo… à côté".
  - accueil.webp is now that photo, only 626x351, so it is soft at full width (README asks for a larger file and to check the rights). The phone crop file is dropped: the same image is framed at 82 % on phones.
  - Darkened in CSS (brightness .62, saturate .55, contrast 1.05) under a grey-green veil (rgb 28 32 28 / .42).
  - The logo (logo-m.webp) sits large on the empty left, clamp(15rem, 30vw, 30rem), with a drop shadow; on phones it is centred near the bottom.
  - Checked at 1440, 713 and 390.
- "je veux des espaces comme ça dans chaque catégorie, du blanc entre" (reference: cream bands parted by white). The body is now white, and every section after the first gets a top margin of clamp(1.25rem, 3vw, 2.75rem): 43 px at 1440, 20 px at 390. The pinned services rail still works; no overflow, no console errors.
- "je veux que le mot « choisir » soit visible, éloigné de la craque blanche": in the services rail the lowest Choisir pill touched or went under the stage foot (and so the new white band). Fixes:
  - Card width now subtracts 29rem (desktop) and 27rem (phone) from the viewport height, with a 10rem floor.
  - The stage has bottom padding.
  - Under 740 px of height, the card text is tighter (smaller name and description, no rule above the price).
  - Measured gap between the lowest pill and the stage foot: 45 px at 1440x900, 28 at 1440x760, 72 at 1280x720, 91 at 1920x1080, 17 at 1024x768, 34 at 390x844, 33 at 375x667.
- "je veux que les cadres soient gros et visibles": service cards grow. Width is clamp(12rem, min(27vw, (100svh - bar - 19.5rem) * .8), 25rem) on desktop and max(12rem, min(78vw, (100svh - bar - 21rem) * .88)) on phones; photos are 4:5 everywhere. To make room, the card text is compact: smaller description, no rule above the price, and tighter still under 800 px of height. At 1440x900 the photos went from about 250 to 390 px wide. Button-to-band gap stays 23 to 106 px across seven screen sizes.
- "je veux que le cadre d'accueil ait cette forme" (reference: a dark hero framed as a rounded card, crossed by a thin light grid). The hero is now inset from the page edges (clamp(.5rem, 1.2vw, 1rem)) with corners of clamp(1.5rem, 3vw, 2.75rem) on a white page. A fine grid of 13 % cream lines (8 x 4 on desktop, 4 x 6 on phones) is drawn by .hero::after. The beige fade at the foot is removed so the card stays dark to its edge. Logo and photo unchanged. Checked at 1440, 713 and 390.
- "je veux que le fond de toutes les sections soit la même couleur que la photo" (the services rail's beige). Every section except the dark welcome card now uses the services background, radial-gradient(70% 80% at 22% 38%, #e3cfb5, #d3ba9c 72%). This covers before/after, products, TikTok, owner, how-it-works and the form. The deposit box, which was --slate (now the same beige), gets #c9ad8b to stay distinct. White bands between sections stay. Checked every section at 1440; no console errors.
- "la page d'accueil ait la couleur aussi derrière": the page background is now beige (#dbc3a6), so the margin around the welcome card is beige rather than white. The white bands between sections, which showed the white body through a top margin, are now a white top border on every section after the first (same width). Checked at 1440, 713 and 390; no overflow, no console errors.
- "enlève la couleur sombre dans le cadre de la section accueil": the dark treatment is removed. No brightness or saturate filter, and no grey-green veil. The card fill behind the photo is beige (#c9a98a). The grid lines become a light cream (30 %) so they still read on the bright photo. Photo, logo and frame shape unchanged.
- "réajuste le cadre de l'accueil, rends-le moins grand" (asked: 3/4 height, more margin, same on phones).
  - The welcome card now starts just below the menu.
  - Height is about three quarters of the screen: min-height calc(75svh - bar).
  - Side margins are clamp(1rem, 5vw, 5rem) (.75rem on phones), with lighter inner padding.
  - Services gets a little beige space above its white band.
  - Checked at 1440, 713 and 390: no overflow, no console errors.
- "la photo est trop zoomée dans le cadre, elle est floue" and "enlève aussi les lignes".
  - The photo is only 626x351, so the card now takes the photo's own ratio (aspect-ratio 626/351) at most 60rem wide and centred. At 1440 that is about 960 px, versus the full-width, cropped cover before.
  - Phones keep a cover crop at 52svh.
  - The grid lines are removed. So is the hero parallax, which left a sliver above the photo.
  - The logo is a little smaller to suit the card.
  - A bigger source photo is still the real fix for sharpness (README).
- "sur la barre d'onglets mets le logo à gauche et ajoute les sections qui se retrouvent sur la page".
  - The logo leaves the centre of the pill and sits on the left (static, in the flow).
  - The links follow it: Accueil, Services, Avant / Après, Soins, Tendances (new, #boucles, added to the scroll spy), La propriétaire and Comment ça marche, with the CTA on the right.
  - With the logo out of the middle, everything fits on one line down to 1241 px. The Menu button now takes over at 1240 px and below (was 1500). Link size and padding scale with the width.
  - Checked at 1241, 1300, 1366, 1440, 1600 and 1920 (no overlap, nothing outside the pill), and at 1240 and 390 (Menu button).
- "enlève le logo dans la fenêtre d'accueil": the large logo on the welcome photo is removed; the logo stays in the menu bar. The .hero__logo rules are left unused-harmless. Checked at 1440 and 390.
- "je veux que la section « soumission avant les ciseaux » ait ce modèle" (a screen recording: a big pale number that rolls 01 → 02 → 03 while the step label, title and text change as you scroll).
  - #comment is now a pinned act (data-sc-act="pin", span 2.6) with a sticky .how__stage.
  - Left: the label and title. Right: a large pale "0" with a rolling digit column (.how__roll, translateY by --k em), then "Étape — 0N", the step title and text.
  - salon.js reads the act's --sc-p each frame and shows step floor(p * 3): it sets --k and toggles .is-on. Hidden steps are visibility:hidden.
  - On phones the number sits under the title. No motion under reduced motion; the steps still change.
  - Tested at 1440 and 390 at 10, 50 and 90 % of the act: steps 1, 2, 3 in order, the stage stuck at the top, no console warnings or errors. The Interac address still shows in step 3.
- "dans les étapes je veux que ce soit le client qui les fasse défiler lui-même, pas automatiquement".
  - #comment is back to a plain flow act (no pin, no scroll-driven step).
  - Under the step: a ← button, three dots and a → button. A swipe on the steps (40 px) or the arrow keys inside them also changes the step. The big number still rolls to the step shown.
  - The buttons disable at the ends, and each change is announced to screen readers.
  - Tested at 1440 and on an iPhone 13: scrolling leaves the step alone; →, → reach step 3 (→ then disabled); ← goes back; no console errors.
- "je veux que ça défile automatiquement" (after asking for reader control): the steps now autoplay, not tied to scrolling. Every 4.5 s, while at least half of the steps box is on screen and the tab is visible, the step advances and loops 3 → 1. The arrows wrap around too and are never disabled. An arrow, swipe or key pauses the autoplay for 9 s. No autoplay under reduced motion. Tested: 1 → 2 → 3 → 1 → 2 on its own; after ←, the step held for 5 s; no console errors.
- "je veux que les étapes défilent automatiquement quand on scrolle": back to scroll-driven steps. #comment is pinned again, with a shorter span (2.2, was 2.6) so it holds less long; the act's progress picks the step. The autoplay timer and the arrows are removed. The three dots stay as a progress indicator, following the step. Tested at 1440 and 390 at 10, 50 and 90 %: steps 1, 2, 3; no console warnings.
- "dans la section avant/après je veux que les boutons soient centrés": the Silk press / Blond lumineux tabs and the request button are centred in the text column (justify-self: center); the label and title stay left-aligned. Checked at 1440 and on an iPhone 13.
- "sur le téléphone je veux que le bouton soumission soit en bas du cadre de glissement": a second CTA (.ba__cta-m) after the compare frame shows only at 760 px and below, centred under the "Glisse pour comparer" hint; the one in the header hides there. Desktop unchanged. Checked at 1440 and on an iPhone 13.
- "sous les numéros qui roulent, enlève « étape 1, 2 et 3 »": the "Étape — 0N" tags are removed; the rolling number is followed directly by the step title.
- "Enlève" (screenshot of the hours hint above the calendar): the line "Le salon est ouvert du mercredi au vendredi, de 9 h 30 à 16 h 30. Choisis le jour, puis l'heure…" is removed. The hours remain in the footer, and the calendar only offers Wednesday to Friday.
- "je veux que la page soit facile à lire pour le client, pas de texte de trop ni inutile". A pass over every visible line:
  - Services: each description cut to one short line (Silk press "Lisses, brillants et pleins de mouvement."; Permanente "Des boucles définies qui tiennent."; Teinture "Une couleur éclatante et brillante."; Kératine "Fini les frisottis, cheveux faciles à coiffer."; Shampoing traitant "Cuir chevelu apaisé, cheveux doux."; Botox "Cheveux réparés, lisses et brillants.").
  - Products: the lead and the price note go; each product gets a few words.
  - TikTok: the @handle tags on both phones go (the TikTok button keeps it).
  - Owner: the bio is one line; the Expérience and Textures facts (repeats of the bio) and "La devise du salon" go; the specialities are shortened.
  - How it works: one short line per step.
  - Deposit: four bullets become two; the checkbox reads "J'accepte la règle du dépôt." The done panel is shorter. The deposit line in the footer goes (already in the form).
  - Kept: prices, address, phone, hours, the Interac address, the photo hint, and the calendar legend.
- Products cascade (asked: models offered, owner chose "Montée en cascade" with "Montée et fondu"). salon.js puts .is-cascade on .prods and observes each .prod (threshold .2, bottom margin -8 %). Products entering together get staggered delays (140 ms apart, top-to-bottom then left-to-right), then rise 2.5rem and fade in over 700 ms. No effect under reduced motion or without the script. The old data-sc-in on the wrapper is removed so the two don't fight. Tested at 1440 and on an iPhone 13: hidden before, the first row in first, all six visible at the end; no errors.
- "je veux que le produit se soulève et brille sur le téléphone quand on passe le doigt": on touch, salon.js adds .is-lit to the touched product (and removes it from any other), and removes it 900 ms after the finger lifts. .is-lit uses the same lift, glow and brighten as the desktop hover. No lift under reduced motion. Tested on an iPhone 13 with a synthetic touch: lit on touchstart (transform translateY -12 px, scale 1.02), back to normal after release.
- "quand le téléphone est en paysage, je veux que la page s'ajuste pareil qu'à la verticale".
  - Every phone media query became `(max-width: 760px), (max-height: 500px) and (orientation: landscape)`, so a sideways phone gets the phone layout. The same query is used for the phone video choice in salon.js.
  - A landscape-only block keeps the content in a phone-wide column: .sc-wrap max 34rem, and the hero card at 27rem in the photo's ratio so it fits under the bar.
  - It also tames the type sized in vw: the TikTok title and the big step number.
  - The how-it-works stage goes two columns (title | number and step), so the pinned stage fits in about 340 px of height. The owner photo is capped at 20rem and the phone mockups shrink.
  - Checked every section on an iPhone 13 in landscape (750x342): no overflow, no errors. Portrait is unchanged.
- Landscape, "le cadre avant/après comme à la verticale, et les prix des services visibles".
  - The compare frame's width came from the viewport height, so it was about 108 px wide in landscape. It now uses min(100%, 21rem): 336 px, as when the phone is upright. The reader scrolls past it as in portrait.
  - Service cards lie on their side in landscape: an 8rem photo (4:5) on the left; name, description, price and button on the right; card width 23rem. The price and button now sit inside the pinned stage: the lowest button is at least 5 px above the screen foot across the whole pan.
  - Checked on an iPhone 13 in landscape. Portrait is unchanged.
- "Annuler": the height-fitted landscape compare frame is reverted; it is back to min(100%, 21rem), the upright size.
- Section titles (asked: models offered; owner chose "Lettres floues qui s'éclaircissent", once). Every main h2.disp starts faint, blurred 14 px and at 106 %, and comes into focus once when it reaches the screen (IntersectionObserver, threshold .35, unobserved after). The transition is 0.9 to 1.1 s. Centred titles scale from their centre. The class title-focus on <html> is added only by the script and only without reduced motion, so titles show normally otherwise. Tested at 1440 and on an iPhone 13: all seven titles hidden on load, all sharp after a full scroll, no errors.
- "je veux que quand on retourne vers la section le flou revienne, sauf quand on revient vers le début de la page".
  - The titles' observer no longer unobserves. A title sharpens at 35 % visible.
  - When a title leaves through the bottom edge (the reader scrolled back up past it), it blurs again, so the effect replays on the next way down. When it leaves through the top (scrolled down past), it stays sharp, so scrolling up shows sharp titles.
  - Tested: sharp going down, stays sharp after passing and on the way back up onto it, resets once above it, sharp again going down.
- "je veux que le contraste des contours des cadres soit plus net".
  - Every rounded photo frame gets an ::after overlay (inherit radius) with a 1.5 px dark-brown inner line (rgb 47 30 12 / .55) and a faint cream line inside it. This covers service cards, product cards, form photos, the owner photo, the before/after frame, the option photo and the welcome card.
  - A tight 2-3 px contact drop-shadow under the frames makes their edges read clearly on the beige; the soft wide shadows stay.
  - Checked at 1440; no console errors.
- "Plus sharp": the frame line is now a solid 2 px near-black brown (rgb 38 22 6 / .92), with no cream inner line, and the contact shadow gains a crisp 1 px dark edge under a 3-4 px shadow.
- "je veux que les contours soient comme ça" (a screenshot of the first, softer edge): back to the 1.5 px brown line at .55 with the faint cream inner line and the 2-3 px contact shadow.
- "je veux qu'il soit centré quand on scrolle vers le bas sur téléphone" (the rail's closing "Pas sûre de ce qu'il te faut ?" block, which ended off to the left).
  - Centring it inside the pan proved unreliable. The engine's travel is scrollWidth - vw plus a 4 % overshoot, and any visual shift of the block widens scrollWidth, so a measured correction diverges. That attempt is removed.
  - On phones (portrait and landscape) .rail__end is now hidden, and a phone-only <section class="unsure"> right after #services shows the same title and CTA, centred, in its own beige band between white bands. It is hidden on desktop.
  - Checked: centred on iPhone 13, iPhone SE, Pixel 7 and iPhone 13 landscape (equal left/right gaps); hidden at 1440; no overflow or errors.
- "Enlève cette section" (the phone-only "Pas sûre…" band): removed. On phones the services row now ends on Botox capillaire with no closing block; desktop keeps .rail__end at the end of the rail.
- "Les services en bas de la page, enlève : je ne veux pas que ça se répète deux fois. Quand le client choisit un service, ça l'emmène à la section des étapes."
  - The form's service photos are hidden: the fieldset is kept with the hidden attribute (and a fieldset[hidden] display:none rule), so its checkboxes still record the choice for the email.
  - In their place, a line [data-chosen]: "Tes services : Silk press, Teinture (Balayage). Modifier", or "Aucun service choisi. Choisir un service", linking to #services. render() keeps it in sync.
  - add() calls goSteps(): 750 ms after the flying photo (instant under reduced motion), the page scrolls smoothly to #comment. This also works after confirming a Teinture or Permanente option.
  - Tested at 1440 and on an iPhone 13: a click on Silk press lands on the steps (the section top about 100 px from the viewport top); the form line reads "Tes services : Silk press."; the email still carries "Services=Silk press"; no errors.
- "je veux que la photo apparaisse dans le cadre" (the form's "Tes services" box): it now lists each chosen service as a rounded 4.5x5.6rem photo with a fine edge, the name in caps, and the chosen option under it. The photo is the option's own when it has one (e.g. Permanente bouclée), else the service's. "Modifier" follows. Tested on an iPhone 13 with Permanente bouclée + Kératine; no errors.
- "Enlève « Demande de soumission »": the small label above "Dis-nous ce que tu veux." is removed.
- Bug: "quand je scrolle du 1 vers le 3, il ne me laisse pas lire le 2, ça va directement au 3".
  - The pinned span was short (2.2 viewports), so a flick jumped from step 1 to 3.
  - Now the span is 3.2. The frame code moves the shown step only one at a time toward the scroll position, and keeps each step at least 900 ms (HOW_HOLD), so step 2 always shows, even after a jump to the end.
  - Tested with a one-shot jump from step 1 to 95 % of the act at 1440 and on an iPhone 13: Ta demande > Notre réponse > Ton dépôt. Normal scrolling still gives 1, 2, 3 at 10, 50 and 90 %.
- "Enlève" ("Choisis d'abord un jour." above the time slots): the slots title is empty, and hidden, until a day is chosen; then it shows the day as before.
- "je veux que les phrases des étapes soient plus visibles": step sentences are now clamp(1.2rem, 1rem + .8vw, 1.6rem), weight 500, full ink colour (--on-porc), line-height 1.45, max 30ch (1.05rem in landscape phones). Checked at 1440 and 390.
- "quand le client modifie le service, je ne veux pas que ça le mène en haut" (asked: owner chose "Fenêtre sur place").
  - The form's "Modifier" / "Choisir un service" link now opens a services window (<dialog class="opts svcs">) instead of jumping to #services. It lists all six services as photo + name + state (Choisi, the chosen option, Voir les options, Ajouter); a tap adds or removes, and Teinture and Permanente open their options window on top.
  - While it is open, stayPut stops goSteps() from scrolling to the steps.
  - On close, the scroll position from before opening is restored, so scroll anchoring does not shift the page as the summary grows. Focus returns to the link.
  - Tested at 1440 and on an iPhone 13: add Silk press, add Teinture > Balayage, Terminé; scrollY identical before and after; the summary reads Silk press + Teinture (Balayage); no errors. Choosing from the services row still goes to the steps.
- Services window fixes from the owner's phone.
  - "Silk press is outlined though I didn't pick it": showModal focused the first tile, and its focus ring looked like the chosen border. Focus now goes to the window title (tabindex -1, no outline), and a tile's keyboard ring is dashed, so it can't be mistaken for a choice.
  - "Text should fit the frame": names overflowed two narrow columns on large phones. Tiles stack in one column up to 520 px, the text block has min-width 0 with overflow-wrap and hyphens, and the name size is clamped.
  - Checked on iPhone 14 Pro Max and iPhone 13: focus on the title, no tile overflowing.
- "quand le client scrolle, le dernier cadre doit rester fixé au centre, pas continuer complètement à gauche".
  - The rail's pan overshoot is set to 0 in the markup (data-sc-pan="0", was 0.04). That overshoot is what carried the last item past centre; the engine itself is untouched.
  - On phones the rail gets --cw (the card width) and padding-right: max(gutter, (100vw - --cw) / 2), so the travel ends with the last card (Botox capillaire) centred.
  - Measured left/right gaps at the end: iPhone 14 Pro Max 75/78, iPhone 13 89/90, iPhone SE 64/64, Pixel 7 45/48. Desktop still ends on the "Pas sûre…" block at the gutter.

## Défilement doux (comme le site immersif)
- À la molette, la page ne saute plus : elle glisse vers sa cible avec un léger
  amorti (lerp 0,09 par image), comme le site immersif.
- Les liens du menu et le passage automatique vers « Comment ça marche » font
  un long glissé adouci (1 à 1,7 s selon la distance).
- Le défilement reste celui du navigateur : les sections épinglées (services,
  étapes) marchent comme avant. Au doigt, le téléphone garde son élan naturel ;
  « réduire les animations » garde des sauts simples.
- Les touches de défilement glissent aussi : flèches haut/bas, Espace
  (Maj+Espace pour remonter), Page suivante/précédente, Début et Fin. Dans
  le formulaire, les touches gardent leur rôle normal (taper une espace, etc.).

## Titre des étapes
- Petit libellé « Comment ça marche » retiré de la section ; le titre devient
  « *Avant* les ciseaux. » (l'onglet du menu garde « Comment ça marche »).

## Le formulaire attend derrière les étapes
- « Dis-nous ce que tu veux » est placé DERRIÈRE « Avant les ciseaux » (marge
  négative de 100svh, z-index plus bas, plus de bande blanche).
- Les 3 étapes occupent les trois premiers quarts du défilement épinglé
  (span 3,8) ; ensuite un fondu doux en deux temps (0,8 → 1) : les étapes
  s'effacent (--fade), puis leur fond s'éclaircit (--clear) et le formulaire
  apparaît dessous, sans jamais deux textes l'un sur l'autre.
- « Réduire les animations » : pas de fondu, la page reste comme avant.
- Correctifs du fondu : le formulaire commence 56vh plus haut (--fade-run) pour
  que son fond remplisse déjà l'écran pendant le fondu (plus de bande en haut) ;
  « Demander une soumission » atterrit à la fin du fondu (scroll-margin
  négatif) ; l'onglet du menu et la pastille suivent le titre et le formulaire
  plutôt que le haut de la section.
- Correctif : la boîte de la section des étapes recouvrait le haut du
  formulaire et bloquait les clics (impossible d'écrire dans « Tes cheveux »).
  La section laisse maintenant passer les clics (pointer-events: none) ; seules
  les étapes visibles les attrapent.

## Lignes de « Spécialités » et « Le salon »
- Les trois lignes de la fiche de Mercedes se dessinent de gauche à droite, une
  après l'autre (0 / 0,45 / 0,9 s), et le texte sous chaque ligne apparaît
  ensuite, chaque fois qu'on redescend vers la liste. Comme les titres : remise
  à zéro seulement quand elle sort par le bas de l'écran (on remonte la page) ;
  en remontant vers le haut, elle reste tracée. Lignes en
  pseudo-éléments (scaleX) ; cachées sans transition, seul le dessin s'anime.
- « Réduire les animations » : lignes et texte affichés tout de suite.

## Permanente lissage
- Nouvelle option dans la fenêtre de la permanente : « Permanente lissage »,
  150 $ à 400 $ (varie selon la longueur et la quantité), photo
  assets/opt-perm-lissage.webp (photo fournie par la propriétaire, recadrée 4:5).

## Prix des services
- Silk press, kératine, shampoing traitant et botox capillaire : « 150 $ à
  400 $ » (au lieu de « Prix sur devis »). Le prix reste sur une ligne, sauf en
  téléphone couché où il passe sur deux lignes si besoin.
- Correctif téléphone couché : la règle de largeur des cartes pour téléphone
  debout (--cw, centrage de la dernière carte) écrasait aussi les cartes
  couchées à 12rem ; la photo suivante cachait le texte et le prix. En
  téléphone couché, --cw vaut de nouveau 23rem.
- Changement : les six cartes affichent « À partir de 150 $ » (au lieu de
  « 150 $ à 400 $ » sur silk press, kératine, shampoing et botox).

## Arrivée pile sur « Avant les ciseaux »
- Après le choix d'un service (et avec l'onglet « Comment ça marche »), la page
  glissait un peu trop bas : elle tenait compte de la marge du menu et de la
  bande blanche. Pour une section épinglée, la cible est maintenant le haut de
  la section après sa bande blanche : les étapes remplissent l'écran, en face.

## Bouton « Rendez-vous »
- Les cinq boutons « Demander une soumission » (barre du menu, services,
  avant/après, fiche de Mercedes) s'appellent maintenant « Rendez-vous ». Ils
  mènent toujours au formulaire.

## Noms des services en italique doré
- Dans le résumé du formulaire (photo + nom) et dans la fenêtre « Modifier »,
  le nom du service prend la même typographie que sur les cartes : capitales
  en italique (--font-italic), couleur or.

## Nouvelle photo d'accueil
- assets/accueil.webp remplacée par l'affiche du salon (1366 × 768, avec son
  propre texte). Le cadre prend la forme 1366/768 partout, y compris sur
  téléphone (plus de recadrage en hauteur : le texte de l'affiche doit rester
  entier). Texte alternatif reprenant les mots de l'affiche.

## Onglets du menu : arrivée en face
- Les sections épinglées (Services, Comment ça marche) : la page s'arrête pile
  sur le haut de la section, après sa bande blanche.
- Les autres sections : la page cadre le contenu de la section (ce que couvrent
  ses enfants, sans la bande blanche ni la marge vide) sous la barre du menu :
  centré quand il tient dans l'écran (Avant/Après, La propriétaire), sinon
  commencé juste sous la barre (Soins, Tendances).
- Correctif : en centrant une section, la page pouvait s'arrêter avant la fin
  de sa bande blanche, visible en haut autour du menu. La cible ne remonte
  jamais au-dessus du bas de cette bande.

## Menu en italique brun
- Onglets du menu : capitales italiques (Cormorant Garamond, 600) comme les
  noms des services, couleur brun du bouton Rendez-vous (--gold-deep), un peu
  plus grands sur ordinateur. Aussi dans le menu du téléphone.
- Boutons « Rendez-vous » (a.cta vers #soumission) : même écriture que le menu,
  capitales italiques Cormorant Garamond, texte crème sur le brun.
- Bouton « Envoyer ma demande » : même écriture que les boutons Rendez-vous.

## Bande de bienvenue
- Bande fixe tout en haut (.ann, fond brun --gold-deep, texte blanc en
  italique) : « Salon de coiffure Mechi vous souhaite la bienvenue ! ».
  Hauteur --ann-h (2,25rem) ; la barre du menu descend d'autant et --bar-h
  l'inclut, donc toutes les sections laissent la place automatiquement.
