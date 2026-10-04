// structure-contract.mjs — figma-plugins project root.
// Consumed by rms-parity structure-check.mjs and subcomponent-isolation-check.mjs.

// ─── Structural contract (ground-truth per component, State=Default variant) ──
export const CONTRACT = {
  // card (DS 2120:62601) — bordered rounded container (1.5px card/border, radii/card),
  // padding gap/xl, vertical gap/l. h is the DS artboard measure; content-driven in CSS.
  // (DS renamed the component Card → card on 2026-09-09; CSS class was already `.card`.)
  card: {
    h: 248,
    paddingVar: { tb: 'gap/xl', lr: 'gap/xl' },
    gapVar: 'gap/l',
    fontSizeVar: 's', fontWeightVar: 's',  // Figma: the card's text is the s style
    fillStructure: 'none', innerInset: null, innerRadiusVar: 'radii/card',
    strokeOnDefault: true, strokeOnAnyState: true,
    strokeSides: 'all',  // Figma: 1.5 all four sides (card/border)
  },
  // switch (DS 2120:3385) — toggle track + knob + description, On/Off states. No own border
  // (the track/knob are filled shapes); h is the 24px track height.
  switch: {
    h: 24,
    paddingVar: { tb: null, lr: null },
    gapVar: 'gap/m',
    // The root .switch row carries no direct text — the DS Description (m style) lives on the
    // .switch-description child (verified via its own rule), so no font var on the root.
    fontSizeVar: 'm', fontWeightVar: 'm',  // Figma binds the m style on the root (2026-10)
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: false,
    // DS Content frame (2083:26255) is FLUSH: Description right edge meets tooltipButton at x=62,
    // no gap token (gapPx 0). Pinned with gapPx so a re-added inner gap fails — .switch-content
    // once had gap/xs, pushing the icon ~4px off. (buttonSecondary is also flush but has no code
    // sub-selector, so it stays uncontracted/unbound — advisory-ignored, never a failure.)
    children: [
      { name: 'Content', cssSelector: '.switch-content', gapPx: 0 },
      // Figma: the nested buttonSecondary keeps its own padding/xs left and right (the tooltip trigger).
      { name: 'buttonSecondary', cssSelector: null, gapVar: null, paddingVar: { tb: null, lr: 'padding/xs' },
        verifiedBy: 'the nested buttonSecondary component, whose own rule carries padding/xs left and right' },
    ],
    propertyMap: { 'Enable': { True: '.switch-input:checked + .switch-track', False: '.switch-track' } },
  },
  // checkBoxGroup (DS 2064:29545) — a labelled vertical stack of checkboxes. No fixed
  // selector for structural geometry (it's content-driven and has no plugin consumer yet);
  // its gaps + label text style are locked via RENDERED_ASSERTIONS with injected probes.
  // Listed here so the naming round-trip recognises `.checkBoxGroup` as a DS component.
  checkBoxGroup: {
    _note: "Labelled vertical stack of checkboxes: Label (s, content/secondary) gap/m above a Slot that stacks rows at gap/s. Built base .checkBoxGroup (2026-08).",
    h: 53,  // DS-measured (Label 15 + gap/m 8 + empty Slot 15); content-driven in CSS (no
            // COMPONENT_CSS_SELECTORS entry → height is not asserted against CSS, only vs snapshot)
    paddingVar: { tb: null, lr: null },
    gapVar: 'gap/m',
    fontSizeVar: 's', fontWeightVar: 's',
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: false,
  },
  // radioButtonGroup (DS) — a labelled group of radios laid in a ROW. Label (s style,
  // content/secondary) sits gap/m above a Slot that spaces the radios at gap/xxxl.
  // Content-driven height (no COMPONENT_CSS_SELECTORS entry); gaps + label locked via
  // RENDERED_ASSERTIONS. strokeOnAnyState is the nested radioButton's circle border.
  radioButtonGroup: {
    _note: "Labelled ROW of radios: Label (s, content/secondary) gap/m above a Slot spacing radios at gap/xxxl (32). Built base .radioButtonGroup (2026-09-09).",
    h: 62.5,
    paddingVar: { tb: null, lr: null },
    gapVar: 'gap/m',
    fontSizeVar: null, fontWeightVar: null,  // Figma: no text style on the root; the label carries s
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',  // no OWN border — the only stroke is the nested radioButton's circle
  },
  // highlight (DS) — a red highlight pill: bg highlight/background, s text, gap/xs, padding/s LR, h24.
  highlight: {
    _note: "Red highlight pill (bg highlight/background, s text). Built base .highlight (2026-09-09).",
    h: 24,
    paddingVar: { tb: null, lr: 'padding/s' },
    gapVar: 'gap/xs',
    fontSizeVar: 's', fontWeightVar: 's',
    fillStructure: 'direct', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: false,
  },
  // highlightSelector (DS) — a 10px selection marker: red fill + 2px highlightSelector/border ring.
  highlightSelector: {
    _note: "10px selection marker (red fill + 2px highlightSelector/border). Built base .highlightSelector (2026-09-09).",
    h: 10,
    paddingVar: { tb: null, lr: null },
    gapVar: null,
    fontSizeVar: null, fontWeightVar: null,
    fillStructure: 'before', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',  // Figma: the ring is drawn by the layer under the fill, not a stroke on the root
    propertyMap: { 'state': { default: '.highlightSelector', selected: '.highlightSelector.selected' } },
  },
  // dividerLine (DS) — a thin rule (dividerLine/border). Height informational (code renders 1px).
  dividerLine: {
    _note: "Thin rule (dividerLine/border). Built base .dividerLine.",
    h: 2, sizing: 'hug',
    paddingVar: { tb: null, lr: null },
    gapVar: null,
    fontSizeVar: null, fontWeightVar: null,
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: false,
  },
  // buttonStepper (DS) — a −/value/+ row: two buttonSecondary flanking an input at gap/xs.
  // Pure layout wrapper; strokeOnAnyState is the nested buttonSecondary/input borders.
  buttonStepper: {
    _note: "−/value/+ row: two buttonSecondary flanking an input at gap/xs. Built base .buttonStepper (2026-09-09).",
    h: 24, sizing: 'hug',
    paddingVar: { tb: null, lr: null },
    gapVar: 'gap/xs',
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',
  },
  // segmentedControlSegment (DS) — one segment of a segmentedControl (maps to
  // `.segmented-control button` via componentSelectors). h24, padding/xxs T/B + padding/m L/R,
  // gap/xs, s text. Its own border is transparent; the selected ring is the parent pill's.
  segmentedControlSegment: {
    _note: "One segment of a segmentedControl → .segmented-control button. Own border transparent; selected ring is the parent pill's.",
    h: 24,
    paddingVar: { tb: 'padding/xxs', lr: 'padding/m' },
    gapVar: 'gap/xs',
    fontSizeVar: 's', fontWeightVar: 's',
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',
  },
  // modal (DS 672:141311) — slotted dialog card → .modal-card. padding/l, gap/xl, radii/modal,
  // modal/background fill. Content-driven height. strokeOnAnyState is the nested buttons'.
  modal: {
    _note: "Slotted dialog card (DS 672:141311) → .modal-card: padding/l, gap/xl, radii/modal, modal/background.",
    h: 130, sizing: 'hug',
    paddingVar: { tb: 'padding/l', lr: 'padding/l' },
    gapVar: 'gap/xl',
    fontSizeVar: 'l', fontWeightVar: 'l',  // Figma binds the l style on the card
    fillStructure: 'direct', innerInset: null, innerRadiusVar: 'radii/modal',
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',
    children: [
      { name: 'header', cssSelector: '.modal-header', gapVar: 'gap/s', paddingVar: { tb: null, lr: null } },
      { name: 'Actions', cssSelector: '.modal-footer', gapVar: 'gap/m', paddingVar: { tb: null, lr: null } },
    ],
  },
  // emptyState (DS 1431:21215) — centred Icon + Title(m) + Description(s) → .empty-state.
  // Content-driven height; gap/xl between icon-group and text. No own fill/stroke.
  emptyState: {
    _note: "Centred Icon + Title(m) + Description(s) (DS 1431:21215) → .empty-state. Content-driven height.",
    h: 131, sizing: 'hug',
    paddingVar: { tb: null, lr: null },
    gapVar: 'gap/xl',
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: false,
    children: [{ name: 'Content', cssSelector: '.empty-state-content', gapVar: 'gap/s', paddingVar: { tb: null, lr: null } }],
    propertyMap: { 'type': { default: '.empty-state', positive: '.empty-state.empty-state--positive' } },
  },
  // listItem (DS 503:49751) — a list row: Icon + Main(title m / description s), trailing dividerLine.
  // Content-driven height; gap/m row spacing. strokeOnAnyState is the trailing dividerLine's.
  listItem: {
    _note: "List row (DS 503:49751): Icon + Main(title m / description s) + trailing dividerLine. Built base .listItem (2026-09-10).",
    h: 43, sizing: 'hug',
    paddingVar: { tb: null, lr: null },
    gapVar: 'gap/m',
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',
    children: [{ name: 'Frame 106', cssSelector: '.listItem-row', gapVar: 'gap/m', paddingVar: { tb: null, lr: null } }],
  },
  // overlay (DS) — a full-cover scrim (overlay/color) centring a Slot (loader). → .overlay
  overlay: {
    _note: "Full-cover scrim (overlay/color) centring a loader Slot. Built base .overlay (2026-09-10).",
    h: 380, sizing: 'hug',
    paddingVar: { tb: 'padding/l', lr: 'padding/l' },
    gapVar: null,
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',
  },
  buttonList: {
    _note: "strokeSides=bottom (items stack touching — only bottom stroke visible). hover/selected Content h=32, fills full outer width (outer padding=0). CSS: border-bottom only; ::before inset=4px_0, border-radius=var(--radius-full)",
    // Prose guidance from the DS, nothing to verify in CSS: the action slot is
    // intentionally per-project, so no fixed selector can be asserted.
    annotations: { 'Actions can changed based on the project needs': null },
    h: 40,
    paddingVar: { tb: null, lr: null },  // Figma: no root padding; the Container carries padding/s left and right
    gapVar: null, // Figma root has null; gap/s lives on "Content" child frame → asserted via CSS_PROPERTY_ASSERTIONS
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'none', innerRadiusVar: null,
    strokeOnDefault: true,
    strokeSides: 'bottom',    // stacked list — only bottom border visible (border-bottom only)
    hoverPill: { innerH: 32, radiusVar: 'radii/button', insetH: 0 }, // insetH=0 → full-width pill
    // Gate [3j] — hover/selected use padding/s right. NO gapVar: the root gap stays gap/s
    // in every state (DS Content icon↔label = gap/s in all variants — the label must never
    // shift on hover). The DS hover Container gap/m is Content↔Actions only; the Actions
    // gap/m (action↔arrow) = root gap/s + margin-right on .buttonList-action.
    // Locked by RENDERED_ASSERTIONS (columnGap 4px asserted across all three states).
    states: {
      hover:    { paddingVar: { r: 'padding/s' } },
      selected: { paddingVar: { r: 'padding/s' } },
    },
    children: [
      // DS "Container" child frame — flattened into .buttonList root: gap/s is on the root rule
      // (asserted in CSS_PROPERTY_ASSERTIONS), tb padding/xs is geometric (fixed h=40 + ::before
      // pill inset 4px 0). cssSelector: null skips the [3f] CSS lookup; snapshot cross-check runs.
      { name: 'Container', cssSelector: null, gapVar: 'gap/s', paddingVar: { tb: 'padding/xs', lr: 'padding/s' },
        verifiedBy: 'geometric — tb padding/xs is absorbed by the fixed h=40 + ::before pill inset (4px 0); no code padding to assert' },
    ],
    propertyMap: {
      'State':       { default: '.buttonList', hover: '.buttonList:hover', selected: '.buttonList.selected' },
      'show Action Focus': '.buttonList.no-button .buttonList-action',
    },
  },
  node: {
    h: 40,
    paddingVar: { tb: null, lr: 'padding/s' },
    gapVar: 'gap/s',
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'direct', innerRadiusVar: 'radii/button',
    strokeOnDefault: true,
    strokeSides: 'all',  // Figma: 1.5 all four sides (verified 2026-08)
    // DS State=Default (the resting card) now carries node/border/default — the DS re-added the
    // stroke it had dropped. The resting card in Impact Atlas is the base `.node`, so it draws
    // that border; the DS Idle variant (node/border/idle) maps to `.node.node-unselected`.
    restingState: 'Default', restingStroke: true,   // Impact Atlas renders the bordered Default variant at rest
    propertyMap: {
      // DS states (544:74211): Default = base .node (node/border/default), Idle = .node-unselected
      // (node/border/idle), Hover = :hover, plus the Selected & Disabled axes.
      'State': { Default: '.node', Idle: '.node.node-unselected', Hover: '.node:hover', Disabled: '.node.node-disabled' },
      'Selected': { True: '.node.node-selected', False: '.node' },
      'Disabled': { True: '.node.node-disabled', False: '.node' },
      'Show Icon': '.node.no-icon .node-type-icon',
    },
  },
  segmentedControl: {
    h: 24,
    paddingVar: { tb: 'padding/xxs', lr: 'padding/m' },
    gapVar: 'gap/xs',
    fontSizeVar: 's', fontWeightVar: 's', // DS label text style = s (10px/700) — corrected 2026-07-11
    fillStructure: 'none', innerRadiusVar: null,
    strokeOnDefault: false,
    figmaName: 'segmentedControlSegment',
    propertyMap: {
      // Variant: both selected and unselected states must have CSS rules
      'Selected':    { 'True': '.segmented-control button.selected', 'False': '.segmented-control button' },
      // Show Label: label visible by default; collapsed via container query when too narrow
      'Show Label':  { show: '.tab-label', hide: '@container (max-width: 72px)' },
      'Icon Content': null, // INSTANCE_SWAP — skip
      // These boolean properties exist in DS but have no dedicated CSS toggle in code
      'Show Icon':   '.segmented-control button.no-icon svg',
      'Show Status': '.segmented-control button.no-status .seg-status',
      'Show Number': '.segmented-control button.no-number .seg-number',
      'Label Content': null, // TEXT property — skip
      'Number Content': null, // TEXT property — skip
    },
  },
  badge: {
    h: 19, sizing: 'hug',   // hugs content — h is informational, not gated (no fixed code height)
    paddingVar: { tb: 'padding/xxs', lr: 'padding/s' },
    gapVar: 'gap/s',
    fontSizeVar: 's', fontWeightVar: 's',
    fillStructure: 'before', innerRadiusVar: 'radii/button',
    strokeOnDefault: false,
    propertyMap: {
      // Figma Type: negative/warning/positive/neutral → CSS classes: high/medium/low/none
      'Type':       { negative: '.badge.high', warning: '.badge.medium', positive: '.badge.low', neutral: '.badge.none' },
      'Show Label': '.badge.no-label .badge-label',
      'Show Icon':  '.badge.no-icon svg',
    },
  },
  input: {
    h: 24,
    paddingVar: { tb: null, lr: 'padding/s' },
    gapVar: 'gap/s',
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'none', innerRadiusVar: 'radii/input',
    strokeOnDefault: false,
    propertyMap: {
      'State':          { Default: '.inputWrap', Hover: '.inputWrap:not(.inputWrap--readonly):hover', Focus: '.inputWrap:not(.inputWrap--readonly):focus-within' },
      'Disabled':       { True: '.inputWrap.inputWrap--disabled', False: '.inputWrap' },
      'Filled':          { True: '.inputWrap', False: '.inputWrap.empty' },
      'Show Icon Right': '.inputWrap.no-icon-right .icon-right',
      'Show Icon Left':  '.inputWrap.no-icon-left .icon-left',
      'Show Label Before': '.inputWrap .inputLabel',
      'Show Value':      '.inputWrap.no-value .inputField',
    },
  },
  tooltipPopover: {
    h: 23, sizing: 'hug',   // hugs content — h is informational, not gated
    paddingVar: { tb: 'padding/xs', lr: 'padding/s' },
    gapVar: 'gap/xl',
    fontSizeVar: 's', fontWeightVar: 's',
    fillStructure: 'direct', innerRadiusVar: 'radii/tooltip',
    strokeOnDefault: true,
    strokeSides: 'all',  // Figma: 1.5 all four sides (verified 2026-08)
  },
  toast: {
    // DS 2026-09: the loading variant was removed from `toast` (loading now lives in the `loader`
    // component). `toast` is now just the success/error notification at h=32. The loading banner
    // (.progress-msg) still exists in code but is the loader, not a toast state.
    h: 32,
    paddingVar: { tb: 'padding/s', lr: 'padding/m' },
    gapVar: 'gap/xl',
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'direct', innerRadiusVar: 'radii/toast',
    strokeOnDefault: false,
    // The icon and title sit in Frame 39 (gap/s), drawn as .toast-body inside the .toast root (gap/xl).
    children: [
      { name: 'Frame 39', cssSelector: '.toast-body', gapVar: 'gap/s', paddingVar: { tb: null, lr: null } },
    ],
    propertyMap: {
      'Type':             { sucess: '.toast', error: '.toast.toast-error' }, // DS typo: "sucess"
      'Show Description': '.toast-description',
    },
  },
  buttonSecondary: {
    h: 24,
    paddingVar: { tb: null, lr: 'padding/xs' },
    gapVar: null, gapPx: 0, // DS root is flush (rootGap 0) — label↔icon spacing is the span padding only; enforces .buttonSecondary { gap:0 }
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'before', innerInset: null, innerRadiusVar: 'radii/button',
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'all',  // Figma: 1.5 all four sides on the Background rect (verified 2026-08)
    children: [
      // DS LabelContainer: label span carries padding/xs LR inside the root's padding/xs
      // (same DS-faithful pattern as .buttonTertiary span)
      { name: 'LabelContainer', cssSelector: '.buttonSecondary span', gapVar: null, paddingVar: { tb: null, lr: 'padding/xs' } },
    ],
    propertyMap: {
      'state':      { Default: '.buttonSecondary', hover: '.buttonSecondary:hover', Disabled: '.buttonSecondary:disabled' },
      'show-icon':  '.buttonSecondary svg',
      'show-label': '.buttonSecondary:has(svg):not(:has(span))',
    },
  },
  buttonQuaternary: {
    h: 24,
    paddingVar: { tb: null, lr: 'padding/xs' },
    gapVar: null, gapPx: 0, // DS root flush (rootGap 0); enforces .buttonQuaternary { gap:0 }
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: false, // icon has stroke-width via general/thickness but button FRAME has no border
    children: [
      // DS LabelContainer: label span carries padding/xs LR (same pattern as .buttonTertiary span)
      { name: 'LabelContainer', cssSelector: '.buttonQuaternary span', gapVar: null, paddingVar: { tb: null, lr: 'padding/xs' } },
    ],
    propertyMap: {
      'state':      { default: '.buttonQuaternary', hover: '.buttonQuaternary:hover::before' },
      'show-Icon':  '.buttonQuaternary svg',
      'show-label': '.buttonQuaternary:has(svg):not(:has(span))',
    },
  },
  swatch: {
    h: 24,
    paddingVar: { tb: null, lr: null },
    gapVar: null,
    fontSizeVar: null, fontWeightVar: null,
    fillStructure: 'none', innerInset: null, innerRadiusVar: 'radii/swatch',
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'all',  // Figma: 1.5 all four sides on the Background rect (verified 2026-08)
    propertyMap: {
      'filled': { true: '.swatch', false: '.swatch.empty' },
    },
  },
  overflowList: {
    h: 32,
    paddingVar: { tb: null, lr: 'padding/s' },
    gapVar: 'gap/s',
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'before', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: true,
    // DS Background rect (65:11485) strokes bottom ONLY (1.5px general/thickness); top/left/
    // right = 0. It's a row divider, not a boxed border → CSS must be border-bottom only.
    strokeSides: 'bottom',
    propertyMap: {
      'State': { Default: '.overflowList', Hover: '.overflowList:hover' },
    },
  },
  // Added 2026-07-23 — both had CSS but no contract, so nothing checked their
  // geometry. Captured from DS nodes 65:11757 and 1428:21123.
  overflow: {
    h: 'auto',                                  // content-driven container
    paddingVar: { tb: 'padding/xs', lr: null },
    gapVar: null,
    fontSizeVar: 's', fontWeightVar: 's',
    fillStructure: 'direct', innerInset: null, innerRadiusVar: 'radii/card',
    strokeOnDefault: true, strokeOnAnyState: true,
    strokeSides: 'all',  // Figma: 1 all four sides on the flyout frame (verified 2026-08)
    children: [{ name: 'Frame 27', cssSelector: '.overflow-label', gapVar: null, paddingVar: { tb: 'padding/xs', lr: 'padding/s' } }],
  },
  buttonPrimary: {
    h: 24,
    paddingVar: { tb: null, lr: 'padding/xs' },
    gapVar: null, gapPx: 0, // DS root flush (rootGap 0); enforces .buttonPrimary { gap:0 }
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'before', innerInset: null, innerRadiusVar: 'radii/button',
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',  // Figma: no stroke on any variant — the flag is defensive; buttonPrimary is a solid fill (verified 2026-08)
    children: [
      { name: 'LabelContainer', cssSelector: '.buttonPrimary span', gapVar: null,
        paddingVar: { tb: null, lr: 'padding/xs' } },
    ],
    childFramePadding: [
      { name: 'LabelContainer', cssSelector: '.buttonPrimary span', paddingVar: { tb: null, lr: 'padding/xs' } },
    ],
    propertyMap: { 'disabled': { false: '.buttonPrimary', true: '.buttonPrimary:disabled' } },
  },
  tooltipButton: {
    // DS node 1810:27212 — 24×24 info/help trigger. Icon varies by feature
    // (annotation below), so only the wrapper is contracted, not the glyph.
    h: 24,
    paddingVar: { tb: null, lr: null },
    gapVar: null,
    fontSizeVar: null, fontWeightVar: null,
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: false,
    annotations: { 'Icon can change depending on the feature': null },
  },
  dividerSection: {
    h: 24,
    // DS 2026-09-09: compact — root has no padding (was padding/l top + padding/xs bottom, h44).
    // Vertical rhythm now lives on the Content child (.dividerSection-content, padding/xs).
    paddingVar: { tb: null, lr: null },
    // Root gap separates Content from the optional trailing action (DS 135:46577).
    gapVar: 'gap/m',
    fontSizeVar: 's', fontWeightVar: 's',
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    // The component frame carries no stroke; the only stroke in its subtree belongs
    // to the nested buttonSecondary instance. Verified against Figma 2026-07-31.
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',  // no OWN border: Figma keeps a 1px right weight but its paint is hidden (checked 2026-10)
    children: [
      { name: 'Content', cssSelector: '.dividerSection-content', gapVar: 'gap/s',
        paddingVar: { tb: 'padding/xs', lr: null } },
    ],
    childFramePadding: [
      { name: 'Content', cssSelector: '.dividerSection-content', paddingVar: { tb: 'padding/xs', lr: null } },
    ],
    annotations: {
      'Background must match the containing surface. Set it explicitly using the surface color token. Never rely on transparency or CSS inheritance.': { sel: '.dividerSection', prop: 'background', expectedVar: '--bg' },
    },
    propertyMap: {
      'show priority':  '.dividerSection.no-priority .tier-dot',
      'show number':    '.dividerSection.no-number .count',
      'label content':  null, // TEXT — skip
      'number content': null, // TEXT — skip
    },
  },
  buttonTertiary: {
    h: 24,
    paddingVar: { tb: null, lr: 'padding/xs' },
    gapVar: null, gapPx: 0, // DS root flush (rootGap 0); enforces .buttonTertiary { gap:0 }
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'before', innerRadiusVar: 'radii/button',
    strokeOnDefault: false,
    children: [
      // DS LabelContainer child: padding/xs LR inside the label+icon wrapper
      { name: 'LabelContainer', cssSelector: '.buttonTertiary span', gapVar: null, paddingVar: { tb: null, lr: 'padding/xs' } },
    ],
    propertyMap: {
      'state':      { default: '.buttonTertiary', active: '.buttonTertiary:hover', Disabled: '.buttonTertiary:disabled' },
      'show-Icon':  '.buttonTertiary svg',
      'show-label': '.buttonTertiary span',
    },
  },
  radioButton: {
    // Figma DS: HORIZONTAL layout, gap/m between circle and content, no padding on root.
    // In Impact Atlas the radioButton maps to .depth-option (Default), .depth-option.done (Selected),
    // .depth-radio-input:checked (Current), .depth-option.unavailable (Unselected).
    // The border lives on the .depth-circle child, not the root — strokeOnDefault: false.
    h: 40, sizing: 'hug',   // hugs content — h is informational, not gated (DS grew 33→40 on 2026-09-09)
    gapVar: 'gap/m',
    paddingVar: { tb: null, lr: null },
    fontSizeVar: 'm',
    fontWeightVar: 'm',
    fillStructure: 'none',
    innerInset: null,
    innerRadiusVar: null,
    strokeOnDefault: false,
    strokeOnAnyState: true,
    children: [{ name: 'Content', cssSelector: '.radioButton-content', gapVar: 'gap/m', paddingVar: { tb: null, lr: null } }],
    strokeSides: 'all',  // Figma: 1.5 all four sides on the circular Radio child (verified 2026-08). Border is on the plugin .depth-circle — no base selector, so this documents intent (rendered checks cover the plugin CSS).
    propertyMap: {
      'State': {
        Default:    '.depth-option',
        Selected:   '.depth-option.done',
        Current:    '.depth-radio-input:checked',
        Unselected: '.depth-option.unavailable',
      },
    },
  },
  panel: {
    _note: "2026-09-13: panel is now a COMPONENT_SET (2287:68241) with variants type=primary (fill panel/background/primary = elevationMedium/--bg) and type=secondary (fill panel/background/secondary = elevationLow/--bg-detail). Both variants: VERTICAL, lr padding/l, slots HeadContent (top padding/l, bottom padding/s, gap/xl) over MainContent (gap/xl). Right-edge weight 1.5 preserved (side divider); stroke paint empty — edge geometry + .left-panel/.sidePanel border-right (panel/border) hold it. Empty structural shell; plugins hand-build (header row + .scroll-area / .sidePanel), so documentary. Primary surface = .left-panel/.sidePanel (--bg); secondary = #right-detail/#graph-body (--bg-detail).",
    // Figma DS: VERTICAL container, fill=panel/background/color, stroke=panel/border/color.
    // In plugins: .left-panel uses --bg (panel/background via EXPLICIT) and --divider for border.
    // Only the left panel is a DS panel; right panel is a bare content container.
    // 2026-09-12 restructure (node 505:48510 → 505:43484): the single Content slot was split
    // into two SLOTs — HeadContent (top padding/l, bottom padding/s, gap/xl) over MainContent
    // (gap/xl). The panel gained lr padding/l (previously the child rows carried it). It is an
    // empty structural shell filled per-context; the plugins hand-build the panel (header row +
    // .scroll-area), so these fields document intent, not a base selector to assert against.
    h: 460,
    gapVar: null,
    paddingVar: { tb: null, lr: 'padding/l' },
    fontSizeVar: null,
    fontWeightVar: null,
    fillStructure: 'direct',
    innerInset: null,
    innerRadiusVar: null,
    strokeOnDefault: false,
    strokeOnAnyState: false,
    strokeSides: 'right',  // Figma: right-edge weight 1.5 (0/1.5/0/0) — the side-panel divider (verified 2026-08; edge weight preserved through the 2026-09-12 restructure). NOTE: the DS stroke PAINT now reads empty on the component + all in-context instances; the edge-weight geometry + the plugin .left-panel border-right (panel/border) hold the divider. No base selector, so this documents intent.
    children: [
      // 2026-09-12 restructure: two empty SLOTs filled per-context. Plugins hand-build the panel
      // (header row + .scroll-area), so cssSelector: null skips the [3f] CSS lookup — the snapshot
      // cross-check still runs. HeadContent top=padding/l, bottom=padding/s (tb records the top).
      { name: 'HeadContent', cssSelector: null, gapVar: null, paddingVar: { tb: null, lr: null },
        verifiedBy: 'RENDERED_ASSERTIONS .sidePanelHeader (paddingTop 16 / paddingBottom 8 / paddingLeft 16, font-scaling-lab). impact-atlas realizes the header region via .actionbar + .scroll-area, each with their own paddingTop assertions.' },
      { name: 'MainContent', cssSelector: null, gapVar: null, paddingVar: { tb: null, lr: null } },
    ],
    propertyMap: {
      'side': { left: '.left-panel' },
      'type': { primary: '.panel', secondary: '.panel.panel--secondary' },
    },
  },
  statusBar: {
    // Figma DS 789:38384: h=48 (24px content + padding/m × 2; tb rebound padding/l→padding/m
    // 2026-08), lr padding/l, root gap gap/xl (slot-group separation — flattened via flex:1
    // spacer in consumers; visible inter-item gap is the DS Content-level gap/m). Base class
    // .statusBar in theme.css, which draws Figma's top and bottom dividerLine layers.
    h: 48,
    gapVar: 'gap/xl',
    paddingVar: { tb: 'padding/m', lr: 'padding/l' },
    fontSizeVar: null,
    fontWeightVar: null,
    fillStructure: 'none', // DS removed statusBar fill (verified 2026-07-11: fills=[] on 789:38384) — CSS has no background either
    innerInset: null,
    innerRadiusVar: null,
    // Figma (2026-10): no stroke on the root; two dividerLine layers draw the top and bottom lines.
    strokeOnDefault: false,
    strokeOnAnyState: false,
    strokeSides: 'none',
    propertyMap: {
      'Show dividerLine Top':    '.statusBar.no-divider-top::before',
      'Show dividerLine Bottom': '.statusBar.no-divider-bottom::after',
    },
  },
  actionBar: {
    // Figma DS 138:16657: h=48 (24px content + padding/m × 2; tb rebound padding/s→padding/m
    // 2026-08), lr padding/l, root itemSpacing 0 (Slot — content gaps from slotted groups;
    // base uses gap/m). Base class .actionbar in theme.css.
    h: 48, sizing: 'hug',  // Figma hugs its slot (78.79 is the placeholder content); 48 is the empty bar
    gapVar: null,
    paddingVar: { tb: 'padding/m', lr: 'padding/l' },
    fontSizeVar: null,
    fontWeightVar: null,
    fillStructure: 'before',  // Figma: the background is its own layer
    innerInset: null,
    innerRadiusVar: null,
    // Figma (2026-10): no stroke on the root; two dividerLine layers draw the top and bottom lines.
    strokeOnDefault: false,
    strokeOnAnyState: false,
    strokeSides: 'none',
    propertyMap: {
      'Show dividerLine Top':    '.actionbar.no-divider-top::after',
      'Show dividerLine Bottom': '.actionbar.no-divider-bottom::after',
      'Show Background':         '.actionbar.no-background::before',
    },
  },
  // checkBox (DS 1963:43561) — built base .checkbox. Box (radii/checkbox, bordered) child + label.
  checkBox: {
    _note: "built base .checkbox (2026-08)",
    h: 30, sizing: 'hug',
    paddingVar: { tb: null, lr: null },
    gapVar: 'gap/m',
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'none', innerInset: null, innerRadiusVar: null,
    strokeOnDefault: false, strokeOnAnyState: true,
    strokeSides: 'none',  // Figma: no stroke on the root; the box child carries it
    propertyMap: {
      'State': { Default: '.checkbox-box', Selected: '.checkbox-input:checked + .checkbox-box' },
    },
  },
  // loader (DS 68:52296) — built base .loader (was toast variant). radii/toast pill, direct fill.
  loader: {
    _note: "built base .loader (2026-08; was toast loading variant)",
    h: 45, sizing: 'hug',
    paddingVar: { tb: 'padding/s', lr: 'padding/m' },
    gapVar: 'gap/xl',
    fontSizeVar: 'm', fontWeightVar: 'm',
    fillStructure: 'direct', innerInset: null, innerRadiusVar: 'radii/toast',
    strokeOnDefault: false, strokeOnAnyState: false,
    children: [
      // The spinner and text group, gap/m (the loading banner's content frame before it moved here).
      { name: 'content', cssSelector: '.loader-content', gapVar: 'gap/m', paddingVar: { tb: null, lr: null } },
    ],
  },
};

