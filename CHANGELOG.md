# Changelog

The design system, `@rms/ds-core`. Each product keeps its own changelog in its repository:
[Impact Atlas](https://github.com/rafaelmatosdasilva/rms-figma-impact-atlas/blob/main/CHANGELOG.md),
[Tokens to Ink](https://github.com/rafaelmatosdasilva/rms-figma-tokens-to-ink/blob/main/CHANGELOG.md),
[Font Scaling Lab](https://github.com/rafaelmatosdasilva/rms-figma-font-scaling-lab/blob/main/CHANGELOG.md).

---

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
