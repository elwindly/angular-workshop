import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SelfClosingTagComponent } from '../../components/self-closing-tag/self-closing-tag.component';

@Component({
  selector: 'app-angular-16',
  imports: [
    SelfClosingTagComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './angular-16.component.html',
  styleUrl: './angular-16.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular16Component implements OnInit {
  @Input() inputData!: string;
  // @Input({ required: true }) someInput!: string;
  myForm = new FormGroup({
    myControl: new FormControl<string | null>(null, { nonNullable: true }),
  });

  myControlSignal = toSignal(this.myForm.controls.myControl.valueChanges);
  destroyRef = inject(DestroyRef);
  ngOnInit() {
    this.myForm.controls.myControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        console.log('Value changed:', value);
      });
  }
}
