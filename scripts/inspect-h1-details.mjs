import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_inspect_h1_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9352;
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

  await new Promise(r => setTimeout(r, 2000));

  for (const w of [1024, 1280, 1366, 1536, 1920]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 768, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 200));

    const r = await send('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('h1');
        const colW = h1.parentElement.offsetWidth;
        const spans = Array.from(h1.children);
        const rects = Array.from(h1.getClientRects()).map(r => ({ w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) }));

        // Measure line 1 and line 2 separately
        const test = document.createElement('div');
        test.style.cssText = 'position:absolute;left:-9999px;white-space:nowrap;font-family:' + getComputedStyle(h1).fontFamily + ';font-size:' + getComputedStyle(h1).fontSize + ';font-weight:' + getComputedStyle(h1).fontWeight + ';letter-spacing:' + getComputedStyle(h1).letterSpacing;
        document.body.appendChild(test);
        test.innerText = 'Bosan Nongkrong Cuma Main HP?';
        const line1W = test.offsetWidth;
        test.innerText = 'Saatnya Adu Taktik di Gitgud.';
        const line2W = test.offsetWidth;
        test.remove();

        return {
          w: ${w},
          colW,
          fontSize: getComputedStyle(h1).fontSize,
          line1W,
          line2W,
          line1Fits: line1W <= colW,
          line2Fits: line2W <= colW,
          lines: rects.length,
          h1H: h1.offsetHeight
        };
      })()`,
      returnByValue: true
    });
    console.log(r.result.value);
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
