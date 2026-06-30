export interface IToastContext {
  addToast: (message: string, type?: 'success' | 'error', duration?: number) => void;
}
