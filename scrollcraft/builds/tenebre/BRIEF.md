# TÉNÈBRE: brief

Written from the client's own spec and follow-ups, 10 October 2026.
Quotations are verbatim. Anything marked **Authored** was decided by the
builder because the client did not say; the client can overrule any of it.

## What the client asked for

The original spec, in full:

> WEBSITE — scroll-scrub the hero orbit as a canvas frame sequence so scrolling
> rotates the watch. Lenis smooth scroll, text reveals pinned to scroll
> position. Sections: cinematic hero with the brand name tracking in →
> "Crafted in Darkness" story → macro details scrubbing clip 2 → exploded
> engineering view with spec callouts (42mm grade-5 titanium, 72h reserve, 217
> components) → "Edition of 88 — $48,000" → private waitlist CTA. Off-black
> background, gold accent, high-contrast serif display + minimal sans. Copy
> tone: quiet, expensive, very few words. Launch on localhost and verify every
> scroll animation works before telling me it's done.

Follow-ups, in order (French):

1. "est-ce que tu vas permettre de rendre la montre explosive, donc on pourra
   voir toute les détaille et pièece" (make the watch explode, so every part
   can be seen).
2. A second clip, `Watch_disassembles_and_reassembles_1080p_20261010114536.mp4`.
   Asked where it should go, the client chose "Vidéo puis dessin": the real
   watch comes apart, then the drawing.
3. "je veux que tu recontruit la page avec cette video" (rebuild the page with
   this video).
4. "je vex lorsqu'on ouvre la page la montre est dans l'accueil fu à mesure
   lors du défilement la montre se décompose" (when the page opens the watch is
   in the hero, and as you scroll it comes apart).
5. "finalement lorsque la monte àa fini de montrer les pièces il se remettre à
   normale" (once it has shown its parts, it goes back to normal).

## History

The first version was built from a different clip: a steel Rolex Datejust on
a black cushion, logo readable, light moving round a still camera. That
version is superseded. Every image from it has been removed from the build;
the page is now made entirely from the second clip. This also removes the
third-party trademark problem the first version had.

## Evidence

- `Watch_disassembles_and_reassembles_1080p_20261010114536.mp4`: 1920x1080,
  24 fps, 10 s, 240 frames. A gold-tone skeleton watch with Roman numerals,
  ruby jewels and a brown leather strap, on pale linen and light wood.
  - Frames 0 to 54: the whole watch, the camera turning slightly around it.
  - 54 to 100: the crystal lifts and tilts away, a wheel and screws fly out,
    gold dust.
  - 100 to 150: the parts drift, held in the air.
  - 150 to 168: everything returns; the crystal closes.
  - 168 to 240: the whole watch again, front on.
- The set is high-key (linen around 0.82 brightness). The page is off-black.
  **Authored grade, "one lamp":** no cutout (a saturation key punched holes in
  the see-through dial and kept the linen folds). Instead the pale linen is
  pulled down by how unsaturated it is, bright speculars are kept, and a soft
  falloff around the watch takes every edge to the page ground `#0b0a09`. The
  watch reads as gold on dark linen under a single lamp.
- The dial carries a small engraved word that is not legible as any known
  brand.
- **Not stated anywhere and therefore not on the page:** a brand name, a
  model name, the movement type, water resistance, a launch date, delivery,
  payment. The specs on the page are exactly the client's: 42 mm, grade-5
  titanium, 72 h reserve, 217 components, edition of 88, $48,000.
- **Mismatch to note:** the footage shows a gold-tone watch on leather; the
  specs say grade-5 titanium. That is the client's claim to check, not
  something the page can resolve.

## The eight topics

1. **Vibe.** Client: "quiet, expensive, very few words". "Off-black background,
   gold accent, high-contrast serif display + minimal sans." **Authored
   references:** a jeweller's bench after closing, one lamp left on; the
   exploded drawings in a watchmaker's service manual; the price card in an
   auction catalogue, set in one line.
2. **The journey, in their words.** The spec's order, then follow-up 4: "when
   the page opens the watch is in the hero, and as you scroll it comes apart",
   and follow-up 5: "it goes back to normal".
3. **Energy curve.** **Authored:** hushed at the landing, the loudest moment
   inside the hero as the parts fly, near silence in the story, close and slow
   in the details, precise in the drawing, grave at the price, settled at the
   waitlist.
4. **Feeling, and the one moment.** Client (follow-ups 1, 4, 5): seeing the
   watch come apart under the scroll and go back together. That is the peak.
