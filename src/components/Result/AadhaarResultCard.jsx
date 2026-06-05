// import React from 'react';

export const AadhaarResultCard = ({ result }) => {
  if (!result) return null;

  const { name, aadhaarNumber, dob, gender, address } = result;

  return (
    <div className="result-container animate-fade-in">
      <div className="section-title-bar">
        <div className="status-badge-success">Extraction Successful</div>
        <h2>Structured Result</h2>
      </div>

      <div className="aadhaar-digital-card">
        <div className="card-top-header">
          <div className="gov-seal-placeholder">
            <span className="seal-text">Government of India</span>
          </div>
          <div className="card-title-eng">Unique Identification Authority of India</div>
        </div>

        <div className="card-body-layout">
          <div className="photo-placeholder-avatar">
            <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div className="card-details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{name || 'Not Detected'}</span>
            </div>

            <div className="detail-sub-group">
              <div className="detail-item">
                <span className="detail-label">DOB:</span>
                <span className="detail-value">{dob || 'Not Detected'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Gender:</span>
                <span className="detail-value">{gender || 'Not Detected'}</span>
              </div>
            </div>

            <div className="detail-item full-width">
              <span className="detail-label">Address:</span>
              <span className="detail-value address-value">{address || 'Not Detected'}</span>
            </div>
          </div>
        </div>

        <div className="card-bottom-footer">
          <div className="aadhaar-number-display">
            {aadhaarNumber ? aadhaarNumber.replace(/(\d{4})/g, '$1 ').trim() : 'XXXX XXXX XXXX'}
          </div>
        </div>
      </div>
    </div>
  );
};
