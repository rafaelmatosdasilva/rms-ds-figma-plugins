// parity-map.mjs — Single source of truth for all token→CSS var mappings.
// Imported by: parity-check, bound-check, state-check, exemption-check, naming-check.
// Edit this file when a Figma token is renamed, added, or intentionally deferred.
// Never duplicate these maps across scripts — any drift between copies is a hallucination.

// ─── Color: EXPLICIT token→CSS var deviations ────────────────────────────────
// Tokens where the naming convention (token/path → --token-path, drop /default /color)
// does NOT produce the real CSS var name.  null = rgba/non-hex — skip comparison.
export const EXPLICIT = {
  'buttonPrimary/iconText':            '--buttonPrimary-text',
  'buttonSecondary/text':              '--buttonSecondary-text',
  'buttonSecondary/icon':              '--buttonSecondary-text',
  'buttonTertiary/iconText/default':   '--buttonTertiary-text',
  'buttonTertiary/iconText/active':    '--buttonTertiary-text-active',
  'buttonQuaternary/iconText':         '--buttonQuaternary-text',
  'dividerLine/border':                '--border',
  'input/background/filled':           '--surface',
  'input/value/filled':                '--text',
  'semantic/content/primary':          '--text',
  'semantic/content/secondary':        '--text-secondary',
  // Surfaces — the DS elevation scale (semantic/background was retired; app/panel = medium,
  // detail = low, actionbar/titlebar = high → figmaWindowChrome/background).
  'semantic/surface/elevationMedium':  '--bg',
  'semantic/surface/elevationLow':     '--bg-detail',
  'semantic/surface/elevationHigh':    '--surface-elevation-high',
  'figmaWindowChrome/background':       '--figmaWindowChrome-background',
  'swatch/border/filled/primary':      '--swatch-border-filled',
  'swatch/border/empty/primary':       '--swatch-border-empty',
  'node/border/disabled':              '--node-border-disabled',
  'segmentedControl/border/selected':  '--segmentedControl-border-selected',
  'badge/background/negative':         '--semantic-negative',
  'badge/background/warning':          '--semantic-warning',
  'badge/background/positive':         '--semantic-positive',
  'badge/label/negative':              '--semantic-negative',
  'badge/label/warning':               '--semantic-warning',
  'badge/label/positive':              '--semantic-positive',
  'badge/icon/negative':               '--semantic-negative',
  'badge/icon/warning':                '--semantic-warning',
  'badge/icon/positive':               '--semantic-positive',
  'badge/background/neutral':          '--badge-neutral',
  'badge/label/neutral':               '--badge-neutral',
  'badge/icon/neutral':                '--badge-neutral',
  'overlay':                           '--overlay-bg',  // a colour with its own opacity in Figma (88%), rgba in CSS
};

// ─── Color: tokens with no CSS implementation ────────────────────────────────
// Figma chrome, permanently unbound nodes, rgba-only tokens.
export const SKIP_TOKENS = new Set([
  'figmaWindowChrome/title',
  'figmaWindowChrome/button',
  // figmaWindowChrome/divider now HAS a var (--figmaWindowChrome-divider) — actionbar/border
  // was rebound to it (2026-08), so it's consumed and round-trips like any component token.
  // figmaWindowChrome/background likewise has --figmaWindowChrome-background via elevationHigh.
  'highlight/icon',
  'highlight/background',            // no highlight component in any active plugin — declare when added
  'highlight/text',                  // same
  'highlightSelector/border',        // same
  'node/label/default',              // bound only on State=Active (551:253151 set) — no Active node state in any plugin yet; declare when added
  'node/icon/default',               // same — Active-state icon color, no plugin consumer yet
  'node/border/default',             // orphan — DS Idle state (544:51070) has no stroke; resting .node border is transparent, no CSS consumer
  'listItem/icon',                   // no CSS rule consumer — all icon rows use --buttonList-iconPrimary
  'listItem/title',                  // no CSS consumer since library-atlas removal (2026-07) — declare when a plugin uses it
  'listItem/description',            // last consumer removed with the retired Font Scaling Lab details rows (2026-07-31) — declare when a plugin uses it
  'emptyState/icon/positive',        // no positive emptyState variant in any plugin yet — declare when added
  'modal/icon',                      // DS modal header has an optional icon; no plugin renders one yet — declare when a modal shows an icon
  // panel/background split into two variants 2026-09-13 (panel is now a type=primary/secondary set):
  //  - primary   aliases semantic/surface/elevationMedium → --bg      (N900 both modes)
  //  - secondary aliases semantic/surface/elevationLow    → --bg-detail (N800 L / N1000 D)
  // Both covered via the existing surface vars — no dedicated panel-bg var (matches the 2026-08 rebind).
  'panel/background/primary',
  'panel/background/secondary',
  // node/background/idle: re-added to the DS 2026-08, but bound to no visible node in any
  // plugin frame — the resting .node stays transparent (shows the panel). No CSS var; declare
  // when a plugin actually fills a resting node.
  'node/background/idle',
  // node/background/default: removed from SKIP — --node-background IS declared and used in .node rules
  'typeBadge/color/background',
  'typeBadge/color/text',
  'typeBadge/float/background',
  'typeBadge/float/text',
  'typeBadge/string/background',
  'typeBadge/string/text',
  'typeBadge/boolean/background',
  'typeBadge/boolean/text',
]);

