"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-900 transition-opacity duration-500">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Image
            src="/favicon.svg"
            alt="Loading..."
            width={64}
            height={64}
            className="h-16 w-16 animate-pulse"
            priority
          />
          <div className="absolute inset-0 animate-ping">
            <Image
              src="/favicon.svg"
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 opacity-30"
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-primary-600 animate-bounce [animation-delay:-0.3s]" />
          <div className="h-2 w-2 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]" />
          <div className="h-2 w-2 rounded-full bg-secondary-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
