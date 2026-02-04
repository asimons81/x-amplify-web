'use client';

import React from 'react';
import { Target, TrendingUp } from 'lucide-react';

export function ExitTracker() {
  const currentIncome = 1250; // Hardcoded for now
  const targetIncome = 2800; // $17/hr ISU salary approx $2.8k/mo
  const percentage = Math.min(Math.round((currentIncome / targetIncome) * 100), 100);

  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/5 shadow-xl relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Target size={18} />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Exit Tracker</h3>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
            <TrendingUp size={14} />
            <span>Active Progress</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Current Digital Revenue</p>
              <h4 className="text-2xl font-black text-white font-mono">${currentIncome.toLocaleString()}<span className="text-zinc-600 text-sm font-normal"> / mo</span></h4>
            </div>
            <div className="text-right">
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1">Freedom Goal</p>
              <h4 className="text-lg font-bold text-zinc-300 font-mono">${targetIncome.toLocaleString()}</h4>
            </div>
          </div>

          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">
            <span>Corporate Slavery</span>
            <span className="text-white font-bold">{percentage}% REPLACED</span>
            <span>Digital Freedom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
