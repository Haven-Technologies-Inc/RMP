import React, { useState } from 'react';
import { CheckCircle, Shield, ArrowLeft, Loader } from 'lucide-react';
import { Button } from '../Button';
import { AfricanCountry } from '../../config/african-countries';
import { getVerificationConfig, VerificationMethod, VerificationField } from '../../config/country-verification';
import { apiClient } from '../../lib/api-client';

interface DynamicVerificationFlowProps {
  country: AfricanCountry;
  onComplete: () => void;
  onBack: () => void;
  language: string;
}

interface FormData {
  [key: string]: string;
}

export function DynamicVerificationFlow({ 
  country, 
  onComplete, 
  onBack,
  language 
}: DynamicVerificationFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<any>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const config = getVerificationConfig(country.code);
  
  if (!config) {
    return (
      <div className="p-8 text-center">
        <p className="text-[var(--error)]">Verification not available for this country yet.</p>
        <Button onClick={onBack} variant="secondary" className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const steps = config.recommended_flow
    .map(flowId => config.verification_methods.find(m => m.id === flowId))
    .filter(Boolean) as VerificationMethod[];

  const currentMethod = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Validate field
  const validateField = (field: VerificationField, value: string): string | null => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    
    if (field.validation && value) {
      const regex = new RegExp(field.validation);
      if (!regex.test(value)) {
        return `Invalid ${field.label} format`;
      }
    }
    
    return null;
  };

  // Handle field change
  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error for this field
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  // Verify current step
  const handleVerifyStep = async () => {
    // Validate all fields in current step
    const newErrors: { [key: string]: string } = {};
    
    currentMethod.fields.forEach(field => {
      const value = formData[field.id] || '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsVerifying(true);
    
    try {
      // Call appropriate API based on method type
      let result;
      
      if (currentMethod.id === 'ghana_card') {
        result = await apiClient.identity.verifyGhanaCard({
          ghanaCardNumber: formData.ghana_card_number,
          dateOfBirth: formData.date_of_birth,
          fullName: formData.full_name,
          verificationLevel: 'standard',
        });
      } else if (currentMethod.id === 'nin') {
        result = await apiClient.identity.verifyIdentity({
          accessToken: 'demo-token',
          verificationType: 'nin',
          identityData: {
            ninNumber: formData.nin_number,
            dateOfBirth: formData.date_of_birth,
            fullName: formData.full_name,
          },
        });
      } else if (currentMethod.id === 'bvn') {
        result = await apiClient.identity.verifyIdentity({
          accessToken: 'demo-token',
          verificationType: 'bvn',
          identityData: {
            bvnNumber: formData.bvn_number,
          },
        });
      } else if (currentMethod.id === 'national_id') {
        result = await apiClient.identity.verifyIdentity({
          accessToken: 'demo-token',
          verificationType: 'national_id',
          identityData: {
            nationalIdNumber: formData.national_id_number,
            dateOfBirth: formData.date_of_birth,
            fullName: formData.full_name,
          },
        });
      } else if (currentMethod.id === 'phone_verification') {
        result = await apiClient.identity.verifyPhone({
          phoneNumber: formData.phone_number,
          verificationType: 'sms',
        });
      } else {
        // Generic verification
        result = { verified: true, confidence: 0.95 };
      }

      // Store verification result
      setVerificationResults(prev => ({
        ...prev,
        [currentMethod.id]: result
      }));

      // Move to next step or complete
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // All steps completed
        onComplete();
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'Verification failed. Please try again.' });
    } finally {
      setIsVerifying(false);
    }
  };

  // Go to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setErrors({});
    } else {
      onBack();
    }
  };

  // Render field based on type
  const renderField = (field: VerificationField) => {
    const value = formData[field.id] || '';
    const error = errors[field.id];

    switch (field.type) {
      case 'text':
      case 'phone':
      case 'email':
        return (
          <div key={field.id} className="mb-4">
            <label className="block mb-2 text-sm">
              {field.label} {field.required && <span className="text-[var(--error)]">*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={`w-full px-4 py-3 border rounded-lg ${
                error ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
              }`}
            />
            {field.help_text && (
              <p className="text-xs text-[var(--neutral-600)] mt-1 m-0">{field.help_text}</p>
            )}
            {error && (
              <p className="text-xs text-[var(--error)] mt-1 m-0">{error}</p>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="mb-4">
            <label className="block mb-2 text-sm">
              {field.label} {field.required && <span className="text-[var(--error)]">*</span>}
            </label>
            <input
              type="date"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg ${
                error ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
              }`}
            />
            {error && (
              <p className="text-xs text-[var(--error)] mt-1 m-0">{error}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="mb-4">
            <label className="block mb-2 text-sm">
              {field.label} {field.required && <span className="text-[var(--error)]">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg ${
                error ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
              }`}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {error && (
              <p className="text-xs text-[var(--error)] mt-1 m-0">{error}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--neutral-50)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--neutral-200)] sticky top-0 z-10">
        <div className="px-4 py-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 text-[var(--neutral-600)] hover:text-[var(--primary)]"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{country.flag}</span>
              <span className="text-sm">{country.name}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-[var(--neutral-200)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--primary)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-[var(--neutral-600)] mt-1 m-0">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-2xl mx-auto">
        {/* Step Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center text-2xl">
              {currentMethod.icon}
            </div>
            <div>
              <h2 className="m-0">{currentMethod.name}</h2>
              <p className="text-sm text-[var(--neutral-600)] m-0">
                {currentMethod.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-[var(--neutral-600)]">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              {currentMethod.required ? 'Required' : 'Optional'}
            </span>
            <span>•</span>
            <span>⏱️ {currentMethod.verification_time}</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-[var(--shadow-md)] p-6 mb-6">
          {currentMethod.fields.map(field => renderField(field))}

          {errors.general && (
            <div className="mb-4 p-4 bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-lg">
              <p className="text-sm text-[var(--error)] m-0">{errors.general}</p>
            </div>
          )}

          {/* Previous Verifications */}
          {Object.keys(verificationResults).length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2">Completed Verifications:</h4>
              <div className="space-y-2">
                {Object.entries(verificationResults).map(([key, result]: [string, any]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                    <span className="text-[var(--neutral-700)]">
                      {steps.find(s => s.id === key)?.name} verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            fullWidth
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleVerifyStep}
            disabled={isVerifying}
            fullWidth
          >
            {isVerifying ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Verifying...
              </>
            ) : currentStep === steps.length - 1 ? (
              'Complete Verification'
            ) : (
              'Continue'
            )}
          </Button>
        </div>

        {/* Help Text */}
        {config.special_requirements && config.special_requirements.length > 0 && (
          <div className="mt-6 bg-[var(--primary)]/5 rounded-lg p-4 border border-[var(--primary)]/20">
            <h4 className="mb-2">Requirements for {country.name}:</h4>
            <ul className="space-y-1 pl-4 m-0">
              {config.special_requirements.map((req, index) => (
                <li key={index} className="text-sm text-[var(--neutral-700)]">{req}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
