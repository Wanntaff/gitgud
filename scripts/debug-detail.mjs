import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_detail_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9393;
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

  // Check 768px
  await send('Emulation.setDeviceMetricsOverride', {
    width: 768,
    height: 800,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 400));

  const at768 = await send('Runtime.evaluate', {
    expression: `(() => {
      const docW = 768;
      const results = [];
      document.querySelectorAll('#hero *, nav *, section *').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > docW + 0.5) {
          results.push({
            tag: el.tagName,
            id: el.id,
            className: (el.className || '').slice(0, 60),
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          });
        }
      });
      return results.slice(0, 10);
    })()`,
    returnByValue: true
  });
  console.log('Culprits at 768px:', at768.result.value);

  // Check 320px
  await send('Emulation.setDeviceMetricsOverride', {
    width: 320,
    height: 650,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 400));

  const at320 = await send('Runtime.evaluate', {
    expression: `(() => {
      const docW = 320;
      const results = [];
      document.querySelectorAll('nav *, #hero *').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > docW + 0.5) {
          results.push({
            tag: el.tagName,
            id: el.id,
            className: (el.className || '').slice(0, 60),
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          });
        }
      });
      return results.slice(0, 10);
    })()`,
    returnByValue: true
  });
  console.log('Culprits at 320px:', at320.result.value);

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
