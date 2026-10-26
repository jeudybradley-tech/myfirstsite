# TIMELESS: brief

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
6. "je veux que limage soit plus visible" (I want the image more visible), with
   a phone screenshot; then a background-free 4K render of the same watch on
   white, `Untitled_design.mp4`.
7. A third clip, `Watch_disassembles_and_reassembles_1080p_20261010143027.mp4`,
   "voici la nouveau video meilleur version" (here is the new video, the
   better version). The page is now built from it alone.
8. "fait moi une page de luxe et performant" (make me a luxury page, and a
   fast one).
9. Questions and answers, 12 October 2026: the brand is **Timeless**; the copy
   stays in English; the waitlist stays unconnected for now; the case is
   described as in the video, **18k yellow gold** on a leather strap (the
   client's choice of wording); 42 mm, 72 h, 217 components, edition of 88
   and $48,000 stay.
10. Four photographs of other brands' skeleton watches, "how can i install
    those pictures as selling products". Asked: they are inspiration; show
    only, no purchase; a Collection section before the price and the
    waitlist; example names and prices, marked. Then "i want when we scroll
    down the images moves", and "je veux les vrai image que je t'ai fourni
    dans le site" (the real photos on the site). The four photographs are
    now the cards' images, cropped to 4:5 with a soft edge falloff into the
    dark. **They show other brands' watches and logos (Charlie, Bipfol,
    Rotary) and belong to their photographers:** fine on this private page
    to judge the layout, to be replaced by the client's own photographs, or
    used with permission, before the site is public. The bronze one carried
    a small sparkle mark in its corner; the crop leaves it out.
11. A fourth clip, `Watch_components_lifting_and_rea__20261014111844.mp4`
    (8 s, 24 fps, 192 frames): a gold watch with a cream dial and Roman
    numerals on a wrist, against a blue-grey studio sweep; the crystal, the
    dial and the movement lift off the case one above the other, hold, and
    settle back, while the camera lowers. Asked: a new section; the sweep
    taken down to the dark; **another model**, not the edition; the gold
    drawing removed. Then "je veux style scroll": the scroll drives it.
12. "remplace la video à ça": the same scene, re-rendered by the client on
    black (1280x720, 192 frames, blue steel hands). It replaces the fourth
    clip: no sweep to take down any more, only the backdrop mapped onto the
    page ground and a cut of 880 around the watch (65 stills, 1.7 MB). The
    layers now lift at clip frames 36 (crystal), 58 (dial), 74 (movement)
    and 84 (the case alone), hold to 138 and are home by 176. Then "je veux
    que ça soit visible": published at once, the layer names one size up.
13. A phone screenshot, "les écritures ne sont pas visible": on a short
    phone (376x650) the second watch was sized for a taller screen, so its
    crystal ran under the heading. On any screen taller than wide the
    section now stacks by class (words above, layer names below, tablets
    included), and the watch is sized to the gap between them: the crystal
    at its highest stops under the heading, the case above the names. The
    hero's lower lines got a darker band behind them on stacked screens;
    harness clean at 376x650, 360x640 and 390x844.
14. "pourquoi ça boug" / "la page saute", in the hero and in the second
    watch, on a phone: the two frame sequences skipping when the frames the
    scroll asks for are not decoded yet. Phones now get a lighter hero set
    (`assets/frames-s/`, 1040 wide, 2.8 MB, under half the memory, twice as
    fast to decode); both canvases draw at 2x at most; more frames stay
    decoded ahead (10 for the hero on a phone, 24 for the small layer
    frames); every 8th hero frame and every 4th layer frame stay decoded for
    good, so a fast flick always finds a frame close by; and a frame loaded
    the plain-image way is decoded before it is first drawn. Phone, four
    fast passes through the hero: frame time p50 22.7 to 16.7 ms, p95 34.1
    to 18.1 ms, max 45 to 27 ms, no long tasks.
