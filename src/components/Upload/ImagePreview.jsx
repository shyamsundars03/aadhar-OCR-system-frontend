// import React from 'react';
import { useToast } from '../../hooks/useToast';

export const ImagePreview = ({ label, previewUrl, inputId, onFileSelect, onClear, isDisabled }) => {
  const { addToast } = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        addToast(`${label} size exceeds 2MB limit. Please upload a smaller image.`, 'error', 3000);
        e.target.value = ''; 
        return;
      }
      onFileSelect(file);
    }
  };

  const handleClear = () => {
    const input = document.getElementById(inputId);
    if (input) input.value = '';
    onClear();
  };

  return (
    <div className="image-upload-card">
      <span className="card-label">{label}</span>
      
      {previewUrl ? (
        <div className="preview-container">
          <img src={previewUrl} alt={`${label} Preview`} className="preview-image" />
          <div className="preview-overlay">
            {!isDisabled && (
              <>
                <button 
                  type="button" 
                  className="btn btn-danger btn-sm" 
                  onClick={handleClear}
                >
                  Remove
                </button>
                <label htmlFor={inputId} className="btn btn-secondary btn-sm pointer">
                  Change
                </label>
              </>
            )}
          </div>
        </div>
      ) : (
        <label htmlFor={isDisabled ? undefined : inputId} className={`upload-placeholder ${!isDisabled ? 'pointer' : ''}`}>
          <div className="upload-icon">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <span className="upload-title">Choose image</span>
          <span className="upload-subtitle">JPG or PNG up to 2MB</span>
        </label>
      )}

      <input 
        type="file" 
        id={inputId} 
        disabled={isDisabled}
        accept="image/png, image/jpeg, image/jpg" 
        onChange={handleFileChange} 
        style={{ display: 'none' }}
      />
    </div>
  );
};
