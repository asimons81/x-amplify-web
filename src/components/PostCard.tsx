'use client';

import React, { useState } from 'react';
import { Copy, Check, AlertTriangle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostCardProps {
  title: string;
  content: string;
}

export function PostCard({ title, content }: PostCardProps) {
  const [copied, setCopied] = useState(false);
  const charCount = content.length;

  let badgeColor = "text-green-500";
  let badgeIcon = <Check size={12} />;
  
  if (charCount > 350) {
    badgeColor = "text-red-500";
    badgeIcon = <XCircle size={12} />;
  } else if (charCount > 280) {
    badgeColor = "text-yellow-500";
    badgeIcon = <AlertTriangle size={12} />;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition-all hover:-translate-y-0.5 shadow-lg flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10">
        <h3 className="text-indigo-400 font-semibold text-sm uppercase tracking-wide">{title}</h3>
        <div className={`flex items-center gap-1 text-xs font-mono ${badgeColor}`}>
          {badgeIcon}
          <span>{charCount}/280</span>
        </div>
      </div>
      
      <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap flex-grow font-sans">
        {content}
      </div>
      
      <div className="mt-4 pt-3 flex justify-end">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-medium hover:bg-indigo-500/30 transition-colors border border-indigo-500/30"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </motion.div>
  );
}
