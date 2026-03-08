import React from 'react';
import { Heart } from 'lucide-react';
import { Note } from '../types';

export function NoteEditor({ notes, onSelect }: { notes: Note[], onSelect: (n: Note) => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-graphite/10 pb-4">
        <h2 className="text-3xl font-serif font-light text-graphite flex items-center gap-3">
          Journal
        </h2>
      </div>
      
      <div className="columns-2 gap-6 space-y-6">
        {notes.map(note => (
          <div key={note.id} onClick={() => onSelect(note)} className="break-inside-avoid cursor-pointer group">
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
        ))}
      </div>
    </div>
  );
}
