'use client';

import React from 'react';

export function SkeletonCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg animate-pulse flex flex-col h-full">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
        <div className="h-4 w-24 bg-white/10 rounded" />
        <div className="h-4 w-16 bg-white/10 rounded" />
      </div>
      
      <div className="space-y-3 flex-grow mt-4">
        <div className="h-4 w-full bg-white/10 rounded" />
        <div className="h-4 w-[90%] bg-white/10 rounded" />
        <div className="h-4 w-[95%] bg-white/10 rounded" />
        <div className="h-4 w-[80%] bg-white/10 rounded" />
      </div>
      
      <div className="mt-6 flex justify-end">
        <div className="h-8 w-16 bg-white/10 rounded-lg" />
      </div>
    </div>
  );
}
