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
| `tenebre` (`scrollcraft/builds/tenebre/`) | Filmic one-shot (argued in BRIEF.md: the client's spec is a scrubbed cinematic hero, pinned scroll reveals and one launch arc) | **Corner chrome at the bottom**: no bar, no progress line; `Join the waitlist` text link bottom-right; the wordmark docks bottom-left only after the hero's own name has gone; all chrome steps aside at the close | Supplied footage graded to "one lamp" as a **canvas frame sequence** (70 stills, crossfaded), pinned 4.0vh: the page opens on the whole watch and the scroll lifts the crystal, sends the parts flying, holds them, then brings them home; name gathers on the left; dust plane in front; the light goes out at the end | `scrub(sequence) > pin(scroll-lit words) > flow(three reveals) > pin(canvas drawing) > pin(ring, then form)`, **5 acts, 12.4vh**, peak 4.0vh in the hero | **The last pinned stage holds to the end**: a ring of 88 ticks fills under scroll, edition and price land inside it, then the dial steps aside and the waitlist form takes the frame; honest "not connected" state; footer inside the stage. No spotlight, no magnet | **The watch comes apart in your hands and comes back**: real footage of the crystal lifting and the parts flying, driven only by the scroll, with a wide stretch to hold them in the air, then reassembly. Followed later by the client's second choice, a photograph scanned into a gold drawing that separates into seven labelled layers | Supplied footage of a gold skeleton watch, linen graded down to the page ground. Off-black `#0b0a09`, gold `#c9a66b`, ivory `#eee7da`. Bodoni Moda + Instrument Sans | 4600 |

*The first two rows were built in this repo before the registry existed and are
recorded as built. They share almost everything, which is the point of writing
them down.*

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
- **Also used:** a photograph scanned into a line drawing that tips back and
  explodes into labelled layers (`tenebre`, act 4).

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
