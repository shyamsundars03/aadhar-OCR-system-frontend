export const ERROR_MESSAGES = {
  MISSING_FILES: 'Please select both front and back images.',
  NETWORK_ERROR: 'Network error: Failed to connect to the OCR server. Please check if the backend is running.',
  RESPONSE_PARSE_ERROR: 'Failed to parse server response.',
  INVALID_RESPONSE_STRUCTURE: 'Server returned an invalid data structure.',
  GENERIC_ERROR: 'An unexpected error occurred during processing.',
  VERIFICATION_FAILED: 'Verification failed. Please try again.',
  FILE_TOO_LARGE: (label: string): string => `${label} size exceeds 2MB limit. Please upload a smaller image.`
} as const;
