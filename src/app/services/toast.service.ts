import { Injectable, signal } from '@angular/core';
import type { ToastMessage, ToastVariant } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toasts = signal<ToastMessage[]>([]);

  readonly messages = this.toasts.asReadonly();

  show(message: string, variant: ToastVariant = 'info'): string {
    const id = crypto.randomUUID();
    const toast: ToastMessage = { id, message, variant };
    this.toasts.update((list) => [...list, toast]);
    return id;
  }

  info(message: string): string {
    return this.show(message, 'info');
  }

  success(message: string): string {
    return this.show(message, 'success');
  }

  warning(message: string): string {
    return this.show(message, 'warning');
  }

  error(message: string): string {
    return this.show(message, 'error');
  }

  dismiss(id: string): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  dismissAll(): void {
    this.toasts.set([]);
  }
}
