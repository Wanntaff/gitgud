import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_cand2_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9420;
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
    { w: 1366, h: 768, name: 'cand2-1366x768' },
    { w: 1920, h: 1080, name: 'cand2-1920x1080' },
    { w: 1024, h: 768, name: 'cand2-1024x768' },
    { w: 768, h: 1024, name: 'cand2-768x1024' },
    { w: 375, h: 812, name: 'cand2-375x812' }
  ];

  const cand2Html = `
    Bosan Nongkrong Cuma Main HP?{" "}
    <br class="hidden sm:inline" />
    Saatnya{" "}
    <span class="relative inline-block text-[#E84A27] whitespace-nowrap">
      Adu Taktik
      <svg aria-hidden="true" viewBox="0 0 170 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="absolute -bottom-1.5 left-0 w-full h-[8px] text-[#E84A27] overflow-visible pointer-events-none">
        <path d="M2.5 7.5C28 2.5 56 10 85 5.5C114 1 142 8.5 167.5 4.5" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </span>{" "}
    <span class="whitespace-nowrap">di Gitgud.</span>
  `;

  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.w,
      height: vp.h,
      deviceScaleFactor: 1,
      mobile: vp.w < 768
    });
    await new Promise(r => setTimeout(r, 100));

    await send('Runtime.evaluate', {
      expression: `(() => {
        const hero = document.getElementById('hero');
        hero.style.minHeight = 'calc(100vh - 96px)';
        const h1 = hero.querySelector('h1');
        if (h1) {
          h1.className = 'font-display font-black text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.25rem] xl:text-[2.75rem] leading-[1.15] tracking-tight text-[#172554]';
          h1.innerHTML = \`${cand2Html}\`;
        }
      })()`
    });
    await new Promise(r => setTimeout(r, 200));

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: vp.w, height: vp.h, scale: 1 }
    });
    const outFile = path.join(process.cwd(), `${vp.name}.png`);
    fs.writeFileSync(outFile, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot: ${outFile}`);
  }

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
