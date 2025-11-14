import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  icon,
  iconRight,
  children,
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[var(--primary)] text-white hover:bg-[var(--primary-light)] focus:ring-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed',
    secondary: 'border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white focus:ring-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed',
    tertiary: 'text-[var(--primary)] hover:bg-[var(--neutral-100)] focus:ring-[var(--primary)] disabled:opacity-40 disabled:cursor-not-allowed',
    destructive: 'bg-[var(--error)] text-white hover:bg-[var(--error-light)] focus:ring-[var(--error)] disabled:opacity-40 disabled:cursor-not-allowed',
    outline: 'border-2 border-current hover:bg-white/10 focus:ring-current disabled:opacity-40 disabled:cursor-not-allowed',
    success: 'bg-[var(--success)] text-white hover:bg-[var(--success)]/80 focus:ring-[var(--success)] disabled:opacity-40 disabled:cursor-not-allowed',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </button>
  );
}
