'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

const COLUMNS = [
  { id: 'scouted', title: 'Scouted' },
  { id: 'writing', title: 'Writing' },
  { id: 'rendering', title: 'Rendering' },
  { id: 'scheduled', title: 'Scheduled' },
  { id: 'posted', title: 'Posted' },
];

interface Task {
  id: string;
  title: string;
  columnId: string;
  content: string;
}

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ozzy_kanban_tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      // Default tasks
      const initialTasks = [
        { id: '1', title: 'Building the Command OS', columnId: 'writing', content: 'Unified hub for all projects' },
        { id: '2', title: 'Stijn Method Analysis', columnId: 'scouted', content: 'Break down the viral hooks' },
      ];
      setTasks(initialTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('ozzy_kanban_tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveTask(tasks.find((t) => t.id === active.id) || null);
  }

  function handleDragOver(event: any) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // Dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // Dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        tasks[activeIndex].columnId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  function handleDragEnd(event: any) {
    setActiveTask(null);
  }

  return (
    <div className="flex gap-4 h-[calc(100vh-250px)] overflow-x-auto pb-4 scrollbar-hide">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {COLUMNS.map((col) => (
          <KanbanColumn
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={tasks.filter((t) => t.columnId === col.id)}
          />
        ))}

        <DragOverlay>
          {activeTask ? (
            <KanbanCard task={activeTask} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
