> The engine's full ideas list with its sources, as last kept on 4 October 2026. It names the engine by its old name, rms-figma-code-parity, now rms-design-system-engine. Statuses here are older than [BACKLOG.md](../../BACKLOG.md), which holds what is open today.

# Parity Improvement Backlog

A living, appendable record of ideas to improve `rms-figma-code-parity`, distilled from
external analyses of design systems and of how AI agents consume them. New analyses get
appended to "Sources analyzed"; new ideas become entries in the Backlog.

North star (keep every idea honest against these):

- **Mechanical verification first.** The 23 gates are the trustworthy tier. Do not add a
  feature that asks a model whether something "looks like" the DS when the system can just
  check whether it *is*.
- **Keep the surface small.** Everything an agent reads costs context. Every authored field
  is data someone must keep current, and stale authored metadata is worse than none because
  it misleads the agent. Only add a field you will actually maintain.
- **Humans own the gates; agents work between them.**
- **Explicit, testable rules beat suggestions.** Reference tokens, never raw values.
- **Rules first, then show before applying.** (S5) Seed the conventions before the agent needs
  them, and show what will change before it changes. The parity already embodies this: it reports
  the verdict and only writes to code with an explicit `--fix`.
- **No imposed structure.** (proven on this DS) The parity is agnostic to a DS's token/tier
  architecture: never assume tiers (primitive / semantic / component), never require aliasing,
  never assume primitives are mode-less. Any structural rule is **descriptive** or **declared by
  the project**, never imposed. A rigid tier model false-positived here (113 tokens reference a
  primitive directly, 13 primitives vary by mode: both valid architecture, not debt).
- **Structure over vocabulary.** (S13) Where the project DOES declare a structure, check aliasing,
  not naming. Names are an advisory at most.
- **Split on independence, not on difference.** (S5) Two tokens deserve to be separate only when
  they could plausibly change independently, never just because their current values differ.
- **The parity is the "can it" leg; it never owns governance.** (S9) It verifies mechanical
  readiness and can SURFACE signals for "should it" (guidance, contrast, a11y) and "may it" (the
  blast radius of a change, shared vs local), but authority, accountability and escalation are
  people and process, never encoded into the engine.

## What the parity already covers (do not re-invent)

> **External validation (S16–S20):** the parity already IS what the literature calls **"the diagnostic
> layer"** (TJ Pitre / zeroheight) and **"the mechanical eval tier"** (Murphy Trueman, Sanity, Southleft) —
> tokens as DTCG + component contracts as JSON + gates that validate designed-vs-built. Most of the
> DS-eval writing is confirmation, not new work; the new angles are I23–I26.

- **23 mechanical gates** = the "mechanical eval" tier (structure, token binding, states,
  markup, icons, rendered styles, coverage).
- **Token vs literal enforcement** (a hardcoded value that contradicts Figma fails).
- **State coverage** gate.
- **`llms.txt` index** ("where to look before guessing").
- **Contracts** (per-component spec: props, anatomy, states, variants, tokens by reference).
- **Design-intent** (the *why*: Figma annotations + component descriptions + code notes +
  your prose + usage).
- **Change detection**: breaking vs additive contract changes, newly deprecated tokens,
  undefined token references.

## Sources analyzed

| # | Source | Key takeaway |
|---|--------|--------------|
| S1 | Southleft, "Design systems are a collection of decisions" (TJ Pitre) | Three eval tiers (mechanical / judgment / visual). Mechanical is the only fully trustworthy one. "Agents do the work between the gates, humans own the gates." |
| S2 | Ness Grixti, Wise multi-brand design system | Layered token hierarchy (primitives to semantic to brand). Reference base tokens in higher layers, do not duplicate. Shared tokens combined, only differences split out. |
| S3 | Florian Gampert, "What an agent needs from your design system" | Explicit testable rules over suggestions; complete state coverage incl. edge cases; relationship mapping (compose / never-combine / shares-state); non-purpose and alternatives; constraint-based slots; accessibility per state; boundary declaration; token usage over raw values; keep libraries small. |
| S4 | Southleft, "Machine-readable design tokens for AI-ready component libraries" | Three-tier tokens (primitive / semantic / component); role-based naming over appearance; token metadata carries intended usage, restrictions and allowed background pairings with a11y context; every token traceable to a value; track adoption (Figma vs production). |
| S5 | Sophia Hee, "Zero to One: a token system from a file with zero color naming" (designsystemscollective) | Three layers, each its OWN collection: Primitive (raw, components never reference it), Semantic (named `category/role-emphasis`: category in background/border/text/icon, emphasis in default/bold/subtle/muted, never state words), Component (often-changed components + deliberate exceptions that point straight at Primitive). Modes live only on the Semantic collection (Primitive is mode-less, Component follows) so the token count stays sane. Split brand tokens from component tokens even at the same Primitive. Split rule: "could these change INDEPENDENTLY?", never "do the hex values differ?" (splitting on differing hex is what makes the mess). Process: give the agent the rules before it needs them; make it show the table before it applies. |
| S6 | Lea Verou, "Dark mode toggles (2)" | UX pattern, low parity relevance: two-state toggle (system / opposite), respect the OS default, hide the internal 3-state model from the UI. |
| S7 | Southleft, "Claude Design is not a design systems tool" (TJ Pitre) | PARTIAL (paywall). Framing only: Claude Design is a design tool, not a design system; the DS stays the authority AI conforms to. |
| S8 | zeroheight, Design System Maturity model | Four stages (V1 / Growing / Teenage / Healthy) across six axes: Foundations, Documentation, Governance, Adoption, Measurement, and AI Readiness (DS as the default AI context; measured by AI integration and bypass rate). |
| S9 | Pegah Ahmadi, "A Design System Isn't AI-Ready Until Its Decisions Are Legible" | Production readiness (can an agent use it) vs governance readiness (can AI act without weakening decision integrity). A decision is LEGIBLE when a non-participant sees what / why / where it applies / who has authority / what would justify changing it. "Can it? / Should it? / May it?" = execution / judgment / authority. Distinguish an intentional rule from a temporary workaround, an approved exception from an extendable precedent. Source of TRUTH (what exists, generate from code) vs source of AUTHORITY (why it is binding, who may change it). Blast radius: changing a shared contract is authorship, not consumption. One home per truth; duplicated lists drift into hallucination. Human-authored authority with bounded, traceable, escalating execution. Most of this is people + process, NOT the engine. |
| S10 | Polar, "Orbit: an LLM-safe design system" | Intent-based token names (background-card, not bg-gray-100); tokens as the only vocabulary; CI as enforcement, not docs; ban raw containers (typed Box with `as`); embed light+dark in one token (light-dark()); treat every escape-hatch / exemption as a DS bug (a missing token), not an exception; expand tokens reactively. |
| S11 | Brad Frost, `ds-inspection` skill | Inspection "stations": Coverage, Best Practices, Accessibility, Shared Language, Testing, Orchestration (composition / slots / dependency hygiene), Governance, Feedback, Machine-Readable Docs (schema completeness: props/slots/events/examples), Agent Access (tool bridges). Evidence hierarchy (live bridge > export > screenshot > interview). R/Y/G + N/I scoring. Cite evidence, tag [verified]/[reported], scope claims strictly, never invent. |
| S12 | Brad Frost, `product-inspection` skill | 10 stations incl. DS Adoption (product matches DS versions; flag one-off CSS overrides that bypass the system; compare DOM to specs). CI gates enforcing a11y/perf/adoption lint, re-runnable. Same evidence tagging + R/Y/G scoring + prioritized work order. |
| S13 | Brad Frost, `ds-token-architecture` skill | Three tiers (definitions / usage / components). Resolve references from source config, not compiled output. Structure matters, vocabulary does not. Second theme as remap (all Tier-2 are aliases: safe) vs rewrite (Tier-2 holds raw hex: risky) — count raw values in the semantic tier. Compute real contrast ratios per theme (names like "on-brand" are assertions). Opacity/layout/sizing/data-viz fall outside the core 3-tier model. |
| S14 | Atlassian, "Giving AI agents design system context from the terminal (building a CLI)" | One generated dataset from typed schemas beside the code (component APIs, tokens, icons, a11y guidance, lint rules); JSON + human output with "next step" command hints and batch queries. "One source of truth, three entry points" (skill / MCP / CLI) over shared modules kept separate from the agent interfaces. Their CLI beat MCP on reach, tokens and speed. Judge the whole task, not the payload; read the transcripts. Notably NO design-code validation, which is exactly this parity's niche. |
| S15 | Shreyasi Dutta, "Design Systems as Governance, Not Just Component Libraries" | A DS is a decision framework (who may change what, when), not a UI kit (Nathan Curtis). Adoption order: audit, prove one shared component saves time, then lightweight rules ("make a thing, show it useful, make it official", Brad Frost). Tokens in code, one value referenced everywhere. Reinforces the North star: governance is people + process; the engine only SURFACES drift evidence, never owns authority. Maps to I9 / I12 / I20 / I21; nothing new to build. |
| S16 | Sanity, "Design system evals" | Measure agent build-success / zero-fix / iterations / a11y-violations / tokens; structured JSON docs over markdown; per-component "chunks" (code snippets) + "use-cases" (recommended vs discouraged = whenNotToUse/useInstead); agent docs separate from human; "more isn't better — better is better" (keep it lean); a docs flywheel (consume → feedback → refine → re-test). |
| S17 | Murphy Trueman, "Design systems need evals" | You taught agents your DS but can't see if they follow it. Mechanical checks (props vs real API, values resolved to tokens not hardcoded, components used from the library not hand-rolled, a11y structure) + LLM-as-judge (right component for intent, empty/error states, safe patterns). Real-team underspecified prompts; run in CI, multiple times. This is exactly the parity's mechanical tier. |
| S18 | thedesignsystem.guide, "AI evals for design systems" | Output-focused vs outcome-focused evals; DS health / adoption metrics (% of UI built with DS components, mature 60–75%). Mostly organizational (out of scope, like S9) except the adoption %. |
| S19 | zeroheight / TJ Pitre, "The future of design systems, part 3: the diagnostic layer" | The parity IS this: a layer between design and code that watches for drift and validates that what was designed matches what was built (tokens as DTCG + component contracts as JSON, readable by human/dev/AI). Two directions: design→code (the parity does) AND **code→design** (almost nobody: props/variants added in code must flow back to design). Also audit the **Figma file itself** for AI-readiness (detached instances, missing auto-layout, un-tokenized values, absent metadata). |
| S20 | designsystemdocspec.org (DSDS) | A standard machine-readable DS doc schema. Component: `sourceFiles / specs / traits / combos / imports / sections`; token: `source` (a pointer, not restated); sections carry **`for: human | agent | all`** + kinds guidelines/definitions/steps + a11y + do/don't + state variations. Philosophy: "if another format owns a fact, point at it, don't restate" + interop with DTCG / CEM / Storybook CSF — the parity's exact ethos. |
| S21 | Andrew Branch, "We moved our design system out of Figma" | The DS source of truth should move OUT of Figma into a **governed repository of durable, open, machine-readable artifacts** (tokens + component contracts + machine-readable guidance + validation rules), "one layer lower than authoring tools". Figma, Storybook, Claude Design, AI agents all become **consumers** of that layer, none owns it. Governance (token compliance, a11y, contracts, CI guardrails, publishing) attaches to the source layer, independent of how a contribution entered. **Confirmation, not new build:** the parity already EMITS this layer (DTCG tokens + `*.contract.json` + `llms.txt` + design-intent). It is the philosophical case for the deferred **bidirectional / code-first** direction and for **I24** (code→design drift) as its first step; the parity keeps Figma as source-of-truth for now by choice (North star), so S21 reinforces direction, it does not flip it. |
| S16+ | Sanity "Design system evals" (re-read, deeper) | Concrete eval metrics beyond the I7 v1 set: **inline-styles count**, **responsive coverage %**, **completion time**, **token spend**, **fixes-per-iteration**. Harness: **N identical agents per prompt**, compare across models, 3–5 runs for signal / 10+ for definitive, **disable assist tools to isolate docs**. Docs: JSON-schema > markdown, `use-cases` (recommended/discouraged), `alternatives` (= whenNotToUse/useInstead, shipped I1), **chunks** (code snippets = usage scaffold, shipped I26), must/optional blocks, lint rules. → folds into I27 below. |
| S24 | Vadym Zaitsev, "AI Is the New User of Your Design System" (+ comment thread) | **AI is the third user** of the DS, alongside designers and developers, and it consumes the DS as a *product knowledge base*, not a picture. The DS matures Tokens → Components → **Patterns → Rules → AI context**; each component needs more than variants/states — **when to use / when not to use / behavior / relationships / accessibility** (= shipped I1 + I2 + I18 + contract states). The shift is **Generation → Composition**: a good agent first checks what already exists and composes from it, so the DS becomes a **validation layer BEFORE anything is generated** (= the parity's whole thesis; the judgment-eval I7). **The comment thread is the sharp part:** Roman Ovcharenko — "I never deleted the old alternatives, so an agent reading it today would find **two right answers and no note saying which one won**"; Vadym — the knowledge layer needs a **decision history: what is current, deprecated, experimental, and why**; Roman again — "**Status is the easy half** (a field: current/deprecated/experimental). **The *why*** is the part that lived in a call nobody wrote down, and that's the field an agent actually needs." André Duarte — the productive first agent session was **scaffolding, not screens**: rules + tokens + decisions log the agent must **check against first**. **Mostly confirmation** (validates I1/I2/I7/I18 and the design-intent "why" layer); **one genuinely new angle → I33** below (per-component decision status + the *why*, so an agent never finds two right answers). |
| S25 | Nathan Curtis, "Generating Code from Specs" (2026-09-24, pasted in full; the site is blocked here) + "What Component Specs Leave Behind" | A scripted code factory generates a prototyping kit (React / web components: `scaffold`, `contract.ts`, `styles.css`, `stories`) from expressive specs in seconds; no model needed. Burndown per library against Figma images with a QA skill trio (start / fix / end). Governing rule **"contract, not catalog"**: key off what the spec declares, never one library's quirks. Specs grew three cheap, high-value concepts: **states** (a map from a DS's own props like `isDisabled` or `state=pressed` to shared concepts, which drives guarded CSS such as `:hover:not(:disabled)` and precedence), **roles** (`role:togglebutton` on an anatomy layer means a native control, the ARIA wiring between parts and the event handlers), and **promoted primitives** (a table from Figma text style + fill + sizing to a system component with props, so a styled raw layer becomes `<Text size color>`). Companion post: specs lose information (hex instead of the bound token, a missing maxWidth, background or layer presence that changes when props interact, a decorative icon shown as customizable, padding that varies with size and content). **The parity checks rather than generates**, so the generator itself stays out of scope; the concepts become I38 to I46 below. |
| S26 | TJ Pitre (Southleft), "The Source of Truth Is a Ping-Pong Ball" (pasted in full; the site is blocked here), responding to Tony Ward's "Code as the Source of Truth", + Southleft's open repo `southleft/ds-contracts-poc` (README, `docs/06-parity-loop.md`, `docs/16-sync-boundary.md`, `docs/07-validation.md`, `MILESTONES.md`) | **Article.** The source of truth is not a place; it moves between Figma and code "like a ping-pong ball" and lands where it holds up in the product. Handoffs lose fidelity because communication breaks first. With a skewed team ratio (ten engineers to one designer) the source "gets defaulted into", not chosen. What matters is that the workflow fits the real team, context survives the handoff, and a subject-matter expert verifies each step. AI makes switching cheap, so a fixed answer stops being useful. **Repo (the mechanics).** A three-way diff, never side to side: each surface against the shared contract, so every difference is classified **ahead** (a proposed contract patch, promoted by a human), **behind** (regenerate that surface) or **mismatch**. Promotion must **converge instead of ping-ponging** (an eval class). **Pending** (never synced) is workflow state, not drift. Refusals are named in a sidecar, never silent; a whole-kit census keeps "clean" from being confused with "pixel-right". Finding-level acknowledged-drift baseline with ratcheting. Visual parity with a text-masked second score and a worst-first fix queue. Figma's default variant is positional (top-left). A sharded catalog index (about 4K tokens instead of 19K). The contract never carries behaviour (hooks, handlers): the sync surface is what a canvas can express. **The parity checks rather than generates**; ideas I47 to I54 below, plus notes on I43. |

