import React, { Suspense } from 'react';
import { 
  Users, 
  Zap, 
  Lightbulb, 
  ArrowRight,
  PlusCircle,
  Newspaper
} from 'lucide-react';
import Link from 'next/link';
import { StatCard } from '@/components/dashboard/StatCard';
import { ExitTracker } from '@/components/dashboard/ExitTracker';
import { TrendPulse } from '@/components/dashboard/TrendPulse';
import { ActiveDirectives } from '@/components/dashboard/ActiveDirectives';

export default function DashboardPage() {
  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">
            COMMAND<span className="text-blue-500">CENTER</span>
          </h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">
            Operational Overview — Phase: <span className="text-zinc-300">Growth & Automate</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link 
            href="/generator"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all text-white font-bold text-sm shadow-lg shadow-blue-500/20 group"
          >
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
            Generate Content
          </Link>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-zinc-300 font-bold text-sm">
            Quick Note
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          label="X Followers" 
          value="12.4K" 
          sublabel="Total reach across accounts"
          icon={<Users size={20} />}
          trend={{ value: 12, isUp: true }}
          color="blue"
        />
        <StatCard 
          label="Daily Renders" 
          value="42" 
          sublabel="Remotion jobs completed"
          icon={<Zap size={20} />}
          trend={{ value: 5, isUp: true }}
          color="purple"
        />
        <StatCard 
          label="Ideas in Pipeline" 
          value="156" 
          sublabel="Scouted from HN & Reddit"
          icon={<Lightbulb size={20} />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <ExitTracker />
          <ActiveDirectives />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-[400px] w-full bg-zinc-900/50 rounded-2xl animate-pulse" />}>
            <TrendPulse />
          </Suspense>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 shadow-2xl relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Newspaper size={200} />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-black text-white mb-2">Draft Next Newsletter</h3>
              <p className="text-white/70 text-sm mb-6 max-w-[280px]">
                You have 12 new ideas scouted since the last edition. Ready to synthesize?
              </p>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-indigo-700 font-bold text-sm hover:bg-zinc-100 transition-colors">
                Start Drafting <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
