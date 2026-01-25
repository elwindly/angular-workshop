# Angular Workshop

An interactive learning application showcasing Angular features and patterns from versions 14 through 21. This project serves as a comprehensive reference implementation demonstrating the evolution of Angular's modern APIs, including signals, standalone components, control flow, and form handling.

**Built with:** Angular 21.0.6 | Angular Material 21.0.5 | TypeScript 5.9 | Vitest 4.0

## Project Overview

This workshop application is organized as a series of **version containers**, each demonstrating key features introduced in specific Angular releases. The application uses a container-based architecture where each Angular version has its own lazy-loaded route and component, making it easy to explore and compare features across versions.

### Architecture

- **Version Containers** (`src/app/containers/`) - Each Angular version (14-21) has its own container component showcasing that version's features
- **Reusable Components** (`src/app/components/`) - Shared components demonstrating specific Angular patterns (signals, forms, directives, etc.)
- **Services** (`src/app/services/`) - Data services and utilities following modern Angular patterns
- **Directives** (`src/app/directives/`) - Custom attribute directives demonstrating composition and behavior

### Navigation Structure

The application features a Material Design sidebar navigation with routes for each version:

- `/intro` - Introduction and overview
- `/angular-14` - Angular 14 features (protected route)
- `/angular-15` - Standalone APIs, directive composition, image directive
- `/angular-16` - Router input binding, signal-based APIs
- `/angular-17` - Control flow syntax (`@if`, `@for`, `@switch`)
- `/angular-18` - Signal-based reactivity, resource API
- `/angular-19` - Signal inputs/outputs, `@let` syntax, linked signals
- `/angular-20` - Zoneless Angular, improved signals
- `/angular-21` - Zoneless by default, signal forms, Vitest integration

## Key Features Demonstrated

### Angular 15
- Standalone components and APIs
- Directive composition API
- Image directive (`NgOptimizedImage`)
- Functional router guards
- Material range slider

### Angular 16
- Router input binding (`withComponentInputBinding`)
- Signal-based APIs

### Angular 17
- New control flow syntax (`@if`, `@for`, `@switch`)
- Deferrable views

### Angular 18
- Signal-based reactivity patterns
- Resource API for async data loading
- Improved signal APIs

### Angular 19
- Signal inputs and outputs (`input()`, `output()`)
- `@let` syntax for template variables
- Linked signals (`linkedSignal()`)
- Resource signal patterns
- Template literal support

### Angular 20
- Zoneless Angular (experimental)
- Enhanced signal capabilities

### Angular 21
- Zoneless by default
- Signal-based forms (experimental)
- FormArrayDirective
- Vitest as default test runner
- Enhanced compiler checks
- Improved accessibility features

## Development

### Prerequisites

- Node.js (version as specified in Angular 21 requirements)
- npm or yarn

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   # or
   ng serve
   ```

3. **Open your browser:**
   Navigate to `http://localhost:4200/` to view the application

4. **Start JSON server (for API examples):**
   ```bash
   npm run start:json-server
   ```
   This starts a mock API server on `http://localhost:3000` using `db.json`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run unit tests with Vitest |
| `npm run lint` | Run ESLint |
| `npm run start:json-server` | Start mock API server |

### Code Generation

Generate new components, services, or other Angular artifacts:

```bash
ng generate component components/my-component
ng generate service services/my-service
ng generate directive directives/my-directive
```

## Project Structure

```
src/app/
├── containers/              # Version-specific feature containers
│   ├── angular-14/
│   ├── angular-15/
│   ├── angular-16/
│   ├── angular-17/
│   ├── angular-18/
│   ├── angular-19/
│   ├── angular-20/
│   └── angular-21/
├── components/              # Reusable feature components
│   ├── aria-showcase/       # Accessibility demonstrations
│   ├── form-array-directive-demo/
│   ├── horizontal-drag-and-drop/
│   ├── linked-signal/
│   ├── resource-signal/
│   └── signal-forms-demo/
├── directives/              # Custom attribute directives
│   ├── border.directive.ts
│   └── highlight.directive.ts
├── services/                # Data services and utilities
│   ├── dessert.service.ts
│   ├── logged-in.service.ts
│   └── post.service.ts
├── utils/                   # Helper functions
├── app.routes.ts            # Route configuration
├── app.config.ts            # Application configuration
└── app.component.ts         # Root component with navigation
```

## Key Patterns & Best Practices

This project demonstrates modern Angular patterns:

- **Standalone Components** - All components use standalone architecture
- **Signals** - Reactive state management with `signal()`, `computed()`, and `effect()`
- **Resource API** - Modern async data loading patterns
- **Signal Forms** - Form handling with signal-based APIs (Angular 21)
- **Control Flow** - Native `@if`, `@for`, `@switch` syntax
- **OnPush Change Detection** - Performance optimization strategy
- **Lazy Loading** - Route-based code splitting
- **Material Design** - Angular Material components and theming

## Testing

This project uses **Vitest** (not Karma) as the test runner:

```bash
npm test
```

Tests are configured to run in watch mode during development. See `angular.json` for test configuration details.

## Building for Production

```bash
ng build
```

The build artifacts will be stored in the `dist/angular-workshop/` directory. The production build includes optimizations for performance and bundle size.

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.dev)
- [Signal Forms Guide](https://angular.dev/guide/forms/signals/overview)

## Contributing

This is a learning/workshop project. When adding new features:

1. Determine which Angular version should demonstrate the feature
2. Add the feature to the appropriate version container
3. Follow the project's coding standards (see `.github/copilot-instructions.md`)
4. Use standalone components, signals, and modern Angular patterns
5. Ensure accessibility (WCAG AA compliance)
