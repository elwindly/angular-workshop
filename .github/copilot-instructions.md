# Angular Workshop - AI Coding Instructions

## Project Overview

This is an **Angular 21 workshop/learning application** (built with Angular CLI 21.0.2) that demonstrates modern Angular patterns and features across versions 14-20. It's a structured reference implementation, not a production application, organized as "version containers" that showcase feature evolution.

**Tech Stack**: Angular 21, Material Design 21, Vitest (not Karma), TypeScript 5.9, SCSS, ESLint 9

## Architecture

### Key Structural Pattern: Version Containers

The app uses a container-based learning architecture:

- **`src/app/containers/`** - One folder per Angular version (angular-14/ through angular-20/)
- Each container is a lazy-loaded standalone component demonstrating that version's features
- Routes defined in `src/app/app.routes.ts` with `loadComponent` dynamic imports
- Container titles use route titles: `/angular-17` → path & title both "angular-17"

**Why this matters**: When adding features, understand which version(s) should demonstrate them. Containers are self-contained units; don't share template logic between them.

### Data Flow & Services

- **DessertService** (`src/app/services/dessert.service.ts`) - Loads desserts.json from public/ with 1s simulated delay
  - Exposes `.find(filter)` returning Observable<Dessert[]> and `.findPromise()` for Promise-based components
  - Uses resource loading pattern (`resource()` API) for modern async handling
- **LoggedInService** - Route guard (injectable as guard function, see app.routes.ts line 6)
- **TitleStrategy** - Custom provider for route-based page titles (via TitleStrategy token)

**Key pattern**: Services are injectable with `inject()`, not constructor parameters. All services use `providedIn: 'root'` singleton scope.

### Component Conventions

1. **Standalone Components** - All components use `imports: [...]` and `changeDetection: ChangeDetectionStrategy.OnPush`
   - Example: [ResourceSignalComponent](src/app/components/resource-signal/resource-signal.component.ts#L29-L30) sets OnPush explicitly
2. **Signals & Reactivity**
   - `signal()` for mutable state, `computed()` for derived state
   - `resource()` for async resource loading with AbortSignal support
   - `linkedSignal()` for dependent state management (see [linked-signal component](src/app/components/linked-signal/linked-signal.component.ts#L37-L47))
3. **Template Selectors** - Use app prefix: `<app-resource-signal>`, `<app-border>` (selector in directive metadata)
4. **Signal Access** - In templates, call signals as functions: `{{ signal() }}`, not `{{ signal }}`

## Testing & Build

### Test Setup

- **Framework**: Vitest (not Karma) with browser/Playwright support
- **Config**: See `angular.json` test options `"browsers": ["chromium"]`
- **Pattern**: Test files use `TestBed` from `@angular/core/testing` (standard API)
  - Example: [AppComponent spec](src/app/app.component.spec.ts) shows TestBed setup with RouterModule mock
- **Command**: `npm test` runs Vitest in watch mode

### Build & Serve

- **Dev**: `npm start` → `ng serve` (Angular 21 dev server, default port 4200)
- **Build**: `ng build` → production build to `dist/angular-workshop/`
- **Lint**: `ng lint` → ESLint (v9) with angular-eslint/21.1.0
- **Watch**: `ng build --watch` for incremental builds during development

## Code Style & TypeScript

- **Strict Mode**: `tsconfig.json` enables `strict: true`, `strictTemplates: true`, `noImplicitOverride: true`
  - Every function must have explicit return types; no implicit `any`
- **SCSS Modules**: Components use `.component.scss` (auto-scoped by Angular)
- **Imports**: Modern ES modules with `import` statements; Material imports are granular (e.g., `MatCardModule`, `MatFormFieldModule`)
- **Type Safety**: Interfaces defined in service files (e.g., `Dessert` interface in dessert.service.ts)

## Critical Implementation Patterns

### Creating a New Component

Use Angular CLI, specify SCSS:

```bash
# In workspace root
ng generate component components/my-component
```

This respects `angular.json` schema setting `style: scss`. Import Material modules explicitly in the component:

```typescript
import { ChangeDetectionStrategy, Component, computed, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-my-component",
  imports: [MatCardModule],
  templateUrl: "./my-component.component.html",
  styleUrl: "./my-component.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponentComponent {
  mySignal = signal(0);
  derived = computed(() => this.mySignal() * 2);
}
```

### Async Data Loading (Modern Pattern)

Use `resource()` + `computed()` instead of RxJS subscriptions:

```typescript
import { resource, signal, computed } from "@angular/core";

criteria = signal({ originalName: "", englishName: "" });
dessertsResource = resource({
  params: this.criteria,
  loader: (param) => this.dessertService.findPromise(param.params, param.abortSignal),
});
desserts = computed(() => this.dessertsResource.value() ?? []);
isLoading = this.dessertsResource.isLoading; // Signal<boolean>
error = this.dessertsResource.error; // Signal<Error | null>
```

### Directives (Attribute Directives)

See [BorderDirective](src/app/directives/border.directive.ts): selector `[appBorder]`, inject ElementRef, use @HostListener for DOM events.

## Material Design Integration

- **Modules imported per-component** (no global NgModule)
- **Prebuilt theme**: `@angular/material/prebuilt-themes/cyan-orange.css` loaded in `angular.json`
- **Material icons**: Use `<mat-icon>` in templates with icon names
- **Button styling**: `MatButtonModule` provides button components and variants

## Common Gotchas

1. **Route Titles**: Set `title: 'label'` in route definition; TitleStrategy automatically updates the browser tab
2. **Lazy Loading**: Always use `loadComponent: () => import(...).then(m => m.ComponentName)` for code splitting
3. **Router Input Binding**: `withComponentInputBinding()` in AppConfig allows `@Input()` to receive route data directly
4. **Signal Calls in Templates**: `{{ mySignal() }}`, not `{{ mySignal }}`—this is intentional for reactivity tracking

## File Organization

```
src/app/
  ├── containers/         # Version containers (lazy-loaded)
  ├── components/         # Reusable UI components
  ├── directives/         # Custom directives
  ├── services/           # Singleton services
  ├── utils/              # Helper functions (toPromise, FormGroupTyped)
  ├── app.routes.ts       # All routes defined here
  ├── app.config.ts       # Providers, DI setup
  └── app.component.ts    # Root component with navigation
```

## Quick Reference: Essential Commands

| Task               | Command                           |
| ------------------ | --------------------------------- |
| Start dev server   | `npm start`                       |
| Run tests          | `npm test`                        |
| Generate component | `ng generate component path/name` |
| Build for prod     | `ng build`                        |
| Lint code          | `ng lint`                         |

## Assistant Guidance

- **Prefer Angular solutions over native APIs:** Use Angular-provided solutions instead of directly manipulating native APIs; for example, prefer the signal form `[field]` directive for forms rather than wiring native inputs manually.
- **Always use control flow:** Prefer Angular's template control-flow constructs (e.g., `@if`/`@for` or `*ngIf`/`*ngFor`) for conditional rendering and lists — avoid manual DOM manipulation for reactive rendering.
- **Use Angular Material:** Use Angular Material components for UI controls and consistent styling; import modules per-component rather than globally.
- **Do not use deprecated features:** Avoid deprecated APIs and patterns; prefer the modern, supported Angular APIs and follow the project's best-practices.
