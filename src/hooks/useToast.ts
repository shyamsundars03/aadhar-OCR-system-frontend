import { useContext } from 'react';
import { ToastContext } from '../context/toastContext';
import type { IToastContext } from '../interfaces/IToastContext.interface';

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
