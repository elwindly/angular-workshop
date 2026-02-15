import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { ToastVariant } from '../../models/toast.model';
import { ToastService } from '../../services/toast.service';

const VARIANT_ROLE: Record<ToastVariant, 'status' | 'alert'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  error: 'alert',
};

const VARIANT_ARIA_LIVE: Record<ToastVariant, 'polite' | 'assertive'> = {
  info: 'polite',
  success: 'polite',
  warning: 'assertive',
  error: 'assertive',
};

const VARIANT_ICON: Record<ToastVariant, string> = {
  info: 'info',
  success: 'check_circle',
  warning: 'warning',
  error: 'error',
};

@Component({
  selector: 'app-toast',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);
  protected readonly variantRole = VARIANT_ROLE;
  protected readonly variantAriaLive = VARIANT_ARIA_LIVE;
  protected readonly variantIcon = VARIANT_ICON;

  protected dismiss(id: string): void {
    this.toastService.dismiss(id);
  }
}
