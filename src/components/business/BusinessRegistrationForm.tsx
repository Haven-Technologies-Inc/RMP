import React, { useState } from 'react';
import { Building2, Mail, Phone, Globe, MapPin, Users, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../Button';
import { BusinessType, BusinessRegistrationData } from '../../config/business-verification';
import { AFRICAN_COUNTRIES } from '../../config/african-countries';

interface BusinessRegistrationFormProps {
  businessType: BusinessType;
  onSubmit: (data: BusinessRegistrationData) => void;
  onBack: () => void;
}

export function BusinessRegistrationForm({ businessType, onSubmit, onBack }: BusinessRegistrationFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Partial<BusinessRegistrationData>>({
    businessType,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const sections = [
    { id: 'company', title: 'Company Information', icon: Building2 },
    { id: 'contact', title: 'Contact Details', icon: Mail },
    { id: 'address', title: 'Business Address', icon: MapPin },
    { id: 'representatives', title: 'Key Contacts', icon: Users },
    { id: 'usecase', title: 'Use Case & Volume', icon: FileText },
  ];

  const currentSectionData = sections[currentSection];
  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleChange = (field: keyof BusinessRegistrationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateSection = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentSection === 0) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.registrationNumber) newErrors.registrationNumber = 'Registration number is required';
      if (!formData.yearEstablished) newErrors.yearEstablished = 'Year established is required';
    } else if (currentSection === 1) {
      if (!formData.primaryEmail) newErrors.primaryEmail = 'Email is required';
      if (!formData.primaryPhone) newErrors.primaryPhone = 'Phone is required';
    } else if (currentSection === 2) {
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.streetAddress) newErrors.streetAddress = 'Street address is required';
    } else if (currentSection === 3) {
      if (!formData.ceoName) newErrors.ceoName = 'CEO name is required';
      if (!formData.ceoEmail) newErrors.ceoEmail = 'CEO email is required';
      if (!formData.technicalContactName) newErrors.technicalContactName = 'Technical contact is required';
      if (!formData.technicalContactEmail) newErrors.technicalContactEmail = 'Technical email is required';
    } else if (currentSection === 4) {
      if (!formData.intendedUseCase) newErrors.intendedUseCase = 'Use case is required';
      if (!formData.estimatedMonthlyVolume) newErrors.estimatedMonthlyVolume = 'Volume estimate is required';
      if (!formData.apiProducts || formData.apiProducts.length === 0) {
        newErrors.apiProducts = 'Select at least one API product';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
      } else {
        // Submit
        onSubmit(formData as BusinessRegistrationData);
      }
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0: // Company Information
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">
                Legal Company Name <span className="text-[var(--error)]">*</span>
              </label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="e.g., ABC Fintech Limited"
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.companyName ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              />
              {errors.companyName && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Trading Name (if different)
              </label>
              <input
                type="text"
                value={formData.tradingName || ''}
                onChange={(e) => handleChange('tradingName', e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Company Registration Number <span className="text-[var(--error)]">*</span>
              </label>
              <input
                type="text"
                value={formData.registrationNumber || ''}
                onChange={(e) => handleChange('registrationNumber', e.target.value)}
                placeholder="e.g., RC123456 (Nigeria), C12345 (Ghana)"
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.registrationNumber ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              />
              {errors.registrationNumber && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.registrationNumber}</p>
              )}
              <p className="text-xs text-[var(--neutral-600)] mt-1 m-0">
                CAC number (Nigeria), Company registration (Ghana, Kenya)
              </p>
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Tax ID / TIN
              </label>
              <input
                type="text"
                value={formData.taxId || ''}
                onChange={(e) => handleChange('taxId', e.target.value)}
                placeholder="Tax Identification Number"
                className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Year Established <span className="text-[var(--error)]">*</span>
              </label>
              <input
                type="number"
                value={formData.yearEstablished || ''}
                onChange={(e) => handleChange('yearEstablished', parseInt(e.target.value))}
                placeholder="2020"
                min="1900"
                max={new Date().getFullYear()}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.yearEstablished ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              />
              {errors.yearEstablished && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.yearEstablished}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Regulatory License Number (if applicable)
              </label>
              <input
                type="text"
                value={formData.licenseNumber || ''}
                onChange={(e) => handleChange('licenseNumber', e.target.value)}
                placeholder="e.g., CBN, BoG license number"
                className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg"
              />
              <p className="text-xs text-[var(--neutral-600)] mt-1 m-0">
                Banking license, payment service provider license, etc.
              </p>
            </div>
          </div>
        );

      case 1: // Contact Details
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">
                Primary Email <span className="text-[var(--error)]">*</span>
              </label>
              <input
                type="email"
                value={formData.primaryEmail || ''}
                onChange={(e) => handleChange('primaryEmail', e.target.value)}
                placeholder="contact@company.com"
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.primaryEmail ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              />
              {errors.primaryEmail && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.primaryEmail}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Primary Phone <span className="text-[var(--error)]">*</span>
              </label>
              <input
                type="tel"
                value={formData.primaryPhone || ''}
                onChange={(e) => handleChange('primaryPhone', e.target.value)}
                placeholder="+234 XXX XXX XXXX"
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.primaryPhone ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              />
              {errors.primaryPhone && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.primaryPhone}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Website URL
              </label>
              <input
                type="url"
                value={formData.websiteUrl || ''}
                onChange={(e) => handleChange('websiteUrl', e.target.value)}
                placeholder="https://www.company.com"
                className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg"
              />
            </div>
          </div>
        );

      case 2: // Business Address
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">
                Country <span className="text-[var(--error)]">*</span>
              </label>
              <select
                value={formData.country || ''}
                onChange={(e) => handleChange('country', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.country ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              >
                <option value="">Select country</option>
                {AFRICAN_COUNTRIES.filter(c => c.active).map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.country}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">
                State / Region
              </label>
              <input
                type="text"
                value={formData.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
                placeholder="e.g., Lagos, Greater Accra"
                className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">
                City <span className="text-[var(--error)]">*</span>
              </label>
              <input
                type="text"
                value={formData.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="e.g., Lagos, Accra, Nairobi"
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.city ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              />
              {errors.city && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Street Address <span className="text-[var(--error)]">*</span>
              </label>
              <textarea
                value={formData.streetAddress || ''}
                onChange={(e) => handleChange('streetAddress', e.target.value)}
                placeholder="Building number, street name"
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.streetAddress ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              />
              {errors.streetAddress && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.streetAddress}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Postal Code
              </label>
              <input
                type="text"
                value={formData.postalCode || ''}
                onChange={(e) => handleChange('postalCode', e.target.value)}
                placeholder="Optional"
                className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg"
              />
            </div>
          </div>
        );

      case 3: // Key Contacts
        return (
          <div className="space-y-6">
            <div className="bg-[var(--neutral-100)] rounded-lg p-4">
              <h4 className="mb-3">CEO / Managing Director</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.ceoName || ''}
                  onChange={(e) => handleChange('ceoName', e.target.value)}
                  placeholder="Full Name *"
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.ceoName ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                  }`}
                />
                <input
                  type="email"
                  value={formData.ceoEmail || ''}
                  onChange={(e) => handleChange('ceoEmail', e.target.value)}
                  placeholder="Email Address *"
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.ceoEmail ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                  }`}
                />
                <input
                  type="tel"
                  value={formData.ceoPhone || ''}
                  onChange={(e) => handleChange('ceoPhone', e.target.value)}
                  placeholder="Phone Number *"
                  className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg"
                />
              </div>
            </div>

            <div className="bg-[var(--neutral-100)] rounded-lg p-4">
              <h4 className="mb-3">Technical Contact / CTO</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  value={formData.technicalContactName || ''}
                  onChange={(e) => handleChange('technicalContactName', e.target.value)}
                  placeholder="Full Name *"
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.technicalContactName ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                  }`}
                />
                <input
                  type="email"
                  value={formData.technicalContactEmail || ''}
                  onChange={(e) => handleChange('technicalContactEmail', e.target.value)}
                  placeholder="Email Address *"
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.technicalContactEmail ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                  }`}
                />
                <input
                  type="tel"
                  value={formData.technicalContactPhone || ''}
                  onChange={(e) => handleChange('technicalContactPhone', e.target.value)}
                  placeholder="Phone Number *"
                  className="w-full px-4 py-3 border border-[var(--neutral-300)] rounded-lg"
                />
              </div>
            </div>

            {Object.keys(errors).some(k => ['ceoName', 'ceoEmail', 'technicalContactName', 'technicalContactEmail'].includes(k)) && (
              <p className="text-xs text-[var(--error)] m-0">Please fill in all required contact fields</p>
            )}
          </div>
        );

      case 4: // Use Case & Volume
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">
                What will you use ReshADX for? <span className="text-[var(--error)]">*</span>
              </label>
              <textarea
                value={formData.intendedUseCase || ''}
                onChange={(e) => handleChange('intendedUseCase', e.target.value)}
                placeholder="e.g., Identity verification for loan applications, bank account linking for budgeting app"
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.intendedUseCase ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              />
              {errors.intendedUseCase && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.intendedUseCase}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm">
                Estimated Monthly Verification Volume <span className="text-[var(--error)]">*</span>
              </label>
              <select
                value={formData.estimatedMonthlyVolume || ''}
                onChange={(e) => handleChange('estimatedMonthlyVolume', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.estimatedMonthlyVolume ? 'border-[var(--error)]' : 'border-[var(--neutral-300)]'
                }`}
              >
                <option value="">Select volume range</option>
                <option value="0-1000">0 - 1,000 (Testing)</option>
                <option value="1000-10000">1,000 - 10,000 (Starter)</option>
                <option value="10000-50000">10,000 - 50,000 (Growing)</option>
                <option value="50000-100000">50,000 - 100,000 (Professional)</option>
                <option value="100000+">100,000+ (Enterprise)</option>
              </select>
              {errors.estimatedMonthlyVolume && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.estimatedMonthlyVolume}</p>
              )}
            </div>

            <div>
              <label className="block mb-3 text-sm">
                Which API products do you need? <span className="text-[var(--error)]">*</span>
              </label>
              <div className="space-y-2">
                {[
                  { id: 'identity', label: 'Identity Verification', description: 'Ghana Card, NIN, BVN, etc.' },
                  { id: 'income', label: 'Income Verification', description: 'Salary, employment verification' },
                  { id: 'transactions', label: 'Transaction Data', description: 'Bank transaction history' },
                  { id: 'balance', label: 'Balance & Accounts', description: 'Real-time account balances' },
                  { id: 'investments', label: 'Investments', description: 'Portfolio data' },
                  { id: 'liabilities', label: 'Liabilities', description: 'Loans, credit cards' },
                ].map(product => (
                  <label key={product.id} className="flex items-start gap-3 p-3 bg-[var(--neutral-50)] rounded-lg cursor-pointer hover:bg-[var(--neutral-100)]">
                    <input
                      type="checkbox"
                      checked={formData.apiProducts?.includes(product.id) || false}
                      onChange={(e) => {
                        const current = formData.apiProducts || [];
                        const updated = e.target.checked
                          ? [...current, product.id]
                          : current.filter(p => p !== product.id);
                        handleChange('apiProducts', updated);
                      }}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div>{product.label}</div>
                      <div className="text-xs text-[var(--neutral-600)]">{product.description}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.apiProducts && (
                <p className="text-xs text-[var(--error)] mt-1 m-0">{errors.apiProducts}</p>
              )}
            </div>
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
        <div className="px-4 py-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="m-0">Business Registration</h2>
            <div className="text-sm text-[var(--neutral-600)]">
              Step {currentSection + 1} of {sections.length}
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
          </div>

          {/* Section Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isActive = index === currentSection;
              const isCompleted = index < currentSection;
              
              return (
                <div
                  key={section.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                    isActive 
                      ? 'bg-[var(--primary)] text-white' 
                      : isCompleted
                      ? 'bg-[var(--success)]/10 text-[var(--success)]'
                      : 'bg-[var(--neutral-100)] text-[var(--neutral-600)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.title}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-[var(--shadow-md)] p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            {React.createElement(currentSectionData.icon, { className: "w-6 h-6 text-[var(--primary)]" })}
            <h3 className="m-0">{currentSectionData.title}</h3>
          </div>

          {renderSection()}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            {currentSection === 0 ? 'Back' : 'Previous'}
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            fullWidth
            iconRight={<ArrowRight className="w-5 h-5" />}
          >
            {currentSection === sections.length - 1 ? 'Submit Application' : 'Continue'}
          </Button>
        </div>
      </main>
    </div>
  );
}
