# Battery Asset Replacement Guide

You can easily replace the placeholders with your own battery images or PNG icons.

### Option 1: Drop PNG files into this folder
Save your transparent PNG icons or battery images in `public/assets/` with these filenames:

- **Hero Section**: `public/assets/hero-battery.png`
- **About / Mission Section**: `public/assets/about-battery.png`
- **Product 1 (Server Rack LiFePO4)**: `public/assets/product-1.png`
- **Product 2 (EV High-C Traction)**: `public/assets/product-2.png`
- **Product 3 (Marine Deep Cycle)**: `public/assets/product-3.png`
- **Product 4 (Industrial Forklift)**: `public/assets/product-4.png`
- **Product 5 (Modular 15kWh ESS)**: `public/assets/product-5.png`

### Option 2: Pass `imageSrc` in the component
You can also open the corresponding component in `src/components/` and provide the `imageSrc` prop directly:

```tsx
<BatteryPlaceholder
  imageSrc="/assets/your-battery-icon.png"
  title="72V Lithium Pack"
/>
```

