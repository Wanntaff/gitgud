import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_sections_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9385;
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

  // Inspect all h1, h2, h3 across the page
  const headings = await send('Runtime.evaluate', {
    expression: `(() => {
      const list = [];
      document.querySelectorAll('h1, h2, h3').forEach(el => {
        const style = getComputedStyle(el);
        list.push({
          tag: el.tagName,
          text: el.innerText.slice(0, 35).replace(/\\n/g, ' '),
          fontSize: style.fontSize,
          lineHeight: style.lineHeight,
          section: el.closest('section')?.id || el.closest('header')?.id || 'other'
        });
      });
      return list;
    })()`,
    returnByValue: true
  });

  console.log('Headings at default (1366px):', headings.result.value);

  // Capture About section
  await send('Emulation.setDeviceMetricsOverride', { width: 1366, height: 768, deviceScaleFactor: 1, mobile: false });
  await new Promise(r => setTimeout(r, 200));

  // Scroll to about
  await send('Runtime.evaluate', {
    expression: `document.getElementById('about').scrollIntoView({ block: 'start' })`
  });
  await new Promise(r => setTimeout(r, 300));

  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { x: 0, y: 0, width: 1366, height: 768, scale: 1 }
  });
  const file = path.join(process.cwd(), 'section-about-1366.png');
  fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
  console.log('Saved screenshot of about section: ' + file);

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
