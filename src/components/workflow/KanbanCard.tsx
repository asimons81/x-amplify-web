'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, MoreHorizontal, ArrowUpRight } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  columnId: string;
  content: string;
}

interface KanbanCardProps {
  task: Task;
}

export function KanbanCard({ task }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/50 h-24 opacity-50"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group p-4 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/20 hover:bg-zinc-800/80 transition-all shadow-lg relative cursor-default"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-bold text-white leading-tight group-hover:text-blue-400 transition-colors">
          {task.title}
        </h4>
        <button className="text-zinc-600 hover:text-white transition-colors">
          <MoreHorizontal size={14} />
        </button>
      </div>
      
      <p className="text-xs text-zinc-500 line-clamp-2 mb-3">
        {task.content}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border border-white/10" />
          <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-tighter">Tony S.</span>
        </div>
        
        <div className="flex items-center gap-2">
           <div 
            {...attributes} 
            {...listeners}
            className="p-1 hover:bg-white/5 rounded cursor-grab active:cursor-grabbing text-zinc-700 hover:text-zinc-400 transition-colors"
          >
            <GripVertical size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