// ─── RENDERED_ASSERTIONS: computed-style checks in headless Chrome (Gate [16]) ─────────
// Verifies the real cascade output of built ui.html files — catches later rules
// overriding the DS base, wrong var() resolution, and stale builds. Static gates
// read CSS text; this reads getComputedStyle. `probe` injects markup for components
// that only exist at runtime (toasts, list rows).
export const RENDERED_ASSERTIONS = [
  // Figma props the code now builds (2026-10): each part drawn from a probe of the full component.
  { plugin: 'impact-atlas', selector: '.statusBar-content', prop: 'columnGap', expected: '8px',
    note: "statusBar Slot content: the product's items in one row at gap/m (the bar's own gap/xl separates groups)",
    probe: '<div class="statusBar"><div class="statusBar-content"><span class="statusBar-title">Title</span><span>Detail</span></div></div>' },
  { plugin: 'impact-atlas', selector: '.checkbox-description', textStyle: 's',
    note: "checkBox Description = text style s (Show Description)",
    probe: '<label class="checkbox"><input type="checkbox" class="checkbox-input"><span class="checkbox-box"><svg class="checkbox-check" width="16" height="16"><use href="#icon-check"/></svg></span><span class="checkbox-content"><span class="checkbox-text">Text</span><span class="checkbox-description">Description</span></span></label>' },
  { plugin: 'impact-atlas', selector: '.radioButton-content', prop: 'rowGap', expected: '8px',
    note: "radioButton Content: Text over the dividerLine, gap/m",
    probe: '<label class="radioButton"><input type="radio" class="radioButton-input"><span class="radioButton-circle"></span><span class="radioButton-content"><span class="radioButton-text"><span class="radioButton-label">Text</span><span class="radioButton-description">Description</span></span><div class="dividerLine radioButton-divider"></div></span></label>' },
  { plugin: 'impact-atlas', selector: '.radioButton-description', textStyle: 's',
    note: "radioButton Description = text style s (Show Description)",
    probe: '<label class="radioButton"><input type="radio" class="radioButton-input"><span class="radioButton-circle"></span><span class="radioButton-content"><span class="radioButton-text"><span class="radioButton-label">Text</span><span class="radioButton-description">Description</span></span><div class="dividerLine radioButton-divider"></div></span></label>' },
  { plugin: 'impact-atlas', selector: '.switch', prop: 'columnGap', expected: '8px',
    note: "switch: Content and the input (Show Input) spaced gap/m",
    probe: '<label class="switch"><input type="checkbox" class="switch-input" checked><span class="switch-track"><span class="switch-knob"></span></span><span class="switch-content"><span class="switch-description">Description</span><span class="tooltipButton switch-tooltip"><svg width="12" height="12"><use href="#icon-info"/></svg></span></span><div class="inputWrap switch-field"><input class="inputField" value="300"><span class="inputLabel-after">dpi</span></div></label>' },
  { plugin: 'impact-atlas', selector: '.overflowList', prop: 'columnGap', expected: '4px',
    note: "overflowList: icon (show-icon) and label spaced gap/s",
    probe: '<button class="overflowList"><svg width="16" height="16"><use href="#icon-plus"/></svg><span>Value</span></button>' },
  { plugin: 'impact-atlas', selector: '.modal-header', prop: 'columnGap', expected: '4px',
    note: "modal header: icon, title and close button spaced gap/s",
    probe: '<div class="modal-card"><div class="modal-header"><svg class="modal-icon" width="16" height="16"><use href="#icon-export"/></svg><h2 class="modal-title">Title</h2><button class="buttonSecondary modal-close" aria-label="Close"><svg width="16" height="16"><use href="#icon-clear"/></svg></button></div><div class="modal-slot"><span>Content</span></div><div class="modal-footer"><button class="buttonSecondary"><span>Cancel</span></button><button class="buttonPrimary"><span>Confirm</span></button></div></div>' },
  { plugin: 'impact-atlas', selector: '.listItem-main', prop: 'rowGap', expected: '2px',
    note: "listItem Frame 83: title over description, gap/xs",
    probe: '<div class="listItem"><div class="listItem-row"><span class="listItem-icon"><svg width="16" height="16"><use href="#icon-focus"/></svg></span><div class="listItem-main"><span class="listItem-title">Title</span><span class="listItem-desc">Description</span></div><button class="buttonTertiary listItem-action" aria-label="Focus"><svg width="16" height="16"><use href="#icon-focus"/></svg></button></div><div class="dividerLine listItem-divider"></div></div>' },
  { plugin: 'impact-atlas', selector: '.inputLabel-after', prop: 'fontSize', expected: '11px',
    note: "input Label After = text style m (Show Label After)",
    probe: '<div class="inputWrap"><span class="inputLabel">Label</span><input class="inputField" value="Value"><span class="inputLabel-after">Label</span></div>' },
  { plugin: 'impact-atlas', selector: '.empty-state-content', prop: 'rowGap', expected: '4px',
    note: "emptyState Content: icon over text, gap/s",
    probe: '<div class="empty-state"><div class="empty-state-content"><svg width="56" height="56"><use href="#icon-empty-search"/></svg><div class="empty-state-text"><span class="empty-state-title">Title</span><span class="empty-state-desc">Description</span></div></div><button class="buttonPrimary empty-state-action"><svg width="16" height="16"><use href="#icon-plus"/></svg><span>label</span></button></div>' },
  { plugin: 'impact-atlas', selector: '.card-title', textStyle: 's',
    note: "card Title = text style s (Show Title)",
    probe: '<div class="card"><span class="card-title">Output</span><div>Content</div></div>' },
  { plugin: 'impact-atlas', selector: '.panel', prop: 'paddingLeft', expected: '16px',
    note: "panel: padding/l left and right",
    probe: '<div class="panel"><div>Head content</div><div>Main content</div></div>' },
  { plugin: 'impact-atlas', selector: '.highlightSelector', prop: 'borderTopWidth', expected: '2px',
    note: "highlightSelector Border layer: 2 inside",
    probe: '<span class="highlightSelector"></span>' },
  // statusBar (DS 789:38384: h=48, padding/l LR, Title gap/s, Content gap/m)
  { plugin: 'impact-atlas', selector: '#sb-main-row',      prop: 'height',        expected: '48px', note: 'DS statusBar h (56→48, tb rebound padding/l→padding/m 2026-08)' },
  { plugin: 'impact-atlas', selector: '#sb-main-row',      prop: 'paddingLeft',   expected: '16px', note: 'DS statusBar padding/l' },
  { plugin: 'impact-atlas', selector: '#sb-main-row',      prop: 'columnGap',     expected: '8px',  note: 'DS statusBar Content gap/m' },
  { plugin: 'impact-atlas', selector: '.statusBar-title',  prop: 'columnGap',     expected: '4px',  note: 'DS statusBar Title gap/s' },

  // actionBar (DS 138:16657: h=40, tb padding/s, lr padding/l)
  { plugin: 'impact-atlas', selector: '.actionbar',        prop: 'minHeight',     expected: '48px', note: 'DS actionBar h=48 as a MINIMUM — the bar grows to hug wrapped chips (min-height, not fixed height)' },
  { plugin: 'impact-atlas', selector: '.actionbar',        prop: 'paddingTop',    expected: '12px', note: 'DS actionBar padding/m (tb rebound padding/s→padding/m 2026-08)' },
  { plugin: 'impact-atlas', selector: '.actionbar',        prop: 'paddingLeft',   expected: '16px', note: 'DS actionBar padding/l' },
  { plugin: 'impact-atlas', selector: '.actionbar',        prop: 'columnGap',     expected: '8px',  note: 'base gap/m slot-content default' },
  // actionBar (DS 138:16657, 2026-10): its background is its own layer (actionbar/background, drawn as
  // ::before) and two dividerLine layers (actionbar/border, 1.5) lie over its top and bottom edges (::after).
  // Both modes asserted: the background differs per mode (N1000 vs elevationHigh), the lines too.
  { plugin: 'impact-atlas', selector: '.actionbar', pseudo: '::before', prop: 'background-color',
    expected: 'rgb(255, 255, 255)', colorScheme: 'light', note: 'actionbar/background light = N1000' },
  { plugin: 'impact-atlas', selector: '.actionbar', pseudo: '::before', prop: 'background-color',
    expected: 'rgb(44, 44, 44)', colorScheme: 'dark', note: 'actionbar/background dark → elevationHigh → figmaWindowChrome/background #2c2c2c (2026-08)' },
  { plugin: 'impact-atlas', selector: '.actionbar', pseudo: '::after', prop: 'background-image',
    expected: 'linear-gradient(rgb(214, 214, 214), rgb(214, 214, 214)), linear-gradient(rgb(214, 214, 214), rgb(214, 214, 214))', colorScheme: 'light', note: 'actionbar/border top and bottom lines → dividerLine/border light N700' },
  { plugin: 'impact-atlas', selector: '.actionbar', pseudo: '::after', prop: 'background-image',
    expected: 'linear-gradient(rgb(66, 66, 66), rgb(66, 66, 66)), linear-gradient(rgb(66, 66, 66), rgb(66, 66, 66))', colorScheme: 'dark', note: 'actionbar/border top and bottom lines → figmaWindowChrome/divider dark #424242 (rebound 2026-08)' },
  // Bare actionBar variant (DS 2120:28369): the Colors|Export segmented control sits in an
  // actionBar with the Background and Border boolean props toggled OFF. Same 48px height +
  // padding/m geometry as the base, but no fill and no divider, content centred. Locks the
  // fix for "segmented control too close to the content" (it had been a custom row with 0
  // bottom padding) — .actionbar--plain in theme.css. Mode-independent (transparent + none).
  { plugin: 'tokens-to-ink', selector: '.actionbar--plain', prop: 'background-color',
    expected: 'rgba(0, 0, 0, 0)', note: 'DS 2120:28369 Background boolean off → transparent' },
  { plugin: 'tokens-to-ink', selector: '.actionbar--plain', prop: 'border-bottom-style',
    expected: 'none', note: 'DS 2120:28369 Border boolean off → no bottom divider' },
  { plugin: 'tokens-to-ink', selector: '.actionbar--plain', prop: 'min-height',
    expected: '48px', note: 'DS 2120:28369 actionBar height (24 content + padding/m ×2)' },
  { plugin: 'tokens-to-ink', selector: '.actionbar--plain', prop: 'justify-content',
    expected: 'center', note: 'the slot centres the segmented control' },
  // Standalone dividerLine (DS 1:102) binds dividerLine/border/color = N700 in BOTH modes.
  // It must route through --border (dividerLine), NOT --divider (dividerSection/divider),
  // which overrides to N600 in dark and left the line a step too light. Both modes pinned.
  { plugin: 'impact-atlas', selector: '.dividerLine', prop: 'background-color',
    expected: 'rgb(214, 214, 214)', colorScheme: 'light', note: 'dividerLine/border light N700 #d6d6d6',
    probe: '<div class="dividerLine"></div>' },
  { plugin: 'impact-atlas', selector: '.dividerLine', prop: 'background-color',
    expected: 'rgb(48, 48, 48)', colorScheme: 'dark', note: 'dividerLine/border dark N700 #303030 (not --divider N600 #454545)',
    probe: '<div class="dividerLine"></div>' },

  // tooltipButton icon colour — DS tooltipButton/icon/color (1810:27212), a per-mode
  // split alias (L=N400 #595959, D=N300 #bfbfbf). Verified in-browser 2026-08-02 after
  // the DS updated the component. Both modes pinned because the token varies by mode.
  { plugin: 'impact-atlas', selector: '.tooltipButton svg', prop: 'color',
    expected: 'rgb(89, 89, 89)', colorScheme: 'light', note: 'tooltipButton/icon light = N400 #595959',
    probe: '<span class="tooltipButton"><svg width="16" height="16"><use href="#icon-info"/></svg></span>' },
  { plugin: 'impact-atlas', selector: '.tooltipButton svg', prop: 'color',
    expected: 'rgb(191, 191, 191)', colorScheme: 'dark', note: 'tooltipButton/icon dark = N300 #bfbfbf',
    probe: '<span class="tooltipButton"><svg width="16" height="16"><use href="#icon-info"/></svg></span>' },
  // A tooltipButton nested in a buttonList must keep its OWN icon colour — the broad
  // `.buttonList svg` rule (buttonList/iconPrimary) would otherwise dim it. Both modes.
  { plugin: 'impact-atlas', selector: '.buttonList .tooltipButton svg', prop: 'color',
    expected: 'rgb(89, 89, 89)', colorScheme: 'light', note: 'nested tooltipButton keeps tooltipButton/icon light N400, not buttonList/iconPrimary',
    probe: '<div class="buttonList"><span>t</span><span class="tooltipButton lib-badge"><svg width="16" height="16"><use href="#icon-library"/></svg></span></div>' },
  { plugin: 'impact-atlas', selector: '.buttonList .tooltipButton svg', prop: 'color',
    expected: 'rgb(191, 191, 191)', colorScheme: 'dark', note: 'nested tooltipButton keeps tooltipButton/icon dark N300, not buttonList/iconPrimary N500 #5e5e5e',
    probe: '<div class="buttonList"><span>t</span><span class="tooltipButton lib-badge"><svg width="16" height="16"><use href="#icon-library"/></svg></span></div>' },
  // A tooltipButton inside a BUTTONLIST sits FLUSH against the title — DS 1921:44549
  // gaps them by 0; the button's own 24px box gives the visual space. Only buttonList
  // contexts (not the tokens-to-ink table row). Probe nests the button after a label.
  { plugin: 'font-scaling-lab', selector: '.buttonList .issue-primary .tooltipButton', prop: 'margin-left', expected: '-8px',
    note: 'tooltipButton flush after the title in a buttonList — cancels .issue-primary gap/m so DS gap 0',
    probe: '<div class="buttonList"><div class="issue-primary"><span class="txt">t</span><span class="tooltipButton"><svg width="16" height="16"><use href="#icon-info"/></svg></span></div></div>' },
  // DS panel HeadContent slot (base .sidePanelHeader): top padding/l (16), bottom padding/s (8),
  // lr padding/l (16). The top was padding/s (8) — the header sat too high against the panel top.
  // Pinned per-side so a regression on any edge fails (Gate [20] computed style, in font-scaling-lab).
  { plugin: 'font-scaling-lab', selector: '.sidePanelHeader', prop: 'paddingTop', expected: '16px',
    note: 'DS panel HeadContent top = padding/l',
    probe: '<div class="sidePanel sidePanel--left"><div class="sidePanelHeader"><span>t</span></div></div>' },
  { plugin: 'font-scaling-lab', selector: '.sidePanelHeader', prop: 'paddingBottom', expected: '8px',
    note: 'DS panel HeadContent bottom = padding/s',
    probe: '<div class="sidePanel sidePanel--left"><div class="sidePanelHeader"><span>t</span></div></div>' },
  { plugin: 'font-scaling-lab', selector: '.sidePanelHeader', prop: 'paddingLeft', expected: '16px',
    note: 'DS panel lr = padding/l (carried on the header/body, not the shell)',
    probe: '<div class="sidePanel sidePanel--left"><div class="sidePanelHeader"><span>t</span></div></div>' },
  // The dividerSection action (place button) is LEFT-aligned, immediately after the title
  // (DS 135:46577: justify MIN, button at gap/m after Content). margin-left must be 0 —
  // margin-left:auto wrongly pushed it to the right edge.
  { plugin: 'impact-atlas', selector: '.dividerSection-action', prop: 'margin-left', expected: '0px',
    note: 'place button sits left after the title, not pushed to the right edge',
    probe: '<div class="dividerSection"><div class="dividerSection-content"><span>t</span></div><button class="dividerSection-action buttonSecondary"><svg width="16" height="16"><use href="#icon-fit"/></svg></button></div>' },

  // (see FORM_CONTROL_BINDINGS at the end of this file — the gate that now enforces
  //  this class of bug generically, rather than one assertion at a time)
  // ── Form controls that are DS input instances without carrying .inputWrap ──
  // Both were wired to --border (dividerLine) instead of --input-border. The two
  // resolve to the SAME N700 in light and diverge only in dark (#303030 vs #454545),
  // so the bug was invisible in light mode and every token-level gate passed: --border
  // is a real token with a correct value, it adapts across modes, and nothing mapped
  // these bespoke elements to the DS input component. Asserting BOTH modes is the
  // point — a light-only assertion would still be green with the bug present.
  { plugin: 'impact-atlas', selector: '.search-input', prop: 'border-top-color',
    expected: 'rgb(94, 94, 94)', colorScheme: 'dark',
    note: 'DS input/border/default dark = N500 #5e5e5e (2026-08 refactor)' },
  { plugin: 'impact-atlas', selector: '.search-input', prop: 'border-top-color',
    expected: 'rgb(173, 173, 173)', colorScheme: 'light',
    note: 'DS input/border/default light = N600 #adadad (2026-08 refactor)' },
  { plugin: 'font-scaling-lab', selector: '#scale-input', prop: 'border-top-color',
    expected: 'rgb(94, 94, 94)', colorScheme: 'dark',
    note: 'DS input/border/default dark = N500 #5e5e5e' },
  { plugin: 'font-scaling-lab', selector: '#scale-input', prop: 'border-top-color',
    expected: 'rgb(173, 173, 173)', colorScheme: 'light',
    note: 'DS input/border/default light = N600 #adadad' },
  // NB: no rendered border-WIDTH assertion here — Chrome rounds a 1.5px border to whole
  // device pixels, so getComputedStyle reports "2px" and the check is DPR-dependent.
  // The width is covered statically instead (the rule now uses var(--thickness)).

  // dividerSection — DS base geometry (h=44 = padding/xl top + 16 content + padding/xs
  // bottom) in EVERY context: left-panel lists, detail list view, tree column headers.
  // Bottom padding went xxs (2px) -> xs (4px) on 2026-07-22, per DS node 135:46577,
  // taking the height 42 -> 44. Derived sticky offsets in ui.src.html moved with it.
  // The 28px/20px compact variants were retired 2026-07-11 (DS frame updated: all
  // dividerSection instances full-height; caught as tree/list height mismatch in the detail).
  // These assertions LOCK the uniform height — a drift in any context fails the gate.
  { plugin: 'impact-atlas', selector: '#graph-col-headers .dividerSection', prop: 'height',     expected: '24px', note: 'DS dividerSection h — compact 24 (2026-09-09); same in tree and list view' },
  { plugin: 'impact-atlas', selector: '#graph-col-headers .dividerSection', prop: 'paddingTop', expected: '0px', note: 'DS 2026-09-09: root padding removed; vertical rhythm from Content padding/xs' },
  { plugin: 'impact-atlas', selector: '#graph-col-headers .dividerSection', prop: 'paddingBottom', expected: '0px', note: 'DS 2026-09-09: root padding removed' },

  // ── Added 2026-07-22 after Gate [16] missed three divergences found by eye ──
  // The scan-depth radio: ring and connector must share one stroke weight, and the
  // circle column must match the label's line box so the dot centres on the label.
  // DS node State=Hover binds its own icon colour (node/icon/hover, added 2026-07-23).
  // Measured under forced :hover — the only way to prove the pseudo-class rule wins
  // over the idle colour on .node svg.
  { plugin: 'impact-atlas', selector: '.node.var-item', prop: 'color', expected: 'rgb(191, 191, 191)',
    forcePseudo: ['hover'], colorScheme: 'dark', note: 'sanity: hovered node label stays node/label/idle N300 dark',
    probe: '<button class="node var-item"><span class="var-name">t</span></button>' },
  // Hovering a node must NOT dim its action buttons. `.node:hover svg` is (0,2,1)
  // and outranks `.node-focus-btn svg` (0,1,1), so the DS hover colour has to stay
  // scoped to the type-icon wrappers. forcePseudoOn hovers the NODE and measures the
  // BUTTON — the only way to catch a parent rule overriding a child.
  { plugin: 'impact-atlas', selector: '.node.graph-node.comp .node-goto-btn svg', prop: 'color',
    expected: 'rgb(219, 219, 219)', forcePseudo: ['hover'], forcePseudoOn: '.node.graph-node.comp',
    colorScheme: 'dark', note: 'goto icon keeps buttonTertiary text while the node is hovered — N200 #dbdbdb dark since the DS rebound buttonTertiary/iconText (was N300)',
    probe: '<div class="node graph-node comp"><div class="node-type-icon"><svg></svg></div>' +
           '<button class="node-goto-btn"><svg></svg></button></div>' },
  { plugin: 'impact-atlas', selector: '.node.graph-node.comp .node-type-icon svg', prop: 'color',
    expected: 'rgb(191, 191, 191)', forcePseudo: ['hover'], forcePseudoOn: '.node.graph-node.comp',
    colorScheme: 'dark', note: 'the type icon DOES take node/icon/hover — N300 dark #b8b8b8 since the DS rebound hover onto node/icon/selected (947:17057); it was N500 while it chained to idle',
    probe: '<div class="node graph-node comp"><div class="node-type-icon"><svg></svg></div>' +
           '<button class="node-goto-btn"><svg></svg></button></div>' },
  // Same assertion in LIGHT. node/icon/hover resolves per mode (N400 light / N300
  // dark), and a dark-only assertion let the light value sit on the stale N600
  // chain unnoticed. Every mode-varying token needs an assertion per mode.
  { plugin: 'impact-atlas', selector: '.node.graph-node.comp .node-type-icon svg', prop: 'color',
    expected: 'rgb(89, 89, 89)', forcePseudo: ['hover'], forcePseudoOn: '.node.graph-node.comp',
    colorScheme: 'light', note: 'node/icon/hover light = N400 #595959 (alias of node/icon/selected)',
    probe: '<div class="node graph-node comp"><div class="node-type-icon"><svg></svg></div>' +
           '<button class="node-goto-btn"><svg></svg></button></div>' },
  // ── input/border/focus (restored to the DS 2026-07-30) ──────────────────────
  // The focus ring is the only signal a field has keyboard focus, so it must beat the
  // resting/hover borders. The resting value (input/border/default) is verified on the
  // real .search-input / #scale-input above; here we only need the focused ring differs.
  // (A resting probe assertion was dropped: in headless CDP a shorthand-only `border`
  // on a freshly-injected hidden probe computes border-*-color as the background, not
  // the var — a probe quirk, not a code bug; the real value is #5e5e5e, verified in-browser.)
  { plugin: 'tokens-to-ink', selector: '.inputWrap', prop: 'border-top-color',
    expected: 'rgb(245, 245, 245)', forcePseudo: ['focus-within'], colorScheme: 'dark',
    note: 'focused = input/border/focus (N100 dark #f5f5f5) — must win over resting and hover',
    probe: '<div class="inputWrap"><input class="inputField"></div>' },
  // (The .checkbox-text / .modal-slot / .tab-panel rendered assertions were retired 2026-08-16
  // when the export flow moved from the DS modal to the inline Export screen — those elements
  // no longer render in tokens-to-ink. The base .checkbox stays covered structurally by Gate 10.)
  // checkBoxGroup (DS 2064:29545) — Label sits gap/m above the Slot; the Slot stacks rows at gap/s.
  // No plugin renders one yet, so these assert against injected probes.
  { plugin: 'impact-atlas', selector: '.checkBoxGroup', prop: 'rowGap', expected: '8px',
    note: 'checkBoxGroup Label↔Slot spacing = gap/m (8)',
    probe: '<div class="checkBoxGroup"><span class="checkBoxGroup-label">L</span><div class="checkBoxGroup-slot"></div></div>' },
  { plugin: 'impact-atlas', selector: '.checkBoxGroup-slot', prop: 'columnGap', expected: '32px',
    note: 'checkBoxGroup Slot is HORIZONTAL, items spaced gap/xxxl (32) — same as radioButtonGroup-slot (was wrongly pinned to rowGap gap/s 4)',
    probe: '<div class="checkBoxGroup"><span class="checkBoxGroup-label">L</span><div class="checkBoxGroup-slot"></div></div>' },
  { plugin: 'impact-atlas', selector: '.checkBoxGroup-label', textStyle: 's',
    note: 'checkBoxGroup Label = text style s (10/700/15.1)',
    probe: '<div class="checkBoxGroup"><span class="checkBoxGroup-label">L</span><div class="checkBoxGroup-slot"></div></div>' },
  // radioButtonGroup — Label sits gap/m above the Slot; the Slot spaces radios in a ROW at gap/xxxl (32).
  { plugin: 'impact-atlas', selector: '.radioButtonGroup', prop: 'rowGap', expected: '8px',
    note: 'radioButtonGroup Label↔Slot spacing = gap/m (8)',
    probe: '<div class="radioButtonGroup"><span class="radioButtonGroup-label">L</span><div class="radioButtonGroup-slot"></div></div>' },
  { plugin: 'impact-atlas', selector: '.radioButtonGroup-slot', prop: 'columnGap', expected: '32px',
    note: 'radioButtonGroup Slot radio spacing = gap/xxxl (32)',
    probe: '<div class="radioButtonGroup"><span class="radioButtonGroup-label">L</span><div class="radioButtonGroup-slot"></div></div>' },
  { plugin: 'impact-atlas', selector: '.radioButtonGroup-label', textStyle: 's',
    note: 'radioButtonGroup Label = text style s',
    probe: '<div class="radioButtonGroup"><span class="radioButtonGroup-label">L</span><div class="radioButtonGroup-slot"></div></div>' },
  { plugin: 'impact-atlas', selector: '.depth-circle',     prop: 'borderTopWidth', expected: '2px',
    note: 'ring + connector share --depth-stroke; deliberately NOT general/thickness (1.5px)' },
  { plugin: 'impact-atlas', selector: '.depth-circle-col', prop: 'height',         expected: '14.3px',
    note: 'label line box (--m-size 11px x 1.3) — a fixed padding here drifts with the type scale' },
  // An empty graph column header must not paint: its opaque strip clipped the edge
  // lines running underneath it. Background now lives on the child dividerSections.
  // DS panel HeadContent slot has a SOLID background fill over the whole header — the sticky
  // header must be opaque so connector edge-lines / nodes behind never show through the top strip.
  // --bg-detail (elevationLow / panel/background/secondary): light #e8e8e8, dark #1c1c1c — assert BOTH modes.
  { plugin: 'impact-atlas', selector: '#graph-col-headers', prop: 'backgroundColor', expected: 'rgb(232, 232, 232)', colorScheme: 'light',
    note: 'DS header slot fill = --bg-detail (elevationLow) light; opaque so nothing bleeds through the top' },
  { plugin: 'impact-atlas', selector: '#graph-col-headers', prop: 'backgroundColor', expected: 'rgb(28, 28, 28)', colorScheme: 'dark',
    note: 'DS header slot fill = --bg-detail (elevationLow) dark; opaque so nothing bleeds through the top' },
  { plugin: 'impact-atlas', selector: '.scroll-area .dividerSection',       prop: 'height',     expected: '24px', note: 'DS dividerSection h — compact 24 (2026-09-09); same in tree and list view',
    probe: '<div class="scroll-area"><div class="dividerSection">High</div></div>' },
  { plugin: 'impact-atlas', selector: '.scroll-area .dividerSection',       prop: 'paddingTop', expected: '0px', note: 'DS 2026-09-09: root padding removed',
    probe: '<div class="scroll-area"><div class="dividerSection">High</div></div>' },
  { plugin: 'impact-atlas', selector: '.scroll-area .dividerSection',       prop: 'paddingBottom', expected: '0px', note: 'DS 2026-09-09: root padding removed',
    probe: '<div class="scroll-area"><div class="dividerSection">High</div></div>' },
  // Search-field icon = DS Input icon size (snapshot input.iconSize, currently 16). Was 12px.
  // iconSizeOf sources the expected value from the DS snapshot so it can't silently drift.
  { plugin: 'impact-atlas', selector: '.search-icon', prop: 'width',  iconSizeOf: 'input', note: 'DS Input icon size' },
  { plugin: 'impact-atlas', selector: '.search-icon', prop: 'height', iconSizeOf: 'input', note: 'DS Input icon size' },

  // (.mode-toggle-row ↔ DS "Top" frame padding is now an auto-expanded FRAME_GEOMETRY_MAP
  //  entry below — the 7px-above-first-divider bug is locked there, sourced from the frame.)

  // No space above dividers beyond the component's own padding/xl (DS frame 308:10425:
  // first divider flush at content top; detail-list sections stack with gap 0)
  // (The old '.scroll-area .dividerSection:first-child → 0' assertion was really measuring the real
  //  #list-alias-hdr, which is now a per-group panel header at padding/l (16) — see the #list-alias-hdr
  //  / #list-comp-hdr marginTop/marginBottom assertions below, which pin the per-group panel spacing.)
  // .p2 is probe-only — keeps the global re-query from matching #list-comp-hdr (which is 0 by DS spec)
  { plugin: 'impact-atlas', selector: '.scroll-area .dividerSection.p2', prop: 'marginTop', expected: '8px', note: 'DS left-panel List gap/m between sections',
    probe: '<div class="scroll-area"><div class="dividerSection">High</div><div class="dividerSection p2">Medium</div></div>' },
  { plugin: 'impact-atlas', selector: '#graph-col-headers', prop: 'paddingTop', expected: '16px', note: 'DS panel HeadContent top padding/l (16) — the opaque header slot owns the gap below the status bar' },
  // List-view header slot (mode-toggle-row): same DS HeadContent fill — opaque --bg (elevationMedium /
  // panel/background/primary) over the segmented control AND the padding/l gap down to the first divider,
  // so list items don't bleed above the sticky divider. Assert BOTH modes + the opaque gap.
  { plugin: 'impact-atlas', selector: '.mode-toggle-row', prop: 'backgroundColor', expected: 'rgb(247, 247, 247)', colorScheme: 'light',
    note: 'DS header slot fill = --bg (elevationMedium) light; opaque so list items do not bleed through the gap' },
  { plugin: 'impact-atlas', selector: '.mode-toggle-row', prop: 'backgroundColor', expected: 'rgb(33, 33, 33)', colorScheme: 'dark',
    note: 'DS header slot fill = --bg (elevationMedium) dark; opaque so list items do not bleed through the gap' },
  { plugin: 'impact-atlas', selector: '.mode-toggle-row', prop: 'paddingBottom', expected: '16px',
    note: 'DS HeadContent: the padding/l gap to the first divider lives on the opaque header slot, not the scroll area (transparent there = bleed)' },
  // DS 308-7820: the detail list is a stack of independent panels (type=secondary), one per group.
  // Each group's header carries the panel HeadContent spacing — padding/l (16) top, padding/s (8)
  // bottom — and the gap between groups is the next header's top margin (gap/xl = 16). Pin all four so
  // the per-group panel spacing can't silently drift back to flat (which is how it kept shipping wrong).
  { plugin: 'impact-atlas', selector: '#list-alias-hdr', prop: 'marginTop',    expected: '16px', note: 'DS per-group panel HeadContent top padding/l' },
  { plugin: 'impact-atlas', selector: '#list-alias-hdr', prop: 'marginBottom', expected: '8px',  note: 'DS per-group panel HeadContent bottom padding/s' },
  { plugin: 'impact-atlas', selector: '#list-comp-hdr',  prop: 'marginTop',    expected: '16px', note: 'DS per-group panel HeadContent top padding/l (also the gap/xl between groups)' },
  { plugin: 'impact-atlas', selector: '#list-comp-hdr',  prop: 'marginBottom', expected: '8px',  note: 'DS per-group panel HeadContent bottom padding/s' },

  // node label color must flow from the .node state classes to the name spans —
  // caught 2026-07-11: .var-name/.node-name declared color: var(--text) and rendered
  // bright #ededed instead of node/label/unselected. Fixed to color: inherit.
  // colorScheme:'dark' pins the check to the DS-canonical dark appearance (node/label/
  // unselected dark = N300 #b8b8b8 = rgb(184,184,184)) so it can't flip with host OS theme.
  { plugin: 'impact-atlas', selector: '.node .var-name', prop: 'color', expected: 'rgb(191, 191, 191)', colorScheme: 'dark', note: 'node/label/unselected flows to list label span (dark)',
    probe: '<button class="node var-item"><span class="var-name">token</span></button>' },
  { plugin: 'impact-atlas', selector: '.node .node-name', prop: 'color', expected: 'rgb(191, 191, 191)', colorScheme: 'dark', note: 'node/label/unselected flows to graph label span (dark)',
    probe: '<button class="node graph-node"><span class="node-name">token</span></button>' },
  // selected + disabled label states (dark) — lock the full state→token mapping
  { plugin: 'impact-atlas', selector: '.node.node-selected .var-name', prop: 'color', expected: 'rgb(245, 245, 245)', colorScheme: 'dark', note: 'node/label/selected dark = N100 #ededed',
    probe: '<button class="node var-item node-selected"><span class="var-name">token</span></button>' },
  { plugin: 'impact-atlas', selector: '.node.node-disabled .var-name', prop: 'color', expected: 'rgb(135, 135, 135)', colorScheme: 'dark', note: 'node/label/disabled = N400 both modes (#808080 dark) — dark N600 override dropped 2026-07-22',
    probe: '<button class="node var-item node-disabled"><span class="var-name">token</span></button>' },
  // selection-active dimming must use node/label/unselected, NOT --text-muted (equal in
  // dark, but --text-muted is N400 #595959 in light vs the DS N300 #404040). Light-mode lock.
  { plugin: 'impact-atlas', selector: '#var-list.has-list-selection .var-item:not(.node-selected)', prop: 'color', expected: 'rgb(64, 64, 64)', colorScheme: 'light', note: 'dimmed unselected = node/label/idle light #404040 (unselected token retired 2026-07-22)',
    probe: '<div id="var-list" class="has-list-selection"><button class="node var-item"><span class="var-name">t</span></button></div>' },
  // Resting node (DS State=Default) draws node/border/default — the DS re-added the stroke.
  // Both modes pinned (mode-varying: L N700 #d6d6d6, D N600 #454545).
  { plugin: 'impact-atlas', selector: '.node.default-probe', prop: 'borderTopColor', expected: 'rgb(69, 69, 69)', colorScheme: 'dark', note: 'resting node border = node/border/default dark N600 #454545',
    probe: '<button class="node default-probe"><span class="var-name">t</span></button>' },
  { plugin: 'impact-atlas', selector: '.node.default-probe', prop: 'borderTopColor', expected: 'rgb(214, 214, 214)', colorScheme: 'light', note: 'resting node border = node/border/default light N700 #d6d6d6',
    probe: '<button class="node default-probe"><span class="var-name">t</span></button>' },
  { plugin: 'impact-atlas', selector: '.node.node-unselected', prop: 'borderTopColor', expected: 'rgb(48, 48, 48)', colorScheme: 'dark', note: 'DS Idle state border = node/border/idle dark N700 #303030',
    probe: '<button class="node node-unselected"><span class="var-name">t</span></button>' },
  { plugin: 'impact-atlas', selector: '.node.node-selected', prop: 'borderTopColor', expected: 'rgb(245, 245, 245)', colorScheme: 'dark', note: 'selected state border = node/border/selected dark N100',
    probe: '<button class="node node-selected"><span class="var-name">t</span></button>' },

  // button label insets (DS LabelContainer: root padding/xs + span padding/xs = 8px)
  { plugin: 'impact-atlas',  selector: '#modal-cancel-btn',      prop: 'paddingLeft', expected: '4px', note: 'DS buttonSecondary root padding/xs' },
  { plugin: 'impact-atlas',  selector: '#modal-cancel-btn span', prop: 'paddingLeft', expected: '4px', note: 'DS LabelContainer padding/xs' },
  { plugin: 'impact-atlas',  selector: '#modal-cancel-btn span', prop: 'paddingLeft', expected: '4px', note: 'DS LabelContainer padding/xs' },

  // toast (DS: success h=32 gap/s; loading content gap/m, container gap/xl)
  { plugin: 'impact-atlas', selector: '.toast',            prop: 'height',        expected: '32px', note: 'DS toast success h',
    probe: '<div class="toast"><span class="toast-icon"></span><span>Done</span></div>' },
  { plugin: 'impact-atlas', selector: '.toast',            prop: 'columnGap',     expected: '4px',  note: 'DS toast Frame 39 gap/s',
    probe: '<div class="toast"><span class="toast-icon"></span><span>Done</span></div>' },
  { plugin: 'impact-atlas', selector: '.progress-msg',     prop: 'columnGap',     expected: '16px', note: 'DS toast loading container gap/xl',
    probe: '<div class="progress-msg"><div class="toast-content"><div class="toast-spinner"></div><span>Working</span></div></div>' },
  { plugin: 'impact-atlas', selector: '.toast-content',    prop: 'columnGap',     expected: '8px',  note: 'DS toast loading content gap/m (rebound from gap/s 2026-07)',
    probe: '<div class="progress-msg"><div class="toast-content"><div class="toast-spinner"></div><span>Working</span></div></div>' },

  // segmentedControl label typography (DS text style = s, 10px/700 — caught 2026-07-11:
  // snapshot+contract both said 'm' from a bad capture, hiding an 11px/600 render)
  { plugin: 'impact-atlas', selector: '.segmented-control button', prop: 'fontSize',   expected: '10px', note: 'DS segmentedControl label style s' },
  { plugin: 'impact-atlas', selector: '.segmented-control button', prop: 'fontWeight', expected: '700',  note: 'DS segmentedControl label style s weight' },

  // buttonList (DS: h=40, root padding/xs)
  { plugin: 'impact-atlas', selector: '.buttonList',       prop: 'height',        expected: '40px', note: 'DS buttonList h',
    probe: '<button class="buttonList">Item</button>' },
  // buttonList must stay 40px in a CONSTRAINED flex column — needs flex-shrink:0, else it
  // compresses when the list is taller than its container (the shrinking-rows bug 2026-07-12).
  { plugin: 'impact-atlas', selector: '.bl-shrink-probe .buttonList', prop: 'height', expected: '40px', note: 'buttonList must not shrink in a short flex column (flex-shrink:0)',
    probe: '<div class="bl-shrink-probe" style="display:flex;flex-direction:column;height:60px;overflow:hidden"><button class="buttonList">a</button><button class="buttonList">b</button><button class="buttonList">c</button></div>' },
  { plugin: 'impact-atlas', selector: '.buttonList',       prop: 'paddingLeft',   expected: '4px',  note: 'DS buttonList padding/xs',
    probe: '<button class="buttonList">Item</button>' },
  // Label-stability lock: the root gap (icon↔label) is gap/s in EVERY state — DS Content
  // gap never changes, so hovering must not shift the label. The hover Container gap/m is
  // Content↔Actions only. A per-state gap change here is the exact drift caught 2026-07-04.
  { plugin: 'impact-atlas', selector: 'button.buttonList:not(.hovered):not(.selected)', prop: 'columnGap', expected: '4px', note: 'default gap/s (icon↔label)',
    probe: '<button class="buttonList">Item</button>' },
  { plugin: 'impact-atlas', selector: '.buttonList.hovered',  prop: 'columnGap', expected: '4px', note: 'gap unchanged on hover — label must not move',
    probe: '<button class="buttonList hovered">Item</button>' },
  { plugin: 'impact-atlas', selector: 'button.buttonList:not(.hovered):not(.selected)', prop: 'columnGap', expected: '4px', forcePseudo: ['hover'],
    note: 'REAL :hover rule — gap must stay gap/s so the label never shifts',
    probe: '<button class="buttonList">Item</button>' },
  { plugin: 'impact-atlas', selector: 'button.buttonList:not(.hovered):not(.selected)', prop: 'paddingRight', expected: '8px', forcePseudo: ['hover'],
    note: 'DS hover Container paddingRight = padding/s',
    probe: '<button class="buttonList">Item</button>' },
  { plugin: 'impact-atlas', selector: '.buttonList.selected', prop: 'columnGap', expected: '4px', note: 'gap unchanged on selected — label must not move',
    probe: '<button class="buttonList selected">Item</button>' },
  { plugin: 'impact-atlas', selector: '.buttonList.hovered .buttonList-action', prop: 'marginRight', expected: '4px', note: 'DS Actions gap/m (action↔arrow) = root gap/s + 4px margin',
    probe: '<div class="buttonList hovered"><span>Item</span><button class="buttonList-action buttonTertiary"></button><svg class="buttonList-arrow"></svg></div>' },
];

