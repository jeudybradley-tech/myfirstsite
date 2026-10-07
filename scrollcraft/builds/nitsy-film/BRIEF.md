# NITSY FASHION, le film: brief

Asked 7 October 2026: "film continu" for Nitsy Fashion, with the client's own
images. Client supplied five photos in chat.

- Photo 4 (woman on a sofa reading a flyer) carries another company's name and
  web address on the flyer. **Not used.**
- The other four look like inspiration or stock images (studio shoots on a
  brown backdrop). They are used as placeholders; the client was told to
  replace them with the salon's own work before any public launch.
- Services shown are read from the photos (extensions, straightening,
  highlights, styling) and priced "sur devis": placeholders to confirm.
- Contact form is not connected; it says so on submit.

## Grammar: Filmic one-shot (chosen by the client)
Fixed minimal bar (wordmark + Rendez-vous). Four photographs are four shots of
one film, each slowly pushed into by the scroll on a ground matched to the
photos' own brown backdrop.

## Signature move: le coup de peigne
At the peak the consultation shot is combed away: the result shot appears
through teeth-like stripes that widen with scroll, while the camera pulls back
from the hair to reveal the whole team.

## Feeling curve
| Act | Feeling | Cause |
|---|---|---|
| 1 Hands at work | Allure | slow push into the stylist's hands |
| 2 Consultation → result (peak) | Reveal | the comb wipe and the pull-back |
| 3 The hair | Trust | extensions in hand, the service list |
| 4 Contact | Ease | short form on a quiet ground |

## Verification
shoot.mjs desktop, phone 390, reduced motion: no dead scroll. Phone run showed
two thin-contrast cues over photos (4.37:1, 3.63:1); fixed with a bottom
scrim, rerun clean.

Fingerprint: shares grammar and nav with `maison-jeudy` and `alba`; differs on
hero (photo push-in), shape (pin > pin > pin > flow, ~9vh), close (in-flow
form) and signature: 4 of 6 against each. Differs 5+ against `propagate` and
`nitsy`.

## Update: opening clip (7 October 2026)
The client sent `Woman_smiling_in_hair_salon_20261006213042.mp4` (1920x1080,
10s, one slow push-in, she turns and smiles) and a still of a client seen from
behind in a salon. Both look AI-generated; they are used as atmosphere, not as
"our work". The clip is now a `scrub` hero (2.8vh, dwell 0.25) with a second
beat on the smile ("Le moment où tu te reconnais."), followed by a full-frame
push into the salon still. Phone gets a portrait crop of the clip; VP9 copies
serve browsers without H.264. Shape now `scrub > pin > pin > pin > flow`,
11.6vh. Harness desktop and phone: no dead scroll, clip moves whenever on
screen, every cue clears 4.5:1.

## Update: Instagram (7 October 2026)
Client Q&A: real services are pose de mèches / tissage, lissage, couleur / reflets, tresses; requests via Instagram (@salon_de_coiffure_nitsy); prices to show "à partir de" and an address are coming. The contact form is replaced by an Instagram DM call to action; "Rendez-vous" in the bar opens the profile. Prices still read "sur devis" until the client sends them.

## Update: the salon scene (7 October 2026)
Client: "je veux rendre cette partie plus intéressante". The salon still is no
longer a slow push. The pinned act (2.8vh) now travels sideways across the
full-resolution frame, from the back of the client's head to her reflection in
the mirror, while a near plane of gold light halos drifts past on parallax. Two
copy beats: "Installe-toi. Rien ne presse." then, once the reflection is in
view, "Et regarde-toi changer." Desktop uses a 175vw-wide frame; phone uses a
full-height frame and the same travel.

## Update: she turns around (7 October 2026)
Client: "je veux la femme tournée de l'arrière vers l'avant" and sent
`Woman_smiling_in_salon_chair_20261006214433_2.mov` (1920x1080, 24fps, 3.4s,
AI-generated: the camera circles a client from behind until she faces the lens
and smiles). The salon still is replaced by this clip as a second `scrub` act
(3vh, dwell 0.2), encoded with `encode.sh` (desktop gop 8; phone a centred 9:16
crop, gop 4) plus VP9 copies. The gold halo plane stays in front. Beats:
"Installe-toi. Rien ne presse." from behind, "Puis retourne-toi. C'est toi."
once she faces us. Shape now `scrub > scrub > pin > pin > flow`.

## Update: logo and typewriter opening (7 October 2026)
Client sent a logo reference ("NITSY FASHION" in a heavy geometric sans, pink
outlined face with a halftone fill, stepped grey 3D extrusion, on black) and
asked for it with a typewriter animation when the page opens. Built in CSS
with Montserrat 900 (self-hosted copy plus Google Fonts): the face is the
text with a pink stroke and a dot pattern clipped to the glyphs; the extrusion
is a `::before` copy with stacked alternating black/grey text-shadows. On
load a black screen types the name letter by letter with a pink caret, holds,
then the logo flies into the bar while the black fades to the hero. Any
wheel, touch, key or click skips it; reduced motion shows it whole and fades;
a CSS failsafe hides the overlay after 6 s if the script never runs. At bar
size the halftone turns to mush, so the bar logo has a solid pink face.
Harness desktop and phone: no dead scroll, both clips move, all cues 4.5:1+.
Follow-up: client asked for the opening logo to be pink like the bar logo, so
both now use the solid pink face (the halftone is gone everywhere).
Follow-up: "NITSY" is white and "FASHION" pink, in the opening and in the bar.
Follow-up: body text switched from Geist to Inter at the client's request (self-hosted variable Inter plus Google Fonts); headings stay Instrument Serif, logo Montserrat.
