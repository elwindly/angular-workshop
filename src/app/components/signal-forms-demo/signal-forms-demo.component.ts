import { JsonPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import {
  email,
  Field,
  form,
  max,
  maxLength,
  min,
  minLength,
  required,
  validate,
  validateHttp,
} from "@angular/forms/signals";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { delay, map, Observable, of } from "rxjs";

export interface UserFormData {
  username: string;
  email: string;
  age: number;
  country: string | null;
  bio: string;
  birthDate: Date | null;
  termsAccepted: boolean | null;
}

@Component({
  selector: "app-signal-forms-demo",
  imports: [
    ReactiveFormsModule,
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
  templateUrl: "./signal-forms-demo.component.html",
  styleUrl: "./signal-forms-demo.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalFormsDemoComponent {
  // Signal to track form submission state
  formSubmitted = signal(false);
  formData = signal<UserFormData | null>(null);
  userFormModel = signal<UserFormData>({
    username: "",
    email: "",
    age: 0,
    country: null,
    bio: "",
    birthDate: null,
    termsAccepted: null,
  });

  signalUserForm = form(this.userFormModel, (schemaPath) => {
    // 1. Username - required, min/max length, async validation for uniqueness
    required(schemaPath.username, { message: "Username is required" });
    minLength(schemaPath.username, 3, {
      message: "Username must be at least 3 characters",
    });

    maxLength(schemaPath.username, 20, {
      message: "Username cannot exceed 20 characters",
    });
    // Async validator for username uniqueness
    validateHttp(schemaPath.username, {
      request: ({ value }) => {
        const username = value();
        // Simulate API check - you could replace with actual API endpoint
        return `http://localhost:3000/checkUsername?username=${username}`;
      },
      onSuccess: () => {
        // Simulate checking against existing usernames
        const existingUsernames = ["admin", "user", "test", "demo"];
        const username = this.userFormModel().username?.toLowerCase();
        if (username && existingUsernames.includes(username)) {
          return {
            kind: "usernameTaken",
            message: "Username is already taken",
          };
        }
        return null;
      },
      onError: () => ({
        kind: "networkError",
        message: "Could not verify username availability",
      }),
    });

    // 2. Email - required, email pattern
    required(schemaPath.email, { message: "Email is required" });
    email(schemaPath.email, { message: "Invalid email format" });

    // 3. Age - required, min/max range
    required(schemaPath.age, { message: "Age is required" });
    min(schemaPath.age, 18, { message: "Must be at least 18 years old" });
    max(schemaPath.age, 120, { message: "Please enter a valid age" });

    // 4. Country - required select
    required(schemaPath.country, { message: "Country is required" });

    // 5. Bio - required, custom validator for word count
    required(schemaPath.bio, { message: "Bio is required" });
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
          kind: "minWords",
          message: `Minimum 10 words required (current: ${wordCount})`,
        };
      }
      if (wordCount > 100) {
        return {
          kind: "maxWords",
          message: `Maximum 100 words allowed (current: ${wordCount})`,
        };
      }
      return null;
    });

    // 6. Birth date - required, custom validator for date in past
    required(schemaPath.birthDate, { message: "Birth date is required" });
    validate(schemaPath.birthDate, ({ value }) => {
      const selectedDate = value();
      if (!selectedDate) return null;

      const date = new Date(selectedDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date >= today) {
        return {
          kind: "futureDate",
          message: "Birth date must be in the past",
        };
      }
      return null;
    });

    // 7. Terms - required checkbox (must be true)
    validate(schemaPath.termsAccepted, ({ value }) => {
      if (!value()) {
        return {
          kind: "required",
          message: "You must accept the terms and conditions",
        };
      }
      return null;
    });
  });

  // Define the form using signal-based FormControl/FormGroup
  userForm = new FormGroup({
    // 1. Username - required, min length, async validation for uniqueness
    username: new FormControl("", {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
      asyncValidators: [this.usernameAsyncValidator.bind(this)],
    }),

    // 2. Email - required, email pattern
    email: new FormControl("", [Validators.required, Validators.email]),

    // 3. Age - required, min/max range
    age: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(18),
      Validators.max(120),
    ]),

    // 4. Country - required select
    country: new FormControl("", Validators.required),

    // 5. Bio - required, custom validator for word count
    bio: new FormControl("", [Validators.required, this.wordCountValidator(10, 100)]),

    // 6. Birth date - required, custom validator for date in past
    birthDate: new FormControl<Date | null>(null, [Validators.required, this.pastDateValidator()]),

    // 7. Terms - required checkbox (must be true)
    termsAccepted: new FormControl(false, [Validators.requiredTrue]),
  });

  countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Japan",
    "Australia",
  ];

  // Async validator simulating username uniqueness check
  usernameAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null);
    }

    // Simulate API call with 1 second delay
    const existingUsernames = ["admin", "user", "test", "demo"];

    return of(control.value).pipe(
      delay(1000),
      map((username: string) => {
        const isTaken = existingUsernames.includes(username.toLowerCase());
        return isTaken ? { usernameTaken: true } : null;
      }),
    );
  }

  // Custom validator for word count
  wordCountValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const words = control.value
        .trim()
        .split(/\s+/)
        .filter((word: string) => word.length > 0);
      const wordCount = words.length;

      if (wordCount < min) {
        return { minWords: { required: min, actual: wordCount } };
      }
      if (wordCount > max) {
        return { maxWords: { required: max, actual: wordCount } };
      }
      return null;
    };
  }

  // Custom validator for past date
  pastDateValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const selectedDate = new Date(control.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate >= today) {
        return { futureDate: true };
      }
      return null;
    };
  }

  onSubmit(): void {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.userForm.reset();
    this.formSubmitted.set(false);
    this.formData.set(null);
  }
}