// ─── FRAME_GEOMETRY_MAP (Gate [16] #2): selector ↔ DS layout-frame container ──────────
// Map a plugin CSS selector to a named node in figma-frame-geometry.snapshot.json ONCE;
// rendered-check expands it into one frameGeom assertion per `prop` (default: the four
// padding sides), sourcing each expected px from the live frame. Catches container/context
// spacing drift the component-only checks miss — e.g. the 7px .mode-toggle-row bottom
// padding that stacked on the first divider. `path` disambiguates a repeated node name.
export const FRAME_GEOMETRY_MAP = [
  { plugin: 'impact-atlas', selector: '.mode-toggle-row', node: 'Top', props: ['paddingTop', 'paddingBottom'],
    note: 'DS panel Top frame (segmented-control row) — no extra space above the first divider' },
];

// ─── CROSS_PLUGIN_CONSISTENCY (Gate [16] #5): shared components render identically ────
// A base component (theme.css) rendered in multiple plugins must compute the same values;
// a plugin-local override silently changing a shared component is a divergence. Each entry
// renders `probe` in every plugin under `plugins` and asserts all agree on every `prop`.
export const CROSS_PLUGIN_CONSISTENCY = [
  { label: 'buttonList',  selector: '.buttonList',  probe: '<button class="buttonList">x</button>',
    props: ['height', 'paddingLeft', 'flexShrink'], plugins: ['impact-atlas', 'font-scaling-lab'] },
  { label: 'node',        selector: '.node',        probe: '<button class="node"><span>x</span></button>',
    props: ['minHeight', 'flexShrink', 'borderTopLeftRadius'], plugins: ['impact-atlas', 'font-scaling-lab'] },
  { label: 'dividerSection', selector: '.dividerSection', probe: '<div class="dividerSection">x</div>',
    props: ['height', 'paddingTop'], plugins: ['impact-atlas', 'font-scaling-lab'] },
];

