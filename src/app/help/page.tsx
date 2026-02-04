import React from 'react';
import { 
  Zap, 
  ClipboardList, 
  Brain, 
  Keyboard, 
  MousePointer2, 
  ArrowRight,
  Home,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10 px-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
        <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
          <Home size={12} /> Dashboard
        </Link>
        <ChevronRight size={10} />
        <span className="text-zinc-300">Help & Onboarding</span>
      </nav>

      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-white">How to Use OZZY OS</h1>
        <p className="text-zinc-500 text-lg">Master the tools and workflows of your content engine.</p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Generator */}
        <section className="space-y-6 p-8 rounded-3xl bg-zinc-900 border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Zap size={24} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">⚡ Generator</h2>
          </div>
          
          <p className="text-zinc-400">
            The Generator turns any idea into 10 viral X posts using <span className="text-blue-400 font-semibold">"The Stijn Method."</span>
          </p>

          <ol className="space-y-4">
            {[
              "Paste a URL or type your idea",
              "Click \"Generate 10 Posts\"",
              "Wait ~30 seconds for AI to create your posts",
              "Copy any post with one click",
              "Use \"Share to X\" to post directly"
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-zinc-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Pipeline */}
        <section className="space-y-6 p-8 rounded-3xl bg-zinc-900 border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
              <ClipboardList size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">📋 Content Pipeline</h2>
          </div>
          
          <p className="text-zinc-400">
            A simple board to track your content from idea to posted.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Ideas", desc: "Raw ideas you want to explore" },
              { label: "Drafting", desc: "Posts you're working on" },
              { label: "Ready", desc: "Polished and ready to publish" },
              { label: "Posted", desc: "Archive of published content" }
            ].map((col) => (
              <div key={col.label} className="p-4 rounded-2xl bg-zinc-800/50 border border-white/5">
                <h4 className="font-bold text-white mb-1">{col.label}</h4>
                <p className="text-sm text-zinc-500">{col.desc}</p>
              </div>
            ))}
          </div>
          
          <p className="text-zinc-500 text-sm italic flex items-center gap-2">
            <MousePointer2 size={14} /> Drag cards between columns to update status.
          </p>
        </section>

        {/* Notes */}
        <section className="space-y-6 p-8 rounded-3xl bg-zinc-900 border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Brain size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">🧠 Notes</h2>
          </div>
          
          <p className="text-zinc-400">
            Your personal knowledge base. Browse journals, concepts, and templates.
          </p>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="space-y-6 p-8 rounded-3xl bg-zinc-900 border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Keyboard size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight">⌨️ Keyboard Shortcuts</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-800/50 border border-white/5">
              <span className="text-zinc-300">Open command palette</span>
              <kbd className="px-2 py-1 rounded bg-zinc-700 text-zinc-300 font-mono text-xs">Cmd/Ctrl + K</kbd>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-800/50 border border-white/5">
              <span className="text-zinc-300">Generate posts (in generator)</span>
              <kbd className="px-2 py-1 rounded bg-zinc-700 text-zinc-300 font-mono text-xs">Cmd/Ctrl + Enter</kbd>
            </div>
          </div>
        </section>
      </div>

      <div className="pt-12 text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20"
        >
          Got it, let's go! <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
