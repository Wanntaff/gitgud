import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9333;
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--remote-allow-origins=*',
    `--user-data-dir=${tmpDir}`,
    '--no-sandbox',
    '--disable-gpu',
    'http://localhost:3001'
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
          tab = list.find(t => t.url.includes('localhost:3001')) || list[0];
          if (tab && tab.webSocketDebuggerUrl) break;
        }
      }
    } catch (e) {
      // wait
    }
  }

  if (!tab) {
    console.error('Failed to get chrome tab on port', port);
    chrome.kill();
    return;
  }

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const res = JSON.parse(event.data);
        if (res.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(res.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => setTimeout(r, 2000));

  // Set standard laptop viewport
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false
  });
  await new Promise(r => setTimeout(r, 500));

  // Test rolling 15 times to inspect all games and measure CLS / card heights
  const rollRes = await send('Runtime.evaluate', {
    expression: `(async () => {
      const results = [];
      
      for (let i = 0; i < 15; i++) {
        const gameTitle = document.querySelector('#hero .lg\\\\:col-span-5 h4')?.textContent;
        const card = document.querySelector('#hero .lg\\\\:col-span-5 > div:first-of-type');
        const img = document.querySelector('#hero .lg\\\\:col-span-5 img');

        results.push({
          roll: i,
          gameTitle,
          cardHeight: Math.round(card?.getBoundingClientRect().height || 0),
          hasImage: !!img,
          imageSrc: img ? img.src : null
        });

        // Click roll button
        const buttons = Array.from(document.querySelectorAll('#hero .lg\\\\:col-span-5 button'));
        const rollBtn = buttons.find(b => b.textContent.includes('Roll Game Lain')) || buttons[1];
        if (rollBtn) {
          rollBtn.click();
        }
        await new Promise(r => setTimeout(r, 1400)); // wait for roll animation to finish
      }
      return results;
    })()`,
    awaitPromise: true,
    returnByValue: true
  });

  console.log('Roll test results across 15 iterations:');
  console.log(JSON.stringify(rollRes.result?.value ?? rollRes, null, 2));

  ws.close();
  chrome.kill();
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {}
}

main().catch(console.error);