| S27 | Shane P Williams interviewing Cristian Morales Achiardi (Southleft), "You don't fix the output, you fix the system" (designsystemscollective, pasted in full; the site is blocked here) | **Decision → contract → artifacts.** A contract is deterministic (a Nathan Curtis spec, a DTCG token file, a schema): attributes and values that can be validated, audited and enforced. The library, the Figma surface and the docs are all artifacts of the same pipeline, so docs generated from the machinery do not drift; "you don't fix the output, you fix the system". Donella Meadows: a system's purpose is what it produces (low adoption and governance friction ARE its purpose, whatever the roadmap says). **Agents:** better models made heavy harnesses unnecessary; separation of concerns plus progressive disclosure (clear paths to information) matter most; "I ran tests where the agents scored better going bare vs with skills", extra context can confuse or hide truths. How much a system can flag depends on the validation gates built, and designers easily miss them. **Props do not converge like tokens:** every framework names them differently; the stable abstraction is a prop's intent (behaviour, states, variants), so he is building a translation layer. "Guidelines held in whatever.md prose files don't survive; clean infrastructure beats excessive harnesses." Confirms I56 and the cookbook; new: I58 (prop intent), I61 (bare variant). |
| S28 | Cristian Morales Achiardi (Southleft), "What Does AI-Readiness Mean in Design Systems?" (pasted in full; the site is blocked here), with Christoph Hellmuth's Open Design System Bench | **Method.** A plug-in benchmark: a headless coding agent gets 10 intent-level tasks in a throwaway app, at 3 context levels (bare, AGENTS.md, skill) × 3 repetitions = 90 graded generations on six axes: imports 10%, API fidelity 25%, token discipline 15%, a11y static 10%, compile 10%, judgment 30%. Two dimensions: **repository readiness** (can an agent navigate the DS repo and do design tasks) and **consumption readiness** (does it use the DS right through MCP, CLI or docs). **Findings.** Bare runs scored higher on the mechanical axes in both systems tested (mean 95.5 bare, 93.0 AGENTS.md, 94.2 skill; compile 90.0 / 70.0 / 76.7; hard failures 3 / 9 / 7 of 30). Prose steering files (AGENTS.md, llms.txt, skills) hardcode what should be discovered (component and token lists), go stale, and hold ghost tokens a generating agent hallucinated: **one wrong word (`error` listed as a status tone, the library's canon is `danger`) caused 10 of 19 hard failures, 0 of them in bare runs.** Cutting AGENTS.md by 90% first dropped the score (a prop list was lost); pointing the file at the auto-generated contract and deriving the vocabulary from the prop catalog restored it, with 41% fewer tokens and 22% less time; 147 curated **rejected names** now reach the machine-readable contract (0 before). "One truth in one place, everything else redirects to it, working as an index." **Judgment is different:** one task scored 100 on all mechanical axes and 30 on judgment three times (a password field whose input had no slot for the show/hide button, so agents built their own): "a missing API is not a documentation gap, the fix lives in the component". Skills should carry design language and principles, not lists of answers (Vercel DESIGN.md), and only evals can tell. New: I57, I58, I59, I60. |
| S29 | Christoph Hellmuth, "How AI-ready is your design system?" (Into Design Systems, 2026-09-29, live) and github.com/christophhdesign/open-design-system-bench | **Two rules.** Gate on the worst dimension; count avoidance as failure (an agent that hand-rolls everything passes every API check: "the worst outcome, and it looks clean"). **Field evidence.** 0 of 113 cells used the system with no guidance; an AGENTS.md that said what not to use: 16 of 57; the same plus one sentence "the package is installed": 43 of 55. Only 10 of 55 guided cells compiled against the published types (`direction="column"` where the prop takes vertical or horizontal, strings into number props, icon names outside the registry); their own docs taught two of the traps (a helper and a component that do not exist). Static audit: enablement surface (llms.txt over context budget, docs older than the newest component change), catalog quality, export hygiene, vocabulary distance, token machine-readability, deprecation legibility, docs greppability. Harness: a prompt-leak linter (a task prompt must not name the expected component; the answer lives in hiddenExpectations), smoke/small/medium/full profiles, `ci --freeze` (exit 1 on a 5 point drop). New: I62, I63, I64, I66, I68. |
| S30 | Greg Kozakiewicz, roast-my-design-system 9.2 (npm README) | Deterministic scanner, 0 to 100 against 112 public repos. **Evidence (259 headless Claude Code sessions, Sonnet 5 and Haiku 4.5):** routine work stays on-system, invention drifts where the repo has no answer (a repo with no chart palette: Haiku hardcoded 9 more colours). Rules plus MCP did nothing for Haiku (it never called the MCP; 25 → 39 findings), an **edit hook that checks every edit** took it to 0 in 14 of 15 runs and 3 in 51. Metrics: distinct colours, near-identical colour pairs, off-scale spacing and radii, arbitrary Tailwind values, inline styles, !important, duplicated components, never-imported components. "The mess an agent adds is a map of the gaps in your system." New: I62, I65. |
| S31 | Sil (Into Design Systems), figma-cli talk, same session (github.com/silships/figma-cli) | Figma MCP rate limits: Professional Full or Dev seat 200 tool calls a day and 10 a minute; View and Collab 6 a month; Starter 20 a month (developers.figma.com, Rate limits). figma-cli avoids them by driving Figma Desktop locally (a patch, a plugin or a browser session), and adds deterministic snapshot tests, YAML component contracts, token-binding checks. Not adopted as a path: it can write to Figma and patches the app. New: I67. |
| S32 | Jason Chan (head of design, ex-Quora/Poe), LinkedIn post 2026-09-24 with the diagram "Start on either side. The contract keeps them in sync." (pasted) | Either side can hold the canonical component: whichever was changed last. Two files in the repo bridge them: a component map (Figma component to code view, with its description) and a snapshot of the library's components with when each was last published. A script flags a code component with no match and a Figma component published after the snapshot. **Commit warns, push blocks**, and a push halts only when the code already calls what changed (a new variant not yet in the product is a warning). A code-first component gets a follow-up: build it in Figma so the match is recorded. Tokens.json generates the platform theme (Swift). |
| S33 | Florian Gampert, "How to test a design system when AI writes the code" (2026-09-28, pasted) | The library tests its components; each app tests that it uses them. Tokens tested built (names, every theme complete, contrast from written pairs). App lint fails on a hex or pixel value, Tailwind brackets, the old library and deep imports, a plain button/input/dialog, a clickable div; each error says the fix; exceptions in one file with a reason and an owner. Types reject made-up options, an icon button without a label. Screenshots per state with noise control. Accessibility set to fail, split between library and app; keyboard tests (Escape closes, focus returns). Only deterministic checks block a merge. One command in the agent's loop, a line in AGENTS.md to run it before saying it is done. **The agent finds ways round the checks**: block disabling lint in a comment, ignoring type errors, updating pictures. Re-run agent tasks whenever the components, docs, agent file or model change. |
| S34 | Chris R Becker, "The next larger context" (uxdesign.cc, 2026-09-28, pasted) | Saarinen: design a thing in its next larger context (a chair in a room, a room in a house). AI can render a known thing from its rules, but not know why it is needed or how it serves its surroundings; whether a new thing is needed stays the designer's call. AI hallucinates when its context is thin, so designers design the context it works in. Mostly reflection; two engine ideas: a component's next larger context (where it is used), and a new component is a decision. |
| S35 | aiko.systems, Semantic Design System Control Plane (site pasted, fetch blocked) | One canonical graph of the system built from Figma, code, docs, tokens, ADRs and PRs; each surface (React, Angular, SwiftUI, Web Components, Figma, Storybook, docs, DTCG, CSS) is a projection of it. An agent gets a task-sized contract for one component (behaviours, states, resources, evidence) instead of the whole system. Drift is shown with the source that proves it; a snapshot headline gives contracts passing, drifting and not checked. New: I90-I93. |
| S36 | Southleft, "A Browser Can Generate Your Design System's UI Now, If You Guide It" (pasted 2026-09-24; logged late, it fed the catalog and `--check-ui` the same day without a reply) | A 2 GB model in Chrome composes UI from a sentence using A2UI: the catalog is the model's whole vocabulary, it never writes HTML or CSS. Docs and a schema get it close; a third layer makes it usable: a written definition of valid output, a deterministic prompt-blind checker on every generation, a failure policy (interpret first, validate last, ask again only when nothing renders) and a log whose count is the quality score. A forgiving reader that only reattaches what the model emitted, kept separate from the strict validator, with a switch. Small models read aligned tables better than JSON Schema. Fine-tuning on repaired logs took valid first tries from 4 to 50 of 58. New: I94, I95. |

_Append future analyses here as new rows, then add any new ideas to the Backlog below.
All 20 sources folded in (S5, S9 and S15 were pasted in full after the paywall blocked the fetch;
S16–S20 are the design-system-evals / diagnostic-layer batch)._

---

## Backlog

Each entry: what it is, why (source), which parity artifact it touches, value, cost, status,
and concrete implementation notes.

### NOW (approved to implement)

#### I1. `whenNotToUse` / `useInstead`  ·  source S3  ·  value: high  ·  cost: low
**What.** Two optional authored fields per component: when NOT to reach for it, and what to
use instead.
**Why.** An agent picks the wrong component without this. It is the cheapest, most direct
lever against hallucinating the wrong choice. Complements design-intent ("the why").
**Artifacts.** `contract.authored.json` (new optional fields) -> emitted into each
`<Component>.contract.json` and surfaced in `llms.txt` and `design-intent.json`.
**Implementation notes.**
- Read `a.whenNotToUse` (string) and `a.useInstead` (string or string[]) from the authored
  entry in `buildContract()` (contract-gen.mjs). Emit only when present (additive).
- Extend `CONTRACT_SCHEMA` with optional `whenNotToUse` / `useInstead`.
- Extend `lintAuthored()` with shape checks (string / string[]).
- In `buildLlms()`, append a short "avoid: ... use instead: ..." note under the component line.
- In intent-gen.mjs, add both to each component entry (they are "the why").
- Update the authored scaffold `_note` to mention the two fields.
**Status.** IMPLEMENTED 2026-09-20 (contract-gen.mjs + intent-gen.mjs + schema + lint + llms.txt).
Awaiting per-component authored data to start emitting; 212 tests pass, all gates green.

#### I2. Relationship index (light)  ·  source S3  ·  value: high  ·  cost: medium
**What.** Per component: `composesWith` (what it nests) and `neverCombineWith` (authored,
only where a real invalid pairing exists).
**Why.** Gampert: "which compose, which never combine" usually lives only in someone's head.
Gives the agent composition rules so it does not assemble invalid trees.
**Artifacts.** `component-composition.snapshot.json` (already captured) -> `relationships`
block in each contract + a note in `llms.txt`. `neverCombineWith` authored in
`contract.authored.json`.
**Implementation notes.**
- Composition snapshot shape is `{ "<Component>": ["Child1", "Child2", ...] }` (children are
  component names or icon ids). Load it via a new `cfg.paths.compositionSnapshot`
  (default `component-composition.snapshot.json`).
- `composesWith` = the distinct child *component* names (filter out icon ids / `.selectors`).
- `neverCombineWith` = `a.neverCombineWith` (string[]), authored, emitted only when present.
- Emit `out.relationships = { composesWith, neverCombineWith }` only when non-empty.
- Surface in `llms.txt`: "composes: A, B, C" and, when set, "never with: X".
- Do NOT author relationships you will not maintain; `composesWith` is free (derived),
  `neverCombineWith` is opt-in per real case.
**Status.** IMPLEMENTED 2026-09-20 (contract-gen.mjs: `relationships.composesWith` derived from
the composition snapshot, `neverCombineWith` authored; surfaced in llms.txt). Verified: llms.txt
shows "composes: buttonPrimary, buttonSecondary" etc.; icons correctly excluded.

### NEXT (cheap, do when there is appetite)

#### I5. Emit slot constraints  ·  source S3  ·  value: medium  ·  cost: low
**What.** Surface what each slot accepts and its nesting depth into the contract (the parity
already *validates* slots via the slot gates; this *emits* the constraints for the agent).
**Artifacts.** slot gates / structure-contract -> `anatomy`/`slots` in the contract + `llms.txt`.
**Status.** IMPLEMENTED 2026-09-22 (contract-gen.mjs `buildContract`). Emits a `slots` array on each
contract: every Figma INSTANCE_SWAP prop (or a prop the contract binds to a code slot) becomes a slot
with { name, default, code?, accepts } - `accepts` = the component's own composesWith universe (what it
really nests), so an agent has the valid set without guessing. Derived from the contract's own props +
relationships; emitted only when there are slots. +1 test.

#### I8. Prune report  ·  source S3  ·  value: medium  ·  cost: low
**What.** A report of unused variants, deprecated components, and single-use props, so the
library stays lean ("everything it reads costs context").
**Why.** Smaller libraries = cheaper, less error-prone agent context.
**Artifacts.** Reuse coverage (Gate 21) + contract change detection (deprecations). Emit an
advisory "prune candidates" list; never fail the audit.
**Status.** IMPLEMENTED (`prune-check.mjs` + audit advisory, `--prune` lists them). Since I33 it also counts
components whose `status` is deprecated, and tokens whose `$deprecated` is an explanation string.

