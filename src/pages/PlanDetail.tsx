import React, { useState } from 'react';
import { ChevronRight, Filter, Edit2 } from 'lucide-react';
import { TravelData, Note, Activity, Sight, City } from '../types';
import { CityCard } from '../components/CityCard';
import { ChecklistMasonry } from '../components/ChecklistMasonry';
import { ActivityEditor } from '../components/ActivityEditor';
import { SightEditor } from '../components/SightEditor';
import { NoteEditor } from '../components/NoteEditor';
import { BlogEditor } from '../components/BlogEditor';
import { NoteDrawer, ActivityModal, SightModal, JourneyEditModal, JourneyInfo, CityEditModal, ChecklistEditModal, SightEditModal, ActivityEditModal, NoteEditModal } from '../components/Modals';
import { Checklist } from '../types';

export function PlanDetail({ data, onBack }: { data: TravelData, onBack: () => void }) {
  const [localData, setLocalData] = useState<TravelData>(data);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedSight, setSelectedSight] = useState<Sight | null>(null);
  const [isEditingJourney, setIsEditingJourney] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [editingChecklist, setEditingChecklist] = useState<Checklist | null>(null);
  const [editingSight, setEditingSight] = useState<Sight | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [journeyInfo, setJourneyInfo] = useState<JourneyInfo>({
    vol: '01',
    tag: 'Travel Manifesto',
    title1: 'Autumn in',
    title2: 'Kansai.',
    description: 'A structured approach to travel planning. Curate destinations, organize tasks, and capture memories in one place.',
    coverImage: '',
    route: ['Osaka', 'Kyoto', 'Nara', 'Osaka'],
    keywords: ['Culture', 'Food', 'Photography', 'Temples'],
    weather: '15°C - 22°C, Mostly Sunny',
    date: 'Oct 12 - Oct 18',
    duration: '7 Days',
    pace: 'Moderate'
  });

  return (
    <>
      {/* Editorial Header */}
      <header className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-graphite/10 relative group">
        <button 
          onClick={() => setIsEditingJourney(true)}
          className="absolute top-16 right-8 p-3 bg-paper border border-graphite/20 text-graphite rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-graphite/5 z-10"
          title="Edit Journey Info"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-3xl">
            <button onClick={onBack} className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-graphite/50 hover:text-graphite transition-colors mb-12">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Journeys
            </button>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-sunset">Vol. {journeyInfo.vol}</span>
              <div className="h-px w-12 bg-sunset"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-graphite/50">{journeyInfo.tag}</span>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-light tracking-tight text-graphite leading-[0.85] mb-6">
              {journeyInfo.title1} <br/><span className="italic text-graphite/40">{journeyInfo.title2}</span>
            </h1>
          </div>
          <div className="max-w-sm pb-4">
            <p className="text-sm text-graphite/60 leading-relaxed font-medium">
              {journeyInfo.description}
            </p>
          </div>
        </div>

        {/* Trip Overview Card */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-graphite/10 bg-paper">
          {/* Map Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'grayscale(100%) contrast(120%)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper/90 via-paper/70 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16">
            {/* Route */}
            {journeyInfo.route && journeyInfo.route.length > 0 && (
              <div className="flex-1">
                <h3 className="text-xs font-sans tracking-widest uppercase text-graphite/50 mb-4">Route Overview</h3>
                <div className="flex items-center flex-wrap gap-2">
                  {journeyInfo.route.map((stop, i) => (
                    <React.Fragment key={i}>
                      <span className="text-sm font-medium text-graphite">{stop}</span>
                      {i < (journeyInfo.route?.length || 0) - 1 && (
                        <span className="text-graphite/30">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                {/* Keywords */}
                {journeyInfo.keywords && journeyInfo.keywords.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {journeyInfo.keywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1 bg-graphite/5 text-graphite/60 rounded-full text-xs font-medium tracking-wide">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Key Info */}
            <div className="flex gap-8 md:gap-12 flex-wrap">
              {journeyInfo.date && (
                <div>
                  <h3 className="text-xs font-sans tracking-widest uppercase text-graphite/50 mb-2">Dates</h3>
                  <p className="text-sm font-medium text-graphite">{journeyInfo.date}</p>
                </div>
              )}
              {journeyInfo.duration && (
                <div>
                  <h3 className="text-xs font-sans tracking-widest uppercase text-graphite/50 mb-2">Duration</h3>
                  <p className="text-sm font-medium text-graphite">{journeyInfo.duration}</p>
                </div>
              )}
              {journeyInfo.pace && (
                <div>
                  <h3 className="text-xs font-sans tracking-widest uppercase text-graphite/50 mb-2">Pace</h3>
                  <p className="text-sm font-medium text-graphite">{journeyInfo.pace}</p>
                </div>
              )}
              {journeyInfo.weather && (
                <div>
                  <h3 className="text-xs font-sans tracking-widest uppercase text-graphite/50 mb-2">Weather</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-graphite">{journeyInfo.weather}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-32">
        
        {/* Section 1: City Core Positioning (Grid) */}
        <section>
          <div className="flex items-center justify-between mb-12 border-b border-graphite/10 pb-4">
            <h2 className="text-3xl font-serif font-light text-graphite flex items-center gap-3">
              Destinations
            </h2>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-graphite/20 text-graphite rounded-full text-xs uppercase tracking-widest font-medium hover:bg-graphite hover:text-paper transition-colors">
              <span>+ Add City</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            {[...localData.cities].sort((a, b) => (a.order || 0) - (b.order || 0)).map(city => (
              <CityCard key={city.id} city={city} onEdit={() => setEditingCity(city)} />
            ))}
          </div>
        </section>

        {/* Section 2: Checklists & Collections (Masonry) */}
        <section>
          <div className="flex items-center justify-between mb-12 border-b border-graphite/10 pb-4">
            <div>
              <h2 className="text-3xl font-serif font-light text-graphite flex items-center gap-3 mb-3">
                Collections & Tasks
              </h2>
              <p className="text-graphite/50 font-sans text-sm">Organize everything from packing lists to restaurant rankings.</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setEditingChecklist({
                  id: Date.now(),
                  cityId: localData.cities[0]?.id || '',
                  title: 'New Collection',
                  type: 'normal',
                  category: 'general',
                  items: []
                })}
                className="flex items-center gap-2 px-5 py-2.5 bg-transparent border border-graphite/20 text-graphite rounded-full text-xs uppercase tracking-widest font-medium hover:bg-graphite hover:text-paper transition-colors"
              >
                <span>+ Add Collection</span>
              </button>
              <button className="p-3 text-graphite hover:bg-graphite/5 rounded-full transition-colors border border-graphite/20"><Filter className="w-5 h-5" /></button>
            </div>
          </div>
          
          <ChecklistMasonry 
            checklists={localData.checklists} 
            notes={localData.notes} 
            onNoteSelect={setSelectedNote}
            onEdit={(checklist) => setEditingChecklist(checklist)}
          />
        </section>

        {/* Section 3: Sights & Activities */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SightEditor 
              sights={localData.sights} 
              onSelect={setSelectedSight} 
              onEdit={setEditingSight}
              onAdd={() => setEditingSight({
                id: Date.now(),
                name: 'New Sight',
                image: '',
                location: '',
                rating: 0,
                summary: '',
                details: ''
              })}
            />
          </div>
          <div>
            <ActivityEditor 
              activities={localData.activities} 
              onSelect={setSelectedActivity} 
              onEdit={setEditingActivity}
              onAdd={() => setEditingActivity({
                id: Date.now(),
                name: 'New Activity',
                image: '',
                duration: '',
                rating: 0,
                reviews: 0,
                priceLevel: '',
                highlights: [],
                desc: '',
                details: ''
              })}
            />
          </div>
        </section>

        {/* Section 4: Narrative & Notes */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <BlogEditor content={localData.blog} onChange={(content) => setLocalData(prev => ({ ...prev, blog: content }))} />
          </div>
          <div className="lg:col-span-4">
            <NoteEditor 
              notes={localData.notes} 
              onSelect={setSelectedNote} 
              onEdit={setEditingNote}
              onAdd={() => setEditingNote({
                id: Date.now(),
                title: 'New Note',
                content: '',
                date: new Date().toISOString().split('T')[0],
                image: ''
              })}
            />
          </div>
        </section>

      </div>

      {/* Modals */}
      {isEditingJourney && (
        <JourneyEditModal 
          info={journeyInfo} 
          onClose={() => setIsEditingJourney(false)} 
          onSave={(newInfo) => {
            setJourneyInfo(newInfo);
            setIsEditingJourney(false);
          }} 
        />
      )}
      {editingCity && (
        <CityEditModal
          city={editingCity}
          onClose={() => setEditingCity(null)}
          onSave={(updatedCity) => {
            setLocalData(prev => ({
              ...prev,
              cities: prev.cities.map(c => c.id === updatedCity.id ? updatedCity : c)
            }));
            setEditingCity(null);
          }}
        />
      )}
      {editingChecklist && (
        <ChecklistEditModal
          checklist={editingChecklist}
          onClose={() => setEditingChecklist(null)}
          onSave={(updatedChecklist) => {
            setLocalData(prev => {
              if ((updatedChecklist as any)._delete) {
                return {
                  ...prev,
                  checklists: prev.checklists.filter(c => c.id !== updatedChecklist.id)
                };
              }

              const exists = prev.checklists.some(c => c.id === updatedChecklist.id);
              if (exists) {
                return {
                  ...prev,
                  checklists: prev.checklists.map(c => c.id === updatedChecklist.id ? updatedChecklist : c)
                };
              } else {
                return {
                  ...prev,
                  checklists: [...prev.checklists, updatedChecklist]
                };
              }
            });
            setEditingChecklist(null);
          }}
        />
      )}
      {editingSight && (
        <SightEditModal
          sight={editingSight}
          onClose={() => setEditingSight(null)}
          onSave={(updatedSight) => {
            setLocalData(prev => {
              if ((updatedSight as any)._delete) {
                return { ...prev, sights: prev.sights.filter(s => s.id !== updatedSight.id) };
              }
              const exists = prev.sights.some(s => s.id === updatedSight.id);
              return {
                ...prev,
                sights: exists ? prev.sights.map(s => s.id === updatedSight.id ? updatedSight : s) : [...prev.sights, updatedSight]
              };
            });
            setEditingSight(null);
          }}
        />
      )}
      {editingActivity && (
        <ActivityEditModal
          activity={editingActivity}
          onClose={() => setEditingActivity(null)}
          onSave={(updatedActivity) => {
            setLocalData(prev => {
              if ((updatedActivity as any)._delete) {
                return { ...prev, activities: prev.activities.filter(a => a.id !== updatedActivity.id) };
              }
              const exists = prev.activities.some(a => a.id === updatedActivity.id);
              return {
                ...prev,
                activities: exists ? prev.activities.map(a => a.id === updatedActivity.id ? updatedActivity : a) : [...prev.activities, updatedActivity]
              };
            });
            setEditingActivity(null);
          }}
        />
      )}
      {editingNote && (
        <NoteEditModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={(updatedNote) => {
            setLocalData(prev => {
              if ((updatedNote as any)._delete) {
                return { ...prev, notes: prev.notes.filter(n => n.id !== updatedNote.id) };
              }
              const exists = prev.notes.some(n => n.id === updatedNote.id);
              return {
                ...prev,
                notes: exists ? prev.notes.map(n => n.id === updatedNote.id ? updatedNote : n) : [...prev.notes, updatedNote]
              };
            });
            setEditingNote(null);
          }}
        />
      )}
      {selectedNote && <NoteDrawer note={selectedNote} onClose={() => setSelectedNote(null)} />}
      {selectedActivity && <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />}
      {selectedSight && <SightModal sight={selectedSight} onClose={() => setSelectedSight(null)} />}
    </>
  );
}
