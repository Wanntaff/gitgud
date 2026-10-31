import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_right_col_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9348;
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

  for (const w of [1024, 1366]) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 620, deviceScaleFactor: 1, mobile: false });
    await new Promise(r => setTimeout(r, 300));

    const r = await send('Runtime.evaluate', {
      expression: `(() => {
        const hero = document.getElementById('hero');
        const rightCol = hero.querySelector('.lg\\:col-span-5');
        const dicePicker = rightCol.children[1];
        const soloCard = rightCol.children[2];

        // Measure inside dice picker
        const diceHeader = dicePicker.children[0];
        const diceBody = dicePicker.children[1];
        const boxFrame = diceBody.children[0];
        const rollBtn = diceBody.children[1];

        // Inside boxFrame
        const boxContent = boxFrame.children[1];
        const boxHeaderStrip = boxContent.children[0];
        const boxMockup = boxContent.children[1];
        const boxTags = boxContent.children[2];
        const boxQuote = boxContent.children[3];

        return {
          width: ${w},
          rightColH: Math.round(rightCol.getBoundingClientRect().height),
          dicePickerH: Math.round(dicePicker.getBoundingClientRect().height),
          soloCardH: Math.round(soloCard.getBoundingClientRect().height),
          diceHeaderH: Math.round(diceHeader.getBoundingClientRect().height),
          boxFrameH: Math.round(boxFrame.getBoundingClientRect().height),
          rollBtnH: Math.round(rollBtn.getBoundingClientRect().height),
          boxHeaderStripH: Math.round(boxHeaderStrip.getBoundingClientRect().height),
          boxMockupH: Math.round(boxMockup.getBoundingClientRect().height),
          boxTagsH: Math.round(boxTags.getBoundingClientRect().height),
          boxQuoteH: Math.round(boxQuote.getBoundingClientRect().height),
        };
      })()`,
      returnByValue: true
    });
    console.log(`\nWidth ${w}:`, r.result.value);
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
