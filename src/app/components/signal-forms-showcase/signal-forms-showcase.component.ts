import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  debounce,
  email,
  Field,
  form,
  max,
  maxLength,
  min,
  minLength,
  pattern,
  required,
  submit,
  validate,
  validateHttp,
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

/** API contract: GET returns { available: boolean }. available === false means username is taken. */
interface CheckUsernameResponse {
  available?: boolean;
}

export interface ShowcaseFormData {
  userName: string;
  email: string;
  password: string;
  repeatPassword: string;
  age: number;
  country: string | null;
  phone: string;
  birthDate: Date | null;
  bio: string;
  termsAccepted: boolean;
}

@Component({
  selector: 'app-signal-forms-showcase',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    JsonPipe,
    Field,
  ],
  templateUrl: './signal-forms-showcase.component.html',
  styleUrl: './signal-forms-showcase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsShowcaseComponent {
  formSubmitted = signal(false);
  formData = signal<ShowcaseFormData | null>(null);
  /** Set when user has attempted submit; used to show validation errors when form is invalid. */
  submitAttempted = signal(false);

  showcaseModel = signal<ShowcaseFormData>({
    userName: '',
    email: '',
    password: '',
    repeatPassword: '',
    age: 0,
    country: null,
    phone: '',
    birthDate: null,
    bio: '',
    termsAccepted: false,
  });

  signalShowcaseForm = form(this.showcaseModel, (schemaPath) => {
    // 1. userName - required, min/max length, debounce, async validation via GET endpoint
    debounce(schemaPath.userName, 300);
    required(schemaPath.userName, { message: 'Username is required' });
    minLength(schemaPath.userName, 3, {
      message: 'Username must be at least 3 characters',
    });
    maxLength(schemaPath.userName, 20, {
      message: 'Username cannot exceed 20 characters',
    });
    validateHttp(schemaPath.userName, {
      request: ({ value }) => {
        const username = value();
        return `http://localhost:3000/checkUsername?username=${encodeURIComponent(username)}`;
      },
      onSuccess: (result: CheckUsernameResponse) => {
        if (result && result.available === false) {
          return {
            kind: 'usernameTaken',
            message: 'Username is already taken',
          };
        }
        return null;
      },
      onError: () => ({
        kind: 'networkError',
        message: 'Could not verify username availability',
      }),
    });

    // 2. email - required, email format
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Invalid email format' });

    // 3. password - required, min/max length, pattern for strength (letter + number)
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, {
      message: 'Password must be at least 8 characters',
    });
    maxLength(schemaPath.password, 32, {
      message: 'Password cannot exceed 32 characters',
    });
    pattern(schemaPath.password, /^(?=.*[A-Za-z])(?=.*\d).+$/, {
      message: 'Password must contain at least one letter and one number',
    });

    // 4. repeatPassword - required, must match password
    required(schemaPath.repeatPassword, { message: 'Please confirm your password' });
    validate(schemaPath.repeatPassword, ({ value }) => {
      const repeat = value();
      const pwd = this.showcaseModel().password;
      if (!repeat || !pwd) return null;
      if (repeat !== pwd) {
        return {
          kind: 'passwordMismatch',
          message: 'Passwords do not match',
        };
      }
      return null;
    });

    // 5. age - required, min/max range
    required(schemaPath.age, { message: 'Age is required' });
    min(schemaPath.age, 18, { message: 'Must be at least 18 years old' });
    max(schemaPath.age, 120, { message: 'Please enter a valid age' });

    // 6. country - required select
    required(schemaPath.country, { message: 'Country is required' });

    // 7. phone - required, pattern for simple phone (digits, spaces, dashes, parentheses)
    required(schemaPath.phone, { message: 'Phone number is required' });
    pattern(schemaPath.phone, /^[\d\s\-()]+$/, {
      message: 'Enter a valid phone number (digits, spaces, dashes, parentheses)',
    });
    minLength(schemaPath.phone, 10, {
      message: 'Phone number must be at least 10 digits',
    });

    // 8. birthDate - required, custom validator for past date
    required(schemaPath.birthDate, { message: 'Birth date is required' });
    validate(schemaPath.birthDate, ({ value }) => {
      const selectedDate = value();
      if (!selectedDate) return null;
      const date = new Date(selectedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date >= today) {
        return {
          kind: 'futureDate',
          message: 'Birth date must be in the past',
        };
      }
      return null;
    });

    // 9. bio - required, custom word count (10-100 words)
    required(schemaPath.bio, { message: 'Bio is required' });
    validate(schemaPath.bio, ({ value }) => {
      const text = value();
      if (!text) return null;
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word: string) => word.length > 0);
      const wordCount = words.length;
      if (wordCount < 10) {
        return {
          kind: 'minWords',
          message: `Minimum 10 words required (current: ${wordCount})`,
        };
      }
      if (wordCount > 100) {
        return {
          kind: 'maxWords',
          message: `Maximum 100 words allowed (current: ${wordCount})`,
        };
      }
      return null;
    });

    // 10. termsAccepted - must be true
    validate(schemaPath.termsAccepted, ({ value }) => {
      if (!value()) {
        return {
          kind: 'required',
          message: 'You must accept the terms and conditions',
        };
      }
      return null;
    });
  });

  countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Japan',
    'Australia',
  ];

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitAttempted.set(true);
    if (this.signalShowcaseForm().invalid()) {
      return;
    }
    submit(this.signalShowcaseForm, async () => {
      this.formData.set({ ...this.showcaseModel() });
      this.formSubmitted.set(true);
    });
  }

  onReset(): void {
    this.showcaseModel.set({
      userName: '',
      email: '',
      password: '',
      repeatPassword: '',
      age: 0,
      country: null,
      phone: '',
      birthDate: null,
      bio: '',
      termsAccepted: false,
    });
    this.formSubmitted.set(false);
    this.formData.set(null);
    this.submitAttempted.set(false);
  }
}
