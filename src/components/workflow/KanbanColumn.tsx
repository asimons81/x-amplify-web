'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';

interface Task {
  id: string;
  title: string;
  columnId: string;
  content: string;
}

interface KanbanColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'Column',
    },
  });

  return (
    <div className="flex flex-col w-72 min-w-[18rem] bg-zinc-900/40 rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/60">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">{title}</h3>
        <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-zinc-500">{tasks.length}</span>
      </div>
      
      <div 
        ref={setNodeRef}
        className="flex-1 p-3 space-y-3 overflow-y-auto scrollbar-hide min-h-[200px]"
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
