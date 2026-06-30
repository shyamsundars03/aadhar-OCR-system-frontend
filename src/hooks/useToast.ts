import { useContext } from 'react';
import { ToastContext, IToastContext } from '../context/toastContext';

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
