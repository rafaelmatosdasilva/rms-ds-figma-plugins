import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

// The components Figma gives a role carry it wherever a product draws them (WCAG 4.1.2, 1.3.1): statusBar and actionBar
// are toolbars, dividerSection is a heading, a node acts as a button, the listItems that fill a container are a list.
// The system draws one spinner, and highlightSelector's Selected state has Figma's 4px corners.
const SCRIPT = readFileSync(new URL('../packages/ui/src/ui-shared.js', import.meta.url), 'utf8');
const THEME = readFileSync(new URL('../packages/ui/src/theme.css', import.meta.url), 'utf8');
const tick = () => new Promise((r) => setTimeout(r, 0));

function page(body) {
  const dom = new JSDOM(`<!doctype html><html><body><div id="tt"></div>${body}</body></html>`, { runScripts: 'outside-only', pretendToBeVisual: true });
  dom.window.eval(SCRIPT);
  return dom.window;
}

describe('@rms/ui — roles Figma gives the components', () => {
  it('gives toolbars, headings and buttons their roles, and leaves a role a product gave alone', () => {
    const w = page(`<div class="statusBar" id="sb"></div><div class="actionbar" id="ab" role="group"></div><div class="actionbar actionbar-split" id="ab2"></div>
      <div class="dividerSection" id="ds"><div class="dividerSection-content">Alias tokens</div></div>
      <div class="node graph-node" id="n">Node</div><button class="node" id="b">Var</button>`);
    const d = w.document;
    expect(d.getElementById('sb').getAttribute('role')).toBe('toolbar');
    expect(d.getElementById('ab').getAttribute('role')).toBe('group');
    expect(d.getElementById('ab2').getAttribute('role')).toBe('toolbar');
    expect(d.getElementById('ds').getAttribute('role')).toBe('heading');
    expect(d.getElementById('ds').getAttribute('aria-level')).toBe('2');   // the level ARIA gives a heading with none
    expect(d.getElementById('n').getAttribute('role')).toBe('button');
    expect(d.getElementById('n').getAttribute('tabindex')).toBe('0');
    expect(d.getElementById('b').hasAttribute('role')).toBe(false);
  });

  it('presses a node made a button with Enter and Space', () => {
    const w = page('<div class="node" id="n">Node</div>');
    const n = w.document.getElementById('n');
    let pressed = 0;
    n.addEventListener('click', () => pressed++);
    for (const key of ['Enter', ' ', 'a']) n.dispatchEvent(new w.KeyboardEvent('keydown', { key, bubbles: true }));
    expect(pressed).toBe(2);
  });

  it('makes the listItems that fill a container a list, and keeps out a container that holds more', async () => {
    const w = page('<div id="l"></div><div id="mixed"><h3>Title</h3><div class="listItem" id="m1"></div></div>');
    const d = w.document;
    d.getElementById('l').innerHTML = '<div class="listItem" id="i1"></div><div class="listItem" id="i2"></div>';
    await tick();
    expect(d.getElementById('l').getAttribute('role')).toBe('list');
    expect(d.getElementById('i1').getAttribute('role')).toBe('listitem');
    expect(d.getElementById('mixed').hasAttribute('role')).toBe(false);
    expect(d.getElementById('m1').hasAttribute('role')).toBe(false);
  });
});

describe('@rms/ui — one spinner, and the Selected marker\'s corners', () => {
  it('draws .spinner, .toast-spinner and .loader-spinner with one rule', () => {
    const css = THEME.replace(/\/\*[\s\S]*?\*\//g, '');
    const rules = css.match(/[^{}]*\bspinner\b[^{}]*\{/g).map((r) => r.trim());
    expect(rules.filter((r) => /^\.spinner\b|^\.toast-spinner\b|^\.loader-spinner\b/.test(r))).toEqual(['.spinner, .toast-spinner, .loader-spinner {']);
    expect(THEME).toMatch(/\.spinner, \.toast-spinner, \.loader-spinner \{[^}]*border: var\(--general-thickness\) solid var\(--loader-spinner\)/);
  });

  it('rounds highlightSelector\'s Selected state as Figma does (4px)', () => {
    expect(THEME).toMatch(/\.highlightSelector\.selected \{[^}]*border-radius: 4px;/);
  });
});
