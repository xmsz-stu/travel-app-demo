import React from 'react';
import { Sight } from '../types';

export function SightEditor({ sights, onSelect }: { sights: Sight[], onSelect: (s: Sight) => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-graphite/10 pb-4">
        <h2 className="text-3xl font-serif font-light text-graphite flex items-center gap-3">
          Sights
        </h2>
      </div>

      <div className="space-y-8">
        {sights.map(sight => (
          <div key={sight.id} onClick={() => onSelect(sight)} className="relative overflow-hidden group cursor-pointer">
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
        ))}
      </div>
    </div>
  );
}
