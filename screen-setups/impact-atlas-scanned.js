// Impact Atlas once it has read the file, nothing selected yet: its tokens listed by impact, High then Medium, and the
// last scan beside the Scan button. Run on the built page by the screen check (ds-config.json, screens).
const collection = { id: 'c1', name: 'Tokens', modes: [{ modeId: 'm1', name: 'Mode 1' }] };
const token = (id, name) => ({ id, name, resolvedType: 'COLOR', variableCollectionId: 'c1', hex: '#3B82F6', dependentCount: 0, hasExternalAlias: false });
const high = ['semantic/generalContent/color', 'border/bottom', 'primitives/neutral100', 'semantic/surface/color', 'button/background'].map((n, i) => token('h' + i, n));
const medium = ['semantic/positive/color', 'base/radius/allButton', 'card/border', 'badge/text', 'node/label'].map((n, i) => token('m' + i, n));
const counts = {};
for (const t of high) counts[t.id] = 30;    // 30 components × 4 = 120: High
for (const t of medium) counts[t.id] = 20;  // 80: Medium
window.dispatchEvent(new MessageEvent('message', { data: { pluginMessage: {
  type: 'init-data', variables: [...high, ...medium], collections: [collection], remoteVars: [], remoteColls: [],
  componentIndexBuilt: true, varComponentCounts: counts, varImpactScores: {}, lastScanDepth: 1, hasExternalLibraries: false,
  browserComponents: [], cachedScan: null,
} } }));
