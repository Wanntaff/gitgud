import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9333;
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--remote-allow-origins=*',
    `--user-data-dir=${tmpDir}`,
    '--no-sandbox',
    '--disable-gpu',
    'http://localhost:3001'
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
          tab = list.find(t => t.url.includes('localhost:3001')) || list[0];
          if (tab && tab.webSocketDebuggerUrl) break;
        }
      }
    } catch (e) {
      // wait
    }
  }

  if (!tab) {
    console.error('Failed to get chrome tab on port', port);
    chrome.kill();
    return;
  }

  console.log('Connected to tab:', tab.webSocketDebuggerUrl);
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

  // Allow hydration
  await new Promise(r => setTimeout(r, 2000));

  const viewports = [
    { name: '1366x768 Standard Laptop (typical innerHeight ~620px)', width: 1366, height: 620 },
    { name: '1366x768 Full screen (innerHeight 768px)', width: 1366, height: 768 },
    { name: '1920x1080 Standard Desktop (innerHeight 920px)', width: 1920, height: 920 },
    { name: '1920x1080 Full screen (innerHeight 1080px)', width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 600));

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const topbar = document.querySelector('main > div:first-child');
        const navbar = document.querySelector('nav');
        const hero = document.getElementById('hero');
        const heroGrid = hero ? hero.querySelector('.grid') : null;
        const leftCol = heroGrid ? heroGrid.children[0] : null;
        const rightCol = heroGrid ? heroGrid.children[1] : null;

        const topbarRect = topbar ? topbar.getBoundingClientRect() : null;
        const navbarRect = navbar ? navbar.getBoundingClientRect() : null;
        const heroRect = hero ? hero.getBoundingClientRect() : null;
        const heroBottomFromPageTop = hero ? hero.offsetTop + hero.offsetHeight : null;

        const h1 = hero ? hero.querySelector('h1') : null;
        const h1Style = h1 ? window.getComputedStyle(h1) : null;
        const h1Lines = h1 ? Array.from(h1.getClientRects()).map(r => ({ width: r.width, height: r.height, top: r.top })) : [];
        const h1Text = h1 ? h1.innerText : '';

        return {
          windowInnerHeight: window.innerHeight,
          topbarHeight: topbarRect ? topbarRect.height : 0,
          navbarHeight: navbarRect ? navbarRect.height : 0,
          heroHeight: heroRect ? heroRect.height : 0,
          heroBottomFromPageTop,
          overflowPixels: Math.round(heroBottomFromPageTop - window.innerHeight),
          fitsAboveTheFold: heroBottomFromPageTop <= window.innerHeight,
          leftColHeight: leftCol ? Math.round(leftCol.getBoundingClientRect().height) : 0,
          rightColHeight: rightCol ? Math.round(rightCol.getBoundingClientRect().height) : 0,
          h1Height: h1 ? Math.round(h1.getBoundingClientRect().height) : 0,
          h1FontSize: h1Style ? h1Style.fontSize : '',
          h1LineHeight: h1Style ? h1Style.lineHeight : '',
          h1LinesCount: h1Lines.length,
          h1Lines,
          h1Text
        };
      })()`,
      returnByValue: true
    });

    console.log(`\n=== Viewport: ${vp.name} ===`);
    console.log(JSON.stringify(evalRes.result?.value ?? evalRes, null, 2));
  }

  ws.close();
  chrome.kill();
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {}
}

main().catch(console.error);
