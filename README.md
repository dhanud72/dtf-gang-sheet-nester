# Gang Sheet Nester

**▶ Use it: https://dhanud72.github.io/dtf-gang-sheet-nester/tool.html**
**📖 Artwork guide: https://dhanud72.github.io/dtf-gang-sheet-nester/**

A single-file web tool for DTF transfer printing. Open the link, or download `tool.html` and open it in Chrome. No install, no server, no sign-up.

The repo is two files: `tool.html` is the whole application, and `index.html` is a written guide to preparing DTF artwork that links to it.

**Your artwork never leaves your machine.** The trimming, nesting, PSD writing and resizing all happen in your browser — there is no upload and no back end. The hosted page carries an ad strip that loads from Google; your files play no part in it, and blocking it changes nothing about how the tool works. Save `index.html` locally and it runs fully offline.

Free and MIT licensed. Built by **Sangeetha Arts & Sculptures**, a DTF transfer printer in Bengaluru.

## Two tools

### Gang sheet
Drop the PNGs for a job, set a size and quantity per design, and it nests them into the roll and exports a **layered PSD** at the right DPI.

- Transparent edges are trimmed automatically, which is the single biggest source of wasted film
- One layer per sticker, named, so the operator can nudge anything by hand
- Live fill %, film used, and order value in ₹
- Splits automatically across numbered sheets when a job runs past the length limit
- **Job sheet** button exports a CSV of the run: designs, sizes, quantities, prices, resolution, which sheet each piece landed on

### Resizer
Pick one size, drop in many PNGs, get them all back resized — as a zip or as loose files.

Each output PNG carries a `pHYs` chunk, so it opens at its true physical size in Photoshop instead of at 72 DPI.

## Sizing

A size tier is a **box the artwork fits inside** — nothing is ever stretched or cropped. The longest side reaches the number ordered and the other stays proportional, so a 3:1 design at 4 × 4 comes out 4 × 1.33 in. Non-square paper sizes (A5/A4/A3) rotate to match the artwork, so a landscape design ordered as A4 gets the full 11.7 in.

## Filenames do the typing

The size can't be inferred from an image — the same PNG sells at any tier — so it's read from the filename when it's there:

| Filename | Result |
|---|---|
| `luffy_4x4.png` | 4 × 4 in |
| `panda A4.png` | A4 |
| `band_a5.png` | A5 |
| `sunset a5 qty12.png` | A5, quantity 12 |

Quantity needs an explicit `qty` — a bare `x` is ambiguous with the size, and guessing wrong would silently multiply a customer's order.

## Settings worth knowing

- **Mirror the sheet for transfer** — DTF prints face-down. Leave it off if your RIP already mirrors; turn it on if it doesn't.
- **Spread copies of the same design apart** — guards against a dropped nozzle ruining every copy in one band. Costs roughly 16% more film, so it is off by default.
- **Pad canvas to the exact size** (Resizer) — off gives tight artwork, on gives a true 4 × 4 canvas with transparent margins.
- **Save loose files, not a zip** (Resizer) — Windows shows no thumbnails for files inside a zip.

Roll width, DPI, gap and margin are remembered between sessions.

## Limits

A PSD cannot exceed **30,000 px**, which is 100 inches at 300 DPI. Longer jobs split into numbered sheets automatically. Lower the DPI for longer single sheets.

Chrome (or Edge). Firefox and Safari are untested.

## Using your own prices

The size tiers and prices in the header are the ones this shop sells at, in rupees. To use your own, edit the `PRESETS` array near the top of the `<script>` block in `index.html`:

```js
const PRESETS = [
  { key:'2x2', label:'2 × 2 in', w:2, h:2, price:20 },
  ...
];
```

`w` and `h` are inches, `price` is per piece. Set `price:0` to hide the money columns entirely.

## Status

Output is verified structurally — the PSD is parsed back byte by byte, packing is proved free of overlaps across randomised jobs at a range of roll widths and resolutions, and mirroring is proved pixel-exact over ~150,000 sampled pixels.

**It has not yet been opened in real Photoshop or a production RIP.** Run one sheet and check it before trusting it on paid work. If something comes out wrong, please open an issue with the roll width, DPI and a description — that feedback is the fastest way to make this solid for everyone.

## Contributing

Issues and pull requests welcome. It is deliberately one dependency-free HTML file; please keep it that way — no build step, no npm, no CDN.

The most useful thing anyone could add is **true-shape nesting**: artwork currently packs as bounding rectangles, so round and irregular stickers leave roughly 10–20% of the film unused. The packer already runs several strategies and keeps whichever uses least film, so a shape-aware placer can be added alongside the existing ones without risking the current results.

## Licence

MIT — see [LICENSE](LICENSE).
