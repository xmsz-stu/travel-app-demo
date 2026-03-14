import React from 'react';
import { Search, Filter, Star, Clock, Edit2 } from 'lucide-react';
import { Activity } from '../types';

export function ActivityEditor({ activities, onSelect, onEdit, onAdd }: { activities: Activity[], onSelect: (a: Activity) => void, onEdit?: (a: Activity) => void, onAdd?: () => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-graphite/10 pb-4">
        <h2 className="text-3xl font-serif font-light text-graphite flex items-center gap-3">
          Activities
        </h2>
        <div className="flex gap-2">
          {onAdd && (
            <button 
              onClick={onAdd}
              className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-graphite/20 text-graphite rounded-full text-xs uppercase tracking-widest font-medium hover:bg-graphite hover:text-paper transition-colors mr-2"
            >
              <span>+ Add Activity</span>
            </button>
          )}
          <button className="p-2 text-graphite hover:bg-graphite/5 rounded-full transition-colors"><Search className="w-5 h-5" /></button>
          <button className="p-2 text-graphite hover:bg-graphite/5 rounded-full transition-colors"><Filter className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {activities.map(act => (
          <div key={act.id} className="group relative">
            <div onClick={() => onSelect(act)} className="cursor-pointer">
              <div className="relative h-64 overflow-hidden mb-4">
                <img src={act.image} alt={act.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
                {/* Highlights Capsule */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {act.highlights.slice(0, 2).map((hl, idx) => (
                    <span key={idx} className="px-3 py-1 bg-paper/90 backdrop-blur-sm text-graphite text-[10px] uppercase tracking-widest font-semibold">
                      {hl}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-xl text-graphite line-clamp-1">{act.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-medium text-graphite/60 mt-1.5">
                    <Star className="w-3 h-3 text-sunset fill-sunset" />
                    {act.rating}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-xs text-graphite/50 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {act.duration}</span>
                  <span>{act.priceLevel}</span>
                </div>

                <p className="text-sm text-graphite/60 line-clamp-2 font-sans leading-relaxed">{act.desc}</p>
              </div>
            </div>
            {onEdit && (
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(act); }}
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
