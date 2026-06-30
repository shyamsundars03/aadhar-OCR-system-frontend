import { IAadhaarResult } from './IAadhaarResult.interface';

export interface IApiResponse<T = IAadhaarResult> {
  status: 'success' | 'fail' | 'error';
  data: T;
  message?: string;
}
