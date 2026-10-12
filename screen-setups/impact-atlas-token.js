// Impact Atlas with a token chosen: the tokens that alias it and the components it reaches, side by side (the graph
// view). Run on the built page by the screen check (ds-config.json, screens); a screen of the list view names
// impact-atlas-token-list.js, which runs this first.
const post = (m) => window.dispatchEvent(new MessageEvent('message', { data: { pluginMessage: m } }));
const collection = { id: 'c1', name: 'Tokens', modes: [{ modeId: 'm1', name: 'Mode 1' }] };
const token = (id, name) => ({ id, name, resolvedType: 'COLOR', variableCollectionId: 'c1', hex: '#3B82F6', dependentCount: 0, hasExternalAlias: false });
const high = ['semantic/generalContent/color', 'border/bottom', 'primitives/neutral100', 'semantic/surface/color', 'button/background'].map((n, i) => token('h' + i, n));
const medium = ['semantic/positive/color', 'base/radius/allButton', 'card/border', 'badge/text', 'node/label'].map((n, i) => token('m' + i, n));
const counts = {};
for (const t of high) counts[t.id] = 30;
for (const t of medium) counts[t.id] = 20;
post({ type: 'init-data', variables: [...high, ...medium], collections: [collection], remoteVars: [], remoteColls: [], componentIndexBuilt: true,
  varComponentCounts: counts, varImpactScores: {}, lastScanDepth: 1, hasExternalLibraries: false, browserComponents: [], cachedScan: null });
const chosen = high[2];
const item = [...document.querySelectorAll('.var-item')].find((e) => e.textContent.includes(chosen.name));
if (item) item.click();
const node = (id, name) => ({ id, name, resolvedType: 'COLOR', collectionName: 'Tokens', depth: 1, hex: '#3B82F6', isCyclic: false, isExternal: false, aliasModes: [], totalModes: 1, hasChildren: false });
const aliases = ['cardPanel/shadow/color', 'cardModal/shadow/color', 'cardPrimary/background/color', 'cardStatus/border/color', 'modal/background/color', 'toast/background/color'].map((n, i) => node('a' + i, n));
const component = (name, i) => ({ nodeId: 'k' + i, nodeName: name, nodeType: 'COMPONENT', pageName: 'Components', pageId: 'p1', boundCount: 1,
  boundVars: [{ id: aliases[i % aliases.length].id, name: aliases[i % aliases.length].name, resolvedType: 'COLOR', hex: '#3B82F6', isSelected: false, via: [] }] });
post({ type: 'chain-result', chain: { selectedId: chosen.id, ancestors: [], self: node(chosen.id, chosen.name), descendants: aliases, blastRadius: { totalDescendants: aliases.length } },
  styles: [], components: ['cardStatusFeedback', 'modalSend', 'cardProgress', 'cardPanel', 'toastGeneral', 'modalDelete'].map(component),
  impact: { score: 120, tokenType: 'primitive', multiplier: 0.5, varDeps: aliases.length, depth: 0, compUsage: 30 } });
await new Promise((r) => setTimeout(r, 200));
