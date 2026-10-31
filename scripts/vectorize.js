const fs = require('fs');
const sharp = require('sharp');
const potrace = require('potrace');

async function traceLogo() {
  const { data, info } = await sharp('public/logo-original.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;

  // Mask 1: Orange (GITGUD)
  const orangeRgba = Buffer.alloc(w * h * 4);
  // Mask 2: Blue (BOARDGAME AND CAFE)
  const blueRgba = Buffer.alloc(w * h * 4);

  for (let i = 0; i < w * h; i++) {
    const idx = i * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    const a = data[idx + 3];

    // White background by default
    orangeRgba[idx] = 255;
    orangeRgba[idx + 1] = 255;
    orangeRgba[idx + 2] = 255;
    orangeRgba[idx + 3] = 255;

    blueRgba[idx] = 255;
    blueRgba[idx + 1] = 255;
    blueRgba[idx + 2] = 255;
    blueRgba[idx + 3] = 255;

    if (a > 60) {
      if (r > 140 && b < 100) {
        // Orange pixels -> black in mask
        orangeRgba[idx] = 0;
        orangeRgba[idx + 1] = 0;
        orangeRgba[idx + 2] = 0;
      } else if (b > 110 && r < 120) {
        // Blue pixels -> black in mask
        blueRgba[idx] = 0;
        blueRgba[idx + 1] = 0;
        blueRgba[idx + 2] = 0;
      }
    }
  }

  const orangePng = await sharp(orangeRgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
  const bluePng = await sharp(blueRgba, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();

  fs.writeFileSync('scripts/orange-mask.png', orangePng);
  fs.writeFileSync('scripts/blue-mask.png', bluePng);

  const tracePromise = (buf, params) =>
    new Promise((resolve, reject) => {
      potrace.trace(buf, params, (err, svg) => {
        if (err) reject(err);
        else resolve(svg);
      });
    });

  const getPathPromise = (buf, params) =>
    new Promise((resolve, reject) => {
      potrace.Posterizer ? null : null;
      const trace = new potrace.Potrace(params);
      trace.loadImage(buf, (err) => {
        if (err) reject(err);
        else resolve(trace.getPathTag());
      });
    });

  const orangeSvg = await tracePromise(orangePng, { turdSize: 3, optTolerance: 0.2 });
  const blueSvg = await tracePromise(bluePng, { turdSize: 2, optTolerance: 0.2 });

  fs.writeFileSync('scripts/orange.svg', orangeSvg);
  fs.writeFileSync('scripts/blue.svg', blueSvg);

  console.log('Orange SVG length:', orangeSvg.length);
  console.log('Blue SVG length:', blueSvg.length);
}

traceLogo().catch(console.error);
