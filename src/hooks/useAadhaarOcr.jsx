import { useState, useEffect, useMemo } from 'react';
import { uploadAadhaarImages } from '../api/ocrApi';

export const useAadhaarOcr = () => {
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);
  const [processStatus, setProcessStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

 
  const status = useMemo(() => {
    if (processStatus !== 'idle') return processStatus;
    return frontFile && backFile ? 'ready' : 'idle';
  }, [frontFile, backFile, processStatus]);


  useEffect(() => {
    if (!frontFile) { setFrontPreview(null); return; }
    const url = URL.createObjectURL(frontFile);
    setFrontPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [frontFile]);

  useEffect(() => {
    if (!backFile) { setBackPreview(null); return; }
    const url = URL.createObjectURL(backFile);
    setBackPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [backFile]);

  const setFiles = (front, back) => {
    setFrontFile(front);
    setBackFile(back);
    setResult(null);
    setError(null);
    setProcessStatus('idle');
  };

  const runOcr = async () => {
    if (!frontFile || !backFile) {
      setError('Please select both front and back images.');
      setProcessStatus('error');
      return;
    }
    setProcessStatus('processing');
    setError(null);
    setResult(null);
    try {
      const response = await uploadAadhaarImages({ frontFile, backFile });
      if (response.status === 'success') {
        setResult(response.data);
        setProcessStatus('success');
      } else {
        throw new Error(response.message || 'Verification failed');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during processing.');
      setProcessStatus('error');
    }
  };

  const resetFlow = () => {
    setFrontFile(null);
    setBackFile(null);
    setResult(null);
    setError(null);
    setProcessStatus('idle');
  };

  return { status, result, error, frontPreview, backPreview, frontFile, backFile, setFiles, runOcr, resetFlow };
};
