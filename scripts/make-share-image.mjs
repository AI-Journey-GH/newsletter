import sharp from 'sharp';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/make-share-image.mjs <poster image> <output.jpg>');
  process.exit(1);
}

const W = 1200;
const H = 630;
const posterH = 540;
const radius = 14;

const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="78%" cy="50%" r="60%">
      <stop offset="0" stop-color="#14365a"/>
      <stop offset="1" stop-color="#0b1a2b"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#7cc8d4"/>
</svg>`);

const poster = sharp(input).rotate().resize({ height: posterH });
const { width: posterW } = await poster.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${posterW}" height="${posterH}"><rect width="${posterW}" height="${posterH}" rx="${radius}" ry="${radius}"/></svg>`);
const roundedPoster = await poster.composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();

const logoSize = 420;
const logo = await sharp('public/logo/logo-light.png').resize({ width: logoSize }).toBuffer();
const posterLeft = W - posterW - 80;
const logoLeft = Math.round((posterLeft - logoSize) / 2);

await sharp(background)
  .composite([
    { input: logo, left: logoLeft, top: Math.round((H - logoSize) / 2) - 4 },
    { input: roundedPoster, left: posterLeft, top: Math.round((H - 8 - posterH) / 2) },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(output);

console.log(`Saved ${output}`);
