'use client';

import React from 'react';
import { Search, Command } from 'lucide-react';
import { CommandPalette } from './CommandPalette';

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <header className="h-16 border-b border-white/5 bg-zinc-950/20 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.2em]">System Status: <span className="text-emerald-500">Nominal</span></span>
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group min-w-0 md:min-w-[300px] flex-1 md:flex-none max-w-md mx-4"
        >
          <Search size={16} className="text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0" />
          <span className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors flex-1 text-left truncate">Execute command...</span>
          <div className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-zinc-500 shrink-0">
            <Command size={10} />
            <span>K</span>
          </div>
        </button>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Syncing Brain...</span>
          </div>
        </div>
      </header>
      
      <CommandPalette open={isOpen} setOpen={setIsOpen} />
    </>
  );
}
