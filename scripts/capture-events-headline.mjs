import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_events_multitest_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9465;
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--remote-allow-origins=*',
    `--user-data-dir=${tmpDir}`,
    '--no-sandbox',
    '--disable-gpu',
    'http://localhost:3000/#events'
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

  await send('Page.enable');
  await send('Runtime.enable');

  const widths = [1024, 1150, 1280, 1366, 1440];
  for (const w of widths) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false
    });
    await new Promise(r => setTimeout(r, 400));

    const info = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const h2 = document.querySelector('#events h2');
          if (!h2) return { error: 'No h2' };
          const rect = h2.getBoundingClientRect();
          const range = document.createRange();
          range.selectNodeContents(h2);
          const rects = Array.from(range.getClientRects());
          return {
            lines: rects.length,
            rects: rects.map(r => ({ width: Math.round(r.width), height: Math.round(r.height) }))
          };
        })()
      `,
      returnByValue: true
    });
    console.log(`Width ${w}px -> Lines:`, info.result?.value?.lines, info.result?.value?.rects);
  }

  // Capture screenshot at 1280px (typical laptop with scaling)
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false
  });
  await new Promise(r => setTimeout(r, 500));

  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.getElementById('events');
        if (el) el.scrollIntoView({ block: 'start' });
      })()
    `
  });
  await new Promise(r => setTimeout(r, 600));

  const shot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scripts/events-after-fix.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved scripts/events-after-fix.png');

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
