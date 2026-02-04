'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Zap, 
  Trello, 
  BrainCircuit, 
  HelpCircle 
} from 'lucide-react';

const navItems = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Generator', icon: Zap, path: '/generator' },
  { name: 'Pipeline', icon: Trello, path: '/workflow' },
  { name: 'Notes', icon: BrainCircuit, path: '/notes' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 z-50 px-6 py-3 flex items-center justify-between pb-8">
      {navItems.map((item) => {
        const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
        return (
          <Link 
            key={item.path} 
            href={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-blue-400' : 'text-zinc-500'
            }`}
          >
            <item.icon size={20} className={isActive ? 'text-blue-400' : ''} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
