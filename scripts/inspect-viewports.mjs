import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_inspect_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9335;
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
    console.error('Failed to get chrome tab on port', port);
    chrome.kill();
    return;
  }

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const res = JSON.parse(event.data);
        if (res.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(res.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => setTimeout(r, 2000));

  const viewports = [
    { name: '1024x768 (typical innerHeight ~620)', width: 1024, height: 620 },
    { name: '1280x720 (typical innerHeight ~600)', width: 1280, height: 600 },
    { name: '1280x800 (typical innerHeight ~680)', width: 1280, height: 680 },
    { name: '1366x768 (tight innerHeight 600)', width: 1366, height: 600 },
    { name: '1366x768 (typical innerHeight 620)', width: 1366, height: 620 },
    { name: '1366x768 (typical innerHeight 660)', width: 1366, height: 660 },
    { name: '1536x864 (typical innerHeight 720)', width: 1536, height: 720 },
    { name: '1920x1080 (typical innerHeight 920)', width: 1920, height: 920 },
  ];

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 500));

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const hero = document.getElementById('hero');
        const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
        const h1 = hero ? hero.querySelector('h1') : null;
        const stats = hero ? Array.from(hero.querySelectorAll('.grid-cols-3 > div')).map(d => ({
          val: d.children[0]?.innerText,
          label: d.children[1]?.innerText,
          valWidth: Math.round(d.children[0]?.getBoundingClientRect().width),
          containerWidth: Math.round(d.getBoundingClientRect().width),
          lines: d.children[0]?.getClientRects().length
        })) : [];

        const soloCard = hero ? hero.querySelector('.bg-white.border-l-4') : null;
        const soloBottom = soloCard ? soloCard.getBoundingClientRect().bottom : 0;

        return {
          windowInnerHeight: window.innerHeight,
          heroBottom,
          fitsAboveTheFold: heroBottom <= window.innerHeight,
          overflow: Math.round(heroBottom - window.innerHeight),
          soloBottom,
          soloFits: soloBottom <= window.innerHeight,
          h1Lines: h1 ? h1.getClientRects().length : 0,
          stats
        };
      })()`,
      returnByValue: true
    });

    console.log(`\n=== Viewport: ${vp.name} ===`);
    console.log(JSON.stringify(evalRes.result?.value, null, 2));

    const screenshot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: vp.width, height: vp.height, scale: 1 }
    });
    if (screenshot && screenshot.data) {
      const imgPath = path.join(process.cwd(), 'public', `test-viewport-${vp.width}x${vp.height}.png`);
      fs.writeFileSync(imgPath, Buffer.from(screenshot.data, 'base64'));
    }
  }

  ws.close();
  chrome.kill();
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {}
}

main().catch(console.error);
