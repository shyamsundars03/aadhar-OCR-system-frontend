import React from 'react';

export const Loader = () => {
  return (
    <div className="loader-container card-blur">
      <div className="loader-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3 className="loader-title">Performing OCR Analysis</h3>
      <p className="loader-subtitle">Digitizing Aadhaar content and parsing metadata. This may take up to 10 seconds.</p>
    </div>
  );
};
