const sharp = require('sharp');
const path = require('path');

async function processImage() {
  const input = path.join(__dirname, '../public/games/root-cover.png');
  const meta = await sharp(input).metadata();
  console.log('Original dimensions:', meta.width, meta.height);

  // We can create a crisp square thumbnail (e.g. 256x256) focusing on the box cover
  // The box has the front face from roughly x: 45, y: 30 to width: 950, height: 850
  // Let's create:
  // 1. root.webp (crisp webp for fast Next.js loading)
  // 2. root-cover.jpg (standard high quality jpeg fallback)
  
  // Also we can make a square crop of the front face or fit inside square
  await sharp(input)
    .resize(256, 256, { fit: 'cover', position: 'center' })
    .webp({ quality: 90 })
    .toFile(path.join(__dirname, '../public/games/root.webp'));

  await sharp(input)
    .resize(256, 256, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 92 })
    .toFile(path.join(__dirname, '../public/games/root-cover.jpg'));

  console.log('Generated root.webp and root-cover.jpg successfully!');
}

processImage().catch(console.error);
