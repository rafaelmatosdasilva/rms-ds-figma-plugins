#!/usr/bin/env node
/**
 * rms-release-notes <v<n> | <plugin>-v<n>> [plugin-dir]
 *
 * Builds a Release body from the plugin's CHANGELOG.md for a version, so the notes never drift from the changelog.
 * Prints it to stdout; exits non-zero when there is no entry for that version. The changelog may hold one plugin
 * (### v<n> entries) or several (a "## <Display Name>" section each, then its ### v<n> entries).
 */
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { pluginAt } from './_lib.mjs';

const tag = process.argv[2];
const m = /(?:^|-)v(\d+)$/.exec(tag ?? '');
if (!m) { process.stderr.write('Usage: rms-release-notes v<version> [plugin-dir]\n'); process.exit(1); }
const version = m[1];
const p = pluginAt(process.argv[3]);
const changelogPath = [join(p.dir, 'CHANGELOG.md'), resolve(p.dir, '..', '..', 'CHANGELOG.md')].find(existsSync);
if (!changelogPath) { process.stderr.write('No CHANGELOG.md.\n'); process.exit(1); }
const changelog = readFileSync(changelogPath, 'utf8');
const section = /^## /m.test(changelog) ? changelog.split(/^## /m).find((s) => s.startsWith(p.displayName)) : changelog;
if (!section) { process.stderr.write(`No "## ${p.displayName}" section in ${changelogPath}.\n`); process.exit(1); }
const entry = section.split(/^### /m).find((s) => new RegExp(`^v${version}\\b`).test(s));
if (!entry) { process.stderr.write(`No "### v${version}" entry for ${p.displayName}.\n`); process.exit(1); }

// Changelog bullets wrap across lines; a continuation is indented. Rejoin them, or the notes come out truncated.
const bullets = [];
for (const line of entry.split('\n')) {
  if (line.startsWith('- ')) bullets.push(line);
  else if (bullets.length && /^\s+\S/.test(line)) bullets[bullets.length - 1] += ' ' + line.trim();
}
const communityUrl = `https://www.figma.com/community/plugin/${p.manifest.id}`;
const zipName = `${p.slug}-v${version}.zip`;
const out = [
  `Now live on the [Figma Community](${communityUrl}).`,
  '',
  ...bullets,
  '',
  `Download \`${zipName}\` below, unzip, then **Plugins → Development → Import plugin from manifest…** in the Figma desktop app.`,
];
// A checksum someone can actually check: `shasum -a 256 <file>`. Sideloading means running code from a zip.
const zip = join(p.dir, 'dist', zipName);
if (existsSync(zip)) {
  const sha = createHash('sha256').update(readFileSync(zip)).digest('hex');
  out.push('', '<details><summary>Verify the download</summary>', '', '```', `shasum -a 256 ${zipName}`, `${sha}`, '```', '</details>');
}
// The 3-bullet cap is a judgement call a script can't make: flag it so the draft gets trimmed before publishing.
if (bullets.length > 3) out.unshift(`<!-- ${bullets.length} bullets — trim to 3 before publishing: lead with the biggest change, fold the rest into "Fixed minor UI issues and improved overall polish." -->`, '');
process.stdout.write(out.join('\n') + '\n');
