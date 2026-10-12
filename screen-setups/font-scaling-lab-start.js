// Font Scaling Lab with nothing selected on the canvas: it asks for a frame. Run on the built page by the screen check
// (ds-config.json, screens).
window.dispatchEvent(new MessageEvent('message', { data: { pluginMessage: { type: 'selection', data: { error: 'no-selection' } } } }));
