import { useState, useEffect, useMemo } from 'react';
import { OcrApiClient } from '../api/OcrApiClient';
import { IAadhaarResult } from '../interfaces/IAadhaarResult.interface';
import { OcrStatus } from '../types';
import { ERROR_MESSAGES } from '../constants/errorMessages';

const resizeImage = (file: File, maxWidth = 800): Promise<File> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== 'string') {
        resolve(file);
        return;
      }
      const img = new Image();
      img.onload = () => {
        if (img.width <= maxWidth) {
          resolve(file);
          return;
        }
        const canvas = document.createElement('canvas');
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(file);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          resolve(new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          }));
        }, file.type, 0.85);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  });
};

export const useAadhaarOcr = () => {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [processStatus, setProcessStatus] = useState<OcrStatus>('idle');
  const [result, setResult] = useState<IAadhaarResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ocrApiClient = useMemo(() => new OcrApiClient(), []);

  const status = useMemo<OcrStatus>(() => {
    if (processStatus !== 'idle') return processStatus;
    return frontFile && backFile ? 'ready' : 'idle';
  }, [frontFile, backFile, processStatus]);

  useEffect(() => {
    return () => {
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      if (backPreview) URL.revokeObjectURL(backPreview);
    };
  }, [frontPreview, backPreview]);

  const setFiles = (front: File | null, back: File | null) => {
    if (front !== frontFile) {
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      setFrontPreview(front ? URL.createObjectURL(front) : null);
      setFrontFile(front);
    }
    if (back !== backFile) {
      if (backPreview) URL.revokeObjectURL(backPreview);
      setBackPreview(back ? URL.createObjectURL(back) : null);
      setBackFile(back);
    }
    setResult(null);
    setError(null);
    setProcessStatus('idle');
  };

  const runOcr = async () => {
    if (!frontFile || !backFile) {
      setError(ERROR_MESSAGES.MISSING_FILES);
      setProcessStatus('error');
      return;
    }
    setProcessStatus('processing');
    setError(null);
    setResult(null);
    try {
      const resizedFront = await resizeImage(frontFile);
      const resizedBack = await resizeImage(backFile);

      const response = await ocrApiClient.uploadAadhaarImages(resizedFront, resizedBack);
      if (response.status === 'success') {
        setResult(response.data);
        setProcessStatus('success');
      } else {
        throw new Error(response.message || ERROR_MESSAGES.VERIFICATION_FAILED);
      }
    } catch (err: unknown) {
      // Narrow the unknown error to extract a message string safely
      let errMessage: string = ERROR_MESSAGES.GENERIC_ERROR;
      if (err instanceof Error) {
        errMessage = err.message;
      }
      setError(errMessage);
      setProcessStatus('error');
    }
  };

  const resetFlow = () => {
    if (frontPreview) URL.revokeObjectURL(frontPreview);
    if (backPreview) URL.revokeObjectURL(backPreview);
    setFrontPreview(null);
    setBackPreview(null);
    setFrontFile(null);
    setBackFile(null);
    setResult(null);
    setError(null);
    setProcessStatus('idle');
  };

  return { status, result, error, frontPreview, backPreview, frontFile, backFile, setFiles, runOcr, resetFlow };
};
