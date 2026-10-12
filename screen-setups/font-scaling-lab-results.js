// Font Scaling Lab after a scan at 150%: three truncated and six clipped text layers listed, the first clipped one open
// in the details panel. Run on the built page by the screen check (ds-config.json, screens).
const post = (m) => window.dispatchEvent(new MessageEvent('message', { data: { pluginMessage: m } }));
post({ type: 'selection', data: { nodeId: 'frame-1', name: 'cardGeneral', type: 'FRAME', width: 320, height: 200, total: 0, counts: { variable: 0, style: 0, override: 0 }, nodes: [] } });
const issue = (severity, name, i) => ({
  type: severity, severity, name, chars: name, parentName: 'cardGeneral', kind: 'TEXT', nodeId: `t${i}`,
  bounds: { x: 20, y: 20 + i * 24, w: 180, h: 17 }, outOfBounds: false,
  reasons: [{ what: 'Fixed height', fix: 'Set parent height to Hug' }],
  description: `This layer has a fixed height of 17px that prevents content from growing, so content gets cut off at 150% scale.`,
  suggestedFixes: [
    { title: 'Set parent height to Hug', description: 'If the container should size to the text it holds.', recommended: true, nodeId: `t${i}` },
    { title: 'Set text resize to Width & Height', description: 'If the text box should grow on both axes with its content.' },
  ],
});
const issues = [
  ...['Review Changes', 'Update Content', 'Sign Up'].map((n, i) => issue('truncation', n, i)),
  ...['Button hierarchy improvements', 'Low Priority', 'buttonPrimary', 'Components', 'Improved consistency', 'Cancel'].map((n, i) => issue('clipped', n, i + 3)),
];
// The frame as the plugin renders it at 150%: a plain card, so the highlights sit on a real image.
const canvas = Object.assign(document.createElement('canvas'), { width: 480, height: 300 });
const g = canvas.getContext('2d'); g.fillStyle = '#ffffff'; g.fillRect(0, 0, 480, 300);
const scaled = [...atob(canvas.toDataURL('image/png').split(',')[1])].map((c) => c.charCodeAt(0));
post({ type: 'preview-result', scale: 1.5, name: 'cardGeneral', frameId: 'frame-1', scaled, issues, frameW: 320, frameH: 200 });
await new Promise((r) => setTimeout(r, 300));
const rows = document.querySelectorAll('#issues-list .buttonList');
if (rows[3]) rows[3].click();
