import fs from 'fs';
import path from 'path';

async function main() {
  const url = 'https://ledergames.com/cdn/shop/products/1-RootGameBox-Edit-Web.png?v=1595294735';
  console.log('Fetching Root cover from:', url);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status} ${res.statusText}`);
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const gamesDir = path.join(process.cwd(), 'public', 'games');
    if (!fs.existsSync(gamesDir)) {
      fs.mkdirSync(gamesDir, { recursive: true });
    }
    const outputPath = path.join(gamesDir, 'root-cover.png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Saved ${buffer.length} bytes to ${outputPath}`);
  } catch (err) {
    console.error('Fetch failed:', err);
    process.exit(1);
  }
}

main();