// ─── PLUGIN_DS_OVERRIDES: documented plugin-file rules that restyle a DS base class ───
// Consumed by subcomponent-isolation-check (Gate [9] second section). Every plugin rule
// that targets a theme.css base class AND sets identity properties must be listed here
// with the reason it cannot live in the base. Undocumented overrides fail the gate.
export const PLUGIN_DS_OVERRIDES = {
  // ── deep-scan dialog: bespoke layout over the base modal (2026-08-05) ──
  // The modal shell moved to the base DS; this specific dialog is wider (320px) and keeps
  // its own vertical rhythm (gap 0 + per-section margins) rather than the generic modal's
  // uniform gap. Plugin-local because only the deep-scan dialog has this layout.
  '#deep-scan-modal .modal-card':
    'LAYOUT — 320px width and per-section spacing specific to the deep-scan dialog, not the generic base modal.',

  // ── graph column headers (added 2026-07-22) ──
  '#graph-col-headers .dividerSection.col-empty':
    'LAYOUT — a column header with no label must not paint: its opaque strip clipped the ' +
    'edge lines drawn underneath it. Plugin-local because only the graph view has columns ' +
    'that can be empty; the DS dividerSection always has a label.',

  // ── scroll containers: per-plugin content padding (consumer placement, not identity) ──
  '.scroll-area':
    'LAYOUT — scroll container content padding is per-plugin placement; base only defines overflow/gutter behavior',
  '.scroll-area .dividerSection':
    'LAYOUT — full-bleed margins/gutters/stacking for sticky list headers; geometry is the DS base (44px). Compact 28px variant retired 2026-07-11 (DS frame updated to full-height dividers everywhere). Locked by RENDERED_ASSERTIONS.',

  // ── impact-atlas graph states: designed in DS frame 308-10425, not component variants ──
  '.node.node-external':
    'DS-FRAME STATE — external-library node: dashed dimmed pill designed in the Impact Atlas DS frame (instance overrides, no component variant exists)',
  '#graph-body.has-selection .node:not(.node-selected)':
    'DS-FRAME STATE — graph focus dimming when a node is selected, designed in the Impact Atlas DS frame (dashed + dimmed unselected pills)',
  '#graph-body.has-selection .node:not(.node-selected):hover':
    'DS-FRAME STATE — hover inside the dimmed graph state (intermediate opacity)',

  // ── dividerSection surface context ──
  '#right-detail .dividerSection':
    'SURFACE — sticky header over the detail panel needs the panel surface (semantic/background → --bg-detail) instead of the base --bg to avoid a seam',
  '#graph-col-headers .dividerSection':
    'LAYOUT — column flex/gutters only; wrapper carries the sticky behavior; geometry is the DS base (44px). Compact 20px variant retired 2026-07-11 — tree and list view must render the same dividerSection height. Locked by RENDERED_ASSERTIONS.',

  // ── misc justified ──
  '.section-label':
    'LAYOUT — left-panel label inset (tokenized padding); identity stays on the base',
  '#canvas-scan-bar .spinner':
    'SIZE VARIANT — 11px compact spinner in the canvas scan bar; DS spinner has no size variants, identity (border/animation) stays on the base',
  '.zoom-hint.hidden':
    'MOTION — .hidden here fades via opacity so the hint can transition out; display:none would kill the animation',
};

