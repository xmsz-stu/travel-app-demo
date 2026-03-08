import React, { useState } from 'react';
import { ChevronRight, Filter, Edit2 } from 'lucide-react';
import { TravelData, Note, Activity, Sight } from '../types';
import { CityCard } from '../components/CityCard';
import { ChecklistMasonry } from '../components/ChecklistMasonry';
import { ActivityEditor } from '../components/ActivityEditor';
import { SightEditor } from '../components/SightEditor';
import { NoteEditor } from '../components/NoteEditor';
import { BlogEditor } from '../components/BlogEditor';
import { NoteDrawer, ActivityModal, SightModal, JourneyEditModal, JourneyInfo, CityEditModal } from '../components/Modals';

export function PlanDetail({ data, onBack }: { data: TravelData, onBack: () => void }) {
  const [localData, setLocalData] = useState<TravelData>(data);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedSight, setSelectedSight] = useState<Sight | null>(null);
  const [isEditingJourney, setIsEditingJourney] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [journeyInfo, setJourneyInfo] = useState<JourneyInfo>({
    vol: '01',
    tag: 'Travel Manifesto',
    title1: 'Autumn in',
    title2: 'Kansai.',
    description: 'A structured approach to travel planning. Curate destinations, organize tasks, and capture memories in one place.',
    coverImage: ''
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
      {selectedNote && <NoteDrawer note={selectedNote} onClose={() => setSelectedNote(null)} />}
      {selectedActivity && <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />}
      {selectedSight && <SightModal sight={selectedSight} onClose={() => setSelectedSight(null)} />}
    </>
  );
}
