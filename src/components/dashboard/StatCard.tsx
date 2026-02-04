'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color?: 'blue' | 'purple' | 'amber' | 'emerald';
}

const colorMap = {
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20 shadow-blue-500/5',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-purple-500/5',
  amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/5',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5',
};

export function StatCard({ label, value, sublabel, icon, trend, color = 'blue' }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-6 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all group shadow-xl ${colorMap[color]}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorMap[color]} border`}>
          {icon}
        </div>
        {trend && (
          <div className={`text-xs font-mono font-bold ${trend.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend.isUp ? '+' : '-'}{trend.value}%
          </div>
        )}
      </div>
      <div>
        <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-black text-white tracking-tight font-mono">{value}</h3>
        {sublabel && <p className="text-zinc-500 text-[10px] mt-1 uppercase tracking-wider">{sublabel}</p>}
      </div>
    </motion.div>
  );
}
