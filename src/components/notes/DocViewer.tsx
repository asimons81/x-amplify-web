'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Doc } from '@/lib/brain';
import { Calendar, Tag, ChevronLeft, Edit3, Share2 } from 'lucide-react';
import Link from 'next/link';

interface DocViewerProps {
  doc: Doc;
}

export function DocViewer({ doc }: DocViewerProps) {
  return (
    <article className="max-w-4xl mx-auto space-y-10 pb-24">
      <header className="space-y-6">
        <Link 
          href={`/notes/${doc.category}`}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-blue-400 uppercase tracking-widest transition-colors"
        >
          <ChevronLeft size={14} /> Back to {doc.category}
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            {doc.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-zinc-500 text-xs font-mono uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{doc.date || 'No Date'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={14} />
              <span className="text-blue-400">{doc.category}</span>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors" title="Edit in Cursor">
                <Edit3 size={16} />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />
      </header>

      <div className="prose prose-invert prose-zinc max-w-none 
        prose-headings:font-black prose-headings:tracking-tighter prose-headings:italic
        prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
        prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg
        prose-strong:text-white prose-strong:font-bold
        prose-code:text-blue-400 prose-code:bg-blue-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/5 prose-pre:rounded-2xl
        prose-li:text-zinc-400 prose-li:marker:text-blue-500
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-500/5 prose-blockquote:py-1 prose-blockquote:rounded-r-xl
      ">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {doc.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
