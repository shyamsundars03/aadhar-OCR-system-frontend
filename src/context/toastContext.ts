import { createContext } from 'react';
import type { IToastContext } from '../interfaces/IToastContext.interface';

export type { IToastContext } from '../interfaces/IToastContext.interface';

export const ToastContext = createContext<IToastContext | null>(null);
