import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_mobile_deep_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9390;
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

  // Scroll through the page to trigger content-visibility rendering
  await send('Runtime.evaluate', {
    expression: `(async () => {
      const scrollStep = 800;
      for (let y = 0; y < document.documentElement.scrollHeight + 10000; y += scrollStep) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
    })()`,
    awaitPromise: true
  });

  const analysis = await send('Runtime.evaluate', {
    expression: `(() => {
      const sections = Array.from(document.querySelectorAll('section, footer, header, nav')).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          id: el.id || el.className.slice(0, 20),
          height: Math.round(rect.height),
          top: Math.round(rect.top + window.scrollY)
        };
      });

      return {
        totalScrollHeight: document.documentElement.scrollHeight,
        windowHeight: window.innerHeight,
        screenfuls: (document.documentElement.scrollHeight / window.innerHeight).toFixed(1),
        sections
      };
    })()`,
    returnByValue: true
  });

  console.log('=== MOBILE (390x844) LAYOUT BREAKDOWN ===');
  console.log(JSON.stringify(analysis.result.value, null, 2));

  // Take full page screenshot
  const fullScreenshot = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true
  });
  fs.writeFileSync(path.join(process.cwd(), 'mobile-full-baseline.png'), Buffer.from(fullScreenshot.data, 'base64'));
  console.log('Saved mobile-full-baseline.png');

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
