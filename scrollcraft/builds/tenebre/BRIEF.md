# TÉNÈBRE: brief

Written from the client's own spec, sent in one message on 10 October 2026 with
one supplied clip. Quotations are verbatim. Anything marked **Authored** was
decided by the builder because the spec did not cover it; the client can
overrule any of it.

The client's spec, in full:

> WEBSITE — scroll-scrub the hero orbit as a canvas frame sequence so scrolling
> rotates the watch. Lenis smooth scroll, text reveals pinned to scroll
> position. Sections: cinematic hero with the brand name tracking in →
> "Crafted in Darkness" story → macro details scrubbing clip 2 → exploded
> engineering view with spec callouts (42mm grade-5 titanium, 72h reserve, 217
> components) → "Edition of 88 — $48,000" → private waitlist CTA. Off-black
> background, gold accent, high-contrast serif display + minimal sans. Copy
> tone: quiet, expensive, very few words. Launch on localhost and verify every
> scroll animation works before telling me it's done.

Mid-build follow-up (French): "est-ce que tu vas permettre de rendre la montre
explosive, donc on pourra voir toute les détaille et pièece". Answered with the
exploded view below: every layer of the watch separates and is labelled.

## Evidence

- `InfiniteLavish_ssspin.io_1791640172.mov`: 720x1280 portrait, 30 fps, 5.8 s,
  174 frames, h264 at about 500 kb/s (visibly compressed). The file name is the
  pattern of a Pinterest download tool, so the footage is probably someone
  else's upload.
- **What it shows.** A steel watch on a black display cushion in a dark room:
  blue sunburst dial with diamond indices, fluted bezel, five-link bracelet,
  date at three. The dial reads **ROLEX OYSTER PERPETUAL DATEJUST**, legible
  at full size. It is a Rolex Datejust, not a titanium watch.
- **The camera does not move.** Phase correlation over the head region gives
  under 0.15 px of drift across all 174 frames. What moves is the light: it
  travels across the watch from left to right, the dial brightens and
  darkens, and the seconds hand turns. So "scrolling rotates the watch"
  becomes **scrolling moves the light around the watch**. That is what this
  footage can honestly do.
- **Only one clip was supplied.** The spec names a "clip 2" for the macro
  section. **Authored:** the macro clip is cut from the same footage as a slow
  2x crop that travels up the right side of the watch (bracelet, crown, date,
  bezel). Replace `assets/macro.mp4` / `.webm` with the real clip 2 when it
  exists.
- **Not stated anywhere and therefore not on the page:** a brand name, a
  model name, materials other than the ones given, movement type, water
  resistance, launch date, delivery, payment terms. The specs on the page are
  exactly the client's: 42 mm, grade-5 titanium, 72 h reserve, 217
  components, edition of 88, $48,000.
- **Mismatch the client must resolve before publishing:** the specs describe a
  42 mm titanium watch; the footage shows a 41 mm steel Rolex with its logo
  readable. Fine for a localhost demo. Publishing it under another brand name
  would put a third party's trademark next to claims it does not make.

## The eight topics

1. **Vibe.** Client: "quiet, expensive, very few words". "Off-black background,
   gold accent, high-contrast serif display + minimal sans." **Authored
   references:** a jeweller's window after closing, one lamp left on; the
   exploded drawings in a watchmaker's service manual; the price card in an
   auction catalogue, set in one line.
2. **The journey, in their words.** "cinematic hero with the brand name
   tracking in → 'Crafted in Darkness' story → macro details scrubbing clip 2 →
   exploded engineering view with spec callouts → 'Edition of 88 — $48,000' →
   private waitlist CTA". Kept in that order.
3. **Energy curve.** **Authored:** hushed at the open, near silent in the
   story, close and slow in the macro, the loudest moment in the exploded
   view, flat and grave at the price, quiet and settled at the waitlist.
4. **Feeling, and the one moment.** Not stated. **Authored** from the spec's
   own centre of weight (the exploded view, and the follow-up question about
   seeing every part): the peak is the watch coming apart. Curve below.
5. **What no other site does.** Not stated. **Authored:** the signature move
   below.
