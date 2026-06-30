import React, { FormEvent } from 'react';
import { ImagePreview } from './ImagePreview';
import { OcrStatus } from '../../types';

interface AadhaarUploadFormProps {
  frontPreviewUrl: string | null;
  backPreviewUrl: string | null;
  frontFile: File | null;
  backFile: File | null;
  setFiles: (front: File | null, back: File | null) => void;
  runOcr: () => void;
  status: OcrStatus;
}

export const AadhaarUploadForm: React.FC<AadhaarUploadFormProps> = ({ 
  frontPreviewUrl, 
  backPreviewUrl, 
  frontFile,
  backFile,
  setFiles, 
  runOcr, 
  status 
}) => {
  const isProcessing = status === 'processing';
  const isReady = status === 'ready';

  const handleFrontSelect = (file: File) => {
    setFiles(file, backFile);
  };

  const handleBackSelect = (file: File) => {
    setFiles(frontFile, file);
  };

  const handleFrontClear = () => {
    setFiles(null, backFile);
  };

  const handleBackClear = () => {
    setFiles(frontFile, null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isReady && !isProcessing) {
      runOcr();
    }
  };

  const isDisabled = status === 'processing' || status === 'success';

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div className="upload-grid">
        <ImagePreview 
          label="Aadhaar Front Side" 
          previewUrl={frontPreviewUrl} 
          inputId="aadhaar-front-input"
          onFileSelect={handleFrontSelect}
          onClear={handleFrontClear}
          isDisabled={isDisabled}
        />
        
        <ImagePreview 
          label="Aadhaar Back Side" 
          previewUrl={backPreviewUrl} 
          inputId="aadhaar-back-input"
          onFileSelect={handleBackSelect}
          onClear={handleBackClear}
          isDisabled={isDisabled}
        />
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className={`btn btn-primary btn-lg btn-block ripple ${isReady ? 'active' : ''}`}
          disabled={!isReady || isProcessing}
        >
          {isProcessing ? (
            <span className="spinner-inline-container">
              <span className="spinner-inline"></span>
              Extracting Data...
            </span>
          ) : (
            'Process OCR & Extract Data'
          )}
        </button>
      </div>
    </form>
  );
};
