import React from 'react';
import { getDocsByCategory } from '@/lib/brain';
import Link from 'next/link';
import { 
  ChevronRight, 
  Home, 
  FileText,
  Calendar,
  ArrowRight
} from 'lucide-react';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const docs = getDocsByCategory(category);

  return (
    <div className="space-y-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
        <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1">
          <Home size={12} /> Dashboard
        </Link>
        <ChevronRight size={10} />
        <Link href="/notes" className="hover:text-blue-400 transition-colors">
          Notes
        </Link>
        <ChevronRight size={10} />
        <span className="text-zinc-300">{category}</span>
      </nav>

      <div>
        <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2 uppercase">
          {category}
        </h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">
          Total of {docs.length} documents found
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {docs.map((doc) => (
          <Link 
            key={doc.slug}
            href={`/notes/${category}/${doc.slug}`}
            className="group p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-zinc-500 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {doc.title}
                </h3>
                <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500 font-mono uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {doc.date || 'No Date'}
                  </span>
                  <span>•</span>
                  <span>{doc.slug}</span>
                </div>
              </div>
            </div>
            <ArrowRight size={20} className="text-zinc-700 group-hover:text-blue-500 transition-colors transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
