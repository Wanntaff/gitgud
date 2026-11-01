import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const tmpDir = path.join(os.tmpdir(), 'chrome_cdp_verify_' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  const port = 9397;
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

  if (!tab) {
    chrome.kill();
    throw new Error('Could not find chrome tab');
  }

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 1;
  const send = (method, params = {}) => new Promise(res => {
    const msgId = id++;
    const handler = (e) => {
      const data = JSON.parse(e.data);
      if (data.id === msgId) {
        ws.removeEventListener('message', handler);
        res(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

  await new Promise(r => setTimeout(r, 1500));

  console.log('=== TEST 1: Mobile (390x844) Viewport Deep Verification ===');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 500));

  // Check horizontal overflow
  const overflow = await send('Runtime.evaluate', {
    expression: `(() => {
      return {
        bodyScrollWidth: document.body.scrollWidth,
        docScrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalWindowScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    })()`,
    returnByValue: true
  });
  console.log('1. Horizontal Overflow Test:', overflow.result.value);

  // Check Snap alignment & track margins
  const carousels = await send('Runtime.evaluate', {
    expression: `(() => {
      const results = {};
      for (const id of ['about', 'how-to-play', 'events']) {
        const sec = document.getElementById(id);
        const track = sec.querySelector('.snap-x');
        const card0 = track.children[0];
        const style = window.getComputedStyle(track);
        results[id] = {
          scrollSnapType: style.scrollSnapType,
          card0SnapAlign: window.getComputedStyle(card0).scrollSnapAlign,
          scrollPaddingLeft: style.scrollPaddingLeft
        };
      }
      return results;
    })()`,
    returnByValue: true
  });
  console.log('2. Carousel Snap Alignments:', carousels.result.value);

  // Check HowToPlay outer card alignment & clipping
  const htp = await send('Runtime.evaluate', {
    expression: `(() => {
      const sec = document.getElementById('how-to-play');
      const card = sec.querySelector('.rounded-2xl');
      const track = sec.querySelector('.snap-x');
      const cardStyle = window.getComputedStyle(card);
      const trackStyle = window.getComputedStyle(track);
      return {
        outerCardPadding: cardStyle.padding,
        outerCardOverflow: cardStyle.overflow,
        trackMarginLeft: trackStyle.marginLeft,
        trackMarginRight: trackStyle.marginRight,
        trackPaddingLeft: trackStyle.paddingLeft,
        trackPaddingRight: trackStyle.paddingRight
      };
    })()`,
    returnByValue: true
  });
  console.log('3. HowToPlay Structure & Clipping:', htp.result.value);

  // Scroll to games section to ensure content-visibility: auto renders the section
  await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('games');
      if (el) el.scrollIntoView();
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  // Check GameCatalog mobile initial count (should be 6 visible)
  const catalogMobile = await send('Runtime.evaluate', {
    expression: `(() => {
      const allCards = document.querySelectorAll('[data-testid="game-card"]');
      const visibleCards = Array.from(allCards).filter(c => window.getComputedStyle(c).display !== 'none');
      const buttons = Array.from(document.querySelectorAll('#games button'));
      const loadMoreBtn = buttons.find(b => (b.textContent || '').includes('Muat Lebih Banyak'));
      return {
        totalRenderedCards: allCards.length,
        visibleCardsCount: visibleCards.length,
        buttonText: loadMoreBtn ? loadMoreBtn.innerText.replace(/\\s+/g, ' ').trim() : null
      };
    })()`,
    returnByValue: true
  });
  console.log('4. GameCatalog Mobile Initial Visibility:', catalogMobile.result.value);

  // Test clicking "Muat Lebih Banyak" on mobile
  const clickLoadMore = await send('Runtime.evaluate', {
    expression: `(() => {
      const buttons = Array.from(document.querySelectorAll('#games button'));
      const loadMoreBtn = buttons.find(b => (b.textContent || '').includes('Muat Lebih Banyak'));
      if (loadMoreBtn) {
        loadMoreBtn.click();
        return true;
      }
      return false;
    })()`,
    returnByValue: true
  });
  await new Promise(r => setTimeout(r, 400));

  const catalogAfterLoadMore = await send('Runtime.evaluate', {
    expression: `(() => {
      const allCards = document.querySelectorAll('[data-testid="game-card"]');
      const visibleCards = Array.from(allCards).filter(c => window.getComputedStyle(c).display !== 'none');
      const buttons = Array.from(document.querySelectorAll('#games button'));
      const collapseBtn = buttons.find(b => b.innerText.includes('Sembunyikan'));
      return {
        clickedLoadMore: ${clickLoadMore.result.value},
        visibleCardsCountAfterClick: visibleCards.length,
        hasCollapseButton: !!collapseBtn,
        collapseButtonText: collapseBtn ? collapseBtn.innerText.trim() : null
      };
    })()`,
    returnByValue: true
  });
  console.log('5. GameCatalog After Load More Click:', catalogAfterLoadMore.result.value);

  // Test clicking "Sembunyikan Sebagian"
  await send('Runtime.evaluate', {
    expression: `(() => {
      const buttons = Array.from(document.querySelectorAll('#games button'));
      const collapseBtn = buttons.find(b => b.innerText.includes('Sembunyikan'));
      if (collapseBtn) collapseBtn.click();
    })()`,
    returnByValue: true
  });
  await new Promise(r => setTimeout(r, 400));

  const catalogAfterCollapse = await send('Runtime.evaluate', {
    expression: `(() => {
      const allCards = document.querySelectorAll('[data-testid="game-card"]');
      const visibleCards = Array.from(allCards).filter(c => window.getComputedStyle(c).display !== 'none');
      return {
        visibleCardsAfterCollapse: visibleCards.length
      };
    })()`,
    returnByValue: true
  });
  console.log('6. GameCatalog After Collapse Click:', catalogAfterCollapse.result.value);

  // Test Mobile Quick Bar
  await send('Runtime.evaluate', {
    expression: `window.scrollTo(0, 500)`
  });
  await new Promise(r => setTimeout(r, 300));

  const quickBar = await send('Runtime.evaluate', {
    expression: `(() => {
      const bar = document.querySelector('aside[aria-label="Aksi Cepat Mobile"]');
      return {
        quickBarExists: !!bar,
        quickBarVisible: bar ? window.getComputedStyle(bar).display !== 'none' : false
      };
    })()`,
    returnByValue: true
  });
  console.log('7. Mobile Quick Bar on Scroll (390px):', quickBar.result.value);

  console.log('=== TEST 2: Desktop (1280x800) Viewport Integrity Check ===');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false
  });
  await new Promise(r => setTimeout(r, 600));

  const desktopCheck = await send('Runtime.evaluate', {
    expression: `(() => {
      const allCards = document.querySelectorAll('[data-testid="game-card"]');
      const visibleCards = Array.from(allCards).filter(c => window.getComputedStyle(c).display !== 'none');
      const quickBar = document.querySelector('aside[aria-label="Aksi Cepat Mobile"]');
      const menuSection = document.getElementById('menu');
      const desktopPagination = menuSection ? menuSection.querySelector('.md\\\\:flex') : null;

      // Check About grid layout on desktop (must be 4-col grid)
      const aboutTrack = document.querySelector('#about .snap-x, #about .md\\\\:grid');
      const aboutTrackDisplay = aboutTrack ? window.getComputedStyle(aboutTrack).display : null;

      return {
        desktopWindowWidth: window.innerWidth,
        desktopVisibleGameCards: visibleCards.length,
        quickBarHiddenOnDesktop: quickBar ? window.getComputedStyle(quickBar).display === 'none' : true,
        aboutDesktopDisplay: aboutTrackDisplay
      };
    })()`,
    returnByValue: true
  });
  console.log('8. Desktop Responsive Integrity:', desktopCheck.result.value);

  ws.close();
  chrome.kill();
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
}

main().catch(console.error);
