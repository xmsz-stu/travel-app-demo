import React from 'react';
import { Heart, Edit2 } from 'lucide-react';
import { Note } from '../types';

export function NoteEditor({ notes, onSelect, onEdit, onAdd }: { notes: Note[], onSelect: (n: Note) => void, onEdit?: (n: Note) => void, onAdd?: () => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-graphite/10 pb-4">
        <h2 className="text-3xl font-serif font-light text-graphite flex items-center gap-3">
          Journal
        </h2>
        {onAdd && (
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-graphite/20 text-graphite rounded-full text-xs uppercase tracking-widest font-medium hover:bg-graphite hover:text-paper transition-colors"
          >
            <span>+ Add Note</span>
          </button>
        )}
      </div>
      
      <div className="columns-2 gap-6 space-y-6">
        {notes.map(note => (
          <div key={note.id} className="break-inside-avoid group relative">
            <div onClick={() => onSelect(note)} className="cursor-pointer">
              {note.image && (
                <div className="w-full overflow-hidden mb-4">
                  <img src={note.image} alt={note.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              )}
              <div>
                <h3 className="font-serif text-lg text-graphite mb-3 leading-snug">{note.title}</h3>
                <div className="flex items-center justify-between text-xs text-graphite/50 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-[80px]">{note.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5" />
                    <span>{note.likes}</span>
                  </div>
                </div>
              </div>
            </div>
            {onEdit && (
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(note); }}
                className="absolute top-2 right-2 p-2 bg-paper/60 hover:bg-paper/90 text-graphite rounded-full backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100 z-10"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
