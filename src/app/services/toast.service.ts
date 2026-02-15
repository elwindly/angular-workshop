import { Injectable, signal } from '@angular/core';
import type { ToastMessage, ToastOptions, ToastVariant } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly toasts = signal<ToastMessage[]>([]);
  private readonly dismissTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

  readonly messages = this.toasts.asReadonly();

  show(message: string, variant: ToastVariant = 'info', options?: ToastOptions): string {
    const id = crypto.randomUUID();
    const durationMs = options?.durationMs;
    const toast: ToastMessage = { id, message, variant, durationMs };
    this.toasts.update((list) => [...list, toast]);

    if (durationMs != null && durationMs > 0) {
      const timeoutId = setTimeout(() => {
        this.dismissTimeouts.delete(id);
        this.dismiss(id);
      }, durationMs);
      this.dismissTimeouts.set(id, timeoutId);
    }

    return id;
  }

  info(message: string, options?: ToastOptions): string {
    return this.show(message, 'info', options);
  }

  success(message: string, options?: ToastOptions): string {
    return this.show(message, 'success', options);
  }

  warning(message: string, options?: ToastOptions): string {
    return this.show(message, 'warning', options);
  }

  error(message: string, options?: ToastOptions): string {
    return this.show(message, 'error', options);
  }

  dismiss(id: string): void {
    const timeoutId = this.dismissTimeouts.get(id);
    if (timeoutId != null) {
      clearTimeout(timeoutId);
      this.dismissTimeouts.delete(id);
    }
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  dismissAll(): void {
    for (const timeoutId of this.dismissTimeouts.values()) {
      clearTimeout(timeoutId);
    }
    this.dismissTimeouts.clear();
    this.toasts.set([]);
  }
}
