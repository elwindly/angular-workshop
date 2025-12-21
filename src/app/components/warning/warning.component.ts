import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-warning',
  template: `
    @if (isExpanded()) {
      <section>
        <p>Warning: Action needed!</p>
        <button (click)="shouldClose.emit(true)">Close</button>
      </section>
    }
  `,
})
export class AppWarningComponent {
  readonly canClose = input.required<boolean>();
  readonly isExpanded = model<boolean>();
  readonly shouldClose = output<boolean>();
}
