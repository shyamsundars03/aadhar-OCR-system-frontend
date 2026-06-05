import React, { useState } from 'react';

export const RawJsonViewer = ({ result }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!result) return null;

  return (
    <div className="json-viewer-container">
      <button 
        type="button" 
        className="btn btn-secondary btn-block json-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Debug Info' : 'Show Debug Info & Raw OCR Text'}
      </button>

      {isOpen && (
        <div className="json-output-area animate-slide-down">
          <div className="debug-section">
            <h4>Extracted JSON Properties</h4>
            <pre className="code-block-display">
              <code>{JSON.stringify(result, null, 2)}</code>
            </pre>
          </div>

          {result.rawText && (
            <div className="debug-section">
              <h4>Raw Text Recognized</h4>
              <div className="raw-text-box">
                {result.rawText.split('\n').map((line, idx) => (
                  <p key={idx} className="raw-text-line">{line}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
