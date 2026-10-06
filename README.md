# Forge UI — Design System Playground & Component Studio

> **Forge UI** is a production-grade interactive Design System Playground and Component Studio inspired by the best parts of [shadcn/ui](https://ui.shadcn.com), [Figma](https://figma.com), [Storybook](https://storybook.js.org), and modern developer tools like Linear and Raycast.

[![Next.js](https://img.shields.io/badge/Next.js-14%20(App%20Router)-black?style=flat&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-Primitives-161618?style=flat&logo=radix-ui)](https://radix-ui.com)
[![Zustand](https://img.shields.io/badge/Zustand-v5-orange?style=flat)](https://zustand.docs.pmnd.rs)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat)](./LICENSE)

---

## 🚀 Core Philosophy

Modern component libraries are either static documentation sites or heavy runtime abstractions. **Forge UI** bridges this gap by providing an agile developer workflow:

$$\text{Browse} \longrightarrow \text{Customize} \longrightarrow \text{Preview} \longrightarrow \text{Inspect} \longrightarrow \text{Generate Code} \longrightarrow \text{Copy}$$

You own the component source code. Nothing is trapped inside an opaque `node_modules` wrapper. Every UI primitive is accessible, fully typed, tokenized with CSS variables, and copy-paste ready.

---

## ✨ Features

### 1. 🎛️ Interactive Playground
- **3-Column Workspace**: Collapsible navigation sidebar, responsive center canvas, and dynamic properties panel.
- **Dynamic Prop Editor**: Polymorphic controls supporting text inputs, select dropdowns, segmented toggles, numeric sliders, switches, color overrides, and icon selectors.
- **Visual Styler**: Direct real-time controls for border radius, shadows, typography scale, weight, and color token overrides.
- **Curated Presets**: Instant one-click presets for common configurations (Primary, Outline, Destructive, Loading, With Icons).

### 2. 📱 Responsive Canvas & Device Emulation
- **Multi-viewport testing**: Desktop (`100%`), Laptop (`1024px`), Tablet (`768px`), Mobile (`375px`), or custom width inputs.
- **Device Frames**: Realistic mobile bezel with camera notch and speaker styling.
- **Zoom & Inspect**: Zoom canvas from `50%` to `150%`. Inspect mode displays live bounding box dimensions and DOM tag badges.
- **Canvas Theming**: Toggle between Auto system theme, forced Light canvas, or forced Dark canvas.

### 3. ⚡ Code Generation & Monaco Editor
- **Real-time Compilation**: Automatically converts prop state and visual customizations into production-ready React TSX.
- **Monaco Code Editor**: Lazy-loaded Monaco Editor (`@monaco-editor/react`) featuring syntax highlighting, line numbers, customizable font sizes, word wrap, copy feedback, and formatting.
- **Multi-format Export**:
  - **TSX**: Clean JSX/TSX syntax.
  - **CSS**: Generated `:root` variables and `.forge-{component}` rule declarations.
  - **Tailwind**: Compiled utility class strings.
  - **Accessibility**: Real-time keyboard navigation keys and WAI-ARIA guidelines.

### 4. 🎨 Theme Studio & Design Token Inspector
- **Preset Themes**: Zinc (Default), Slate, Violet, Emerald, Blue, Rose, and Amber.
- **Real-time CSS Variables**: Instant updates to `--background`, `--foreground`, `--primary`, `--muted`, `--border`, and `--radius`.
- **Token Inspector**: Tabular directory displaying color swatches, computed pixel values, radii scales, and spacing matrices with copyable values.
- **Live Preview Showcase**: Real-time card and form element reacting dynamically to custom theme values.

### 5. 📚 Component Documentation
- Dedicated `/docs/[slug]` pages for all 27 component primitives.
- Includes Overview, Interactive Preview, CLI & NPM installation commands, TypeScript Usage, comprehensive API Reference tables, and WAI-ARIA accessibility notes.

### 6. ⌨️ Developer Experience & Shortcuts
- **Global Command Palette (`⌘K` / `Ctrl+K`)**: Rapid component jumping, route navigation, theme switching, and playground resets.
- **Keyboard Shortcuts Reference (`?`)**: Full cheat sheet modal for power users.
- **Persistence**: Zustand stores with `persist` middleware for favorites, recently viewed components, active viewports, and custom theme overrides.

---

## 🛠️ Tech Stack & Architectural Decisions

| Technology | Purpose | Architectural Rationale |
|---|---|---|
| **Next.js 14 (App Router)** | Framework | Server Components for static doc routes + Client Boundaries for high-performance reactive canvas states. |
| **TypeScript 5 (Strict)** | Language | Full type safety across component schemas, polymorphic prop definitions, and generated code templates. |
| **Tailwind CSS 3.4** | Styling | Utility-first styling with dynamic CSS variables for theme customization and zero runtime CSS overhead. |
| **Radix UI Primitives** | Accessibility | Unstyled accessible headless primitives (Dialog, Dropdown, Select, Tabs, Tooltip, Switch, Slider) guaranteeing WAI-ARIA compliance. |
| **Zustand 5** | State Management | Lightweight, performant reactive state with built-in `persist` middleware avoiding React context re-render thrashing. |
| **Monaco Editor** | Code Editor | Industry-standard VS Code editor engine, dynamically imported to keep initial bundle sizes minimal. |
| **Lucide React** | Icons | Crisp, consistent SVG icons with tree-shakeable imports. |
| **cmdk** | Command Palette | Fast, unstyled command menu inspired by Raycast and Linear. |

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── layout.tsx                   # Global Root Layout with Navbar, Footer, and Modals
│   ├── page.tsx                     # Developer-tool first landing page & interactive sandbox
│   ├── globals.css                  # CSS Variables & theme tokens
│   ├── components/
│   │   └── page.tsx                 # Component Gallery with search & category filters
│   ├── playground/
│   │   └── page.tsx                 # 3-Panel interactive component playground
│   ├── themes/
│   │   └── page.tsx                 # Theme Builder & Design Token Inspector
│   ├── docs/
│   │   ├── page.tsx                 # Documentation Index & Architecture Guide
│   │   └── [slug]/
│   │       └── page.tsx             # Dynamic Component Documentation & API Table
│   └── settings/
│       └── page.tsx                 # Appearance, Monaco, and shortcut settings
│
├── components/
│   ├── ui/                          # 20+ base primitives (Button, Input, Card, Dialog, etc.)
│   ├── layout/                      # Navbar, Footer, CommandPalette, ShortcutsModal
│   └── playground/                  # ViewportToolbar, PropsEditor, VisualStylesEditor, CanvasPreview, MonacoWrapper, BottomTabs
│
├── registry/
│   ├── schema.ts                    # ComponentDefinition, PropDefinition, and VisualStyles types
│   ├── index.ts                     # Central registry index (27 components) & search methods
│   └── components/                  # Individual modular component definitions
│       ├── button.tsx, input.tsx, card.tsx, dialog.tsx, tabs.tsx, switch.tsx...
│
├── store/
│   ├── playground-store.ts          # Zustand store for canvas, props, and viewport
│   ├── theme-store.ts               # Theme presets and color token mutations
│   └── settings-store.ts            # Editor preferences and modal triggers
│
└── lib/
    ├── utils.ts                     # clsx + tailwind-merge helper and clipboard utils
    ├── style-utils.ts               # Visual style class & inline style compilers
    ├── code-generator.ts            # TSX, CSS, and Tailwind class compilers
    └── theme-generator.ts           # CSS variable generator & token registry
```

---

## 🧩 Component Directory (27 Primitives)

Forge UI comes equipped with 27 production-ready primitives categorized for modern application architecture:

1. **Forms**: `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio Group`, `Switch`, `Slider`, `Calendar`
2. **Layout**: `Card`, `Accordion`
3. **Navigation**: `Tabs`, `Breadcrumb`, `Pagination`, `Command`
4. **Feedback**: `Badge`, `Alert`, `Toast`, `Progress`, `Skeleton`
5. **Overlay**: `Dialog`, `Drawer / Sheet`, `Dropdown Menu`, `Tooltip`, `Popover`
6. **Data Display**: `Avatar`, `Table`

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Description |
|---|---|
| `⌘ / Ctrl + K` | Open global Command Palette |
| `⌘ / Ctrl + C` | Copy code when editor is focused |
| `⌘ / Ctrl + S` | Export current theme / stylesheet |
| `R` | Reset playground component props to defaults |
| `1` | Switch to Live Preview tab |
| `2` | Switch to TSX Code tab |
| `3` | Switch to CSS Variables tab |
| `?` | Open Keyboard Shortcuts cheat sheet |
| `Esc` | Close active modal, dialog, or drawer |

---

## 💻 Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/forge-ui.git
cd forge-ui
npm install
```

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
npm run build
npm run start
```

---

## 🤝 Contributing

Contributions are welcome! Please check out [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and development workflow.

---

## 📄 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for details.
