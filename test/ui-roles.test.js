import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

// The components Figma gives a role carry it wherever a product draws them (WCAG 4.1.2, 1.3.1): statusBar and actionBar
// are toolbars, dividerSection is a heading, a node acts as a button, the listItems that fill a container are a list,
// the table/rows that fill one are a table, and a card is named by its title only while it has one. A stepper or a
// segmented control drawn after the page loads works as one there from the start, and the shared tip is out of a
// screen reader's way while it shows nothing.
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

  it('makes the table/rows that fill a container a table of rows and cells; the divider under a row is only its line', async () => {
    const w = page('<div id="t"></div><div id="mixed"><h3>Title</h3><div class="tableRow" id="m1"></div></div>');
    const d = w.document;
    d.getElementById('t').innerHTML = '<div class="tableRow" id="r1"><div class="tableRow-content"><div class="tableRow-variable" id="c1">Ink</div><button id="b1">Reset</button></div><div class="dividerLine" role="separator" id="line"></div></div><div class="tableRow" id="r2"><div class="tableRow-content"><div id="c2">Paper</div></div></div>';
    await tick();
    expect(d.getElementById('t').getAttribute('role')).toBe('table');
    expect(d.getElementById('r1').getAttribute('role')).toBe('row');
    expect(d.getElementById('c1').getAttribute('role')).toBe('cell');
    expect(d.getElementById('c2').getAttribute('role')).toBe('cell');
    expect(d.getElementById('b1').hasAttribute('role')).toBe(false);   // a control keeps its own role
    expect(d.getElementById('line').getAttribute('role')).toBe('none');   // a row holds cells
    expect(d.getElementById('mixed').hasAttribute('role')).toBe(false);
    expect(d.getElementById('m1').hasAttribute('role')).toBe(false);
  });
});

describe('@rms/ui — components drawn after the page loads', () => {
  it('wires a stepper drawn later: ArrowUp steps its value within its range', async () => {
    const w = page('<div id="host"></div>');
    const d = w.document;
    d.getElementById('host').innerHTML = '<div class="buttonStepper"><button class="buttonSecondary" aria-label="Decrease"></button><div class="inputWrap"><input class="inputField" id="f" value="100%" aria-label="Value" role="spinbutton" aria-valuemin="0" aria-valuemax="200" aria-valuenow="100"></div><button class="buttonSecondary" aria-label="Increase"></button></div>';
    await tick();
    const f = d.getElementById('f');
    f.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(f.getAttribute('aria-valuenow')).toBe('101');
    expect(f.value).toBe('101%');
  });

  it('makes a segmented control drawn later a radio group, its options radios that are checked, never pressed', async () => {
    const w = page('<div id="host"></div>');
    const d = w.document;
    d.getElementById('host').innerHTML = '<div class="segmented-control" aria-label="View" id="sc"><span class="seg-pill" aria-hidden="true"></span><button class="selected" aria-pressed="true" id="o1">List</button><button aria-pressed="false" id="o2">Grid</button></div>';
    await tick();
    const sc = d.getElementById('sc'), o1 = d.getElementById('o1'), o2 = d.getElementById('o2');
    expect(sc.getAttribute('role')).toBe('radiogroup');
    expect([o1.getAttribute('role'), o1.getAttribute('aria-checked'), o2.getAttribute('aria-checked')]).toEqual(['radio', 'true', 'false']);
    expect(o1.hasAttribute('aria-pressed') || o2.hasAttribute('aria-pressed')).toBe(false);
    expect([o1.tabIndex, o2.tabIndex]).toEqual([0, -1]);
    expect(sc.classList.contains('has-pill')).toBe(true);
  });

  it('keeps the shared tip out of a screen reader\'s way while it shows nothing', () => {
    expect(THEME).toMatch(/#tt \{[^}]*opacity: 0;\s*visibility: hidden;/);
    expect(THEME).toMatch(/#tt\.tt-visible \{[^}]*visibility: visible;/);
  });

  it('names a switch\'s field only by the words that show: its label alone while its description is off', async () => {
    const w = page('<label class="switch" id="s"><input type="checkbox" class="switch-input"><span class="switch-content"><span class="switch-label" id="l">Bleed</span><span class="switch-description" id="d">In mm</span><span class="inputWrap"><input class="inputField" id="f" aria-labelledby="l d"></span></span></label>');
    const d = w.document, f = d.getElementById('f');
    d.getElementById('d').remove();
    await tick();
    expect(f.getAttribute('aria-labelledby')).toBe('l');   // never an id that is not on the page
    d.getElementById('l').remove();
    await tick();
    expect(f.hasAttribute('aria-labelledby')).toBe(false);
    d.querySelector('.switch-content').insertAdjacentHTML('afterbegin', '<span class="switch-label" id="l">Bleed</span><span class="switch-description" id="d">In mm</span>');
    await tick();
    expect(f.getAttribute('aria-labelledby')).toBe('l d');
  });

  it('names a card by its title only while it shows one', async () => {
    const w = page('<div class="card" role="group" aria-labelledby="t" id="c"><span class="card-title" id="t">Output</span><div>Content</div></div>');
    const d = w.document, card = d.getElementById('c');
    expect(card.getAttribute('aria-labelledby')).toBe('t');
    d.getElementById('t').remove();
    await tick();
    expect(card.hasAttribute('aria-labelledby')).toBe(false);   // never a name pointing at nothing
    card.insertAdjacentHTML('afterbegin', '<span class="card-title" id="t">Output</span>');
    await tick();
    expect(card.getAttribute('aria-labelledby')).toBe('t');
  });
});

describe('@rms/ui — a page closed before the queued pass', () => {
  it('leaves a closed page alone: no error after the window is gone', async () => {
    const errors = [];
    const onError = (e) => errors.push(String(e?.message ?? e));
    process.on('unhandledRejection', onError);
    try {
      const w = page('<div id="l"></div><button class="tooltipButton" data-tip="Help"></button>');
      w.document.getElementById('l').innerHTML = '<div class="listItem"></div>';   // queues both passes
      w.document.querySelector('.tooltipButton').setAttribute('data-tip', 'More help');
      w.close();
      for (let i = 0; i < 3; i++) await tick();
    } finally { process.off('unhandledRejection', onError); }
    expect(errors).toEqual([]);
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
