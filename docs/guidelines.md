An example of each component in use, as the products write it. Each section is headed with the component's exact name
in Figma; what each one is for, when not to use it, its common mistakes and its limits are in contract.authored.json,
under its guidance. Every example uses the classes of packages/ui/src/theme.css, and the functions of
packages/ui/src/ui-shared.js where one draws or drives the component.

## actionBar

Example: the controls that act on the whole view, under the plugin's header.

```html
<div class="actionbar">
  <button class="buttonTertiary" data-tip="Rescan" aria-label="Rescan"><svg width="16" height="16" aria-hidden="true"><use href="#icon-reset"/></svg></button>
  <label class="inputWrap"><input class="inputField" placeholder="Search" aria-label="Search"></label>
</div>
```

## badge

Example: a severity next to an item's name.

```html
<span class="badge high"><span class="badge-icon" aria-hidden="true"></span><span class="badge-label">High</span></span>
```

## buttonList

Example: one row of a list a person picks from.

```html
<div class="buttonList">
  <div class="lrow-icon"><svg width="16" height="16" aria-hidden="true"><use href="#icon-var-color"/></svg></div>
  <button type="button" class="buttonList-main"><span class="lrow-name">color/brand/primary</span></button>
  <button class="buttonList-action buttonTertiary" aria-label="Focus on canvas"><svg width="16" height="16" aria-hidden="true"><use href="#icon-focus"/></svg></button>
</div>
```

## buttonPrimary

Example: the main action of a view.

```html
<button class="buttonPrimary"><span>Export</span></button>
```

## buttonQuaternary

Example: removing an output, beside it.

```html
<button class="buttonQuaternary" data-tip="Remove" aria-label="Remove"><svg width="16" height="16" aria-hidden="true"><use href="#icon-clear"/></svg></button>
```

## buttonSecondary

Example: an action beside the main one.

```html
<button class="buttonSecondary"><span>View on Canvas</span><svg width="16" height="16" aria-hidden="true"><use href="#icon-focus"/></svg></button>
```

## buttonStepper

Example: a scale stepped from 0% to 200%, driven by initButtonStepper.

```html
<div class="buttonStepper">
  <button class="buttonSecondary" aria-label="Decrease"><svg width="16" height="16" aria-hidden="true"><use href="#icon-minus"/></svg></button>
  <div class="inputWrap"><input class="inputField" value="100%" aria-label="Scale" role="spinbutton" aria-valuemin="0" aria-valuemax="200" aria-valuenow="100" aria-valuetext="100%"></div>
  <button class="buttonSecondary" aria-label="Increase"><svg width="16" height="16" aria-hidden="true"><use href="#icon-plus"/></svg></button>
</div>
<script>initButtonStepper(document.querySelector('.buttonStepper'), { min: 0, max: 200, step: 10, format: (v) => v + '%' });</script>
```

## buttonTertiary

Example: an action inside a row.

```html
<button class="buttonTertiary" data-tip="Focus in canvas" aria-label="Focus in canvas"><svg width="16" height="16" aria-hidden="true"><use href="#icon-focus"/></svg></button>
```

## card

Example: one output, grouped under its title.

```html
<div class="card" role="group" aria-labelledby="output-title">
  <span class="card-title" id="output-title">Output</span>
  <div>What the output holds</div>
</div>
```

## checkBox

Example: one option that turns on or off.

```html
<label class="checkbox">
  <input type="checkbox" class="checkbox-input">
  <span class="checkbox-box"><svg class="checkbox-check" width="16" height="16" aria-hidden="true"><use href="#icon-check"/></svg></span>
  <span class="checkbox-content"><span class="checkbox-text">Include hidden layers</span><span class="checkbox-description">Scans layers that are turned off too.</span></span>
</label>
```

## checkBoxGroup

Example: a label over related checkboxes.

```html
<div class="checkBoxGroup" role="group" aria-labelledby="include-label">
  <span class="checkBoxGroup-label" id="include-label">Include</span>
  <div class="checkBoxGroup-slot">
    <label class="checkbox"><input type="checkbox" class="checkbox-input" checked><span class="checkbox-box"><svg class="checkbox-check" width="16" height="16" aria-hidden="true"><use href="#icon-check"/></svg></span><span class="checkbox-text">Colours</span></label>
    <label class="checkbox"><input type="checkbox" class="checkbox-input"><span class="checkbox-box"><svg class="checkbox-check" width="16" height="16" aria-hidden="true"><use href="#icon-check"/></svg></span><span class="checkbox-text">Numbers</span></label>
  </div>
</div>
```