// Tokens whose Figma value is legitimately null in the snapshot
export const KNOWN_NULL = new Set([
  'highlight/icon',
]);

// ─── Sizing: EXPLICIT sizing token→CSS var deviations ────────────────────────
export const EXPLICIT_SIZING = {
  'general/min-height': '--min-height',
  'general/thickness':  '--thickness',
  'radii/button':       '--radius-full',
  'radii/input':        '--radius-full',
  'radii/swatch':       '--radius-swatch',
  'radii/modal':        '--radius-modal',
  'radii/toast':        '--radius-toast',
  'radii/card':         '--radius-md',
  'radii/tooltip':      '--radius-tooltip',
  'radii/checkbox':     '--radius-checkbox',
  // The text styles as variables (Figma 2026-10): the same values as the type scale above.
  'typography/l/font-size':   '--l-size',
  'typography/l/line-height': '--l-lh',
  'typography/m/font-size':   '--m-size',
  'typography/m/line-height': '--m-lh',
  'typography/s/font-size':   '--s-size',
  'typography/s/line-height': '--s-lh',
};

// Sizing tokens with no CSS consumer — map to reason string
export const SIZING_SKIP = new Map([
  ['general/window-radii', 'Figma window-chrome corner radius — not controlled by HTML/CSS'],
  ['viewport/min-width', 'The width each Figma mode draws its frames at (Desktop 1680, Phone 350): a canvas size, not a CSS value'],
  ['gap/xxl', 'Scale token with no component consumer — var removed per Hard Rule #2; declare when a component uses this spacing'],
]);

// ─── Coverage: tokens intentionally without a dedicated CSS var ───────────────
// Used by bound-check and state-check. Mirrors the "Known Unimplemented" table.
export const COVERED = new Set([
  // Permanently un-implementable / no CSS consumer
  // figmaWindowChrome/* is Figma's own plugin titlebar — the plugin cannot style it.
  // /background lost its last (incorrect) consumer on 2026-07-31 when .actionbar moved
  // to its own DS token, actionbar/background; it joins its siblings here.
  'figmaWindowChrome/title', 'figmaWindowChrome/button',
  // figmaWindowChrome/divider now has --figmaWindowChrome-divider (actionbar/border rebound to it, 2026-08).
  // figmaWindowChrome/background now has a CSS var — consumed via semantic/surface/elevationHigh → actionbar/background.
  // panel/background split 2026-09-13 into primary (→ --bg, elevationMedium) and
  // secondary (→ --bg-detail, elevationLow) — the panel is now a type=primary/secondary set.
  'panel/background/primary',
  'panel/background/secondary',
  'highlight/icon', 'highlight/background', 'highlight/text', 'highlightSelector/border',
  'general/window-radii',
  // Type scale tokenised in the DS (2026-09): font-size/line-height are now variables, realized
  // in code by the scale vars --{m,s,l}-{size,lh} (Gate [3] verifies the values match Figma).
  // node/background/idle: the DS idle variant binds it, but the code intentionally renders the
  // resting node with no fill (its value equals the panel background) — documented in theme.css.
  'node/background/idle',
  'semantic/pattern/appearance',
  // Figma-only: STRING var (CSS cannot consume)
  'font-family',
  // Sizing scale token with no rule consumer (Hard Rule #2)
  'gap/xxl',
  // Sizing tokens with CSS vars via EXPLICIT_SIZING (gate [4] doesn't check EXPLICIT_SIZING)
  'general/thickness', 'general/min-height',
  'radii/button', 'radii/input', 'radii/swatch', 'radii/card',
  'typography/l/font-size', 'typography/l/line-height', 'typography/m/font-size', 'typography/m/line-height',
  'typography/s/font-size', 'typography/s/line-height',
  // listItem/icon has no CSS rule consumer — all icon rows use --buttonList-iconPrimary
  'listItem/icon',
  // listItem/title lost its last consumer with library-atlas (2026-07)
  'listItem/title',
  // listItem/description lost its last consumer when the retired Font Scaling Lab
  // details rows were removed (2026-07-31); DS token still exists, no CSS var now.
  'listItem/description',
  // modal/icon — optional modal-header icon; no plugin renders one yet.
  'modal/icon',
  // semantic/surface/elevation{Low,Medium,High} now consumed — mapped to --bg-detail / --bg /
  // --surface-elevation-high via EXPLICIT.
  // Settings collection icon-builder toggles bound inside DS frames (2026-07-11 bound walk).
  // Figma authoring config for the icon components — no CSS consumer, same class as figmaWindowChrome.
  'icon/background',
  'icon/shape',
  // orphan — DS Idle node state (544:51070) has no stroke; resting .node border is transparent
  'node/border/default',
  // The DS defines these as pure aliases of their idle sibling — node/icon/default/color
  // -> node/icon/idle/color and node/label/default/color -> node/label/idle/color, in BOTH
  // modes (verified against live Figma 2026-07-31). The CSS therefore styles the default
  // state with the idle var; a dedicated var would be a second name for the same value.
  // Bound inside the plugin frames since the 2026-07-31 walk, so gate [4] sees them too —
  // they were already covered for the state walk below.
  'node/icon/default',
  'node/label/default',
]);

