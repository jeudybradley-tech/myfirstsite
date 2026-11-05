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
