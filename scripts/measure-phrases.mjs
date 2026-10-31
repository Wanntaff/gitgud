import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_measure_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9375;
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

  await send('Emulation.setDeviceMetricsOverride', { width: 1366, height: 768, deviceScaleFactor: 1, mobile: false });

  const r = await send('Runtime.evaluate', {
    expression: `(() => {
      const h1 = document.querySelector('h1');
      const colW = h1.parentElement.offsetWidth;
      const test = document.createElement('div');
      test.style.cssText = 'position:absolute;left:-9999px;white-space:nowrap;font-family:' + getComputedStyle(h1).fontFamily + ';font-weight:900;letter-spacing:-0.025em;';
      document.body.appendChild(test);

      const phrases = [
        'Bosan Nongkrong Cuma Main HP?',
        'Bosan Nongkrong',
        'Cuma Main HP?',
        'Saatnya Adu Taktik',
        'di Gitgud.',
        'Saatnya Adu Taktik di Gitgud.',
        'Bosan Nongkrong Cuma',
        'Main HP? Saatnya',
        'Adu Taktik di Gitgud.'
      ];

      const sizes = [28, 30, 32, 34, 36, 38, 40, 42, 44];
      const results = {};

      for (const sz of sizes) {
        test.style.fontSize = sz + 'px';
        results[sz + 'px'] = {};
        for (const p of phrases) {
          test.innerText = p;
          results[sz + 'px'][p] = test.offsetWidth;
        }
      }
      test.remove();
      return { colW, results };
    })()`,
    returnByValue: true
  });

  console.log(JSON.stringify(r.result.value, null, 2));

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
