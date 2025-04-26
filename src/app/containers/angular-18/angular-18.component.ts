import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DefaultContentComponent } from '../../components/default-content/default-content.component';

@Component({
  selector: 'app-angular-18',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    DefaultContentComponent,
  ],
  templateUrl: './angular-18.component.html',
  styleUrl: './angular-18.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular18Component implements OnInit {
  myForm = new FormGroup({
    myControl: new FormControl<string | null>(null, { nonNullable: true }),
  });
  destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.myForm.controls.myControl.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        console.log('Events:', value);
      });
  }
}
