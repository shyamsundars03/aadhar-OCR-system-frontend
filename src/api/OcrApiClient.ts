import { ENDPOINTS } from '../config/endpoints.config';
import { IAadhaarResult } from '../interfaces/IAadhaarResult.interface';
import { IApiResponse } from '../interfaces/IApiResponse.interface';
import { IOcrApiClient } from '../interfaces/IOcrApiClient.interface';
import { AppError } from '../utils/AppError';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { ApiResponseSchema } from '../validations/ocr.validation';

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
    } catch (networkErr: unknown) {
      // Narrow: any fetch network failure is a TypeError
      const errMsg = networkErr instanceof Error
        ? networkErr.message
        : ERROR_MESSAGES.NETWORK_ERROR;
      throw new AppError(`${ERROR_MESSAGES.NETWORK_ERROR}: ${errMsg}`, true);
    }

    let rawJson: unknown;
    try {
      rawJson = await response.json();
    } catch (_parseErr: unknown) { // eslint-disable-line @typescript-eslint/no-unused-vars
      throw new AppError(
        `${ERROR_MESSAGES.RESPONSE_PARSE_ERROR}: HTTP ${response.status}`,
        false,
        response.status
      );
    }

    if (!response.ok) {
      // Narrow the unknown rawJson before accessing properties
      const errorData = rawJson as Record<string, unknown>;
      const errMsg =
        typeof errorData?.message === 'string'
          ? errorData.message
          : 'Failed to process Aadhaar card images.';
      throw new AppError(errMsg, false, response.status);
    }

    // Validate backend response at runtime with Zod
    const validation = ApiResponseSchema.safeParse(rawJson);
    if (!validation.success) {
      console.error('API Response Schema Validation failed:', validation.error);
      throw new AppError(ERROR_MESSAGES.INVALID_RESPONSE_STRUCTURE);
    }

    return validation.data;
  }
}
