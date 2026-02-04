'use client';

import React, { useState } from 'react';
import { Copy, Check, AlertTriangle, XCircle, RefreshCw, Twitter, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from './Tooltip';
import { EditModal } from './EditModal';
import { regenerateSinglePostAction } from '@/app/actions';

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  content: string;
  thesis: string;
  onUpdate: (newContent: string) => void;
}

export function PostCard({ id, title, description, content, thesis, onUpdate }: PostCardProps) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
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

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const result = await regenerateSinglePostAction(thesis, id);
      if (result.post) {
        onUpdate(result.post);
      }
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleShareX = () => {
    const text = encodeURIComponent(content);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:border-indigo-500/50 transition-all shadow-lg flex flex-col h-full glow-card group"
    >
      <div className="flex justify-between items-start mb-3 pb-2 border-b border-white/10">
        <div className="flex flex-col">
          <Tooltip text={description}>
            <h3 className="text-indigo-400 font-bold text-sm uppercase tracking-widest cursor-help group-hover:text-indigo-300 transition-colors">
              {title}
            </h3>
          </Tooltip>
        </div>
        
        <div className="flex items-center gap-3">
           <div className={`flex items-center gap-1 text-xs font-mono ${badgeColor} bg-black/20 px-2 py-0.5 rounded-full border border-white/5`}>
            {badgeIcon}
            <span>{charCount}/280</span>
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      <div className={`text-slate-200 text-sm leading-relaxed whitespace-pre-wrap flex-grow font-sans ${!isExpanded ? 'hidden md:block' : 'block'}`}>
        {content}
      </div>
      
      <div className={`mt-6 pt-4 border-t border-white/5 flex flex-wrap justify-between items-center gap-3 ${!isExpanded ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex gap-2">
           <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            title="Regenerate this post"
            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-indigo-400 hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <RefreshCw size={16} className={isRegenerating ? "animate-spin" : ""} />
          </button>
          
           <button
            onClick={() => setIsEditing(true)}
            title="Edit post"
            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-indigo-400 hover:bg-white/10 transition-all"
          >
            <Edit2 size={16} />
          </button>
          
          <button
            onClick={handleShareX}
            title="Share to X"
            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all"
          >
            <Twitter size={16} />
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold hover:bg-indigo-500/30 transition-all border border-indigo-500/30 shadow-inner"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Post"}
        </button>
      </div>

      <EditModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={onUpdate}
        initialContent={content}
        title={title}
      />
    </motion.div>
  );
}
