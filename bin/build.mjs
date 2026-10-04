#!/usr/bin/env node
/**
 * rms-build [plugin-dir]   (the current folder by default)
 *
 * Builds one plugin: injects the shared theme/UI into ui.html, then bundles src/code.js with esbuild.
 *
 * Also stamps a build identity (name + version) as a console.log banner in the bundled code. Deliberately NOT shown
 * in the UI — the plugin windows are small and the version is only ever needed to answer "which build am I on?",
 * which a one-line log in the plugin console covers without costing any pixels.
 *
 * The version is read from the plugin's own package.json, which is the single source of truth and is bumped by
 * rms-release to match the version Figma assigns when publishing to Community.
 */
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pluginAt, esbuildBin, run } from './_lib.mjs';

const p = pluginAt(process.argv[2]);

// 1. shared theme + ui-shared → ui.html
run(process.execPath, [fileURLToPath(new URL('./inject-theme.mjs', import.meta.url)), 'ui.src.html', 'ui.html'], { cwd: p.dir });

// 2. bundle the plugin sandbox code, stamped with the build identity
const banner = `console.log(${JSON.stringify(`${p.displayName} v${p.version}`)});`;
run(esbuildBin(), [
  'src/code.js',
  '--bundle',
  '--platform=browser',
  '--format=iife',
  '--target=es2019',
  '--minify',
  `--banner:js=${banner}`,
  '--outfile=code.js',
], { cwd: p.dir });
