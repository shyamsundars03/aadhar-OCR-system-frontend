// types/index.ts — simple type aliases live here; interfaces are in ../interfaces/
export type OcrStatus = 'idle' | 'ready' | 'processing' | 'success' | 'error';

// Re-export all interfaces from the dedicated interfaces folder
export type { IAadhaarResult } from '../interfaces/IAadhaarResult.interface';
export type { IApiResponse } from '../interfaces/IApiResponse.interface';
export type { IOcrApiClient } from '../interfaces/IOcrApiClient.interface';
export type { IToast } from '../interfaces/IToast.interface';
export type { IToastContext } from '../interfaces/IToastContext.interface';
