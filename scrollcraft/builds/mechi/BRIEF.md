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

- Owner: "est-ce que tu penses une biographie de la propriétaire serait bon ?", placed "juste après la section de vidéo". Section `#proprietaire` (photo, name, three or four sentences, facts: experience, training, specialties, languages, one quote), with a menu tab "La propriétaire". Built with visibly marked `[data-todo]` slots until her real details arrive; nothing about her is invented. The deploy workflow fails while any `data-todo` remains. The menu switches to its Menu button below 1240 px so the extra tab never wraps.

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

`flow(hero, logo and two photos on parallax) > pan(services rail) > flow(avant / après) > scrub(curls clip) > flow(the owner) > flow(three steps) >
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
- `FORM_ENDPOINT` and `INTERAC_EMAIL` at the top of `salon.js` are empty until
  the salon provides them; the page says so plainly instead of pretending.

## Unknown, so not stated

Address, phone, prices ("Prix sur devis" on every card), team.

## Verification (4 November 2026)

`shoot.mjs` at 1440x900 and 390x844: no dead scroll, every cue clears 4.5:1,
no console errors. Rail travel measured (941 px desktop, 1486 px phone).
Functional test, desktop and phone: choosing from the rail and from the form
cards, pill count, unchoosing, form validation, the not-connected message.
Not verified: a real phone, a real form endpoint.
