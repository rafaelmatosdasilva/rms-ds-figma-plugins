# Changelog

The design system, `@rms/ds-core`. Each product keeps its own changelog in its repository:
[Impact Atlas](https://github.com/rafaelmatosdasilva/rms-figma-impact-atlas/blob/main/CHANGELOG.md),
[Tokens to Ink](https://github.com/rafaelmatosdasilva/rms-figma-tokens-to-ink/blob/main/CHANGELOG.md),
[Font Scaling Lab](https://github.com/rafaelmatosdasilva/rms-figma-font-scaling-lab/blob/main/CHANGELOG.md).

---

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
