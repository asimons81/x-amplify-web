'use client';

import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ClipboardList, 
  Brain, 
  Copy, 
  Check,
  ArrowRight,
  History
} from 'lucide-react';
import Link from 'next/link';

interface GenerationHistory {
  id: string;
  timestamp: number;
  input: string;
  thesis: string;
  posts: Record<string, string>;
}

export default function DashboardPage() {
  const [history, setHistory] = useState<GenerationHistory[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('x_amplify_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed.slice(0, 5)); // Only show last 5
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-10 px-4">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white">
          OZZY <span className="text-blue-500">OS</span>
        </h1>
        <p className="text-zinc-500 font-medium text-lg md:text-xl uppercase tracking-[0.3em]">
          Your Personal Content Engine
        </p>
      </section>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link href="/generator" className="group">
          <div className="h-full p-8 rounded-3xl bg-zinc-900 border-2 border-zinc-800 hover:border-blue-500/50 transition-all flex flex-col items-center text-center space-y-6 shadow-2xl hover:shadow-blue-500/10 active:scale-95">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Zap size={32} fill="currentColor" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Generate X Posts</h2>
              <p className="text-zinc-500 text-sm">Turn any idea into 10 viral posts using the Stijn Method.</p>
            </div>
            <div className="mt-auto w-full py-4 rounded-xl bg-blue-600 text-white font-bold group-hover:bg-blue-500 transition-colors text-center">
              Launch Generator
            </div>
          </div>
        </Link>

        <Link href="/workflow" className="group">
          <div className="h-full p-8 rounded-3xl bg-zinc-900 border-2 border-zinc-800 hover:border-purple-500/50 transition-all flex flex-col items-center text-center space-y-6 shadow-2xl hover:shadow-purple-500/10 active:scale-95">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
              <ClipboardList size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Content Pipeline</h2>
              <p className="text-zinc-500 text-sm">Track your ideas from raw concepts to published posts.</p>
            </div>
            <div className="mt-auto w-full py-4 rounded-xl bg-purple-600 text-white font-bold group-hover:bg-purple-500 transition-colors text-center">
              Open Board
            </div>
          </div>
        </Link>

        <Link href="/notes" className="group">
          <div className="h-full p-8 rounded-3xl bg-zinc-900 border-2 border-zinc-800 hover:border-amber-500/50 transition-all flex flex-col items-center text-center space-y-6 shadow-2xl hover:shadow-amber-500/10 active:scale-95">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Brain size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Notes</h2>
              <p className="text-zinc-500 text-sm">Browse your journals, concepts, and content templates.</p>
            </div>
            <div className="mt-auto w-full py-4 rounded-xl bg-amber-600 text-white font-bold group-hover:bg-amber-500 transition-colors text-center">
              View Knowledge Base
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Generations */}
      {history.length > 0 && (
        <section className="space-y-6 pt-12">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <History size={20} className="text-blue-500" />
              Recent Generations
            </h3>
            <Link href="/generator" className="text-zinc-500 hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {history.map((item) => {
              const firstPost = Object.values(item.posts)[0] || "";
              return (
                <div 
                  key={item.id}
                  className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-zinc-300 font-medium truncate mb-1">
                      {item.thesis}
                    </p>
                    <p className="text-zinc-500 text-xs truncate">
                      {new Date(item.timestamp).toLocaleString()} • {item.input}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(firstPost, item.id)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-zinc-300 text-sm font-bold group-hover:border-blue-500/30"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check size={16} className="text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy Post
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
