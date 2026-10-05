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
