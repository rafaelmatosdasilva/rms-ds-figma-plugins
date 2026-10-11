// parity-map.mjs — Single source of truth for all token→CSS var mappings.
// Imported by: parity-check, bound-check, state-check, exemption-check, naming-check.
// Edit this file when a Figma token is renamed, added, or intentionally deferred.
// Never duplicate these maps across scripts — any drift between copies is a hallucination.

// ─── Color: EXPLICIT token→CSS var deviations ────────────────────────────────
// Tokens where the naming convention (token/path → --token-path, drop /default /color)
// does NOT produce the real CSS var name.  null = rgba/non-hex — skip comparison.
export const EXPLICIT = {
  // Every CSS variable carries its Figma token's name (token/path → --token-path, /default and /color dropped).
  // Only a token whose CSS form needs a note stays here.
  'overlay':                           '--overlay',  // a colour with its own opacity in Figma (88%), rgba in CSS
};

// ─── Color: tokens with no CSS implementation ────────────────────────────────
// Figma chrome, permanently unbound nodes, rgba-only tokens.
export const SKIP_TOKENS = new Set([
  'figmaWindowChrome/title',
  'figmaWindowChrome/button',
  // figmaWindowChrome/divider now HAS a var (--figmaWindowChrome-divider) — actionbar/border
  // was rebound to it (2026-08), so it's consumed and round-trips like any component token.
  // figmaWindowChrome/background likewise has --figmaWindowChrome-background via elevationHigh.
  'node/label/default',              // bound only on State=Active (551:253151 set) — no Active node state in any plugin yet; declare when added
  'node/icon/default',               // same — Active-state icon color, no plugin consumer yet
  // panel/background split into two variants 2026-09-13 (panel is now a type=primary/secondary set):
  //  - primary   aliases semantic/surface/elevationMedium → --semantic-surface-elevationMedium      (N900 both modes)
  //  - secondary aliases semantic/surface/elevationLow    → --semantic-surface-elevationLow (N800 L / N1000 D)
  // Both covered via the existing surface vars — no dedicated panel-bg var (matches the 2026-08 rebind).
  'panel/background/primary',
  'panel/background/secondary',
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


// ─── Sizing: EXPLICIT sizing token→CSS var deviations ────────────────────────
export const EXPLICIT_SIZING = {
  // Every sizing variable carries its Figma token's name (radii/button → --radii-button, typography/m/font-size →
  // --typography-m-font-size): nothing to map.
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
  // panel/background split 2026-09-13 into primary (→ --semantic-surface-elevationMedium, elevationMedium) and
  // secondary (→ --semantic-surface-elevationLow, elevationLow) — the panel is now a type=primary/secondary set.
  'panel/background/primary',
  'panel/background/secondary',
  'general/window-radii',
  // Type scale tokenised in the DS (2026-09): font-size/line-height are now variables, realized
  // in code by the scale vars --{m,s,l}-{size,lh} (Gate [3] verifies the values match Figma).
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
  // semantic/surface/elevation{Low,Medium,High} now consumed — mapped to --semantic-surface-elevationLow / --semantic-surface-elevationMedium /
  // --semantic-surface-elevationHigh via EXPLICIT.
  // Settings collection icon-builder toggles bound inside DS frames (2026-07-11 bound walk).
  // Figma authoring config for the icon components — no CSS consumer, same class as figmaWindowChrome.
  'icon/background',
  'icon/shape',
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
  '--semantic-surface-elevationMedium', '--bg-secondary', '--semantic-surface-elevationLow',
  '--semantic-content-primary', '--semantic-content-secondary', '--text-muted',
  '--dividerLine-border',
  '--input-background-filled', '--accent',
  // Primitive neutral scale
  ...Array.from({ length: 10 }, (_, i) => `--neutral-${(i + 1) * 100}`),
  // Sizing scale
  '--gap-xs', '--gap-s', '--gap-m', '--gap-l', '--gap-xl',
  '--padding-xxs', '--padding-xs', '--padding-s', '--padding-m', '--padding-l',
  // Typography scale
  '--typography-m-font-size', '--typography-m-font-weight', '--typography-m-line-height',
  '--typography-s-font-size', '--typography-s-font-weight', '--typography-s-line-height',
  '--typography-l-font-size', '--typography-l-font-weight', '--typography-l-line-height',
  // Structural sizing
  '--general-min-height', '--general-thickness',
  '--radii-button', '--radii-swatch', '--radii-modal', '--radii-toast',
  '--radii-card', '--radii-tooltip', '--radius-sm', '--radii-checkbox',
  // System / browser chrome
  '--overlay', '--scrollbar-thumb', '--scrollbar-thumb-hover',
  '--input-auto-border',
  '--figmaWindowChrome-background',
  // Badge (grouped under semantic colors, not individual token vars)
  '--badge-background-neutral',
  '--semantic-negative', '--semantic-warning', '--semantic-positive',
  // Swatch border aliases
  '--swatch-border-filled-primary', '--swatch-border-empty-primary',
  // Primitive color aliases (light/dark adaptive)
  '--red', '--green', '--yellow',
  // Internal component aliases (no dedicated DS token)
  '--input-background',
  '--input-value-filled',
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
  '--typography-m-font-size':   ['m', 'size'],
  '--typography-m-font-weight': ['m', 'weight'],
  '--typography-m-line-height':     ['m', 'lh'],
  '--typography-s-font-size':   ['s', 'size'],
  '--typography-s-font-weight': ['s', 'weight'],
  '--typography-s-line-height':     ['s', 'lh'],
  '--typography-l-font-size':   ['l', 'size'],
  '--typography-l-font-weight': ['l', 'weight'],
  '--typography-l-line-height':     ['l', 'lh'],
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
  { var: '--semantic-content-primary',           allowedProps: ['color', 'fill', 'stroke', '-webkit-text-fill-color'] },
  { var: '--semantic-content-secondary', allowedProps: ['color', 'fill', 'stroke', '-webkit-text-fill-color'] },
  { var: '--text-muted',     allowedProps: ['color', 'fill', 'stroke', '-webkit-text-fill-color'] },
  { var: '--semantic-surface-elevationMedium',             allowedProps: ['background', 'background-color'] },
  { var: '--bg-secondary',   allowedProps: ['background', 'background-color'] },
  { var: '--semantic-surface-elevationLow',      allowedProps: ['background', 'background-color'] },
  { var: '--input-background-filled',        allowedProps: ['background', 'background-color'] },
];

// ─── Gate [17]: curated contrast pairs (solid-on-solid) — hard-fail below `min` ───
// Only add pairs whose background is a solid (non-alpha) fill; the resolved snapshot hex
// must be the real rendered background. Auto-derived pairs cover the rest (advisory).
export const CONTRAST_PAIRS = [
  { fg: 'semantic/content/primary/color',   bg: 'semantic/background/color', min: 4.5, note: 'primary body text on the app background' },
  { fg: 'semantic/content/secondary/color', bg: 'semantic/background/color', min: 3.0, note: 'secondary text on the app background (UI/large text 3:1)' },
  { fg: 'buttonPrimary/iconText/color',     bg: 'buttonPrimary/background/color', min: 4.5, note: 'primary button label on its fill' },
];
