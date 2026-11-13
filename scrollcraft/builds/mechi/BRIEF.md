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
