const sharp = require('sharp');
const potrace = require('potrace');
const fs = require('fs');

async function testHighResTrace() {
  const metadata = await sharp('public/logo-original.png').metadata();
  const scale = 4; // 4x is plenty (3580 x 1120)
  const targetW = metadata.width * scale;
  const targetH = metadata.height * scale;

  console.log('Upscaling to', targetW, targetH);

  const { data, info } = await sharp('public/logo-original.png')
    .resize(targetW, targetH, { kernel: 'lanczos3' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width, h = info.height;

  // Mask 1: Orange
  const orangeMask = Buffer.alloc(w * h * 4, 255);
  // Mask 2: Blue
  const blueMask = Buffer.alloc(w * h * 4, 255);

  for (let i = 0; i < w * h; i++) {
    const idx = i * 4;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];

    if (a > 50) {
      // Orange: high R, low B
      if (r > 140 && b < 100 && r > g + 30) {
        orangeMask[idx] = 0;
        orangeMask[idx + 1] = 0;
        orangeMask[idx + 2] = 0;
      }
      // Blue: high B, low R
      // Let's inspect: #1B64B4 -> r: 27, g: 100, b: 180
      if (b > 115 && r < 110 && b > r + 30) {
        blueMask[idx] = 0;
        blueMask[idx + 1] = 0;
        blueMask[idx + 2] = 0;
      }
    }
  }

  const orangePng = await sharp(orangeMask, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
  const bluePng = await sharp(blueMask, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();

  fs.writeFileSync('scripts/orange-mask-4x.png', orangePng);
  fs.writeFileSync('scripts/blue-mask-4x.png', bluePng);

  const trace = (buf, params) =>
    new Promise((resolve, reject) => {
      potrace.trace(buf, params, (err, svg) => {
        if (err) reject(err);
        else resolve(svg);
      });
    });

  console.log('Tracing orange...');
  const orangeSvg = await trace(orangePng, { turdSize: 20, optTolerance: 0.2 });
  console.log('Tracing blue...');
  const blueSvg = await trace(bluePng, { turdSize: 5, optTolerance: 0.15 });

  fs.writeFileSync('scripts/orange-4x.svg', orangeSvg);
  fs.writeFileSync('scripts/blue-4x.svg', blueSvg);

  console.log('Traced successfully! Orange:', orangeSvg.length, 'Blue:', blueSvg.length);
}

testHighResTrace().catch(console.error);
