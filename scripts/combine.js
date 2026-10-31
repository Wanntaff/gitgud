const fs = require('fs');
const sharp = require('sharp');

const orangeSvg = fs.readFileSync('scripts/orange-4x.svg', 'utf8');
const blueSvg = fs.readFileSync('scripts/blue-4x.svg', 'utf8');

const orangePath = orangeSvg.match(/d="([^"]+)"/)[1];
const bluePath = blueSvg.match(/d="([^"]+)"/)[1];

const combinedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3580 1120" fill="none">
  <!-- Orange GITGUD Letters -->
  <path d="${orangePath}" fill="#E84A27" fill-rule="evenodd" />
  <!-- Blue BOARDGAME AND CAFE Letters -->
  <path d="${bluePath}" fill="#1B64B4" fill-rule="evenodd" />
</svg>`;

fs.writeFileSync('public/logo-4x.svg', combinedSvg);

sharp(Buffer.from(combinedSvg))
  .resize(895, 280)
  .png()
  .toFile('test-full-logo-4x.png')
  .then(() => console.log('Full logo 4x rendered!'));
