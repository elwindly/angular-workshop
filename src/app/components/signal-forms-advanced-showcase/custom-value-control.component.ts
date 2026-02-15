import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
interface ValidationError {
  kind: string;
  message?: string;
}

@Component({
  selector: 'app-custom-value-control',
  template: `
    <input
      type="text"
      [value]="value()"
      (input)="onInput($event)"
      (blur)="onBlur()"
      [attr.aria-invalid]="invalid() && (touched() || showErrors())"
      [attr.aria-describedby]="invalid() && (touched() || showErrors()) ? errorId : null"
      [attr.aria-label]="label()"
    />
    @if (invalid() && (touched() || showErrors())) {
      <div [id]="errorId" class="custom-control-errors" role="alert">
        @for (err of errors(); track err.kind) {
          <span class="error-message">{{ err.message }}</span>
        }
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
        border: 1px solid var(--mat-sys-outline);
        border-radius: 4px;
        box-sizing: border-box;
      }
      input:focus {
        outline: none;
        border-color: var(--mat-sys-primary);
      }
      input[aria-invalid='true'] {
        border-color: var(--mat-sys-error);
      }
      .custom-control-errors {
        color: var(--mat-sys-error);
        font-size: 0.75rem;
        margin-top: 0.25rem;
      }
      .error-message {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomValueControlComponent implements FormValueControl<string> {
  readonly value = model<string>('');

  readonly invalid = input(false);
  readonly errors = input<readonly ValidationError[]>([]);
  readonly touched = model(false);
  readonly label = input<string>('Special code');
  readonly showErrors = input(false);

  readonly errorId = 'custom-value-control-errors';

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
  }

  onBlur(): void {
    this.touched.set(true);
  }
}