## dividerLine

Example: a line between two groups.

```html
<div class="dividerLine" role="separator"></div>
```

## dividerSection

Example: the title of a section in a list, with its count and one action.

```html
<div class="dividerSection">
  <div class="dividerSection-content">Affected components<span class="div-sep">·</span><span class="count">12</span></div>
  <button class="dividerSection-action buttonSecondary" data-tip="Place affected components on canvas" aria-label="Place affected components on canvas"><svg width="16" height="16" aria-hidden="true"><use href="#icon-fit"/></svg></button>
</div>
```

## emptyState

Example: nothing to show yet, and what to do.

```html
<div class="empty-state" role="group" aria-labelledby="empty-title">
  <div class="empty-state-content">
    <svg width="56" height="56" aria-hidden="true"><use href="#icon-empty-search"/></svg>
    <div class="empty-state-text"><span class="empty-state-title" id="empty-title">Nothing selected</span><span class="empty-state-desc">Select a layer to see the tokens it uses.</span></div>
  </div>
</div>
```

## highlight

Example: the label of a problem found on a preview, beside its highlightSelector.

```html
<span class="highlightSelector"></span>
<mark class="highlight"><span>Clipped</span></mark>
```

## highlightSelector

Example: the spot of a problem over a preview; selected, it is the one the person pinned.

```html
<span class="highlightSelector selected"></span>
```

## input

Example: a search field with its icon.

```html
<label class="inputWrap">
  <svg class="icon-left" width="16" height="16" aria-hidden="true"><use href="#icon-search"/></svg>
  <input class="inputField" placeholder="Search tokens" aria-label="Search tokens">
</label>
```

## listItem

Example: a row that shows information, with one action.

```html
<div class="listItem">
  <div class="listItem-row">
    <span class="listItem-icon"><svg width="16" height="16" aria-hidden="true"><use href="#icon-focus"/></svg></span>
    <div class="listItem-main"><span class="listItem-title">Heading</span><span class="listItem-desc">Clipped at 200%</span></div>
    <button class="buttonTertiary listItem-action" aria-label="Focus"><svg width="16" height="16" aria-hidden="true"><use href="#icon-focus"/></svg></button>
  </div>
  <div class="dividerLine listItem-divider"></div>
</div>
```

## loader

Example: a scan in progress, shown with showProgress over the page.

```html
<script>
  showProgress('Scanning', { description: 'About a minute left', cancel: () => stopScan() });
  // … when the scan ends or fails:
  dismissProgress();
</script>
```

## modal

Example: export options, opened with openModal.

```html
<div class="modal" id="export-modal">
  <div class="modal-overlay"></div>
  <div class="modal-card">
    <div class="modal-header"><h2 class="modal-title">Export</h2><button class="buttonSecondary modal-close" aria-label="Close"><svg width="16" height="16" aria-hidden="true"><use href="#icon-clear"/></svg></button></div>
    <div class="modal-slot">What to export</div>
    <div class="modal-footer"><button class="buttonSecondary"><span>Cancel</span></button><button class="buttonPrimary"><span>Export</span></button></div>
  </div>
</div>
<script>openModal(document.getElementById('export-modal'), { opener: document.activeElement });</script>
```

## node

Example: a token in a map of what uses what.

```html
<div class="node"><div class="node-type-icon"></div><div class="node-body"><div class="node-name">color/brand/primary</div></div></div>
```

## overflow

Example: a flyout menu with its title and two choices.

```html
<div class="overflow" role="group" aria-labelledby="add-title">
  <span class="overflow-label" id="add-title">Add output</span>
  <button type="button" class="overflowList"><span>CSS</span></button>
  <button type="button" class="overflowList"><span>JSON</span></button>
</div>
```

## overflowList

Example: one choice in an overflow menu.

```html
<button type="button" class="overflowList"><svg width="16" height="16" aria-hidden="true"><use href="#icon-plus"/></svg><span>Add output</span></button>
```

## overlay

Example: a view covered while it works, a loader at its centre.

```html
<div class="overlay">
  <div class="loader" role="status"><div class="loader-content"><div class="loader-spinner" aria-hidden="true"></div><div class="loader-text"><span class="loader-title">Working</span></div></div></div>
</div>
```

## panel

