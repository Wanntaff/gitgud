import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_debug_overflow_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9394;
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

  if (!tab) { chrome.kill(); return; }
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

  await new Promise(r => setTimeout(r, 1500));

  const testWidths = [320, 768];

  for (const w of testWidths) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: w,
      height: 800,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 400));

    const badElements = await send('Runtime.evaluate', {
      expression: `(() => {
        const docW = document.documentElement.clientWidth;
        const sections = Array.from(document.querySelectorAll('main > *')).map(el => {
          return {
            tag: el.tagName,
            id: el.id,
            className: (el.className || '').slice(0, 50),
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            rectRight: Math.round(el.getBoundingClientRect().right),
            isOverflowing: el.scrollWidth > docW || el.getBoundingClientRect().right > docW + 1
          };
        });
        const culprits = [];
        document.querySelectorAll('section, footer, nav, header, main').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > docW + 1) {
            culprits.push({
              tag: el.tagName,
              id: el.id,
              className: (el.className || '').slice(0, 50),
              right: Math.round(rect.right),
              docW
            });
          }
        });
        return {
          width: ${w},
          docScrollWidth: document.documentElement.scrollWidth,
          sections: sections.filter(s => s.isOverflowing)
        };
      })()`,
      returnByValue: true
    });

    console.log(`=== OVERFLOW DIAGNOSIS FOR ${w}px ===`);
    if (badElements.exceptionDetails) {
      console.error(badElements.exceptionDetails);
    } else {
      console.log(JSON.stringify(badElements.result?.value, null, 2));
    }
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
