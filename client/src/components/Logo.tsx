import React from 'react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight brand-font">
          Ask Me Again
        </h1>
      </div>
      <p className="tagline mt-1">Because some answers change.</p>
    </div>
  );
}

export function LogoSymbol() {
  return (
    <svg 
      width="48" 
      height="48" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-90"
    >
      {/* Two overlapping circles creating an eclipse-like shape */}
      <circle cx="20" cy="24" r="14" fill="#5a4b81" fillOpacity="0.3" />
      <circle cx="28" cy="24" r="14" fill="#d6c7a1" fillOpacity="0.4" />
      
      {/* Subtle spiral/ripple effect */}
      <path 
        d="M24 12C28.4183 12 32 15.5817 32 20C32 24.4183 28.4183 28 24 28C19.5817 28 16 24.4183 16 20C16 15.5817 19.5817 12 24 12Z" 
        stroke="#5a4b81" 
        strokeWidth="1.5" 
        strokeOpacity="0.6"
        fill="none"
      />
      <path 
        d="M24 16C26.2091 16 28 17.7909 28 20C28 22.2091 26.2091 24 24 24C21.7909 24 20 22.2091 20 20C20 17.7909 21.7909 16 24 16Z" 
        stroke="#5a4b81" 
        strokeWidth="1"
        strokeOpacity="0.8"
        fill="none"
      />
    </svg>
  );
}

export function CompactLogo() {
  return (
    <div className="flex items-center">
      <LogoSymbol />
      <div className="ml-2">
        <h1 className="text-xl font-medium brand-font">Ask Me Again</h1>
        <p className="tagline text-xs mt-0">Because some answers change.</p>
      </div>
    </div>
  );
}