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

### Signal Forms (Angular 21)

Always use Signal Forms for any new or refactored forms. Prefer the schema-based validation API and the `Field` directive for binding.

Example: minimal signal form with validation

```typescript
import { Component, ChangeDetectionStrategy, signal } from "@angular/core";
import { Field, form, required, email, min, max, minLength, maxLength, validate } from "@angular/forms/signals";

interface RegistrationModel {
  username: string | null;
  email: string | null;
  age: number | null;
  bio: string | null;
  termsAccepted: boolean | null;
}

@Component({
  selector: "app-registration",
  imports: [Field],
  template: `
    <form [form]="registrationForm">
      <label>
        Username
        <input [field]="registrationForm.username" />
      </label>
      <label>
        Email
        <input type="email" [field]="registrationForm.email" />
      </label>
      <label>
        Age
        <input type="number" [field]="registrationForm.age" />
      </label>
      <label>
        Bio
        <textarea [field]="registrationForm.bio"></textarea>
      </label>
      <label> <input type="checkbox" [field]="registrationForm.termsAccepted" /> Accept terms </label>
      <button type="submit">Submit</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  model = signal<RegistrationModel>({
    username: null,
    email: null,
    age: null,
    bio: null,
    termsAccepted: null,
  });

  registrationForm = form(this.model, (schemaPath) => {
    // Required + length
    required(schemaPath.username, { message: "Username is required" });
    minLength(schemaPath.username, 3, { message: "Min 3 characters" });
    maxLength(schemaPath.username, 20, { message: "Max 20 characters" });

    // Email
    required(schemaPath.email, { message: "Email is required" });
    email(schemaPath.email, { message: "Enter a valid email" });

    // Numeric range
    required(schemaPath.age, { message: "Age is required" });
    min(schemaPath.age, 18, { message: "Must be at least 18" });
    max(schemaPath.age, 120, { message: "Please enter a valid age" });

    // Custom validation (bio word count 10–100)
    validate(schemaPath.bio, ({ value }) => {
      const text = value();
      if (!text) return null;
      const words = text
        .trim()
        .split(/\s+/)
        .filter((w) => w.length);
      const count = words.length;
      if (count < 10) return { kind: "minWords", message: `Minimum 10 words (current: ${count})` };
      if (count > 100) return { kind: "maxWords", message: `Maximum 100 words (current: ${count})` };
      return null;
    });

    // Terms must be accepted
    validate(schemaPath.termsAccepted, ({ value }) => {
      return value() ? null : { kind: "required", message: "You must accept the terms" };
    });
  });
}
```

Notes:

- Bind forms with `[form]` and fields with `[field]` from `@angular/forms/signals`.
- Use field state signals in templates: `registrationForm.username().invalid()` and `pending()` for async.
- Prefer schema validators (`required`, `email`, `min`, `max`, `minLength`, `maxLength`, `validate`).

Signal Forms resources (Angular official docs):

- Overview: https://angular.dev/guide/forms/signals/overview
- Models: https://angular.dev/guide/forms/signals/models
- Validation: https://angular.dev/guide/forms/signals/validation
- Field state management: https://angular.dev/guide/forms/signals/field-state-management
- Custom controls: https://angular.dev/guide/forms/signals/custom-controls

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

- **Prefer Angular solutions over native APIs:** Use Angular-provided solutions instead of directly manipulating native APIs; for example, prefer the Signal Forms `[field]` directive for forms rather than wiring native inputs manually.
- **Always use control flow:** Prefer Angular's template control-flow constructs (e.g., `@if`/`@for` or `*ngIf`/`*ngFor`) for conditional rendering and lists — avoid manual DOM manipulation for reactive rendering.
- **Use Angular Material:** Use Angular Material components for UI controls and consistent styling; import modules per-component rather than globally.
- **Do not use deprecated features:** Avoid deprecated APIs and patterns; prefer the modern, supported Angular APIs and follow the project's best-practices.

### Forms Policy

- Always use Signal Forms (`@angular/forms/signals`) for new or refactored forms.
- Bind with `[form]` and `[field]`; avoid `FormGroup`/`FormControl` unless explicitly required for legacy demos.
- Define validation in the schema function with built-in rules and `validate()` for custom logic.
- Show errors reactively using field state (`invalid()`, `errors()`, `touched()`, `pending()`).
