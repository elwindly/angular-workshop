import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Title } from '@angular/platform-browser';
import { DessertService } from '../../services/dessert.service';

export interface TypedForm {
  text: FormControl<string | null>;
  number: FormControl<number | null>;
  email: FormControl<string | null>;
}

@Component({
  selector: 'app-angular-14',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    JsonPipe,
  ],
  templateUrl: './angular-14.component.html',
  styleUrl: './angular-14.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular14Component {
  // Angular 14: Using inject() function instead of constructor injection
  private readonly titleService = inject(Title);
  private readonly dessertService = inject(DessertService);

  // Angular 14: Protected members can be bound in templates
  protected readonly featureTitle = 'Angular 14 - Standalone Components & Modern Patterns';
  protected readonly injectDemoTitle = 'inject() Function Demo';
  protected readonly typedFormsTitle = 'Typed Reactive Forms';

  // Angular 14: Typed forms provide compile-time type safety
  readonly untypedForm = new FormGroup({
    text: new FormControl(''),
    number: new FormControl(0),
    email: new FormControl(''),
  });

  readonly typedForm = new FormGroup<TypedForm>({
    text: new FormControl<string | null>('', [Validators.required, Validators.minLength(3)]),
    number: new FormControl<number | null>(0, [Validators.required, Validators.min(1)]),
    email: new FormControl<string | null>('', [Validators.required, Validators.email]),
  });

  readonly formData = {
    untyped: this.untypedForm.value,
    typed: this.typedForm.value,
  };

  // Demonstrate inject() function with service
  loadDesserts(): void {
    this.dessertService.find({ originalName: '', englishName: '' }).subscribe((desserts) => {
      console.log('Loaded desserts:', desserts);
    });
  }

  // Demonstrate typed form type safety
  updateTypedForm(): void {
    // TypeScript will catch errors at compile time
    this.typedForm.setValue({
      text: 'Type-safe',
      number: 42,
      email: 'example@angular.dev',
    });
  }

  // This would cause a compile error with typed forms:
  // updateTypedFormInvalid() {
  //   this.typedForm.setValue({
  //     text: 'Type-safe',
  //     number: 'invalid', // Error: Type 'string' is not assignable to type 'number | null'
  //     email: 'example@angular.dev',
  //   });
  // }
}
