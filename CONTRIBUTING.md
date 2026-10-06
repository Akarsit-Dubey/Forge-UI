# Contributing to Forge UI

Thank you for your interest in contributing to **Forge UI**! We welcome contributions to help improve the design system, components, and developer tooling.

## Development Workflow

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/your-username/forge-ui.git
   cd forge-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Make your changes and test them locally in the playground.

5. Verify that the build succeeds without TypeScript or lint errors:
   ```bash
   npm run build
   ```

## Adding a New Component

To add a new component to the Forge UI library:

1. **Create the UI Primitive**: Add the component primitive in `src/components/ui/[name].tsx` using Radix UI primitives and `cva` where appropriate.
2. **Define Registry Metadata**: Create a component definition in `src/registry/components/[name].tsx` adhering to the `ComponentDefinition` schema (`props`, `defaultProps`, `examples`, `docs`, `component`, `generateCode`).
3. **Export in Registry**: Register your component in `src/registry/index.ts`.

## Code Guidelines

- Maintain strict TypeScript typings.
- Adhere to WAI-ARIA accessibility patterns with keyboard support and focus states.
- Follow the Tailwind CSS variable design system conventions.
- Keep commits focused and descriptive.