5. **What no other site does.** Seeded by the same moment; see the signature.
6. **Range.** Premium-minimal, asked for by name.
7. **One world or distinct scenes.** Distinct scenes, as the spec lists them.
8. **Assets.** The second clip only. No logo, no brand kit. No kie.ai key in
   this session; nothing is generated. The drawing is code.

Other decisions, all **Authored**:

- **Name: TÉNÈBRE** (French, "darkness"), from "Crafted in Darkness". One word
  to change in `index.html` if the brand has a real name.
- **Language:** English, as the spec's copy is English.
- **The one action:** "Join the waitlist", the same label in the chrome and
  on the form button.

## Grammar: Filmic one-shot

The client's spec describes it: a scrubbed cinematic hero, pinned scroll
reveals, one launch arc, nothing to navigate. The other seven lose on the
spec itself: chaptered editorial bans the scrub hero and pinned type; live
surface needs a product that runs; continuous world needs one place
travelled through; typographic poster bans scrub; gallery is for a range;
split stage needs two sides; rhythmic cutlist bans pin and the quiet pace.

## The signature move

**The watch comes apart in your hands, and comes back.** On arrival the page
shows the whole watch. The reader's scroll is the only clock: it lifts the
crystal, sends the wheels and screws into the air, holds them there for as
long as the reader holds, then brings every part home and closes the crystal.
Then the light goes out. Coded in the page as a canvas frame sequence with
its own scroll-to-clip map (a still landing, a wide stretch for the parts
flying, a drift, a return), not a kit device.

The engineering drawing later on (the photograph scanned into a gold drawing
that separates into seven labelled layers) is the client's second choice,
"Vidéo puis dessin", and it is where the specs live.

## The tell-someone sentence

"It's the site where you scroll and the watch comes apart in front of you,
every part floating, then puts itself back together."

## The feeling curve

```
1  Hush, then wonder   the whole watch under one lamp; the scroll lifts the crystal, the parts fly and hang, then return   <- PEAK
2  Stillness           the light goes out; two sentences light up word by word as you read them
3  Closeness           three details at a scale a shop window does not allow
4  Understanding       a photograph turns into a drawing and separates into named layers, the specs on their parts
5  Gravity, resolve    eighty-eight marks fill a ring; the price; then the form takes the same frame
```

## The peak

"I scrolled and the watch came apart in front of me, the glass and the wheels
just hanging there, and then it all went back." It lives in act 1 and gets
the largest span on the page (4.0 viewport-heights), the only footage, a
still landing before the first part moves, and the widest stretch of scroll
for the moment the parts fly.

## Authored silence

- The first 6% of the hero is the whole watch held still while the name
  gathers. The beat before the drop.
- The last 10% of the hero: the light goes out over the reassembled watch.
  It is the darkness the story act opens into.
- The first 8% of act 4 is the photograph held still before the scan.

## Score

| Act | Beat | Device | Span | Why this one |
|---|---|---|---|---|
| 1 The watch, then its parts | Arrival, peak | `scrub` as a canvas frame sequence (70 graded stills at 1480x1080, crossfaded), pinned | 4.0vh | The client's own ask: the hero holds the watch and the scroll takes it apart and back |
| 2 Crafted in darkness | Origin | `pin` + scroll-lit words (from `--sc-p`) | 1.8vh | "text reveals pinned to scroll position" |
| 3 Closer | Proof | `flow` + `reveal` (three details wiped in) | flow, about one screen | Unpinned on purpose: the page breathes between two pinned acts |
| 4 Every layer, in order | Substance | `pin` + bespoke canvas drawing + `count` | 3.2vh | The drawing can show what the footage cannot: every layer, named |
| 5 Edition of 88, then the waitlist | Scarcity, commitment | `reveal` ring from `--sc-p`; the dial steps aside and the form takes the frame | 2.4vh, last act, cues hold | The page stops once and stays stopped |

Five acts, 12.4 viewport-heights measured by the harness. Families: scrub,
pin with lit words, flow with reveals, bespoke drawing with count, reveal with
a form. One scrub. No family twice in a row. Not in the 13.6 to 13.8vh band.

## Layer contract, hero

