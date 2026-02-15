import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  applyEach,
  Field,
  form,
  hidden,
  maxLength,
  minLength,
  required,
  submit,
} from '@angular/forms/signals';
import type { SchemaPathTree } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomValueControlComponent } from './custom-value-control.component';

export interface AdvancedFormItem {
  label: string;
}

export interface AdvancedFormData {
  specialCode: string;
  items: AdvancedFormItem[];
  discountType: string | null;
}

const DISCOUNT_TYPES = [
  { value: null, label: 'None' },
  { value: '10off', label: '10% off' },
  { value: '20off', label: '20% off' },
] as const;

function itemSchema(item: SchemaPathTree<AdvancedFormItem>): void {
  required(item.label, { message: 'Item label is required' });
}

@Component({
  selector: 'app-signal-forms-advanced-showcase',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    JsonPipe,
    Field,
    CustomValueControlComponent,
  ],
  templateUrl: './signal-forms-advanced-showcase.component.html',
  styleUrl: './signal-forms-advanced-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsAdvancedShowcaseComponent {
  formSubmitted = signal(false);
  formData = signal<AdvancedFormData | null>(null);
  submitAttempted = signal(false);

  readonly discountTypes = DISCOUNT_TYPES;

  advancedModel = signal<AdvancedFormData>({
    specialCode: '',
    items: [],
    discountType: null,
  });

  advancedForm = form(this.advancedModel, (schemaPath) => {
    required(schemaPath.specialCode, { message: 'Special code is required' });

    minLength(schemaPath.items, 1, { message: 'Add at least one item' });
    maxLength(schemaPath.items, 10, { message: 'Maximum 10 items allowed' });
    applyEach(schemaPath.items, itemSchema);

    hidden(
      schemaPath.discountType,
      ({ valueOf }) => (valueOf(schemaPath.items)?.length ?? 0) < 5
    );
    required(schemaPath.discountType, {
      message: 'Select a discount type',
      when: ({ valueOf }) => (valueOf(schemaPath.items)?.length ?? 0) >= 5,
    });
  });

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitAttempted.set(true);
    if (this.advancedForm().invalid()) {
      return;
    }
    submit(this.advancedForm, async () => {
      this.formData.set({ ...this.advancedModel() });
      this.formSubmitted.set(true);
    });
  }

  onReset(): void {
    this.advancedModel.set({
      specialCode: '',
      items: [],
      discountType: null,
    });
    this.formSubmitted.set(false);
    this.formData.set(null);
    this.submitAttempted.set(false);
  }

  addItem(): void {
    this.advancedModel.update((m) => ({
      ...m,
      items: [...m.items, { label: '' }],
    }));
  }

  removeItem(index: number): void {
    this.advancedModel.update((m) => ({
      ...m,
      items: m.items.filter((_, i) => i !== index),
    }));
  }
}
