import React from 'react';
import { Utensils, ShoppingBag, CheckSquare, ListTodo, ChevronRight, Edit2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Checklist, Note } from '../types';

export function ChecklistMasonry({ 
  checklists, 
  notes, 
  onNoteSelect,
  onEdit
}: { 
  checklists: Checklist[], 
  notes: Note[], 
  onNoteSelect: (note: Note) => void,
  onEdit?: (checklist: Checklist) => void
}) {
  
  // Helper to get distinct styling based on category
  const getCategoryStyle = (category: string) => {
    switch(category) {
      case 'food': return 'text-sunset border-sunset/20';
      case 'souvenir': return 'text-glacier border-glacier/20';
      case 'packing': return 'text-graphite border-graphite/20';
      default: return 'text-graphite border-graphite/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'souvenir': return <ShoppingBag className="w-4 h-4" />;
      case 'packing': return <CheckSquare className="w-4 h-4" />;
      default: return <ListTodo className="w-4 h-4" />;
    }
  };

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {checklists.map(list => {
        const catStyle = getCategoryStyle(list.category);
        const CatIcon = getCategoryIcon(list.category);

        return (
          <div key={list.id} className="break-inside-avoid bg-transparent border border-graphite/10 relative group">
            {onEdit && (
              <button 
                onClick={() => onEdit(list)}
                className="absolute top-4 right-4 p-2 bg-paper border border-graphite/20 text-graphite rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-graphite/5 z-10"
                title="Edit Checklist"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            )}
            {/* Distinct Header based on Category */}
            <div className={`p-5 border-b border-graphite/10 flex items-center justify-between`}>
              <div className={`flex items-center gap-2 ${catStyle.split(' ')[0]}`}>
                {CatIcon}
                <span className="text-xs font-bold uppercase tracking-[0.15em]">{list.category}</span>
              </div>
              <span className="text-xs font-medium text-graphite/40 uppercase tracking-wider pr-8">{list.items.length} items</span>
            </div>
            
            <div className="p-6">
              <h3 className="font-serif text-2xl text-graphite mb-6">{list.title}</h3>
              
              <div className="space-y-5">
                {list.items.map(item => {
                  const linkedNote = item.noteId ? notes.find(n => n.id === item.noteId) : null;
                  
                  const isImageUrl = item.image?.startsWith('http') || item.image?.startsWith('data:');
                  const IconCmp = !isImageUrl && item.image ? (Icons as any)[item.image] : null;

                  // Image Type List
                  if (list.type === 'image') {
                    return (
                      <div key={item.id} className={`flex gap-5 group transition-opacity ${item.completed ? 'opacity-40' : 'opacity-100'}`}>
                        <div className="w-24 h-24 overflow-hidden flex-shrink-0 bg-graphite/5 flex items-center justify-center">
                          {isImageUrl ? (
                            <img src={item.image} alt={item.text} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                          ) : IconCmp ? (
                            <IconCmp className="w-8 h-8 text-graphite/40" />
                          ) : null}
                        </div>
                        <div className="flex-1 py-1 flex flex-col justify-center">
                          <div className="font-serif text-lg text-graphite mb-1">{item.text}</div>
                          {item.subtitle && <div className="text-xs text-graphite/50 font-sans leading-relaxed">{item.subtitle}</div>}
                        </div>
                        <button className="self-center p-2 text-graphite/20 hover:text-sunset transition-colors">
                          {item.completed ? <CheckSquare className="w-5 h-5 text-sunset" /> : <div className="w-5 h-5 border border-graphite/30" />}
                        </button>
                      </div>
                    );
                  }

                  // Ranking Type List
                  if (list.type === 'ranking') {
                    const rank = list.items.indexOf(item) + 1;
                    
                    return (
                      <div key={item.id} className={`flex items-start gap-4 py-3 border-b border-graphite/5 last:border-0 transition-all ${item.completed ? 'opacity-50' : ''}`}>
                        <div className="font-serif text-2xl italic text-graphite/30 w-6 flex-shrink-0 text-right">
                          {rank}
                        </div>
                        
                        {(isImageUrl || IconCmp) && (
                          <div className="w-16 h-16 overflow-hidden flex-shrink-0 bg-graphite/5 flex items-center justify-center mt-1">
                            {isImageUrl ? (
                              <img src={item.image} alt={item.text} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : IconCmp ? (
                              <IconCmp className="w-6 h-6 text-graphite/40" />
                            ) : null}
                          </div>
                        )}

                        <div className="flex-1 pt-1">
                          <div className="font-serif text-lg text-graphite">{item.text}</div>
                          {item.subtitle && <div className="text-xs text-graphite/50 mt-1 font-sans">{item.subtitle}</div>}
                          {linkedNote && (
                            <button onClick={() => onNoteSelect(linkedNote)} className="mt-3 text-xs font-medium uppercase tracking-wider text-sunset hover:text-graphite transition-colors flex items-center gap-1.5">
                              Read Review <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <button className="pt-1 text-graphite/20 hover:text-sunset">
                          {item.completed ? <CheckSquare className="w-5 h-5 text-sunset" /> : <div className="w-5 h-5 border border-graphite/30" />}
                        </button>
                      </div>
                    );
                  }

                  // Normal list
                  return (
                    <div key={item.id} className={`flex items-start gap-4 group py-3 ${item.completed ? 'opacity-50' : ''}`}>
                      <button className="mt-1 flex-shrink-0 text-graphite/20 hover:text-sunset transition-colors">
                        {item.completed ? <CheckSquare className="w-5 h-5 text-sunset" /> : <div className="w-5 h-5 border border-graphite/30" />}
                      </button>
                      
                      {(isImageUrl || IconCmp) && (
                        <div className="w-12 h-12 overflow-hidden flex-shrink-0 bg-graphite/5 flex items-center justify-center rounded">
                          {isImageUrl ? (
                            <img src={item.image} alt={item.text} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : IconCmp ? (
                            <IconCmp className="w-5 h-5 text-graphite/40" />
                          ) : null}
                        </div>
                      )}

                      <div className="flex-1">
                        <span className={`text-base font-sans ${item.completed ? 'text-graphite/40 line-through' : 'text-graphite'}`}>
                          {item.text}
                        </span>
                        {item.subtitle && <div className="text-xs text-graphite/50 mt-1 font-sans">{item.subtitle}</div>}
                        {linkedNote && (
                          <button onClick={() => onNoteSelect(linkedNote)} className="mt-2 text-xs font-medium uppercase tracking-wider text-glacier hover:text-graphite transition-colors flex items-center gap-1.5">
                            Read Note <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
