'use client';

import { useState } from 'react';
import { generatePostsAction } from './actions';
import { PostCard } from '@/components/PostCard';
import { FORMAT_DISPLAY_NAMES } from '@/lib/prompts';
import { Loader2, Sparkles, Trash2, Download } from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ thesis: string; posts: Record<string, string> } | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await generatePostsAction(input);
      if (result.error) {
        setError(result.error);
      } else {
        setData({ thesis: result.thesis, posts: result.posts });
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setData(null);
    setError(null);
  };
  
  const handleExport = () => {
    if (!data) return;
    const jsonStr = JSON.stringify(data.posts, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "x-amplify-posts.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          ⚡ X-Amplify
        </h1>
        <p className="text-slate-400 text-lg">
          Transform any idea into 10 viral X posts using <span className="text-indigo-400 font-semibold">The Stijn Method</span>
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-3xl mx-auto mb-16 space-y-4">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste a URL (https://...) or describe your idea, product, or insight..."
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none text-lg"
          />
          {input && (
            <button 
              onClick={handleClear}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
              title="Clear input"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        <button
          onClick={handleGenerate}
          disabled={!input.trim() || loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles /> Generate 10 Posts
            </>
          )}
        </button>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {data && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* Thesis */}
          <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-xl p-8 text-center max-w-4xl mx-auto backdrop-blur-sm">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300 mb-3">The Core Thesis</h2>
            <p className="text-2xl md:text-3xl font-bold text-white leading-tight">"{data.thesis}"</p>
          </div>

          <div className="border-t border-white/10 my-8"></div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(FORMAT_DISPLAY_NAMES).map(([key, label], index) => {
              const content = data.posts[key];
              if (!content) return null;
              
              return (
                <PostCard 
                  key={key} 
                  title={label} 
                  content={content} 
                />
              );
            })}
          </div>
          
           <div className="flex justify-center mt-12">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-300 font-medium"
            >
              <Download size={20} /> Export JSON
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
