# PROPAGATE: brief

Interviewed through a click-through Q&A (in French) on 3 October 2026, plus two
supplied render clips. Answers below are verbatim where the client gave them.
Everything marked **Authored** was decided by the builder because the Q&A did
not cover it; the client can overrule any of it.

## Evidence

- `T-shirt_rotating_in_darkness_1080p_20261003151419.mov`: 1920x1080, 24fps,
  6.3s. Black oversized tee, back view turning to front view (about half a
  turn). Back print "PROPAGATE BEFORE ITS LATE" in slime-green drip lettering
  with small four-point stars and a dark red drop shadow; front carries a small
  "PROPAGATE" chest logo. A green light burst blooms behind it in the first
  half second; embers appear mid-turn.
- `i_dont_want_a_ultra-sharp_20261003150644.mov`: 1920x1080, 24fps, 5.4s. The
  same tee design with an ice-blue print and white drop shadow, dark blue
  vignette, same back-to-front turn, softer render.
- The print reads **ITS** with no apostrophe. Kept exactly as printed wherever
  the slogan is quoted; flagged to the client.
- Unknown and therefore **not stated anywhere on the page**: price, fabric,
  weight, size run, stock, shipping, store URL, launch date. Size buttons are
  placeholders; checkout is not connected.

## The eight topics

