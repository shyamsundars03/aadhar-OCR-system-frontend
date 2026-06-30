import { createContext } from 'react';

export interface IToastContext {
  addToast: (message: string, type?: 'success' | 'error', duration?: number) => void;
}

export const ToastContext = createContext<IToastContext | null>(null);
