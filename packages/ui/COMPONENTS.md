# UI Components

Base components and utilities for RMS plugins.

## Segmented Control

A toggle control with multiple options. One option is selected at a time.

### CSS Classes

Use the `.segmented-control` container with button children:

```html
<div class="segmented-control">
  <button class="selected" data-value="tokens">
    <svg><!-- icon --></svg>
    Tokens
  </button>
  <button data-value="components">
    <svg><!-- icon --></svg>
    Components
  </button>
</div>
```

### JavaScript Helper

Use `createSegmentedControl()` to generate the control programmatically:

```javascript
const control = createSegmentedControl(
  [
    { label: 'Tokens', value: 'tokens', icon: '<svg>...</svg>' },
    { label: 'Components', value: 'components', icon: '<svg>...</svg>' }
  ],
  'tokens',  // initially selected
  (newValue) => console.log('Selected:', newValue)  // onChange callback
);

document.body.appendChild(control);
```

### Accessibility

Every `.segmented-control` on the page, and every one `createSegmentedControl()` builds, is a radio group: the
container gets `role="radiogroup"`, each button `role="radio"` with `aria-checked` following its `.selected` class,
Tab reaches the chosen option, and the arrow keys (Home and End) move between options and choose them with a click,
so the product's own click handler runs. Name each control: `<div class="segmented-control" aria-label="View">`.

### Styling

- **Border**: Inactive buttons show `var(--dividerLine-border)` color
- **Selected state**: Selected button shows `var(--accent)` border
- **Hover**: Inactive buttons show text color change on hover
- **Dark mode**: Automatic color adjustments via CSS custom properties

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `options` | Array | Array of `{label, value, icon?}` objects |
| `selectedValue` | string | Initially selected option value |
| `onChange` | Function | Callback when selection changes |

## Button Stepper

A −/value/+ row: two `buttonSecondary` flanking a field that is a spinbutton.

```html
<div class="buttonStepper">
  <button class="buttonSecondary" aria-label="Decrease"><svg><!-- minus --></svg></button>
  <div class="inputWrap"><input class="inputField" aria-label="Scale" value="125%"></div>
  <button class="buttonSecondary" aria-label="Increase"><svg><!-- plus --></svg></button>
</div>
```

```javascript
const scale = initButtonStepper(document.querySelector('.buttonStepper'), {
  min: 100, max: 200, value: 125,
  steps: [100, 110, 125, 150, 175, 200],   // or step: 1
  format: (v) => v + '%',
  onChange: (v) => console.log('Scale:', v),
});
scale.set(150);   // scale.get() → 150
```

ArrowUp and ArrowDown step it, Home and End go to its ends, Enter leaves the field, and a typed value is kept within
its range. The buttons turn off at each end. The field carries `role="spinbutton"` with `aria-valuemin`,
`aria-valuemax`, `aria-valuenow` and `aria-valuetext`, kept up to date. A stepper whose field already has
`role="spinbutton"` (and its range in those attributes) works without the call.

## Button List

A row with an icon, a label and, optionally, its own action button and a badge. The row's main action is a button
around its label (`.buttonList-main`) that covers the whole row: Tab reaches the row, Enter or Space acts on it, and a
click anywhere on the row still lands on the row, so a product's delegated handler (`closest('.buttonList')`) runs as
before. The row's other controls sit above it and apart; a button never holds another. The row's action button shows
while the row has the focus, as on hover, so Tab goes from the row to it; a product gives it no `tabindex="-1"`.

```html
<div class="buttonList">
  <div class="lrow-icon"><svg><!-- icon --></svg></div>
  <button type="button" class="buttonList-main"><span class="lrow-name">Title</span></button>
  <button class="buttonList-action buttonTertiary" aria-label="Focus on canvas"><svg><!-- focus --></svg></button>
  <svg class="buttonList-arrow"><!-- arrow --></svg>
</div>
```

`.selected` on the row is heard as `aria-pressed="true"` on its `.buttonList-main` (`ui-shared.js` keeps it).

## Modal

```html
<div id="export-modal" class="modal">
  <div class="modal-overlay"></div>
  <div class="modal-card">
    <div class="modal-header"><h2 class="modal-title">Export</h2><button class="buttonSecondary modal-close" aria-label="Close">…</button></div>
    <div class="modal-slot">…</div>
    <div class="modal-footer"><button class="buttonSecondary">Cancel</button><button class="buttonPrimary">Export</button></div>
  </div>
</div>
```

```javascript
openModal(document.getElementById('export-modal'), {
  initialFocus: '.buttonPrimary',        // else its first control
  onClose: () => console.log('closed'),  // after the closing animation, with the focus given back
});
closeModal(document.getElementById('export-modal'));   // Cancel, the close button, a finished action
```

The card is a modal dialog named by its `.modal-title` (unless the markup already says what it is). The focus moves
into it and Tab keeps it there; Escape and a click on the overlay close it; once its closing animation ends the focus
goes back to what opened it. A product writes no open, close, Escape or focus code of its own.

