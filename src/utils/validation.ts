export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export const validateContactForm = (data: ContactFormData): ValidationResult => {
  const errors: ValidationError[] = [];

  // First Name
  if (!validateRequired(data.firstName)) {
    errors.push({ field: 'firstName', message: 'First name is required' });
  } else if (!validateMinLength(data.firstName, 2)) {
    errors.push({ field: 'firstName', message: 'First name must be at least 2 characters' });
  }

  // Last Name
  if (!validateRequired(data.lastName)) {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  } else if (!validateMinLength(data.lastName, 2)) {
    errors.push({ field: 'lastName', message: 'Last name must be at least 2 characters' });
  }

  // Email
  if (!validateRequired(data.email)) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  // Phone (optional)
  if (data.phone && data.phone.trim().length > 0 && !validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
  }

  // Message
  if (!validateRequired(data.message)) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (!validateMinLength(data.message, 10)) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  } else if (!validateMaxLength(data.message, 1000)) {
    errors.push({ field: 'message', message: 'Message must not exceed 1000 characters' });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
