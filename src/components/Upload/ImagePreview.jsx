import React from 'react';

export const ImagePreview = ({ label, previewUrl, inputId, onFileSelect, onClear }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="image-upload-card">
      <span className="card-label">{label}</span>
      
      {previewUrl ? (
        <div className="preview-container">
          <img src={previewUrl} alt={`${label} Preview`} className="preview-image" />
          <div className="preview-overlay">
            <button 
              type="button" 
              className="btn btn-danger btn-sm" 
              onClick={onClear}
            >
              Remove
            </button>
            <label htmlFor={inputId} className="btn btn-secondary btn-sm pointer">
              Change
            </label>
          </div>
        </div>
      ) : (
        <label htmlFor={inputId} className="upload-placeholder pointer">
          <div className="upload-icon">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
          <span className="upload-title">Choose image</span>
          <span className="upload-subtitle">JPG or PNG up to 5MB</span>
        </label>
      )}

      <input 
        type="file" 
        id={inputId} 
        accept="image/png, image/jpeg, image/jpg" 
        onChange={handleFileChange} 
        style={{ display: 'none' }}
      />
    </div>
  );
};
