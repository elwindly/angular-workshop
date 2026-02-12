import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import type { ToastVariant } from '../../models/toast.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);

  protected dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  protected getVariantRole(variant: ToastVariant): 'status' | 'alert' {
    return variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  }

  protected getVariantAriaLive(variant: ToastVariant): 'polite' | 'assertive' {
    return variant === 'error' || variant === 'warning' ? 'assertive' : 'polite';
  }

  protected getIconName(variant: ToastVariant): string {
    const icons: Record<ToastVariant, string> = {
      info: 'info',
      success: 'check_circle',
      warning: 'warning',
      error: 'error',
    };
    return icons[variant];
  }
}
