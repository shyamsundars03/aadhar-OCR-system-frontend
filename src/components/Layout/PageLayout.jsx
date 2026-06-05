import React from 'react';

export const PageLayout = ({ children }) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <div className="scanner-glow"></div>
          <span className="logo-text">Aadhaar<span className="logo-highlight">OCR</span></span>
        </div>
        <p className="app-subtitle">Extract structured data from Aadhaar Card images instantly</p>
      </header>
      
      <main className="app-main">
        {children}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Aadhaar OCR Extractor. Premium AI Data Extraction.</p>
      </footer>
    </div>
  );
};
