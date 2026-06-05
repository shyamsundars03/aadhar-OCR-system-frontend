import { useState, useEffect } from 'react';
import { uploadAadhaarImages } from '../api/ocrApi';

export const useAadhaarOcr = () => {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);

  const [status, setStatus] = useState('idle'); // 'idle' | 'ready' | 'processing' | 'success' | 'error'
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Generate previews and update status when files change
  useEffect(() => {
    if (frontFile && backFile) {
      setStatus('ready');
    } else {
      setStatus('idle');
    }

    // Front image preview
    let frontUrl = null;
    if (frontFile) {
      frontUrl = URL.createObjectURL(frontFile);
      setFrontPreview(frontUrl);
    } else {
      setFrontPreview(null);
    }

    // Back image preview
    let backUrl = null;
    if (backFile) {
      backUrl = URL.createObjectURL(backFile);
      setBackPreview(backUrl);
    } else {
      setBackPreview(null);
    }

    // Cleanup function to avoid memory leaks
    return () => {
      if (frontUrl) URL.revokeObjectURL(frontUrl);
      if (backUrl) URL.revokeObjectURL(backUrl);
    };
  }, [frontFile, backFile]);

  // Set files handler
  const setFiles = (front, back) => {
    setFrontFile(front);
    setBackFile(back);
    // Reset output states when new files are selected
    setResult(null);
    setError(null);
  };

  // Run OCR request
  const runOcr = async () => {
    if (!frontFile || !backFile) {
      setError('Please select both front and back images.');
      setStatus('error');
      return;
    }

    setStatus('processing');
    setError(null);
    setResult(null);

    try {
      const response = await uploadAadhaarImages({ frontFile, backFile });
      if (response.status === 'success') {
        setResult(response.data);
        setStatus('success');
      } else {
        throw new Error(response.message || 'Verification failed');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during processing.');
      setStatus('error');
    }
  };

  const resetFlow = () => {
    setFrontFile(null);
    setBackFile(null);
    setFrontPreview(null);
    setBackPreview(null);
    setResult(null);
    setError(null);
    setStatus('idle');
  };

  return {
    status,
    result,
    error,
    frontPreview,
    backPreview,
    frontFile,
    backFile,
    setFiles,
    runOcr,
    resetFlow
  };
};
