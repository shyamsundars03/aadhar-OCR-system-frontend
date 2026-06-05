// import React from 'react';

export const ErrorAlert = ({ message }) => {
  return (
    <div className="error-alert-card animate-shake">
      <div className="error-icon">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <div className="error-content">
        <h4 className="error-title">Extraction Error</h4>
        <p className="error-message">{message || 'An error occurred while parsing the Aadhaar card.'}</p>
      </div>
    </div>
  );
};
