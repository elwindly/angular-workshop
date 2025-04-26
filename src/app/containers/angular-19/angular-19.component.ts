import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HorizontalDragAndDropComponent } from '../../components/horizontal-drag-and-drop/horizontal-drag-and-drop.component';
import { LinkedSignalComponent } from '../../components/linked-signal/linked-signal.component';
import { ResourceSignalComponent } from '../../components/resource-signal/resource-signal.component';

@Component({
  selector: 'app-angular-19',
  imports: [
    MatButtonModule,
    ResourceSignalComponent,
    HorizontalDragAndDropComponent,
    LinkedSignalComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './angular-19.component.html',
  styleUrl: './angular-19.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular19Component {
  untaggedTemlate = 'untagged template';

  options = signal(['horizontalDrag', 'resourceSignal', 'linkedSignal']);

  myForm = new FormGroup({
    myControl: new FormControl<string | null>('horizontalDrag', {
      nonNullable: true,
    }),
  });

  valueChanges$ = this.myForm.get('myControl')?.valueChanges;
}
