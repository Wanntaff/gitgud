const sharp = require('sharp');
const fs = require('fs');

async function buildLogos() {
  const origPath = 'C:/Users/HYPE AMD/.gemini/antigravity/brain/659fb5f9-a1f1-4691-9944-c18f2f356e6d/.user_uploaded/media_1793365007877_9bc65461.png';
  const { data, info } = await sharp(origPath).raw().toBuffer({ resolveWithObject: true });
  
  const bgR = 231, bgG = 232, bgB = 234;
  
  // 1. Transparent clean logo with vibrant orange and readable sky-blue text
  const transparentData = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const idx = i * 4;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const dist = Math.hypot(r - bgR, g - bgG, b - bgB);
    
    let a = 0;
    if (dist > 35) a = 255;
    else if (dist > 8) a = Math.round(((dist - 8) / (35 - 8)) * 255);
    
    // Check if blue text (high B, low R)
    if (a > 20 && b > r + 30) {
      // Sky blue #5BB5F8 for crisp contrast against dark navbar
      transparentData[idx] = 91;
      transparentData[idx+1] = 181;
      transparentData[idx+2] = 248;
    } else {
      transparentData[idx] = r;
      transparentData[idx+1] = g;
      transparentData[idx+2] = b;
    }
    transparentData[idx+3] = a;
  }
  
  // Crop logo: x: 65, y: 375, width: 895, height: 280
  const croppedLogo = await sharp(transparentData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: 65, top: 375, width: 895, height: 280 })
    .png()
    .toBuffer();
  fs.writeFileSync('public/logo.png', croppedLogo);
  console.log('Saved public/logo.png');

  // Also create original color transparent logo (with original navy blue #2364B8)
  const origColorData = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const idx = i * 4;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    const dist = Math.hypot(r - bgR, g - bgG, b - bgB);
    let a = 0;
    if (dist > 35) a = 255;
    else if (dist > 8) a = Math.round(((dist - 8) / (35 - 8)) * 255);
    origColorData[idx] = r;
    origColorData[idx+1] = g;
    origColorData[idx+2] = b;
    origColorData[idx+3] = a;
  }
  const croppedOrig = await sharp(origColorData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: 65, top: 375, width: 895, height: 280 })
    .png()
    .toBuffer();
  fs.writeFileSync('public/logo-original.png', croppedOrig);
  console.log('Saved public/logo-original.png');
  
  // 2. High-res Favicon / App Icon (192x192) featuring the stylized 'G' monogram from the logo
  const gPng = await sharp(origColorData, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: 75, top: 395, width: 140, height: 190 })
    .resize({ height: 128 })
    .png()
    .toBuffer();
    
  const iconRaw = Buffer.alloc(192 * 192 * 4);
  const radius = 36;
  const borderWidth = 5;
  for (let y = 0; y < 192; y++) {
    for (let x = 0; x < 192; x++) {
      const idx = (y * 192 + x) * 4;
      const dx = Math.max(0, Math.max(radius - x, x - (191 - radius)));
      const dy = Math.max(0, Math.max(radius - y, y - (191 - radius)));
      const dist = Math.hypot(dx, dy);
      if (dist <= radius) {
        if (x < borderWidth || x >= 192 - borderWidth || y < borderWidth || y >= 192 - borderWidth || (dist >= radius - borderWidth)) {
          // Border #F04C23
          iconRaw[idx] = 240;
          iconRaw[idx+1] = 76;
          iconRaw[idx+2] = 35;
          iconRaw[idx+3] = 255;
        } else {
          // Fill #151B26
          iconRaw[idx] = 21;
          iconRaw[idx+1] = 27;
          iconRaw[idx+2] = 38;
          iconRaw[idx+3] = 255;
        }
      } else {
        iconRaw[idx] = 0;
        iconRaw[idx+1] = 0;
        iconRaw[idx+2] = 0;
        iconRaw[idx+3] = 0;
      }
    }
  }
  
  const iconBase = await sharp(iconRaw, { raw: { width: 192, height: 192, channels: 4 } }).png().toBuffer();
  
  const icon = await sharp(iconBase)
    .composite([
      { input: gPng, gravity: 'center' }
    ]).png().toBuffer();
  
  fs.writeFileSync('public/icon.png', icon);
  fs.writeFileSync('public/favicon.ico', icon);
  console.log('Saved public/icon.png and public/favicon.ico successfully!');
}

buildLogos().catch(console.error);
