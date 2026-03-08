import React, { useState } from 'react';
import { MapPin, Sparkles, CheckSquare, ListTodo, Activity as ActivityIcon, Camera, StickyNote, PenTool, Star, Clock, Search, Filter, X, Heart, Map, Utensils, Coffee, ShoppingBag, ChevronRight, Globe2 } from 'lucide-react';
import { TravelData, City, Checklist, Note, Activity, Sight } from './types';
import { mockData } from './mockData';

const mockPlans = [
  {
    id: '1',
    title: 'Autumn in Kansai',
    subtitle: 'Kyoto & Osaka',
    date: 'Nov 12 - Nov 20, 2024',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    status: 'Upcoming'
  },
  {
    id: '2',
    title: 'Parisian Spring',
    subtitle: 'Paris, France',
    date: 'Apr 5 - Apr 15, 2025',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop',
    status: 'Planning'
  },
  {
    id: '3',
    title: 'Nordic Winter',
    subtitle: 'Tromsø & Oslo',
    date: 'Dec 20 - Jan 2, 2024',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=2070&auto=format&fit=crop',
    status: 'Completed'
  }
];

export default function App() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [data, setData] = useState<TravelData>(mockData);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedSight, setSelectedSight] = useState<Sight | null>(null);

  return (
    <div className="min-h-screen font-body pb-20 bg-paper text-graphite">
      <NavBar currentView={view} setView={setView} />
      
      {view === 'list' ? (
        <PlanList onSelectPlan={(id) => setView('detail')} />
      ) : (
        <>
          {/* Editorial Header */}
          <header className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-graphite/10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div className="max-w-3xl">
                <button onClick={() => setView('list')} className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-graphite/50 hover:text-graphite transition-colors mb-12">
                  <ChevronRight className="w-4 h-4 rotate-180" /> Back to Journeys
                </button>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-sunset">Vol. 01</span>
                  <div className="h-px w-12 bg-sunset"></div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-graphite/50">Travel Manifesto</span>
                </div>
                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-serif font-light tracking-tight text-graphite leading-[0.85] mb-6">
                  Autumn in <br/><span className="italic text-graphite/40">Kansai.</span>
                </h1>
              </div>
              <div className="max-w-sm pb-4">
                <p className="text-sm text-graphite/60 leading-relaxed font-medium">
                  A structured approach to travel planning. Curate destinations, organize tasks, and capture memories in one place.
                </p>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-32">
        
        {/* Section 1: City Core Positioning (Grid) */}
        <section>
          <div className="flex items-center justify-between mb-12 border-b border-graphite/10 pb-4">
            <h2 className="text-4xl font-serif font-light text-graphite flex items-center gap-3">
              Destinations
            </h2>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-graphite/20 text-graphite rounded-full text-xs uppercase tracking-widest font-medium hover:bg-graphite hover:text-paper transition-colors">
              <span>+ Add City</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {data.cities.map(city => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        </section>

        {/* Section 2: Checklists & Collections (Masonry) */}
        <section>
          <div className="flex items-center justify-between mb-12 border-b border-graphite/10 pb-4">
            <div>
              <h2 className="text-4xl font-serif font-light text-graphite flex items-center gap-3 mb-3">
                Collections & Tasks
              </h2>
              <p className="text-graphite/50 font-sans text-sm">Organize everything from packing lists to restaurant rankings.</p>
            </div>
            <button className="p-3 text-graphite hover:bg-graphite/5 rounded-full transition-colors border border-graphite/20"><Filter className="w-5 h-5" /></button>
          </div>
          
          <ChecklistMasonry checklists={data.checklists} notes={data.notes} onNoteSelect={setSelectedNote} />
        </section>

        {/* Section 3: Sights & Activities */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SightEditor sights={data.sights} onSelect={setSelectedSight} />
          </div>
          <div>
            <ActivityEditor activities={data.activities} onSelect={setSelectedActivity} />
          </div>
        </section>

        {/* Section 4: Narrative & Notes */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <BlogEditor content={data.blog} />
          </div>
          <div className="lg:col-span-4">
            <NoteEditor notes={data.notes} onSelect={setSelectedNote} />
          </div>
        </section>

      </div>
        </>
      )}

      {/* Modals */}
      {selectedNote && <NoteDrawer note={selectedNote} onClose={() => setSelectedNote(null)} />}
      {selectedActivity && <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />}
      {selectedSight && <SightModal sight={selectedSight} onClose={() => setSelectedSight(null)} />}
    </div>
  );
}

function CityCard({ city }: { city: City }) {
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

function getIcon(name?: string) {
  switch (name) {
    case 'Map': return Map;
    case 'Utensils': return Utensils;
    case 'Coffee': return Coffee;
    case 'ShoppingBag': return ShoppingBag;
    default: return Sparkles;
  }
}

function ChecklistMasonry({ checklists, notes, onNoteSelect }: { checklists: Checklist[], notes: Note[], onNoteSelect: (note: Note) => void }) {
  
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
          <div key={list.id} className="break-inside-avoid bg-transparent border border-graphite/10">
            {/* Distinct Header based on Category */}
            <div className={`p-5 border-b border-graphite/10 flex items-center justify-between`}>
              <div className={`flex items-center gap-2 ${catStyle.split(' ')[0]}`}>
                {CatIcon}
                <span className="text-xs font-bold uppercase tracking-[0.15em]">{list.category}</span>
              </div>
              <span className="text-xs font-medium text-graphite/40 uppercase tracking-wider">{list.items.length} items</span>
            </div>
            
            <div className="p-6">
              <h3 className="font-serif text-2xl text-graphite mb-6">{list.title}</h3>
              
              <div className="space-y-5">
                {list.items.map(item => {
                  const linkedNote = item.noteId ? notes.find(n => n.id === item.noteId) : null;
                  
                  // Image Type List
                  if (list.type === 'image' && item.image) {
                    return (
                      <div key={item.id} className={`flex gap-5 group transition-opacity ${item.completed ? 'opacity-40' : 'opacity-100'}`}>
                        <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.text} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 py-1 flex flex-col justify-center">
                          <div className="font-serif text-lg text-graphite mb-1">{item.text}</div>
                          <div className="text-xs text-graphite/50 font-sans leading-relaxed">{item.subtitle}</div>
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
                        <div className="flex-1 pt-1">
                          <div className="font-serif text-lg text-graphite">{item.text}</div>
                          <div className="text-xs text-graphite/50 mt-1 font-sans">{item.subtitle}</div>
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
                    <div key={item.id} className="flex items-start gap-4 group py-2">
                      <button className="mt-1 flex-shrink-0 text-graphite/20 hover:text-sunset transition-colors">
                        {item.completed ? <CheckSquare className="w-5 h-5 text-sunset" /> : <div className="w-5 h-5 border border-graphite/30" />}
                      </button>
                      <div className="flex-1">
                        <span className={`text-base font-sans ${item.completed ? 'text-graphite/40 line-through' : 'text-graphite'}`}>
                          {item.text}
                        </span>
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

function ActivityEditor({ activities, onSelect }: { activities: Activity[], onSelect: (a: Activity) => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-graphite/10 pb-4">
        <h2 className="text-4xl font-serif font-light text-graphite flex items-center gap-3">
          Activities
        </h2>
        <div className="flex gap-2">
          <button className="p-2 text-graphite hover:bg-graphite/5 rounded-full transition-colors"><Search className="w-5 h-5" /></button>
          <button className="p-2 text-graphite hover:bg-graphite/5 rounded-full transition-colors"><Filter className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {activities.map(act => (
          <div key={act.id} onClick={() => onSelect(act)} className="group cursor-pointer">
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
                <h3 className="font-serif text-2xl text-graphite line-clamp-1">{act.name}</h3>
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
        ))}
      </div>
    </div>
  );
}

function SightEditor({ sights, onSelect }: { sights: Sight[], onSelect: (s: Sight) => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-graphite/10 pb-4">
        <h2 className="text-4xl font-serif font-light text-graphite flex items-center gap-3">
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
                  <h3 className="text-4xl font-serif font-light mb-4">{sight.name}</h3>
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

function NoteEditor({ notes, onSelect }: { notes: Note[], onSelect: (n: Note) => void }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-graphite/10 pb-4">
        <h2 className="text-4xl font-serif font-light text-graphite flex items-center gap-3">
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
              <h3 className="font-serif text-xl text-graphite mb-3 leading-snug">{note.title}</h3>
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

function BlogEditor({ content }: { content: string }) {
  return (
    <div className="bg-transparent border border-graphite/10 p-8 sm:p-12 relative">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-graphite/30"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-graphite/30"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-graphite/30"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-graphite/30"></div>

      <div className="flex items-center justify-between mb-10 pb-6 border-b border-graphite/10">
        <h2 className="text-4xl font-serif font-light text-graphite flex items-center gap-3">
          Narrative
        </h2>
        <div className="flex gap-4 text-graphite/40">
          <button className="hover:text-graphite transition-colors"><span className="font-serif font-bold text-lg">B</span></button>
          <button className="hover:text-graphite transition-colors"><span className="font-serif italic text-lg">I</span></button>
          <button className="hover:text-graphite transition-colors"><span className="underline text-lg">U</span></button>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <textarea 
          className="w-full min-h-[400px] resize-none outline-none text-lg text-graphite/80 leading-loose font-serif bg-transparent placeholder:text-graphite/20"
          placeholder="Start writing your travel story here... Type @ to mention a sight or activity."
          defaultValue={content}
        />
      </div>
    </div>
  );
}

// --- Modals & Drawers ---

function NoteDrawer({ note, onClose }: { note: Note, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-graphite/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-paper h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col border-l border-graphite/10">
        <div className="flex items-center justify-between p-6 border-b border-graphite/10">
          <div className="flex items-center gap-3">
            <img src={note.author.avatar} alt={note.author.name} className="w-10 h-10 rounded-full grayscale" referrerPolicy="no-referrer" />
            <span className="font-sans text-xs uppercase tracking-widest font-medium">{note.author.name}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-graphite/5 rounded-full transition-colors"><X className="w-5 h-5 text-graphite/50" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-8">
          {note.image && <img src={note.image} alt={note.title} className="w-full mb-8" referrerPolicy="no-referrer" />}
          <h2 className="text-4xl font-serif font-light mb-6 leading-tight">{note.title}</h2>
          <p className="text-graphite/70 leading-loose font-serif text-lg whitespace-pre-wrap">{note.content}</p>
        </div>
      </div>
    </div>
  );
}

function ActivityModal({ activity, onClose }: { activity: Activity, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-paper shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-paper/50 hover:bg-paper text-graphite rounded-full backdrop-blur-md transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="h-72 sm:h-96 relative">
          <img src={activity.image} alt={activity.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="p-8 sm:p-12">
          <div className="flex flex-wrap gap-3 mb-6">
            {activity.highlights.map((hl, idx) => (
              <span key={idx} className="px-4 py-1.5 border border-sunset/30 text-sunset text-[10px] uppercase tracking-widest font-semibold">
                {hl}
              </span>
            ))}
          </div>
          <h2 className="text-5xl font-serif font-light mb-4">{activity.name}</h2>
          <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-graphite/50 mb-8 pb-8 border-b border-graphite/10">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-sunset fill-sunset" /> {activity.rating} ({activity.reviews})</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {activity.duration}</span>
            <span className="font-medium">{activity.priceLevel}</span>
          </div>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-graphite/40">About this activity</h3>
          <p className="text-graphite/70 leading-loose font-serif text-lg">{activity.details}</p>
          <div className="mt-10">
            <button className="w-full py-5 bg-graphite text-paper text-sm uppercase tracking-widest font-medium hover:bg-black transition-colors">
              Add to Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SightModal({ sight, onClose }: { sight: Sight, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-paper shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-paper/50 hover:bg-paper text-graphite rounded-full backdrop-blur-md transition-colors">
          <X className="w-5 h-5" />
        </button>
        <div className="w-full md:w-1/2 h-72 md:h-auto relative">
          <img src={sight.image} alt={sight.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-glacier text-xs uppercase tracking-[0.2em] font-semibold">
            <MapPin className="w-4 h-4" />
            <span>{sight.location}</span>
          </div>
          <h2 className="text-5xl font-serif font-light mb-4">{sight.name}</h2>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-graphite/50 mb-8">
            <Star className="w-4 h-4 text-sunset fill-sunset" />
            {sight.rating}
          </div>
          <div className="flex-1">
            <p className="text-graphite/80 font-serif text-xl leading-relaxed mb-6 italic">{sight.summary}</p>
            <p className="text-graphite/60 font-sans text-sm leading-loose">{sight.details}</p>
          </div>
          <div className="mt-10 pt-8 border-t border-graphite/10 flex gap-4">
            <button className="flex-1 py-4 bg-graphite text-paper text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors">
              Add to Itinerary
            </button>
            <button className="px-6 py-4 border border-graphite/20 hover:bg-graphite/5 transition-colors">
              <Heart className="w-5 h-5 text-graphite/50" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavBar({ currentView, setView }: { currentView: string, setView: (v: 'list' | 'detail') => void }) {
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

function PlanList({ onSelectPlan }: { onSelectPlan: (id: string) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-graphite/10 pb-8 gap-6">
        <div>
          <h1 className="text-6xl sm:text-8xl font-serif font-light tracking-tight text-graphite mb-4">
            Your <span className="italic text-graphite/40">Journeys.</span>
          </h1>
          <p className="text-graphite/60 font-sans">Curated itineraries and travel memories.</p>
        </div>
        <button className="px-6 py-3.5 bg-graphite text-paper text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors whitespace-nowrap">
          + New Journey
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {mockPlans.map(plan => (
          <div key={plan.id} onClick={() => onSelectPlan(plan.id)} className="group cursor-pointer flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden mb-6">
              <img src={plan.image} alt={plan.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-paper/90 backdrop-blur-sm text-graphite text-[10px] uppercase tracking-widest font-semibold">
                  {plan.status}
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="text-[10px] uppercase tracking-[0.2em] text-sunset mb-2 font-semibold">{plan.date}</div>
              <h3 className="text-3xl font-serif font-light text-graphite mb-2">{plan.title}</h3>
              <p className="text-graphite/50 font-sans text-sm">{plan.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
