import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, X, AlertCircle, Loader } from 'lucide-react';
import { Button } from '../Button';
import { getBusinessRequirements, DocumentRequirement } from '../../config/business-verification';

interface DocumentUploadScreenProps {
  countryCode: string;
  businessType: string;
  onComplete: (documents: UploadedDocument[]) => void;
  onBack: () => void;
}

interface UploadedDocument {
  documentId: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  status: 'uploaded' | 'verified' | 'rejected';
}

export function DocumentUploadScreen({ countryCode, businessType, onComplete, onBack }: DocumentUploadScreenProps) {
  const [uploadedDocs, setUploadedDocs] = useState<Map<string, UploadedDocument>>(new Map());
  const [uploading, setUploading] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  const requirements = getBusinessRequirements(countryCode);

  if (!requirements) {
    return <div className="p-8 text-center">Requirements not available for this country</div>;
  }

  const handleFileSelect = async (docReq: DocumentRequirement, file: File) => {
    // Validate file size
    if (file.size > docReq.maxSizeMB * 1024 * 1024) {
      alert(`File too large. Maximum size is ${docReq.maxSizeMB}MB`);
      return;
    }

    // Validate file type
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !docReq.acceptedFormats.includes(extension)) {
      alert(`Invalid file type. Accepted formats: ${docReq.acceptedFormats.join(', ')}`);
      return;
    }

    setUploading(docReq.id);

    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));

    const uploaded: UploadedDocument = {
      documentId: docReq.id,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date(),
      status: 'uploaded',
    };

    setUploadedDocs(prev => new Map(prev).set(docReq.id, uploaded));
    setUploading(null);
  };

  const handleDrop = (e: React.DragEvent, docReq: DocumentRequirement) => {
    e.preventDefault();
    setDragOver(null);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(docReq, file);
    }
  };

  const handleRemove = (docId: string) => {
    setUploadedDocs(prev => {
      const newMap = new Map(prev);
      newMap.delete(docId);
      return newMap;
    });
  };

  const canContinue = requirements.requiredDocuments
    .filter(doc => doc.required)
    .every(doc => uploadedDocs.has(doc.id));

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--neutral-200)]">
        <div className="px-4 py-6 max-w-4xl mx-auto">
          <h2 className="mb-2">Upload Required Documents</h2>
          <p className="text-[var(--neutral-600)] m-0">
            Upload the following documents for verification. Documents will be reviewed within {requirements.estimatedTime}.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-4xl mx-auto">
        {/* Verification Steps Info */}
        <div className="bg-white rounded-lg shadow-[var(--shadow-sm)] p-6 mb-6">
          <h3 className="mb-3">Verification Process</h3>
          <div className="space-y-2">
            {requirements.verificationSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm text-[var(--neutral-700)] m-0">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Document Upload Cards */}
        <div className="space-y-4">
          {requirements.requiredDocuments.map((docReq) => {
            const uploaded = uploadedDocs.get(docReq.id);
            const isUploading = uploading === docReq.id;

            return (
              <div key={docReq.id} className="bg-white rounded-lg shadow-[var(--shadow-md)] p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="m-0">{docReq.name}</h4>
                      {docReq.required && (
                        <span className="px-2 py-1 bg-[var(--error)]/10 text-[var(--error)] text-xs rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--neutral-600)] mb-2 m-0">
                      {docReq.description}
                    </p>
                    <p className="text-xs text-[var(--neutral-500)] m-0">
                      Accepted: {docReq.acceptedFormats.join(', ').toUpperCase()} • Max {docReq.maxSizeMB}MB
                    </p>
                    {docReq.example && (
                      <p className="text-xs text-[var(--neutral-500)] italic mt-1 m-0">
                        {docReq.example}
                      </p>
                    )}
                  </div>
                </div>

                {uploaded ? (
                  // Uploaded State
                  <div className="flex items-center justify-between p-4 bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                      <div>
                        <p className="text-sm m-0">{uploaded.fileName}</p>
                        <p className="text-xs text-[var(--neutral-600)] m-0">
                          {formatFileSize(uploaded.fileSize)} • Uploaded {uploaded.uploadedAt.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(docReq.id)}
                      className="p-2 hover:bg-[var(--error)]/10 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-[var(--error)]" />
                    </button>
                  </div>
                ) : isUploading ? (
                  // Uploading State
                  <div className="flex items-center justify-center p-8 bg-[var(--primary)]/5 border-2 border-dashed border-[var(--primary)]/20 rounded-lg">
                    <Loader className="w-6 h-6 text-[var(--primary)] animate-spin mr-2" />
                    <span className="text-[var(--primary)]">Uploading...</span>
                  </div>
                ) : (
                  // Upload Area
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(docReq.id);
                    }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(e) => handleDrop(e, docReq)}
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                      dragOver === docReq.id
                        ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                        : 'border-[var(--neutral-300)] hover:border-[var(--primary)] hover:bg-[var(--neutral-50)]'
                    }`}
                  >
                    <Upload className="w-8 h-8 text-[var(--neutral-400)] mx-auto mb-3" />
                    <p className="mb-2 m-0">
                      Drag and drop your file here, or
                    </p>
                    <label className="inline-block">
                      <input
                        type="file"
                        accept={docReq.acceptedFormats.map(f => `.${f}`).join(',')}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(docReq, file);
                        }}
                        className="hidden"
                      />
                      <span className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg cursor-pointer hover:bg-[var(--primary-dark)] inline-block">
                        Browse Files
                      </span>
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Regulatory Bodies Info */}
        {requirements.regulatoryBodies.length > 0 && (
          <div className="mt-6 bg-[var(--primary)]/5 rounded-lg p-6 border border-[var(--primary)]/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[var(--primary)] mt-0.5" />
              <div>
                <h4 className="mb-2">Regulatory Requirements</h4>
                <p className="text-sm text-[var(--neutral-700)] mb-3 m-0">
                  We will verify your licenses with the following regulatory bodies:
                </p>
                <ul className="space-y-2 pl-4 m-0">
                  {requirements.regulatoryBodies.map((body, index) => (
                    <li key={index} className="text-sm text-[var(--neutral-700)]">
                      <strong>{body.name}</strong>
                      {body.licenseRequired && (
                        <span className="text-[var(--neutral-600)]">
                          {' '}• License required for: {body.licenseTypes.join(', ')}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex gap-3">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button
            variant="primary"
            onClick={() => onComplete(Array.from(uploadedDocs.values()))}
            disabled={!canContinue}
            fullWidth
          >
            {canContinue ? 'Continue to Review' : `Upload ${requirements.requiredDocuments.filter(d => d.required && !uploadedDocs.has(d.id)).length} Required Document(s)`}
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white rounded-lg shadow-[var(--shadow-sm)] p-6">
          <h4 className="mb-3">Need Help?</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="m-0"><strong>Document Quality:</strong></p>
              <ul className="mt-2 space-y-1 pl-4 m-0">
                <li>Use clear, high-resolution scans or photos</li>
                <li>Ensure all text is readable</li>
                <li>Include all pages of multi-page documents</li>
              </ul>
            </div>
            <div>
              <p className="m-0"><strong>Processing Time:</strong></p>
              <ul className="mt-2 space-y-1 pl-4 m-0">
                <li>Standard verification: {requirements.estimatedTime}</li>
                <li>You'll receive email updates on progress</li>
                <li>Expedited review available for Enterprise tier</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
