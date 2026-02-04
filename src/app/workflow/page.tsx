import React from 'react';
import { Trello, Plus, Filter, Search, ChevronRight, Home } from 'lucide-react';
import { KanbanBoard } from '@/components/workflow/KanbanBoard';
import Link from 'next/link';

export default function WorkflowPage() {
  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
        <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
          <Home size={12} /> Dashboard
        </Link>
        <ChevronRight size={10} />
        <span className="text-zinc-300">Workflow</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2">
            PIPELINE<span className="text-blue-500">WORKFLOW</span>
          </h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">
            Content lifecycle management
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-400 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search pipeline..." 
              className="pl-10 pr-4 py-2 bg-zinc-900 border border-white/5 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 transition-all w-64"
            />
          </div>
          <button className="p-2 bg-zinc-900 border border-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors">
            <Filter size={18} />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all text-white font-bold text-sm shadow-lg shadow-blue-500/20">
            <Plus size={18} />
            New Card
          </button>
        </div>
      </div>

      <div className="bg-zinc-950/50 backdrop-blur-sm rounded-3xl border border-white/5 p-8">
        <KanbanBoard />
      </div>
    </div>
  );
}
