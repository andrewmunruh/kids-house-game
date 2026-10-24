# Audio licenses

## Ambient music (M1 stereo / record player / radio / music box)
- **Source:** `src/ambientMusic.ts`. ORIGINAL procedural music written for this project. Notes are synthesized live
  with the WebAudio API (oscillators + gain envelopes). The melody is four original phrases in C-major pentatonic with a soft bass.
  No samples, recordings, MIDI files, or third-party melodies are used or shipped.
- **License:** CC0 1.0 Universal (public domain dedication), https://creativecommons.org/publicdomain/zero/1.0/
- **Behavior:** soft volume. It is silent when the game's sound is muted or the page is hidden. Speakers loop while on.
  The music box plays a softer version and stops by itself after about 20s, on each iPad only (nothing is synced).

## Existing sound effects
Unchanged by M1. They are synthesized in code as before (`sfx`).

## Polish batch 2

No new audio files and no new third-party sounds. The map, park and ranch cues reuse the existing original WebAudio sfx (swish, pop, drop, boing) at their existing volume. They respect mute.