15. A photograph, `7.jpg`, "put this image in the background in the
    section of crafted in darkness, make sure the written be visible": a
    watchmaker, loupe in one eye, holding a skeleton movement between two
    fingers, black and white with only the gold wheel and the purple jewels
    in colour. It is graded onto the page ground (greys warmed to the page's
    ink, blacks to #080706; 736x1104, 24 KB) and sits behind act 2. On a
    wide screen it fills the left of the screen and falls into the dark 5rem
    past the left edge of the words, so it narrows rather than run under
    them (1024x700 checked); on a phone or any upright screen it takes the
    top 64% and the words sit below it on the dark. As the act runs, the
    photograph slowly draws back (scale 1.12 to 1.02; still under reduced
    motion). Harness: the heading and the lit words clear 13.5:1 at their
    worst frame on desktop, 390x844, 376x650, 768x1024 and reduced motion;
    23 of 23. **The photograph's source and rights are unknown:** fine on
    this private page, to be cleared or replaced before the site is public.
16. Three photographs (`8.jpg`, `9.webp`, and a square bench shot), "install
    in the section closer, replace the old ones with those ones". The three
    stills cut from the hero clip are gone; Closer now shows a frosted dial
    with a gold tourbillon under two fine points (tall, cut to 510x690),
    an open movement on a wooden bench set with rubies and sapphires (cut
    square), and a watchmaker's hands at the bench with a double loupe (its
    pale table taken down 14% toward the page's dark). Captions: Tourbillon,
    Movement, At the bench. 135 KB for the three. Harness clean on desktop,
    390x844 and reduced motion; 23 of 23. **These show other watches (the
    dial carries a maker's name) and their source and rights are unknown:**
    to be cleared or replaced before the site is public.
17. "in the section the collection i want you to link to each item a section
    to order", then "i want to click on each item and it brings to another
    page where i place a order". The in-page order section built for the
    first ask is gone again (the page is back to six acts). Each card is now
    one link, its "Order" label underlined in gold, to `order.html#<piece>`:
    a page of its own with the large photograph, name, words and price, and
    "Place your order" (name, email, phone and a note, both optional, "Place
    order"); "The others" below opens the other three in place; "← The
    collection" steps back to where the reader was on the home page (or
    lands on the collection when opened directly, which the home page now
    honours for any section in the address). No payment is taken: the page
    says the house writes to confirm price, payment and delivery. Not
    connected: `ORDER_ENDPOINT` at the top of order.js takes a URL for a
    JSON POST of { piece, name, email, phone, note }; while it is empty the
    form says "Ordering is not connected yet, so nothing was sent." The
    pieces' names, words and prices live twice, in the cards and in
    order.js, and must be changed in both. Checked on desktop and 390x844,
    on the build and on the published copy: card to page, other pieces,
    back, direct arrival, unknown piece, validation; no console errors.
    Home page harness clean on desktop, 390x844 and reduced motion; 23 of 23.
18. A reference image, "THE NEO FRAME / JUMPING HOUR", and "je veux que toute
    la page aille cette type de police" (the whole page in this kind of
    type). Bodoni Moda and Instrument Sans are gone. Inter Tight now carries
    every word, its titles at weight 200 in capitals; Cormorant Garamond
    italic (also capitals in titles) answers it on a line of its own:
    "CRAFTED IN / *DARKNESS*", "UP / *CLOSE*" (was "Closer.", which no
    longer read as a pair), "THE / *REGENT*", "THE / *COLLECTION*",
    "EDITION / *OF 88*", "PRIVATE / *WAITLIST*", and on the order page
    "PLACE YOUR / *ORDER*", "THE / *OTHERS*". Titles lose their full stops.
    The read in act 2, the hero's lower line, the piece names and the order
    page's name are in the italic; body text is Inter Tight 300. On a phone
    the two closing titles keep to one line, and on a short phone (under
    700 tall) the waitlist tightens so its title clears the dial. Both fonts
    are OFL (licences in assets/fonts/). Harness clean on desktop, 390x844,
    376x650, 360x640, 768x1024 and reduced motion; 23 of 23; the order page
    18 of 18.

## History

The first version was built from a different clip: a steel Rolex Datejust on
a black cushion, logo readable, light moving round a still camera. That
version is superseded, and with it the third-party trademark problem it had.
The second version used the same skeleton watch on pale linen, graded down
to a dark "one lamp" look; a background-free 4K render on white was tried
next and keyed onto the page. Both are superseded by the third clip, shot on
black, which needs no key and no regrade. Every image in the build now comes
from it.

## Evidence

- `Watch_disassembles_and_reassembles_1080p_20261010143027.mp4`: 1920x1080,
  24 fps, 10 s, 240 frames, one continuous shot with no cuts. A gold-tone
  skeleton watch with Roman numerals, ruby jewels and a brown leather strap,
  lit from the front on pure black (the backdrop measures 2 to 4 levels out
  of 255).
  - Frames 0 to 44: the whole watch, front on, the camera drawing slowly
    closer. The case is 420 px in radius, centred at (946, 460); its strap
    leaves the top of the frame.
  - 44 to 90: the crystal clouds over, lifts and tilts away; a wheel, the
    balance and screws fly out.
  - 90 to 138: the parts drift, held in the air, in a fall of gold dust.
  - 138 to 180: everything returns; the crystal closes.
  - 180 to 240: the whole watch again, front on, the dust settling.
- **Authored grade:** none needed. The backdrop is mapped exactly onto the
  page ground `#0b0a09` (anything under 4 levels becomes the ground, anything
  over 14 is untouched, a smooth knee between), so the footage has no edge to
  find. The source crops the strap and, mid-lift, the crystal at its top
  edge; each file gets 200 rows above it in which the strap carries on and
  fades into the dark, and the source's top rows ease into that tone.
- The dial carries a small engraved word that is not legible as any known
  brand.
- **Not stated anywhere and therefore not on the page:** a model name, the
  movement type, water resistance, a launch date, delivery, payment. The
  specs on the page are exactly the client's: 42 mm, 18k yellow gold, 72 h
  reserve, 217 components, edition of 88, $48,000.
- **Resolved mismatch:** the spec first said grade-5 titanium while the
  footage shows a gold watch on leather. Asked, the client chose to match the
  video and to call the case 18k yellow gold. That is the client's claim; the
  page cannot verify the metal.

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
8. **Assets.** The third clip only. No logo, no brand kit. Nothing is
   generated. The drawing is code.

Other decisions, all **Authored**:

- **Name: TIMELESS**, the client's (it replaced the placeholder TÉNÈBRE).
  Set in capitals, letter by letter, in `index.html`; the script handles any
  number of letters. The build folder keeps its working name, `tenebre/`.
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

A second watch later on (act 4) comes apart the same way, in layers, from
the client's fourth clip: the scroll lifts its crystal, dial and movement off
the case and names each one while it is off. It replaced the code-drawn
exploded view, at the client's request; the edition's specs moved under its
price.

## The tell-someone sentence

"It's the site where you scroll and the watch comes apart in front of you,
every part floating, then puts itself back together."

## The feeling curve

```
1  Hush, then wonder   the whole watch alone in the dark; the scroll lifts the crystal, the parts fly and hang, then return   <- PEAK
2  Stillness           the light goes out; two sentences light up word by word as you read them
3  Closeness           three details at a scale a shop window does not allow
4  Understanding       a second watch, on a wrist, lifts apart in layers, each named while it is off the case
5  Choice             four more watches, rising at their own pace as the page passes
6  Gravity, resolve    eighty-eight marks fill a ring; the price; then the form takes the same frame
```

## The peak

"I scrolled and the watch came apart in front of me, the glass and the wheels
just hanging there, and then it all went back." It lives in act 1 and gets
the largest span on the page (4.0 viewport-heights), the only footage, a
still landing before the first part moves, and the widest stretch of scroll
for the moment the parts fly.

## Authored silence

- The first 4% of the hero is the whole watch held still while the name
  gathers, then a slow push in until 14%. The beat before the drop.
- The last 10% of the hero: the light goes out over the reassembled watch.
  It is the darkness the story act opens into.
- The first 8% of act 4 is the photograph held still before the scan.

## Score

| Act | Beat | Device | Span | Why this one |
|---|---|---|---|---|
| 1 The watch, then its parts | Arrival, peak | `scrub` as a canvas frame sequence (73 stills at 1560x1280, crossfaded, decoded near the reader only), pinned | 4.0vh | The client's own ask: the hero holds the watch and the scroll takes it apart and back |
| 2 Crafted in darkness | Origin | `pin` + scroll-lit words (from `--sc-p`) | 1.6vh | "text reveals pinned to scroll position" |
| 3 Closer | Proof | `flow` + `reveal` (three details wiped in) | flow, about one screen | Unpinned on purpose: the page breathes between two pinned acts |
| 4 The Regent, in layers | Substance | `scrub` as a second canvas frame sequence (65 stills at 1320x1080, the studio sweep taken down to the dark, loaded only as the reader approaches), pinned; the four layers listed and lit while off the case | 3.0vh | The client's fourth clip and choice: another watch, taken apart by the scroll |
| 5 The collection | Choice | `flow` + `reveal` (four cards wiped in); the cards rise at per-column speeds and each photograph drifts inside its frame, slower than its card | flow, about one and a half screens | The client's ask: four more watches shown, no purchase, the one action stays the waitlist |
| 6 Edition of 88, then the waitlist | Scarcity, commitment | `reveal` ring from `--sc-p`; the dial steps aside and the form takes the frame | 2.4vh, last act, cues hold | The page stops once and stays stopped |

Six acts, 13.2 viewport-heights measured by the harness (13.3 on a phone).
Families: scrub, pin with lit words, flow with reveals, a second scrub (the
layers), flow with scroll-driven cards, reveal with a form. Two scrubs, never
adjacent. No
family twice in a row. Not in the 13.6 to 13.8vh band: adding the collection
first measured 13.6, so the story act went from 1.8 to 1.6vh.

## Layer contract, hero

| Plane | Asset | Movement | Rule |
|---|---|---|---|
| Ground | The page ground, painted on the canvas | Holds | The footage's black is the ground itself, so it has no visible edge |
| Subject | The frame sequence | The clip's own camera move and the parts flying toward the lens, plus a 4% push | Case radius 36% of the viewport height on desktop (the strap leaves the top and bottom of the screen), 38% of the width on phones, the most the flying parts allow |
| Typography | Real `<h1>` | Gathers on arrival, tightens with scroll, drifts up, slight pointer parallax | Left of the watch on desktop, above it on phones; gone before the parts fly (30% of the act) |
| Near atmosphere | Canvas dust, drawn at one pixel per CSS pixel | Fastest, plus pointer drift | Over everything, never over the copy column; the clip brings its own gold dust behind it |
| Copy | Three lines | Cues | Lower left over a corner scrim (a band on phones) |

Reduced motion: no Lenis, no push, no dust, no letters gathering or
drifting. The frames still follow the scroll: they move only when the reader
does, and they are the page's content (the client's own ask, and on a
computer with "reduce motion" switched on the earlier three-still dissolve
read as a frozen watch). The second watch's layers follow the scroll the
same way; the ring is full.