// ─── CSS height/min-height rules to verify ────────────────────────────────────
export const CSS_HEIGHT_RULES = {
  tooltipButton: { selector: '.tooltipButton', prop: 'height' },
  toast:            { selector: '.toast',                    prop: 'height'     },
  buttonList:       { selector: '.buttonList',               prop: 'height'     },
  node:             { selector: '.node',                     prop: 'min-height' },
  segmentedControl: { selector: '.segmented-control button', prop: 'height'     },
  buttonQuaternary: { selector: '.buttonQuaternary',         prop: 'min-height' }, // Figma min-h-[24px] — must use min-height, not height
  swatch:           { selector: '.swatch',                   prop: 'height'     }, // h=24 via var(--button-min-height)
  // statusBar: #sb-main-row lives in impact-atlas plugin CSS (this table searches theme.css only)
  //            — h=56 asserted via CSS_PROPERTY_ASSERTIONS instead
  // buttonSecondary: no explicit height rule (HUG content in Figma; CSS auto-heights via flex)
  // overflowList:   h=32px hardcoded — in knownHardcodedExceptions; asserted in CSS_PROPERTY_ASSERTIONS
  // dividerSection: h=auto in Figma — no fixed height to verify
};

// ─── CSS base-rule var bindings to verify ─────────────────────────────────────
export const CSS_BASE_RULE_VARS = [
  // The resting .node (DS State=Default) now carries node/border/default — the DS re-added the
  // stroke it had removed. node/border/idle stays bound to the (dead-but-declared) .node-unselected.
  { key: 'node/border/default',          selector: '.node',                          prop: 'border-color', expectedVar: '--node-border-default'         },
  { key: 'node/border/idle',             selector: '.node.node-unselected',          prop: 'border-color', expectedVar: '--node-border-idle'            },
  { key: 'node/border/selected',         selector: '.node.node-selected',            prop: 'border-color', expectedVar: '--node-border-selected'        },
  { key: 'node/label',                   selector: '.node',                          prop: 'color',      expectedVar: '--node-label-idle'         },
  { key: 'node/icon',                    selector: '.node svg',                      prop: 'color',      expectedVar: '--node-icon-idle'          },
  { key: 'loader/bg',                    selector: '.progress-msg',                  prop: 'background', expectedVar: '--loader-background'             },
  { key: 'loader/fg',                    selector: '.progress-msg',                  prop: 'color',      expectedVar: '--loader-title'                  },
  { key: 'toast/success/bg',             selector: '.toast',                         prop: 'background', expectedVar: '--toast-background-success'      },
  { key: 'toast/success/fg',             selector: '.toast',                         prop: 'color',      expectedVar: '--toast-title-success'           },
  // buttonList — text + icon color must stay token-bound across all states
  { key: 'buttonList/text/default',      selector: '.buttonList',                    prop: 'color',      expectedVar: '--buttonList-text'               },
  { key: 'buttonList/icon/default',      selector: '.buttonList svg',                prop: 'color',      expectedVar: '--buttonList-iconPrimary'               },
  { key: 'buttonList/text/hover',        selector: '.buttonList:hover',              prop: 'color',      expectedVar: '--buttonList-text-hover'         },
  { key: 'buttonList/icon/hover',        selector: '.buttonList:hover svg',          prop: 'color',      expectedVar: '--buttonList-iconPrimary'               },
  { key: 'buttonList/text/selected',     selector: '.buttonList.selected',           prop: 'color',      expectedVar: '--buttonList-text-selected'      },
  { key: 'buttonList/icon/selected',     selector: '.buttonList.selected svg',       prop: 'color',      expectedVar: '--buttonList-iconPrimary'               },
  // badge — semantic color vars must stay token-bound per state
  { key: 'badge/text/high',             selector: '.badge.high',                    prop: 'color',      expectedVar: '--semantic-negative'             },
  { key: 'badge/bg/high',               selector: '.badge.high',                    prop: 'background', expectedVar: '--semantic-negative'             },
  { key: 'badge/text/medium',           selector: '.badge.medium',                  prop: 'color',      expectedVar: '--semantic-warning'              },
  { key: 'badge/bg/medium',             selector: '.badge.medium',                  prop: 'background', expectedVar: '--semantic-warning'              },
  { key: 'badge/text/low',              selector: '.badge.low',                     prop: 'color',      expectedVar: '--semantic-positive'             },
  { key: 'badge/bg/low',               selector: '.badge.low',                     prop: 'background', expectedVar: '--semantic-positive'             },
  { key: 'badge/text/none',             selector: '.badge.none',                    prop: 'color',      expectedVar: '--badge-neutral'                 },
  { key: 'badge/bg/none',              selector: '.badge.none',                    prop: 'background', expectedVar: '--badge-neutral'                 },
  // segmentedControl — state colors across default/selected
  { key: 'segControl/label/default',    selector: '.segmented-control button',                    prop: 'color',        expectedVar: '--segmentedControl-label'            },
  { key: 'segControl/icon/default',     selector: '.segmented-control svg',                       prop: 'color',        expectedVar: '--segmentedControl-icon'             },
  { key: 'segControl/bg/selected',      selector: '.segmented-control button.selected',           prop: 'background',   expectedVar: '--segmentedControl-background-selected' },
  { key: 'segControl/border/selected',  selector: '.segmented-control button.selected',           prop: 'border-color', expectedVar: '--segmentedControl-border-selected'  },
  { key: 'segControl/label/selected',   selector: '.segmented-control button.selected',           prop: 'color',        expectedVar: '--segmentedControl-label-selected'   },
  { key: 'segControl/icon/selected',    selector: '.segmented-control button.selected svg',       prop: 'color',        expectedVar: '--segmentedControl-icon-selected'    },
  // input — border + background across default/hover/focus/disabled states
  { key: 'input/bg/default',            selector: '.inputWrap',                                    prop: 'background',   expectedVar: '--input-background'              },
  { key: 'input/border/default',        selector: '.inputWrap',                                    prop: 'border',       expectedVar: '--input-border'                  },
  { key: 'input/border/hover',          selector: '.inputWrap:not(.inputWrap--readonly):hover',    prop: 'border-color', expectedVar: '--input-border-hover'            },
    { key: 'input/border/disabled',       selector: '.inputWrap.inputWrap--disabled',                prop: 'border-color', expectedVar: '--input-border-disabled'         },
  { key: 'input/value/default',         selector: '.inputField',                                   prop: 'color',        expectedVar: '--input-value'                   },
  { key: 'input/label/default',         selector: '.inputWrap .inputLabel',                        prop: 'color',        expectedVar: '--input-label'                   },
  { key: 'input/icon/default',          selector: '.inputWrap svg',                                prop: 'color',        expectedVar: '--input-icon'                    },
  // buttonSecondary — bg/text/border across default/hover
  { key: 'buttonSecondary/bg/default',     selector: '.buttonSecondary',       prop: 'background',   expectedVar: '--buttonSecondary-background'     },
  { key: 'buttonSecondary/border/default', selector: '.buttonSecondary',       prop: 'border',       expectedVar: '--buttonSecondary-border'         },
  { key: 'buttonSecondary/text/default',   selector: '.buttonSecondary',       prop: 'color',        expectedVar: '--buttonSecondary-text'           },
  { key: 'buttonSecondary/border/hover',   selector: '.buttonSecondary:hover', prop: 'border-color', expectedVar: '--buttonSecondary-border-hover'   },
  { key: 'buttonSecondary/bg/hover',       selector: '.buttonSecondary:hover', prop: 'background',   expectedVar: '--buttonSecondary-background-hover' },
  // buttonTertiary — bg+text across default/hover (light-mode index now avoids dark-mode overwrite)
  { key: 'buttonTertiary/bg/default',   selector: '.buttonTertiary',       prop: 'background', expectedVar: '--buttonTertiary-background'       },
  { key: 'buttonTertiary/text/default', selector: '.buttonTertiary',       prop: 'color',      expectedVar: '--buttonTertiary-text'             },
  { key: 'buttonTertiary/bg/hover',     selector: '.buttonTertiary:hover', prop: 'background', expectedVar: '--buttonTertiary-background-active'},
  { key: 'buttonTertiary/text/hover',   selector: '.buttonTertiary:hover', prop: 'color',      expectedVar: '--buttonTertiary-text-active'      },
  // buttonQuaternary — text default; hover pill bg (covered by CSS_PROPERTY_ASSERTIONS too, but keep both layers)
  { key: 'buttonQuaternary/text/default', selector: '.buttonQuaternary',               prop: 'color',      expectedVar: '--buttonQuaternary-text'          },
  { key: 'buttonQuaternary/bg/hover',     selector: '.buttonQuaternary:hover::before', prop: 'background', expectedVar: '--buttonQuaternary-background-hover' },
  // swatch — border vars per filled/empty state
  { key: 'swatch/border/filled', selector: '.swatch',       prop: 'border',       expectedVar: '--swatch-border-filled' },
  { key: 'swatch/border/empty',  selector: '.swatch.empty', prop: 'border-color', expectedVar: '--swatch-border-empty'  },
  // overflowList — bg/border/label default + all hover state
  { key: 'overflowList/bg/default',     selector: '.overflowList',       prop: 'background',   expectedVar: '--overflowList-background'      },
  { key: 'overflowList/border/default', selector: '.overflowList',       prop: 'border-bottom', expectedVar: '--overflowList-border'         },
  { key: 'overflowList/label/default',  selector: '.overflowList',       prop: 'color',        expectedVar: '--overflowList-label'           },
  { key: 'overflowList/bg/hover',       selector: '.overflowList:hover', prop: 'background',   expectedVar: '--overflowList-background-hover'},
  { key: 'overflowList/border/hover',   selector: '.overflowList:hover', prop: 'border-bottom-color', expectedVar: '--overflowList-border-hover' },
  { key: 'overflowList/label/hover',    selector: '.overflowList:hover', prop: 'color',        expectedVar: '--overflowList-label-hover'     },
  // dividerSection — text vars for title, count, and divider sub-elements
  { key: 'dividerSection/title',   selector: '.dividerSection',          prop: 'color', expectedVar: '--dividerSection-title'   },
  { key: 'dividerSection/number',  selector: '.dividerSection .count',   prop: 'color', expectedVar: '--dividerSection-number'  },
  { key: 'dividerSection/divider', selector: '.dividerSection .div-sep', prop: 'color', expectedVar: '--dividerSection-divider' },
];

