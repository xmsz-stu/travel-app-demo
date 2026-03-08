import React from 'react';
import * as Icons from 'lucide-react';
import { City } from '../types';

export function CityCard({ city, onEdit }: { city: City, onEdit?: () => void }) {
  return (
    <div className="bg-transparent flex flex-col group relative">
      {onEdit && (
        <button 
          onClick={onEdit}
          className="absolute top-4 right-4 p-2 bg-paper/90 hover:bg-paper text-graphite rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-20 shadow-sm"
          title="Edit Destination"
        >
          <Icons.Edit2 className="w-4 h-4" />
        </button>
      )}
      {/* Visual Top */}
      <div className="w-full relative h-[28rem] overflow-hidden">
        <img src={city.coverImage} alt={city.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
          <span className="text-xs font-medium uppercase tracking-[0.2em] mb-2 opacity-90">{city.region}</span>
          <h3 className="font-serif text-5xl font-light flex items-end gap-3">
            {city.name}
            {city.chineseName && <span className="text-2xl opacity-80 mb-1">{city.chineseName}</span>}
          </h3>
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
              const Icon = item.icon ? (Icons as any)[item.icon] || Icons.Sparkles : Icons.Sparkles;
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
          {city.positioning.general.slice(0, 4).map((tag, idx) => {
            const TagIcon = tag.icon ? (Icons as any)[tag.icon] : null;
            return (
              <span key={idx} className="px-3 py-1.5 border border-graphite/20 text-graphite/60 rounded-full text-[10px] uppercase tracking-wider font-medium flex items-center gap-1.5" title={tag.desc}>
                {TagIcon && <TagIcon className="w-3 h-3" />}
                {tag.keyword}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
