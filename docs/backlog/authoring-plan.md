> The plan for choosing who authors each area of the design system (Figma, the code or both), as last kept on 25 September 2026. It uses old names. figma-plugins-parity is this repository and rms-figma-code-parity.md is the engine's guide, now rms-design-system-engine.md. Only stage 0 and steps 6 and 8 are done. [BACKLOG.md](../../BACKLOG.md) holds what is open today.

# Plan. Authority per design-system area, the whole workflow follows

## Context

Today the engine assumes Figma is always right. You want the author to be a setup decision (Figma, code, or shared) and every gate and step of the workflow to follow it.

Positioning. The engine becomes a design system management engine, and today's parity is its Figma-authoritative configuration. Nothing about today's parity becomes obsolete.

Agreed with you so far.
- The author is chosen in `--init` and drives the whole workflow. Per-area overrides stay optional.
- **Single author (Figma or code) is simple.** It is today's workflow, mirrored. The spec side is the author, the other side is checked against it.
- **Shared is the real challenge.** Shared is a governance rule, not a third source of truth. Neither side overwrites the other. The tool never picks a winner. Every disagreement is listed and a person decides.
- **Matching problems are conflicts too.** When the tool cannot pair a Figma item with a code item, it lists them and the person decides.
- **Figma means the library file only.** Setup rejects a file that consumes a library.
- **The styleguide is the code capture.** It is generated from the real code and must show every DS component.
- **The code capture is the foundation.** It is built and proven first, before any authoring feature.

Guiding rule. Parity stays parity. A difference fails in every mode. With no author set, behaviour is exactly as today.

## Zero-impact guarantee (this is preparation for the future)

Today's output and behaviour must not change at all. The whole feature is dormant unless a project turns it on.

- **One switch.** Everything new runs only when `ds-config.json` has an `authority` block. No block means the engine takes today's code paths only.
- **Golden output tests first.** Before any change, record the full audit output of the test fixtures and of your figma-plugins-parity project. After every stage, a run with no `authority` block must match it byte for byte (timestamps masked). This is the proof, not a promise.
- **Gates are not rewritten.** Existing print lines, exit codes and the result JSON files (`parity-check-result.json`, `component-prop-result.json`) stay as they are. The neutral differences are written in addition, and only when the switch is on.
- **No new files in projects.** `.parity-out/differences.json`, `parity-authoring.json` and `figma-changes.json` are only created when the switch is on. (`code.snapshot.json` is written every run now, by the code capture, in the gitignored `.parity-out`.)
- **No extra authoring work.** Since step 8 the code capture runs in every audit on its own merits (it feeds Gates 3, 10, 11c and 17). It is cached by content, static only inside git hooks, and about 4 seconds of browser time after a code change on the test bed. The authoring layer itself (differences file, authority, decisions) stays dormant until the switch is on.
- **Setup is unchanged for now.** `--init` keeps today's questions. The author question and the library check appear only with `--init --authoring` until you decide the feature is ready, then they become the default.
- **Docs.** The guide gets a "Who authors the design system (preview)" section, clearly marked as opt-in. The README is not changed until release.
- **Delivery.** Built on its own branch and merged only with your go-ahead. Since the installer and `--update` pull `main`, nobody gets any of it before then.
- **Dormant code stays tested.** The new tests run with the switch on, so the preview does not rot while it waits.

## No default author after release

The engine does not favour Figma. "No setting means today's behaviour" exists only during the preview, as the safety mechanism above.

- After release the author is a **required** choice. `--init` asks it first.
- **Existing projects** are asked once, on their next interactive run, with Figma pre-selected because that is what they use today. The answer is written to `ds-config.json` so it is visible and editable.
- **CI and the pre-commit hook** never ask. Until someone answers, they keep running exactly as today and print one line saying the author has not been chosen yet.

## Changing the author later (the backup plan)

Most projects pick once at setup. The rest must be able to switch at any time, in any direction (Figma → code, code → Figma, either → shared, shared → either), safely and reversibly.

**One command.** `rms-figma-code-parity --author code` (or `figma`, `shared`). Never done silently, never done by CI.

**What the switch does, in order**
1. **Fresh capture of both sides**, so the switch starts from today's facts.
2. **Preview of what changes meaning.** Every open difference is listed with its meaning before and after ("today code is behind on radii/button. After the switch, Figma will be behind"). Nothing is written yet.
3. **The user picks how to cross over**
   - *Sync first* (recommended). Resolve the open differences under the current author, then switch with both sides equal.
   - *Switch now.* Open differences move to the new author's rules (the other side becomes behind), or become conflicts when switching to shared.
   - *Cancel.*