6. **Range.** Client: off-black, gold, serif display, "quiet, expensive".
   Premium-minimal, and here it was asked for by name.
7. **One world or distinct scenes.** The client listed six sections with
   different jobs. Distinct scenes.
8. **Assets.** One clip. No logo, no brand kit, no photos of parts. No kie.ai
   key in this session, so nothing is generated: the hero and macro are the
   client's footage, the exploded view is drawn in code.

Other decisions, all **Authored**:

- **Name: TÉNÈBRE** (French, "darkness"), because the story is "Crafted in
  Darkness" and the footage is a watch lit in a dark room. One word to change
  in `index.html` if the brand has a real name.
- **Language:** English, as the spec's copy is English.
- **The one action:** "Join the waitlist". Same label in the chrome and on the
  form button.

## Grammar: Filmic one-shot

Filmic one-shot is already taken twice in this registry, so it carries a
burden of proof. It wins here because the client's spec describes it almost
word for word: a scrubbed cinematic hero, text reveals pinned to scroll, one
linear launch argument with one arc, nothing to navigate. The other seven
lost on the spec itself:

- **Chaptered editorial** bans the full-bleed scrub hero and pinned type, the
  two things the spec asks for first.
- **Live surface** needs a product that runs. A watch does not.
- **Continuous world** needs one place travelled through; the spec lists six
  different scenes.
- **Typographic poster** bans `scrub`, and the hero is a scrub.
- **Gallery / catalog** is for a range. This is one watch in one edition.
- **Split stage** needs two sides of an argument. There is no "before".
- **Rhythmic cutlist** bans `pin`, and the spec asks for pinned reveals and a
  "quiet, expensive" pace.

What makes this build structurally different from the other filmic rows
(`maison-jeudy`, `alba`, `nitsy-film`) is everything except the grammar: nav, hero device,
act sequence, close and signature. See the gate below.

## The signature move: the drawing comes out of the photograph

The exploded view opens on a still photograph of the watch head, front on. A
thin gold scan line travels down it, and everything above the line turns into
a gold line drawing traced on the same circles: bezel, flutes, dial, indices,
hands. The drawing then tips back into a three-quarter view and comes apart
under the reader's scroll into seven layers (crystal, bezel, dial, hands,
movement, case, caseback), each one drawn, labelled, and still working: the
gear train turns with the scroll, the balance wheel ticks on its own time
while the reader holds still. A counter climbs to 217 as the layers separate.

Coded in the page on a canvas, driven from the act's own progress. Not a kit
device and not a parameter change to one.

## The tell-someone sentence

"It's the site where the photo of the watch turns into a gold blueprint and
comes apart in your hands, layer by layer, all 217 pieces."

## The feeling curve

One line per act: the emotion, then what on screen causes it.

```
1  Hush        a watch in a dark room; the name slides out from behind it and the light starts to move under your hand
2  Stillness   the light goes out; two sentences light up word by word as you read them
3  Closeness   the edge of the case, the crown, the date, closer than a shop window allows
4  Wonder      the photograph becomes a drawing and comes apart into its 217 parts      <- PEAK
5  Gravity     eighty-eight marks fill a ring under your hand, the edition and the price, nothing else
   then
   Belonging   the same stage holds; the dial steps aside and a name, an email, one button take its place
```

Acts 5's two beats share one held stage on purpose (see the gate below): the
page stops at the ring and never moves again.

No two adjacent beats share a feeling. The story act (2) is the quiet that the
hero needs after it, and the macro (3) is slow and close so the peak has
something to break.

## The peak

"The photo of the watch turned into a gold drawing and then it came apart in
layers while I scrolled, and the number went up to 217." It lives in act 4,
which gets the largest span on the page (4.0 viewport-heights against 2.6 for
the next largest), the only bespoke drawing, and a held photograph at its
start so the change has something to be a change from.

## Authored silence

- The first ~10% of act 4 is the photograph held still before the scan. On
  purpose: the beat before the drop.
- The end of act 1: the light fades out across its last ~15% and the frame
  goes to near black. On purpose: it is the "darkness" the story act opens
  into. Not dead scroll; the canvas is still changing as it fades.

