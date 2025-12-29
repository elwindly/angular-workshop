import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignalFormsDemoComponent } from '../../components/signal-forms-demo/signal-forms-demo.component';

@Component({
  selector: 'app-angular-21',
  imports: [SignalFormsDemoComponent],
  templateUrl: './angular-21.component.html',
  styleUrl: './angular-21.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular21Component {}
