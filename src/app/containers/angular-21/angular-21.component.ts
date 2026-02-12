import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AriaShowcaseComponent } from '../../components/aria-showcase/aria-showcase.component';
import { FormArrayDirectiveDemoComponent } from '../../components/form-array-directive/form-array-directive-demo.component';
import { SignalFormsShowcaseComponent } from '../../components/signal-forms-showcase/signal-forms-showcase.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-angular-21',
  imports: [
    MatButtonModule,
    SignalFormsShowcaseComponent,
    FormArrayDirectiveDemoComponent,
    AriaShowcaseComponent,
  ],
  templateUrl: './angular-21.component.html',
  styleUrl: './angular-21.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Angular21Component {
  protected readonly toast = inject(ToastService);

  protected showInfo(): void {
    this.toast.info('This is an info message.');
  }

  protected showSuccess(): void {
    this.toast.success('Action completed successfully.');
  }

  protected showWarning(): void {
    this.toast.warning('Please review before continuing.');
  }

  protected showError(): void {
    this.toast.error('Something went wrong. Please try again.');
  }
}
