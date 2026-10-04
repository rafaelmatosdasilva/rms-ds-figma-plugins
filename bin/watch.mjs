#!/usr/bin/env node
/**
 * rms-watch [plugin-dir] [extra esbuild flags]   (the current folder by default)
 *
 * Watches:
 *   src/code.js and its imports  → esbuild --watch (native)
 *   ui.src.html                  → re-runs the theme injection
 *   the design system's theme.css and ui-shared.js → re-runs the theme injection
 */
import { watchFile, existsSync } from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pluginAt, esbuildBin, THEME_CSS, UI_SHARED } from './_lib.mjs';

const args = process.argv.slice(2);
const dirArg = args[0] && !args[0].startsWith('-') ? args.shift() : '.';
const p = pluginAt(dirArg);
const injectScript = fileURLToPath(new URL('./inject-theme.mjs', import.meta.url));
const uiWatchFiles = [join(p.dir, 'ui.src.html'), THEME_CSS, UI_SHARED].filter(existsSync);

function injectTheme() {
  try { execFileSync(process.execPath, [injectScript, 'ui.src.html', 'ui.html'], { cwd: p.dir, stdio: 'inherit' }); } catch (_) {}
}

injectTheme();

// fs.watchFile uses polling so it reliably catches atomic saves (VSCode etc.)
let debounce = null;
for (const file of uiWatchFiles) {
  watchFile(file, { interval: 200, persistent: true }, () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => { process.stdout.write(`  ↺ ${file}\n`); injectTheme(); }, 60);
  });
}

const esbuild = spawn(esbuildBin(), [
  join(p.dir, 'src', 'code.js'), '--bundle', '--platform=browser', '--format=iife', `--outfile=${join(p.dir, 'code.js')}`, '--watch=forever', ...args,
], { cwd: p.dir, stdio: 'inherit' });

esbuild.on('close', (code) => process.exit(code ?? 0));
process.on('SIGINT',  () => { esbuild.kill('SIGINT');  process.exit(0); });
process.on('SIGTERM', () => { esbuild.kill('SIGTERM'); process.exit(0); });
