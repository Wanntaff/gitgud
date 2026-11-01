import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_mobile_sections_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9395;
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

  const mobileWidth = 390;
  const mobileHeight = 844;

  await send('Emulation.setDeviceMetricsOverride', {
    width: mobileWidth,
    height: mobileHeight,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 500));

  const sectionsToCapture = ['about', 'how-to-play', 'games', 'events', 'menu', 'faq', 'location'];

  for (const secId of sectionsToCapture) {
    await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('${secId}');
        if (el) el.scrollIntoView({ block: 'start' });
      })()`
    });
    await new Promise(r => setTimeout(r, 400));

    const shot = await send('Page.captureScreenshot', {
      format: 'png'
    });

    const file = path.join(process.cwd(), `mobile-section-${secId}.png`);
    fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot for ${secId}: ${file}`);
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
