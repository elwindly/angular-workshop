import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form-array-directive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, JsonPipe],
  templateUrl: './form-array-directive-demo.component.html',
  styleUrl: './form-array-directive-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormArrayDirectiveDemoComponent {
  private fb = inject(NonNullableFormBuilder);

  // Typed reactive form: items is a FormArray of non-null string controls
  readonly items = this.fb.array<string>([]);

  readonly form = this.fb.group({
    items: this.items,
  });

  addItem(): void {
    this.items.push(this.fb.control<string>(''));
  }

  removeItem(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.removeAt(index);
    }
  }

  setPreset(): void {
    this.items.clear();
    ['Apple', 'Banana', 'Cherry'].forEach((v) => this.items.push(this.fb.control<string>(v)));
  }
}
