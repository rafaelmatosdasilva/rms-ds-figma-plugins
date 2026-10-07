# Backlog

Everything still to do and every idea not yet built, in one place, for the design system, its three products and the engine that checks them, [rms-design-system-engine](https://github.com/rafaelmatosdasilva/rms-design-system-engine). Status as of 7 October 2026. A new session starts here.

It lives in this repository because the engine's repository must stay free of product and component names (its no-testbed-names test fails on them). Two longer files hold the detail. [docs/backlog/engine-ideas.md](docs/backlog/engine-ideas.md) is the full ideas list with its sources (I1 to I95, S1 to S36), and [docs/backlog/authoring-plan.md](docs/backlog/authoring-plan.md) is the plan for choosing who authors each area. Their status lines are older than this file, and where they differ this file is right.

When an item is done, remove it here in the same pull request or move it to Done recently. A new idea goes under Ideas not started, with its source.

## Next up, in the agreed order

1. **Clear the To do items that are Claude's to fix in the code.** The 17 rows under Claude in the code below, plus the roles the code must render to match the role annotations in Figma (engine issue E1).
2. **Product overrides go back to the system.** Gather every product rule laid over a system component, and every product's own version of one, into one list. Each item is either fixed in the system or promoted to a new variant, ranked higher when several products make the same change. Then the edit check refuses new product patches over system components.
3. **Every finding says why, and every exception is accountable.** Each finding and rule cites its source (a Figma annotation, a guideline, a contract line, a WCAG criterion or a past decision). Each kept exception (knownRawTokens, knownReimplementations and the rest) carries a reason, an owner and a review date, and comes back in To do once the date passes. Overlaps I19, I77 and I91.
4. **Components use semantic tokens only.** Flag a component that uses a primitive such as `--neutral-800` directly, and a token whose value is the same in every mode of its collection. In the same pass, group colours that look almost the same (the five reds). The engine's rule of no imposed structure still holds, so the check runs only when the project declares its layers in `ds-config.json`.

## To do rows, by who acts

Counted from the style guide's To do page on 7 October, before [design system #40](https://github.com/rafaelmatosdasilva/rms-ds-figma-plugins/pull/40), which closed the segmentedControl contract row.

### Claude in the code (17)

- **Reduced motion (2.3.3).** buttonList, buttonPrimary, buttonQuaternary, buttonSecondary, buttonTertiary, input, modal, node, overflowList, overlay and toast still move when the person asks for less motion. Add a `prefers-reduced-motion` rule for each, and for the segmented control's `.seg-pill`.
- **Names (4.1.2).** Icon-only buttonPrimary and buttonSecondary have no name a screen reader can read.
- **Keyboard (2.1.1).** Tab never reaches buttonList.
- **States a screen reader misses (4.1.2).** input Disabled needs `disabled` or `aria-disabled`, and radioButton Current needs `aria-checked`. toast Type=Error is listed under You in Figma, but its fix is in the code too.
- **Impact Atlas draws its own loader** (`.loading-state` and `.spinner` in `ui.src.html`). Move it to the system's loader. The system itself draws its spinner three ways (`.spinner`, the toast's and the loader's), and one would do.

### You in Figma (28)

- **Roles.** 22 rows read Figma says role X, it renders as Y (actionBar, buttonList, buttonStepper, buttonTertiary, card, checkBoxGroup, dividerLine, dividerSection, emptyState, highlight, highlightSelector, listItem, modal, node, overflow, overlay, segmentedControl, segmentedControlSegment, statusBar, swatch, table/row, tooltipButton). The Figma annotation is right and the code has to change, so these are Claude's (E1). Some are false readings (E2). One more row says buttonStepper's arrow keys leave aria-valuenow unchanged, also a code fix.
- **switch has no role annotation.** Add one in Figma.
- **Three annotations no check reads.** dividerSection's background note, overlay's Sizing fill note and tooltipButton's icon note. They are notes, not requirements (E3).

### You decide (33)

- **Variables only one side has.** `--text-muted` (actionBar and node), `--input-background`, `--input-auto-border`, the four modal motion variables (`--modal-duration`, `--modal-easing` and their out versions), and panel/background/primary and secondary in Figma only.
- **Pairs that look like one variable.** highlight, highlightSelector, listItem and node list the same name on each side as two variables, such as highlight/background in Figma and `--highlight-background` in the code. Check whether the engine fails to pair them (E9) before deciding.
- **Font Scaling Lab stepper border.** Two rows, both the stale expected colour (E4).

### You check by hand (169)

WCAG criteria only a person can judge, such as whether instructions rely only on shape or position. Not urgent.

## Engine issues found in use

- **E1. Role mismatches are routed to You in Figma.** The Figma annotation is right and the code has to change, so they belong to Claude in the code.
- **E2. The style guide checks the wrong element for a role.** card reads as a link, and emptyState, listItem, modal and dividerSection as buttons, because the check takes a control inside the preview instead of the component itself.
- **E3. Notes that are not requirements become To do rows.** Figma notes in the Intent and Implementation categories land in To do as tasks.
- **E4. Written-down expected colours go stale.** Font Scaling Lab's stepper border fails Gate 24 because a fixed colour was never updated after Figma changed. Work the expected colour out from the Figma variable instead.
- **E7. Data is up to date goes by file dates, not content (Gate 1).** A product counts as stale whenever the theme file is newer, even when the content is identical.
- **E8. One accessibility reading flips between runs.** Font Scaling Lab's input edge reads 2.9 to 1 (3 to 1 needed) in some runs and passes in others. Likely a colour read during a transition or from a stale build.
- **E9. Variables that look paired are listed as only on one side.** See You decide above.
- **E10. Comparison mistakes the deeper facts surfaced.** buttonList's bottom-only border is compared through `border-top-color`, dividerLine's width set by the page is compared, switch Enable=False text colour is compared against the wrong text layer, and a radius set per corner is reported once per corner.

E5 (segmentedControl read from its segment's node) and E6 (deeper facts for every component, read on every refresh) are done, in [design system #40](https://github.com/rafaelmatosdasilva/rms-ds-figma-plugins/pull/40) and [engine #78](https://github.com/rafaelmatosdasilva/rms-design-system-engine/pull/78).

## Differences between Figma and the code

The deeper facts compare 480 facts on 36 components and find 15 differences, most of them E10. These are real or need a decision.

- **tooltipPopover** has no 1.5px border in the code.
- **highlightSelector** Selected has no 4px corner radius in the code.
- **segmentedControl** has a 1px gap in Figma with no variable, and its root uses radii/button while its Slot uses radii/input. Decide in Figma, then the code follows.
- **No focus state in Figma** for 12 components (buttonList, buttonPrimary, buttonQuaternary, buttonSecondary, buttonStepper, buttonTertiary, checkBox, node, overflowList, radioButton, segmentedControlSegment, tooltipButton). The code draws one, so add it in Figma for both to match.

## Waiting on the owner

- **The STYLE_GUIDE_DISPATCH secret** in each product's repository, so the style guide republishes on its own when a product changes.
- **The GitHub About text** for the engine, pasted from the last proposal.
- **Figma refreshes need edit access to the file.** Another account can do everything else here as long as the design in Figma does not change.

## Work in progress

Started and not finished.

- Prototype evaluation tasks and scorer, and measuring prototypes against Claude alone with new tasks (states, flow, dialog, phone, one primary action).
- Prototypes use every source of intent the engine collects (descriptions, annotations, guidelines, notes, patterns, templates, pages, designed screens), with the request in view.
- Interactive prototypes (system scripts, overlays, selections).
- Prototype drawing fidelity on a real system (mode, size, clipping, absolute layers, unbuilt components, options).
- A case study and reports from every evaluation run.
- Accessibility in four parts (prototype accessibility, the style guide runs component code, states follow props, accessibility build tasks), and every WCAG 2.1 A and AA criterion per component checked by the engine.
- Capture rules for strokes and font sizes, a reader for bound typography, and their evaluation.
- Stand-ins and FILL sizing.
- The remaining To do differences between Figma and the code.
- Engine-wide improvements without lowering quality.
- Split the plugins into one public repository each, with the design system core here.
- Authoring plan stages 1 to 5. `authority.mjs`, `--decide`, `--author`, `--fix-figma` and `--retire-figma` do not exist yet ([docs/backlog/authoring-plan.md](docs/backlog/authoring-plan.md)).

## Ideas not started

### From the ideas list

Full text and sources in [docs/backlog/engine-ideas.md](docs/backlog/engine-ideas.md).

- **I6.** Token layering validation across brands.
- **I7.** Judgment evaluation, the built result against the contract.
- **I11.** Evidence honesty conventions.
- **I12.** Maturity and AI readiness scorecard (partly built).
- **I17.** Semantic naming grammar, as advice only.
- **I19.** Decisions legible on exemptions and authored decisions.
- **I25.** A contract view that follows the DSDS schema.
- **I26.** A code example per component (partly built).
- **I27.** Evaluation metrics, second version.
- **I71.** Warn at commit, block at push, and only for what the code already uses.
- **I72.** A component only in code gets its Figma spec (check what is built).
- **I76.** Imports of the old library and the system's insides.
- **I77.** Accepted differences carry a reason and an owner.
- **I82.** Where each component lives, its next larger context (partly built).
- **I83.** A new component is a decision, not an edit.
- **I87.** `--scaffold` in build mode.
- **I88.** `--improve`, the engine proposes its own fixes, measured, and a person decides.
- **I89.** AI behaviour in design systems (later).
- **I90.** `--context <component>`, a task-sized contract with its evidence.
- **I91.** Every finding cites its evidence (partly built).
- **I93.** A verification snapshot headline.
- **I95.** A prompt box in the style guide, on the device (later).

### Token layers (from the token architecture thread, 7 October)

1. Components use semantic tokens only (in Next up).
2. A token belongs in the first layer where its value can change. One that is the same in Light and Dark belongs in core, and a core token that differs between brands belongs in brand.
3. Each layer points at the one before it. Flag alias chains that skip a layer or point backwards.
4. Each layer holds only its own kind of token, set once in `ds-config.json`.
5. Split merged axes. A mode such as High Contrast Dark becomes Theme and Contrast.
6. Test every combination of switches, such as dark with high contrast, for contrast and for resolving in the code.
7. Products set modes only at the root.
8. The style guide offers a switch for any axis it finds (Brand, Contrast, Density).
9. A token budget report. Tokens with the same value as another in every mode, tokens only one component uses, and tokens nothing uses.
10. Owners per layer in `ds-config.json`, so the Who column in To do names the owning team.
11. A rename sweep. Every place that still uses a renamed token, updated in one change.
12. Brand guidance for agents, built from Figma descriptions and annotations.

### Decisions and knowledge (from the Salesforce article, 7 October)

1. Every rule gets an ID and a source (in Next up).
2. An append-only DECISIONS.md, shown per component next to the Changelog.
3. An order of authority written down. The person's goal, then research, then documented standards, then past decisions, then general heuristics.
4. A coverage map in the style guide, showing where knowledge is thin.
5. Patterns found in the products, written up for the prototypes to reuse.
6. Evidence first, decisions second. Candidates are collected and a person decides what each becomes.
7. Several directions at once for a prototype request.
8. Comments pinned on prototypes, with each change traced to its comment.
9. Simulated users built from the team's personas try a task on a prototype.
10. A handoff package per prototype (states, keyboard, token map, accessibility notes, copy, a ready checklist, the trail from the brief).
11. Move to WCAG 2.2 AA.
12. Migration recipes for deprecated components and renamed tokens.
13. Bring your own brand, run through the same checks.
14. Exactly one active theme in each product build.
15. Guidance in tiers (universal, the system's, then a product's own).
16. Stricter evaluations, with held-out tasks and more than one model.

### Fix the system, not the output (from the five reds articles, 7 October)

1. Refuse a product patch over a system component (in Next up).
2. An inventory of patches to move into the system (in Next up).
3. Every exception carries a reason, an owner and a review date (in Next up).
4. Near-duplicate values, the five reds, across tokens and hard-coded product values (in Next up).
5. A hard-coded value gets a warning that names the token to use.
6. No brand or product names in token keys.
7. Figma variable scoping. Flag a variable left on all scopes, or bound outside its scope.
8. A description on every semantic token, shown in the code, the style guide and `--query`.
9. Primitives hidden from the published library.
10. A diff test across brands or products, where only values change.
11. No catalogue-only patches, such as Storybook preview rules aimed at components.
12. Measure in the live products too, not only the style guide.
13. Borders that carry meaning checked at 3 to 1 (WCAG 1.4.11).
14. A check across components built in parallel, before merging.

### Curators and Figma tools (from Curators, Not Cops, 7 October)

1. Promote, do not only block. A product's remix becomes a proposed variant, handed back to Figma (in Next up).
2. Rank remixes by how many products repeat them, in a Proposals list apart from To do (in Next up).
3. Good remixes shown on the component's page, in Used in.
4. What's new spotlights what was promoted and who made it.
5. Motion parity with Figma Motion.
6. A motion page in the foundations.
7. Shaders as effect tokens.
8. Code Layers as a parity source.
9. The hand-back as a Figma generative plugin.
10. A shelf of the team's plugins.
11. The checks on Figma Make pull requests, in plain words.

After Next up, the most useful are motion parity, the coverage map, simulated users and WCAG 2.2. Hold the multi-brand work until a second brand or a high contrast mode is planned, and Code Layers and Figma Make until those tools mature.

## Done recently

- **Design system.** [#35](https://github.com/rafaelmatosdasilva/rms-ds-figma-plugins/pull/35) segmented control options share its width (v2.0.14), [#36](https://github.com/rafaelmatosdasilva/rms-ds-figma-plugins/pull/36) Figma refresh with role annotations, [#37](https://github.com/rafaelmatosdasilva/rms-ds-figma-plugins/pull/37) and [#38](https://github.com/rafaelmatosdasilva/rms-ds-figma-plugins/pull/38) contrast passes in Light and Dark on every surface (v2.0.15, v2.0.16), [#39](https://github.com/rafaelmatosdasilva/rms-ds-figma-plugins/pull/39) paint facts, [#40](https://github.com/rafaelmatosdasilva/rms-ds-figma-plugins/pull/40) segmentedControl node and deeper facts.
- **Engine.** [#72](https://github.com/rafaelmatosdasilva/rms-design-system-engine/pull/72) to [#74](https://github.com/rafaelmatosdasilva/rms-design-system-engine/pull/74) style guide rounds and products' own versions of system components, [#75](https://github.com/rafaelmatosdasilva/rms-design-system-engine/pull/75) and [#76](https://github.com/rafaelmatosdasilva/rms-design-system-engine/pull/76) tinted backgrounds measured as rendered on every surface, [#77](https://github.com/rafaelmatosdasilva/rms-design-system-engine/pull/77) layer opacity compared and contrast pairs follow what Figma draws, [#78](https://github.com/rafaelmatosdasilva/rms-design-system-engine/pull/78) deeper facts on every refresh.
