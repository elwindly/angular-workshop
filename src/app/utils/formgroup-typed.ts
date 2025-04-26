/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  UntypedFormGroup,
} from '@angular/forms';

import { Observable } from 'rxjs';

export class OldSchoolFormGroupTyped<
  T extends { [key: string]: any }
> extends UntypedFormGroup {
  declare readonly value: T;
  declare readonly valueChanges: Observable<T>;

  constructor(
    controls: { [key in keyof T]: AbstractControl },
    validatorOrOpts?:
      | AsyncValidatorFn
      | AsyncValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null | undefined
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  override patchValue(
    value: Partial<T> | T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ): void {
    super.patchValue(value, options);
  }

  override setValue(
    value: Partial<T> | T,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ): void {
    super.setValue(value, options);
  }

  override addControl(
    name: Extract<keyof T, string> | string,
    control: AbstractControl
  ): void {
    super.addControl(name, control);
  }

  override setControl(
    name: Extract<keyof T, string> | string,
    control: AbstractControl
  ): void {
    super.setControl(name, control);
  }

  override removeControl(name: Extract<keyof T, string> | string): void {
    super.removeControl(name);
  }

  override get(
    path: Array<Extract<keyof T, string>> | Extract<keyof T, string> | string
  ): AbstractControl | never | null {
    return super.get(path);
  }

  override getRawValue(): T {
    return super.getRawValue() as T;
  }
}
