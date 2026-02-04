'use client';

import { useState, useEffect, useRef } from 'react';
import { generatePostsAction, getUrlPreviewAction } from './actions';
import { PostCard } from '@/components/PostCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { FORMAT_DISPLAY_NAMES, FORMAT_DESCRIPTIONS } from '@/lib/prompts';
import { Loader2, Sparkles, Trash2, Download, Copy, History, Link as LinkIcon, Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GenerationHistory {
  id: string;
  timestamp: number;
  input: string;
  thesis: string;
  posts: Record<string, string>;
}

const LOADING_STEPS = [
  "Analyzing input...",
  "Extracting thesis...",
  "Applying The Stijn Method...",
  "Generating viral hooks...",
  "Polishing character counts...",
  "Finalizing posts..."
];

export default function Home() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ thesis: string; posts: Record<string, string> } | null>(null);
  const [urlPreview, setUrlPreview] = useState<{ title: string; favicon: string } | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<GenerationHistory[]>([]);
  const [allCopied, setAllCopied] = useState(false);
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('x_amplify_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('x_amplify_history', JSON.stringify(history));
  }, [history]);

  // URL Detection
  useEffect(() => {
    const detectUrl = async () => {
      const match = input.match(/https?:\/\/[^\s]+/);
      if (match) {
        const url = match[0];
        const preview = await getUrlPreviewAction(url);
        setUrlPreview(preview);
      } else {
        setUrlPreview(null);
      }
    };
    detectUrl();
  }, [input]);

  // Loading steps animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 3000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (input.trim() && !loading) {
          handleGenerate();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, loading]);

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
        const newData = { thesis: result.thesis, posts: result.posts };
        setData(newData);
        
        // Add to history
        const historyItem: GenerationHistory = {
          id: Date.now().toString(),
          timestamp: Date.now(),
          input: input,
          thesis: result.thesis,
          posts: result.posts
        };
        setHistory(prev => [historyItem, ...prev].slice(0, 10)); // Keep last 10
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
    setUrlPreview(null);
  };
  
  const handleCopyAll = async () => {
    if (!data) return;
    const formattedText = Object.entries(data.posts)
      .map(([key, content]) => `[${FORMAT_DISPLAY_NAMES[key]}]\n\n${content}`)
      .join('\n\n' + '═'.repeat(40) + '\n\n');
    
    await navigator.clipboard.writeText(formattedText);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
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

  const updatePost = (key: string, newContent: string) => {
    if (!data) return;
    setData({
      ...data,
      posts: {
        ...data.posts,
        [key]: newContent
      }
    });
  };

  const loadFromHistory = (item: GenerationHistory) => {
    setInput(item.input);
    setData({ thesis: item.thesis, posts: item.posts });
    setIsHistoryOpen(false);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Navbar/Header */}
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            X-AMPLIFY
          </h1>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-300 text-sm font-medium"
          >
            <History size={18} />
            <span className="hidden sm:inline">History</span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isHistoryOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isHistoryOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-72 md:w-96 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="p-4 border-b border-white/10 bg-white/5">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Recent Generations</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {history.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm italic">
                      No history yet. Start generating!
                    </div>
                  ) : (
                    history.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => loadFromHistory(item)}
                        className="w-full p-4 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                      >
                        <p className="text-slate-200 text-sm font-medium truncate mb-1">"{item.thesis}"</p>
                        <p className="text-slate-500 text-xs truncate">{item.input}</p>
                        <p className="text-indigo-500/60 text-[10px] mt-2 font-mono uppercase">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
          One Idea. <span className="text-indigo-500">10 Viral Posts.</span><br className="hidden md:block" />
          Zero Effort.
        </h2>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light">
          Scale your content strategy using <span className="text-indigo-400 font-semibold border-b border-indigo-500/30">The Stijn Method</span>. 
          The exact formats that drive millions of impressions on X.
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-3xl mx-auto mb-16 space-y-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
          <div className="relative">
            <textarea
              ref={textAreaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a URL or describe your idea..."
              className="w-full h-40 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-all resize-none text-xl shadow-2xl"
            />
            
            <div className="absolute bottom-4 right-4 flex items-center gap-4">
              <span className="hidden md:flex items-center gap-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/10">CMD</span>
                <span>+</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-white/10">ENTER</span>
              </span>
              
              {input && (
                <button 
                  onClick={handleClear}
                  className="text-slate-500 hover:text-red-400 transition-colors p-1"
                  title="Clear input"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* URL Preview */}
        <AnimatePresence>
          {urlPreview && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex items-center gap-4">
                <div className="bg-black/40 p-2 rounded-lg">
                  {urlPreview.favicon ? (
                    <img src={urlPreview.favicon} alt="Favicon" className="w-6 h-6 object-contain" />
                  ) : (
                    <Globe size={24} className="text-indigo-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                    <LinkIcon size={12} /> URL Detected
                  </p>
                  <h4 className="text-slate-200 font-medium truncate">{urlPreview.title}</h4>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleGenerate}
          disabled={!input.trim() || loading}
          className="group relative w-full overflow-hidden rounded-2xl bg-indigo-600 p-[1px] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl shadow-indigo-500/25"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:animate-gradient-x"></div>
          <div className="relative flex h-16 items-center justify-center gap-3 rounded-[15px] bg-slate-900 transition-all group-hover:bg-transparent">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin text-white" size={20} />
                  <span className="text-white font-bold text-lg uppercase tracking-wider">Processing...</span>
                </div>
                <motion.p 
                  key={loadingStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-indigo-300 text-[10px] font-bold uppercase tracking-[0.2em] mt-1"
                >
                  {LOADING_STEPS[loadingStep]}
                </motion.p>
              </div>
            ) : (
              <>
                <Sparkles className="text-indigo-400 group-hover:text-white transition-colors" size={24} />
                <span className="text-white font-bold text-xl uppercase tracking-widest">Generate Campaign</span>
              </>
            )}
          </div>
        </button>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-center font-medium animate-shake">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {loading && !data && (
        <div className="space-y-12 animate-in fade-in duration-500">
           <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center max-w-4xl mx-auto animate-pulse">
            <div className="h-4 w-24 bg-white/10 rounded mx-auto mb-4" />
            <div className="h-8 w-3/4 bg-white/10 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      )}

      {data && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
          {/* Thesis */}
          <div className="relative group max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/50 to-purple-600/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 text-center overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400 mb-6">The Master Thesis</h2>
              <p className="text-2xl md:text-4xl font-black text-white leading-tight mb-2">"{data.thesis}"</p>
              <div className="w-12 h-1 bg-indigo-500/30 mx-auto mt-8 rounded-full"></div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-2">
            <div>
              <h3 className="text-xl font-bold text-white">The Stijn Collection</h3>
              <p className="text-slate-500 text-sm">10 high-performance formats ready for X.</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-bold text-sm shadow-xl shadow-indigo-500/20"
              >
                {allCopied ? <Check size={18} /> : <Copy size={18} />}
                {allCopied ? "Copied All!" : "Copy All 10 Posts"}
              </button>
              
               <button
                onClick={handleExport}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-300 font-bold text-sm"
              >
                <Download size={18} /> Export JSON
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(FORMAT_DISPLAY_NAMES).map(([key, label], index) => {
              const content = data.posts[key];
              const description = FORMAT_DESCRIPTIONS[key];
              if (!content) return null;
              
              return (
                <PostCard 
                  key={key} 
                  id={key}
                  title={label} 
                  description={description}
                  content={content} 
                  thesis={data.thesis}
                  onUpdate={(newContent) => updatePost(key, newContent)}
                />
              );
            })}
          </div>
          
          <div className="text-center pb-20 pt-12">
            <p className="text-slate-500 text-sm mb-6 uppercase tracking-widest font-bold">End of campaign</p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                textAreaRef.current?.focus();
              }}
              className="px-8 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-sm font-bold transition-all"
            >
              Generate New Strategy
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
