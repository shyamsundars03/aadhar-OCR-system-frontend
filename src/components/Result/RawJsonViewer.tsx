import React, { useState } from 'react';
import type { IAadhaarResult } from '../../interfaces/IAadhaarResult.interface';

interface RawJsonViewerProps {
  result: IAadhaarResult | null;
}

export const RawJsonViewer: React.FC<RawJsonViewerProps> = ({ result }) => {
  const [isOpen, setIsOpen] = useState(false);

const [isCopied, setIsCopied] = useState(false);

  if (!result) return null;


const handleCopy = async () => {
    // Convert the extracted result into readable text
    const extractedText = `Name: ${result.name ?? ''}
DOB: ${result.dob ?? ''}
Gender: ${result.gender ?? ''}
Aadhaar Number: ${result.aadhaarNumber ?? ''}
Address: ${result.address ?? ''}`;

    try {
      await navigator.clipboard.writeText(extractedText);

      setIsCopied(true);

      // Reset button text after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy extracted text:', error);
    }
  };




  return (
    <div className="json-viewer-container">
      <button
        type="button"
        className="btn btn-secondary btn-block json-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide JSON Data' : 'Show JSON Data'}
      </button>

        <button
          type="button"
          className="btn btn-secondary copy-btn"
          onClick={handleCopy}
        >
          {isCopied ? 'Copied!' : 'Copy Extracted Text'}
        </button>

      {isOpen && (
        <div className="json-output-area animate-slide-down">
          <div className="debug-section">
            <h4>Extracted JSON Properties</h4>
            <pre className="code-block-display">
              <code>{JSON.stringify(result, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
