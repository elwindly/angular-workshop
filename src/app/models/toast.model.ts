export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  /** When set, the toast is automatically dismissed after this many milliseconds. */
  durationMs?: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
  durationMs?: number;
}
