# Backlog and ideas

The one place for every open task, every idea not yet built and every article behind them, for the design system, its three products and the engine that checks them ([rms-design-system-engine](https://github.com/rafaelmatosdasilva/rms-design-system-engine)). Status as of 7 October 2026. A new session starts here.

It lives in this repository because the engine's repository must stay free of product and component names. When an item is done, delete it here in the same pull request. A new idea goes at the end of its group with its source, and a new article goes at the end of Sources.

Who acts is marked **Claude** or **You**. Size is S, M or L.

## 1. Next up, in the agreed order

- **N1. Clear Claude's fixes from the To do page** (Claude, M). Everything in section 2.
- **N2. Product overrides go back to the system** (Claude, L). One list of every product rule laid over a system component and every product's own version of one. Each is fixed in the system or promoted to a variant, ranked by how many products repeat it. Then the edit check refuses new product patches. Sources S43, S44.
- **N3. Every finding says why, every exception is accountable** (Claude, M). Findings cite their source (a Figma annotation, a guideline, a contract line, a WCAG criterion, a past decision). Exceptions such as knownRawTokens carry a reason, an owner and a review date, and come back in To do when the date passes. Covers ideas I19, I77 and I91. Sources S9, S33, S35, S42, S43.
- **N4. Components use semantic tokens only** (Claude, M). Flag a component that uses a primitive directly and a token with the same value in every mode, and group colours that look almost the same (the five reds). Runs only when the project declares its layers in `ds-config.json`, since the engine never imposes a structure. Sources S41, S43.

## 2. Claude's fixes from the To do page

- **T1. Reduced motion, WCAG 2.3.3** (Claude, S). buttonList, buttonPrimary, buttonQuaternary, buttonSecondary, buttonTertiary, input, modal, node, overflowList, overlay, toast and the segmented `.seg-pill` still move when someone asks for less motion.
- **T2. Names for icon-only buttons, 4.1.2** (Claude, S). buttonPrimary and buttonSecondary without a label have no name a screen reader can read.
- **T3. buttonList by keyboard, 2.1.1** (Claude, S). Tab never reaches it.
- **T4. States a screen reader misses, 4.1.2** (Claude, S). input Disabled needs `disabled` or `aria-disabled`, radioButton Current needs `aria-checked`, toast Error needs its state announced.
- **T5. Impact Atlas onto the system loader** (Claude, M). It draws its own (`.loading-state`, `.spinner`). The system also draws its spinner three ways, and one would do.
- **T6. Roles the code must render** (Claude, M). 22 components render a different role from Figma's annotation (toolbar for actionBar and statusBar, img for swatch, row for table/row, radio for each segment and more). Fix E2 first, since some are false readings.
- **T7. buttonStepper arrow keys** (Claude, S). ArrowUp and ArrowDown must change `aria-valuenow`, as a spinbutton does.

## 3. Engine issues found in use

- **E1. Role mismatches go to You in Figma** (Claude, S). The annotation is right and the code has to change, so these rows belong to Claude in the code.
- **E2. The wrong element is checked for a role** (Claude, S). card reads as a link, and emptyState, listItem, modal and dividerSection as buttons, because the check takes a control inside the preview instead of the component.
- **E3. Notes become To do rows** (Claude, S). Figma notes in the Intent and Implementation categories are not requirements.
- **E4. Written-down expected colours go stale** (Claude, S). Font Scaling Lab's stepper border fails Gate 24 because a fixed colour was never updated. Work the colour out from the Figma variable.
- **E7. Up to date goes by file dates, Gate 1** (Claude, S). A product counts as stale when the theme file is newer, even with identical content.
- **E8. One accessibility reading flips between runs** (Claude, M). Font Scaling Lab's input edge reads 2.9 to 1 in some runs and passes in others.
- **E9. Variables that look paired are listed apart** (Claude, S). highlight/background in Figma and `--highlight-background` in the code show as two variables under You decide.
- **E10. Comparison mistakes from the deeper facts** (Claude, M). buttonList's bottom border is compared through its top, a dividerLine width set by the page is compared, switch text is compared on the wrong layer, and a radius set per corner is reported four times.

## 4. Differences between Figma and the code

- **D1. tooltipPopover border** (Claude, S). Figma has a 1.5px border the code lacks.
- **D2. highlightSelector Selected radius** (Claude, S). Figma has a 4px radius the code lacks.
- **D3. segmentedControl gap and radius** (You, S). A 1px gap with no variable, and radii/button on the root but radii/input on its Slot. Decide in Figma, then the code follows.
- **D4. A focus state in Figma for 12 components** (You, M). buttonList, buttonPrimary, buttonQuaternary, buttonSecondary, buttonStepper, buttonTertiary, checkBox, node, overflowList, radioButton, segmentedControlSegment and tooltipButton. The code already draws one.
- **D5. A role annotation on switch** (You, S).
- **D6. Three notes no check reads** (You, S). The dividerSection background note, the overlay Sizing fill note and the tooltipButton icon note.

## 5. Waiting on you

- **O1. The STYLE_GUIDE_DISPATCH secret** in each product's repository, so the style guide republishes when a product changes.
- **O2. The GitHub About text** for the engine, from the last proposal.
- **O3. Variables only one side has, You decide** (33 rows). `--text-muted`, `--input-background`, `--input-auto-border`, the four modal motion variables, and the panel backgrounds only in Figma. Check E9 first.
- **O4. Criteria to check by hand** (169 rows). WCAG criteria only a person can judge.
- **O5. A main heading in Impact Atlas.** It needs a visually hidden utility in the system, a design decision.
- **O6. Written guidance per component.** When to use, when not to and common mistakes, written in Figma or the guidelines. Source S45.
- **O7. Figma refreshes need edit access to the file.** The other account cannot read it, so any Figma change needs someone with access.

## 6. Started, not finished

- **P1. Prototype evaluation** (Claude, M). Tasks and a scorer, and new tasks (states, flow, dialog, phone, one primary action) measured against Claude alone.
- **P2. Prototypes use every source of intent** (Claude, M). Descriptions, annotations, guidelines, notes, patterns, templates, pages and designed screens.
- **P3. Interactive prototypes** (Claude, M). The system's own scripts run, so overlays, selections and dialogs work.
- **P4. Prototype drawing fidelity** (Claude, M). Mode, size, clipping, absolute layers and unbuilt components on a real system.
- **P5. A case study from every evaluation run** (Claude, M).
- **P6. WCAG 2.1 A and AA per component** (Claude, L). Every criterion checked by the engine, prototypes included.
- **P7. Strokes, font sizes and bound typography** (Claude, M). Capture rules and a reader, with their evaluation.
- **P8. Stand-ins and FILL sizing** (Claude, M).
- **P9. The remaining To do differences** (Claude, M).
- **P10. Engine-wide improvements** (Claude, L). Kept only where quality rises.
- **P11. Split the plugins** (Claude, L). One public repository per plugin, the system core here.
- **P12. Authoring plan, stages 1 to 5** (Claude, L). Choose who authors each area (Figma, the code or both). `authority.mjs`, `--decide`, `--author`, `--fix-figma` and `--retire-figma` do not exist yet. Detail in [docs/backlog/authoring-plan.md](docs/backlog/authoring-plan.md).

## 7. Ideas not started

### Style guide

- **G1. Light and dark side by side** in the Playground (Claude, S).
- **G2. Visual changes per release**, a before and after picture in What's new (Claude, M).
- **G3. A templates overview**, what each template is made of and the screen it comes from (Claude, M). Source S45.
- **G4. Real product pages per component**, pictures of the screens where it appears (Claude, M). Source S45.
- **G5. Mark a To check row as checked**, saving who and when until the component changes, so the accessibility table can reach fully compliant (Claude, M).
- **G6. The badge link bug** could not be reproduced and needs where it failed (You, S).

### From the review of the README

- **R1. Is the Figma file reliable enough to compare**, a check run before parity (Claude, M). Source S46.
- **R2. One model for rules, evidence and verdicts** behind every gate, with I91 and I93 as first steps (Claude, L). Source S46.
- **R3. How an agent puts components together**, not only which ones it uses (Claude, L). Source S46.

### From the engine's ideas list

- **I6. Token layering across brands** (M). Hold until a second brand is planned. Source S2.
- **I7. Judgment evaluation**, the built result against the contract (L). Source S1.
- **I11. Evidence honesty conventions** (S). Sources S11, S12.
- **I12. AI readiness scorecard, the rest** (M). Sources S8, S11, S12.
- **I17. Naming advice**, tokens named by look rather than role, advice only (S). Sources S4, S5, S10.
- **I25. A contract view in the DSDS format** (M). Source S20.
- **I26. A code example per component, the rest** (S). Source S16.
- **I27. Evaluation metrics, the rest**, time and token cost per task (S). Source S16.
- **I71. Warn at commit, block at push**, only for what the code already uses (M). Source S32.
- **I72. A component only in code gets its Figma spec** in the hand-back; check first how much exists (S). Source S32.
- **I76. Imports** from the old library or the system's insides are flagged with the import to write (S). Source S33.
- **I82. Where each component lives**, a usage map in `--query`, the contracts and the report (M). Sources S32, S34.
- **I83. A new component is a decision**, a near-copy of a system component is sent back (M). Source S34.
- **I87. `--scaffold` in build mode**, writing what is exact from Figma (L). Source S38.
- **I88. `--improve`**, the engine proposes its own fixes, measured, and you decide (M). Source S40.
- **I89. AI behaviour in design systems**, later (L). Source S39.
- **I90. `--context` for one component**, a task-sized contract with its evidence (M). Source S35.
- **I93. A verification headline**, contracts passing, drifting and not checked (S). Source S35.
- **I95. A prompt box in the style guide**, later (L). Source S36.

### Token layers

Source S41.

- **L2. A token belongs in the first layer where its value can change** (M).
- **L3. Each layer points at the one before it**, no skipped or backward aliases (S).
- **L4. Each layer holds only its own kind of token**, set in `ds-config.json` (S).
- **L5. Split merged axes**, High Contrast Dark becomes Theme and Contrast (M).
- **L6. Test every combination of switches** for contrast and for resolving in the code (M).
- **L7. Products set modes only at the root** (S).
- **L8. A style guide switch for every axis** found in Figma (M).
- **L9. A token budget report**, duplicates, single-use and unused tokens (S).
- **L10. Owners per layer**, so To do names the owning team (S).
- **L11. A rename sweep**, every use of a renamed token updated in one change (M).
- **L12. Brand guidance for agents**, from Figma descriptions and annotations (M).

### Decisions and knowledge

Source S42.

- **K2. A DECISIONS.md log**, shown per component next to the Changelog (M).
- **K3. An order of authority**, the person's goal, research, documented standards, past decisions, heuristics (S).
- **K4. A coverage map in the style guide**, where knowledge is thin (M).
- **K5. Patterns found in the products**, written up for prototypes (M).
- **K6. Evidence first, decisions second**, candidates collected and a person decides (M).
- **K7. Several directions at once** for a prototype request (L).
- **K8. Comments pinned on prototypes**, each change traced to its comment (M).
- **K9. Simulated users** from your personas try a task on a prototype (L).
- **K10. A handoff package per prototype** (M).
- **K11. Move to WCAG 2.2 AA** (M).
- **K12. Migration recipes** for deprecated components and renamed tokens (M).
- **K13. Bring your own brand** through the same checks (L).
- **K14. Exactly one active theme** per product build (S).
- **K15. Guidance in tiers**, universal, the system's, then a product's own (M).
- **K16. Stricter evaluations**, held-out tasks and more than one model (M).

### Fix the system, not the output

Source S43.

- **F5. A hard-coded value names its token** in the edit check (S).
- **F6. No brand or product names in token keys** (S).
- **F7. Figma variable scoping**, nothing left on all scopes or bound outside its scope (S).
- **F8. A description on every semantic token**, shown in the code, the token panel and `--query` (S).
- **F9. Primitives hidden from the published library** (You, S).
- **F10. A diff test across brands or products**, only values change (M).
- **F11. No catalogue-only patches**, such as Storybook preview rules aimed at components (S).
- **F12. Measure in the live products too**, not only the style guide (M).
- **F13. Borders that carry meaning at 3 to 1**, WCAG 1.4.11 (S).
- **F14. A check after parallel builds** for naming, duplication and near-duplicates (S).

### Curators and Figma tools

Source S44.

- **C3. Good remixes shown in Used in** as examples to follow (M).
- **C4. What's new credits what was promoted** and who made it (S).
- **C5. Motion parity with Figma Motion** (M).
- **C6. A motion page in the foundations** (M).
- **C7. Shaders as effect tokens** (M).
- **C8. Code Layers as a parity source**, later (L).
- **C9. The hand-back as a Figma plugin** (M).
- **C10. A plugin shelf** on a Tools page (S).
- **C11. Checks on Figma Make pull requests**, in plain words, later (M).

Suggested after section 1 are E1 to E3, G5, C5, K4, K9 and K11. Hold the multi-brand work (I6, L5, F10, K13) until a second brand or a high contrast mode is planned, and C8 and C11 until those Figma tools mature.

Every other idea from I1 to I95 is built or folded into another. Their full text is in the archive, [docs/backlog/engine-ideas.md](docs/backlog/engine-ideas.md).

## 8. Sources

Every article and note shared so far, and the ideas each one fed. Ideas still open are in bold.

- **S1.** TJ Pitre (Southleft), Design systems are a collection of decisions. Fed **I7**.
- **S2.** Ness Grixti, Wise's multi-brand design system. Fed **I6**.
- **S3.** Florian Gampert, What an agent needs from your design system. Fed I1 to I5, I8, I18, I34.
- **S4.** Southleft, Machine-readable design tokens for AI-ready component libraries. Fed I13, I14, **I17**, I18, I28.
- **S5.** Sophia Hee, Zero to One, a token system from a file with zero colour naming. Fed I10, **I17**.
- **S6.** Lea Verou, Dark mode toggles. Fed the mode switch handling.
- **S7.** TJ Pitre (Southleft), Claude Design is not a design systems tool.
- **S8.** zeroheight, Design System Maturity model. Fed **I12**.
- **S9.** Pegah Ahmadi, A Design System Isn't AI-Ready Until Its Decisions Are Legible. Fed **I19** (in N3), I20, I21.
- **S10.** Polar, Orbit, an LLM-safe design system. Fed I9, I16, **I17**.
- **S11.** Brad Frost, the ds-inspection skill. Fed **I11**, **I12**, I15, I18.
- **S12.** Brad Frost, the product-inspection skill. Fed I9, **I11**, **I12**, I18.
- **S13.** Brad Frost, the ds-token-architecture skill. Fed I10, I13, I18, I28.
- **S14.** Atlassian, Giving AI agents design system context from the terminal. Fed I22.
- **S15.** Shreyasi Dutta, Design Systems as Governance, Not Just Component Libraries.
- **S16.** Sanity, Design system evals. Fed **I26**, **I27**, I60.
- **S17.** Murphy Trueman, Design systems need evals. Fed I60.
- **S18.** thedesignsystem.guide, AI evals for design systems.
- **S19.** zeroheight and TJ Pitre, The future of design systems, part 3, the diagnostic layer. Fed I23, I24.
- **S20.** designsystemdocspec.org (DSDS). Fed **I25**.
- **S21.** Andrew Branch, We moved our design system out of Figma, and Figma's Code Connect docs. Fed I24, I31.
- **S22.** McKinsey, QBDS. Fed I31.
- **S23.** Southleft, scan-code-accessibility. Fed I32.
- **S24.** Vadym Zaitsev, AI Is the New User of Your Design System, with its comments. Fed I33.
- **S25.** Nathan Curtis, Generating Code from Specs and What Component Specs Leave Behind. Fed I38 to I46, I94.
- **S26.** TJ Pitre (Southleft), The Source of Truth Is a Ping-Pong Ball, and the ds-contracts-poc repository. Fed I47 to I54.
- **S27.** Shane P Williams with Cristian Morales Achiardi, You don't fix the output, you fix the system. Fed I57, I58, I61.
- **S28.** Cristian Morales Achiardi (Southleft), What Does AI-Readiness Mean in Design Systems. Fed I57 to I61.
- **S29.** Christoph Hellmuth, How AI-ready is your design system, and the Open Design System Bench. Fed I62 to I64, I66, I68.
- **S30.** Greg Kozakiewicz, roast-my-design-system. Fed I62, I65.
- **S31.** Sil (Into Design Systems), the figma-cli talk. Fed I67, I84.
- **S32.** Jason Chan, Start on either side, the contract keeps them in sync (LinkedIn). Fed I70, **I71**, **I72**, **I82**.
- **S33.** Florian Gampert, How to test a design system when AI writes the code. Fed I73 to I81 (**I76** open, **I77** in N3), I92.
- **S34.** Chris R Becker, The next larger context. Fed **I82**, **I83**.
- **S35.** aiko.systems, Semantic Design System Control Plane. Fed **I90**, **I91** (in N3), I92, **I93**.
- **S36.** Southleft, A Browser Can Generate Your Design System's UI Now, If You Guide It. Fed I94, **I95**.
- **S37.** Nathan Curtis, Component and Part Roles as Composites of Behavior and Accessibility. Fed I85.
- **S38.** The Specs site's generator post. Fed **I87**.
- **S39.** Pedro Rodrigues, AI Has a Design Surface Most Designers Haven't Learned to Work With Yet. Fed I86, **I89**.
- **S40.** Pedro Rodrigues, Beyond Autonomy, Architecting AI Systems That Improve Themselves. Fed **I88**.
- **S41.** Florian Gampert, how he would set up a multi-layer token system (LinkedIn, 1 October), with its comment thread. Fed **N4**, **L2 to L12**.
- **S42.** Tiff Zaporteza and Alan Weibel (Salesforce), Agents Can Mimic Good Design. Ours Know Why It Works (1 October). Fed **N3**, **K2 to K16**.
- **S43.** Shane P Williams, Every quick fix teaches the system something (Design Systems Collective, 5 October), with the posts it cites. Fed **N2**, **N3**, **N4**, **F5 to F14**.
- **S44.** Caleb Smith, Design Systems Need Curators, Not Cops (6 October). Fed **N2**, **C3 to C11**.
- **S45.** The design system team's Showroom feedback list (5 October). Fed most of the style guide, plus **O6**, **G3**, **G4**.
- **S46.** An outside review of the engine's README, in Portuguese and English (3 October). Fed **R1 to R3**.
