// import React from 'react';
import { ImagePreview } from './ImagePreview';

export const AadhaarUploadForm = ({ 
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

  const handleFrontSelect = (file) => {
    setFiles(file, backFile);
  };

  const handleBackSelect = (file) => {
    setFiles(frontFile, file);
  };

  const handleFrontClear = () => {
    setFiles(null, backFile);
  };

  const handleBackClear = () => {
    setFiles(frontFile, null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReady && !isProcessing) {
      runOcr();
    }
  };

  const isDisabled = status === 'processing' || status === 'success' || status === 'error';

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