// ─── Figma layout token → CSS var mapping ────────────────────────────────────
export const FIGMA_LAYOUT_TO_CSS = {
  'gap/xs':      '--gap-xs',
  'gap/s':       '--gap-s',
  'gap/m':       '--gap-m',
  'gap/l':       '--gap-l',
  'gap/xl':      '--gap-xl',
  'padding/xxs': '--padding-xxs',
  'padding/xs':  '--padding-xs',
  'padding/s':   '--padding-s',
  'padding/m':   '--padding-m',
  'padding/l':   '--padding-l',
  'radii/button':  '--radius-full',
  'radii/input':   '--radius-full',
  'radii/tooltip': '--radius-tooltip',
  'radii/swatch':  '--radius-swatch',
  'radii/toast':   '--radius-toast',
  'radii/checkbox': '--radius-checkbox',
  'radii/card':    '--radius-md',
};

// ─── Font scale key → CSS var mapping ────────────────────────────────────────
export const FONT_SCALE_TO_CSS = {
  'm': { size: '--m-size', weight: '--m-weight' },
  's': { size: '--s-size', weight: '--s-weight' },
  'l': { size: '--l-size', weight: '--l-weight' },
};

// ─── Per-component CSS selector config for property binding checks ────────────
export const COMPONENT_CSS_SELECTORS = {
  checkBox:         { main: '.checkbox', radiusSel: '.checkbox-box', fontSel: '.checkbox-text' },
  loader:           { main: '.loader', fontSel: '.loader-title' },
  tooltipButton: { main: '.tooltipButton' },
  buttonList:       { main: '.buttonList', beforeSel: '.buttonList::before' },
  node:             { main: '.node' },
  segmentedControl: { main: '.segmented-control button', gapSel: '.segmented-control button.selected' },
  badge:            { main: '.badge' },
  input:            { main: '.inputWrap',                fontSel: '.inputField', skipTBPadding: true },
  tooltipPopover:   { main: '#tt' },
  toast:            { main: '.toast' },
  buttonSecondary:  { main: '.buttonSecondary' },
  buttonQuaternary: { main: '.buttonQuaternary' },
  swatch:           { main: '.swatch' },
  overflowList:     { main: '.overflowList' },
  card:             { main: '.card' },
  modal:            { main: '.modal-card' },
  switch:           { main: '.switch' },
  overflow:         { main: '.overflow' },     // strokeSides check (all-sides flyout border)
  actionBar:        { main: '.actionbar' },    // strokeSides check (bottom-only border)
  dividerSection:   { main: '.dividerSection', skipLRPadding: true }, // LR padding/l intentionally from parent container
  // buttonTertiary: omitted — dark-mode override in theme.css overwrites the main block in buildBlockIndex;
  //   root padding/radius are visually correct; Gate [3f] children check covers LabelContainer span.
};

// ─── Sub-component isolation: documented broad rules (Gate [8]) ───────────────
export const ALLOWED_BROAD_RULES = {
  '.tooltipButton svg':         'LEAF — DS tooltipButton (1810:27212); the wrapper sets the icon colour, no nested DS sub-component',
  // ── node state icons (added 2026-07-22) ──
  // These replaced a single broad `.has-selection .node:not(.node-selected) svg`
  // rule whose 0,3,1 specificity beat `.node-focus-btn svg` (0,1,1) and repainted
  // the action buttons with the disabled colour. Scoping to the two icon wrappers
  // is what keeps the action buttons isolated — that is the point of these entries.
  '.node.node-disabled .node-type-icon svg':                    'ISOLATED — scoped to the type-icon wrapper; action buttons keep their own colour',
  '.node.node-disabled .var-type-icon svg':                     'ISOLATED — as above, variable-list variant',
  '.node.node-external .node-type-icon svg':                    'ISOLATED — as above, external state',
  '.node.node-external .var-type-icon svg':                     'ISOLATED — as above, external state',
  '.has-selection .node:not(.node-selected) .node-type-icon svg': 'ISOLATED — as above, receded state',
  '.has-selection .node:not(.node-selected) .var-type-icon svg':  'ISOLATED — as above, receded state',

  // ── external-library badge icons (added 2026-07-24) ──
  // Both are scoped to the badge's own wrapper class, which contains nothing but the
  // Icon/Library svg — no descendant component can be reached by either rule.
  '.lib-badge svg':             'ISOLATED — scoped to the row-level badge wrapper; sizes the xs (12px) Icon/Library variant and tints it with --text-muted',
  '.sb-lib-badge svg':          'ISOLATED — as above, sidebar header variant; colour only, size comes from the inline svg attributes',

  // node — ISOLATED
  '.node svg':                  'ISOLATED — .node-focus-btn/goto/drill/comp-item-focus-btn svg overrides in impact-atlas/ui.src.html',
  '.node.node-selected svg':    'ISOLATED — same action-button overrides cover all node states',
  '.node.node-unselected svg':  'ISOLATED — same action-button overrides',
  '.node.node-disabled svg':    'ISOLATED — same action-button overrides',
  '.node:hover .node-type-icon svg': 'ISOLATED — DS node State=Hover icon colour, scoped to the type-icon wrapper so action buttons keep their own colour',
  '.node:hover .var-type-icon svg':  'ISOLATED — as above, variable-list variant',

  // buttonTertiary — LEAF
  '.buttonTertiary svg':        'LEAF — leaf component; no nested DS sub-component',
  '.buttonTertiary:hover svg':  'LEAF — hover state of leaf component',
  '.highlight svg':             'LEAF — DS highlight pill; the wrapper sets its own icon colour, no nested DS sub-component',

  // buttonQuaternary — LEAF
  '.buttonQuaternary svg':      'LEAF — leaf component; no nested DS sub-component',

  // buttonSecondary — NON-VISUAL (layout only)
  '.buttonSecondary svg':       'NON-VISUAL — sets order only; no color/fill/stroke override',

  // buttonAddOutput / buttonRescan — NON-VISUAL
  '.buttonAddOutput svg':       'NON-VISUAL — sets transition only',
  '.output-picker.picker-open .buttonAddOutput svg': 'NON-VISUAL — sets transform rotation only',
  '.buttonRescan svg':          'NON-VISUAL — sets display only',

  // inputWrap — LEAF icon slot
  '.inputWrap svg':             "LEAF icon slot — SVG is inputWrap's own icon, not a sub-component",

  // segmented-control — LEAF children
  '.segmented-control svg':                   'LEAF children — segmented-control owns its svgs directly',
  '.segmented-control button':                'LEAF children — segmented-control owns its button children',
  '.segmented-control button:hover:not(.selected)': 'LEAF children — hover state of owned button',
  '.segmented-control button.selected':       'LEAF children — selected state of owned button',
  '.segmented-control button.selected svg':   'LEAF children — svg inside selected owned button',
  '.segmented-control.has-pill button.selected': 'LEAF children — pill variant, owned button',

  // buttonList — ISOLATED (action buttons are display:none by default, shown on hover as buttonTertiary;
  // SVG color: broad .buttonList svg rule uses iconPrimary; arrow overrides to iconSecondary via higher-specificity rule;
  // action button svg overrides to --buttonTertiary-text via hover-specific rule)
  '.buttonList svg':            'ISOLATED — icon color inherits --buttonList-iconPrimary; action buttons hidden by default (display:none)',
  '.buttonList.selected svg':   'ISOLATED — selected state; same isolation',
  '.buttonList:hover svg':      'ISOLATED — hover state; same isolation',
  '.buttonList.hovered svg':    'ISOLATED — keyboard-nav mirror of :hover; same isolation',
  // ISOLATION FIX — these restore a nested tooltipButton's own icon colour, which the
  // four broad `.buttonList svg` rules above would otherwise dim to buttonList/iconPrimary
  // (the lib-badge-in-buttonList bug). Verified by the two `.buttonList .tooltipButton svg`
  // rendered assertions above. One per buttonList state so every state keeps the colour.
  '.buttonList .tooltipButton svg':          'ISOLATION FIX — nested tooltipButton keeps --tooltipButton-icon over the broad .buttonList svg rule',
  '.buttonList:hover .tooltipButton svg':    'ISOLATION FIX — same, hover state',
  '.buttonList.hovered .tooltipButton svg':  'ISOLATION FIX — same, keyboard-nav hover',
  '.buttonList.selected .tooltipButton svg': 'ISOLATION FIX — same, selected state',
  '.buttonList .buttonList-action svg': 'LEAF — action buttons are buttonTertiary leaf components; color overridden to --buttonTertiary-text via high-specificity hover rule',
  '.buttonList:not(.selected):hover .buttonList-action svg': 'LEAF — action button icon on hover uses --buttonTertiary-text (DS: buttonTertiary/iconText/default/color)',
  '.buttonList:not(.selected).hovered .buttonList-action svg': 'LEAF — same as above for .hovered class variant',

  // tableRow — LEAF
  '.tableRow svg':              'LEAF — leaf component',

  // button-group — OWNED CHILDREN
  '.button-group button':                   'OWNED children — plugin UI grouping, not a DS button sub-component',
  '.button-group button.selected':          'OWNED children — selected state',
  '.button-group button:not(.selected):hover': 'OWNED children — hover state',

  // empty-state — DECORATIVE
  '.empty-state-content svg':   'DECORATIVE — illustration slot, no nested sub-components',
  '.empty-state svg':           'DECORATIVE — illustration slot, no nested sub-components',
  '.empty-state.empty-state--positive svg': 'DECORATIVE — the illustration of the DS type=positive variant turns positive; no nested sub-components',

  // Isolation-fix rules (the override rules themselves)
  '.node-focus-btn svg':        'ISOLATION FIX — leaf action button; this rule IS the isolation override',
  '.node-goto-btn svg':         'ISOLATION FIX — leaf action button',
  '.node-drill-btn svg':        'ISOLATION FIX — leaf action button',
  '.comp-item-focus-btn svg':   'ISOLATION FIX — leaf action button',
  '.node-focus-btn:hover svg':  'ISOLATION FIX — hover state of leaf action button',
  '.node-goto-btn:hover svg':   'ISOLATION FIX — hover state',
  '.node-drill-btn:hover svg':  'ISOLATION FIX — hover state',
  '.comp-item-focus-btn:hover svg': 'ISOLATION FIX — hover state',

  // Plugin-specific leaf wrappers
  '.fork-item .f-head svg':     'PLUGIN-SPECIFIC — tokens-to-ink fork icon, leaf SVG slot',
  '.no-issues svg':             'PLUGIN-SPECIFIC — font-scaling-lab empty state icon',
  '.search-wrap svg.search-icon': 'PLUGIN-SPECIFIC — impact-atlas search icon slot (DS icon-search sprite via var(--input-icon)); native input wrapper',

};

