#!/usr/bin/env node
/**
 * rms-package [plugin-dir]   (the current folder by default)
 *
 * Builds the ready-to-sideload zip, dist/<plugin>-v<n>.zip. It holds only what Figma loads (manifest.json, code.js,
 * ui.html) in one folder named after the plugin, so the flow is download, unzip, Import from manifest. The zip is
 * attached to the GitHub Release; dist/ itself is not committed.
 */
import { existsSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pluginAt } from './_lib.mjs';

const p = pluginAt(process.argv[2]);
const distDir = join(p.dir, 'dist');
rmSync(distDir, { recursive: true, force: true });
const stage = join(distDir, p.slug);
mkdirSync(stage, { recursive: true });
for (const f of ['manifest.json', p.manifest.main, p.manifest.ui]) {
  const src = join(p.dir, f);
  if (!existsSync(src)) { process.stderr.write(`${p.slug}: missing ${f} — run rms-build first.\n`); process.exit(1); }
  copyFileSync(src, join(stage, f));
}
const zipName = `${p.slug}-v${p.version}.zip`;
const r = spawnSync('zip', ['-qr', zipName, p.slug], { cwd: distDir, stdio: 'inherit' });
if (r.status !== 0) { process.stderr.write(`${p.slug}: zip failed.\n`); process.exit(1); }
rmSync(stage, { recursive: true, force: true });
process.stdout.write(`  dist/${zipName}\n`);