4. **Handover record** in `parity-authoring.json` (committed, the one file that holds both the switch history and the shared-authority decisions). Date, from, to, who, why, and the differences open at that moment. This is the audit trail and what makes the switch reversible.
5. **One-time resets.** The contract comparison and `--baseline` are re-recorded once under the new author, with a note, so the switch does not show up as hundreds of breaking changes.

**Going back.** Switching back is the same command. `--author --undo` restores the previous author and settings from the handover record.

**Decisions from shared authority are kept** when leaving it, as history. They stop applying under a single author, and come back into force if the project returns to shared.

**Leaving Figma entirely.** `--author code --retire-figma` for teams that stop using Figma. Figma comparisons stop (no failures for stale or missing Figma data), the last Figma capture is kept as an archive, and every code-only check (clean CSS, hardcoded values, accessibility, docs truth, the contracts built from code) keeps running. The coverage gate says plainly that Figma is retired. Re-adopting Figma later is `--author figma` or `--author shared` with a fresh capture.

**Hand edits are caught.** If someone changes the author directly in `ds-config.json` instead of using `--author`, the engine sees that the config and the last recorded switch disagree. In the terminal it offers to record the switch properly (with the preview). In CI it prints one warning and keeps running under the recorded author until the switch is recorded.

## The model. Sources, facts, authority, evaluation

```text
Sources (Figma, code) → Facts → Comparison → Authority → Evaluation (MATCH / DRIFT / CONFLICT)
```

Authority is applied after the facts. The engine never says "Figma is the source of truth". It says "I have a fact from Figma and a fact from code, and for this decision the configured authority is Figma".

1. **Sources.** Two, Figma and code.
   - **Figma capture** (exists). The Phase 1 snapshots of the library file.
   - **Code capture** (`code.snapshot.json`). The same facts read from code. Tokens and measured styles from the browser, props, icons, nesting and markup from the components (step 6).
   - **Other inputs are evidence for a side, never a third author.** Storybook, Code Connect, Custom Elements Manifest, docgen output and TypeScript props are code facts. Notion and GitLab guidelines are intent content only and never decide a value.
2. **Facts.** Every fact carries its source, how it was read and its confidence. An uncertain fact is a capture problem, never a parity difference.
3. **Comparison.** Neutral differences `{ area, item, figma, code, kind }` (`value`, `only-in-figma`, `only-in-code`, `unmatched-pair`) written to `.parity-out/differences.json`. The gates never know the mode.
4. **Authority.** `authority.mjs` alone gives each difference its meaning.
5. **Evaluation.** Three results.
   - **MATCH.** Both sides agree.
   - **DRIFT.** One side is behind a known authority ("code is behind", "Figma is behind").
   - **CONFLICT.** The authority is `shared` or `unresolved`, or the tool cannot pair two items. A person decides.

## Authority modes

| Mode | Meaning | A difference becomes |
|---|---|---|
| `figma` | Figma decides, code follows | DRIFT, code is behind |
| `code` | Code decides, Figma follows | DRIFT, Figma is behind |
| `shared` | Both may author. Neither overwrites the other | CONFLICT, a person decides |
| `unresolved` | No authority chosen yet | CONFLICT, labelled "authority not chosen" |
| `last-mover` | Whoever changed the fact last leads (idea I47, from `parity-agreed.json`) | DRIFT for the side that did not move; CONFLICT when both moved |

`unresolved` makes the "no author chosen yet" state visible instead of implied, so the engine never silently invents an answer. During the preview a project without an `authority` block still runs today's code paths (the zero-impact guarantee). After release a missing block reads as `unresolved` in the output, while CI keeps today's pass or fail until someone chooses.

## Config (`ds-config.json`)

One form, nested objects. The most specific key wins, then `default`.

```jsonc
"authority": {
  "default": "figma",
  "tokens": { "default": "figma", "spacing": "code", "typography": "shared" },
  "structure": "figma",
  "props": "code",
  "composition": "code",
  "markup": "code",
  "icons": "figma"
}
```

