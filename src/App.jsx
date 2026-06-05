import React, { useEffect } from 'react';
import { PageLayout } from './components/Layout/PageLayout';
import { AadhaarUploadForm } from './components/Upload/AadhaarUploadForm';
import { AadhaarResultCard } from './components/Result/AadhaarResultCard';
import { RawJsonViewer } from './components/Result/RawJsonViewer';
import { Loader } from './components/Feedback/Loader';
import { useAadhaarOcr } from './hooks/useAadhaarOcr';
import { useToast } from './context/ToastContext';

function App() {
  const {
    status,
    result,
    error,
    frontPreview,
    backPreview,
    frontFile,
    backFile,
    setFiles,
    runOcr,
    resetFlow
  } = useAadhaarOcr();

  const { addToast } = useToast();

  useEffect(() => {
    if (status === 'success') {
      addToast('Aadhaar card details extracted successfully!', 'success');
    } else if (status === 'error') {
      addToast(error || 'Failed to process Aadhaar card images.', 'error');
    }
  }, [status, error, addToast]);

  return (
    <PageLayout>
      <AadhaarUploadForm
        frontPreviewUrl={frontPreview}
        backPreviewUrl={backPreview}
        frontFile={frontFile}
        backFile={backFile}
        setFiles={setFiles}
        runOcr={runOcr}
        status={status}
      />

      {status === 'processing' && <Loader />}

      {status === 'success' && (
        <>
          <AadhaarResultCard result={result} />
          <RawJsonViewer result={result} />
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={resetFlow}
            >
              Scan Another Card
            </button>
          </div>
        </>
      )}

      {status === 'error' && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={resetFlow}
          >
            Try Again
          </button>
        </div>
      )}
    </PageLayout>
  );
}

export default App;