// Additional covered tokens specific to the COMPONENT_SET state walk
// (tokens found in variant states but not required in HTML/CSS)
export const COVERED_STATE = new Set([
  ...COVERED,                       // node/icon/default + node/label/default now live in COVERED
  'input/value/empty',              // placeholder color — covered by browser default + :root text
  'buttonList/iconPrimary',    // icon stays constant across hover/selected states
  'buttonList/iconSecondary',  // same — consolidated across states
  'emptyState/icon/positive',  // variant exists in the SET but no plugin uses a positive emptyState — declare when added (mirrors SKIP_TOKENS entry)
]);

// Prefixes always covered/deferred
export const COVERED_PREFIX = ['Settings/', 'primitives/', 'typeBadge/', 'semantic/pattern/'];

// ─── Naming: system/structural CSS vars that have no direct Figma color token ─
// These are exempt from the naming round-trip check.
export const SYSTEM_VARS = new Set([
  // Orphaned by the 2026-07-30 DS pass: the tokens behind these were deleted, but the
  // UI still needs the values. Listed here so the round-trip gate stays honest rather
  // than silently passing. If the DS grows replacements, map them and drop these.
  // Plugin-local layout vars — no Figma token backs these by design. Both exist so
  // one value drives several rules that must stay in step (added 2026-07-22).
  '--depth-label-lh',  // label line box; circle column + connector derive geometry from it
  '--depth-stroke',    // radio ring + connector share one stroke weight
  // Semantic one-word aliases
  '--bg', '--bg-secondary', '--bg-detail',
  '--text', '--text-secondary', '--text-muted',
  '--border',
  '--surface', '--accent',
  // Primitive neutral scale
  ...Array.from({ length: 10 }, (_, i) => `--neutral-${(i + 1) * 100}`),
  // Sizing scale
  '--gap-xs', '--gap-s', '--gap-m', '--gap-l', '--gap-xl',
  '--padding-xxs', '--padding-xs', '--padding-s', '--padding-m', '--padding-l',
  // Typography scale
  '--m-size', '--m-weight', '--m-lh',
  '--s-size', '--s-weight', '--s-lh',
  '--l-size', '--l-weight', '--l-lh',
  // Structural sizing
  '--min-height', '--thickness',
  '--radius-full', '--radius-swatch', '--radius-modal', '--radius-toast',
  '--radius-md', '--radius-tooltip', '--radius-sm', '--radius-checkbox',
  // System / browser chrome
  '--overlay-bg', '--scrollbar-thumb', '--scrollbar-thumb-hover',
  '--input-auto-border',
  '--figmaWindowChrome-background',
  // Badge (grouped under semantic colors, not individual token vars)
  '--badge-neutral',
  '--semantic-negative', '--semantic-warning', '--semantic-positive',
  // Swatch border aliases
  '--swatch-border-filled', '--swatch-border-empty',
  // Primitive color aliases (light/dark adaptive)
  '--red', '--green', '--yellow',
  // Internal component aliases (no dedicated DS token)
  '--input-background',
  '--input-value',
  '--hex-sub-color',
  // tableRow component vars (DS removed tableRow color tokens 2026-06-16)
  '--tableRow-text', '--tableRow-background-hover', '--tableRow-icon',
  // Animation / motion vars (no Figma token equivalent)
  '--modal-duration', '--modal-duration-out',
  '--modal-easing', '--modal-easing-out', '--modal-offset',
  // Plugin-local vars — declared in plugin <style> blocks, no DS token
  '--pantone-focus',
  '--canvas-bg',
  '--clipped-color', '--clipped-text', '--hint-text',
  '--static-white',
  '--badge-color-text', '--badge-float-text', '--badge-string-text', '--badge-boolean-text',
]);