## Fingerprint gate

Against each row in `scrollcraft/FINGERPRINTS.md`:

| Dimension | vs `maison-jeudy` | vs `alba` | vs `propagate` | vs `nitsy` | vs `nitsy-film` |
|---|---|---|---|---|---|
| Grammar | same (filmic) | same | differs (turntable) | differs (poster) | same (filmic) |
| Nav | differs: no bar, corner chrome at the bottom, the wordmark docks after the hero name has gone, no progress line | differs | differs (scene index) | differs (wordmark only) | differs (top bar + CTA) |
| Hero device | differs: canvas sequence of real footage in which scroll takes the product apart and back together | differs | differs (video scrub, turning shirt) | differs (type only) | differs (masked photo panel) |
| Act shape | differs: `scrub(sequence) > pin(lit words) > flow(reveals) > scrub(layers) > flow(collection) > pin(ring, then form)`, 6 acts, 13.2vh | differs | differs | differs (`pin > flow > pin > flow > flow`, 8vh) | differs (6 acts, pan rail, 17vh) |
| Close | differs: last pinned stage, ring of 88 then the form in the same frame | differs | differs (configurator) | differs (in-flow form) | differs (in-flow form) |
| Signature | differs | differs | differs (shatter on canvas vs real footage coming apart and back) | differs (braid) | differs (comb reveal) |
| **Total** | **5 of 6** | **5 of 6** | **6 of 6** | **6 of 6** | **5 of 6** |

