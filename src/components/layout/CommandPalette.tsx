'use client';

import React from 'react';
import { Command } from 'cmdk';
import { 
  Search, 
  Zap, 
  Plus, 
  BrainCircuit, 
  Activity,
  History,
  FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandPalette({ open, setOpen }: CommandPaletteProps) {
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    command();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] p-4 bg-zinc-950/80 backdrop-blur-sm">
      <div 
        className="fixed inset-0" 
        onClick={() => setOpen(false)} 
      />
      <Command 
        className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(false);
        }}
      >
        <div className="flex items-center border-b border-white/5 px-4 py-3">
          <Search size={20} className="text-zinc-500 mr-3" />
          <Command.Input 
            autoFocus
            placeholder="Type a command or search..." 
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-600 text-lg"
          />
        </div>

        <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
          <Command.Empty className="py-6 text-center text-zinc-500 text-sm">No results found.</Command.Empty>

          <Command.Group heading="Navigation" className="px-2 py-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/'))}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 cursor-pointer aria-selected:bg-white/5 aria-selected:text-white transition-colors"
            >
              <Activity size={18} />
              <span>Dashboard</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/generator'))}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 cursor-pointer aria-selected:bg-white/5 aria-selected:text-white transition-colors"
            >
              <Zap size={18} />
              <span>Generator</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/workflow'))}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 cursor-pointer aria-selected:bg-white/5 aria-selected:text-white transition-colors"
            >
              <History size={18} />
              <span>Workflow</span>
            </Command.Item>
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/notes'))}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 cursor-pointer aria-selected:bg-white/5 aria-selected:text-white transition-colors"
            >
              <BrainCircuit size={18} />
              <span>Notes</span>
            </Command.Item>
          </Command.Group>

          <Command.Group heading="Actions" className="px-2 py-2 mt-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <Command.Item 
              onSelect={() => runCommand(() => router.push('/generator'))}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 cursor-pointer aria-selected:bg-white/5 aria-selected:text-white transition-colors"
            >
              <Plus size={18} className="text-blue-500" />
              <span>Generate New Post</span>
            </Command.Item>
            <Command.Item 
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 cursor-pointer aria-selected:bg-white/5 aria-selected:text-white transition-colors"
            >
              <FileText size={18} className="text-purple-500" />
              <span>New Idea</span>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