1. **Vibe.** Client: "Sombre et premium" ("Fond noir, lumière dramatique, gros
   titres"). Earlier in the session the client pointed at the PERKFORM demo
   (product in darkness, big headline left, rulers on the edges) as the kind of
   site they want. **Authored references:** a product photographed on a black
   sweep under one hard light; a horror-comic title card; an exploded-view
   diagram in a repair manual.
2. **The journey, in their words.** Client: "Vendre un produit", "J'ai mon
   produit" (the two clips). **Authored order:** see the shirt, hear the
   warning, take the shirt apart, put it back together in the other colour,
   turn it yourself and buy it.
3. **Energy curve.** **Authored:** dark and slow at the open, near silence
   before the peak, the loudest moment in the middle, calm and practical at the
   end.
4. **Feeling, and the one moment.** Client's chosen moment: "Explosion figée:
   le produit éclate en morceaux suspendus, puis se recompose." Feeling curve
   below.
5. **What no other site does.** Seeded by the client's moment; the signature
   move below.
6. **Range.** Client: "Sombre et premium". Premium-minimal on a dark ground,
   with the brand's own loud drip print allowed to be the one loud thing.
7. **One world or distinct scenes.** Client: "Scènes distinctes".
8. **Assets.** Client supplied two render clips; no logo file, no photos, no
   brand kit. Nothing is generated: there is no kie.ai key and the Higgsfield
   plan cannot generate images.

Other answers: action "Acheter"; language "Anglais"; name "PROPAGATE".

## Grammar: Turntable (new)

One physical object, walked around. Every scene is a different view of the same
thing: an angle, a scale, a state.

- **Fits:** a single product whose form is the argument (apparel, a sneaker, an
  object you would pick up).
- **Scroll feels like:** circling one object on a dark stage.
- **Nav:** a scene index naming the views, clickable, on the right edge. No
  wordmark-plus-CTA bar, no progress bar.
- **Hero:** the object already in view and already turning.
- **Close:** the object is handed over. The visitor turns it with their own
  hand, picks the colour and size, and the buy action sits in the object's
  label.
- **Forbids:** lifestyle or context imagery (only the object and its own words);
  card grids; pan rails; pinned crossfade type acts; spotlight; magnet; a
  persistent CTA in the chrome; any scene that shows neither the object nor its
  print.

Why the eight defined grammars lost: filmic one-shot is what both earlier
builds in this repo used (and the client asked for distinct scenes, not one
film); continuous world needs one unbroken journey and the client chose
distinct scenes; chaptered editorial and typographic poster bury the footage,
which is the best asset; live surface needs software; split stage would hold
both colourways side by side for the whole page and ban the single scrub
hero; gallery needs a range and there is one product in two colours; rhythmic
cutlist suits streetwear energy but bans the long pin the client's frozen
explosion needs, and the client asked for dark and premium, not loud.

## Journey

1. **See it:** the back of the tee in the dark, then it turns to face you.
2. **Hear it:** the slogan, alone, at billboard scale.
3. **Take it apart:** the tee bursts into pieces that hang in the air.
4. **Get it back:** the pieces fly home and the print turns blue as they land.
5. **Make it yours:** turn it yourself, choose colour and size, buy.

## Feeling curve

| Act | Feeling | What on screen causes it |
|---|---|---|
| 1 The tee | Intrigue | A black tee lit from behind, the warning on its back; the green light blooms under the first notch and the tee turns to face you (`scrub`) |
| 2 The warning | Held breath | Near-empty black, the slogan wiping down like a drip, one small line: Look closer (`reveal`) |
| 3 Exploded | Awe (peak) | The tee shatters into suspended pieces, labelled like a diagram, then rushes back together and the colour change spreads outward from the middle (bespoke `pin` + canvas) |
| 4 Your turn | Control, then resolve | The tee in your hand: drag to turn it, pick colour and size, buy (`flow` + pointer) |

No two adjacent acts share a feeling. Act 2 is the authored silence before the
peak: mostly empty screen on purpose, so the verification pass should not
treat it as dead scroll.

## The peak

> the T-shirt blew apart and the pieces just hung there, and when they snapped
> back together it was blue

Lives in act 3. It gets the largest span on the page (4.6vh against the hero's
2.6vh), the only bespoke code, and the quiet act directly before it.

## Tell-someone sentence

> It's the site where the T-shirt explodes into pieces that freeze in mid-air
> while you scroll, then snap back together in the other colour.

## Signature move

**The colour-change shatter.** The back of the tee is cut into Voronoi shards
on a canvas. Scroll blasts them outward in depth (near pieces grow, far pieces
dim), holds them in a slow bullet-time drift while three labels pin themselves
to real parts of the shirt, then flies them home. On the way back each shard
swaps green for blue a beat after its neighbour nearer the centre, so the new
colour visibly propagates across the shirt. Page-local JS reading the act's
progress; the engine is untouched.

## Score

| Act | Device | Span | Why this one |
|---|---|---|---|
| 1 The tee | `scrub` (green clip, square crop) + foreground spore plane | 2.6vh | The supplied footage is a turn; the wheel turning it is the strongest possible open |
| 2 The warning | `flow` + `reveal` (downward wipe) | natural (~1vh) | A wipe on type, quiet, short: silence before the drop |
| 3 Exploded | `pin` + bespoke canvas | 4.6vh | The peak: needs to hold while the hand drives the blast, the drift and the return |
| 4 Your turn | `flow` + pointer drag | natural (~1.1vh) | The page stops moving and the visitor takes over |

Four acts, four device families, one scrub, never the same device twice in a
row, about 9.3vh in total. Shorter than the 13.6-13.8vh band on purpose: the
product is one tee and the journey is complete.

## Verification (3 October 2026)

Run with the skill's `serve.mjs` + `shoot.mjs` against Playwright's Chromium
(`SCROLLCRAFT_CHROME=/opt/pw-browsers/chromium`). That Chromium has no H.264,
so the page's own codec check served the VP9 copies of the hero clip; real
Chrome, Safari, Edge and Firefox get the H.264 masters, which were not played
in this environment.

| Pass | Result |
|---|---|
| Desktop 1440x900, 26 samples | No dead scroll. Hero clip moves whenever on screen. First run: two diagram labels failed contrast over bright fragments (2.83:1, 2.02:1); fixed with dark label plates, rerun: every cue clears 4.5:1 at its worst frame |
| Phone 390x844 | No dead scroll, clip moves, all cues clear 4.5:1 |
| Reduced motion | No dead scroll, all cues clear 4.5:1. Hero holds the poster and fades to a front still; the exploded view is two stills with an opacity crossfade |
| Interactions at 1440, 390, 360 | Drag turns the tee (back to front), print toggle swaps frames and glow, Buy without size asks for one and focuses S, Buy with size reports that checkout is not connected. No page errors, no horizontal overflow |
| Keyboard | Skip link, wordmark, four scene links, hero CTA, turn slider, print and size radios, Buy. Returning focus to the hero CTA now rewinds the pinned hero to the frame where it is visible |
| Fonts | Google Fonts is blocked by this sandbox's proxy certificate; the self-hosted Unbounded and Geist load instead |

Not verified: a real phone (iOS video decode, Low Power Mode, touch), real
Chrome playing the H.264 file, and the page inside the claude.ai viewer.

## Feel check

| Act | Intended | Felt on the first full pass | Change |
|---|---|---|---|
| The tee | Intrigue | Intrigue, then "the turn ends nowhere": the front of the tee only arrived while the stage was sliding off | Retimed the clip so the front with the chest logo lands inside the pin, the last half turn slows down over the exit |
| The warning | Held breath | Held breath | none |
| Exploded | Awe | Debris rather than an exploded tee: pieces flew so far the shirt stopped reading | Spread cut by about two thirds, camera re-centred on the print, empty pieces hidden in flight |
| Your turn | Control, resolve | Control | none |

The peak is the largest change on the sheet and owns 4.6 of the page's 9.4
viewport-heights; the act before it is the quietest on the page; the last
screen holds the Buy button and the footer with nothing fading out.
