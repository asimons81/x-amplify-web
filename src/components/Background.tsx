'use client';

import React from 'react';

export function Background() {
  return (
    <div className="mesh-gradient overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] animate-float" style={{ animationDelay: '-5s' }} />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-pink-500/5 blur-[100px] animate-pulse-slow" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
    </div>
  );
}
