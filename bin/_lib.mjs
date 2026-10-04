// _lib.mjs - what every rms-* command shares: where the design system's own files are, and the plugin a command
// works on. A command runs on a plugin folder (the current one by default), so the same tools serve a plugin's own
// repository and, while it lasts, a folder inside this one.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

export const DS_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
export const THEME_CSS = join(DS_ROOT, 'packages', 'ui', 'src', 'theme.css');
export const UI_SHARED = join(DS_ROOT, 'packages', 'ui', 'src', 'ui-shared.js');

// The esbuild binary the design system depends on, wherever the package manager put it.
export function esbuildBin() {
  try { return join(dirname(createRequire(import.meta.url).resolve('esbuild/package.json')), 'bin', 'esbuild'); } catch { return null; }
}

// A plugin folder: manifest.json, package.json, ui.src.html, src/code.js. → { dir, manifest, pkg, slug, displayName, version }
export function pluginAt(arg = '.') {
  const dir = resolve(arg);
  const manifestPath = join(dir, 'manifest.json'), pkgPath = join(dir, 'package.json');
  for (const p of [manifestPath, pkgPath]) if (!existsSync(p)) { process.stderr.write(`Missing ${p}\n`); process.exit(1); }
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const slug = String(pkg.name ?? basename(dir)).replace(/^@[^/]+\//, '').replace(/^rms-figma-/, '');
  return { dir, manifestPath, pkgPath, manifest, pkg, slug, displayName: manifest.name || pkg.name, version: pkg.version };
}

export function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', ...opts });
  if (r.status !== 0) process.exit(r.status ?? 1);
  return r;
}
