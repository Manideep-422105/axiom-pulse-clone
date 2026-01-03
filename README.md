# ⚡ Pulse Crypto Dashboard

```text
A high-performance, pixel-perfect crypto trading dashboard built for speed and usability.
This project features a real-time token board, complex interactive overlays, and a robust
modal ecosystem, all architected using Atomic Design principles.
```

---

## 🚀 Features

```text
📊 Interactive Token Board
- Multi-Column Layout: New Pairs, Final Stretch, Migrated
- Responsive Design: Desktop 3-column → Mobile tabs
- Shimmer Loading: Skeleton loaders during data fetch
```

```text
🃏 Advanced Token Cards
- Dual-View Architecture
  - Normal View: Price, Market Cap, Volume, Holders
  - Hover View: Expanded metrics, socials, actions
- Quick Actions
  - One-click Quick Buy
  - Clipboard copy with Toast notifications
- Visual Indicators
  - Protocol badges (Pump / Meteora)
  - Safety flags (Audit, Mint)
  - Holder concentration warnings
```

```text
🎛️ Modal Ecosystem
- Display Settings
  - Toggle columns
  - Adjust density
  - Layout preferences
- Snipe Settings
  - Slippage
  - Priority Fees
  - Bribery
  - MEV Protection
- Hotkeys Manager
  - View and configure shortcuts
- Alerts Manager
  - Enable/disable sound alerts
  - Volume control
```

```text
🛠️ Technical Highlights
- Atomic Design Architecture
- React Portals for modals and toasts
- Pixel-perfect Tailwind CSS
  - Custom gradients
  - Borders
  - Shadows matching Figma
```

---

## 🛠️ Tech Stack

```text
Framework: Next.js (React)
Styling: Tailwind CSS
State Management: Redux Toolkit
Icons: Remix Icons (via React Icons)
Language: TypeScript
```

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── atoms/               # Buttons, Inputs, Icons
│   ├── molecules/           # Search bars, Dropdowns
│   └── organisms/           # Global Header, Footer
├── modules/
│   └── pulse/
│       ├── components/
│       │   ├── molecules/
│       │   │   ├── TokenCard.tsx
│       │   │   ├── TokenCardSkeleton.tsx
│       │   │   ├── ColumnHeader.tsx
│       │   │   └── SubHeader.tsx
│       │   └── organisms/
│       │       ├── TokenBoard.tsx
│       │       ├── TokenColumn.tsx
│       │       └── modals/
│       │           ├── SnipeSettingsModal.tsx
│       │           ├── HotkeysModal.tsx
│       │           ├── DisplayModal.tsx
│       │           └── AlertsModal.tsx
├── hooks/                   # Custom hooks
├── store/                   # Redux slices & store
└── utils/                   # Mock data & helpers
```

---

## 🚦 Getting Started

```text
Prerequisites
- Node.js v18 or higher
- npm or yarn
```

```bash
git clone https://github.com/your-username/pulse-dashboard.git
cd pulse-dashboard
```

```bash
npm install
# or
yarn install
```

```bash
npm run dev
# or
yarn dev
```

```text
Open browser:
http://localhost:3000
```

---

## 🎨 Customization

```text
Theming
- Tailwind CSS configuration: tailwind.config.ts
- Backgrounds: bg-background, bg-backgroundSecondary
- Text: text-textPrimary, text-textTertiary
- Accents: text-primaryBlue, text-primaryGreen
```

```text
Mock Data
- File: src/utils/mockData.ts
- Modify token names, prices, volume, generation logic
```

---

## 📸 Screenshots

```text
Desktop View
- Panoramic 3-column layout
![Desktop View](./public/images/image.png.jpg)
- Real-time updates
```

```text
Hover Interaction
- Detailed token overlay
- Quick Buy actions
```

```text
Mobile View
- Tab-based column switching
- Optimized touch interactions
```

```text
Settings Modals
- Snipe Settings
- Display Preferences
- Alerts Configuration
```
