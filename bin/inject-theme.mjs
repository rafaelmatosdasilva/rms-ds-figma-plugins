#!/usr/bin/env node
/**
 * rms-inject-theme <src-html> <out-html>
 *
 * Injects the design system's theme.css at the <!--@THEME--> marker and ui-shared.js at <!--@UI-->.
 * Injected payloads are MINIFIED via esbuild (css + js): the sources stay readable, only the built ui.html shrinks
 * (comments and parity annotations don't ship to users). Minification cannot change computed styles or behavior;
 * the rendered parity check verifies the built output either way. Falls back to raw injection if esbuild is missing.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import { THEME_CSS, UI_SHARED, esbuildBin } from './_lib.mjs';

const [,, srcArg, outArg] = process.argv;
if (!srcArg || !outArg) { process.stderr.write('Usage: rms-inject-theme <src.html> <out.html>\n'); process.exit(1); }
const srcPath = resolve(srcArg), outPath = resolve(outArg);
const bin = esbuildBin();

function minify(source, loader) {
  if (!bin || !existsSync(bin)) return source;
  const r = spawnSync(bin, [`--loader=${loader}`, '--minify', '--target=es2019'], { input: source, encoding: 'utf8' });
  if (r.status !== 0) {
    process.stderr.write(`Warning: esbuild ${loader} minify failed — injecting raw\n${(r.stderr || '').slice(0, 300)}\n`);
    return source;
  }
  return r.stdout;
}

const theme    = minify(readFileSync(THEME_CSS, 'utf8'), 'css');
const uiShared = minify(readFileSync(UI_SHARED, 'utf8'), 'js');
const src      = readFileSync(srcPath, 'utf8');
const shown    = relative(process.cwd(), outPath) || outPath;

if (!src.includes('<!--@THEME-->')) process.stderr.write(`Warning: <!--@THEME--> not found in ${srcArg}\n`);
if (!src.includes('<!--@UI-->')) process.stderr.write(`Warning: <!--@UI--> not found in ${srcArg}\n`);

let out = src.replace('<!--@THEME-->', `<style>\n${theme}\n</style>`);
out     = out.replace('<!--@UI-->',    `<script>\n${uiShared}\n</script>`);

// Optional: bundle a CMYK ICC profile (base64, pre-deflated) for PDF/X output intents. Injected only when the
// template opts in with <!--@ICC--> and the plugin ships the asset — a no-op for plugins without either.
if (src.includes('<!--@ICC-->')) {
  const iccPath = join(dirname(srcPath), 'src', 'icc-fogra39.b64');
  const icc = existsSync(iccPath) ? readFileSync(iccPath, 'utf8').trim() : '';
  out = out.replace('<!--@ICC-->', icc ? `<script>window.__ICC_FOGRA39=${JSON.stringify(icc)}</script>` : '');
}

writeFileSync(outPath, out);
process.stdout.write(`  ✓ theme + ui-shared (minified) → ${shown}\n`);
