'use client';

import React from 'react';
import { ShieldCheck, Cpu, Power, Zap } from 'lucide-react';

const directives = [
  { id: 1, title: 'Scout HN for "Video AI" trends', status: 'active', priority: 'high' },
  { id: 2, title: 'Synthesize Stijn formats for daily drop', status: 'active', priority: 'medium' },
  { id: 3, title: 'Auto-reply to top 5 X mentions', status: 'idle', priority: 'low' },
  { id: 4, title: 'Render Remotion weekly wrap', status: 'pending', priority: 'medium' },
];

export function ActiveDirectives() {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/5 shadow-xl h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Cpu size={18} />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Directives</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Automation Online</span>
        </div>
      </div>

      <div className="space-y-3">
        {directives.map((directive) => (
          <div 
            key={directive.id}
            className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className={`p-2 rounded-lg ${
              directive.status === 'active' ? 'bg-blue-500/10 text-blue-400' : 'bg-zinc-800 text-zinc-500'
            }`}>
              {directive.status === 'active' ? <Zap size={14} className="animate-pulse" /> : <Power size={14} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors truncate">
                {directive.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-mono uppercase tracking-widest ${
                  directive.priority === 'high' ? 'text-red-400' : directive.priority === 'medium' ? 'text-amber-400' : 'text-zinc-500'
                }`}>
                  {directive.priority} priority
                </span>
                <span className="text-zinc-700">•</span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {directive.status}
                </span>
              </div>
            </div>
            <ShieldCheck size={16} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
