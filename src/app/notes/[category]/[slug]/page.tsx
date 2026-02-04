import React from 'react';
import { getDoc } from '@/lib/brain';
import { DocViewer } from '@/components/notes/DocViewer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default async function DocPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const { category, slug } = await params;
  const doc = getDoc(category, slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="space-y-8">
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
        <Link href={`/notes/${category}`} className="hover:text-blue-400 transition-colors">
          {category}
        </Link>
        <ChevronRight size={10} />
        <span className="text-zinc-300 truncate max-w-[200px]">{doc.title}</span>
      </nav>

      <DocViewer doc={doc} />
    </div>
  );
}
