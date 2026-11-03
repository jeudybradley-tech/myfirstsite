# MECHI, avant / après : brief

**Self-authored under explicit creative delegation.** On 3 November 2026 the
client answered "À toi de voir" to the question on style and journey, gave the
business rules below in their own words, and supplied photos. Everything not
quoted is an authored decision and is marked as such.

## What the client said (verbatim)

- "je veux que tu me créer un site de salon coiffure comme nitsy fashion." (a reference to the earlier build, not this salon's name)
- "la propriétaire veut régler la problèmatique du dépôt. elle veut lorsqu'un
  client réserver un rendez-vous qu'elle fasse un dépôt de 20$ pour permettre de
  forcer le client à se pointer à le rendez-vous."
- "la propriétaire veut avoir sur le site une section où que le client
  pourrrait faire une demande de soumission lors de la prise de rendez-vous.
  ceux la veut dire le client écrit dans la soumission le problème, le service
  ou la coupe qu'elle veut en générale le type de service que le client veut."
- Deposit method: **Virement Interac**. Deposit rule: **déduit du prix, perdu
  si la cliente ne vient pas ou annule moins de 24 h avant.**
- Name, given mid-build: "le nom de la compagnie est salon de coiffure Meechi", corrected to "Salon de coiffure Mechi". Wordmark **Mechi**, full name in the `<h1>`, title and footer.
- Photos: five salon results ("est-ce que ces photo tu pourrait utiliser comme
  service"), then "voici les avant et après" (a grey, frizzy before and a
  blonde, layered after, back and profile views). **Those four before/after
  photos showed in the conversation but never reached the disk, so they are not
  on the page yet.** The hero uses the closest real pair among the five that
  did arrive: long wavy hair in the chair (avant) and the finished layered
  blow-dry (après). Swap in `assets/avant.webp` and `assets/apres.webp` (3:4,
  1200x1600) when the files come through.

## The eight topics

1. **Vibe** (authored): bright salon, glass shelves lit turquoise, hair that
   catches light. Three to five words: *lumineux, net, avant/après, rassurant*.
   References: a fashion-magazine before/after spread; the lit shelf in the
   client's own photos.
2. **Journey** (authored from the client's two requirements): see your hair as
   it is, see what it can be, see what the salon does for each problem, learn
   how the request and the deposit work, send the request.
3. **Energy**: calm hero, lively services, quiet how-it-works, the peak at the
   deposit, calm form.
4. **Feeling and the one moment**: below.
5. **What no other site does** (authored): your request fills up on the line
   between before and after while you read, and that same line sweeps across
   to become your appointment.
6. **Range**: premium, editorial leaning (fashion-magazine Didone), light and
   dark held side by side. Not the plum night of the first Nitsy site.
7. **One world or scenes**: neither. Two sides held in tension the whole way:
   the **Split stage** grammar.
8. **Assets**: the client's own photos. Nothing generated, no kie.ai spend.
   Faces reflected in mirrors are blurred. Product brands visible on shelves
   (Moroccanoil, Greenlife) are the salon's real stock and stay.

## Step 1

- **What and for whom**: a hair salon; clients who want a specific result and
  need to know the price and the time before they come.
- **Belief at the end**: "Je sais ce que je vais avoir, et ma place est gardée."
- **Action**: one label everywhere, **Demander une soumission**. The form's
  own submit button says *Envoyer ma demande*.
- **Language**: French, *tu*, as on the first Nitsy site.

## Grammar: Split stage

The comparison is the product: avant on the left on a slate ground, après on
the right on a porcelain ground, both carrying real content to the end. The
divider is the chrome: it carries the labels *Avant* and *Après* and the
client's growing request. The close is the collapse: in the deposit act the
divider travels to the left edge, the après side takes the full width, and the
form lives on that winning side.

Why the other seven lost: *filmic one-shot* is taken four times and the
material is stills; *chaptered editorial* would bury the form; *live surface*
is for software; *continuous world* needs travel through a place; *typographic
poster* was the first Nitsy build and these photos deserve to be seen; a
*gallery* has no argument, and this page has one (with a deposit, you come);
a *cutlist* is the wrong speed for a reassuring booking.

Bans held: no `pan`, no `spotlight`, no `magnet`, no `scrub`, no `drift`
(two grounds, one per side, each holds). No full-bleed anything before the
collapse, no centred copy, no symmetric close.

## Signature move: la soumission sur la ligne

Every service pair has *Ajouter à ma soumission*. Pressing it flies the
service's photo onto the divider, where it sits as a small round chip, like a
clip on a parting. The chips ride the line down the page. In the deposit act
the line sweeps to the left edge with the chips on it, and in the form those
services are already ticked. Unticking in the form takes the chip off the line.

## Feeling curve

| Act | Feeling | What causes it |
|---|---|---|
| 1 Hero (flow) | Recognition | Your hair as it is on the left, what it could be on the right, the salon's name cut by the line between them |
| 2 Services (pin) | Desire | Each problem in the client's own words on the left, answered on the right by a real result that wipes in over the last |
| 3 How it works (flow) | Calm | Two quiet columns: what you do, what the salon does. Small type, no motion but the entrance |
| 4 Deposit (pin, peak) | Relief, then commitment | *Sans dépôt* against *Avec 20 $*, line for line; then the divider sweeps away and the whole page turns bright: "Ta chaise t'attend." |
| 5 Form (flow) | Ease | The request already holds what you picked; two fields named *Ton avant* and *Ton après* |

**Peak** (act 4): "La ligne du milieu a glissé, toute la page est devenue
claire, et ma demande était déjà remplie."

**Tell-someone**: "C'est le site où ton avant et ton après sont côte à côte, et
où la ligne entre les deux devient ton rendez-vous."

**Authored silence**: act 3 is deliberately quiet before the peak. It is not
dead scroll; its content enters as the section arrives.

## Score

| Beat | Device | Why |
|---|---|---|
| Recognition | `flow` + `parallax` | The two halves drift apart slightly in depth; the format is clear before anything moves |
| Desire | `pin` + `reveal` + cues | The frame holds while problems change on the left and answers wipe up on the right |
| Calm | `flow` + `in` | The only act that reads like a document, on purpose, right before the peak |
| Peak | `pin` + bespoke split from `--sc-p` + `kinetic` | The argument tips, then the collapse |
| Commitment | `flow` + `in` | A long form must scroll normally, never inside a pin |

`flow > pin > flow > pin > flow`, 5 acts, about 12 viewport-heights, peak act
the longest (3.6 against 3.2).

## Business rules on the page

- The request (soumission) comes first: services, *Ton avant* (the hair today
  and the problem, required), *Ton après* (what is wanted), optional
  inspiration photo, two preferred dates and a time of day, name, phone, email.
- The salon replies with the advised service, duration and price, and the
  time.
- The client then sends **20 $ by Interac** to confirm. The page states the
  rule: deducted from the bill on the day; kept if the client does not come or
  cancels less than 24 h before. The client must tick that they accept it.
- **Not connected yet**: `FORM_ENDPOINT` and `INTERAC_EMAIL` at the top of
  `salon.js` are empty. Until the endpoint is set, the form says plainly that
  nothing was sent. Until the Interac address is set, the page says the address
  comes with the salon's reply instead of showing a placeholder.

## Unknown, so not stated

Address, phone, opening hours, prices, team, Instagram. No numbers on the page
except the 20 $ and the 24 h, which are the client's.

## Verification (3 November 2026)

`shoot.mjs` at 1440x900, 390x844 and with reduced motion: no dead scroll, every
cue clears 4.5:1 at its worst frame on all three passes. Found and fixed on the
way: hero line over the après photo; display line-height inherited from body
copy; the caption panel scrolling off empty; dark-side lines that the sweep
clipped while still opaque; under reduced motion the slate layer covered both
sides (now held at half and faded by opacity). Wordmark measured against the
divider at 1440 and 1280 so the name is always cut by the line.

Functional test in the final package, desktop and phone: two services added
from the pinned act (chips on the line, "Ma soumission · 2", both ticked in the
form), unticking removes the chip, empty submit focuses *Ton avant* with its
message, missing deposit consent is caught, a complete form says plainly that
nothing was sent. No console errors.

Feel check, cold: hero *reconnaissance*, services *envie*, how-it-works
*calme*, deposit *soulagement* then the sweep, form *facile*. Matches the curve.

Not verified: a real phone, the page inside the claude.ai viewer, an actual
form endpoint, the four before/after photos (not received as files).
