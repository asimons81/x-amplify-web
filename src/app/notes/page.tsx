import React from 'react';
import { getCategories, getDocsByCategory } from '@/lib/brain';
import Link from 'next/link';
import { 
  BrainCircuit, 
  ChevronRight, 
  Home, 
  Folder, 
  FileText,
  Search,
  Sparkles
} from 'lucide-react';

export default async function NotesPage() {
  const categories = getCategories();
  
  // Get latest docs from each category
  const categorySummary = await Promise.all(
    categories.map(async (cat) => {
      const docs = getDocsByCategory(cat);
      return {
        name: cat,
        count: docs.length,
        latest: docs.slice(0, 3)
      };
    })
  );

  return (
    <div className="space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
        <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
          <Home size={12} /> Dashboard
        </Link>
        <ChevronRight size={10} />
        <span className="text-zinc-300">Notes</span>
      </nav>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">
            SECOND<span className="text-blue-500">BRAIN</span>
          </h1>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">
            Digital Intelligence Repository
          </p>
        </div>

        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-400 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search the brain..." 
            className="pl-10 pr-4 py-2 bg-zinc-900 border border-white/5 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 transition-all w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categorySummary.map((cat) => (
          <Link 
            key={cat.name}
            href={`/notes/${cat.name}`}
            className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                <Folder size={20} />
              </div>
              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                {cat.count} Docs
              </span>
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-blue-400 transition-colors">
              {cat.name}
            </h3>
            <div className="space-y-2">
              {cat.latest.map(doc => (
                <div key={doc.slug} className="flex items-center gap-2 text-xs text-zinc-500">
                  <FileText size={10} />
                  <span className="truncate">{doc.title}</span>
                </div>
              ))}
              {cat.count > 3 && (
                <div className="text-[10px] text-zinc-700 font-mono uppercase mt-2">
                  + {cat.count - 3} more
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-zinc-900/50 border border-white/5">
           <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Sparkles size={18} />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Intelligence Synthesis</h3>
          </div>
          <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-2xl">
            <p className="text-zinc-600 font-mono text-sm">Select documents to synthesize a new strategy...</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/10">
          <h3 className="text-lg font-bold text-white mb-4">Brain Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 uppercase tracking-widest">Neural Connections</span>
              <span className="text-blue-400 font-mono">1,242</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 uppercase tracking-widest">Knowledge Density</span>
              <span className="text-blue-400 font-mono">84%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-500 uppercase tracking-widest">Active Synthesis</span>
              <span className="text-emerald-500 font-mono">None</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
