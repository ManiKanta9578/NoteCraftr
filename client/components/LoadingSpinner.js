import React from 'react';

const LoadingSpinner = () => {
  
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Simple spinner */}
        <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-500 border-r-blue-600 dark:border-r-blue-500"></div>
        
        {/* Minimal text */}
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

// Alternative minimal version for inline use
export const InlineSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative">
        <div className="w-8 h-8 border-2 border-gray-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

const ShimmerSkeleton = ({ className }) => (
  <div 
    className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`}
  >
    <div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-gray-600/60 to-transparent -translate-x-full animate-shimmer"
      style={{
        animation: 'shimmer 2s infinite',
        transform: 'translateX(-100%)'
      }}
    />
    <style jsx>{`
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  </div>
);

// Alternative skeleton loading for content areas
export const CardSkeleton = ({ showActions = true, variant = 'default' }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3 flex-1">
        <ShimmerSkeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <ShimmerSkeleton className="h-4 w-1/3" />
          <ShimmerSkeleton className="h-3 w-1/4" />
        </div>
      </div>
      {showActions && <ShimmerSkeleton className="w-6 h-6 rounded" />}
    </div>
    
    {/* Content */}
    <div className="space-y-3">
      <ShimmerSkeleton className="h-5 w-4/5" />
      <ShimmerSkeleton className="h-4 w-full" />
      <ShimmerSkeleton className="h-4 w-3/4" />
    </div>
    
    {/* Footer */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <ShimmerSkeleton className="h-3 w-16" />
        <ShimmerSkeleton className="h-3 w-12" />
      </div>
      <ShimmerSkeleton className="h-3 w-8" />
    </div>
  </div>
);

export default LoadingSpinner;