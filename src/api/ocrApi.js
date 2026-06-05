const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const uploadAadhaarImages = async ({ frontFile, backFile }) => {
  const formData = new FormData();
  formData.append('frontImage', frontFile);
  formData.append('backImage', backFile);

  const response = await fetch(`${API_BASE_URL}/api/ocr/aadhaar`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error?.message || 'Failed to process Aadhaar card images. Please try again.');
  }

  return data;
};
