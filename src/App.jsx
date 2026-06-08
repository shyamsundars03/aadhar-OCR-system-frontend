import  { useEffect } from 'react';
import { PageLayout } from './components/Layout/PageLayout';
import { AadhaarUploadForm } from './components/Upload/AadhaarUploadForm';
import { AadhaarResultCard } from './components/Result/AadhaarResultCard';
import { RawJsonViewer } from './components/Result/RawJsonViewer';
import { Loader } from './components/Feedback/Loader';
import { useAadhaarOcr } from './hooks/useAadhaarOcr';
import { useToast } from './hooks/useToast';

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
      const missingFields = [];
      if (!result.name) missingFields.push('Name');
      if (!result.dob) missingFields.push('DOB');
      if (!result.gender) missingFields.push('Gender');
      if (!result.aadhaarNumber) missingFields.push('Aadhaar Number');
      if (!result.address) missingFields.push('Address');

      if (missingFields.length > 0) {
        addToast(`Aadhaar processed, but some fields were not recognized: ${missingFields.join(', ')}`, 'error');
      } else {
        addToast('Aadhaar card details extracted successfully!', 'success');
      }

      if (result.rawText) {
        console.log("========== FRONTEND RAW OCR TEXT ==========\n", result.rawText, "\n===========================================");
      }
    } else if (status === 'error') {
      addToast(error || 'Failed to process Aadhaar card images.', 'error');
    }
  }, [status, result, error, addToast]);

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
