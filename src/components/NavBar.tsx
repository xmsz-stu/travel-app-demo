import React from 'react';
import { Globe2 } from 'lucide-react';

export function NavBar({ currentView, setView }: { currentView: string, setView: (v: 'list' | 'detail') => void }) {
  return (
    <nav className="sticky top-0 z-40 w-full bg-paper/90 backdrop-blur-md border-b border-graphite/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('list')}>
          <Globe2 className="w-5 h-5 text-sunset" />
          <span className="font-serif text-xl font-medium tracking-wide text-graphite">Wanderlust</span>
        </div>
        <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-graphite/60">
          <button onClick={() => setView('list')} className={`hover:text-graphite transition-colors ${currentView === 'list' ? 'text-graphite' : ''}`}>Journeys</button>
          <button className="hover:text-graphite transition-colors hidden sm:block">Discover</button>
          <button className="hover:text-graphite transition-colors hidden sm:block">Profile</button>
        </div>
      </div>
    </nav>
  );
}
