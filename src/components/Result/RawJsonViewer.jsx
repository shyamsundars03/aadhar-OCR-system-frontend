import{ useState } from 'react';

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
        {isOpen ? 'Hide JSON Data' : 'Show JSON Data'}
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
