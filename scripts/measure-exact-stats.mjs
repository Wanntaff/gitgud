import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_stats_measure_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9346;
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

  for (const w of [375, 768, 1024, 1280, 1366, 1920]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 620, deviceScaleFactor: 1, mobile: w < 500 });
    await new Promise(r => setTimeout(r, 300));

    const r = await send('Runtime.evaluate', {
      expression: `(() => {
        const stats = document.querySelector('[data-testid="hero-stats"]');
        if (!stats) return null;
        return Array.from(stats.children).map(col => {
          const val = col.children[0];
          const span = document.createElement('span');
          span.style.cssText = 'position:absolute;left:-9999px;white-space:nowrap;font-family:' + getComputedStyle(val).fontFamily + ';font-size:' + getComputedStyle(val).fontSize + ';font-weight:' + getComputedStyle(val).fontWeight + ';letter-spacing:' + getComputedStyle(val).letterSpacing;
          span.innerText = val.innerText;
          document.body.appendChild(span);
          const exactTextWidth = Math.round(span.getBoundingClientRect().width);
          span.remove();
          return {
            text: val.innerText,
            fontSize: getComputedStyle(val).fontSize,
            exactTextWidth,
            colWidth: Math.round(col.getBoundingClientRect().width),
            marginRemaining: Math.round(col.getBoundingClientRect().width - exactTextWidth)
          };
        });
      })()`,
      returnByValue: true
    });
    console.log(`\nWidth ${w}:`);
    console.log(JSON.stringify(r.result.value, null, 2));
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
