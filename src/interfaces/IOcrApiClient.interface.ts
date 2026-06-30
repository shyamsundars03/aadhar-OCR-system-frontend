import { IAadhaarResult } from './IAadhaarResult.interface';
import { IApiResponse } from './IApiResponse.interface';

export interface IOcrApiClient {
  uploadAadhaarImages(frontFile: File, backFile: File): Promise<IApiResponse<IAadhaarResult>>;
}