// ─── Primitive neutral scale — enables Gate [2] to follow var() chains ────────
export const NEUTRAL_LIGHT = {
  '100': '#0a0a0a',
  '200': '#2b2b2b',
  '300': '#404040',
  '400': '#595959',
  '500': '#828282',
  '600': '#adadad',
  '700': '#d6d6d6',
  '800': '#e8e8e8',
  '900': '#f7f7f7',
  '1000': '#ffffff',
};

export const NEUTRAL_DARK = {
  '100': '#f5f5f5',
  '200': '#dbdbdb',
  '300': '#bfbfbf',
  '400': '#878787',
  '500': '#5e5e5e',
  '600': '#454545',
  '700': '#303030',
  '800': '#2b2b2b',  // was #262626 until 2026-07-31
  '900': '#212121',  // was #1f1f1f until 2026-08-12
  '1000': '#1c1c1c', // was #171717 until 2026-08-12
};

// ─── TYPOGRAPHY: CSS var → [scale, prop] snapshot path ────────────────────────
// Enables Gate [2] to verify typography token values (size, weight, line-height).
// Each key must be declared in :root; value is [scale, prop] from snap.typography.
export const TYPO = {
  '--m-size':   ['m', 'size'],
  '--m-weight': ['m', 'weight'],
  '--m-lh':     ['m', 'lh'],
  '--s-size':   ['s', 'size'],
  '--s-weight': ['s', 'weight'],
  '--s-lh':     ['s', 'lh'],
  '--l-size':   ['l', 'size'],
  '--l-weight': ['l', 'weight'],
  '--l-lh':     ['l', 'lh'],
};

// ─── EFFECTS: hardcoded CSS effects that must be present per selector ─────────
// Both backdrop overlays use blur(4px) — declared here so regressions are caught.
export const EFFECTS = [
  { selector: '#progress-container:not(:empty)', prop: 'backdrop-filter', expected: 'blur(4px)' },
  { selector: '#toast-overlay',                   prop: 'backdrop-filter', expected: 'blur(4px)' },
];

// ─── FOCUS CONTRACT: how each interactive component handles keyboard focus ─────
export const FOCUS_CONTRACT = [
  { selector: '.inputWrap', type: 'within' },   // input activates :focus-within on child
  { selector: 'button',     type: 'suppress' },  // all buttons: button { outline: none }
];

// ─── SCOPE RULES: CSS vars constrained to specific CSS property types ──────────
// Prevents color tokens from accidentally being used as spacing values.
export const SCOPE_RULES = [
  { var: '--text',           allowedProps: ['color', 'fill', 'stroke', '-webkit-text-fill-color'] },
  { var: '--text-secondary', allowedProps: ['color', 'fill', 'stroke', '-webkit-text-fill-color'] },
  { var: '--text-muted',     allowedProps: ['color', 'fill', 'stroke', '-webkit-text-fill-color'] },
  { var: '--bg',             allowedProps: ['background', 'background-color'] },
  { var: '--bg-secondary',   allowedProps: ['background', 'background-color'] },
  { var: '--bg-detail',      allowedProps: ['background', 'background-color'] },
  { var: '--surface',        allowedProps: ['background', 'background-color'] },
];

// ─── Gate [17]: curated contrast pairs (solid-on-solid) — hard-fail below `min` ───
// Only add pairs whose background is a solid (non-alpha) fill; the resolved snapshot hex
// must be the real rendered background. Auto-derived pairs cover the rest (advisory).
export const CONTRAST_PAIRS = [
  { fg: 'semantic/content/primary/color',   bg: 'semantic/background/color', min: 4.5, note: 'primary body text on the app background' },
  { fg: 'semantic/content/secondary/color', bg: 'semantic/background/color', min: 3.0, note: 'secondary text on the app background (UI/large text 3:1)' },
  { fg: 'buttonPrimary/iconText/color',     bg: 'buttonPrimary/background/color', min: 4.5, note: 'primary button label on its fill' },
];