Passes (needs 4 of 6 against every row).

## Verification (third clip, 10 October 2026)

Served from this folder at `http://localhost:4600`, Chromium from Playwright.

`shoot.mjs`, six samples per act:

- **Desktop 1440x900:** no dead scroll; every cue clears 4.5:1 at its worst
  frame. No console errors.
- **Phone 390x844:** same.
- **Reduced motion:** same; the hero scrubs the frames with the scroll, with
  no smoothing, push, dust or letter motion.

Page-local checks (`interact.mjs`, 23 of 23 passed): the name gathers on
arrival; Lenis is on and one wheel notch glides through 34 positions; at
hero progress 0.02, 0.42, 0.60 and 0.84 the canvas shows clip frames 0, 119,
161 and 232 (whole, apart, coming back, whole) and paints four different
pictures; the name tightens (396 px to 330 px); the wordmark docks after the
hero; the story words light with scroll; the three details wipe in; the
second watch shows clip frames 0, 66, 116, 169 and 191 at its progress 0.02,
0.3, 0.5, 0.8 and 0.98 and names Crystal, Dial, Movement, Case while each is
off the case; the edition's specs sit under its price; the ring lights 0, 41, 88 ticks and
the dial steps aside as the form arrives; "Join the waitlist" glides to the
end with the cursor in Name; validation and the honest "not connected"
message work; nothing reaches the URL; tab order is skip link, wordmark,
waitlist link, Name, Email, button, each with a visible gold ring.

