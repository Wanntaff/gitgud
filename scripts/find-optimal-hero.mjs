import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_opt_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9415;
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

  const testConfig = async (h1Class, h1Html, minHeight = 'calc(100vh - 96px)') => {
    const viewports = [
      { w: 1366, h: 768, name: '1366x768' },
      { w: 1920, h: 1080, name: '1920x1080' },
      { w: 1024, h: 768, name: '1024x768' },
      { w: 768, h: 1024, name: '768x1024' },
      { w: 375, h: 812, name: '375x812' }
    ];

    console.log(`\n========================================`);
    console.log(`Testing config: minH = ${minHeight}`);
    console.log(`h1Class: ${h1Class}`);

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
          hero.style.minHeight = '${minHeight}';
          const h1 = hero.querySelector('h1');
          if (h1) {
            h1.className = '${h1Class}';
            h1.innerHTML = \`${h1Html}\`;
          }
        })()`
      });
      await new Promise(r => setTimeout(r, 150));

      const res = await send('Runtime.evaluate', {
        expression: `(() => {
          const hero = document.getElementById('hero');
          const h1 = hero.querySelector('h1');
          const stats = hero.querySelector('[data-testid=\"hero-stats\"]');
          const about = document.getElementById('about');

          const heroRect = hero.getBoundingClientRect();
          const statsRect = stats.getBoundingClientRect();
          const aboutRect = about ? about.getBoundingClientRect() : null;

          return {
            vp: ${vp.w} + 'x' + ${vp.h},
            h1FontSize: getComputedStyle(h1).fontSize,
            h1Height: h1.offsetHeight,
            statsVisible: statsRect.bottom <= window.innerHeight,
            statsBottomMargin: window.innerHeight - statsRect.bottom,
            aboutTop: aboutRect ? aboutRect.top : null,
            peekingPx: Math.max(0, window.innerHeight - (aboutRect ? aboutRect.top : window.innerHeight))
          };
        })()`,
        returnByValue: true
      });

      console.log(`  [${vp.name}]`, res.result.value);
    }
  };

  // Test current natural breaking with whitespace-nowrap protection:
  const naturalHtml = `
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

  // Candidate 1:
  await testConfig(
    'font-display font-black text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.2rem] xl:text-[2.65rem] leading-[1.15] tracking-tight text-[#172554]',
    naturalHtml
  );

  // Candidate 2:
  await testConfig(
    'font-display font-black text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.25rem] xl:text-[2.75rem] leading-[1.15] tracking-tight text-[#172554]',
    naturalHtml
  );

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
