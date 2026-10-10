# Changelog

The design system, `@rms/ds-core`. Each product keeps its own changelog in its repository:
[Impact Atlas](https://github.com/rafaelmatosdasilva/rms-figma-impact-atlas/blob/main/CHANGELOG.md),
[Tokens to Ink](https://github.com/rafaelmatosdasilva/rms-figma-tokens-to-ink/blob/main/CHANGELOG.md),
[Font Scaling Lab](https://github.com/rafaelmatosdasilva/rms-figma-font-scaling-lab/blob/main/CHANGELOG.md).

---

## v2.0.19 · 10 October 2026

- A list row is reached by the keyboard (WCAG 2.1.1): its main action is a button around its label (`.buttonList-main`) that covers the whole row, so Tab reaches it and Enter or Space acts on it, while its own action button and badge stay apart; that button shows while the row has the focus, as on hover, so Tab reaches it next. A selected row is heard as pressed. Each product wraps its rows' labels in it.
- The system has a modal (`openModal`, `closeModal`): a named modal dialog that takes the focus and keeps it while Tab moves, closes with Escape or a click on the overlay, and gives the focus back to what opened it. Each product's own open and close code goes.
- A disabled field is said in the contract the way a screen reader hears it: the look on its wrapper, the field itself disabled (`heardOn`).

## v2.0.18 · 9 October 2026

- The states a product draws with a class are heard too, whoever sets the class and whenever: a selected node is pressed (`aria-pressed`), a disabled one says so (`aria-disabled`), and the radio button on the current step says it (`aria-current="step"`). A product keeps toggling the class alone.

## v2.0.17 · 9 October 2026

- When someone asks their system for less motion, every component stops moving: transitions and animations end at once (WCAG 2.3.3). A toast and a modal still open and close, and a loader shows its ring at rest.
- The stepper works by keyboard and is heard: `initButtonStepper` makes its field a spinbutton that ArrowUp and ArrowDown step (Home and End go to its ends), its buttons turn off at each end, and a screen reader hears the value as it changes. A stepper whose field already says it is a spinbutton works on its own.
- A segmented control is a radio group (WCAG 4.1.2, 2.1.1): the control says radiogroup and each option radio, aria-checked follows the chosen option whoever sets it, Tab reaches the chosen option and the arrow keys move between options and choose them (Home and End to the ends). Every segmented control gets it from `ui-shared.js`, with no change in the products; each product names its control with `aria-label`.
- The reference markup of each component carries the role Figma's notes give it: a tooltip button is a named `<button>` that Tab reaches, a modal card is a named modal dialog, a card, an empty state and a checkbox group are groups named by their title or label, a divider line is a separator, and a colour swatch is an image.
- States a screen reader now hears with the look: a selected node is pressed (`aria-pressed`) and a disabled one says so (`aria-disabled`), the radio button on the current step says it (`aria-current="step"`), and an error toast is an alert.

## v2.0.16 · 7 October 2026

- Every text and icon colour now passes contrast in light and dark mode, on every surface a component can sit on, changed in Figma first with the system's own variables. In dark mode the negative badge label uses the secondary text colour (Neutral 300). Placeholder text in a field uses Neutral 400 in light mode and Neutral 300 in dark mode. The icons of a list button, a node, a list item and an empty state, and the loader's spinner, use Neutral 500 in light mode, and the list button and node icons Neutral 400 in dark mode.
- A badge's tinted background is drawn at 8%, its layer opacity in Figma, for every type (it was 12%, and 15% for a warning).

## v2.0.15 · 7 October 2026

- Colours that failed contrast now pass, changed in Figma first with the system's own variables, no new values. In light mode the warning, positive and neutral badge labels use the secondary text colour (Neutral 300), the overflow text and the section divider's number and dot use Neutral 400, and a hovered overflow list label uses Neutral 100. In dark mode the section divider's dot uses Neutral 300. The badges keep their tinted backgrounds.

## v2.0.14 · 7 October 2026

- A segmented control's options share its width evenly: each is as wide as the widest, whether the control hugs its options or fills its row.

## v2.0.13 · 6 October 2026

- The audit tries every component 320 pixels wide (WCAG 1.4.10 Reflow): nothing needs sideways scrolling, so the criterion is checked instead of left for a person.

## v2.0.12 · 6 October 2026

- The overflow list item's hover label is Figma's again (Neutral 800 in Light); what Figma holds is the design's choice. Its contrast on the white row (1.23:1) is flagged for the design team to fix. The badge's Light colours are no longer kept quiet (`knownLowContrast` is gone): a contrast below WCAG is always flagged.

## v2.0.11 · 6 October 2026

- An overflow list item's label stays readable on hover in Light (Neutral 100, it was Neutral 800 on a white row), changed in Figma too.
- The style guide republishes on its own within the hour after the engine or a product changes, and builds nothing when nothing did.
- The badge's Light colours stay as they are, kept on purpose (`knownLowContrast`); Figma's window chrome colours are kept as Figma's own (`knownRawTokens`).

## v2.0.10 · 6 October 2026

Accessibility, WCAG 2.1 A and AA, from the engine's new checks.

- The default edge of an input, a checkbox and a radio button stands out 3:1 from what is around it (Neutral 500 in Light, Neutral 400 in Dark for the input), changed in Figma too. The input's hover edge is one step darker still, so it shows.
- The tooltip stays while the pointer moves onto it and rests there, stays until the pointer or the focus leaves, closes with Escape, also opens from the keyboard, and is read as its trigger's description.
- A toast is announced as it appears (a confirmation politely, a failure at once), and its time stops while the pointer or the focus is on it.
- The loader and the progress message are announced, their spinner silent.

## v2.0.9 · 6 October 2026

- table/row, built as in Figma (1:178): a row of a table whose Content, padding/xl top and bottom, holds what it describes (a swatch, its name in text style m with a tooltipButton, its value), a 16px connector and its outputs (rows of a swatch, inputs and a buttonQuaternary at gap/s, stacked at gap/m), with a dividerLine under it. `.tableRow` and its parts (`.tableRow-content`, `-variable`, `-info`, `-nameRow`, `-name`, `-value`, `-connector`, `-output`, `-outputRow`). It replaces the old list row of the same class, which no product used and whose colours Figma no longer has.
- The unused `--hex-sub-color` is gone (the row's value is semantic content secondary).

## v2.0.8 · 6 October 2026

- The panel has padding/l left and right on itself, as in Figma (it sat on its two slots). Its Main Content still reaches the panel's edges, so its scroll bar runs along the edge and nothing moves in the products.

## v2.0.7 · 6 October 2026

- One panel. The system's panel is `.panel`, as Figma's panel: Type Primary or Secondary, its Head Content (`.panel-head`) over its Main Content (`.panel-main`, which scrolls), its divider on the right, or on the left with `.panel--right`. `.panel--resizable` adds a drag handle (`.panel-resize`, `initPanelResize()`). The separate side panel (`.sidePanel`, `initSidePanelResize()`) is gone; Font Scaling Lab and Impact Atlas use the panel, and look exactly as before.
- Font Scaling Lab's close and generate buttons use the system's close and update icons; the contract records them.
- Tokens to Ink's Preflight buttons are in the contract; gap/xxl, which no product uses any more, is listed as unused.

## v2.0.6 · 6 October 2026

- The close and image icons (Icon-cross and Icon-image in Figma) are in the icon sheet, for Tokens to Ink's Preflight dialog.
- Tokens to Ink builds its Export screen with the system's radioButtonGroup, and its Preflight as Figma draws it, the system's modal over the system's overlay with a dividerSection and listItem rows; the contract follows.
- A component the system has not built yet, such as table/row, is no longer counted as a product's hand-built gap.

## v2.0.5 · 6 October 2026

- The highlight selector, selected, is drawn as Figma draws it: its fill at 20% and its outer ring at 48%, so what it marks shows through (the code painted both solid).
- The stepper centres its value, as Figma does.

## v2.0.4 · 6 October 2026

- The minus icon (Icon-minus in Figma) is in the icon sheet, for the stepper's decrease button, and the stepper's input is 119 wide, as Figma draws it.
- The audit reads which system components each product screen uses in Figma, and fails where a product's code builds one by hand. Today that is 13, listed in the audit for the products to take up.
- The style guide is built before the audit on GitHub, so the audit measures each component as the page draws it. The heights the published To do list showed for checkBox, dividerSection, highlightSelector, loader and radioButton were measured on bare elements; drawn whole they already match Figma.
- overlay/color keeps the raw colour Figma gives it, on purpose, and leaves the token layering advice.
- The Figma data is read again from Figma (6 October). The variables and the tokens the screens use are unchanged. The capture now reads each component's slots too, so the contract names them: the panel's Head Content and Main Content (gap/xl, Head Content padding/l on top), and the Slot of the action bar, card, modal, checkbox group and radio group. The modal's Slot spaces its content at gap/m, as Figma has it (it was gap/l in the code).

## v2.0.3 · 5 October 2026

- On the radio, Current wins over a checked input, so the step chosen in a stepper (Impact Atlas's scan depth) shows as current, a ring around a dot, never a filled disc.
- The contract says what Figma says about three fills: the overlay and the divider line fill a layer behind their content, and the section divider fills itself. The code already paints all three.
- The action bar has no minimum height, as Figma draws it (it hugs its 24px content and padding/m to 48, taller when chips wrap); the contract no longer asks for one, and the plain bar's check reads its padding.
- Every hardcoded value exception names the file it covers, so none applies repo-wide, and the two that excused code now gone are removed.

## v2.0.2 · 5 October 2026

- Every button shows the system's focus ring when the keyboard reaches it (`:focus-visible`, the ring the checkbox,
  switch and radio already draw), so a keyboard user sees where they are (WCAG 2.4.7). A click shows no ring.
- The radio builds all four of Figma's states on its own `.radioButton`: Current (`.radioButton--current`, a ring
  around a small dot) and Unselected (`.radioButton--unselected`, the dot alone) join Default and Selected, and its
  contract maps them to these selectors instead of Impact Atlas's own `.depth-*` radio, which stays listed as an
  exception until it moves onto the DS radio.
- The input's reference markup is a `<label class="inputWrap">`, so its labels name the field for a screen reader.
- The style guide workflow passes the `FIGMA_TOKEN` secret to the build: once it is set, each component's Figma image
  of every variant appears beside the code on the published page.
- The published style guide no longer adds a Repository and releases link to its menu; the overview still links the
  repository.

## v2.0.1 · 5 October 2026

- The code follows Figma: the resting node has its idle background; the badge icon is a 6px dot in its tone's colour;
  the tooltip and badge text use the s line height, and the tooltip's border is drawn inside, so it adds no height; a
  disabled input has no fill; the checkbox, radio and loader descriptions sit as close to their titles as in Figma;
  the highlight selector's background and border follow Figma's layers; the action bar has no minimum height.
- Figma's structure snapshot records each component's vertical sizing and layout, and Figma now sets the card to hug
  its content and the panel and overlay to fill their container, so every component's height is compared.

## v2.0.0 · 4 October 2026

- Every CSS variable carries its Figma variable's name, so code and Figma read the same: `typography/m/font-size` is
  `--typography-m-font-size`, `semantic/content/primary` is `--semantic-content-primary`, `radii/button` is
  `--radii-button`, `buttonPrimary/iconText` is `--buttonPrimary-iconText`. Where one variable stood for several Figma
  tokens, each has its own, aliased as in Figma (the badge's background, label and icon per tone; the input's radius).
  A breaking change for anything that reads the old names; the three plugins move with this release.
- The audit now fails when a variable is not called by its Figma name (`figmaNames: "strict"`).

## v1.0.3 · 4 October 2026

- The code follows Figma: the modal is 320 wide; the empty state's illustration rule no longer reaches its action
  button's icon; toast and status bar spacing follow Figma's structure.
- The style guide samples show every part a switch turns on or off (buttonList, loader, tooltipButton).

## v1.0.2 · 4 October 2026

- The code follows Figma: text styles on card, switch, modal and overflow; statusBar spacing and a content group;
  actionBar and statusBar lines and background drawn as their own layers, with their Figma switches; highlightSelector
  states; empty state and list item spacing.
- Every Figma property the code lacked is built: descriptions, divider lines, actions, the modal header icon and close
  button, the overflowList icon, the panel type and more.
- Products take a design system update without a release of their own: it ships with their next published version.

## v1.0.1 · 4 October 2026

- Each plugin moved to its own repository, with its history and releases. This repository is now the design system
  and the index of everything built with it.
- Every pull request tests and builds each product against the change.

## v1.0.0 · 4 October 2026

- The design system as one package: the theme and shared UI, core and test helpers as subpath exports, and the
  build and release tools as commands. Built output of every plugin unchanged.
- A version bump on main tags the release and reaches every product.