// ─── CSS property assertions (Gate [3e]) ─────────────────────────────────────
// Guards plugin-specific selectors that aren't in CONTRACT but must stay in sync
// with DS geometry. Each entry: { sel, prop, expected|present|expectedVar }.
//   expected    — exact CSS value string
//   present     — boolean: property must (true) or must NOT (false) appear
//   expectedVar — property must use var(expectedVar)
export const CSS_PROPERTY_ASSERTIONS = [
  // buttonPrimary — geometry was ungated until 2026-07-29: absent from both
  // COMPONENT_CSS_SELECTORS and CSS_HEIGHT_RULES, so h=24 was never asserted in CSS
  // and the button silently rendered at ~23px from `padding: 6px` alone. Pinned here.
  { sel: '.buttonPrimary', prop: 'height',  expectedVar: '--button-min-height' }, // DS h=24 (button/min-height)
  // Mirrors the DS structurally as of 2026-07-31: padding/xs on the frame plus a further
  // padding/xs inside its LabelContainer (.buttonPrimary span), the same pattern as the
  // other three buttons. Previously collapsed into a single 8px, which rendered the same
  // but did not match the DS; the live capture confirmed the LabelContainer, so it was
  // straightened out and every buttonPrimary label is now wrapped in a span.
  { sel: '.buttonPrimary', prop: 'padding', expectedVar: '--padding-xs' },
  // DS button roots are FLUSH (rootGap 0): the label↔icon spacing is only the LabelContainer
  // (span) padding/xs. Code once added gap/s on top → doubled gap. Locked to 0 for all four.
  // (Secondary/Quaternary are enforced via their gapPx contract field; Primary/Tertiary here,
  //  because they each have a later bare .buttonX rule that the structure gap check mis-selects.)
  { sel: '.buttonPrimary',  prop: 'gap', expected: '0' },
  { sel: '.buttonTertiary', prop: 'gap', expected: '0' },
  // toast — Gate [3b] checks padding only on selCfg.main = '.progress-msg' (loading state).
  // The success state (.toast) has different height and the SAME padding tokens — both must be asserted
  // here or a wrong padding on .toast passes every gate silently (as it did with padding: 0 var(--padding-l)).
  { sel: '.toast', prop: 'height',  expected:    '32px'        }, // DS success state: h=32
  { sel: '.toast', prop: 'padding', expectedVar: '--padding-s' }, // DS: tb = padding/s (8px)
  { sel: '.toast', prop: 'padding', expectedVar: '--padding-m' }, // DS: lr = padding/m (12px)
  // loading state padding + gap — main selector checked by Gate [3b] but asserting explicitly avoids future drift
  // gap/xl is the CONTAINER gap (.progress-msg between .toast-content and cancel button).
  // Inner content gap (spinner↔text) is gap/m on .toast-content — asserted via subframes [3f]
  // and cross-checked against snapshot childFrameGaps (DS rebound gap/s → gap/m 2026-07).
  // If gap/xl is removed here, spinner and text will be 8px apart (correct) but container gap breaks.
  // If .toast-content wrapper is removed from HTML, spinner gets gap/xl = 16px instead of 8px.
  { sel: '.progress-msg', prop: 'padding', expectedVar: '--padding-s' }, // DS: tb = padding/s (8px)
  { sel: '.progress-msg', prop: 'padding', expectedVar: '--padding-m' }, // DS: lr = padding/m (12px)
  { sel: '.progress-msg', prop: 'gap',     expectedVar: '--gap-xl'    }, // DS: container gap = gap/xl (16px)
  // statusBar (theme.css base class) — DS 789:38384: tb padding/m, lr padding/l, h=48.
  // (Was padding/l → h56 in 2026-07; reverted to padding/m → h48 in 2026-08.)
  { sel: '.statusBar', prop: 'height',  expected:    '48px'         }, // DS: 24 content + padding/m × 2
  { sel: '.statusBar', prop: 'padding', expectedVar: '--padding-l'  }, // DS: lr padding/l (tb via fixed height + centering)
  { sel: '.statusBar-title', prop: 'gap', expectedVar: '--gap-s'    }, // DS Title group: icon↔label gap/s
  // (.switch-content flush gap is now enforced via the switch CONTRACT children gapPx entry —
  //  childFrameGaps now captures unbound/zero inner gaps, so the structured mechanism covers it.)
  // actionBar (theme.css base class) — DS 138:16657: tb padding/m, lr padding/l, h=48
  { sel: '.actionbar', prop: 'min-height',  expected: '48px'        }, // DS: 24 content + padding/m × 2 (min-height — grows for wrapped chips)
  { sel: '.actionbar', prop: 'padding', expectedVar: '--padding-m'  }, // DS: tb padding/m
  { sel: '.actionbar', prop: 'padding', expectedVar: '--padding-l'  }, // DS: lr padding/l
  // buttonList arrow: shown on both hover AND selected, uses iconSecondary (DS: buttonList/iconSecondary/color)
  { sel: '.buttonList.selected .buttonList-arrow', prop: 'display', expected: 'block' },
  { sel: '.buttonList.selected .buttonList-arrow', prop: 'color',   expectedVar: '--buttonList-iconSecondary' },
  { sel: '.buttonList:hover .buttonList-arrow',    prop: 'display', expected: 'block' },
  { sel: '.buttonList:hover .buttonList-arrow',    prop: 'color',   expectedVar: '--buttonList-iconSecondary' },
  // buttonList: gap/s (icon↔label) comes from Figma "Content" child frame, mapped to root CSS selector.
  // Figma root gapVar = null; CSS must still use --gap-s.
  { sel: '.buttonList', prop: 'gap', expectedVar: '--gap-s' },
  // buttonList hover/selected: Container paddingRight=padding/s (8px), NOT padding/xs (4px)
  { sel: '.buttonList:hover',    prop: 'padding-right', expectedVar: '--padding-s' },
  { sel: '.buttonList.selected', prop: 'padding-right', expectedVar: '--padding-s' },
  // buttonList Actions gap/m (action↔arrow) = root gap/s + margin-right on the action button.
  // No static assertion (the rule is comma-grouped with the .hovered variant, which exact-selector
  // lookup can't see) — locked by RENDERED_ASSERTIONS marginRight instead.
  // Action button: display:none by default (no layout space); shown as inline-flex on hover
  { sel: '.buttonList-action', prop: 'display', expected: 'none' },
  // SVG color override safety — .buttonList svg is a broad rule; any SVG with a different token
  // must have an explicit more-specific override asserted here.
  // badge: gap/s and padding/s LR not bound at Figma root level; CSS must still use the right vars.
  { sel: '.badge', prop: 'gap',     expectedVar: '--gap-s'     },
  { sel: '.badge', prop: 'padding', expectedVar: '--padding-s' },
  // dividerSection — DS node 135-46577: paddingTop=24 (padding/xl), paddingBottom=2 (padding/xxs),
  // LR=0 intentional — sidePanelBody already provides 16px horizontal padding (adding both = 32px double-indent).
  { sel: '.dividerSection', prop: 'background', expectedVar: '--bg'         },
  { sel: '.dividerSection-content', prop: 'padding', expectedVar: '--padding-xs' },  // DS 2026-09-09: root padding is 0; vertical rhythm is the Content's padding/xs (top+bottom)
  // buttonSecondary — DS: h=24 (HUG content), paddingLr=padding/xs, root gap FLUSH (rootGap 0 —
  // spacing is the LabelContainer/span padding). Root gap:0 is enforced via the gapPx contract field.
  { sel: '.buttonSecondary', prop: 'padding',       expectedVar: '--padding-xs' },
  { sel: '.buttonSecondary', prop: 'border-radius', expectedVar: '--radius-full' },
  // buttonQuaternary — DS: min-h-[24px] (Figma), paddingLr=padding/xs, no gap at root (gap/s from LabelContainer)
  { sel: '.buttonQuaternary', prop: 'height',        present:     false           }, // Figma uses min-height — fixed height is wrong
  { sel: '.buttonQuaternary', prop: 'min-height',    expectedVar: '--button-min-height'  },
  { sel: '.buttonQuaternary', prop: 'padding',       expectedVar: '--padding-xs'  },
  // root gap FLUSH (rootGap 0) — enforced via the gapPx contract field, not gap/s.
  { sel: '.buttonQuaternary', prop: 'outline',       expected:    'none'          }, // DS has no focus state — browser outline must be suppressed
  { sel: '.buttonQuaternary', prop: 'appearance',   expected:    'none'          }, // suppress platform-native button border (persists despite border/outline:none)
  // hover pill must use the bound DS token var; Figma hover state has NO border/outline on the frame
  { sel: '.buttonQuaternary:hover::before', prop: 'background', expectedVar: '--buttonQuaternary-background-hover' },
  { sel: '.buttonQuaternary:hover::before', prop: 'border',     present:     false },
  { sel: '.buttonQuaternary:hover::before', prop: 'outline',    present:     false },
  // disabled hover must NOT show the pill — ::before background must be reset to transparent
  { sel: '.buttonQuaternary:disabled:hover::before', prop: 'background', expected: 'transparent' },
  // swatch — DS: 24×24 (var(--button-min-height)), innerRadiusVar=radii/swatch; no padding/gap
  { sel: '.swatch', prop: 'border-radius', expectedVar: '--radius-swatch' },
  // overflowList — DS: h=32px (hardcoded, in knownHardcodedExceptions), paddingLr=padding/s, gapVar=gap/s at root
  { sel: '.overflowList', prop: 'padding', expectedVar: '--padding-s' },
  { sel: '.overflowList', prop: 'height',  expected:    '32px'        }, // Figma FIXED 32px; no sizing token → documented exception
];

// ─── Pseudo-element content audit (Gate [14]) ────────────────────────────────
// Every ::before / ::after rule that sets `content` must appear here.
// Key   = normalized selector.
// Value = DS PILL | DS INDICATOR | LAYOUT — with brief Figma layer description.
//
// How to add a new entry:
//   DS PILL      — verify the pill/fill layer exists in the Figma DS component frame
//   DS INDICATOR — verify the indicator exists in the DS component (e.g. selection dot)
//   LAYOUT       — non-visual utility (resize handles, overlays, clearfixes)
//   Never add an entry without checking Figma first.
export const PSEUDO_ELEMENTS = {
  // DS component pill layers — Content frame inner fill (hover/selected background)
  '.buttonQuaternary::before': 'DS PILL — buttonQuaternary Content frame inset fill; hover bg layer',
  '.buttonList::before':       'DS PILL — buttonList Content frame h=32 pill (inset: 4px 0); hover/selected bg',
  // Layout utilities — not DS components; no Figma token layer
  '.sidePanelResize::after':   'LAYOUT — drag handle visual line indicator; plugin layout utility, not a DS component',
  // Plugin-specific UI — impact-atlas custom components; no DS component equivalent
  '.depth-option:not(:last-child)::after':     'PLUGIN-SPECIFIC — animated connector line between depth selector steps; impact-atlas custom UI',
  '.depth-circle::after':                      'PLUGIN-SPECIFIC — inner selection dot of depth selector circle; impact-atlas custom radio UI',
  '.radioButton-circle::after':                'DS radioButton — the 8px inner dot (radioButton/background/selected) shown when checked; the disc itself fills with radioButton/border/selected. Base component.',
};

