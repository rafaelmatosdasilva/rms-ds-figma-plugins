// Tokens to Ink's Export view: the colours scanned (as tokens-to-ink-colors.js), then the Export tab, with PDF/X-4,
// downsampling to 300 dpi, crop and registration marks, file information and a 3 mm bleed on, as Figma draws it. Run
// on the built page by the screen check (ds-config.json, screens).
const post = (m) => window.dispatchEvent(new MessageEvent('message', { data: { pluginMessage: m } }));
const row = (name, hex, rgb, cmyk, extra) => ({ name, hex, rgb, cmyk, hasCmykVariable: false, colorVarId: 'v-' + name,
  pantone: null, ral: null, vinyl: null, source: 'variable', isExternal: false, collectionId: 'c1', ...extra });
const rows = [
  row('brand/magenta', '#FF0FA5', { r: 255, g: 15, b: 165 }, { c: 0, m: 94, y: 35, k: 0 }, { pantone: 'Rhodamine Red C', ral: '4010', vinyl: '3M 1080-G13' }),
  row('brand/ink', '#000023', { r: 0, g: 0, b: 35 }, { c: 100, m: 100, y: 0, k: 86 }, { pantone: '2768 C' }),
  row('brand/paper', '#FFFFFF', { r: 255, g: 255, b: 255 }, { c: 0, m: 0, y: 0, k: 0 }),
];
post({ type: 'selection-count', count: 2 });
post({ type: 'settings', cropMarks: true, regMarks: true, colorBars: false, pageInfo: true, bleedOn: true, bleedMm: 3,
  pdfx: true, preserveSpot: false, imagesCmyk: false, downsample: true, downsampleDpi: 300 });
post({ type: 'scan-results', data: rows, sourceNodes: [{ id: 'f1', name: 'BusinessCard-85x55mm-Front' }, { id: 'f2', name: 'BusinessCard-85x55mm-Back' }],
  hasExternalVars: false, externalLibrary: null, summary: { totalColors: rows.length, withCmykPairs: 0 } });
// The launch scan's loader stays at least 2 seconds: wait for it to go.
for (let i = 0; i < 40 && document.querySelector('#progress-container .progress-msg'); i++) await new Promise((r) => setTimeout(r, 100));
await new Promise((r) => setTimeout(r, 200));
document.getElementById('view-export-btn')?.click();
await new Promise((r) => setTimeout(r, 300));