#### I9. Exemptions-as-debt report  ·  sources S10, S12  ·  value: high  ·  cost: low
**What.** Treat every exemption / escape-hatch (`knownHardcodedExceptions`,
`knownScreenElementExemptions`, `knownPhantomBorderExceptions`, `knownStateExemptions`, ...) as
a signal of a *missing token or a gap*, not a silent pass. Emit a "debt" list each run: how many
exemptions exist, which components, and a one-line reason to review.
**Why.** Orbit (S10): each bypass is a DS bug, not a discipline failure. Brad Frost (S12): flag
one-off overrides that bypass the system. Today exemptions pass silently; surfacing them as debt
keeps them honest and trending down.
**Artifacts.** Read the exemption lists already in `ds-config.json`; emit an advisory count +
list in the chat report (never fails the audit).
**Status.** IMPLEMENTED 2026-09-20 (audit.mjs). Agnostic: any ds-config key matching
`/exempt|exception/i` holding an array. Quiet by default (a totals line: "Exemption debt: 66
bypasses across 3 lists"), full listing with `--exemption-debt`. Never affects pass/fail.

#### I10. Token-layering profile (agnostic; the rejected tier check, redesigned)  ·  sources S13, S5 (bounded by No-imposed-structure)  ·  value: medium  ·  cost: medium
**What.** The first design (semantic-must-alias / modes-on-semantic-only / components-must-go-
through-semantic) is **REJECTED**: it imposed a tier model the engine must never assume. It
false-positived on this DS (113 of 158 color tokens reference a primitive directly, 13 primitives
vary by mode: both valid architecture, not debt). Two agnostic replacements:
- **(a) Descriptive profile** - surface the structure with no judgment: how many tokens hold a
  raw value (reference nothing) vs alias, and the reference-chain depth. Flags only the genuinely
  raw tokens (2-3 here) for a human to review. Imposes nothing.
- **(b) Project-declared tiers** - validate a structure ONLY when the project declares it in
  ds-config.json (e.g. `tiers: [{name, match}]` or by collection). Rules come from the DS. Zero
  config = does not run.
**Why.** S13/S5 value tiering, but the North star's No-imposed-structure principle wins.
**Artifacts.** vars snapshot + alias map; emit a descriptive profile and/or validate declared tiers.
**Status.** Form (a) IMPLEMENTED 2026-09-20 (audit.mjs "token layering" advisory): measures the DS's
OWN aliasing rate and, when references are its norm (>=80%), surfaces the raw-value outliers (3 here:
figmaWindowChrome/background, overlay/color, figmaWindowChrome/divider); a non-aliasing DS is flagged
nothing. Never affects pass/fail. Form (b) IMPLEMENTED 2026-09-22 (`tier-check.mjs` + audit advisory): runs
ONLY when `ds-config.json → tiers: [{name, match, mayReference?}]` is declared; classifies each token by
the project's own regexes and flags a token that aliases a tier its `mayReference` disallows; advisory,
never imposes, zero config = no-op; +3 tests. The imposed version
is never shipped.

#### I11. Evidence-honesty conventions  ·  sources S11, S12  ·  value: medium  ·  cost: low
**What.** Adopt the inspection-skill discipline in the chat report: tag findings `[verified]`
(directly checked) vs `[reported]`, scope claims strictly ("checked 34 of 36 components"), and
never invent. The parity already knows what it checked (Gate 23 coverage); this makes the wording
consistently honest.
**Why.** S11/S12: cite evidence, tag it, scope it, never fill space with invention. Matches the
parity's existing honesty ethos.
**Artifacts.** Report wording only; drive off the coverage gate.
**Status.** IMPLEMENTED 2026-09-22 (audit.mjs honesty legend after the gate summary): a `[verified]`
line (the N gates are mechanically checked, scoped to "checked X of Y DS components" parsed from the
coverage gate's `MODELLED X/Y`) and a `[reported]` line naming the advisory blocks as non-pass/fail
signals. Wording only; verified live on figma-plugins ("checked 35 of 35 DS components").

### LATER / conditional

#### I18. Accessibility gate (consolidates I4 + I13)  ·  sources S3, S11, S12, S13, S4  ·  value: high  ·  cost: high
**What.** One dedicated **Accessibility** gate, so a11y is a first-class reportable dimension
(as Gampert and Brad Frost both model it) instead of scattered. Built on real rendered evidence
(the Gate 22 CDP/DOM + computed styles), never on imposed structure:
- **Contrast** - compute WCAG ratios on each text element's real `color` vs its effective
  `background-color`, **per theme**; flag below AA. Fully agnostic (math on resolved pixels).
- **Accessible name / role** - each interactive element has an accessible name and a role
  (read from the accessibility tree / ARIA in the render).
- **Focusable + visible focus** - `tabindex`/focusability and a computed `:focus-visible` style.
**Split.** Mechanical + agnostic (contrast, name/role, focus) runs by default from the render;
anything the render cannot reveal (e.g. expected keyboard order) is **opt-in / project-declared**,
never imposed. Advisory by default with a strict mode (`a11yStrict`) so it does not block a DS
mid-adoption.
**Why.** S3 (a11y is a first-class agent need), S11/S12 (Accessibility is its own inspection
station), S13/S4 (compute real contrast per theme; names are assertions). Bounded by the
No-imposed-structure principle: read what is really rendered, do not presume a DS shape.
**Artifacts.** Extend/parallel `rendered-check.mjs` (CDP): sweep DS component elements, read
computed color/bg + a11y tree per theme, compute contrast, report. `ds-config.json → a11yStrict`.
**Spec.** Full mini-spec in `PARITY-I18-a11y-spec.md` (signed off 2026-09-21).
**Status.** IMPLEMENTED 2026-09-21 (`a11y-check.mjs`). Signed-off choices: advisory + `a11yStrict` opt-in;
sweep all rendered DS UIs; WCAG AA; per-state a11y deferred to v2. v1 = contrast (per theme, effective
composited background) + accessible name/role (a11y tree) + visible focus, all from the Gate 22 CDP render.
Standalone + `--component` scope + `--a11y` verbose; skips cleanly with no browser. Wired into audit.mjs as
an advisory (never fails unless `a11yStrict`). 221 tests pass (9 new pure-core tests: contrast math,
thresholds, compositing, classifier). Verified live on figma-plugins: surfaced `button#rescan-btn`
(tokens-to-ink) with no visible focus indicator. Absorbs I4 and I13.

#### I4. Accessibility per state  ·  source S3  ·  value: high  ·  cost: high  ·  FOLDED into I18
**What.** Role, keyboard behavior, focus, and contrast attached per component and per state.
**What.** Role, keyboard behavior, focus, and contrast attached per component and per state.
**Why.** Gampert lists a11y as a first-class agent need.
**Condition.** Defer unless a11y is a live pain and something actually consumes it. Highest
authoring burden of the list; only worth it if maintained. Could later become an optional
gate ("every interactive component declares a11y").
**Status.** FOLDED into I18 (the Accessibility gate).

#### I6. Token-layering validation (multi-brand)  ·  source S2  ·  value: high at scale  ·  cost: medium
**What.** Validate the layered token structure: semantic references primitive, brand
references semantic, nothing duplicates a primitive value; plus a per-brand coverage report.
**Why.** Wise-scale multi-brand systems depend on "reference, do not duplicate". Strengthens
the existing alias-chain and mode-completeness gates.
**Condition.** Only when the DS goes multi-brand. Premature for a single-brand plugin DS.
**Status.** IMPLEMENTED 2026-09-22 (`brand-check.mjs` + audit advisory). Opt-in: runs only when ds-config declares `brands: [snapshotKey,…]` (>=2). `brandCoverage` flags a token defined in some brands but missing in others (present in all = fine, in none = not a hole). Advisory, never imposes; the engine never auto-detects brand - you declare it. +3 tests. Brands are resolved plan-agnostically by `resolveBrands(cfg, snapshot)`: declared `brands` wins > a captured `collections` manifest that marks a brand collection (the extended-collections/Enterprise enhancement, read as CAPTURED data, never a plan-gated API in the audit) > else a suggestion of candidate multi-mode collections (never auto-classified, since modes may be theme/density/locale). Capture-side follow-up: the Phase-1 plugin records the `collections` manifest (name/modes/role/remote/extends) so the manifest path lights up. +6 tests.

#### I7. Judgment-eval mode (artifact vs contract)  ·  source S1  ·  value: high  ·  cost: high
**What.** Extend the parity from "code vs Figma" to "any generated artifact vs the contract":
run the mechanical gates against an agent's *output*, not just the repo. Positions the parity
as the gate agents work between.
**Why.** S1's tier framework: mechanical conformance of generated UI is checkable, and the DS
already made the decisions the eval checks against.
**Condition.** A separate project / new entry point, not a retouch of the current run.
**Status.** IMPLEMENTED 2026-09-22 (separate entry point, never gates the repo). `eval-check.mjs`
(`evalConformance`) applies the gate failure modes to a candidate an agent produced (raw literals →
tokens, invented vars, DS-class usage). `eval-run.mjs` runs cases from `ds-config.json → evals`, with
two PLUGGABLE commands (any agent/CLI, no lock-in): `evals.generate.cmd` (prompt on stdin, DS context in
$EVAL_CONTEXT, stdout = candidate) and `evals.judge.cmd` (advisory JSON verdict). Metrics: produced?,
zero-fix rate, violations, judge pass; appended to `evals-history.json`. Advisory (exit 0 unless
`evals.strict`). Degrade-safe; +8 tests; spec in `plans/PARITY-evals-spec.md`. LLM-judge questions kept
minimal + advisory. The only "future" is deeper judge lenses; the harness is complete.

#### I12. Maturity / AI-readiness scorecard  ·  sources S8, S11, S12  ·  value: high  ·  cost: medium
**What.** Emit a per-run scorecard across a few axes with Red/Yellow/Green (not just PASS/FAIL):
Foundations (token + tier health), Documentation (design-intent coverage), Adoption (coverage
gate + exemption debt), and AI Readiness (% components with a contract + guidance + relationships,
and a "bypass rate" = how often code sidesteps the DS). A running measure, not a grade.
**Why.** zeroheight (S8) makes AI Readiness a first-class maturity axis measured by bypass rate.
Brad Frost (S11/S12) uses R/Y/G station scoring. The parity already has the raw signals.
**Artifacts.** Aggregate existing gate + coverage + contract data into one scorecard block.
**Status.** IMPLEMENTED 2026-09-22 (audit.mjs "AI-READINESS SCORECARD" block). R/Y/G across: gate health
(pass/total), coverage (MODELLED X/Y from the coverage gate) + exemption debt, documentation (% contracts
with a description) and AI guidance (% with whenNotToUse/useInstead). Aggregates signals already computed
this run (no new detection). Advisory, never blocks. Verified live: 23/25 gates, 35/35 modelled, 36/36
described, 0/36 guidance (the honest red nudge).

#### I13. Contrast-ratio validation per theme  ·  sources S13, S4  ·  value: high  ·  cost: medium
**What.** Compute *actual* contrast ratios for text/background token pairs, per mode, and flag
pairs below WCAG AA. A concrete, computable slice of a11y (unlike the broad authored I4).
**Why.** S13: names like "on-brand" are assertions; compute the real ratio per theme. S4: test
text/background pairings for a11y.
**Artifacts.** Resolved color tokens per mode (vars snapshot) + an authored list of intended
text/bg pairs (or derive from component fill+text tokens); advisory gate.
**Status.** FOLDED into I18 (the Accessibility gate) as its contrast core.

#### I14. Token usage + pairing + a11y metadata  ·  source S4  ·  value: medium  ·  cost: medium
**What.** Extend the per-token metadata sidecar (already carries description + deprecated) with
`usage` (intended use / restriction) and `allowedOn` (valid background pairings). Emitted into
tokens.json for the agent.
**Why.** S4: token metadata should carry intended usage and allowed pairings, not just a name.
**Artifacts.** `buildTokens()` metadata sidecar in contract-gen.mjs.
**Status.** Pairing part IMPLEMENTED 2026-09-30 (branch, not pushed), derived, never authored: `token-pairs.mjs` `readableOn` gives each text colour (named text, fg, foreground, content, icon, label, on-…) the colour tokens it meets 4.5:1 on in every mode (see-through colours and borders, dividers, shadows, focus rings left out); contract-gen writes it into tokens.json (`$extensions.com.rms.parity.readableOn`) and --query shows it. Intended-usage text stays out: it would be authored data (North star).

#### I15. Machine-readable docs completeness  ·  source S11  ·  value: medium  ·  cost: low
**What.** Check each component's contract has the expected agent-facing fields (props, slots,
states, an example) and report which are missing. A "schema completeness" advisory.
**Why.** S11 lists "Machine-Readable Docs (schema completeness)" as an inspection station.
**Artifacts.** Inspect the emitted contracts; advisory list of gaps.
**Status.** IMPLEMENTED 2026-09-22 (audit.mjs, inside the contract-emit block). Reads the just-emitted
`contracts/*.contract.json` and reports `X/N have a description · Y/N have semantics · Z/N carry
whenNotToUse/useInstead guidance`, then names components with no description (the most agent-critical
field); `--contract-completeness` lists them. Advisory, never fails; a thin field is a gap to author.
Verified live on figma-plugins (36/36 description + semantics, 0/36 guidance = the nudge to author I1).

#### I16. Closed token vocabulary / ban raw containers  ·  source S10  ·  value: medium  ·  cost: high  ·  conditional
**What.** For a component/framework DS: constrain props to closed token sets and flag raw
containers (`div`/`nav`/`ul`) in favor of a typed primitive. Surfaces off-brand values as errors.
**Why.** Orbit (S10): tokens as the only vocabulary; ban the unconstrained container.
**Condition.** Framework-DS specific; low fit for the current plain-HTML plugin DS.
**Status.** IMPLEMENTED 2026-09-22 (`vocab-check.mjs` + audit advisory). Opt-in: runs only when ds-config declares `closedVocab: {bannedTags, surfaces, suggest?}`. `scanBannedContainers` counts raw container tags the project banned in its declared surfaces (word-boundary, so `<divider>` != `<div>`). Advisory, never fails, never imposed. +3 tests.

#### I17. Semantic naming grammar advisory  ·  sources S4, S10, S5 (caveat S13)  ·  value: low  ·  cost: low
**What.** Advise (never fail) when a token is named by appearance (`blue-500`) rather than role
(`text-subtle`). Optionally verify the S5 grammar `category/role-emphasis`: category in
{background, border, text, icon}, emphasis in {default, bold, subtle, muted}, and no state words
(hover / active / primary / interactive) used as emphasis.
**Why.** S4/S10 prefer intent-based names; S5 gives a concrete, checkable grammar. **Caveat
(S13):** structure matters more than vocabulary, so this stays a soft advisory only; the real
enforcement is I10 (aliasing + tier discipline), not naming.
**Status.** Backlog (advisory only).

#### I19. Decision legibility on exemptions + authored decisions  ·  source S9  ·  value: high  ·  cost: low-medium
**What.** Extend each exemption / authored-decision record with optional legibility fields beyond
the existing `_note` rationale: **status** (permanent | temporary), **owner**, and a **review
condition** (a date or trigger). The I9 debt report then separates temporary exemptions (to clear)
from permanent/approved ones, and flags any that are NOT legible (no rationale / owner / status).
**Why.** S9: a decision is legible when a non-participant sees what / why / who has authority /
what would justify changing it. Without it an agent cannot tell an intentional rule from a
temporary workaround, or an approved exception from an extendable precedent.
**Caveat.** Authoring burden: all fields optional, advisory only, never fail on missing legibility.
**Artifacts.** Exemption entries are already objects with `_note`; extend the I9 report.
**Status.** IMPLEMENTED 2026-09-22 (audit.mjs, extends the I9 exemption-debt block). Reads optional
`status` (permanent|temporary), `owner`, `reviewBy` (or `review`/`reviewWhen`) and rationale
(`_note`/`note`/`reason`) off each object entry; an entry is legible when it has a rationale AND an
owner-or-status. Adds a `legibility: N temporary · N permanent · N unspecified · N not legible` line,
and `--exemption-debt` tags each entry `[status:… owner:… review:… not-legible]`. Advisory, never fails;
agnostic (bare-string entries read as not-legible). Verified live on figma-plugins (66 unspecified).

#### I20. Blast-radius on contract changes  ·  source S9  ·  value: medium  ·  cost: medium
**What.** Label each breaking/additive contract change (already detected) by **how many consumers**
depend on the changed token/component, so a shared-contract change reads as authorship ("this token
is used by N components — a shared-contract edit") rather than a quiet local tweak.
**Why.** S9's "may it?": changing a shared contract is authorship, not consumption. Computable from
usage (llms / composition) + the existing change detection. Agnostic. The engine only SURFACES the
blast radius; it never enforces authority (that is people + process).
**Artifacts.** Cross the change-detection output with usage/composition counts.
**Status.** IMPLEMENTED 2026-09-22 (contract-gen.mjs `usageCounts()` + attach). Each breaking/deprecation
change now carries a `consumers` count: for a token, how many components reference it; for a component,
how many compose it. The audit prints "used by N component(s) — a shared-contract change". The engine
only surfaces the reach; authority stays people+process. +1 test (usageCounts).

#### I21. Single-source-of-truth / duplication check  ·  source S9  ·  value: medium  ·  cost: medium
**What.** Detect the same token/component list **duplicated** across files (agent instructions,
skills, docs) that will drift into stale parallel truths; advisory "keep one home, generate the rest".
**Why.** S9: duplicated lists drift and invite hallucination; mechanical info should be generated
from the system with one home. Extends Gate 20 (docs truth).
**Artifacts.** Scan configured doc/instruction surfaces for copied component/token lists vs the
generated index.
**Status.** IMPLEMENTED 2026-09-22 (`duplication-check.mjs` + audit advisory). Opt-in via ds-config
`duplication: { surfaces, minCluster? }` (generated surfaces like the styleguide are NOT listed - listing
all components is their job). `findNameMentions` is whole-token (handles token paths like `radii/button`);
`duplicationFindings` flags a surface that restates >= minCluster (default 5) DS component/token names and
calls out a list duplicated across >=2 surfaces (parallel truths). Advisory, never fails; DS truth from
the structure + vars snapshots; names with `--duplication`. +4 tests.

#### I31. Code Connect as a VALIDATION TARGET (not a source)  ·  sources S21 (Figma Code Connect), S22 (McKinsey QBDS)  ·  value: high  ·  cost: medium  ·  NEW
**What.** Detect Figma Code Connect if it is already present in the repo (committed `*.figma.tsx` /
`figma.config.json`, or a captured manifest) and AUDIT those mappings against the emitted contract:
flag a Code Connect entry whose prop/variant/example disagrees with `<component>.contract.json`, or that
maps a prop/component that no longer exists. Advisory. Approved by RMS 2026-09-22 (README reframe convo).
**Why.** QBDS (S22) is emphatic: "Code Connect is a downstream artifact — it can be wrong or stale. Do
NOT seed [truth] from it." They set `disableCodeConnect: true` and treat any Code Connect ↔ (Figma+code)
mismatch as a MAPPING BUG. So Code Connect is not a competitor to the contract layer — it is one more
surface to VALIDATE against the Facts/Contracts. This is differentiated (no public skill validates Code
Connect against captured facts) and matches our contract-is-truth ethos.
**INVARIANT (non-negotiable).** Code Connect publish/read via the REST API is Figma **Enterprise/Org**
plan-gated. The audit must NEVER call that API. Model it exactly like multi-brand / extended-collections
(`resolveBrands`): read ONLY data already present locally (the committed Code Connect files the user's own
`figma connect` tooling wrote), light the check up only when detected, and no-op silently otherwise. Any-
plan projects are byte-identical (nothing changes) — the enhancement simply doesn't run for them.
**Artifacts.** A `codeconnect-check.mjs` (pure: parse committed CC files → mappings; diff vs contract) +
an opt-in/auto-detected audit advisory. `cfg.codeConnect: { files?: [...] }` override; zero config = auto-
detect + no-op if absent.
**Status.** IMPLEMENTED 2026-09-22 (`codeconnect-check.mjs` + audit advisory). `parseCodeConnect` reads
committed `*.figma.{ts,tsx,js,jsx}` (regex, no TS parser dep): per `figma.connect(Comp, url, {...})` it
extracts the component, the node id from the URL, and each `figma.enum/boolean/string/instance` prop with
its enum option keys. `codeConnectFindings` joins to the emitted contracts BY NODE ID (normalized) and
flags `unknown-prop` / `unknown-option` / `no-contract`. Auto-detected via `collectSourceFiles` (or
`cfg.codeConnect.files`); no CC files = no-op. NEVER calls the Enterprise Code Connect API (reads only
committed files) - honors the any-plan INVARIANT. Advisory, never fails; names with `--code-connect`. +4 tests.

#### I32. axe-core in the render gate (broaden a11y)  ·  source S23 (southleft scan-code-accessibility)  ·  value: medium  ·  cost: low-medium  ·  NEW
**What.** In the existing headless-Chrome render flow (Gate 22 / I18 a11y), inject axe-core from a CDN
into the already-loaded page and run it, mapping findings back to the rendered DS component. Broadens the
current a11y advisory (contrast + accessible name/role + visible focus) toward full WCAG rule coverage
(labels, roles, target size, duplicate ids, …). Advisory only, never fails.
**Why.** southleft's `scan-code-accessibility-figma` runs axe against HTML and maps violations to the
originating design; our a11y is narrower. Reuses the render we already do.
**North star / cost.** The skill is **no-dependency** — do NOT add an npm dep. Inject axe from a CDN
`<script>` at audit time (or a vendored single file), so nothing is added to the consumer's install.
Advisory, opt-in via `--a11y` detail. Keep the surface small.
**Status.** IMPLEMENTED 2026-09-24 (`a11y-check.mjs`). Opt-in via `--axe` or `ds-config.json → a11y.axe:true`.
`fetchAxeSource()` pulls axe-core 4.10.2 from cdnjs (pinned, no npm dep), `runAxe()` injects it into the
already-open page (works on `file://`) and runs `axe.run`, and `summarizeAxe()` collapses per-node violations
to one row per rule (busiest first). Reported as a separate plain-language advisory section ("A broader
scanner also found…") and under `axe` in `--json`; degrades to a one-line note if axe can't be fetched
(offline/blocked) — the core checks always run. Verified live: surfaced non-text/colour contrast (47 places),
button-name, heading-order and form-label rules. **Plus** the focus-ring half of WCAG 1.4.11 is now covered
**natively** (not via axe): the visible-focus check also verifies the ring's colour reaches ≥3:1 against its
background (new `focuscontrast` finding), so a ring that "changes" but is invisible is caught. +2 tests.
**Remaining a11y backlog, resolved 2026-09-24:** (a) **Live interaction-state contrast** (`--states` /
`a11y.interactionStates:true`) — forces `:hover` via CDP `CSS.forcePseudoState` on interactive nodes and
re-runs the contrast sweep, reporting only text that reads fine at rest but fails while hovered (new
`hovercontrast`); axe can't do this (resting DOM only). (b) **Reading order / skip-links / landmarks** —
NOT hand-built: axe already covers them (`region`, `landmark-*`, `bypass`, `tabindex`, `heading-order`),
so `--axe` is the answer; reinventing them would duplicate axe. Only `:hover`/`:active` was a genuine gap.
Still open (v2): forcing `:active`, and reflow/text-resize (1.4.10/1.4.4) — those need a real screen
target, noisy on the styleguide catalog, so best run against `--url` screens.

#### I22. Query CLI / three entry points over the emitted artifacts  ·  source S14  ·  value: medium  ·  cost: medium  ·  adjacent
**What.** A thin, read-only CLI over the already-emitted contract + tokens + `llms.txt`, so an agent
can *query* the DS ("search button", "component Button", "token space/200", batch) instead of loading
the whole index. Atlassian's "one source of truth, three entry points" (skill / MCP / CLI over shared
modules): the parity already generates the source of truth locally; this is a distribution entry point,
not new audit power. Include "next step" command hints and batch queries (their measured wins).
**Why.** S14: a CLI reached more agents than an MCP server, with fewer tokens and faster task
completion, because a terminal-capable agent just runs a command with no client to configure first.
**Caveat / North star.** Adjacent to the auditor's job, not core; keep the surface small and build only
if something actually consumes it. The parity's differentiator over S14 is precisely the validation S14
lacks (does the code / generated output actually match the DS), never trade that away to become a mere
context server.
**Artifacts.** Read the emitted `contracts/` + `tokens.json` + `llms.txt`; expose a query command.
**Status.** IMPLEMENTED 2026-09-30 (branch, not pushed), kept small. `query.mjs`, `rms-figma-code-parity --query <term> [more] [--json]`: over contracts/catalog.json and tokens.json, a component answers with its props as the code writes them (values, default), Figma's names where they differ marked as not in parity, the names an agent is likely to guess wrong (the I58 rejected table), slots, never-contains, when not to use and use instead; a token answers with its CSS variable (the naming convention) and its value per mode; anything else names the closest. Several terms per call; exit 0/1/2; a NEXT line points at --check-ui. No MCP server, no new data.

#### I23. Figma-side AI-readiness lint (design-file hygiene)  ·  source S19  ·  value: high  ·  cost: medium  ·  DONE (figma-hygiene.mjs; I69 adds renamed instances)
**What.** From the Phase-1 capture, flag Figma components that are not parity/AI-ready: raw values with
**no bound variable** (an un-tokenized fill / gap / radius in Figma), **detached** instances, **missing
auto-layout** (no structured padding/gap), **missing `description`/annotations**.
**Why.** S19 (TJ Pitre): audit the design file's own AI-readiness — the upstream cause of bad output. The
parity audits code-vs-Figma but assumes Figma is clean; this audits Figma's OWN hygiene. Advisory.
**Artifacts.** Some signals already captured (bound vs unbound, component descriptions); the rest are cheap
Plugin-API reads in Phase 1.
**Status.** BLOCKED on a capture change (2026-09-22). Prototyped the "already-captured slice" against the
structure snapshot: a peer-consistency lint (`*Var` field null = unbound, flagged only when a peer binds
the same field). Result on a real 35-component DS: 31/35 flagged, 104 findings — almost all legitimate
(`dividerLine`/`swatch`/`switch` "missing" fontSizeVar/padding they genuinely don't have). Root cause:
the snapshot writes `null` for BOTH "raw value" and "no value" indistinguishably, and "ever bound by any
component" is satisfied by a single text component. No statistical rule fixes this cleanly. **Faithful
I23 needs a Phase-1 capture change**: record per style dimension whether it is *present-but-unbound* (raw)
vs *absent*, plus `detached` instance flag and component `description` (the props refresh stores nodeId/
properties/annotations only). Once captured, the lint is trivial and clean. Prototype + tests discarded
(no dead code); do not re-attempt from the current snapshot. `description`/annotations angle also overlaps
I15 (contract completeness), so the unique value is the unbound-raw + detached + auto-layout signals.
**IMPLEMENTED 2026-09-30** (branch, not pushed). The capture change: the component-values sweep (the Plugin API snippet in cookbook/full-audit.md, and the REST refresh) now writes a `hygiene` record per component from `figma-hygiene.mjs` `hygieneOf`: values present with no variable and no style (solid fill or stroke colour, radius, padding, gap in an auto layout, a text layer with no text style), detached frames (`detachedInfo`, Plugin API only; REST has no flag, so absent means not captured), variants with 2+ layers and no auto layout, and whether the component has a description. Vector artwork and instances are left out (an instance holds its own component's values), hidden paints too; variants inside a set are one entry (the snippet no longer lists each variant as a component). The audit prints a `🎨 Figma file hygiene` block (for whoever keeps the Figma file; never a gate; kept out of the burndown; `"figmaHygiene": false`, `--hygiene`), and the AI-readiness scorecard gains a Figma hygiene row. A test checks the snippet carries the engine's function verbatim and runs it on a mock Figma document. The REST sweep now reads `/component_sets` and `/components` as the list the API returns (`byNodeId`), as well as a map. Harbor plants a raw fill, a detached instance, a variant without auto layout and a missing description. Found along the way: a scoped run pulled in every component shown on a common page (and a native <button> read as the Button component), so --component chip audited the whole demo; expansion now follows only a component's own source file, a line is scoped by the most specific component it names, the scoped burndown counts only its components, and a variant finding names Figma's own values (Size=Large, not size=large). **Prop names exact too (2026-09-30, the owner's answer):** a Figma property still pairs with the code prop of the same name ignoring case and separators (so its values are compared), but a name not written exactly the same is a NAME fail in Gate 15 showing the letters that differ ("chip/Size: the code names it "size" (letter case S → s)"). Documented aliases and contract bindings stay the team's decision. The demo now shows its 5 Title Case vs camelCase names; Harbor's button uses the code's names in Figma and passes, its badge keeps Tone vs tone as the plant. Also: the no-refresh SAY line now says how to give Figma access (the Figma MCP, or FIGMA_TOKEN in .env, never in the chat), after one Sonnet run improvised "share Figma access (MCP tool or token)".

#### I24. Code→design drift report (the reverse direction)  ·  source S19  ·  value: high  ·  cost: low-medium
**What.** Surface props / variants / components that exist in **code but not in Figma**, as a "sync back
to design" advisory, so code-ahead-of-design is visible.
**Why.** S19's core point: the diagnostic layer must work **both directions** ("keep both sides honest").
The parity is design→code; today Gate 12 only treats extra code props as advisory — promote it to a
first-class code→design report. The engine only SURFACES the drift; the designer decides (never governs).
**Artifacts.** Reuse the component-prop gate + contract change-detection, inverted.
**Status.** IMPLEMENTED 2026-09-22 (audit.mjs advisory block). Reads `component-prop-result.json` rows
with `status:'extra'` (a code prop with no Figma property) and `status:'rename'` (a likely match to
document), groups the extras by component, and prints a `Code → design drift` advisory ("exist in code
but not in Figma; sync back or document"). `--code-drift` lists every prop + the rename candidates. The
engine only SURFACES it; the designer decides. Never affects pass/fail. Rendering verified on synthetic
rows (framework project); silent on plain-HTML DSes that produce no prop rows. Scope note: covers PROPS
(the readily-available signal); a full code-only component inventory is a later extension.

#### I25. DSDS-conformant contract view  ·  source S20  ·  value: medium  ·  cost: medium
**What.** Emit (or map) the per-component contract to the DSDS schema: `sourceFiles`, `traits`, `combos`
(= the parity's relationships/composesWith), `sections` with `for: human|agent|all`, do/don't
(= whenNotToUse/useInstead), states.
**Why.** S20: adopt DSDS's "point at the authoritative fact, don't restate" (already the ethos) and interop
with DTCG / CEM / Storybook CSF, so the parity's output plugs into an emerging standard.
**Status.** Backlog.

#### I26. Per-component code example / "chunk"  ·  source S16  ·  value: medium  ·  cost: low-medium
**What.** Emit a ready-to-use usage snippet per component (from the real code) into the contracts/llms, so
an agent pastes correct usage instead of reconstructing it.
**Why.** S16 (Sanity): "chunks" are the highest-leverage agent support. Agent-facing, additive.
**Status.** IMPLEMENTED 2026-09-22 (contract-gen.mjs, `usage` field on each contract). Grounded, not a
"real code" extraction: `usage` = the authored semantic element (when set) + each prop with a concrete
example value (its default, else its first variant option), all from the contract itself. Framework
syntax (JSX vs class) is left to the agent on purpose. +1 test. A later upgrade could extract a real
usage snippet from a screen; deferred to keep this cheap.

#### I28. Token-level contrast, no browser  ·  sources S13, S4  ·  value: high  ·  cost: low  ·  NEW
**What.** Compute WCAG AA contrast for project-declared text/bg token PAIRS from the token values, per
mode, without a browser. Complements the render a11y gate (I18); runs in CI without Chrome.
**Status.** IMPLEMENTED 2026-09-22 (`contrast-check.mjs` + audit advisory). Opt-in via
`ds-config.json → a11y.tokenPairs: [{text, bg, large?, name?}]`; reuses a11y-check's contrast math
(added a hex parser); per-mode; advisory, never fails, never imposed. +3 tests.

#### I29. Contract-aware fix citations  ·  value: high  ·  cost: low  ·  NEW
**What.** A value gate that says "wrong" should also say what's right and where it's written down.
**Status.** IMPLEMENTED 2026-09-22 (`fix-hint.mjs` + parity-check.mjs). When the emitted contracts
exist, each token divergence cites the token's verified value from `tokens.json` and the file that
declares it, so a fix (person or agent) is grounded in the real fact. Degrades to naming the token +
its convention var when contracts aren't generated. Pure, degrade-safe, reusable by any gate. +4 tests.

#### I30. Adoption baseline / ratchet  ·  value: high  ·  cost: low-medium  ·  NEW
**What.** Let a real (imperfect) codebase adopt the audit without a wall of red or turning gates off.
**Status.** IMPLEMENTED 2026-09-22 (`baseline.mjs` + audit.mjs). `--baseline` records today's failing
gates as accepted debt in a committed `parity-baseline.json`; a normal run tolerates those (shown as
Debt, verdict "NO REGRESSIONS") but fails on any gate NOT in the baseline that goes red. Debt only
ratchets down (fixed gates surfaced to lock in; stale entries flagged). Gate-level = deterministic,
imposes no structure, uses only the pass/fail the audit already has. Off by default; `--no-baseline`
or `ds-config baseline.enabled:false` to ignore. +6 tests. (North star: adoptable without governance.)

#### I27. Eval metrics v2  ·  source S16 (Sanity, re-read)  ·  value: medium  ·  cost: low-medium
**What.** Enrich the shipped evals (I7) with the extra Sanity metrics, all cheap given the harness:
- **inline-styles count** — flag `style=`/inline-style attributes on candidates (a stronger "used a
  token, not a hardcoded style" signal than raw-literal scanning alone). Add to `eval-check.mjs`.
- **completion time + token spend** — time each `generate.cmd` and, if it prints a token count, record it.
- **N runs per case** — `evals.runs: N`: run each case N times and average (S16: 3–5 for signal, 10+ for
  definitive); report variance, not just one shot.
- **responsive coverage** — only if a project declares breakpoints to check (opt-in, never imposed).
**Why.** S16's metric set is the standard for "is the DS agent-usable"; I7 already has build-success /
zero-fix / violations, these are the missing few.
**Status.** PARTIAL 2026-09-22. Shipped: **inline-styles count** (eval-check metric) and **avg generation
time** per run (eval-run times each generate.cmd), both in the summary + `evals-history.json`; +2 tests.
Also shipped **N runs per case** (`evals.runs`, clamped 20): with a generate.cmd each case is generated+checked N times and reported as `k/N runs clean` (S16: 3–5 signal, 10+ definitive; zero-fix rate is over all runs); +1 test, end-to-end verified. Still backlog: token-spend parsing (provider-specific) and responsive coverage. Keep advisory, never gates.

_Reinforced by S16–S21 (mostly confirmation): **S21** (Andrew Branch) = the philosophical case that the
emitted DTCG-tokens + `*.contract.json` + `llms.txt` + design-intent ARE the "durable source layer" a DS
should own, with Figma/Storybook/agents as consumers — it validates the contract/intent direction and the
deferred **bidirectional/code-first** future (first step already shipped as **I24** code→design drift);
the parity keeps Figma as source-of-truth for now by choice. **I7** judgment-eval harness (S16/S17 —
underspecified prompts → mechanical validation + LLM-judge; SHIPPED); **I12** maturity scorecard (SHIPPED;
could add adoption %); **I1** do/don't = "use-cases" (SHIPPED); **I26** "chunks" = usage scaffold (SHIPPED);
the North-star "keep the surface small" (S16 "more isn't better")._

_Legacy note — reinforced by S16–S20: **I7** judgment-eval harness (S16/S17 describe it exactly —
underspecified prompts → mechanical validation against the contract + LLM-judge, tracking
build-success/zero-fix/a11y metrics); **I12** maturity/AI-readiness scorecard (add the **adoption %** from
S18/S17, over the local-reimplementation gate + coverage); **I1** do/don't (= "use-cases"); the North-star
"keep the surface small" (S16 "more isn't better")._

#### I33. Per-component decision status + the *why* (current / deprecated / experimental)  ·  source S24 (Zaitsev + comments)  ·  value: high  ·  cost: low-medium  ·  NEW
**The problem it kills.** An agent composing from the DS finds **two right answers and no note saying
which one won** — an old component kept beside its replacement, two tokens that both look valid. Status
is the *easy* half; the **why** is the field an agent actually needs, and it "lived in a call nobody
wrote down".
**What.** Add an optional, agnostic **`status`** block to each emitted component contract (and, where it
exists, each token's metadata sidecar): `status: current | deprecated | experimental`, plus
`supersededBy` (points at the winner), `since`, and a free-text **`rationale`** (the *why*). Emit it into
`llms.txt` / the AI index so an agent reads "use X, not Y, because Z" before it composes.
- **Where the data comes from (agnostic, never invented):** (1) Figma component/token **description**
  already captured (parse a `@status`/`@deprecated`/`@use-instead` convention if the DS uses one — do
  not impose it); (2) the **design-intent** authored layer (the natural home for the *why*, already the
  "why a component exists" surface); (3) the existing **deprecated-token metadata** the sidecar already
  carries (line ~145/287) — generalize it from tokens to components. Zero-config = nothing emitted; the
  field only appears when the DS actually says something.
- **Ties into what already ships:** extends **I19** (decision legibility) from exemptions/authored
  decisions to *components*; sharpens **I21** (duplication) and **I8** (prune) — when the duplication
  check finds a look-alike, `supersededBy` tells the agent which is current instead of just flagging two;
  feeds the **I24** code→design direction (a code component with no design match may be an undeclared
  experimental/deprecated one).
**Why it's the one new angle from S24.** Everything else in the article (AI-as-third-user, when-to/not-to,
relationships, a11y, composition-over-generation, validation-before-generation) the parity already does
(I1/I2/I18/I7). This is the gap: the DS knows *what* exists but not *which of two alternatives is current
and why*, and that's exactly the context an agent silently gets wrong.
**North star.** Advisory metadata only — never a gate, never imposed, no npm dep; emit only what the DS
authored. Keep the field small (status + supersededBy + since + rationale).
**Status.** IMPLEMENTED 2026-09-24 (`decision-status.mjs` + contract-gen + intent-gen + audit advisory). Each
contract gets `status: { state, supersededBy?, since?, rationale?, source }` only when the DS says something:
authored `status`/`supersededBy`/`since`/`rationale` in `contract.authored.json` win, and a Figma description
that already uses tags fills the gaps (`@deprecated [why]`, `@experimental`, `@status`, `@use-instead` /
`@superseded-by` / `@replaced-by`, `@since`, `@why`). llms.txt tags `[deprecated]`/`[experimental]` with a
`status: deprecated · use X instead · since … · why: …` line; design-intent.json carries it too. Tokens: a
deprecated token whose description names a replacement or reason gets it as the DTCG `$deprecated` string.
Cross-checks (advisory, `--status` lists all): guidance (`useInstead`) or composition still pointing at a
deprecated component (the "two right answers" case), a `supersededBy` naming no DS component or a
deprecated one (chain followed to the winner), a deprecation with no replacement and no reason. Newly
deprecated components show in change detection. +5 tests.

#### I34. A11y **static tier** — decouple accessibility from the live render  ·  source S3/S11/S12 (re-frame) + this session  ·  value: high  ·  cost: medium  ·  NEW
**The limitation it fixes.** Today all a11y depends on a browser render: no dev server / no discoverable
target → the whole gate **SKIPs** → **zero a11y signal**. But the engine already holds two *static* sources
it never renders: (1) the **repo source + CSS** (already parsed by `reimplementation-check`,
`component-prop-check`, `structure-check`, `screen-element-check`, `icon-check`), and (2) the **Figma
snapshot + tokens** (already carries colors and frame **dimensions** — `icon-check` reads sizes straight
from it). **I28 (`contrast-check.mjs`) already proves a11y can run with no browser.** So: invert the
default — a static tier that **always runs**, with the render as an *augmenting* layer, not a floor.
**Static tier (no browser — from repo source + CSS + snapshot + tokens):**
- **Contrast** — generalize **I28**: keep declared `a11y.tokenPairs`, and additionally *auto-derive*
  candidate text-on-surface pairs from the colors the snapshot actually uses (advisory, never invented).
- **Missing accessible name** — static source scan: icon-only `<button>` / `role=button` with no
  `aria-label`/`aria-labelledby`/text child; `<img>` without `alt`; input with no `<label>`/`aria-label`.
  Reuses the source parsers the prop/reimplementation checks already run.
- **Missing focus styles** — static CSS scan: interactive selectors with no `:focus` / `:focus-visible`
  rule. Catches a whole DS shipping without focus rings without focusing a single live element.
- **Keyboard anti-patterns** — positive `tabindex`; `onClick`/handler on a non-interactive `div`/`span`
  with no role + tabindex + key handler; `role` missing its required companion attributes.
- **State-only-by-class** — run the existing state-word-vs-`aria-*` check against *source*, not only the
  resting DOM.
- **Target size (WCAG 2.5.8)** — interactive component frames below 24×24 (or a declared floor), read
  from the captured snapshot dimensions **where the capture records them** (confirmed today for icon
  frames via viewBox; general component frame sizes need a Phase-1 capture check first). No browser.
- **Aria misuse** — invalid `aria-*` names / values, `aria-*` on elements that do not support them.
**Render tier (unchanged — the layer that genuinely needs the live DOM, augments when a target exists):**
effective *composited* background contrast (rgba over ancestors), a real *measured* focus-style change,
accessible name + role from the browser **AX tree** (ground truth vs the static approximation), and live
per-interaction-state a11y (forcing hover/checked/expanded).
**Payoff.** Removes the SKIP cliff: every project gets a real a11y report from `--component`/CI with **no
dev server**, and the render simply deepens it when present. The two tiers report together under one `a11y:`
summary.
**North star.** Agnostic (scan what is there, presume no DS shape), advisory, no npm dep; static source
scanning is framework-heuristic exactly like the engine's other source checks — same posture, never a hard
fail. Big win-per-cost because the parsers and the snapshot reader already exist.
**Status.** IMPLEMENTED 2026-09-30 (first slice). `a11y-static.mjs`, a ♿ block in every run, no browser: buttons **Second slice 2026-09-30** (branch, not pushed): a link with no accessible name (and a name given inside, by an image alt, an svg title or a child's aria-label, now counts for buttons too), an alt that is a file name, aria-hidden="true" on an element that takes focus, a page root with no lang (only the document's own root, never an <html> in prose), a viewport that blocks zoom, and animations with no prefers-reduced-motion alternative anywhere in the project (styles, markup or scripts; reported once). On the private test bed: the 25 earlier findings unchanged and one new real one (modal animations, no reduced-motion query); two false positives found in calibration and fixed (an <html> in comments, animation: none).
with only an icon and no aria-label/aria-labelledby/title, images with no alt, text fields with no label, positive
tabindex, clickable div/span with no role or tabindex, unknown aria-* names, and CSS that removes the focus outline with no
focus style put back (a :focus/:focus-visible rule, the same rule, a related wrapper's :focus-within, or another file).
Spread attributes and caller-provided text are never reported. On the demo: the one real finding (.tp-field__input). On a
private test bed: 25 findings, all real after three false-positive causes were fixed (hover/disabled rules, a wrapper's
focus-within, a script-filled button). Not yet: contrast derived from Figma colours (I28 covers declared pairs), target
size from Figma frames (needs the capture check), state-only-by-class from source.

#### I35. A11y render target = the generated styleguide (deterministic, per-state)  ·  source: this session  ·  value: high  ·  cost: low-medium  ·  NEW
**Naming (resolved this session).** The concept had two names — "showroom" and "style-guide" — which made
it undiscoverable; standardized everywhere to **styleguide** (`styleguide-gen.mjs`, `cfg.styleguide`,
`apps/styleguide/index.html`). A styleguide is **not** a new parity abstraction: it is the standard
living-styleguide / Storybook idea — the page where the DS's **real implemented components** render and can
be tested. No imposed structure; it is just a page.
**The engine already GENERATES one — but it is orphaned.** `styleguide-gen.mjs` fills a private template
with live DS sources (real tokens via `deriveModeCSS`, the DS icon sheet, usage, design-intent) and writes
a **static, self-contained `apps/styleguide/index.html`** — real components, real tokens, a manual
color/size toggle, openable via `file://` with **no dev server**. But `generateStyleguide` has **no caller
and no CLI** (not wired into the audit), and the a11y gate does **not** target it. That orphaning is the gap.
**The fix (concrete, small):**
1. **Point the a11y render tier at the generated styleguide** — add `cfg.styleguide.out` (default
   `apps/styleguide/index.html`) to the a11y render targets via `file://`, at high priority, before
   dev-server auto-discovery. This alone **removes the dev-server dependency** for any DS that has a
   styleguide: the render tier becomes deterministic and always-available.
2. **(Re)generate before the sweep** (opt-in) so a11y never runs against a stale styleguide, and wire the
   orphaned `generateStyleguide` into the pipeline (today it runs for no one).
3. **Per-state coverage, for free.** The styleguide renders each component's states/variants as **separate
   instances** (a disabled button, a checked box, an error input all on the page at once), so the sweep
   measures each state's contrast / focus / name / keyboard **directly** — dissolving the v2 "force live
   interaction states" problem into a plain sweep. Label findings by component×state by mapping each
   instance back to the `states`/`variants` `contract-gen.mjs` already derives (best-effort; degrade to the
   raw selector).
**Correction to an earlier note in this item's history:** the parity is NOT limited to *consuming* someone
else's gallery — it already **builds** the styleguide from canonical DS sources, so it can never drift or
invent (the same guarantee Gate 20 checks). Generating from the contract for DSs that ship no template is
the only heavier, later half.
**Relationship to I34.** Complementary: **I34** (static tier) always runs with *no* render; **I35** makes
the *render* tier deterministic + per-state by pointing it at the styleguide the engine already generates.
Layering: static (always) → generated-styleguide render, per-state (best, no dev server) → live dev-server
discovery (fallback).
**North star.** Agnostic (a styleguide is just a page), advisory, no npm dep.
**Status.** IMPLEMENTED 2026-09-23 (`a11y-check.mjs`). `styleguideTarget(cfg, ROOT)` adds the generated
styleguide (`cfg.styleguide.out`, default `apps/styleguide/index.html`) as the **preferred** file://
render target — above the built plugin UIs, below explicit `--url`/`a11y.urls`. Per-state coverage is
automatic: each state renders as its own instance in the resting DOM, so the existing 5 checks measure
disabled/checked/error/etc. directly (no forcing). `a11y.styleguide:false` opts out;
`a11y.regenerateStyleguide:true` rebuilds it first (dynamic import of styleguide-gen, wiring the previously
orphaned generator). +4 tests (320 total). Verified live: a11y now targets `apps/styleguide/index.html`,
sweeps both themes, no dev server. **Follow-up:** label findings by component×state (map instance → contract
state) — coverage lands now, the per-state *labels* are the next refinement.

#### I36. Declarable Figma↔code naming convention (stop hardcoding it)  ·  source: this session  ·  value: high  ·  cost: medium  ·  NEW
**The gap (a real agnosticism leak).** The token-path → CSS-var convention is **hardcoded in the engine and
duplicated across ~6 files** (`bound-check`, `effect-check`, `mode-completeness-check`, `motion-check`,
`naming-check`, …): `'--' + token.replace(/\/iconText\//,'/text/').replace(/\/default$/,'').replace(/\//g,'-')`.
The `iconText→text` alias and the `/default` drop are **one DS's quirks baked into the engine** — exactly
the imposed structure the North star forbids. The only per-DS flexibility today is the project's
`parity-map.mjs` (`EXPLICIT`, `TYPO`, `SKIP_TOKENS`): a **token-by-token manual escape**, which does not
scale when a DS's *whole* convention differs.
**Why it matters (the gate-7 case).** `--node-border-selected-hover` is flagged invented because the
reverse map hyphenates to `node/border/selected/hover` (two segments) while this DS names the combined
state `selectedHover` (camelCase, one segment). A DS with a different flattening (camelCase↔kebab, `.`
separators, BEM, different dropped leaves) would need an `EXPLICIT` entry for *every* token.
**The fix — the DS declares its convention, the engine applies it:**
- A **`naming` spec** — `ds-config.json → naming` or an optional export from the project's
  `parity-map.mjs`: `{ separator, dropLeaves:[…], aliases:{…}, case: preserve|kebab|camel, prefix }`, or a
  full `conventionVar(token)` function the DS can supply outright.
- **Centralize** the ~6 duplicated copies into ONE engine helper that reads that spec, with today's
  behavior as the **default** (zero-config unchanged, no regression).
- Keep `EXPLICIT` as the last-resort per-token escape.
- Resolves gate-7-type mismatches **generically** (declare the case/segment rule once) instead of per
  token, and removes the baked-in `iconText`/`default` DS quirks from the engine.
**North star.** Agnostic (each DS declares its own convention; the engine imposes none), no npm dep.
Refactor risk = the duplicated copies must converge to one; guard with the existing naming/bound tests.
**Status.** IMPLEMENTED 2026-09-23 (`naming-convention.mjs`). One shared helper — `resolveNamingSpec(cfg)`,
`tokenToVar(token, spec, {raw})`, `varToToken` — reads `figma.namingConvention` and reproduces the old
default exactly. Migrated **9 inline copies across 8 gates** to it: bound-check, effect-check,
mode-completeness-check, motion-check, naming-check, state-check, structure-check, parity-check (the
alias-chain `aliasHopToVar` keeps only its intermediate/primitive specifics), plus styleguide-gen's size
emission. Extended the existing `figma.namingConvention` schema (`dropSegments`/`iconTextAlias`) with
`aliases`, `separator`, `prefix`, and `case: preserve|kebab`. The `kebab` knob resolves the
`selectedHover ⇄ selected-hover` mismatch (the gate-7 class) generically, no per-token EXPLICIT. +10 tests
(316 total), zero regression, styleguide bytes identical.

#### I37. Semantic effect parity (shadows + blurs)  ·  source: this session  ·  value: high  ·  cost: low  ·  NEW
**The gap.** Gate [19] compared box-shadows as text, so equivalent CSS (`0` vs `0px`, omitted spread,
`inset` or colour first) raised false mismatches, and the structured capture shape the guide documents in
Step 1d became `[object Object]` and failed every style. Blur effects were captured but never checked.
**Status.** IMPLEMENTED 2026-09-24 (`effect-check.mjs`). Both sides parsed into layers and compared
semantically (8-bit alpha, layers as a set, nested var() colours, rem); both capture shapes accepted; a
mismatch names the field. Layer/background blur → CSS `blur()` at radius × `figma.effects.blurScale`
(default 0.5). +3 tests. Also fixed 9 figma-fetch tests that were silently cancelled every run.

#### I38. Role vocabulary in annotations  ·  source S25  ·  value: high  ·  cost: low  ·  NEW
**What.** Read Curtis's spec role names in Figma annotations (`role:togglebutton`, `role:textinput`,
`role:checkbox`) as what they mean in ARIA terms (a button with `aria-pressed`, a text box, a checkbox)
instead of as literal ARIA roles.
**Why.** The annotation check shipped in PR #4 (`annotationFacts` in `a11y-check.mjs`) reads
`role:togglebutton` as the ARIA role "togglebutton" and would report every correct toggle button as a
mismatch. A false finding erodes trust in the whole accessibility report.
**Artifacts.** `a11y-check.mjs` (`annotationFacts`, `annotationMismatches`, `sameRole`), one mapping table.
**Status.** IMPLEMENTED 2026-09-25 (branch commits 70e98dd, 9249d19; not pushed yet). `togglebutton` is a
button that must expose `aria-pressed`; `textinput`, `searchinput`, `iconbutton` map to textbox, searchbox, button.
Keywords are English only (Portuguese keywords were added and then removed: not in this list). Alongside it, a note
the accessibility check verifies passes Gate [10g] without a `CONTRACT.annotations` entry, and the guide documents
the note format.

#### I39. Roles as accessibility contracts  ·  source S25  ·  value: high  ·  cost: medium  ·  NEW
**What.** A role (from the contract's authored `semantics`, or a role annotation) states what the browser
must expose, and the check verifies it on the rendered component:
- a toggle button flips `aria-pressed` when clicked
- a text input has a connected label, `aria-invalid` in its error state, `aria-describedby` to its help text
- a checkbox is a real checkbox input with a label; a switch exposes `role=switch` with `aria-checked`
- a selected tab has `aria-selected`; a disabled control is `disabled` or `aria-disabled`
Also read annotations on anatomy layers (child nodes), not only on the component node, so a fact can
belong to a part ("this layer is the label").
**Why.** Replaces the rough "state shown only by looks" heuristic (82 findings on the test bed) with exact
expectations per role and per state. Curtis: without roles, output is visually right but behaviourally inert.
**Artifacts.** `a11y-check.mjs` (a per-role expectation table, run against the capture's produced states),
the props refresh in `audit.mjs` (child-layer annotations), the Step 1c snippet.
**Status.** IMPLEMENTED 2026-09-25 (branch commits 70e98dd and 97d04fe, not pushed). Inner-layer notes are
checked on the contract part with the same name. `roleContractExpression` in `a11y-check.mjs` checks each declared
role on up to 20 instances (toggle button, checkbox / radio / switch, text field with error state, tabs, disabled).
On the test bed nothing fires because `contract.authored.json` declares no roles yet.

#### I40. Explicit state concepts map + "disabled wins"  ·  source S25  ·  value: high  ·  cost: medium  ·  NEW
**What.** One `states` setting in `ds-config.json` mapping each concept (hover, active or pressed, focus,
disabled, selected, error) to the DS's own Figma prop and value (`disabled: { prop: isDisabled }`,
`active: { prop: state, value: pressed }`). Every check that guesses states today reads it instead:
contrast exemptions (`/disabled|inactive/`), the accessibility `STATE_MAP` words, the capture's state
recipes, `knownStateProps`. Then two new checks from the capture:
- **Disabled wins.** Force `:hover` (and `:active`) on a disabled instance; any visible change is a finding
  (the CSS lacks `:hover:not(:disabled)` guards).
- **Precedence.** Produce combinations (selected + hover, error + focus) and compare with the Figma
  variants for the same combination.
**Why.** Curtis's states map makes each DS's naming explicit instead of inferred ("my own memory was acting
as part of the schema format"). Guessed state names are a quiet source of wrong exemptions.
**Artifacts.** `ds-config.json`, `contrast-check.mjs`, `a11y-check.mjs`, `component-capture.mjs`, `state-check.mjs`.
**Status.** IMPLEMENTED 2026-09-25 (branch commit 54659d9, not pushed). `state-concepts.mjs` `conceptOf` reads `states`, else the name heuristics (a false boolean is never the state). Read by the contrast exemption, the capture and the props check (a declared enum axis is a state axis). Disabled wins: the capture forces :hover and :active on each disabled state and compares text colour, background, border colour and opacity; unreachable states (pointer-events: none, press on a natively disabled control) are skipped. The a11y class words (STATE_MAP) stay as they are: they map class names, not Figma props. Precedence is covered by I41 combinations. Test bed: no leaks (every disabled state has pointer-events: none), report unchanged.

#### I41. Every variant combination rendered and compared  ·  source S25 (companion post)  ·  value: very high  ·  cost: medium  ·  NEW
**What.** The contract's `propertyMap` already says which class or attribute realizes each variant value.
The capture applies each Figma variant combination (Size=L + icon, Size=S + no label, ...), measures it, and
compares height, padding per side, gap, radius, font and **which layers are visible** against the per-variant
values the Step 1c capture now records (`variants`, shipped in PR #4).
**Why.** "Padding varies across sizes depending on content composition" and "layer presence changes when props
interact" are exactly what the parity still cannot see: the capture only produces interaction states today.
Probably the largest remaining parity gap.
**Artifacts.** `component-capture.mjs` (a variant recipe beside the state recipe), `capture-compare.mjs`
(combination comparison), the Step 1c snippet (visible layers per variant).
**Status.** IMPLEMENTED 2026-09-25 (branch commit 68bf44b, not pushed). Combinations from `propertyMap` selectors, capped by
`codeReading.maxCombinations` (default 12); visible named parts per base, state and combination; height (where the
code fixes one) and layer visibility compared. Single-axis variants were already produced as states. Silent on the
test bed until its Figma snapshot is recaptured with `variants` and `layers`.

#### I42. Promoted primitives table  ·  source S25  ·  value: medium  ·  cost: medium  ·  NEW
**What.** A project-declared table from Figma styling to a system component with props (text style
`Body/Medium` + fill `Text/Secondary` + FILL means `<Text size="medium" color="secondary">`; a frame with
auto layout means `<Layout direction gap padding>`). Used by:
- **Gate [10] No hand-built DS components**: a styled raw element names the component and props to use.
- **`--check-ui`**: a generated raw `div`/`span` with DS styling is a finding with the replacement.
- **The catalog / `llms.txt`**: generators get the table, so they compose `Text` and `Layout` instead of styled divs.
**Why.** Curtis: composition code built from primitives is "off-system", customized HTML with inline styles.
**Artifacts.** `ds-config.json` (declared by the library owner, never inferred), `reimplementation-check.mjs`,
`ui-catalog.mjs`. North star check: the table is authored data; ship only if the owner keeps it.
**Status.** IMPLEMENTED 2026-10-01 (merged in PR 14). `primitives.mjs`: the owner's `primitives` table (CSS properties with values, or utility classes) read against a plain element's style attribute, JSX style object and class rules; the most specific entry wins. Audit block `🧩 Primitives written by hand`, the edit check, and a `## Primitives` section in llms.txt. The demo's Stack built by hand in Promo.jsx is now an overlay the tests lay over the demo (test/fixtures/demo-primitives), since the first measurement (g7) showed that changing the demo changes every evaluation task; every run records the project's hash and RESULTS.md holds it. `--check-ui` not covered (it reads component trees, not styled HTML). Found while building it: the I59 workaround check read only HTML (every .jsx/.vue/.tsx was taken for a built copy); fixed. Needs its own skill evaluation (reference/config.md changed).

#### I43. Per-component visual diff, code against Figma  ·  source S25  ·  value: high  ·  cost: medium  ·  NEW
**What.** For each component the capture renders on the styleguide, fetch the Figma node image (REST images
API, as Gate [2] already does, or the Figma MCP) and compare pixels: an advisory mismatch percentage per
component with both images and a diff image saved under `.parity-out/visual/`.
**Why.** Field-by-field comparison misses what only pixels show (icon position, alignment, a wrong glyph).
Curtis burned down each library against a snapshot report until it ran green.
**Artifacts.** `visual-regression-check.mjs` (reuse the fetch and diff), the capture's instance boxes.
**Status.** IMPLEMENTED 2026-09-25 (branch commit bc5cd25, not pushed). `codeReading.visual`: the capture saves each component (first mode, default state, scale 2, text boxes); `visual-diff.mjs` gets the Figma image from `.parity-refs/components/<name>.png` or REST (default variant of a set, cached by version), compares in Chrome on a canvas with one-pixel anti-aliasing tolerance, two scores (with and without text, the S26 text-masked score), worst first, diff images. Verified on the demo DS (a border only the image shows); REST path tested with a mocked fetch, not against real Figma (no token here).

#### I44. "Contract, not catalog": more test libraries  ·  source S25  ·  value: high  ·  cost: medium  ·  NEW
**What.** Every rule keys off what the project declares, never one library's quirks. To enforce it:
- a small fictional design system inside the repo (Figma snapshots + code + styleguide template), run end to
  end as a golden test of the whole audit, catching cross-gate regressions unit tests cannot;
- a third library with different conventions (class themes instead of media queries, a React component
  library) as a second calibration burndown.
**Why.** Calibration on a single private test bed risks tuning the engine to that library.
**Artifacts.** `test/fixtures/demo-ds/`, a golden report test. The fixture uses invented names only (private-name guard).
**Status.** First part IMPLEMENTED 2026-09-25 (branch commit cdb06ba, not pushed). `test/fixtures/demo-ds` (Tidepool: data-theme dark mode, React sources, gallery page, contract, authored semantics) with one deliberate difference per recent check; `test/demo-ds.test.mjs` golden with Chrome and a static golden without (`UPDATE_GOLDEN=1`). It found and fixed a false positive (a single-axis state compared with a two-axis Figma variant). Also found: on a project's first run the audit wrote the markup baseline the capture hashed, so the capture read as out of date until the second run; fixed in c4e4eb4 (the capture hashes only the class list it reads). The third library as a second calibration is still open. **Second part IMPLEMENTED 2026-09-30** (branch, not pushed). `test/fixtures/harbor-ds` (Harbor: Vue with <script setup>, a class dark mode, a --hb- prefix with dropSegments, snapshot files under their own names, an outline focus ring, fixed-height controls outside any flex column) and `test/harbor-ds.test.mjs` (static golden plus one assertion per planted difference: radius, Tone values named in lowercase, an icon-only button, an outline removed, an AGENTS.md with tone="error" and an undeclared variable). It exposed and fixed: the Vue option reader lowercased values (a false "Primary vs primary"); the phantom-border check read a focus ring as a border; Gate 11 counted outline lengths in :focus rules as literals with no Figma value (now listed apart); Gate [3m] no-shrink failed every fixed-height control (now advisory, a risk not a difference); a wrong default hid the variant option findings of the same prop (both listed now); the burndown counted counts and fix lines as findings, filed the static accessibility and steering findings under Contract completeness, and gave HbIconButton.vue to button (PascalCase file names now split, a line naming several components belongs to none). The fixture helpers moved to test/helpers.mjs, shared with the demo test.

#### I45. Burndown mode  ·  source S25  ·  value: medium  ·  cost: low  ·  NEW
**What.** A per-component view of open findings, most first, to work a library down one component at a
time with `--component` (Curtis's start / fix / end loop). The "Since the last run" ledger (PR #4) already
gives the progress signal; this adds the per-component grouping and a short "next up" line.
**Artifacts.** `audit.mjs` (group the ledger's findings by component), `run-diff.mjs`.
**Status.** IMPLEMENTED 2026-09-25 (branch commit ecf6896, not pushed). `run-diff.mjs` `burndown` / `burndownLines`: one 📉 line after Since the last run, per component most first with the last run's count, cleared components and a next up line.

#### I46. Figma prop types for compile-time parity  ·  source S25  ·  value: medium  ·  cost: medium  ·  NEW
**What.** Emit TypeScript types from Figma's component properties (one union per variant prop, an interface,
defaults), like Curtis's `contract.ts`. A React or Vue project checks its component props against them with
`satisfies`, so prop drift shows in the editor and in `tsc`, not only in the audit.
**Artifacts.** `contract-gen.mjs` (a `contracts/figma-props.d.ts` beside the JSON contracts).
**Status.** IMPLEMENTED 2026-09-25 (branch commits 29ef6de and follow-up, not pushed). `figma-props.mjs` writes `contracts/figma-props.d.ts` (`contracts.propTypesOut`): <Name>FigmaProps and <Name>FigmaDefaults, code names as the props check uses them, states left out (the rule is shared with the props check). Verified with tsc: a matching chip compiles, lower-case sizes are rejected; the test bed's 47 interfaces compile.

**Out of scope from S25.** Generating components (scaffold, styles, stories) is a generator's job; the parity
checks that code and design agree. Tokens as CSS variables, icon export and Storybook stories are covered or not needed.

#### I47. A record of what both sides last agreed on (last-agreed baseline)  ·  source S26  ·  value: very high  ·  cost: medium  ·  NEW
**What.** Keep the last matching value of every compared fact (token per mode, padding, gap, radius, prop,
variant option, colour) in a committed baseline. On each run, compare each side against it as well as against
each other:
- only Figma changed: code is behind;
- only code changed: Figma is behind (the code-to-design direction, I24);
- both changed: a conflict for a person to decide.
Adds a fourth authority setting to the authoring plan beside `figma`, `code` and `shared`: **`last-mover`**
(whoever changed the fact last leads), the ping-pong ball as a rule with no permanent winner.
**Why.** Comparing Figma and code side to side cannot say which side moved, which is exactly what makes teams
bounce changes back and forth. Southleft's differ never compares side to side.
**Artifacts.** A new `parity-agreed.json` (per fact: value on each side, run and commit when they last matched),
`capture-compare.mjs` and the gates' neutral differences (`.parity-out/differences.json` in AUTHORING-PLAN.md),
the authority layer. Written only by a clean run or an explicit decision, never by a failing run.
**Status.** IMPLEMENTED 2026-09-25 (branch commit aaec722, not pushed). `agreed.mjs` + `parity-agreed.json`; every
compared fact recorded by `capture-compare.mjs`; measured differences tagged Figma moved / code moved / both moved;
counts in the report; never written in a git hook. Verified on the test bed by moving one Figma value and one code value.
The `last-mover` authority is added to AUTHORING-PLAN.md; the authority layer itself is not built yet. Gate 3's own
token report is not tagged yet (the record covers tokens through the capture comparison).

#### I48. Every finding says which way to send it back  ·  source S26  ·  value: high  ·  cost: medium  ·  NEW
**What.** With I47, each finding names its direction and carries the hand-back:
- **Figma moved.** The code change at `file:line` (today's `→ set var(--x)`), offered as a patch.
- **Code moved.** The Figma change to make: which component, which variant, which property and value.
Applied only when a person says so (the user's rule: never change Figma or code automatically).
**Artifacts.** `capture-compare.mjs` `measuredLine`, `--fix`, the planned `--fix-figma`.
**Status.** IMPLEMENTED 2026-09-25 (branch commit 3f0733b, not pushed). `handback.mjs`: `code-changes.diff` (verified to
apply with `git apply` on the test bed) and `figma-changes.md`. Patches only single-value declarations and two-value
`padding`; the rest are counted as by hand. A `--fix-figma` command is not built (the Figma list is for a person).

#### I49. The reason travels with the change  ·  source S26  ·  value: high  ·  cost: low  ·  NEW
**What.** Each directional finding carries who changed the value and why:
- **Code side.** The commit behind the changed line (`git log -L` on the rule's `file:line`): author, date, message.
- **Figma side.** The file version's label, description and author (Figma REST `/files/:key/versions`).
**Why.** TJ: communication is what breaks first at a handoff. The designer sees why the engineer changed it, and
the other way round. Feeds the "why" field of I33 (decision status and reason).
**Artifacts.** `capture-compare.mjs` findings, `audit.mjs` report, the design-intent layer.
**Status.** IMPLEMENTED 2026-09-25 (branch commit 7b1c00e, not pushed). `change-reason.mjs`: git blame on each
finding's `file:line` (measured differences, state and token contrast) as a `↳` line; the Figma file's latest named
version as one report line when a token is set. Not yet fed into the design-intent layer.

#### I50. Catch changes that keep bouncing back and forth  ·  source S26  ·  value: medium  ·  cost: low  ·  NEW
**What.** From run history (`parity-history.json` and the "Since the last run" ledger), flag a fact that changed
sides repeatedly (for example three times in ten runs) as churn: the team has not decided who owns it.
**Why.** Southleft asserts that promotion converges instead of ping-ponging; churn is the measurable sign it doesn't.
**Artifacts.** `run-diff.mjs`, the ledger (keep the last N runs, not only the last one).
**Status.** IMPLEMENTED 2026-09-25 (branch commit 8d61cf7, not pushed, with I51). In `agreed.mjs` instead of the run ledger: `seen` per fact keeps both values at the last run and the last 10 moves ({at, side, lead}); `churn` lists a fact whose moving side switched 3 or more times as No clear owner. Verified on a test bed copy by bouncing one radius six times.

#### I51. Show who actually leads  ·  source S26  ·  value: medium  ·  cost: low  ·  NEW
**What.** Per area (tokens, components, states), which side changed first over recent runs: "code moved first in 80%
of token changes this month". Descriptive only; it suggests an authority setting, never imposes one.
**Why.** TJ: with a skewed team ratio the source of truth "gets defaulted into". Making the real pattern visible lets
the team choose on purpose.
**Artifacts.** `audit.mjs` advisory section, reading I47's record over time.
**Status.** IMPLEMENTED 2026-09-25 (branch commit 8d61cf7, not pushed, with I50). `leaders` counts the moves that broke an agreement over 30 days, per area (tokens, spacing, colour, typography, size and shape, layers, states and variants); one descriptive line in the audit.

#### I52. Work in progress is not drift  ·  source S26  ·  value: medium  ·  cost: low  ·  NEW
**What.** A component on only one side that is marked experimental or not yet built (contract `status`, I33, or
`knownUnimplementedComponents`) is listed as **in progress**, and never fails the run. It becomes a real difference
once both sides have it, or when its status says shipped.
**Why.** Southleft's differ has a `pending` group: a never-synced contract is workflow state, not drift.
**Artifacts.** `coverage-check.mjs`, the gates that report missing components, contract `status`.
**Status.** IMPLEMENTED 2026-09-25 (branch commit ca2b6dd, not pushed). `in-progress.mjs`: knownUnimplementedComponents plus experimental components on one side only; read by every gate that skipped the bare list; Gate [25] lines IN PROGRESS and READY TO COMPARE. The owner's list is never edited.

#### I53. "Clean" must not mean "fully checked"  ·  source S26  ·  value: medium  ·  cost: low  ·  NEW
**What.** Per component, a count of facts compared, facts not comparable (with each reason) and facts not captured.
The measured comparison already computes `notComparable` with reasons; show it as a census so a green result is
honest about its reach.
**Why.** Southleft's census exists "so clean is never confused with pixel-right".
**Artifacts.** `capture-compare.mjs` (already returns it), `structure-check.mjs` and the coverage gate (print it).
**Status.** IMPLEMENTED 2026-09-25 (branch commit 61dfa54, not pushed). `censusOf` / `censusLines` in `capture-compare.mjs`; a census line under MEASURED (facts compared, not comparable, components not captured) and the three least checked components with their main reason; `.parity-out/census.json` per component. Test bed: 175 facts on 35 components, 22 not comparable, none missing.

#### I54. Accept individual differences, not whole gates  ·  source S26  ·  value: medium  ·  cost: low  ·  NEW
**What.** An accepted-drift list per finding (component, field, the value accepted), with ratcheting: once a finding
is fixed it leaves the list and cannot return silently. Today `--baseline` accepts a whole failing gate.
**Why.** Accepting "this one known padding difference" lets everything else in the same gate keep blocking.
Southleft's `parity/baseline.json` works fact by fact.
**Artifacts.** `parity-baseline.json` (extended format), `audit.mjs` baseline classification.
**Status.** IMPLEMENTED 2026-09-25 (branch commit b455111, not pushed). `baseline.mjs` `findingKeys` / `loadBaselineFindings`; `--baseline --findings` writes `findings` ("<gate> :: <❌ line>"); a failing gate is debt when all its ❌ lines are accepted; new lines and fixed lines are listed. Verified on a test bed copy: one broken radius accepted (exit 0), then fixed plus another broken (4 fixed, 10 new, exit 1).

**Notes from S26 on existing items.**
- **I43 (visual diff).** Add a second score with text masked out, so font rendering differences don't hide real
  ones, and keep a worst-first fix list.
- **Figma's default variant is positional.** Whichever variant sits top-left in the set is the default, so reordering
  variants silently changes it. The props gate already compares defaults; its finding could say the cause may be a
  reordering.
- **Catalog scale.** Split `catalog.json` / `llms.txt` into a small index plus one file per component once a system
  is large (Southleft: about 4K tokens for the index instead of 19K).

**Out of scope from S26.** Generating the other surface (React from Figma, Figma from React) is Southleft's product;
the parity checks and reports. Their rule that the contract never carries behaviour matches ours: we compare what the
canvas can express, and check behaviour through the accessibility checks.

#### I55. Cookbook: the guide as rules, recipes and reference, adopted only when measured better  ·  source this session  ·  value: high  ·  cost: high  ·  DONE (adopted 2026-09-29, results in test/skill-evals/RESULTS.md)
**What.** The guide (one 268 KB file, about 70 thousand tokens, loaded whole on every run) becomes a short main file
(the rules that always apply and an index), `cookbook/` task recipes and `reference/` moved verbatim, read on demand
with `--recipe` / `--reference`. The agent's part shrinks: engine commands print a `NEXT:` line, never-rules are
Claude Code hooks, `--summary` gives the report to relay. A native Skill (`SKILL.md`) is measured as a third variant.
**Why.** Less irrelevant context per run, fewer wrong steps, recipes that can be tested against the demo design system.
**Risks and mitigations.** Content lost (coverage test against the baseline guide), a skipped recipe (rules stay in the
main file, index test, outcome scoring), drift (duplication and link tests), broken cross-references (reference test),
rotting recipes (`recipe-check` blocks run in tests), regrowth (size cap), broken installs (same file name, `--recipe`
from the engine, `--doctor`, tested on fresh, linked and copied installs), noise (repeated runs, re-run on a drop),
tuning to the test (held-out task set decides), rollback (`guide-monolith` tag, `--guide classic`), cost (per-run budget).
**Adoption rule.** Measured with isolated `claude -p` runs on 18 tasks (10 development, 8 held out), two models: no task
worse, no new rule violation, total pass rate equal or higher, fewer input tokens. Otherwise not adopted.
**Status.** DONE (adopted 2026-09-29, merged in PR 7). Superseded as the working guide by I56; results in test/skill-evals/RESULTS.md.

#### I56. Deterministic core, thin agent layer: the skill works the same on any model  ·  source this session (the owner's architecture note)  ·  value: high  ·  cost: medium  ·  DONE (adopted 2026-09-29)
**What.** Three layers. The engine decides everything that can be computed: comparisons, rules, scope, the real state
of the data, what failed, the `NEXT` step, the result messages, the safety gates. The guide teaches the model to use
the engine: when to run which command, how a human request maps to an operation. The model understands the request,
picks the operation, runs it and relays the result. Rule for every change: if a decision can be made
deterministically, the model does not make it. The agent layer stays as thin as possible, and each model failure in
the evaluation is answered by asking why that was the model's decision when the system could have made it.
**Why.** A smaller model fails where it has to judge on its own (the 2026-09 evaluation: Haiku 44 to 48 of 60 against
Sonnet 100 of 100, on every guide). The goal is not a smarter Haiku but less for it to reason about, so the Haiku and
Sonnet curves close in with each version.
**Each Haiku failure, moved to the system.**
- Claimed a Figma refresh that never ran (every guide): the SUMMARY always states the data state in one line (refreshed
  now, or not refreshed, snapshots from a date and age), and `NEXT` names the refresh step. The model only relays it.
- Questions answered from memory (toggle note, visual comparison): routing moves into the engine. One entry command
  takes the request text and prints the matching recipe and the exact command; the answers to how-to questions are
  printed by the engine, not paraphrased.
- The engine searched for instead of run when the command is not on PATH, or the skill opened instead of the engine
  run: the guide gives one exact path; the entry command is the only thing the model has to start with.
- Pasted step lists (asked instead of running, or followed the steps): the entry command takes the whole request and
  returns the full-audit command for an unclear one.
- Code changed or a patch applied without a request: hooks read the person's latest message (`transcript_path`) and
  refuse a source edit or a hand-back apply that no message asked for; allowed when one did (this also ends the double
  confirmation on "now fix it").
**Measure.** Every change passes the I55 evaluation on Haiku and Sonnet (Opus optional); adoption also needs a floor on
Haiku, not only "no worse than before".
**Status.** Done (2026-09-29). Built and measured in two rounds.
- Round 1 (f586990: `--route`, the data line, message-aware hooks), full measurement, rescored. Sonnet 100/100 (dev and
  held-out), input tokens lower on 17 of 20 tasks. Haiku held-out 88% against the cookbook's 92%, dev 97% against 93%,
  violations 0 against 2. Real misses left: the router skipped (a pasted step list), an offer to change Figma, a false
  "the snapshots already have yesterday's change", and an unscoped accept (the router's own gap).
- Round 2 (158802e), each miss answered by the system: the router runs as a UserPromptSubmit hook on every
  `/rms-figma-code-parity` request; SAY lines give the exact words for what the skill cannot do (change Figma, refresh
  without a Figma tool); accept-debt is scoped to a named component; a scoped `--baseline` adds to the file instead of
  dropping the other components' accepted debt (a real engine bug). Checked on a real headless Haiku run: the hook fires,
  the agent skips `--route` and says the SAY line as written.
- Round 2 measured and adopted: Sonnet 100/100, Haiku 110/110 (held-out 34/34), no rule violation; mean cost per request $0.13 (Sonnet) and $0.04 (Haiku), against $0.68 and $0.23 for the one-file guide. The adoption rule passes against the baseline and the cookbook on both models. Results in test/skill-evals/RESULTS.md.
- Cookbook migration closed with it: older projects get the router hook on their next run, README section, opt-in local usage log, fresh install checked (linked, copied, hook), and a test that fails when the guide set changes without a fresh evaluation.

#### I57. Agent steering files tell the truth  ·  sources S28, S27  ·  value: very high  ·  cost: medium  ·  NEW
**What.** Find the project's agent-facing prose files on their own (`AGENTS.md`, `CLAUDE.md`, `DESIGN.md`,
`.cursorrules`, `.cursor/rules/*`, `.github/copilot-instructions.md`, skills folders, a hand-written `llms.txt`;
never the files the parity generates) and check every design-system name they state against the source of truth:
- a token or CSS variable that does not exist (a ghost token);
- a component name that is not in the catalog;
- a prop name, or a prop value, that the component does not have (`tone="error"` when the API says `danger`), with the
  real one next to it;
- a hand-copied list of components, tokens or props (I21), with the one line that should replace it: point at the
  generated index.
**Why.** Southleft measured it: one wrong value in AGENTS.md caused 10 of 19 hard failures in 90 generations, and none
in bare runs. Stale, duplicated, authoritative-looking prose is an extra source of hallucination. Gate 8 and I21 already
check part of this, but only on files declared in `ds-config.json`, and neither checks prop names or values.
**Artifacts.** `docs-truth-check.mjs` (extend it to props and components), `duplication-check.mjs` (auto-discovered
surfaces), the component API from the code capture and `figma-component-props`, the report (advisory: a wrong fact in
a steering file is a finding with its file and line, never a failed build unless the project opts in).
**Measure.** A fixture with a steering file holding one wrong prop value, one ghost token, one unknown component and one
copied list: each is found with file, line and the right value; the parity's own generated files are never reported.
**Status.** IMPLEMENTED 2026-09-30. `steering-check.mjs`: finds AGENTS.md, CLAUDE.md, DESIGN.md, GEMINI.md, **2026-09-30:** with the owner's exact-name rule, a prop name written in code (Tone="danger") other than the way the code writes it (tone) is flagged too, attribute form only (never prose), and a value suggestion uses the code's prop name.
.cursorrules, .windsurfrules, Copilot instructions, a hand-written llms.txt, and every .md/.mdc/.txt under .cursor/rules,
.github/instructions, .claude/skills, .claude/commands, .agents and skills; skips anything the parity generated. Checks
CSS variables (var() or a backticked name of the system's own families), token paths (as code, or a near-miss typo),
component tags (in a file that uses this system), and prop values (name="value", or a listed set anchored by one real
value) against Figma values and the code's own options, with size words and value synonyms understood. The same files
now feed the I21 list-duplication check. A 🧭 block in the report, advisory; `"steering": false` turns it off.
Measured: the four planted errors on the demo found with the right value each; 0 findings on the five real documents
of a private test bed.

#### I58. Props paired by intent, and the wrong names an agent will guess  ·  sources S27, S28  ·  value: high  ·  cost: medium  ·  NEW
**What.** Pair Figma and code props, and their values, by what they do rather than by spelling (Figma `Size=L` with
`size="large"`, `State=Error` with `tone="danger"`, `Disabled=True` with `isDisabled`), each pair with its confidence.
From the pairs, the project's naming convention (I36) and any wrong value I57 finds, emit a **rejected names** table in
the contracts and the catalog (`error → danger`), and have `--check-ui` answer a rejected name with the right one.
**Why.** Cristian: props do not converge like tokens, the stable thing is a prop's intent. Southleft: the compile axis was
the weakest, and deriving the vocabulary from the prop catalog, with 147 rejected names in the contract, fixed it.
**Artifacts.** `component-prop-check.mjs`, `state-concepts.mjs` (I40 already maps state words), `naming-convention.mjs`,
`contract-gen.mjs`, `ui-check.mjs`.
**Measure.** On the demo and a test library, every prop pair the parity finds today is still found, value pairs are added,
and a generated UI using a rejected name gets the canonical name in its finding.
**Status.** IMPLEMENTED 2026-09-30, with the owner's rule: parity on a value is the exact name, letter case included
(only a boolean is written two ways, Figma True and code true). The pairing by meaning never changes a verdict; it only
explains a difference and feeds suggestions. `prop-vocabulary.mjs` (synonyms, size spellings, `counterpart`,
`rejectedNames`, `rightFor`). The props gate compares option and default names exactly (it used to ignore case and
separators) and adds `(the code likely names it "large")` or `(the code writes it "large")`. The catalog gets
`codeValues` when the code names values differently and a `rejected` table per enum prop; `--check-ui` checks a code
prop against the code's values and answers a rejected name with `use "…"`. The I57 steering check no longer accepts a
differently named value (`md` for `M` is reported, with `M`). Prop NAMES still pair by normalized spelling (Figma
`Size` with code `size`); whether that should be exact too is the owner's call.

#### I59. A workaround around a component is a missing API  ·  source S28  ·  value: medium  ·  cost: high  ·  NEW · LATER
**What.** When product screens build something around a design-system component to do what it cannot (a button placed
over a text input for show/hide, a wrapper that adds a trailing action), report it to the design-system side as a
missing slot or prop on that component, not as the screen's mistake.
**Why.** Southleft's lowest task passed every mechanical check and failed judgment for this reason, and more
documentation did not move it: "a missing API is not a documentation gap, the fix lives in the component". I48 already
sends findings the right way; this adds the case where neither Figma nor code has the API yet.
**Artifacts.** Gate 10 (reimplementation), the screen snapshots, I48's hand-back. Needs real product screens, so it
waits for a test bed that has them.
**Status.** Code side IMPLEMENTED 2026-09-30 (branch, not pushed). `workaround-check.mjs`: an action the screen built (button, link, role=button, a -btn/-button class, never a design-system component: a menu or a close button inside another component is the system's own composition) whose CSS positions it absolutely, laid over a host found by its own selector's ancestor, the class it is named after (search-clear → search-input, entry-focus-btn → a class list with the component), or the markup around it; the host must be a design-system component or a text field. A component's own source and a built file with its .src beside it are not read. A 🧩 block, grouped by host, for the design-system side; `"workarounds": false`. Calibrated on the private test bed's plugin screens: first pass 15 findings, mostly noise (built ui.html read twice, menus and close buttons that are the DS's own composition, wrong hosts in JavaScript-built markup); after the three fixes exactly the two real cases (a hand-built search field with a clear button laid over the input; four action buttons laid over the DS row component). Harbor plants a remove button over the badge and a clear button over a search field. Figma side (a layer laid over an instance in a screen frame) waits for the screens snapshot to be captured.

#### I60. Does your guidance help? Context levels in the eval  ·  sources S28, S16, S17  ·  value: high  ·  cost: medium  ·  NEW
**What.** Extend the I7 eval (`eval-run`) with Southleft's method: the same intent-level tasks run bare, with the
project's own steering files, and with the parity's generated artifacts (llms.txt, contracts, prop types), repeated,
and scored mechanically by the checks the parity already has (imports and API fidelity from the catalog, token
discipline from `eval-check`, static a11y, compile with `figma-props.d.ts`), judgment optional. The report says, per
level, what the guidance adds or costs.
**Why.** Both S27 and S28 found bare agents doing better than guided ones on the mechanical axes; a team cannot know
which of its files help without measuring. Opt-in: it spends model tokens.
**Artifacts.** `eval-run.mjs`, `eval-check.mjs`, `ui-check.mjs`, I27 metrics; the skill harness in `test/skill-evals/`
is the model (isolated runs, refused runs never scored, resume).
**Status.** IMPLEMENTED 2026-09-30 (branch, not pushed). `eval-run.mjs` `--levels bare,steering,parity` (or `evals.levels`): each case runs per level with $EVAL_LEVEL and $EVAL_CONTEXT (nothing; the project's instruction files found by the steering check, joined into evals/.context/steering.md; contracts/llms.txt), scored by the DS-conformance core plus the static accessibility check (a clean case has neither a violation nor an accessibility finding), one line per level with the difference from bare; a level with nothing to give says why and is not run; history in evals-history.json. Needs evals.generate.cmd; spends the team's tokens; never gates. Docs: README now, reference/usage.md held for the next guide-set evaluation.

#### I61. A bare variant for the skill's own evaluation  ·  sources S27, S28  ·  value: high  ·  cost: low (runs cost money)  ·  NEW
**What.** Measure a variant where the command file is only a few lines (run `rms-figma-code-parity --route "<request>"`
and follow its output) against the adopted guide, under the same adoption rule.
**Why.** Since I56 the engine routes every request and gives the command and the words, so most of the guide may now
be the kind of context both articles found to cost more than it gives. If the bare variant holds, the guide shrinks
again and every request gets cheaper; if it drops, the evaluation says which rule still has to be written down.
**Artifacts.** `test/skill-evals/variants.mjs` (a new variant), the guide set hash in `RESULTS.md`.
**Status.** MEASURED 2026-09-30, NOT ADOPTED. Sonnet 100/100 both; Haiku 59/60 against 60/60 with one new
violation (an unasked theme edit on refresh-no-figma); cost almost the same ($0.118 vs $0.130 Sonnet, $0.046 vs $0.047
Haiku, Haiku reading more tokens bare). The guide is ~7k of ~120k tokens per request and still prevents a class of
mistakes. Found by it: the hook took "the design changed yesterday" as a change request; it now counts only asking verb
forms. Results in RESULTS.md.

#### I62. Check every UI edit, not only when asked  ·  sources S30, S29  ·  value: very high  ·  cost: medium  ·  IMPLEMENTED (branch)
**What.** An opt-in Claude Code PostToolUse hook, installed by `--install-hooks` beside the guard: after an agent edits
a UI file (markup, styles, a component), it runs the checks `--check-ui` and `eval-check` already have on that file and
returns only what the edit added (an invented variable, a raw colour or size where a token exists, an invented prop or
value, a hand-built copy of a design-system component), with the right name. Silent when the edit added nothing.
**Why.** S30 measured it: generated rules and an MCP server changed nothing for Haiku (it never called the MCP), the edit
hook took invention to 0 in 14 of 15 runs. The skill today checks only when someone runs it; the agents that write most
of the drift never do.
**Artifacts.** `guard.mjs`, `hooks-install.mjs`, `ui-check.mjs`, `eval-check.mjs`, `reimplementation-check.mjs`.
Measured with a new eval task ("add an empty state to the settings screen") on both models, with and without the hook.
**Status.** IMPLEMENTED 2026-09-30 (commit 03060de). `edit-check.mjs` as a PostToolUse hook in guard.mjs (matcher Edit|Write|MultiEdit, installed with the guard; older installs upgraded on their next run; "editCheck": false). Reads only what the edit added (Edit/MultiEdit: new lines; Write: lines not in HEAD). Findings: a hand-written colour (the token with that value, else "not a design-system colour"), var(--x) declared nowhere nor in the file, a prop value or name on a design-system component tag (PascalCase or a prefixed custom element; the HTML element never), via steeringTruth/steeringFindings. Silent on token definitions (even minified), the theme, comments, link fragments, data tables, canvas painting, built files with a .src. Returns {decision:"block", reason}. Calibrated on the private test bed read as new files: 69 → 3 findings, all hand-written UI colours. Not yet measured with agents: the eval harness installs the hooks, so the next evaluation includes it; a task that writes new UI ("add an empty state") is still to add.

#### I63. Say what to use, not only what not to use  ·  source S29  ·  value: high  ·  cost: low  ·  IMPLEMENTED (branch)
**What.** The generated `llms.txt` and `--query` open with one mandate: the design system is in this project, these are
its components, build nothing by hand that one of them covers, and ask `--query` before guessing a name. The steering
check (I57) also notes an instruction file that only lists what to avoid.
**Why.** S29: an AGENTS.md that said what not to use got 16 of 57 generations onto the system; one added sentence that
the package is installed got 43 of 55. Ours says nothing of the kind today.
**Artifacts.** `contract-gen.mjs` buildLlms, `query.mjs`, `steering-check.mjs`; measured with I60's parity level.
**Status.** IMPLEMENTED 2026-09-30. llms.txt opens with "**Use these components.** This design system is part of this project: build nothing by hand that a component below already covers, and write every name exactly as written here; ask `--query` instead of guessing". The `--query` NEXT line says the same. The steering-check note on files that only list what to avoid is not built (a heuristic, noisy). To measure: I60 parity level.

#### I64. Avoidance is a failure, and the verdict is the worst dimension  ·  source S29  ·  value: high  ·  cost: low  ·  IMPLEMENTED (branch)
**What.** In `eval-run` and `--check-ui`, a candidate that uses no design-system component where the system owns the
role (a native button styled like the button) fails, never reads as clean; a level's verdict is its worst dimension, not
the mean, so a clean token score cannot hide a hand-built screen.
**Why.** "Hand-rolls everything. Nothing to get wrong on API checks, so it passes them. The worst outcome, and it looks
clean." `eval-check` counts DS classes used as a metric only.
**Artifacts.** `eval-check.mjs`, `eval-run.mjs`, `ui-check.mjs`, `reimplementation-check.mjs`.
**Status.** IMPLEMENTED 2026-09-30. `eval-check` `usesComponent` (its class as a whole word, or a tag of its name, with a short library prefix) and an `avoided-component` violation when the case's expected component is not used; the verdict already was the worst dimension (a case is clean only with no violation and no accessibility finding), so a hand-built candidate now fails. `eval-run` no longer appends the component to the prompt; the summary and each level line add "N avoided the system" when cases name a component. $EVAL_COMPONENT still reaches the generate command (documented); the reference should advise not passing it to the agent, next guide batch.

#### I65. Tailwind: theme tokens and utility classes  ·  sources S30, this session  ·  value: high  ·  cost: high  ·  IMPLEMENTED (branch)
**What.** Read Tailwind v4 `@theme` variables (`--color-surface-base`, `--spacing-2`, `--radius-control`) as tokens by
stripping the type prefix before the naming check, and read utility classes (`h-9`, `rounded-control`,
`bg-action-primary`) and arbitrary values (`rounded-[4px]`, `w-[137px]`) against Figma and the scale.
**Why.** A Tailwind project today fails all its tokens as UNINVENTED and the literal checks never see its classes, so
`rounded-[4px]` against Figma's 6px goes unseen. S30 counts arbitrary Tailwind values as one of its main signals.
**Artifacts.** `naming-convention.mjs`, `css-values.mjs`, `collect-raw-values.mjs`, `eval-check.mjs`; a Tailwind fixture.
**Status.** IMPLEMENTED 2026-09-30. Part one (8b85ac6): tailwind-check.mjs, arbitrary values against @theme by namespace (the utility to write, keeping variants, sign and opacity; or not a design-system value), a 🎯 block, and the edit hook. Part two (2365d8a): namingConvention preset "tailwind" (colorNamespace color; space→spacing, radii→radius), a theme variable used through its utility counts as used. Trial project: 17 false fails → the real ones. Not yet: utility classes compared with Figma values directly (h-9 against a 32px Figma height), a Tailwind fixture in test/fixtures, --init detecting Tailwind to set the preset.

#### I66. Generated UI compiles against the real types  ·  source S29  ·  value: medium  ·  cost: medium  ·  IMPLEMENTED (branch)
**What.** When the project has TypeScript, `eval-run` and `--check-ui` on a .tsx file run `tsc --noEmit` against the
component types (or `figma-props.d.ts`) and report each type error with the allowed values.
**Why.** S29: only 10 of 55 guided generations compiled; the errors clustered on a few names a catalog check can miss
(strings into number props, icon names outside the registry).
**Artifacts.** `eval-run.mjs`, `ui-check.mjs`, `figma-props.d.ts`.
**Status.** IMPLEMENTED 2026-09-30 (9b1a424). Types from catalog.json rather than figma-props.d.ts (the candidate targets the code: code names and code values, Figma's where none), an index signature so only what the catalog states is checked, imports blanked (line numbers kept), the code's own export name mapped (HbBadge → badge). tsc from the project or the PATH, ~1 s per candidate. In eval-run only; the edit hook does not run it (too slow per edit).

#### I67. A Figma call budget  ·  source S31  ·  value: high  ·  cost: low  ·  IMPLEMENTED (branch)
**What.** Count the Figma calls a refresh makes and print them; skip the refresh when the file's lastModified equals the
one stored with the snapshots; fetch nodes in batches; and when Figma answers a daily or monthly limit (not a
per-minute one), stop at once and say which limit and when it resets, instead of retrying.
**Why.** A Professional Full seat gets 200 MCP calls a day, a View seat 6 a month. A refresh that retries into a daily
limit wastes the run and the user's quota for the day.
**Artifacts.** `figma-fetch.mjs`, audit.mjs's `_figmaFileModified`, `cookbook/refresh-figma.md`.
**Status.** IMPLEMENTED 2026-09-30. `figma-fetch.mjs`: `stats` {calls, failed, limit}; a Retry-After over 120 s (FIGMA_LONG_LIMIT_S) is a long limit, recorded with X-Figma-Plan-Tier and X-Figma-Rate-Limit-Type, and every later call in the run answers 429 with no network; the same GET is asked once per run (replayed as text). audit.mjs reads the version first; `.parity-out/figma-refresh.json` stamps a complete refresh (version, a key of config and engine hash, the snapshot files, the reason and the inventory) and the next run skips when unchanged (FIGMA_REFRESH=force). change-reason now goes through the counted fetch. Fake-API trial on Harbor: 8 calls → 4 per refresh, 1 when unchanged, 1 when limited. Gate scripts run as their own processes (icon freshness) are not counted. cookbook/refresh-figma.md to mention it in the next guide batch.

#### I68. An eval prompt must not name the answer  ·  source S29  ·  value: medium  ·  cost: low  ·  IMPLEMENTED (branch)
**What.** `eval-run` warns when a case prompt names a design-system component (whole word, any case): the score then
measures reading the prompt, not finding the component. The expected component moves to the case's `component` field.
**Why.** S29's prompt-leak linter fails such a task suite.
**Artifacts.** `eval-run.mjs`, `reference/usage.md` (evals).
**Status.** IMPLEMENTED 2026-09-30. `promptLeaks(cases, names)`: whole word, any case, camelCase and kebab split; a warning line per case before the run.

#### I69. An instance layer named differently from its component  ·  source this session  ·  value: medium  ·  cost: low  ·  NEW
**What.** The Figma hygiene lint (I23) flags an instance whose layer was renamed ("Button Tertiary" for buttonTertiary).
**Why.** An agent reading the file through the Figma MCP sees the layer name and writes it as the component's name.
**Artifacts.** `figma-hygiene.mjs` and the hygieneOf snippet in `cookbook/full-audit.md` (guide set: needs an eval).

#### I70. Which side changed last, per component  ·  source S32  ·  value: high  ·  cost: low-medium  ·  NEW
**What.** Record each library component's last publish in Figma (`GET /v1/files/:key/components`, `updated_at`, one call) beside the snapshots, and compare it per component with when the code last matched it (the agreed record, I47) and with the git date of its code file (`componentFiles`, the locator). Report "button was republished in Figma on 20 Sep, after the code last matched it (12 Sep)" or "the code changed after Figma's last publish", before any value refresh, and scope the next refresh to the republished components (fewer calls, I67).
**Why.** S32: whichever side changed last is the source of truth; the system must notice which one has not caught up. The engine compares values (I47, I51), not when each side last moved, and needs a full refresh to see a Figma change. Dates need no code reading, so they work for any platform (SwiftUI, Compose) with only the component map.
**Artifacts.** `figma-fetch.mjs`, a `figma-components.snapshot.json`, `component-locator.mjs`, `agreed.mjs`, a 🔁 advisory block.

#### I71. Warn at commit, block at push, and only what the code already uses  ·  source S32  ·  value: high  ·  cost: medium  ·  NEW
**What.** Two moments, two severities: the pre-commit hook warns and never blocks; the pre-push hook (or CI) blocks, and blocks only differences on components and variants the code already calls. A variant Figma added that no screen uses yet is listed as not integrated (like I52), not failed. Needs a usage map: the component tags and prop values the code writes (the edit check's tag reading, the catalog).
**Why.** S32: "A push only halts if the code already calls it." A new Figma variant should not stop the team's work before anyone builds it.
**Artifacts.** `cookbook/ci-and-hooks.md` (both hooks), a usage reader, the verdict's severity.

#### I72. A component only in code gets its Figma spec  ·  source S32  ·  value: medium  ·  cost: low  ·  NEW
**What.** For a component that exists only in code (in-progress.mjs already lists it), the hand-back (I48) writes what to build in Figma: name, props and their values, the tokens its styles use, so the match can be recorded. The engine never writes Figma; the person builds it, or an agent through the Figma MCP when the person asks.
**Why.** S32: a code-first component gets a follow-up so both sides hold it.
**Artifacts.** `handback.mjs` (figma-changes.md), `in-progress.mjs`.

#### I73. The agent cannot accept its own differences or silence the checks  ·  source S33  ·  value: very high  ·  cost: low  ·  NEW
**What.** The guard asks before an agent's hand edit to the accepted debt (`design-system-engine-baseline.json`), the exception lists, the approved reference images (`.design-system-engine-refs/`), or a command that accepts them (`--baseline`, the visual-regression update), unless the person's latest message asks for it (as the hand-back apply does, I56). The edit check hands back an added `eslint-disable`, `stylelint-disable`, `@ts-ignore` or `@ts-expect-error` on a UI line.
**Why.** S33: "Once it runs the checks, it'll also find ways round them": switching rules off in a comment, ignoring type errors, updating pictures. Today the guard protects the Figma snapshots, ds-config.json, commit, push and the hand-back, not these.
**Artifacts.** `guard.mjs` and its tests, `edit-check.mjs`, `cookbook/ci-and-hooks.md`.
**Status.** IMPLEMENTED 2026-10-01 (merged in PR 14). `guard.mjs`: the accepted debt, the exception map and the approved reference pictures (replaced or deleted; a new picture is not approved yet) ask unless the person's latest message asks for it, the engine's `--baseline` too; the agreed record is denied (the audit's alone). Shell writes read word by word (`shellTargets`: redirect, tee, sed -i, perl -i, rm, mv, cp, git rm, git mv). `edit-check.mjs` hands back eslint-disable, stylelint-disable, oxlint-disable, biome-ignore, @ts-ignore, @ts-expect-error and @ts-nocheck that start a comment, with the rules they name. Measured in g8.

#### I74. Accessibility in the edit check  ·  source S33  ·  value: high  ·  cost: low  ·  NEW
**What.** The static accessibility rules (I34: an icon-only button with no label, an image with no alt or a file name, a click handler on a div, a removed focus outline, a misspelled aria-*) run on the lines an edit adds, with the fix, beside the token and prop checks (I62).
**Why.** S33: a clickable div is what the accessibility checker misses, and an error that says the fix is what the agent follows. The audit finds these; the edit check would stop them as they are written.
**Artifacts.** `edit-check.mjs`, reusing `a11y-static.mjs` per line.
**Status.** IMPLEMENTED 2026-10-01 (merged in PR 14). The static rules run on the file after the edit and report the lines it added, each with its fix (`fix` on the finding, a misspelt aria-* gets the one it meant). A removed outline counts only when no style in the project puts focus back (the project's styles are read only then). `a11yStatic: false` turns it off. Measured in g8.

#### I75. Raw sizes in the edit check  ·  source S33  ·  value: medium  ·  cost: low  ·  NEW
**What.** A pixel value an edit writes in a style (padding 12px, gap 8px, radius 6px, font-size 14px) is handed back with the token that has that value, or "not a design-system size". 0, 1px hairlines, percentages and token definitions are left alone.
**Why.** S33: a hex colour or a pixel size should fail. The edit check reads colours (I62) and Tailwind brackets (I65), not plain lengths.
**Artifacts.** `edit-check.mjs` (lengths in `tokenByValue`).
**Status.** IMPLEMENTED 2026-10-01 (merged in PR 14). Padding, margin, gap, corner radius and font size in px or rem, in a style sheet, a style attribute (a bare number is px there) or a style object, against the theme's tokens of the same kind (by name: radius, font size, spacing). Only a kind the theme has tokens for; 0, 1px, negatives, calc() and Tailwind's --spacing step left alone; a pill's 999px only when a token holds it. Measured in g8.

#### I76. Imports: the old library and the system's insides  ·  source S33  ·  value: medium  ·  cost: low  ·  NEW
**What.** `"library": { "entry": "@acme/ds", "old": ["@acme/legacy-ui"] }` in ds-config.json: an import from the old library, or from inside the system's folders instead of its entry, is a finding in the audit and the edit check, with the import to write.
**Why.** S33: agents copy the imports they see; a deep import breaks when the library moves its files.
**Artifacts.** an import reader, `edit-check.mjs`, an advisory block.

#### I77. Accepted differences carry a reason and an owner  ·  source S33  ·  value: medium  ·  cost: low  ·  NEW
**What.** `--baseline --findings` records who accepted each line (the git user) and `--reason "..."`; a line with neither is reported, and `"baseline": { "requireOwner": true }` fails CI on it. The exception lists already carry an owner (`--exemption-debt`).
**Why.** S33: exceptions in one file, each with a reason and an owner; without an owner it does not merge.
**Artifacts.** `baseline.mjs`, audit `--baseline`, `cookbook/accept-debt.md`.

#### I78. Focus goes back to what opened it  ·  source S33  ·  value: medium  ·  cost: medium  ·  NEW
**What.** The browser accessibility check opens a dialog or menu from its trigger (aria-haspopup, aria-expanded, aria-controls), presses Escape, and checks that it closed and that focus is back on the trigger. Today only "closes on Escape" is checked; the return of focus is only in the fix text.
**Why.** S33: keyboard tests the checker cannot do: Escape closes, focus goes back to the button.
**Artifacts.** `a11y-check.mjs`.
**Status.** IMPLEMENTED 2026-10-01 (merged in PR 14). `a11y-check.mjs`: up to 8 openers a page (aria-haspopup, or aria-expanded=false with aria-controls) are clicked (links do not navigate, forms do not submit), what appeared is found (a new dialog, menu or listbox, or the aria-controls target shown, or aria-expanded turned true), Escape is pressed: not closed is an `escape` finding, closed with the focus elsewhere a new `focusreturn` one. Measured in g8.

#### I79. A page with no main heading  ·  source S33  ·  value: low  ·  cost: low  ·  NEW
**What.** The static tier and the page check flag an app page (not a component) with no h1, or several.
**Why.** S33 lists it among what only the app knows.
**Artifacts.** `a11y-static.mjs`, `a11y-check.mjs`.
**Status.** IMPLEMENTED 2026-10-01 (merged in PR 14). Static: an HTML document with text in its body and no h1 (or a role=heading aria-level=1), or several; an app shell with no body text is not read. Browser: `--url` pages that are not stories and routes found on their own, never the styleguide, a story or a component-scoped run. The Harbor test page has no h1 (its golden gains the finding). Measured in g8.

#### I80. Generation evals go stale when the system changes  ·  source S33  ·  value: medium  ·  cost: low  ·  NEW
**What.** `eval-run` stores the hashes of the catalog, llms.txt, the agent instruction files and the model with each run; the audit says when any changed since the last run, with the command to run the evals again.
**Why.** S33: re-run the agent tasks whenever the components, docs, agent file or model change; it is the only way to tell if a docs change helped.
**Artifacts.** `eval-run.mjs` (evals-history.json), an advisory line.

#### I81. A last check before the agent says it is done  ·  source S33  ·  value: medium  ·  cost: medium  ·  NEW
**What.** A Claude Code Stop hook runs the static audit scoped to the components the session touched and hands back new findings once before the agent finishes. It sees what one edit cannot (a state missing across files, a component built but never used). Fast (static, scoped) and never loops (one hand-back per stop).
**Why.** S33: one command in the agent's loop, run before saying it is done.
**Artifacts.** `guard.mjs` (the Stop event), `hooks-install.mjs`.
**Status.** FIRST PART IMPLEMENTED 2026-10-01 (merged in PR 14): a Stop hook checks the last reply carries the lines the route asked the person to hear (not refreshed, does not change Figma) and sends the agent back once. Not yet: a final audit of what the agent changed.

**Not taken from S32 and S33.** Generating the platform theme from tokens.json (the engine checks; generators such as Style Dictionary build). A product file with instances only (the consumer-file sync is another skill's job). Screenshot tests per story and interaction tests (the project's own Storybook, Chromatic or Playwright; the engine's visual diff already fixes the viewport, fonts and animations). CODEOWNERS approvals (a repository setting; worth a line in the CI recipe). Already covered: every theme complete (gate [5]), names (gate [7]), contrast from token pairs (I14, derived, not written), failing only new code (the baseline), only deterministic checks block (the north star), agent tasks scored by the same scripts (eval-run, I60, I64).

#### I82. Where each component lives: its next larger context  ·  source S34 (and S32)  ·  value: high  ·  cost: medium  ·  NEW
**What.** One usage map, derived from the code: for each component, the screens and templates that use it and the components it sits inside (its tag, its class, its import), with counts. It goes into `--query` ("chip: used in 4 screens, usually inside FilterBar"), the contracts and llms.txt (`usedIn`, `parents`), and the report, so a difference says how far it reaches ("radii/chip reaches 4 screens") and the burndown can order by reach. The same map is what I71 needs to block only what the code already calls.
**Why.** S34: a thing is designed in its next larger context, and an agent builds well only when given it. Today design-intent.json has a rough `usedIn` (the configured sources that mention the class), which reaches neither the query, llms.txt nor the report, and says nothing of parents.
**Artifacts.** a usage reader (tags, classes, imports; the edit check's tag reading), `contract-gen.mjs`, `query.mjs`, `intent-gen.mjs`, `run-diff.mjs` (burndown).

#### I83. A new component is a decision, not an edit  ·  source S34  ·  value: medium-high  ·  cost: medium  ·  NEW
**What.** When an agent's edit defines a new component whose name or role resembles one the system has (StatusPill beside Badge and Tag, MyButton beside Button), the edit check hands it back: use the system's component, or say why a new one is needed. A new one that stays is listed as only in code (I52) with its Figma spec (I72), for the system's owner to decide.
**Why.** S34: whether a chair is needed rests with the designer; the AI makes one because it was asked. Agents build near-copies of components the system already has, and each one becomes a fork.
**Artifacts.** `edit-check.mjs` (a new component definition, name and role similarity against the catalog), `in-progress.mjs`, `handback.mjs`.

**Not taken from S34.** The cost and energy of AI work (the engine already budgets Figma calls, I67, and measures the tokens each request uses); the chair's list of requirements (a component's requirements are its contract and role contract, I39).

#### I84. Figma read through figma-cli, chosen automatically  ·  source: figma-cli (silships)  ·  value: high  ·  cost: low-medium  ·  NEW
**What.** `--from-figma-cli [design.json]` turns figma-cli's design.json into the snapshots (every mode, alias chains, no rate limit), keeping what it does not hold. On refresh the engine picks the route: a newer design.json in the project, then figma-cli with Figma Desktop open on the project's file, then the Figma MCP, then REST with a token; the summary says which.
**Status.** Importer IMPLEMENTED 2026-10-02 (`figma-cli-import.mjs`, 77cd476). Command, detection and docs after the running measurements.

#### I85. Roles as composites, part roles, Specs' vocabulary  ·  source: Nathan Curtis, "Component and Part Roles as Composites of Behavior and Accessibility"  ·  value: very high  ·  cost: medium  ·  NEW
**What.** A role table: each control role (togglebutton, textbox, disclosure, switch…) and part role (label, errormessage, indicator, description, value, placeholder, panel, increment, decrement) lists its obligations (real element, keys, aria-pressed even when false, spoken name, callback, follows its prop, disabled as an attribute, label for/id, error linked only while shown). Each obligation is checked where it can be: the edit check, the browser check, and listed in the build sheet. Part roles read from annotations on layers. An unmet obligation with no source is reported as owed (an icon-only toggle owes a name), never invented. Specs' names, so annotations made for Specs work as is; only legal ARIA is expected in the page.
**Why.** The build evaluation: the MCP alone built the toggle chip right 1 in 5; with the role in the build sheet 5 in 5.
**Status.** IMPLEMENTED 2026-10-04 (e0ada3e, 83428b4): part roles read from Figma annotations (`Role: indicator`, `Role: panel`), each with its expected markup; checked in the browser by the accessibility check and on drawn prototypes. Measured with the disclosure build task.

#### I86. The skill's behaviour, written down and enforced  ·  source: Pedro Rodrigues, "AI Has a Design Surface…"  ·  value: medium  ·  cost: low  ·  NEW
**What.** docs/behaviour.md along identity, context, memory, agency, behaviour under uncertainty and relationship; every line names the hook, gate or evaluation task that enforces it, and a test holds each line to one. A line with nothing behind it is a fix to make.

#### I87. --scaffold in build mode  ·  source: the Specs site generator post  ·  value: high  ·  cost: medium-high  ·  NEW
**What.** Writes what is exact from Figma: the token CSS, each component's CSS from its build sheet, a React or web component shell with its role markup and props, a Storybook story per variant combination, and foundations pages (colour, type, icons). Claude adds behaviour and screens; the engine checks. Measured as a third arm of the build evaluation.

#### I88. --improve: the engine proposes its own fixes, measured, a person decides  ·  source: Pedro Rodrigues, "Beyond Autonomy"  ·  value: medium-high  ·  cost: medium  ·  NEW
**What.** Local signals (gates that fail most, exceptions growing, accepted differences repeating, guard asks, Stop hook hand-backs, misrouted requests, turns and cost) become ranked proposals, each naming the evaluation tasks it should move; a real failure becomes a held-out task with names removed. Running and adopting stay the owner's step.

#### I89. AI behaviour in design systems  ·  source: Pedro Rodrigues, "AI Has a Design Surface…"  ·  value: medium  ·  cost: high  ·  NEW · LATER
**What.** Annotations and contract fields for AI product components (requires confirmation, reversible, shows its source, shows uncertainty), checked in code like a role. Waits for a real AI product's design system.

#### I90. --context <component>: a task-sized contract with its evidence  ·  source: S35  ·  value: high  ·  cost: medium  ·  NEW
**What.** One bundle per component, built from what the engine already holds: Figma's props and states, its tokens in every mode, the role and its obligations, the agreed record, open differences and accepted ones, where it is used, and for each fact the source that holds it (Figma node, file and line, decision file). The agent asks for one component and gets only that; --query stays the lookup. Measured on the build tasks as turns and input.

#### I91. Every finding cites its evidence  ·  source: S35  ·  value: medium-high  ·  cost: low  ·  NEW
**What.** Each ❌ line names where both sides were read: the Figma node or snapshot field, the code file and line or the rendered selector, and the decision file when one applies. Most of this is already in the capture; the line only has to say it. A person can check a finding without rerunning anything.

#### I92. Behaviours as contracts, checked in the browser  ·  source: S35, with S33  ·  value: high  ·  cost: medium-high  ·  NEW
**What.** Behaviours become rows like roles: focus returns after a dialog closes, Escape and an outside click dismiss an overlay, arrow keys move in a group, a toggle follows its prop. Written once per role (I85 table), read from Figma annotations where present, run in Chrome with the existing CDP driver. A link to an ADR or a PR can stand as the reason for an exception.
**Status.** IMPLEMENTED 2026-10-04 (e0ada3e, 83428b4, 7c7e62e): behaviours per role in `behaviour-contract.mjs`, run in Chrome on live pages or on the style guide when it inlines `systemScripts`; an exception holds only with a link; states follow their props. The build scorer renders through createElement so a component keeps its own state between renders.

#### I93. A verification snapshot headline  ·  source: S35  ·  value: medium  ·  cost: low  ·  NEW
**What.** The summary opens with one line: components whose contract passes, drifting, not checked (no source or no render), as counts and a percentage, the same numbers the census already holds. The style guide shows the same line. Kept to what was measured; nothing is scored by weight.

#### I94. Prototype from a sentence: catalog-only composition, checked, drawn  ·  source: S36, with S25  ·  value: very high  ·  cost: medium  ·  NEW
**What.** `--prototype <composition.json>` checks a composition with `--check-ui` and draws it with the real components and tokens (the style guide's drawing: each component's own markup and CSS, every mode), as one page that opens in the browser. The router sends "prototype a settings page with …" to it: Claude composes from `contracts/catalog.json` only (components, props, allowed values, what nests where), never CSS. What the system lacks is listed for the design team, never invented. Then an optional repair reader (reattaches only what was emitted, never adds content) separate from the strict check. Measured like the build evaluation, Haiku included: valid first tries, invented values (zero), gaps named, turns and cost. Needs I87 for a project that has only Figma, and I92 for prototypes that click like the product.
**Status.** First step IMPLEMENTED 2026-10-03 (9bdc5c3): `--prototype` (check, draw, gaps list), the engine's neutral layout pieces, `--from-screens` (designed screens as starting points, slots, fill sizing). Tested on Tidepool (Settings screen redrawn as in Figma) and on the plugins file (Impact Atlas window: structure right; components drawn from page markup are weak where the markup lives in app pages). Next: ask in words (router + recipe, guide set, measured), draw HTML/CSS components better, I87, I92. 2026-10-04 (e0ada3e, 00ba873, 83428b4): measured in Chrome against the designed screens (redraw or nearest sibling, pixel difference against the Figma image), drawn as the screen shows (modes, size, clipping, insides of unbuilt components, words), and checked for accessibility.

#### I95. A prompt box in the style guide, on-device  ·  source: S36  ·  value: medium  ·  cost: high  ·  NEW · LATER
**What.** The style guide page takes a sentence and composes a prototype with a small in-browser model, no server and no Claude Code, checked by the same catalog rules. Reliable for a few components, not for full screens (S36: 4 components render far better than 24). Waits for I94 and for browser models to mature.

Not adopted from S35: surface projections to other platforms (SwiftUI, Angular, Penpot, Zeroheight, Confluence). The engine checks the surfaces a project has; generating others is a different product.

### FOLDED (not a separate item)

#### I3. Boundary / invalid-combination declaration  ·  source S3
Covered by **I2** (`neverCombineWith`) plus the existing exemptions
(`knownScreenElementExemptions`, `knownHardcodedExceptions`, etc.). If a positive "what the
system does not cover" surface is ever wanted for agents, emit the exemptions + `neverCombineWith`
into a "boundaries" section of `llms.txt` rather than authoring a new list.

---

## How to use this file

- When a new article / DS / case is analyzed, add a row to **Sources analyzed** and fold any
  new idea into the **Backlog** with the same entry shape.
- Promote items between sections as priorities change; keep the **Status** line current.
- Before building any item, re-check it against the North star. If it adds authored data no
  one will maintain, it does not ship.

<!-- 2026-09-30 evaluation log -->
Guide set 88043ddd7bb8 (a849c3d: ask-the-system recipe, slot names, levels, workarounds): Sonnet 105/105, Haiku 62/63.
The miss: two-turns-pt, Haiku renamed the chip's props when asked only for the height. Extended to 33 runs on both:
previous guide 33/33, this one 31/33 (both misses the same). Not adopted as is. Root cause: "change only what was
asked" lived only in the fix recipe, which the failing runs never opened. Fixed in a57fcaa (an Audit Rule in the main
guide, and the routed fix note), bundled with the reference updates for I62-I68; evaluation g3 running.

Re-run at 13 runs (Sonnet, four tasks): previous 52/52 112k $0.138, a57fcaa 52/52 127k $0.146. accept-radius 98k → 140k: 7 of 13 runs narrowed parity-baseline.json by hand (3 of 13 before), because --baseline --findings accepted the chip's prop names too and the new scope rule makes the agent fix that. Fixed in the engine (2365d8a: --match, routed); evaluation g4 running.
2026-09-30, while g4 ran:
- I65 complete: Tailwind classes against Figma (height, padding, corner, colours per component file), Lagoon fixture with a golden, --init sets the preset (146b0d1, de8579d).
- I62 measured with agents: new eval task new-ui-saved (3286a71). First try Haiku 1/3: the router sent "add a green Saved confirmation next to the Save button" to an audit of the button, so it built nothing. Build requests now route to ask-the-system with build notes (4dccaac): Haiku 3/3 (two built with --text-primary/--gap-s/the chip, one said there is no green and asked), Sonnet 2/2 earlier. The edit check did not have to speak.
- accept-radius scorer was too lax (accepting the chip's prop names too passed); stricter scorer rescored: adopted guide 3/13 Sonnet 0/3 Haiku, a57fcaa 7/13 0/3. --match is the answer (g4).
- I63 remainder: a note for instruction files that only forbid (b1c5776).
2026-09-30, recorded and pushed: guide set 59ea4c33daac (RESULTS.md), PR #11 opened. Sonnet 100/100, Haiku 60/60 on the
20 common tasks (adopted, rescored: 95/100, 54/60); Sonnet held-out grown tasks at 13 runs 39/39 each, ~4% more input.
Found and fixed after: --query runs the audit once when there is no catalog (94ee399). Next batch: I69 (7c793bb in the
i69 worktree, touches the cookbook snippet, needs its own evaluation).
