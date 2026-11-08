# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| `maison-jeudy` (`maison.html`, recorded after the fact) | Filmic one-shot | Fixed minimal bar: wordmark + one CTA, top progress line | `pin` 2.2vh with three SVG parallax planes (arch, vase, cloth), lead-left kinetic `h1` on a greet cue, pointer lamp over the planes | `pin > flow > pin > pan > flow > pin`, 6 acts, ~11.2vh | `pin` 1.15vh, spotlight stage, magnet `0.26` CTA, footer inside the stage | Hero room in the dark, a lamp follows the pointer and the room lights up as you scroll | Code-drawn SVG objects, warm dark `#1A1410`, terracotta `#E0603C`, Fraunces + Inter | local |
| `alba` (`index.html`, recorded after the fact) | Filmic one-shot | Fixed minimal bar: wordmark + one CTA, top progress line, two hero-only edge rulers | `pin` 2.4vh, SVG can with parallax beans and splash, lead-left headline on a greet cue | `pin > flow > pin > pin > pan > pin`, 6 acts, ~14.6vh | `pin` 1.15vh, spotlight stage, magnet `0.26` CTA, footer inside the stage | Can rotates and scales from `--sc-p` while three callouts cue around it | Code-drawn SVG can, off-black `#07090B`, lime `#C6FF3D`, Archivo + Inter | local |
| `propagate` (`scrollcraft/builds/propagate/`) | **Turntable** (new): one object walked around, every scene a different view of it. Bans lifestyle imagery, card grids, pan rails, crossfade type acts, spotlight, magnet, CTA in the chrome | Fixed right-edge **scene index** (The tee / The warning / Exploded / Your turn), clickable, scroll-spied with an accent tick. Wordmark alone top-left. No bar, no progress line, no CTA in the chrome | Supplied render footage as a square `scrub` 2.6vh, edges masked into the ground and placed right of centre; near plane of blurred spores on parallax plus pointer; headline left, mid-height, second beat lower-left as the tee turns | `scrub > flow(reveal) > pin(bespoke canvas) > flow(pointer)`, **4 acts, ~9.4vh**, one clip, peak 4.6vh after a quiet type act | In-flow **configurator**: drag (or slider) turns the tee through supplied frames, print and size radios, a label of facts, Buy carries the selection; honest status when checkout is not connected. Footer in flow. No pin, no spotlight, no magnet | **The colour-change shatter.** The back of the tee is cut into Voronoi shards on a canvas, blasted out in depth, held in a slow drift with labels pinned to real parts of the shirt, then flown home while the print swaps green to blue shard by shard outward from the centre | Supplied 3D render footage. Void `#020202` to `#050505`, slime accent `#BFD94F`, product blue `#5AA6DC` for the swatch only. Unbounded + Geist | 4600 |
| `nitsy` (`scrollcraft/builds/nitsy/`) | Typographic poster (premium editorial variant) | Fixed wordmark only, no nav, no CTA in chrome | Name at 24vw in serif with italic second word, eyebrow, one line, CTA; braid already hanging on the right | `pin > flow > pin > flow > flow`, 5 acts, ~8vh, zero media | Contact form in flow on a lifted plum ground, honest not-connected status | **La tresse**: three strands on a fixed canvas, braided above a braid point that the scroll moves down; sweeps the full width at the peak | Code only. Plum night `#120B10`, rose `#E9A6B8`, champagne `#D9C3A5`. Instrument Serif + Geist | 4700 |
| `nitsy-film` (`scrollcraft/builds/nitsy-film/`) | Filmic one-shot (client's choice) | Fixed minimal bar: wordmark + Rendez-vous | Supplied photo as a masked tall panel, slow push-in, serif h1 left | `scrub > pan > scrub > pin > pin > flow`, 6 acts, ~17vh (grew with client requests: opening clip, turn clip, services rail) | In-flow contact form, honest not-connected status | **Le coup de peigne**: result photo revealed through widening comb-tooth stripes while the camera pulls back | Supplied studio photos on brown. Espresso `#140C09`, blush `#E7B4A3`. Instrument Serif + Inter, logo Montserrat 900 | 4800 |
| `tenebre` (`scrollcraft/builds/tenebre/`) | Filmic one-shot (argued in BRIEF.md: the client's spec is a scrubbed cinematic hero, pinned scroll reveals and one launch arc) | **Corner chrome at the bottom**: no bar, no progress line; `Join the waitlist` text link bottom-right; the wordmark docks bottom-left only after the hero's own name has gone; all chrome steps aside at the close | Supplied footage on black as a **canvas frame sequence** (73 stills, crossfaded, decoded only near the reader), pinned 4.0vh: the page opens on the whole watch and the scroll lifts the crystal, sends the parts flying, holds them, then brings them home; name gathers on the left; dust plane in front; the light goes out at the end | `scrub(sequence) > pin(scroll-lit words) > flow(photograph beside its title) > flow(three reveals) > scrub(second watch in layers) > flow(collection, cards rising with the scroll, each opening its order page) > pin(ring, then form)`, **7 acts**, plus `order.html`, peak 4.0vh in the hero | **The last pinned stage holds to the end**: a ring of 88 ticks fills under scroll, edition and price land inside it, then the dial steps aside and the waitlist form takes the frame; honest "not connected" state; footer inside the stage. No spotlight, no magnet | **The watch comes apart in your hands and comes back**: real footage of the crystal lifting and the parts flying, driven only by the scroll, with a wide stretch to hold them in the air, then reassembly. Followed later by a second watch, on a wrist, lifted apart in layers by the scroll and named layer by layer | Supplied footage of a gold skeleton watch shot on black, its backdrop mapped onto the page ground. Off-black `#0b0a09`, gold `#c9a66b`, ivory `#eee7da`. Inter Tight (thin capitals) + Cormorant Garamond italic | 4600 |
| `mechi` (`scrollcraft/builds/mechi/`) | Filmic one-shot, client-directed ("comme nitsy fashion"; a first Split stage version was removed when the client said "je veux pas l'option avant et après") | Floating frosted-glass pill menu (client's reference): the logo centered, the five tabs on its left underlined by scroll position, the CTA pill alone on the right; a Menu button below 1350px. Plus a *Ma soumission* pill bottom-right that counts picks | The salon's interior full bleed, darkened, on slow parallax, with only a kicker and the motto as h1 (logo, photos, tagline and buttons removed at the client's request) | `flow(parallax) > pan(selectable cards) > flow(drag-to-compare before/after, transformation tabs) > flow(two looping phone clips) > flow(steps) > flow(form)`, 7 acts, ~15vh | A request form in flow (calendar and times, Interac deposit consent, honest not-connected status); the pinned deposit statement was removed at the client's request | **Picks that fly into the pill**: choosing a service in the rail or the form flies its photo into *Ma soumission*; the form arrives with them ticked | Client's salon photos, mirror faces blurred. The client's logo (a black and gold plaque with gold scissors) in the hero and footer; its black `#120e09`, ivory `#f3efe8`, its gold `#c59d5a` / `#7a5a1c`. Inter Tight (thin capitals) + Cormorant Garamond italic, after the client's TIMELESS reference | 4512 |
| `golden-jb` (`scrollcraft/builds/golden-jb/`) | **Gallery / catalog**: two objects, one label schema (N°, name, material, finish, price) | Fixed **catalogue index** across the top: wordmark left, the objects as `N° 1 Maille ovale` / `N° 2 Trèfle noir` / `Commander` centred, jumping and scroll-spied with a gold underline; FR/EN switch and (empty-until-filled) socials right. No CTA button, no progress line. Collapses to wordmark + FR/EN below 860px | Object N° 1 already in view and labelled: supplied café photo on the right on parallax, label lower-left at 1x, glints in front, the hanging chain as the near plane | `flow(parallax) > flow(reveal) > flow(hush) > pin(bespoke loupe pull-back) > pan(worn rail) > flow(order plate)`, **6 acts, ~9.8vh**, zero video, peak 2.6vh after a near-empty act | An **order plate typeset like a label**: quantity steppers per object, live total, name/email/phone/note, honest not-connected status, footer under it. No pin, no spotlight, no magnet | **The hanging chain**: a verlet-simulated stainless chain of oval links with a gold JB tag hangs from under the index; scroll speed swings it, the pointer pushes it, it settles; it steps aside before the rail. Plus the peak: a clip-path loupe that starts on the clovers and pulls back to the whole figure | Supplied lifestyle photos (warm café light, cream polo). Off-black `#0b0a08`, gold `#d2ae66`, ivory `#f1ece2`. Inter Tight thin capitals + Cormorant Garamond italic (client asked for the TIMELESS type) | 4520 |

*The first two rows were built in this repo before the registry existed and are
recorded as built. They share almost everything, which is the point of writing
them down.*

**Gate for `mechi`:** client-directed, not cleared. It deliberately follows
`nitsy-film` (filmic, services rail, form close) because the client asked for
"la même manière que [...] nitsy fashion". Against `nitsy-film` it differs on
nav, hero, shape and signature (4 of 6), shares grammar and an in-flow form.
5 or 6 of 6 against every other row.

**Gate for `tenebre`:** 5 of 6 against `maison-jeudy`, `alba` and
`nitsy-film` (all but grammar), 6 of 6 against `propagate` and `nitsy`. Its
first plan scored 3 of 6 against `nitsy-film` and was changed; the page was
then rebuilt from the client's second clip. See its BRIEF.md.

**Gate for `propagate`:** against `maison-jeudy` it differs on 6 of 6
(grammar, nav, hero, shape, close, signature); against `alba` on 6 of 6. It
shares only the dark ground with both.

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **Grammar:** filmic one-shot, twice (`maison-jeudy`, `alba`).
- **Nav:** fixed minimal top bar with wordmark + one CTA + progress line, twice.
- **Hero:** pinned stage of code-drawn SVG parallax planes with a lead-left
  headline, twice.
- **Close:** `pin` 1.15vh + spotlight + magnet CTA, twice.
- **Shape:** six acts with a `pan` card rail carrying `data-sc-tilt` cards.
- **Grammar:** Turntable (`propagate`): one object, scenes as views of it.
- **Nav:** a right-edge clickable scene index (`propagate`).
- **Close:** an in-flow configurator with drag-to-turn frames (`propagate`).
- **Signature:** shattering a product image into canvas shards that reassemble
  in a different colourway (`propagate`).
- **Grammar:** filmic one-shot, four times now (`maison-jeudy`, `alba`,
  `nitsy-film`, `tenebre`). The next build should pick another.
- **Nav:** corner chrome at the bottom with a wordmark that docks after the
  hero (`tenebre`).
- **Hero:** a canvas frame sequence of real footage in which the scroll
  takes the product apart and puts it back together (`tenebre`).
- **Close:** a final pinned stage where a ring the size of the edition fills
  and then gives way to the form in the same frame (`tenebre`).
- **Signature:** a product taken apart and reassembled by the scroll, from
  real footage, held in the air as long as the reader holds (`tenebre`).
- **Also used:** a second product lifted apart in layers by the scroll, from
  real footage, each layer named while it is off (`tenebre`, act 4). The
  photograph-scanned-into-a-drawing exploded view was used and then removed.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
- **Nav:** a pick-counting request pill as the only chrome (`mechi`).
- **Close:** a pinned statement around a giant real figure (the 20 $) before
  the form (`mechi`).
- **Signature:** chosen services flying into a request pill (`mechi`).
- **Grammar:** filmic one-shot is now five builds. Split stage was planned for
  `mechi` and removed at the client's request, so it is still unused.
- **Grammar:** gallery / catalog, first use (`golden-jb`).
- **Nav:** a top catalogue index of the objects themselves, jumping and scroll-spied (`golden-jb`).
- **Close:** an order plate typeset like an object label, with quantities and a live total (`golden-jb`).
- **Signature:** a physics-simulated hanging chain that swings with scroll speed and the pointer (`golden-jb`).
- **Peak device:** a clip-path loupe that pulls back from a macro crop to the whole photograph (`golden-jb`).

**Gate for `golden-jb`:** 6 of 6 against `maison-jeudy`, `alba`, `propagate`, `nitsy-film` and `tenebre`;
against `nitsy` 5 of 6 (both close on an in-flow form; this one is an order plate with quantities, not a
contact form, but the pattern is close enough to count as shared); against `mechi` 5 of 6, for the same reason. Typography is shared with `tenebre`
and `mechi` at the client's request; type is not a gate dimension.
- **Removed:** the hanging chain in `golden-jb` was taken out at the client's request after shipping. The
  row stays as built (rows are append-only); its remaining signature is the clip-path loupe pull-back, and
  the build gained a client-directed homepage hero (full-bleed photo, title left, gold button) before N° 1.
- **Changed after shipping (`golden-jb`):** at the client's request the `pan` rail and the second N° 1 act were
  removed (no piece shown twice) and two pieces were added as flow acts. Shape is now
  `flow(home) > flow(parallax + reveal) > flow(hush) > pin(loupe) > flow(two opposed reveals) > flow(framed reveal) > flow(order)`.
- **Changed again (`golden-jb`):** the client asked for every piece on the N° 4 model and for the loupe to go.
  Shape is now `flow(home) > 4 × flow(label left, framed reveal right) > flow(order)`; the loupe and the hush
  act are gone, so the build no longer has a pinned act or the loupe peak.

