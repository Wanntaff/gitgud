import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_measure_combos_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9380;
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

  const viewports = [
    { w: 1024, name: '1024px' },
    { w: 1280, name: '1280px' },
    { w: 1366, name: '1366px' },
    { w: 1536, name: '1536px' },
    { w: 1920, name: '1920px' }
  ];

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', { width: vp.w, height: 768, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 100));

    const r = await send('Runtime.evaluate', {
      expression: `(() => {
        const h1 = document.querySelector('h1');
        const colW = h1.parentElement.offsetWidth;
        const test = document.createElement('div');
        test.style.cssText = 'position:absolute;left:-9999px;white-space:nowrap;font-family:' + getComputedStyle(h1).fontFamily + ';font-weight:900;letter-spacing:-0.025em;';
        document.body.appendChild(test);

        const combos = [
          {
            name: 'Combo A (3 lines: Nongkrong / Main HP? Saatnya / Adu Taktik di Gitgud)',
            l1: 'Bosan Nongkrong',
            l2: 'Cuma Main HP? Saatnya',
            l3: 'Adu Taktik di Gitgud.'
          },
          {
            name: 'Combo B (3 lines: Nongkrong Cuma / Main HP? / Saatnya Adu Taktik di Gitgud)',
            l1: 'Bosan Nongkrong Cuma',
            l2: 'Main HP?',
            l3: 'Saatnya Adu Taktik di Gitgud.'
          },
          {
            name: 'Combo C (4 lines: Nongkrong / Cuma Main HP? / Saatnya Adu Taktik / di Gitgud)',
            l1: 'Bosan Nongkrong',
            l2: 'Cuma Main HP?',
            l3: 'Saatnya Adu Taktik',
            l4: 'di Gitgud.'
          }
        ];

        const sizes = [34, 36, 38, 40, 42, 44];
        const res = {};

        for (const sz of sizes) {
          test.style.fontSize = sz + 'px';
          res[sz + 'px'] = combos.map(c => {
            test.innerText = c.l1;
            const w1 = test.offsetWidth;
            test.innerText = c.l2;
            const w2 = test.offsetWidth;
            test.innerText = c.l3;
            const w3 = test.offsetWidth;
            let w4 = 0;
            if (c.l4) { test.innerText = c.l4; w4 = test.offsetWidth; }
            const maxW = Math.max(w1, w2, w3, w4);
            return {
              name: c.name,
              w1, w2, w3, w4,
              maxW,
              fits: maxW <= colW,
              margin: colW - maxW
            };
          });
        }
        test.remove();
        return { vp: ${vp.w}, colW, res };
      })()`,
      returnByValue: true
    });

    console.log(`\n=== VIEWPORT ${vp.name} (colW = ${r.result.value.colW}) ===`);
    for (const [sz, items] of Object.entries(r.result.value.res)) {
      console.log(`-- Size ${sz} --`);
      for (const it of items) {
        console.log(`  ${it.name.slice(0, 10)}: maxW=${it.maxW}, fits=${it.fits}, margin=${it.margin}px (w1=${it.w1}, w2=${it.w2}, w3=${it.w3}${it.w4 ? ', w4=' + it.w4 : ''})`);
      }
    }
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