**Areas follow facts both sides can produce.** Authority only matters where Figma and code each give a value.
- `tokens`, with sub-areas by token family (color, spacing, radius, typography, motion, effects), since families are already known.
- `structure` (sizes, spacing, states), `props`, `composition` (nesting, slots), `markup`, `icons`.
- Facts only code has (behaviour, accessibility, clean CSS) and facts only Figma has (annotations, auto-layout intent) are one-way checks. They take no authority setting. Declaring one is flagged, and the coverage gate labels them one-way.
- New areas are added only when a source exists for both sides.

## Fact ownership (one area per fact)

Fine-grained overrides only work if every fact belongs to exactly one area. The rule.
- **A token's value belongs to `tokens`.** Figma `radius/m = 8` against code `--radius-m: 12px` is a token fact.
- **Which token a component uses belongs to the component area.** A button bound to `radius/m` in Figma but using `--radius-l` in code is a `structure` fact.
- **A raw value on a component (no token on one side) belongs to the component area** and is reported with the raw value named.
- So with `tokens.radius: figma` and `structure: code`, a radius difference always has one answer, never two.

## Sync is not a setting

Authority says who decides. What happens with the decision is fixed by an earlier rule. Nothing is ever written to code or Figma unless a person says so for that batch. So direction follows from authority, and the only choice is how the tool asks (`fixPrompt` in Applying changes). There is no automatic sync value, since it would break that rule.

## Making the code capture trustworthy (the foundation)

Everything code-led and shared stands on reading code correctly. Today code is read ad hoc inside each gate with text patterns. The capture gets rebuilt around four ideas.

**1. Read what the code produces, not how it is written.**
- Token values come from the browser. For each mode, the page is rendered in that mode (the emulation `rendered-check.mjs` already uses) and every CSS variable is read with `getComputedStyle`. This resolves the cascade, `@media`, imports, `var()` chains, and build output from Sass, Tailwind or CSS-in-JS, which text patterns cannot do reliably.
- Captured from the built output (`paths.plugins`) and the generated styleguide, never only from the source files.

**2. Keep the token name with every measured value.**
- The Chrome DevTools protocol (`CSS.getMatchedStylesForNode`, same connection Gate 16 uses) returns, for a measured element, which rule and which `var(--x)` produced each value, with the file and line. So a padding is recorded as `8px from var(--padding-s), button.css:42`, not just `8px`. This removes the "browser loses the token name" risk.

**3. Know exactly what was measured.**
- `styleguide-gen.mjs` stamps every rendered instance with `data-ds-component`, `data-ds-variant` and `data-ds-state`, so the capture never guesses from selectors.
- States are produced for real (attributes such as `disabled`, `aria-checked`) or forced (`:hover`, `:focus-visible`, `:active` via CDP, as Gate 16 does). A state that could not be produced is listed, never assumed.
- Fixed conditions for repeatable numbers. Fixed viewport and scale, fonts loaded (`document.fonts.ready`), animations off.

