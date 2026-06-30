export interface IAadhaarResult {
  name: string | null;
  aadhaarNumber: string | null;
  aadhaarSuffix: string | null;
  dob: string | null;
  gender: string | null;
  address: string | null;
  rawText: string;
}

export interface IApiResponse<T = any> {
  status: 'success' | 'fail' | 'error';
  data: T;
  message?: string;
}

export interface IToast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export type OcrStatus = 'idle' | 'ready' | 'processing' | 'success' | 'error';

export interface IOcrApiClient {
  uploadAadhaarImages(frontFile: File, backFile: File): Promise<IApiResponse<IAadhaarResult>>;
}