// ─── SVG symbol audit (Gate [15]) ────────────────────────────────────────────
// Every <symbol> defined in any plugin HTML file must be declared here.
// DS icons must record their Figma node ID so the path can be verified against source.
// Plugin-specific icons must be marked PLUGIN-SPECIFIC with a description.
//
// How to add a new entry:
//   DS ICON         — fetch from Figma via MCP (get_design_context), record nodeId, use exact path data
//   PLUGIN-SPECIFIC — custom icon with no DS backing; describe its visual purpose
//   Never use hand-drawn paths for DS icons — always source from Figma.
export const ICON_SYMBOLS = {
  'icon-suggestion-removeline': { desc: 'DS ICON — Icon-suggestion-removeline node 505-16374; fill-based compound path (line with strike = remove line cap / truncation)', nodeId: '505:16374', dsName: 'Icon-suggestion-removeline', strokeNone: true },
  // DS icons — sourced directly from Figma DS file (nHSN6XqTsE7U6f43aZ641P)
  // Object format: { desc, nodeId, transform?, strokeNone?, strokeBased? }
  //   strokeNone: true — path must have stroke="none"; prevents CSS-inherited stroke from
  //   broad rules (e.g. .buttonTertiary svg { stroke: ... }) thickening fill-only icons
  //   strokeBased: true — <symbol> tag must have fill="none"; prevents fill-path replacement of a stroke-only DS icon
  //   Render size is NOT declared here — the viewBox on <symbol> is the icon container;
  //   use it at whatever size the design calls for.
  'icon-fit':         { desc: 'DS ICON — Icon-Fit node 149-101965; four corner-bracket arrows (fit-to-frame); fill-based compound path', nodeId: '149:101965', dsName: 'Icon-fit', strokeNone: true },
  'icon-library':     { desc: 'DS ICON — Icon/Library node 1584-83149; size=xsmall (12px) variant; fill-based compound path (two stacked book spines)', nodeId: '1584:83149', dsName: 'Icon-library', strokeNone: true },
  'icon-info':        { desc: 'DS ICON — Icon/Info node 67-46370; fill-based compound path (circle ring + i-body rect + dot rect)', nodeId: '67:46370', dsName: 'Icon-info', strokeNone: true },
  'icon-check':       { desc: 'DS ICON — Icon/check size=small node 365-16969; fill-based checkmark chevron (Boolean Union export)', nodeId: '365:16969', dsName: 'Icon-check', strokeNone: true },
  'icon-reset':       { desc: 'DS ICON — Icon/Reset node 3-4257; fill-based compound path (arc + arrow indicating undo/reset)', nodeId: '3:4257', dsName: 'Icon-reset', strokeNone: true },
  'icon-empty-token':     { desc: 'DS ICON — Icon/object/token node 1546-27305; size=large (56px) variant; fill-based compound path, rotated -45 and drawn in a shared 56x56 DS frame so it keeps its scale relative to icon-empty-component', nodeId: '1546:27305', dsName: 'Icon-object-token', idDiffersFromDsName: 'Empty-state rendering of the token glyph (size=large). The "empty-" prefix distinguishes it from the 16px icon-variable that uses the same DS component at size=small.', strokeNone: true },
  'icon-empty-component': { desc: 'DS ICON — Icon/object/component node 1546-30341; size=large (56px) variant; fill-based compound path, same shared 56x56 frame', nodeId: '1546:30341', dsName: 'Icon-object-component', idDiffersFromDsName: 'Empty-state rendering of the component glyph (size=large). The "empty-" prefix distinguishes it from the 16px icon-component that uses the same DS component at size=small.', strokeNone: true },
  'icon-plus':        { desc: 'DS ICON — Icon/Plus node 2-2879; fill-based compound path (cross/add mark)', nodeId: '2:2879', dsName: 'Icon-plus', strokeNone: true },
  'icon-export':      { desc: 'DS ICON — Icon-export node 31-932 (renamed from Icon-download + redrawn 2026-08); upload/export arrow out of a tray', nodeId: '31:932', dsName: 'Icon-export', strokeNone: true },
  'icon-update':      { desc: 'DS ICON — Icon/Update node 31-66777; fill-based compound path (two circular refresh arrows)', nodeId: '31:66777', dsName: 'Icon-update', strokeNone: true },
  'icon-copy':        { desc: 'DS ICON — Icon/Copy node 1390:21732; fill-based compound path (two overlapping rectangles = copy to clipboard)', nodeId: '1390:21732', dsName: 'Icon-copy', strokeNone: true },
  'icon-arrow-right': { desc: 'DS ICON — Icon/arrowRight node 364-62670; fill-based compound path (rightward chevron >)', nodeId: '364:62670', dsName: 'Icon-arrowRight', strokeNone: true },
  // The DS component is Icon/object/token — there is no "Icon/object/variable"; the old
  // desc named a component that does not exist in the file. Corrected against live Figma
  // 2026-07-24.
  'icon-variable':    { desc: 'DS ICON — Icon/object/token node 541-84085; size=small (16px) variant; fill-based compound path (hexagonal outline + inner polygon + circle cutout)', nodeId: '541:84085', dsName: 'Icon-object-token', idDiffersFromDsName: 'The DS names this glyph after the token object; the plugins use it to mark Figma variables, matching Figma\'s own product wording and the sibling icon-var-COLOR/FLOAT/STRING/BOOLEAN set. Renaming to icon-token would put it at odds with every surrounding identifier. icon-empty-token keeps the DS wording because that one is a token-flavoured empty state, not a variable marker.', strokeNone: true },
  'icon-object-component':   { desc: 'DS ICON — Icon/object/component node 402-62613; fill-based compound path (four-diamond cross)', nodeId: '402:62613', dsName: 'Icon-object-component', strokeNone: true },
  'icon-focus':       { desc: 'DS ICON — Icon/focus node 31-601; fill-based compound path (five concentric rings)', nodeId: '31:601', dsName: 'Icon-focus', strokeNone: true },
  'icon-search':      { desc: 'DS ICON — Icon/Search node 308-10855; fill-based compound path (magnifying glass ring + handle)', nodeId: '308:10855', dsName: 'Icon-search', strokeNone: true },
  'icon-clear':       { desc: 'DS ICON — Icon/Clear node 3-4163; fill-based compound path (circle ring + X cross)', nodeId: '3:4163', dsName: 'Icon-clear', strokeNone: true },
  'icon-list':        { desc: 'DS ICON — Icon/List node 546-76251; fill-based compound path (two bullet+line rows)', nodeId: '546:76251', dsName: 'Icon-list', strokeNone: true },
  'icon-settings':    { desc: 'DS ICON — Icon/settings node 973-17080; fill-based compound path (gear/cog with inner circle)', nodeId: '973:17080', dsName: 'Icon-settings', strokeNone: true },
  'icon-var-color':      { desc: 'DS ICON — Icon/var/color node 308-49949; fill-based compound path (paint drop)', nodeId: '308:49949', dsName: 'Icon-var-color', strokeNone: true },
  'icon-var-number':     { desc: 'DS ICON — Icon/var/number node 308-49931; fill-based compound path (numeric/hash rules)', nodeId: '308:49931', dsName: 'Icon-var-number', strokeNone: true },
  'icon-var-string':     { desc: 'DS ICON — Icon/var/string node 308-49979; fill-based compound path (text box)', nodeId: '308:49979', dsName: 'Icon-var-string', strokeNone: true },
  'icon-var-boolean':    { desc: 'DS ICON — Icon/var/boolean node 308-49964; fill-based compound path (toggle pill)', nodeId: '308:49964', dsName: 'Icon-var-boolean', strokeNone: true },
  'icon-object-text':           { desc: 'DS ICON — Icon/object/text node 402-62576; fill-based compound path (T glyph)', nodeId: '402:62576', dsName: 'Icon-object-text', strokeNone: true },
  'icon-object-frame':          { desc: 'DS ICON — Icon/object/frame node 402-62592; fill-based compound path (frame crosshairs)', nodeId: '402:62592', dsName: 'Icon-object-frame', strokeNone: true },
  'icon-suggestion-hug-width':      { desc: 'DS ICON — Icon/suggestion/hug-width node 504-15385; fill-based compound path (inward horizontal arrows)', nodeId: '504:15385', dsName: 'Icon-suggestion-hug-width', strokeNone: true },
  'icon-suggestion-hug-height':     { desc: 'DS ICON — Icon/suggestion/hug-height node 504-15511; fill-based compound path (inward vertical arrows)', nodeId: '504:15511', dsName: 'Icon-suggestion-hug-height', strokeNone: true },
  'icon-suggestion-fill-width':     { desc: 'DS ICON — Icon/suggestion/fill-width node 504-15499; fill-based compound path (outward horizontal arrows)', nodeId: '504:15499', dsName: 'Icon-suggestion-fill-width', strokeNone: true },

  // Plugin-specific utility icons — no DS component equivalent
  'icon-warning':      { desc: 'DS ICON — Icon-warning node 1723-23346; fill-based compound path (triangle + exclamation)', nodeId: '1723:23346', dsName: 'Icon-warning', strokeNone: true },
  'icon-empty-colors':  { desc: 'DS ICON — Icon-var-color node 1723-24809; size=large (56px) variant; fill-based compound path (paint drop). Empty state: no color variables in selection', nodeId: '1723:24809', dsName: 'Icon-var-color', idDiffersFromDsName: 'Empty-state rendering of the color-variable glyph (size=large). The "empty-" prefix distinguishes it from the 16px icon-var-color used as the variable-type indicator.', strokeNone: true },
  'icon-tree':        { desc: 'DS ICON — Icon/Tree node 546:76268; fill-based compound path (branching tree with two rows of nodes)', nodeId: '546:76268', dsName: 'Icon-tree', strokeNone: true },
  'icon-empty-search': { desc: 'DS ICON — Icon/Search node 1695-22625; size=large (56px) variant; fill-based compound path (magnifying glass)', nodeId: '1695:22625', dsName: 'Icon-search', idDiffersFromDsName: 'Empty-state rendering of the search glyph (size=large). The "empty-" prefix distinguishes it from the 16px icon-search that uses the same DS component at size=small.', strokeNone: true },
  'icon-empty-graph': { desc: 'DS ICON — Icon-nolink node 1695-40229; size=large (56px) variant; fill-based compound path (unlinked/broken-link glyph)', nodeId: '1695:40229', dsName: 'Icon-nolink', idDiffersFromDsName: 'Empty-state icon for the graph panel when a variable has no references. The DS component is the generic "no link" glyph; the sprite id names its role (empty graph) '+ 'rather than the drawing.', strokeNone: true },

  // Figma variable type icons — inline picker UI (used in variable pickers across all plugins)

  // Plugin-specific type/sizing indicators — font-scaling-lab issue list
  'icon-object-variant': { desc: 'DS ICON — Icon-object-variant node 402-62567; fill-based compound path (variant diamond)', nodeId: '402:62567', dsName: 'Icon-object-variant', strokeNone: true },
  'icon-suggestion-fill-height': { desc: 'DS ICON — Icon/suggestion/fill-height node 1723-22696; fill-based compound path (outward vertical arrows = fill height)', nodeId: '1723:22696', dsName: 'Icon-suggestion-fill-height', strokeNone: true },
  'icon-suggestion-resize': { desc: 'DS ICON — Icon-suggestion-resize node 504-15522; fill-based compound path (resize both axes)', nodeId: '504:15522', dsName: 'Icon-suggestion-resize', strokeNone: true },
};

// ─── Figma state/variant → CSS selector + var binding mapping ─────────────────
export const STATE_SELECTORS = [];

// ─── Surface container enforcement (Gate [3h]) ────────────────────────────────
export const SURFACE_CONTAINERS = [];

// ─── Icon slot parity (Gate [13]) ────────────────────────────────────────────
// Each entry declares which DS icon symbol must appear inside a given element.
//   plugin   — matches ds-config.json → paths.plugins[]
//   selector — #id or .class (first match in static HTML)
//   icon     — expected symbol id (without #), must be a key in ICON_SYMBOLS
export const ICON_USAGES = [
  // impact-atlas — actionbar / sidebar
  { plugin: 'impact-atlas', selector: '#scan-status-change-btn', icon: 'icon-settings' },
  { plugin: 'impact-atlas', selector: '#rescan-btn',             icon: 'icon-update'   },
  { plugin: 'impact-atlas', selector: '#sb-focus-btn',           icon: 'icon-focus'    },
  // The sidebar place button became the "Affected components" dividerSection action
  // (2026-07-24). Same job, new home and new icon — Icon/Fit, not Icon/Plus.
  { plugin: 'impact-atlas', selector: '.place-action-btn',       icon: 'icon-fit'      },
  // External-library marker on the sidebar node header.
  { plugin: 'impact-atlas', selector: '#sb-lib-badge',           icon: 'icon-library'  },
  { plugin: 'impact-atlas', selector: '#sb-export-btn',          icon: 'icon-copy'     },
  // impact-atlas — browser mode toggle (no DS class; icon specifies which mode)
  { plugin: 'impact-atlas', selector: '#btn-mode-tokens',        icon: 'icon-variable' },
  { plugin: 'impact-atlas', selector: '#btn-mode-comps',         icon: 'icon-object-component'},
  // impact-atlas — view mode toggle (segmented control, icon-only per Figma)
  { plugin: 'impact-atlas', selector: '#btn-view-graph',         icon: 'icon-tree'     },
  { plugin: 'impact-atlas', selector: '#btn-view-list',          icon: 'icon-list'     },
  // impact-atlas — search clear (plugin-specific; uses DS icon)
  { plugin: 'impact-atlas', selector: '#search-clear',           icon: 'icon-clear'    },
  // impact-atlas — search icon (plugin-specific; uses DS icon, not hand-drawn)
  { plugin: 'impact-atlas', selector: '#search-wrap',            icon: 'icon-search'   },
  // tokens-to-ink
  { plugin: 'tokens-to-ink', selector: '#rescan-btn',            icon: 'icon-update'   },
  { plugin: 'tokens-to-ink', selector: '#view-export-btn',       icon: 'icon-export'   },
  { plugin: 'tokens-to-ink', selector: '#export-confirm-btn',    icon: 'icon-export'   },
  { plugin: 'tokens-to-ink', selector: '#view-colors-btn',       icon: 'icon-var-color'},
  // font-scaling-lab
  { plugin: 'font-scaling-lab', selector: '#focus-frame-btn',    icon: 'icon-focus'    },
];

// ─── Component slot parity (Gate [14]) ────────────────────────────────────────
// Each entry declares which DS component class must be present on a given element.
//   plugin        — matches ds-config.json → paths.plugins[]
//   selector      — #id or .class (first match in static HTML)
//   expectedClass — DS component class that must appear in the element's class=""
export const COMPONENT_USAGES = [
  // impact-atlas — actionbar / sidebar
  { plugin: 'impact-atlas', selector: '#scan-status-change-btn', expectedClass: 'buttonTertiary'  },
  { plugin: 'impact-atlas', selector: '#rescan-btn',             expectedClass: 'buttonTertiary'  },
  { plugin: 'impact-atlas', selector: '#sb-focus-btn',           expectedClass: 'buttonTertiary'  },
  { plugin: 'impact-atlas', selector: '.place-action-btn',       expectedClass: 'buttonSecondary'   },
  { plugin: 'impact-atlas', selector: '#sb-export-btn',          expectedClass: 'buttonQuaternary'  },
  { plugin: 'impact-atlas', selector: '#scan-cancel-btn',        expectedClass: 'buttonTertiary'  },
  // impact-atlas — browser empty state / modal
  { plugin: 'impact-atlas', selector: '#browser-empty-clear',    expectedClass: 'buttonSecondary' },
  { plugin: 'impact-atlas', selector: '#modal-cancel-btn',       expectedClass: 'buttonSecondary' },
  { plugin: 'impact-atlas', selector: '#modal-confirm-btn',      expectedClass: 'buttonPrimary'   },
  // tokens-to-ink inline Export screen action bar (replaced the modal footer)
  { plugin: 'tokens-to-ink', selector: '#export-savedefault-btn', expectedClass: 'buttonTertiary' },
  { plugin: 'tokens-to-ink', selector: '#export-confirm-btn',    expectedClass: 'buttonPrimary'   },
  // tokens-to-ink — #scan-btn retired 2026-07-29: the plugin scans on launch, so
  // the "select something first" empty state it lived in can never be correct.
  { plugin: 'tokens-to-ink', selector: '#rescan-btn',            expectedClass: 'buttonPrimary'   },
  // font-scaling-lab
  { plugin: 'font-scaling-lab', selector: '#scan-btn',           expectedClass: 'buttonPrimary'   },
  { plugin: 'font-scaling-lab', selector: '#focus-frame-btn',    expectedClass: 'buttonTertiary'  },
  { plugin: 'font-scaling-lab', selector: '#scale-dec',          expectedClass: 'buttonSecondary' },
  { plugin: 'font-scaling-lab', selector: '#scale-inc',          expectedClass: 'buttonSecondary' },
  { plugin: 'font-scaling-lab', selector: '#gen-btn',            expectedClass: 'buttonPrimary'   },
  { plugin: 'font-scaling-lab', selector: '#zoom-reset',         expectedClass: 'buttonSecondary' },
  { plugin: 'font-scaling-lab', selector: '#details-close',      expectedClass: 'buttonSecondary' },
];

// ─── Transition contract (Gate [16]) ─────────────────────────────────────────
// selector → expected transition part(s).
//   string  = single value, checked as a comma-part (exact, normalised whitespace)
//   array   = every element must appear as a comma-part in the CSS transition value
// Source of truth: packages/ui/src/theme.css (grep "transition:").
// To add a new entry: verify the value in theme.css first, then add it here.
export const TRANSITION_CONTRACT = {
  // Generic <button> base rule applies to all button variants.
  'button':                     ['background 0.15s ease', 'color 0.15s ease', 'opacity 0.15s ease'],

  // DS button variants
  '.buttonPrimary':             ['background 0.15s ease', 'color 0.15s ease'],
  '.buttonSecondary':           ['border-color 0.15s ease', 'color 0.15s ease'],
  '.buttonTertiary':            ['background 0.15s ease', 'color 0.15s ease'],
  '.buttonTertiary svg':        'stroke 0.15s ease',
  '.buttonQuaternary':          'opacity 0.15s ease',
  '.buttonQuaternary::before':  'background 0.15s ease',
  '.buttonList':                'color 0.1s ease',
  '.buttonList::before':        'background 0.1s ease',

  // Interactive components
  '.inputWrap':                 'border-color 0.15s ease',
  '.node':                      ['border-color 0.1s', 'background 0.1s', 'color 0.1s'],
  '.overflowList':              ['background 0.1s ease', 'color 0.1s ease'],
  '.tableRow':                  'background 0.1s',
  '.seg-pill':                  ['left 0.22s cubic-bezier(0.4, 0, 0.2, 1)', 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)'],
  '.segmented-control button':  ['background 0.18s ease', 'border-color 0.18s ease', 'color 0.18s ease'],

  // Layout / shell
  '.sidePanel':                 'width 0.18s ease',

  // Overlay / flyout
  '#tt':                        'opacity 0.15s ease',
  '.output-picker-flyout.open': 'opacity 0.1s',
};

// ─── Button class-base rules (Gate [3i]) ──────────────────────────────────────
// Each entry: { modifier, allowedBases }
//   modifier     — class that triggers the check (e.g. 'buttonUnpair')
//   allowedBases — at least one of these must appear on the same <button>
// Gate [3i] in structure-check.mjs scans all plugin HTML source files.
export const BUTTON_CLASS_RULES = [
  // buttonUnpair is an icon-only modifier; DS defines these as buttonQuaternary (ghost, no border)
  { modifier: 'buttonUnpair', allowedBases: ['buttonQuaternary'] },
];

// ─── Form controls that are DS input instances (gate [13c]) ──────────────────
// Both plugins hand-roll a search/number field instead of using .inputWrap, so no
// gate mapped them to the DS input component. They were bordered with --border
// (dividerLine), which resolves to the SAME primitive as --input-border in light and
// one ramp step darker in dark — correct-looking in one mode, too dim in the other,
// and green across every token-level gate. This binding makes the element answerable
// to its component's tokens.
export const FORM_CONTROL_BINDINGS = [
  {
    component: 'input',
    dsClass: 'inputWrap',          // carrying this = theme.css owns the identity
    elements: ['input', 'textarea', 'select'],
    props: {
      'border-color': [
        '--input-border', '--input-border-hover', '--input-border-focus',
        '--input-auto-border',
      ],
      'background': [
        '--input-background', '--input-background-disabled', '--surface',
      ],
    },
  },
];
