import React from 'react';
import { PageLayout } from './components/Layout/PageLayout';
import { AadhaarUploadForm } from './components/Upload/AadhaarUploadForm';
import { AadhaarResultCard } from './components/Result/AadhaarResultCard';
import { RawJsonViewer } from './components/Result/RawJsonViewer';
import { Loader } from './components/Feedback/Loader';
import { ErrorAlert } from './components/Feedback/ErrorAlert';
import { useAadhaarOcr } from './hooks/useAadhaarOcr';

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

      {status === 'error' && <ErrorAlert message={error} />}

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
    </PageLayout>
  );
}

export default App;
