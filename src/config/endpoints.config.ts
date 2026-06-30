const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const ENDPOINTS = {
  OCR: {
    AADHAAR: `${API_BASE_URL}/api/ocr/aadhaar`
  },
  STATUS: `${API_BASE_URL}/api/status`
} as const;
