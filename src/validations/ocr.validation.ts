import { z } from 'zod';
import type { IAadhaarResult } from '../interfaces/IAadhaarResult.interface';
import type { IApiResponse } from '../interfaces/IApiResponse.interface';

export const AadhaarResultSchema = z.object({
  name: z.string().nullable(),
  aadhaarNumber: z.string().nullable(),
  aadhaarSuffix: z.string().nullable(),
  dob: z.string().nullable(),
  gender: z.string().nullable(),
  address: z.string().nullable(),
  rawText: z.string().optional().nullable(),
  verificationScore: z.number().optional()
}) satisfies z.ZodType<IAadhaarResult>;

export const ApiResponseSchema = z.object({
  status: z.union([z.literal('success'), z.literal('fail'), z.literal('error')]),
  data: AadhaarResultSchema,
  message: z.string().optional()
}) satisfies z.ZodType<IApiResponse>;

export type ValidatedAadhaarResult = z.infer<typeof AadhaarResultSchema>;
export type ValidatedApiResponse = z.infer<typeof ApiResponseSchema>;
