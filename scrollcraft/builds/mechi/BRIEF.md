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

## Assets

The client's own salon photos: lissage (black bob), coupe et frange (dark bob
with curtain bangs), couleur cuivrée, brushing (long brown layers). Faces
reflected in mirrors are blurred. A fifth photo (long wavy hair in the chair)
was a "before" and is no longer used. Four more before/after photos showed in
the conversation but never reached the disk; they are not needed now.

## Shape (client-directed)

Like the Nitsy Fashion film site, at the client's request:

`flow(hero, two photos on parallax) > pan(services rail) > flow(three steps) >
pin(the deposit) > flow(request form)`, 5 acts, about 11 viewport-heights.

| Beat | Device | Why |
|---|---|---|
| Recognition | `flow` + `parallax` | The name at poster scale and two real results at two depths |
| Choice | `pan`, cards are buttons | As on Nitsy: the page holds and the services slide in; a click chooses one |
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
  *Ce que tu aimerais*, optional inspiration photo, two dates and a time of
  day, name, phone, email.
- The salon replies with the advised service, duration, price and time; the
  client then sends 20 $ by Interac to confirm, and must tick that she accepts
  the deposit rule.
- `FORM_ENDPOINT` and `INTERAC_EMAIL` at the top of `salon.js` are empty until
  the salon provides them; the page says so plainly instead of pretending.

## Unknown, so not stated

Address, phone, opening hours, prices ("Prix sur devis" on every card), team.

## Verification (4 November 2026)

`shoot.mjs` at 1440x900 and 390x844: no dead scroll, every cue clears 4.5:1,
no console errors. Rail travel measured (941 px desktop, 1486 px phone).
Functional test, desktop and phone: choosing from the rail and from the form
cards, pill count, unchoosing, form validation, the not-connected message.
Not verified: a real phone, a real form endpoint.
