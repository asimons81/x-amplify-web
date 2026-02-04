import React from 'react';
import { Flame, ArrowUpRight, MessageSquare } from 'lucide-react';
import { getBrainContent } from '@/lib/brain';
import Link from 'next/link';

export async function TrendPulse() {
  const ideas = await getBrainContent('ideas');
  
  // Sort by HN score or date (mocked for now, just taking top 5)
  const topIdeas = ideas.slice(0, 5);

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/5 shadow-xl h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
            <Flame size={18} />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Trend Pulse</h3>
        </div>
        <Link href="/notes" className="text-[10px] font-mono text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">
          View All Ideas
        </Link>
      </div>

      <div className="space-y-3">
        {topIdeas.map((idea, i) => (
          <div 
            key={i}
            className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all group cursor-pointer"
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                  {idea.title}
                </h4>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                    <MessageSquare size={10} />
                    {(idea.data as any)?.category || 'General'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                    <ArrowUpRight size={10} />
                    {(idea.data as any)?.score || 42}
                  </span>
                </div>
              </div>
              <div className="p-1.5 rounded bg-white/5 text-zinc-500 group-hover:text-blue-400 transition-colors">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
