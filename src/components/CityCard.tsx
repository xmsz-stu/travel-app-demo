import React from 'react';
import { Map, Utensils, Coffee, ShoppingBag, Sparkles } from 'lucide-react';
import { City } from '../types';

function getIcon(name?: string) {
  switch (name) {
    case 'Map': return Map;
    case 'Utensils': return Utensils;
    case 'Coffee': return Coffee;
    case 'ShoppingBag': return ShoppingBag;
    default: return Sparkles;
  }
}

export function CityCard({ city }: { city: City }) {
  return (
    <div className="bg-transparent flex flex-col group">
      {/* Visual Top */}
      <div className="w-full relative h-[28rem] overflow-hidden">
        <img src={city.coverImage} alt={city.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
          <span className="text-xs font-medium uppercase tracking-[0.2em] mb-2 opacity-90">{city.region}</span>
          <h3 className="font-serif text-5xl font-light">{city.name}</h3>
        </div>
      </div>
      
      {/* Data Bottom */}
      <div className="pt-8 flex flex-col flex-1">
        {/* Unique */}
        <div className="mb-8 pb-8 border-b border-graphite/10">
          <div className="flex items-center gap-2 mb-5 text-sunset text-xs uppercase tracking-[0.15em] font-semibold">
            Unique Identifier
          </div>
          <div className="space-y-5">
            {city.positioning.unique.map((u, idx) => (
              <div key={idx}>
                <h4 className="text-xl font-serif font-medium text-graphite mb-2">{u.keyword}</h4>
                <p className="text-graphite/60 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Advantage (Prominent) */}
        <div className="mb-8 pb-8 border-b border-graphite/10">
          <div className="text-xs font-semibold text-graphite/40 uppercase tracking-[0.15em] mb-5">Core Advantage</div>
          <div className="space-y-5">
            {city.positioning.core.map((item, idx) => (
              <div key={idx} className="flex gap-5 items-start">
                {item.image && (
                  <img src={item.image} alt={item.keyword} className="w-20 h-24 object-cover flex-shrink-0" referrerPolicy="no-referrer" />
                )}
                <div className="pt-1">
                  <div className="font-serif text-lg font-medium text-graphite mb-2">{item.keyword}</div>
                  <div className="text-sm text-graphite/60 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Basic Feature (Compact Grid) */}
        <div className="mb-8 flex-1">
          <div className="text-xs font-semibold text-graphite/40 uppercase tracking-[0.15em] mb-5">Basic Feature</div>
          <div className="grid grid-cols-2 gap-6">
            {city.positioning.basic.map((item, idx) => {
              const Icon = getIcon(item.icon);
              return (
                <div key={idx} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-glacier mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-sans font-medium text-sm text-graphite mb-1">{item.keyword}</div>
                    <div className="text-xs text-graphite/50 leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* General Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-graphite/10">
          {city.positioning.general.slice(0, 4).map((tag, idx) => (
            <span key={idx} className="px-3 py-1.5 border border-graphite/20 text-graphite/60 rounded-full text-[10px] uppercase tracking-wider font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