Example: a side panel with a control in its head and content that scrolls.

```html
<div class="panel">
  <div class="panel-head">
    <div class="segmented-control full-width" aria-label="Browse"><button class="selected"><span class="tab-label">Tokens</span></button><button><span class="tab-label">Components</span></button></div>
  </div>
  <div class="panel-main">The list</div>
</div>
```

## radioButton

Example: one option of a choice.

```html
<label class="radioButton"><input type="radio" name="format" value="pdf" class="radioButton-input" checked><span class="radioButton-circle"></span><span class="radioButton-label">PDF</span></label>
```

## radioButtonGroup

Example: an export format, one of two.

```html
<div class="radioButtonGroup">
  <span class="radioButtonGroup-label" id="format-label">Format</span>
  <div class="radioButtonGroup-slot" role="radiogroup" aria-labelledby="format-label">
    <label class="radioButton"><input type="radio" name="format" value="pdf" class="radioButton-input" checked><span class="radioButton-circle"></span><span class="radioButton-label">PDF</span></label>
    <label class="radioButton"><input type="radio" name="format" value="png" class="radioButton-input"><span class="radioButton-circle"></span><span class="radioButton-label">PNG</span></label>
  </div>
</div>
```

## segmentedControl

Example: two views of the same content, made with createSegmentedControl.

```html
<script>
  const control = createSegmentedControl([{ label: 'Tokens', value: 'tokens' }, { label: 'Components', value: 'components' }], 'tokens', (v) => show(v));
  document.querySelector('.panel-head').appendChild(control);
</script>
```

## segmentedControlSegment

Example: the segments of a segmentedControl, the first selected.

```html
<div class="segmented-control" aria-label="Browse">
  <button class="selected"><svg width="16" height="16" aria-hidden="true"><use href="#icon-variable"/></svg><span class="tab-label">Tokens</span></button>
  <button><svg width="16" height="16" aria-hidden="true"><use href="#icon-object-component"/></svg><span class="tab-label">Components</span></button>
</div>
```

## statusBar

Example: what is selected, and an action on it.

```html
<div class="statusBar">
  <div class="statusBar-content">
    <div class="statusBar-title"><span>color/brand/primary</span></div>
    <span class="badge none"><span class="badge-label">12 uses</span></span>
    <button class="buttonTertiary" data-tip="Focus on canvas" aria-label="Focus on canvas"><svg width="16" height="16" aria-hidden="true"><use href="#icon-focus"/></svg></button>
  </div>
</div>
```

## swatch

Example: a colour beside its name, then a chip with no colour.

```html
<div class="swatch" role="img" aria-label="color/brand/primary"></div>
<div class="swatch empty" role="img" aria-label="No colour"></div>
```

## switch

Example: a setting that takes effect at once.

```html
<label class="switch">
  <input type="checkbox" class="switch-input" id="bleed-toggle">
  <span class="switch-track"><span class="switch-knob"></span></span>
  <span class="switch-content"><span class="switch-description">Bleed</span></span>
</label>
```

## table/row

Example: a value with one output.

```html
<div class="tableRow">
  <div class="tableRow-content">
    <div class="tableRow-variable">
      <div class="swatch" role="img" aria-label="color/brand/primary"></div>
      <div class="tableRow-info"><div class="tableRow-nameRow"><span class="tableRow-name">color/brand/primary</span></div><div class="tableRow-value">#1F6FEB</div></div>
    </div>
    <div class="tableRow-connector"></div>
    <div class="tableRow-output"><div class="tableRow-outputRow"><label class="inputWrap"><input class="inputField" value="C80 M50 Y0 K0" aria-label="CMYK"></label></div></div>
  </div>
  <div class="dividerLine"></div>
</div>
```

## toast

Example: confirming that something finished, and reporting a failure.

```html
<script>
  showToast('Exported 24 colours');
  showError('The export failed: the file is read-only');
</script>
```

## tooltipButton

Example: the info icon beside a name, its tooltip in data-tip.

```html
<span class="tooltipButton" data-tip="From the team library"><svg width="12" height="12" aria-hidden="true"><use href="#icon-info"/></svg></span>
```

## tooltipPopover

Example: any element with a data-tip shows it; nothing else is written.

```html
<button class="buttonTertiary" data-tip="Focus on canvas" aria-label="Focus on canvas"><svg width="16" height="16" aria-hidden="true"><use href="#icon-focus"/></svg></button>
```