**4. Pair by declaration first, guess last.**
- Pairing order. The authored bindings in `contract.authored.json`, then Figma Code Connect files when present, then standard manifests the project already produces (Custom Elements Manifest, Storybook's index, react-docgen or vue-docgen output), then the project's own TypeScript compiler if installed (no new dependency), then the declared naming convention. Text patterns are the last resort.
- Anything still unpaired is listed for the user to decide, as agreed.

**Confidence on every fact.** Each captured fact says how it was read. *Verified* when two independent readings agree (for example the static CSS and the browser), *single source* when only one was possible, *uncertain* when they disagree. An uncertain fact is reported as a capture problem, never as a parity difference, so a reading error can never tell someone Figma or code is wrong.

**The capture checks itself.** It reports its own coverage (every DS component, every variant, every state, every mode measured, or listed as missing), and fails loudly when it captures nothing, like Gate 1 does for Figma data.

**Proven before anything relies on it (shadow mode).** The code capture is built first and run on demand with its own command (`--capture-code --compare`), never as part of a normal run, so today's audit is untouched and no slower. On a project where today's parity is green, the code capture must equal the Figma capture. Every difference there is a bug in the capture, not in the project. Your figma-plugins-parity project is the calibration target. Authoring is only built on top once the capture matches there.

**Known-answer fixtures.** Small test projects where every fact is known in advance, covering plain CSS, Sass output, Tailwind output, CSS-in-JS rendered at runtime, and themes switched by class, data attribute and media query. The capture must reproduce each one exactly.

## Setup (`--init --authoring` during the preview, `--init` after release)

1. First question. "Who authors your design system? 1 Figma, 2 Code, 3 Shared". Stored as `authority.default`. Per-area overrides are offered after, never required.
2. **Library check.** The Figma URL must be the design system library. During the first capture (Plugin API, any plan, no token) the tool checks that the file owns tokens and components of its own (local variable collections and local components exist). A file with nothing of its own is rejected with "This file uses a library. Give me the library file". A file that owns some tokens but also links another library (a brand library built on a core library) is not rejected. The tool asks the user to confirm, and allows listing more than one library file. This replaces today's "is this a consumer file" question. Existing configs keep working, with an advisory.
3. The remaining questions follow the answer (code paths first when code leads, both sets when shared).

## Single author (simple, same flow as today)

| Step | Figma leads (today) | Code leads |
|---|---|---|
| Spec | Figma capture | code capture |
| Something only on one side | missing in code | missing in Figma |
| Fix | `--fix` writes code | `--fix-figma` prepares library changes |
| Contracts, `tokens.json`, `llms.txt` | from Figma | from code |
| Wording | "code matches Figma" | "Figma matches code" |

## Applying changes (never automatic)

Rule. Nothing is ever written to code or Figma unless the user says so for that batch of changes.

- **Every run ends with a question when there is something to change.** The tool shows the list first, grouped by where the change goes (code or Figma), then asks "Apply these with the skill, or will you change them yourself?". The user can say yes to all, pick items, or decline.
- **Shared authority joins the two steps.** The user decides the winner of a conflict, then gets the same question for the resulting change.
- **Setup stores only how to ask, never permission to write.** `fixPrompt: "ask"` (default, ask every run) or `"manual"` (never ask, just list what to change). There is no "apply automatically" option.
- **CI and the pre-commit hook never ask and never write.** They only report.
- **Code changes** use the existing `--fix` path. **Figma changes** go to `.parity-out/figma-changes.json`, and the agent applies them to the library through the Figma connection only after the user's yes. v1 updates values only, keeps token links (aliases), and asks the user to save a named Figma version first. The Node engine itself never writes to Figma.

## Shared authority (the main design work)

The problem. When Figma says 4px and code says 8px, the tool cannot know which one is the intended change. So it never guesses. It gives the person the evidence and the choices.

**1. Evidence per conflict, so deciding is quick**
- Code side. When and by whom the value last changed (`git log` on the CSS line or component file).
- Figma side. The previous value and when it changed, from the committed snapshot history in git, plus the Figma file version date.
- A hint when the history makes it obvious ("code has not changed since the last run, Figma changed 2 days ago"). A hint only, never an automatic decision.

**2. The choices depend on the kind of conflict**
| Kind | Choices |
|---|---|
| Value differs | keep Figma · keep code |
| Only in Figma | add to code · remove from Figma |
| Only in code | add to Figma · remove from code |
| Unmatched pair (looks like the same thing under two names) | same thing, rename one side (which name wins) · two different things |

**3. Recording the decision** (the `decisions` section of `parity-authoring.json`, committed)
- Entry `{ area, item, kind, choice, value, by, note, date }`.
- The decision turns the conflict into a normal fix for the other side (`--fix` or `--fix-figma`). The item passes once that side is updated.
- The winning value is stored. If it changes later, the item reopens as a new conflict.
- `rms-figma-code-parity --decide` walks through open conflicts one by one with the evidence and the choices, or accepts a group (`--decide tokens "radii/*" code`). Never automatic.
- Listed in the exemption-debt block (I9/I19), so every decision shows who, when and why.

**4. Keeping the team unblocked**
- Conflicts fail the audit, like any difference. `--baseline` can accept today's open conflicts as known debt, so only new ones block commits while the team works through the list.
- Each run prints a short conflicts summary (how many open, oldest first).

## Remaining risks and mitigations

| Risk | Mitigation |
|---|---|
| Writing to Figma damages the library | Never automatic, shown first, values only in v1, token links kept, named version saved first. |
| Stale data makes one side look wrong | Fixes refused unless both captures were refreshed in that run. |
| Browser gives values, not token names | The DevTools protocol returns the rule and `var()` behind each value. Only a real raw value produces a value-only Figma change, labelled as such. |
| Sizes and states need Chrome when code leads | Without Chrome those gates say not run, never pass. |
| Figma-only facts (annotations, auto-layout) and code-only facts | Those checks stay one-way and are labelled so in the coverage gate. |
| Fine-grained areas contradict each other on one fact | Every fact has exactly one owning area (see Fact ownership). A test fails when a fact maps to zero or two areas. |
| An area is declared that no source can read | Setup and the audit reject or flag it, and the coverage gate lists it as not comparable. |
| Switching author makes every contract look changed | The first run after a switch resets the contract comparison once, with a note. |
| Half-finished stages | Unconverted gates are listed as Figma-led only in the coverage gate. |
| The plan grows too big (many commands and files) | Few surfaces on purpose. One committed file (`parity-authoring.json`), three commands (`--author`, `--decide`, `--fix-figma`). Stages 3 to 5 are only started after stages 1 and 2 have been used on a real project. |
| A future gate forgets the neutral shape | A shared helper writes it, and a test fails when a gate in a switchable area does not use it. |
| Regressions for current users | All 333 existing tests plus a check that a run with no author set prints identical output. |

## Build order

0. **Trustworthy code capture, in shadow mode.** Browser-based token and style reading with token names and source lines, stamped styleguide instances, declaration-first pairing, confidence per fact, self-coverage, known-answer fixtures. Run on demand only (`--capture-code --compare`) and calibrated on figma-plugins-parity until it matches the Figma capture on a green project. Nothing else starts before this passes.
1. **Foundation and tokens.** `authority.mjs`, the setup question, the library check, the neutral differences file, tokens in Figma-led and code-led modes (Gates 3, 4, 5, 7), `--fix-figma` for token values.
2. **Shared authority and switching, for tokens.** Evidence (git + snapshot history), the conflict choices, `parity-authoring.json`, `--decide`, reopening, the conflicts summary. `--author` with preview, sync-first / switch-now, `parity-authoring.json`, `--undo`, one-time resets, and `--retire-figma`.
3. **Static code capture.** Props, icons, composition, motion, effects (Gates 11b, 11c, 11d, 14, 18, 19) in all three modes.
4. **Rendered code capture.** Sizes and states on the styleguide (Gates 10, 11), plus the "every component is in the styleguide" check.
5. **Markup, screenshot, outputs, docs.** Gates 12, 13, 2. Contracts, `tokens.json`, `llms.txt` and fix citations follow the author. A "Who authors the design system" section at the top of `rms-figma-code-parity.md`, a plain paragraph in `README.md`, I38 in `PARITY-IDEAS.md`.

Each stage is tried on your project before the next.

## Reused pieces

`mode-resolver.mjs` `buildResolver`, parsers in `component-prop-check.mjs` and `icon-check.mjs`, `styleguide-gen.mjs` + CDP in `rendered-check.mjs`, `html-structure-check.mjs` fingerprint, the setup flow in `audit.mjs` (`--init`, around the consumer question), `naming-convention.mjs` (pairing), `exemption-check.mjs` (validating a committed list), `baseline.mjs`, the I9/I19 block in `audit.mjs`.

## Verification

- Unit tests for `authority.mjs` (each mode, including `unresolved`, × each kind × decided / reopened / group decision), the precedence rule (most specific key wins) and fact ownership (every fact has exactly one area).
- Library check tests (local collections pass, a mostly-remote file is rejected with the message).
- Fixture tests per stage. The same captures give DRIFT with "code behind" when Figma leads, DRIFT with "Figma behind" when code leads, and a CONFLICT with evidence and choices under shared authority that passes only after a decision and the other side being updated.
- `--fix-figma` tests (aliases kept, refused on stale data). `--fix` refuses Figma-behind items.
- All existing tests pass, and the golden output tests prove a run with no `authority` block is byte-identical to today (fixtures and figma-plugins-parity).
- A check that no new file appears in a project when the switch is off.
- Switching tests. Every direction (figma ↔ code ↔ shared, and out of unresolved) shows the correct before/after meaning, writes the handover record, resets contracts and baseline once, and `--undo` restores the previous state exactly. `--retire-figma` stops Figma comparisons without failing and keeps code-only checks running.
- A live run on the private test bed in all modes after each stage.

## Status

- Stage 0 in progress. Browser token reading, rule tracing with token names and source lines, forced states, confidence per fact, self-coverage, known-answer fixtures and `--capture-code --compare` are merged. Calibration on the private test bed gives 316 of 316 tokens matching and 144 component facts matching, with 7 real differences left.
- Steps 6 and 8 done. The capture reads props (Custom Elements Manifest, docgen, TypeScript, text; Storybook and Code Connect for pairing), icons, markup and nesting, and builds the styleguide itself. Every gate that reads code uses the shared readers; Gates 3, 10, 11c and 17 also read the snapshot. The catalog for UI generators and `--check-ui` are in.
