#!/usr/bin/env node
/**
 * rms-check-manifests [plugin-dir …]   (the current folder by default)
 *
 * Validates a plugin manifest before it can reach anyone. A build proves the code compiles; it does not prove Figma
 * will load the plugin. A malformed manifest, or a main/ui pointing at a file that isn't committed, fails silently in
 * CI and then loudly in someone's Figma. Also asserts networkAccess stays "none": that promise is in the README and
 * the Community listing, so a change to it must be deliberate, not incidental.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';

const dirs = (process.argv.slice(2).length ? process.argv.slice(2) : ['.']).map((d) => resolve(d));
const problems = [];
const names = [];
for (const dir of dirs) {
  const name = basename(dir);
  names.push(name);
  const fail = (msg) => problems.push(`${name}: ${msg}`);
  let m;
  try { m = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8')); } catch (err) { fail(`manifest.json is missing or not valid JSON — ${err.message}`); continue; }
  for (const key of ['name', 'id', 'api', 'main', 'ui', 'editorType']) if (!m[key]) fail(`manifest.json is missing "${key}"`);
  // The two files Figma actually loads. Both are build output and both are committed, so a missing one means
  // someone shipped without building.
  for (const key of ['main', 'ui']) if (m[key] && !existsSync(join(dir, m[key]))) fail(`"${key}" points at ${m[key]}, which does not exist`);
  const domains = m.networkAccess?.allowedDomains;
  if (!Array.isArray(domains) || domains.length !== 1 || domains[0] !== 'none') fail('networkAccess.allowedDomains must be ["none"] — the plugins are offline by design');
  // package.json version is the single source of truth for the release flow.
  const pkgPath = join(dir, 'package.json');
  if (!existsSync(pkgPath)) fail('package.json is missing');
  else {
    const version = JSON.parse(readFileSync(pkgPath, 'utf8')).version;
    if (!/^\d+$/.test(String(version))) fail(`package.json version "${version}" must be an integer matching the Figma Community version`);
  }
}
if (problems.length) {
  process.stderr.write(`\n${problems.length} manifest problem(s):\n`);
  for (const p of problems) process.stderr.write(`  ✗ ${p}\n`);
  process.stderr.write('\n');
  process.exit(1);
}
process.stdout.write(`✓ ${dirs.length} manifest${dirs.length === 1 ? '' : 's'} valid (${names.join(', ')})\n`);
