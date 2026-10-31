import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_range_all_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9347;
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

  for (const w of [375, 768, 1024, 1280, 1366, 1440, 1536, 1920]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 620, deviceScaleFactor: 1, mobile: w < 500 });
    await new Promise(r => setTimeout(r, 300));

    const r = await send('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('h1');
        const hero = document.getElementById('hero');
        const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
        const words = [];
        let node;
        while (node = walker.nextNode()) {
          const text = node.textContent;
          const parts = text.split(/(\\s+)/);
          let offset = 0;
          for (const p of parts) {
            if (p.trim()) {
              const range = document.createRange();
              range.setStart(node, offset);
              range.setEnd(node, offset + p.length);
              const rect = range.getBoundingClientRect();
              words.push({ word: p, top: Math.round(rect.top) });
            }
            offset += p.length;
          }
        }
        const lines = {};
        for (const w of words) {
          if (!lines[w.top]) lines[w.top] = [];
          lines[w.top].push(w.word);
        }
        return {
          width: ${w},
          lineCount: Object.keys(lines).length,
          lines: Object.values(lines).map(l => l.join(' ')),
          heroH: Math.round(hero.getBoundingClientRect().height),
          heroBottom: Math.round(hero.offsetTop + hero.offsetHeight),
          fits620: Math.round(hero.offsetTop + hero.offsetHeight) <= 620
        };
      })()`,
      returnByValue: true
    });
    console.log(`\n=== Width ${w} ===`);
    console.log(JSON.stringify(r.result.value, null, 2));
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
