import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_inspect_h1_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9339;
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

  for (const w of [1024, 1280, 1366, 1440, 1536, 1920]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 620, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 300));
    const r = await send('Runtime.evaluate', {
      expression: `(() => {
        const hero = document.getElementById('hero');
        const g = hero.querySelector('.grid');
        const leftCol = g.children[0];
        const rightCol = g.children[1];
        const h1 = hero.querySelector('h1');
        const statsContainer = hero.querySelector('[data-testid="hero-stats"]');
        const stats = statsContainer ? Array.from(statsContainer.children).map(d => ({
          text: d.children[0]?.innerText,
          scrollWidth: d.children[0]?.scrollWidth,
          clientWidth: d.children[0]?.clientWidth,
          containerWidth: Math.round(d.getBoundingClientRect().width),
          hasOverflow: (d.children[0]?.scrollWidth || 0) > (d.getBoundingClientRect().width + 1)
        })) : [];

        return {
          width: ${w},
          h1Height: Math.round(h1.getBoundingClientRect().height),
          h1Text: h1.innerText,
          leftColH: Math.round(leftCol.getBoundingClientRect().height),
          rightColH: Math.round(rightCol.getBoundingClientRect().height),
          heroH: Math.round(hero.getBoundingClientRect().height),
          heroBottom: Math.round(hero.offsetTop + hero.offsetHeight),
          fitsAboveTheFold: Math.round(hero.offsetTop + hero.offsetHeight) <= 620,
          stats
        };
      })()`,
      returnByValue: true
    });
    console.log(JSON.stringify(r.result.value, null, 2));
  }

  ws.close();
  chrome.kill();
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {}
}

main().catch(console.error);
