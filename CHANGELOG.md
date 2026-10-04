# Changelog

The design system, `@rms/ds-core`. Each product keeps its own changelog in its repository:
[Impact Atlas](https://github.com/rafaelmatosdasilva/rms-figma-impact-atlas/blob/main/CHANGELOG.md),
[Tokens to Ink](https://github.com/rafaelmatosdasilva/rms-figma-tokens-to-ink/blob/main/CHANGELOG.md),
[Font Scaling Lab](https://github.com/rafaelmatosdasilva/rms-figma-font-scaling-lab/blob/main/CHANGELOG.md).

---

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
