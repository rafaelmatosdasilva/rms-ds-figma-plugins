// Tokens to Ink's Preflight over the Export view (tokens-to-ink-export.js): the images that fall below the 300 dpi
// target and the one that stays RGB, under Errors, as Figma draws it. Run on the built page by the screen check
// (ds-config.json, screens).
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
  pdfx: true, preserveSpot: false, imagesCmyk: true, downsample: true, downsampleDpi: 300 });
post({ type: 'scan-results', data: rows, sourceNodes: [{ id: 'f1', name: 'BusinessCard-85x55mm-Front' }, { id: 'f2', name: 'BusinessCard-85x55mm-Back' }],
  hasExternalVars: false, externalLibrary: null, summary: { totalColors: rows.length, withCmykPairs: 0 } });
// The launch scan's loader stays at least 2 seconds: wait for it to go.
for (let i = 0; i < 40 && document.querySelector('#progress-container .progress-msg'); i++) await new Promise((r) => setTimeout(r, 100));
post({ type: 'preflight-selection', hasImages: true });
await new Promise((r) => setTimeout(r, 200));
document.getElementById('view-export-btn')?.click();
await new Promise((r) => setTimeout(r, 200));
document.getElementById('export-preflight-btn')?.click();
await new Promise((r) => setTimeout(r, 200));
post({ type: 'preflight-images', hasImages: true, target: 300,
  images: [{ id: 'i1', name: 'hero.jpg', meta: '180 dpi' }, { id: 'i2', name: 'texture.png', meta: '150 dpi' }],
  unconvertible: [{ id: 'i3', name: 'product-photo.jpg', meta: "won't convert to CMYK" }] });
await new Promise((r) => setTimeout(r, 400));
