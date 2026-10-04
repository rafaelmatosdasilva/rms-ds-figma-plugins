#!/usr/bin/env node
/**
 * rms-release [version]   (run in a plugin's repository)
 *
 * Cuts a release, keeping the repository's version identical to the one Figma assigns on Community. Figma owns the
 * number (it increments per plugin on publish and there is no API to read it back), so pass the number shown in
 * Figma's publish dialog; without one, current+1 is inferred and said loudly. Bumps package.json, rebuilds, commits
 * and tags v<n>. With no changes since the last tag it says so. Deliberately stops before pushing.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { pluginAt } from './_lib.mjs';

const p = pluginAt('.');
const sh = (cmd, args, opts = {}) => spawnSync(cmd, args, { cwd: p.dir, encoding: 'utf8', ...opts });
let version = process.argv[2];
let inferred = false;
if (!version) {
  if (!/^\d+$/.test(String(p.version))) { process.stderr.write(`Cannot infer the next version from "${p.version}". Pass it explicitly.\n`); process.exit(1); }
  const last = `v${p.version}`;
  if (sh('git', ['rev-parse', '-q', '--verify', `refs/tags/${last}`]).status === 0 && !sh('git', ['diff', '--name-only', `${last}..HEAD`]).stdout.trim()) {
    process.stdout.write(`Nothing changed since ${last}.\n`);
    process.exit(0);
  }
  version = String(Number(p.version) + 1);
  inferred = true;
} else if (!/^\d+$/.test(version)) {
  process.stderr.write('Version must be the integer Figma shows when publishing to Community, e.g. 5.\n');
  process.exit(1);
}
const tag = `v${version}`;
if (sh('git', ['rev-parse', '-q', '--verify', `refs/tags/${tag}`]).status === 0) { process.stderr.write(`Tag ${tag} already exists.\n`); process.exit(1); }
if (sh('git', ['status', '--porcelain']).stdout.trim()) { process.stderr.write('Working tree is dirty — commit or stash first so the release is a clean point.\n'); process.exit(1); }

const prev = p.pkg.version;
writeFileSync(p.pkgPath, JSON.stringify({ ...p.pkg, version }, null, 2) + '\n');
process.stdout.write(`${p.slug}: v${prev} → v${version}\n`);
if (sh(process.execPath, [fileURLToPath(new URL('./build.mjs', import.meta.url))], { stdio: 'inherit' }).status !== 0) { process.stderr.write('Build failed — aborting release.\n'); process.exit(1); }
sh('git', ['add', '-A']);
sh('git', ['commit', '-m', `v${version}`], { stdio: 'inherit' });
sh('git', ['tag', '-a', tag, '-m', `${p.displayName} v${version}`], { stdio: 'inherit' });
process.stdout.write(
  (inferred ? `\n⚠️  Version inferred as v${version} (previous was v${prev}).\n   Confirm this matches Figma's publish dialog before pushing.\n` : '') +
  `\nTagged ${tag}. Not pushed.\n  Review, then:  git push origin main --follow-tags\n  The release workflow drafts the GitHub Release; publish v${version} in Figma.\n`,
);
