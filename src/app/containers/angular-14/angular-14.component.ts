import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface TypedForm {
  text: FormControl<string | null>;
  number: FormControl<number | null>;
}

@Component({
  selector: 'app-angular-14',
  imports: [],
  templateUrl: './angular-14.component.html',
  styleUrl: './angular-14.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular14Component {
  protected listItemTitle = 'Bind to protected component members in template';
  unnecessarayNullishOprator = 'nullish coalescing on non-nullable values';
  notTypedForm: FormGroup = new FormGroup({
    text: new FormControl(''),
    number: new FormControl(0),
  });

  typedForm: FormGroup<TypedForm> = new FormGroup<TypedForm>({
    text: new FormControl(''),
    number: new FormControl(0),
  });

  changeNotTypedFormValue() {
    this.notTypedForm.setValue({
      dwad: 'test',
    });
  }

  // changeTypedFormValue() {
  //   this.typedForm.setValue({
  //     dwad: 'test',
  //   });
  // }
}
