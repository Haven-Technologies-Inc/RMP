'use client';

import { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check, Search } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  error?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = 'Select...', disabled, searchable, className, error }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    const filteredOptions = searchable
      ? options.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))
      : options;

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
          setSearch('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={containerRef} className={cn('relative', className)}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm',
            'bg-white dark:bg-slate-800 text-slate-900 dark:text-white',
            'border-slate-300 dark:border-slate-600',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            disabled && 'cursor-not-allowed opacity-50',
            error && 'border-red-500',
            isOpen && 'ring-2 ring-primary/50'
          )}
        >
          <span className={cn(!selectedOption && 'text-slate-400 dark:text-slate-500')}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className={cn('h-4 w-4 text-slate-400 dark:text-slate-500 transition-transform', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-600 dark:bg-slate-800">
            {searchable && (
              <div className="border-b border-slate-200 p-2 dark:border-slate-600">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full rounded-md border-0 bg-slate-100 py-1.5 pl-8 pr-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-0 dark:bg-slate-700"
                    autoFocus
                  />
                </div>
              </div>
            )}
            <div className="max-h-60 overflow-auto p-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">No options found</div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      if (!option.disabled) {
                        onChange?.(option.value);
                        setIsOpen(false);
                        setSearch('');
                      }
                    }}
                    disabled={option.disabled}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm',
                      'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700',
                      option.value === value && 'bg-primary/10 text-primary',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    {option.label}
                    {option.value === value && <Check className="h-4 w-4" />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
