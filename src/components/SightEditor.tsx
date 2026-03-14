import React from 'react';
import { Sight } from '../types';
import { Edit2 } from 'lucide-react';

export function SightEditor({ sights, onSelect, onEdit, onAdd }: { sights: Sight[], onSelect: (s: Sight) => void, onEdit?: (s: Sight) => void, onAdd?: () => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-graphite/10 pb-4">
        <h2 className="text-3xl font-serif font-light text-graphite flex items-center gap-3">
          Sights
        </h2>
        {onAdd && (
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-graphite/20 text-graphite rounded-full text-xs uppercase tracking-widest font-medium hover:bg-graphite hover:text-paper transition-colors"
          >
            <span>+ Add Sight</span>
          </button>
        )}
      </div>

      <div className="space-y-8">
        {sights.map(sight => (
          <div key={sight.id} className="relative overflow-hidden group">
            <div onClick={() => onSelect(sight)} className="cursor-pointer">
              <div className="aspect-[4/3] sm:aspect-[21/9] lg:aspect-[4/3] w-full">
                <img src={sight.image} alt={sight.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex justify-between items-end">
                  <div className="text-white max-w-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-white/70">{sight.location}</span>
                    </div>
                    <h3 className="text-3xl font-serif font-light mb-4">{sight.name}</h3>
                    <p className="text-white/70 text-sm font-sans leading-relaxed line-clamp-2">{sight.summary}</p>
                  </div>
                </div>
              </div>
            </div>
            {onEdit && (
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(sight); }}
                className="absolute top-4 right-4 p-2 bg-paper/20 hover:bg-paper/40 text-white rounded-full backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100 z-10"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
