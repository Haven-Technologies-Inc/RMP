import React from 'react';

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#06B6D4]/20 to-[#7C3AED]/20 rounded-full blur-xl animate-float" 
           style={{ animationDelay: '0s', animationDuration: '6s' }} />
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 rounded-full blur-xl animate-float" 
           style={{ animationDelay: '1s', animationDuration: '8s' }} />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-br from-[#10B981]/20 to-[#06B6D4]/20 rounded-full blur-xl animate-float" 
           style={{ animationDelay: '2s', animationDuration: '7s' }} />
      <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-[#06B6D4]/30 to-transparent rounded-full blur-lg animate-float" 
           style={{ animationDelay: '1.5s', animationDuration: '9s' }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
}
