'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Zap, 
  Trello, 
  BrainCircuit, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Generator', icon: Zap, path: '/generator' },
  { name: 'Workflow', icon: Trello, path: '/workflow' },
  { name: 'Notes', icon: BrainCircuit, path: '/notes' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <motion.aside 
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      className="fixed left-0 top-0 h-screen bg-zinc-950/50 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col transition-all duration-300 ease-in-out"
    >
      <div className="p-6 flex items-center justify-between">
        {!collapsed && (
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-black italic tracking-tighter text-white"
          >
            OZZY<span className="text-blue-500">OS</span>
          </motion.h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <item.icon size={22} className={isActive ? 'text-blue-400' : 'group-hover:text-white transition-colors'} />
              {!collapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-medium"
                >
                  {item.name}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className={`flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shrink-0">
            <User size={20} />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Tony Simons</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Digital Twin Active</p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