## Journey

```
1  Arrival      a watch in the dark, and its name
2  Origin       it was made where nobody watches
3  Proof        look closer
4  Substance    take it apart; the specs are on the parts they belong to
5  Scarcity     88, and the price, said once
   Commitment   join the waitlist (same stage)
```

## Score

| Act | Beat | Device | Span | Why this one |
|---|---|---|---|---|
| 1 Hero | Arrival | `scrub` as a canvas frame sequence (87 frames, crossfaded), pinned | 2.6vh | The client asked for a canvas sequence; scroll is the light moving round the watch |
| 2 Crafted in darkness | Origin | `pin` + scroll-lit words (bespoke, from `--sc-p`) | 1.8vh | "text reveals pinned to scroll position": the words light up exactly as far as you have scrolled |
| 3 Closer | Proof | `scrub` video (clip 2), pinned | 2.2vh | Second and last scrub. The camera moves, the type holds |
| 4 Taken apart | Substance | `pin` + bespoke canvas drawing + `count` | 4.0vh | The peak. A drawing can come apart; the footage cannot |
| 5 Edition of 88, then the waitlist | Scarcity, then commitment | `reveal`: a ring of 88 ticks drawn from `--sc-p`; the dial then steps aside (CSS from `--sc-p`) and a real form takes the stage; footer inside the stage | 2.4vh, the last act, cues hold | The reader counts the edition with their own hand, and the ask arrives inside the same held frame: the page stops once and stays stopped |

Five acts, 13.0 viewport-heights measured by the harness. Device families:
scrub (canvas sequence), pin with scroll-lit words, scrub (video), bespoke
canvas drawing with count, reveal with a form. Two scrubs, five families, no
family twice in a row (acts 4 and 5 both sit on pinned containers, but one
is a drawing coming apart and the other a ring filling). Not in the 13.6 to
13.8vh band.

**Why the edition and the waitlist share a stage.** The first build kept
them as two acts, a short pinned ring and an in-flow form. While it was
being pushed, another session added `nitsy` and `nitsy-film` to the
registry. Against `nitsy-film` that plan matched on grammar (filmic), close
(in-flow form with an honest not-connected state) and act shape (six acts,
scrubs at one and three, ending pin, pin, flow): 3 of 6, a fail. The plan
changed, not the registry: one held final act now carries both beats, in the
client's order.

## Layer contract, hero

| Plane | Asset | Movement | Occlusion |
|---|---|---|---|
| Far | The footage frame (cushion, room, the gold reflection at the bottom) | Slow push-in, 1.00 to 1.06 | Behind everything |
| Typography | Real `<h1>`, letters split for motion | Tracks in on load, then tightens with scroll, separate parallax | Passes **behind** the watch head: the last letter tucks under the bezel |
| Subject | The same frame through a static watch matte (the camera does not move, so one matte holds for every frame) | Same transform as the plate, so no duplicate subject | In front of the name |
| Near atmosphere | Canvas dust catching the light | Fastest, plus pointer drift on fine pointers | In front of the watch, never over the name |
| Copy | Second line, lower left | Cue only | Readable over a corner of darkness |

Mobile: the portrait footage fills the phone. The name sits above the watch,
not behind it, so the whole word is readable at 390 px.

Reduced motion: no Lenis, no frame scrubbing, one well-lit frame with the name
set; the exploded view is shown resolved, every layer apart and labelled.

## Fingerprint gate

Against each existing row in `scrollcraft/FINGERPRINTS.md`:

