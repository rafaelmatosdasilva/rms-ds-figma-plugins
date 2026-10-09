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
