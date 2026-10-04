#!/usr/bin/env node
// Adds the links of the published style guide: this repository, and each product built on the design system, with its
// repository and its Figma Community page (products.json). The style guide itself is built by rms-design-system-engine
// (--styleguide), which knows nothing about where it is published; this runs only in the Pages workflow.
//
//   node scripts/style-guide-links.mjs [apps/style-guide/index.html]
import { readFileSync, writeFileSync } from 'node:fs';

const file = process.argv[2] ?? 'apps/style-guide/index.html';
const REPO = 'https://github.com/rafaelmatosdasilva/rms-ds-figma-plugins';
const { products } = JSON.parse(readFileSync(new URL('../products.json', import.meta.url), 'utf8'));

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const link = (href, label, cls = '') => `<a${cls ? ` class="${cls}"` : ''} href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;

const block = `<div class="ds-links">
  <style>
    .ds-links { padding: 12px 16px; border-bottom: var(--sg-line); display: grid; gap: 6px; }
    .ds-links .ds-links-label { font-size: 9px; letter-spacing: 0.08em; color: var(--sg-muted); margin-top: 6px; }
    .ds-links a { font-size: 11px; font-weight: 500; color: var(--sg-text-2); text-decoration: none; }
    .ds-links a:hover, .ds-links a:focus-visible { color: var(--sg-text); text-decoration: underline; }
    .ds-links .ds-product { display: grid; gap: 1px; }
    .ds-links .ds-community { font-size: 10px; font-weight: 400; color: var(--sg-muted); }
  </style>
  ${link(REPO, 'Repository and releases')}
  <div class="ds-links-label">Built with it</div>
  ${products.map((p) => `<div class="ds-product">${link(`https://github.com/${p.repo}`, p.name)}${p.community ? link(p.community, 'Figma Community', 'ds-community') : ''}</div>`).join('\n  ')}
</div>
`;

const html = readFileSync(file, 'utf8');
const anchor = '<div class="sg-nav" id="sg-nav">';
if (html.includes('class="ds-links"')) { console.log(`${file}: links already in place`); process.exit(0); }
if (!html.includes(anchor)) { console.error(`${file}: the style guide's navigation (${anchor}) was not found, so the links were not added`); process.exit(1); }
writeFileSync(file, html.replace(anchor, block + anchor));
console.log(`${file}: links to this repository and ${products.length} products added`);
