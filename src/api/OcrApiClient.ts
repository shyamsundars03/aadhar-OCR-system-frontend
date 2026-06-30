import { ENDPOINTS } from '../config/endpoints.config';
import { IAadhaarResult, IApiResponse, IOcrApiClient } from '../types';
import { AppError } from '../utils/AppError';
import { z } from 'zod';

const AadhaarResultSchema = z.object({
  name: z.string().nullable(),
  aadhaarNumber: z.string().nullable(),
  aadhaarSuffix: z.string().nullable(),
  dob: z.string().nullable(),
  gender: z.string().nullable(),
  address: z.string().nullable(),
  rawText: z.string()
});

const ApiResponseSchema = z.object({
  status: z.union([z.literal('success'), z.literal('fail'), z.literal('error')]),
  data: AadhaarResultSchema,
  message: z.string().optional()
});

export class OcrApiClient implements IOcrApiClient {
  async uploadAadhaarImages(frontFile: File, backFile: File): Promise<IApiResponse<IAadhaarResult>> {
    const formData = new FormData();
    formData.append('frontImage', frontFile);
    formData.append('backImage', backFile);

    let response: Response;
    try {
      response = await fetch(ENDPOINTS.OCR.AADHAAR, {
        method: 'POST',
        body: formData,
      });
    } catch (networkErr: any) {
      throw new AppError(
        'Network error: Failed to connect to OCR Server. Please check if backend is running.',
        true
      );
    }

    let rawJson: any;
    try {
      rawJson = await response.json();
    } catch (parseErr) {
      throw new AppError(
        `Failed to parse server response: HTTP ${response.status}`,
        false,
        response.status
      );
    }

    if (!response.ok) {
      const errMsg = rawJson.message || rawJson.error?.message || 'Failed to process Aadhaar card images.';
      throw new AppError(errMsg, false, response.status);
    }

    // Validate backend response at runtime with Zod
    const validation = ApiResponseSchema.safeParse(rawJson);
    if (!validation.success) {
      console.error('API Response Schema Validation failed:', validation.error);
      throw new AppError('Server returned an invalid data structure.');
    }

    return validation.data;
  }
}