**Performance, after "de luxe et performant".** The frames no longer load
with the page: the poster is frame 0 and is all the hero needs to open; the
other 72 files (4.6 MB) follow once the page has loaded, every eighth first,
then every fourth, then the rest, so the whole gesture works early and only
gets smoother. Frames are decoded off the main thread and only near where
the reader is (six ahead, three behind), then released: the full set decoded
would be over 500 MB. Details and the anatomy photo load lazily; the dust
canvas draws at 1x. Measured against the previous build (same harness,
headless Chromium, software rendering, so absolute desktop numbers are
pessimistic):

| | Before | After |
|---|---|---|
| Phone on slow 4G (1.6 Mbps, 150 ms): bytes before the load event | 5.5 MB | 0.5 MB |
| Same: load event | 29.9 s | 3.1 s |
| Same: watch on screen | 6.1 s | 2.8 s |
| Same: every eighth frame in (the gesture works end to end) | | 6.9 s |
| Phone, four fast passes through the hero: frame time p95 | 67.8 ms | 36.1 ms |
| Same: main-thread tasks over 50 ms | 45 | 0 |
| Desktop 2x, same passes: tasks over 50 ms | 326 | 175 |

**After "la montre ne bouge pas" (the watch does not move).** The fast path
had one way to fail silently: a frame download that never finishes left the
hero on its first frame for good. The loader now proves the path on the
first file and drops to plain images for good at the first refused, stalled
(15 s) or non-image download, or failed or slow (8 s) decode. Checked on a
phone viewport under five conditions (normal, decode refused, downloads
answered with a web page, downloads blocked, downloads that never finish):
the watch comes apart in all five, with the same pictures as the fast path.
Before the fix it stayed whole when downloads never finished.

**After "la montre reste figée" on a computer browser.** The most likely
cause on a desktop: the system's "reduce motion" setting (Windows animation
effects off, macOS Reduce motion), under which the hero only dissolved
between three stills. The frames now follow the scroll in that mode too.
Opening the page with `#debug` at the end of its link shows a small panel
(loading path, frames in, reduced motion, scroll position, hero progress,
clip frame) for a screenshot if the watch still does not move somewhere.

**After "dans la section artifacts ça bug" (thumbnail broken, page opens
badly).** The hero chose its phone composition by width alone (760 px and
under), so a short, wide frame (a gallery thumbnail, a side panel) put the
name and the first line across the watch. The hero now stacks only when its
screen is taller than wide; otherwise it keeps the side-by-side composition
down to 320x200: the case radius has no floor, the gap to the name scales,
the first line takes the width left of the watch and a size in proportion to
the name, the strap is kept clear of the corner link, and below 340 px of
height (thumbnails only) the corner links are left out. Checked at ten sizes
from 320x200 to 1280x800 and in portrait: nothing overlaps.

**After the questions of 12 October.** Renamed TIMELESS (eight letters; the
name animation now works from the letter count), the case spec reads "18k
yellow gold". Stacked screens keep the strap, as it comes out of the dark,
below the first line. Harness clean on desktop, phone and reduced motion;
23 of 23; the five loading failure modes still move the watch.

**After the fourth clip (14 October).** The code-drawn exploded view is gone;
act 4 is the second watch in layers. Its clip's blue-grey sweep is taken
down to the page's dark by estimating the sweep behind every pixel and
subtracting it (edges and glass keep no blue cast; a thin sharpening halo
along the arm is cleared; the alpha is smoothed so the source's compression
blocks do not show through the glass). The frame loader the hero uses is now
shared: the second sequence decodes near the reader the same way and loads
only when the reader is a screen and a half away. Specs moved under the
price. Harness clean on desktop, phone and reduced motion (the specs line
was first 3.8:1 on a phone over the ring, now in the full ink colour); 23 of
23; the hero's five loading failure modes still move the watch.

**Feel check, cold, one word per act:** wonder, stillness, closeness,
understanding, resolve. The watch now opens the page at its largest, alone
in the dark, so the peak and the signature are the same moment and the
loudest image on the sheet.

**Not verified:** a real phone and a real GPU (the numbers above are
headless), Safari and Firefox (both support the bitmap path; older browsers
fall back to plain images), and any real waitlist endpoint (none exists). A
known cosmetic overlap: as act 4 slides in, its heading passes under the
fixed wordmark in the bottom-left corner for a fraction of a screen.
