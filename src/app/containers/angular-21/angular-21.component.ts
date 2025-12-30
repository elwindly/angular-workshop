import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AriaShowcaseComponent } from '../../components/aria-showcase/aria-showcase.component';
import { FormArrayDirectiveDemoComponent } from '../../components/form-array-directive/form-array-directive-demo.component';
import { SignalFormsDemoComponent } from '../../components/signal-forms-demo/signal-forms-demo.component';

@Component({
  selector: 'app-angular-21',
  imports: [SignalFormsDemoComponent, FormArrayDirectiveDemoComponent, AriaShowcaseComponent],
  templateUrl: './angular-21.component.html',
  styleUrl: './angular-21.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular21Component {}
