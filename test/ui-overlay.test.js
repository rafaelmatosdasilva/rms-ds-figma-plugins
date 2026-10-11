import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

// While a progress message covers the page, the page behind it is out of reach: Tab never lands on a control the
// overlay hides (WCAG 2.4.11). A toast or a progress message is said by a screen reader as it comes (WCAG 4.1.3).
const SCRIPT = readFileSync(new URL('../packages/ui/src/ui-shared.js', import.meta.url), 'utf8');
const tick = () => new Promise((r) => setTimeout(r, 0));

function page(body) {
  const dom = new JSDOM(`<!doctype html><html><body><div id="tt"></div>${body}</body></html>`, { runScripts: 'outside-only', pretendToBeVisual: true });
  dom.window.eval(SCRIPT);
  return dom.window;
}

describe('@rms/ui — the loading overlay', () => {
  it('announces toasts and progress, and makes the page behind a progress message inert until it goes', async () => {
    const w = page(`<main id="app"><button id="scan">Scan</button></main><div id="already" inert></div><div id="toast-container"></div><div id="progress-container"></div>`);
    const d = w.document;
    for (const id of ['toast-container', 'progress-container']) {
      expect(d.getElementById(id).getAttribute('role')).toBe('status');
      expect(d.getElementById(id).getAttribute('aria-live')).toBe('polite');
    }
    expect(d.getElementById('app').hasAttribute('inert')).toBe(false);
    d.getElementById('progress-container').innerHTML = '<div class="progress-msg">Loading… <button id="cancel">Cancel</button></div>';
    await tick();
    expect(d.getElementById('toast-overlay').classList.contains('visible')).toBe(true);
    expect(d.getElementById('app').hasAttribute('inert')).toBe(true);
    expect(d.getElementById('progress-container').hasAttribute('inert')).toBe(false);   // its Cancel stays reachable
    expect(d.getElementById('tt').hasAttribute('inert')).toBe(false);
    d.getElementById('progress-container').innerHTML = '';
    await tick();
    expect(d.getElementById('app').hasAttribute('inert')).toBe(false);
    expect(d.getElementById('already').hasAttribute('inert')).toBe(true);   // what was inert before stays so
  });

  it('a toast alone does not make the page inert', async () => {
    const w = page(`<main id="app"><button>Scan</button></main><div id="toast-container"></div><div id="progress-container"></div>`);
    w.document.getElementById('toast-container').innerHTML = '<div class="toast">Saved</div>';
    await tick();
    expect(w.document.getElementById('app').hasAttribute('inert')).toBe(false);
  });
});