| Dimension | vs `maison-jeudy` | vs `alba` | vs `propagate` | vs `nitsy` | vs `nitsy-film` |
|---|---|---|---|---|---|
| Grammar | same (filmic) | same | differs (turntable) | differs (typographic poster) | same (filmic) |
| Nav | differs: no bar, corner chrome at the bottom, the wordmark docks only after the hero name has gone, no progress line | differs | differs (right-edge scene index) | differs (wordmark only, no CTA) | differs (top bar + CTA) |
| Hero device | differs: canvas frame sequence, the name passing behind the subject through a matte | differs | differs (video scrub, no occlusion) | differs (type only) | differs (masked photo panel, push-in) |
| Act shape | differs: `scrub(sequence) > pin(lit words) > scrub(video) > pin(drawing) > pin(ring, then form)`, 5 acts, 13.0vh | differs | differs | differs (`pin > flow > pin > flow > flow`, 8vh, no media) | differs (6 acts with a pan rail, 17vh, ends `pin > pin > flow`) |
| Close | differs: the last pinned stage, ring of 88 then the form in the same frame; no spotlight, no magnet | differs | differs (configurator) | differs (in-flow form) | differs (in-flow form) |
| Signature | differs | differs | differs (shards, not a drawing) | differs (braid) | differs (comb reveal) |
| **Total** | **5 of 6** | **5 of 6** | **6 of 6** | **6 of 6** | **5 of 6** |

Passes (needs 4 of 6 against every row).

## Verification (10 October 2026)

Served from this folder at `http://localhost:4600` (`serve.mjs`), Chromium
from Playwright. Chromium has no h264 decoder, so the page picked
`macro.webm` (VP9); the mp4 path was not exercised in a browser.

`shoot.mjs` on the final files, six samples per act:

- **Desktop 1440x900:** no dead scroll, the clip keeps moving whenever it is
  on screen, every cue clears 4.5:1 at its worst frame. No console errors.
- **Phone 390x844:** same three results.
- **Reduced motion:** no dead scroll, contrast clean. Hero holds one lit
  frame with the name set; all words lit; the exploded view shows resolved;
  the ring is full and the dial already sits where it ends. An earlier run
  showed the macro act on the clip's darkest frame (bracelet only); the
  poster under reduced motion is now the crown-and-date frame.

Page-local checks (`interact.mjs`, 23 of 23 passed): the name slides out
from behind the watch on arrival; the last letter is partly covered by the
watch canvas (153 of 396 samples); Lenis is on and one wheel notch glides
through 23 positions; the hero canvas changes with scroll and the name
tightens (570 px to 501 px); the wordmark docks after the hero; story words
light 0, 8, 17 of 17 at three positions; clip 2 scrubs 2.26 s to 3.36 s; the
exploded view runs photo, scan, tilt, spread in order and the counter lands
on 217; the movement keeps ticking while scroll holds still; the ring lights
0, 41, 88 ticks; the dial steps aside 333 px to 132 px as the form goes from
opacity 0 to 1; "Join the waitlist" glides to the end of the page and puts
the cursor in Name with the form lit; keyboard focus on the form from the
top of the page parks the act where the form is lit; empty and malformed
submissions are refused with a message; a valid one says the waitlist is
not connected and keeps the input; nothing reaches the URL; tab order is
skip link, wordmark, waitlist link, Name, Email, button, each with a visible
gold ring.

Fixed after the first contact sheet: the edition title ran over the ring
(smaller title, larger ring); the price in Bodoni read as "$/18,000" at that
size (now the sans); the lugs and first links cluttered the tilted drawing
(they now step aside as the watch tips back); the counter crowded the corner
wordmark (raised); the wordmark could take keyboard focus while invisible
(now shows on focus). Then the gate change above: edition and waitlist
merged into one held final act, verified again from scratch.

**Feel check, cold, one word per beat:** hush, stillness, closeness,
wonder, gravity, resolve. Same as the intended curve; the merged final act
reads as gravity turning into resolve without a cut, which suits it better
than the two separate acts did. One honest difference: act 3
reads softer than intended, because clip 2 is a 2x crop of a 720 px,
heavily compressed clip. A real clip 2 shot for it would fix that; the page
does not need to change.

The peak is the largest change on the sheet and the longest span. The last
screen holds: the full ring, the form, the button, the footer.

**Not verified:** a real phone (iOS video decode, Low Power Mode, touch
inertia; Lenis leaves touch scrolling native), Safari and Firefox, the
h264 path, and any real waitlist endpoint (none exists). One transient
cosmetic overlap remains: as act 4 slides in, its heading passes under the
fixed wordmark in the bottom-left corner for a fraction of a screen.
