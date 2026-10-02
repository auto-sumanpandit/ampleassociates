// Generates every brand asset from the official icon (public/brand/ample-associates-icon.svg).
// Run when the logo changes:  node scripts/generate-brand-assets.mjs
// Outputs (all committed):
//   public/brand/ample-associates-icon-dark.svg  icon for navy backgrounds (white cuts become navy)
//   public/brand/ample-associates-icon.png       512px PNG for the Organization schema logo
//   src/app/icon.svg, src/app/apple-icon.png, src/app/favicon.ico
//   public/og/ample-associates-og.png            1200x630 social share image
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const NAVY = "#070D26";
const icon = readFileSync("public/brand/ample-associates-icon.svg", "utf8");

// The artwork sits at x 88-385, y 80-358 of its 420 viewBox; this square crop centres it.
const tight = icon
  .replace(/width="\d+" height="\d+" viewBox="[^"]+"/, 'width="512" height="512" viewBox="76 64 321 321"')
  .replace(/<title[\s\S]*?<\/desc>\s*/, "");

// On navy, the white negative-space cuts must take the background colour.
writeFileSync("public/brand/ample-associates-icon-dark.svg", icon.replaceAll('fill="#ffffff"', `fill="${NAVY}"`));

// Favicon SVG: tight crop so the mark fills the tab icon.
writeFileSync("src/app/icon.svg", tight);

const png = (svg, size, background) =>
  sharp(Buffer.from(svg), { density: 300 })
    .resize(size, size, { fit: "contain", background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

// Schema logo (transparent) and Apple touch icon (white, with breathing room).
writeFileSync("public/brand/ample-associates-icon.png", await png(icon, 512));
const touch = await sharp({ create: { width: 180, height: 180, channels: 4, background: "#ffffff" } })
  .composite([{ input: await png(tight, 140), gravity: "center" }])
  .png()
  .toBuffer();
writeFileSync("src/app/apple-icon.png", touch);

// favicon.ico with PNG-encoded 16/32/48 entries.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(tight, s)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...entries, ...images]));

// Social share image in the site's navy and royal-blue style.
const darkIcon = readFileSync("public/brand/ample-associates-icon-dark.svg", "utf8")
  .replace(/width="\d+" height="\d+" viewBox="[^"]+"/, 'viewBox="76 64 321 321"')
  .replace(/<title[\s\S]*?<\/desc>\s*/, "")
  .replace(/^<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "");
const font = "Poppins, 'Segoe UI', Arial, sans-serif";
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${NAVY}"/><stop offset="100%" stop-color="#1A2350"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.25" r="0.6">
      <stop offset="0%" stop-color="#3D03FA" stop-opacity="0.45"/><stop offset="100%" stop-color="#3D03FA" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <path d="M0 630 L180 520 L380 570 L640 470 L820 540 L890 420 L940 470 L970 400 L1080 515 L1300 560 L1200 630 Z" fill="#ffffff" fill-opacity="0.05"/>
  <svg x="80" y="70" width="120" height="120" viewBox="76 64 321 321">${darkIcon}</svg>
  <text x="220" y="125" font-family="${font}" font-size="44" font-weight="700" letter-spacing="2" fill="#ffffff">AMPLE</text>
  <text x="222" y="165" font-family="${font}" font-size="20" font-weight="600" letter-spacing="9" fill="#5AB0F5">ASSOCIATES</text>
  <text x="80" y="330" font-family="${font}" font-size="76" font-weight="700" fill="#ffffff">Rooted in Nepal.</text>
  <text x="80" y="420" font-family="${font}" font-size="76" font-weight="300" fill="#C5C0FF">Growing from London.</text>
  <text x="80" y="500" font-family="${font}" font-size="26" fill="#A9C7FF">Education · College · Energy · Property Development · Financial Channel</text>
  <text x="80" y="565" font-family="${font}" font-size="24" fill="#94A3B8">Since 2009  ·  ampleassociates.com</text>
</svg>`;
writeFileSync("public/og/ample-associates-og.png", await sharp(Buffer.from(og)).png().toBuffer());

console.log("Brand assets written.");
