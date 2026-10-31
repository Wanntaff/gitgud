import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_final_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9430;
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--remote-allow-origins=*',
    `--user-data-dir=${tmpDir}`,
    '--no-sandbox',
    '--disable-gpu',
    'http://localhost:3000'
  ], { stdio: 'ignore' });

  let tab = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 250));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (res.ok) {
        const text = await res.text();
        if (text) {
          const list = JSON.parse(text);
          tab = list.find(t => t.url.includes('localhost')) || list[0];
          if (tab && tab.webSocketDebuggerUrl) break;
        }
      }
    } catch (e) {}
  }

  if (!tab) {
    chrome.kill();
    console.error('Failed to connect to chrome tab');
    return;
  }
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const msgId = id++;
    const handler = (e) => {
      const data = JSON.parse(e.data);
      if (data.id === msgId) { ws.removeEventListener('message', handler); res(data.result); }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => setTimeout(r, 2000));

  const viewports = [
    { w: 1920, h: 1080, name: 'desktop-1920x1080' },
    { w: 1366, h: 768, name: 'laptop-1366x768' },
    { w: 1024, h: 768, name: 'compact-1024x768' },
    { w: 768, h: 1024, name: 'tablet-768x1024' },
    { w: 375, h: 812, name: 'mobile-375x812' }
  ];

  console.log('=== FINAL DEEP VERIFICATION RUN ===\n');

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.w,
      height: vp.h,
      deviceScaleFactor: 1,
      mobile: vp.w < 768
    });
    await new Promise(r => setTimeout(r, 300));

    // Evaluate comprehensive page metrics
    const evalData = await send('Runtime.evaluate', {
      expression: `(() => {
        const hero = document.getElementById('hero');
        const h1 = hero.querySelector('h1');
        const stats = hero.querySelector('[data-testid=\"hero-stats\"]');
        const about = document.getElementById('about');
        const games = document.getElementById('games');

        const heroRect = hero.getBoundingClientRect();
        const statsRect = stats.getBoundingClientRect();
        const aboutRect = about ? about.getBoundingClientRect() : null;

        // Headings
        const h1Px = parseFloat(getComputedStyle(h1).fontSize);
        const aboutH2Px = about ? parseFloat(getComputedStyle(about.querySelector('h2')).fontSize) : 0;
        const gamesH2Px = games ? parseFloat(getComputedStyle(games.querySelector('h2')).fontSize) : 0;
        const cardH3Px = about ? parseFloat(getComputedStyle(about.querySelector('h3')).fontSize) : 0;

        // 24 Jam text
        const statElements = Array.from(stats.children);
        const stat24 = statElements[1];
        const num24 = stat24 ? stat24.children[0] : null;
        const num24Rects = num24 ? num24.getClientRects().length : 0;

        const peekingPx = aboutRect ? Math.max(0, window.innerHeight - aboutRect.top) : 0;

        return {
          viewport: '${vp.name}',
          h1FontSize: h1Px + 'px',
          aboutH2FontSize: aboutH2Px + 'px',
          gamesH2FontSize: gamesH2Px + 'px',
          cardH3FontSize: cardH3Px + 'px',
          hierarchyValid: (h1Px > aboutH2Px) && (aboutH2Px > cardH3Px),
          h1MinusH2: (h1Px - aboutH2Px).toFixed(1) + 'px',
          h2MinusH3: (aboutH2Px - cardH3Px).toFixed(1) + 'px',
          heroHeight: Math.round(heroRect.height),
          aboutTop: aboutRect ? Math.round(aboutRect.top) : null,
          windowH: window.innerHeight,
          peekingPx: Math.round(peekingPx * 10) / 10,
          statsVisible: statsRect.bottom <= window.innerHeight,
          stat24Lines: num24Rects
        };
      })()`,
      returnByValue: true
    });

    console.log(`[${vp.name}]`);
    console.log(JSON.stringify(evalData.result.value, null, 2));

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: vp.w, height: vp.h, scale: 1 }
    });
    const outFile = path.join(process.cwd(), `final-${vp.name}.png`);
    fs.writeFileSync(outFile, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${outFile}\n`);
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
