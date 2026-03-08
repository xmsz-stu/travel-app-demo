import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Heart, Upload } from 'lucide-react';
import { Note, Activity, Sight } from '../types';

export function NoteDrawer({ note, onClose }: { note: Note, onClose: () => void }) {
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
          <h2 className="text-3xl font-serif font-light mb-6 leading-tight">{note.title}</h2>
          <p className="text-graphite/70 leading-loose font-serif text-base whitespace-pre-wrap">{note.content}</p>
        </div>
      </div>
    </div>
  );
}

export function ActivityModal({ activity, onClose }: { activity: Activity, onClose: () => void }) {
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
          <h2 className="text-4xl font-serif font-light mb-4">{activity.name}</h2>
          <div className="flex items-center gap-6 text-xs uppercase tracking-widest text-graphite/50 mb-8 pb-8 border-b border-graphite/10">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-sunset fill-sunset" /> {activity.rating} ({activity.reviews})</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {activity.duration}</span>
            <span className="font-medium">{activity.priceLevel}</span>
          </div>
          <h3 className="font-sans text-xs uppercase tracking-[0.2em] font-semibold mb-4 text-graphite/40">About this activity</h3>
          <p className="text-graphite/70 leading-loose font-serif text-base">{activity.details}</p>
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

export function SightModal({ sight, onClose }: { sight: Sight, onClose: () => void }) {
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
          <h2 className="text-4xl font-serif font-light mb-4">{sight.name}</h2>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-graphite/50 mb-8">
            <Star className="w-4 h-4 text-sunset fill-sunset" />
            {sight.rating}
          </div>
          <div className="flex-1">
            <p className="text-graphite/80 font-serif text-lg leading-relaxed mb-6 italic">{sight.summary}</p>
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

export interface JourneyInfo {
  vol: string;
  tag: string;
  title1: string;
  title2: string;
  description: string;
  coverImage: string;
}

export function JourneyEditModal({ 
  info, 
  onClose, 
  onSave 
}: { 
  info: JourneyInfo; 
  onClose: () => void; 
  onSave: (info: JourneyInfo) => void;
}) {
  const [formData, setFormData] = useState<JourneyInfo>(info);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-paper shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-graphite/10 shrink-0">
          <h3 className="font-serif text-2xl text-graphite">Edit Journey</h3>
          <button onClick={onClose} className="p-2 hover:bg-graphite/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-graphite/50" />
          </button>
        </div>
        <div className="p-8 space-y-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Order (Vol)</label>
              <input 
                type="text" 
                value={formData.vol}
                onChange={e => setFormData({...formData, vol: e.target.value})}
                className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Tag Name</label>
              <input 
                type="text" 
                value={formData.tag}
                onChange={e => setFormData({...formData, tag: e.target.value})}
                className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">City Info (Title Line 1)</label>
            <input 
              type="text" 
              value={formData.title1}
              onChange={e => setFormData({...formData, title1: e.target.value})}
              className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-serif text-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">City Info (Title Line 2 - Italic)</label>
            <input 
              type="text" 
              value={formData.title2}
              onChange={e => setFormData({...formData, title2: e.target.value})}
              className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-serif italic text-xl"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Tag Description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans resize-none h-24"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Cover Image URL</label>
            <div className="flex gap-4 items-center">
              <input 
                type="text" 
                value={formData.coverImage}
                onChange={e => setFormData({...formData, coverImage: e.target.value})}
                className="flex-1 bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans"
                placeholder="https://..."
              />
              <button className="p-2 border border-graphite/20 rounded-full hover:bg-graphite/5 transition-colors">
                <Upload className="w-4 h-4 text-graphite/50" />
              </button>
            </div>
            {formData.coverImage && (
              <div className="mt-4 h-48 w-full rounded-lg overflow-hidden relative">
                <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
          </div>
        </div>
        <div className="p-6 border-t border-graphite/10 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="px-6 py-2 text-xs font-sans tracking-widest uppercase text-graphite/60 hover:text-graphite transition-colors">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-6 py-2 bg-graphite text-paper text-xs font-sans tracking-widest uppercase hover:bg-black transition-colors">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
