// Font Scaling Lab while it renders the preview: the loader over the page, with Cancel. Run on the built page by the
// screen check (ds-config.json, screens).
window.dispatchEvent(new MessageEvent('message', { data: { pluginMessage: { type: 'selection', data: { nodeId: 'frame-1', name: 'cardGeneral', type: 'FRAME', width: 320, height: 200, total: 0, counts: { variable: 0, style: 0, override: 0 }, nodes: [] } } } }));
await new Promise((r) => setTimeout(r, 100));
document.getElementById('gen-btn')?.click();
await new Promise((r) => setTimeout(r, 300));
