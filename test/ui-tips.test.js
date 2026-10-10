import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

// The shared UI's tips name and describe what they belong to (WCAG 4.1.2, 1.3.1): an icon-only control is named by its
// tip, a tip inside a control's label describes that control, and the tooltip adds its words to a description without
// replacing it or repeating a name.
const SCRIPT = readFileSync(new URL('../packages/ui/src/ui-shared.js', import.meta.url), 'utf8');
const tick = () => new Promise((r) => setTimeout(r, 0));

function page(body) {
  const dom = new JSDOM(`<!doctype html><html><body><div id="tt"></div>${body}</body></html>`, { runScripts: 'outside-only', pretendToBeVisual: true });
  dom.window.eval(SCRIPT);
  return dom.window;
}

describe('@rms/ui — names and descriptions from tips', () => {
  it('names an icon-only control by its tip, and leaves a control with words or its own name alone', () => {
    const w = page(`<button id="add" class="buttonSecondary" data-tip="Add output"><svg><use href="#icon-plus"/></svg></button>
      <button id="save" class="buttonPrimary" data-tip="Saves the file"><span>Save</span></button>
      <button id="own" class="buttonSecondary" data-tip="Reset" aria-label="Reset CMYK to auto"><svg></svg></button>`);
    const d = w.document;
    expect(d.getElementById('add').getAttribute('aria-label')).toBe('Add output');
    expect(d.getElementById('save').hasAttribute('aria-label')).toBe(false);
    expect(d.getElementById('own').getAttribute('aria-label')).toBe('Reset CMYK to auto');
  });

  it('describes the control a tip sits in the label of, outside its name', () => {
    const w = page(`<label class="switch"><input type="checkbox" id="pdfx" class="switch-input"><span class="switch-track"></span>
      <span class="switch-content"><span class="switch-description">PDF/X-4</span><span class="tooltipButton" data-tip="Embed a FOGRA39 output intent."><svg></svg></span></span></label>`);
    const d = w.document;
    const input = d.getElementById('pdfx');
    const desc = d.getElementById(input.getAttribute('aria-describedby'));
    expect(desc.textContent).toBe('Embed a FOGRA39 output intent.');
    expect(desc.hidden).toBe(true);
    expect(desc.closest('label')).toBeNull();
    expect(d.querySelector('.tooltipButton').getAttribute('aria-hidden')).toBe('true');
  });

  it('keeps in step with rows drawn later and tips that change their words', async () => {
    const w = page('<div id="rows"></div>');
    const d = w.document;
    d.getElementById('rows').innerHTML = '<button id="later" data-tip="Reset CMYK to auto"><svg></svg></button><label><input type="checkbox" id="c"><span class="t" data-tip="Before">i</span></label>';
    await tick();
    expect(d.getElementById('later').getAttribute('aria-label')).toBe('Reset CMYK to auto');
    d.getElementById('later').dataset.tip = 'Reset to auto';
    d.querySelector('.t').dataset.tip = 'After';
    await tick();
    expect(d.getElementById('later').getAttribute('aria-label')).toBe('Reset to auto');
    expect(d.getElementById(d.getElementById('c').getAttribute('aria-describedby')).textContent).toBe('After');
  });

  it('adds the open tooltip to a description without replacing it, and never repeats a name', () => {
    const w = page(`<button id="d" data-tip="More about it" aria-describedby="help"><span>Go</span></button><p id="help">Help</p>
      <button id="i" data-tip="Add output"><svg></svg></button>`);
    const d = w.document;
    const focus = (el) => el.dispatchEvent(new w.FocusEvent('focusin', { bubbles: true }));
    const blur = (el) => el.dispatchEvent(new w.FocusEvent('focusout', { bubbles: true }));
    focus(d.getElementById('d'));
    expect(d.getElementById('d').getAttribute('aria-describedby')).toBe('help tt');
    blur(d.getElementById('d'));
    expect(d.getElementById('d').getAttribute('aria-describedby')).toBe('help');
    focus(d.getElementById('i'));
    expect(d.getElementById('i').hasAttribute('aria-describedby')).toBe(false);
  });
});