| Plane | Asset | Movement | Rule |
|---|---|---|---|
| Ground | The page ground, painted on the canvas | Holds | Every frame falls away to it, so the footage has no visible edge |
| Subject | The graded frame sequence | The clip's own camera move and the parts flying toward the lens, plus a 4% push | The parts are the depth: they cross in front of the watch |
| Typography | Real `<h1>` | Gathers on arrival, tightens with scroll, drifts up, slight pointer parallax | Left of the watch on desktop, above it on phones; fades before the parts fly |
| Near atmosphere | Canvas dust | Fastest, plus pointer drift | Over everything, never over the copy column |
| Copy | Three lines | Cues | Lower left over a corner scrim (a band on phones) |

Reduced motion: no Lenis, no frame scrubbing. The hero dissolves between
three stills (whole, apart, whole) as the reader scrolls; the drawing is
shown resolved; the ring is full.

## Fingerprint gate

Against each row in `scrollcraft/FINGERPRINTS.md`:

| Dimension | vs `maison-jeudy` | vs `alba` | vs `propagate` | vs `nitsy` | vs `nitsy-film` |
|---|---|---|---|---|---|
| Grammar | same (filmic) | same | differs (turntable) | differs (poster) | same (filmic) |
| Nav | differs: no bar, corner chrome at the bottom, the wordmark docks after the hero name has gone, no progress line | differs | differs (scene index) | differs (wordmark only) | differs (top bar + CTA) |
| Hero device | differs: canvas sequence of real footage in which scroll takes the product apart and back together | differs | differs (video scrub, turning shirt) | differs (type only) | differs (masked photo panel) |
| Act shape | differs: `scrub(sequence) > pin(lit words) > flow(reveals) > pin(drawing) > pin(ring, then form)`, 5 acts, 12.4vh | differs | differs | differs (`pin > flow > pin > flow > flow`, 8vh) | differs (6 acts, pan rail, 17vh) |
| Close | differs: last pinned stage, ring of 88 then the form in the same frame | differs | differs (configurator) | differs (in-flow form) | differs (in-flow form) |
| Signature | differs | differs | differs (shatter on canvas vs real footage coming apart and back) | differs (braid) | differs (comb reveal) |
| **Total** | **5 of 6** | **5 of 6** | **6 of 6** | **6 of 6** | **5 of 6** |

Passes (needs 4 of 6 against every row).

## Verification (rebuilt page, 10 October 2026)

Served from this folder at `http://localhost:4600`, Chromium from Playwright.

`shoot.mjs`, six samples per act:

- **Desktop 1440x900:** no dead scroll; every cue clears 4.5:1 at its worst
  frame. No console errors.
- **Phone 390x844:** same.
- **Reduced motion:** same. The first reduced run showed only the whole
  watch in the hero; it now dissolves whole, apart, whole.

Page-local checks (`interact.mjs`, 23 of 23 passed): the name gathers on
arrival; Lenis is on and one wheel notch glides through 32 positions; at
hero progress 0.02, 0.42, 0.60 and 0.84 the canvas shows clip frames 0, 86,
127 and 173 (whole, apart, drifting, back together) and paints four different
pictures; the name tightens (499 px to 416 px); the wordmark docks after the
hero; story words light 0, 8, 17 of 17; the three details wipe in with
scroll; the drawing runs photo, scan, tilt, spread and the counter lands on
217; the movement ticks while scroll holds still; the ring lights 0, 41, 88
ticks and the dial steps aside as the form arrives; "Join the waitlist"
glides to the end with the cursor in Name; validation and the honest "not
connected" message work; nothing reaches the URL; tab order is skip link,
wordmark, waitlist link, Name, Email, button, each with a visible gold ring.

**After the client's note "je veux que l'image soit plus visible"** (with a
phone screenshot): the grade was brightened (linen kept as readable dark
fabric, gold lifted with a gentle contrast curve and light sharpening, the
falloff to the page ground starting further out); the frames are now the full
crop resolution, 1480x1080 (7.3 MB for 70, up from 3.9 MB); the phone canvas
draws at the screen's full density (up to 3x); the lower-left scrim, which
had been dimming the bottom of the watch on phones, now only appears with the
lines it protects. Every check above was rerun on these files: 23 of 23, and
desktop, phone and reduced-motion harness runs all clean.

**Feel check, cold, one word per act:** wonder, stillness, closeness,
understanding, resolve. Matches the curve. The hero is now clearly the
biggest change on the sheet and the longest span, so the peak and the
signature are the same moment.

**Not verified:** a real phone (decode speed of 70 stills on a slow
connection, touch inertia; Lenis leaves touch scrolling native), Safari and
Firefox, and any real waitlist endpoint (none exists). A known cosmetic
overlap: as act 4 slides in, its heading passes under the fixed wordmark in
the bottom-left corner for a fraction of a screen.
