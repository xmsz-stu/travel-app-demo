import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Heart, Upload } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Note, Activity, Sight, City, Checklist } from '../types';

function ImageEditModal({ initialUrl, onClose, onSave }: { initialUrl: string, onClose: () => void, onSave: (url: string) => void }) {
  const [url, setUrl] = useState(initialUrl);
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-paper p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <h3 className="font-serif text-xl mb-4">Edit Image URL</h3>
        <input value={url} onChange={e => setUrl(e.target.value)} className="w-full border-b border-graphite/20 py-2 mb-6 bg-transparent focus:outline-none focus:border-sunset font-sans text-sm" placeholder="https://..." />
        {url && <img src={url} className="w-full h-40 object-cover mb-6 rounded border border-graphite/10" referrerPolicy="no-referrer" />}
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="text-xs uppercase tracking-widest text-graphite/60 hover:text-graphite">Cancel</button>
          <button onClick={() => onSave(url)} className="text-xs uppercase tracking-widest bg-graphite text-paper px-4 py-2 hover:bg-black">Save</button>
        </div>
      </div>
    </div>
  );
}

const COMMON_ICONS = ['Map', 'Utensils', 'Coffee', 'ShoppingBag', 'Sparkles', 'Camera', 'Heart', 'Star', 'Music', 'Sun', 'Moon', 'Cloud', 'Umbrella', 'TreePine', 'Mountain', 'Waves', 'Train', 'Plane', 'Bus', 'Car', 'Bike', 'Ticket', 'Gift', 'Info', 'Landmark', 'Palmtree', 'Tent', 'Compass'];

function IconEditModal({ initialIcon, onClose, onSave }: { initialIcon: string, onClose: () => void, onSave: (icon: string) => void }) {
  const [icon, setIcon] = useState(initialIcon);
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-paper p-6 shadow-2xl flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
        <h3 className="font-serif text-xl mb-4 shrink-0">Select Icon</h3>
        <input value={icon} onChange={e => setIcon(e.target.value)} className="w-full border-b border-graphite/20 py-2 mb-4 bg-transparent focus:outline-none focus:border-sunset font-sans text-sm shrink-0" placeholder="Icon Name (e.g. Map)" />
        <div className="flex-1 overflow-y-auto grid grid-cols-4 sm:grid-cols-5 gap-2 mb-6 p-1">
          {COMMON_ICONS.map(name => {
            const IconCmp = (Icons as any)[name];
            if (!IconCmp) return null;
            return (
              <button key={name} onClick={() => setIcon(name)} className={`p-2 flex flex-col items-center gap-2 rounded hover:bg-graphite/5 border ${icon === name ? 'border-sunset bg-sunset/5 text-sunset' : 'border-transparent text-graphite/70'}`}>
                <IconCmp className="w-6 h-6" />
                <span className="text-[9px] truncate w-full text-center">{name}</span>
              </button>
            )
          })}
        </div>
        <div className="flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="text-xs uppercase tracking-widest text-graphite/60 hover:text-graphite">Cancel</button>
          <button onClick={() => onSave(icon)} className="text-xs uppercase tracking-widest bg-graphite text-paper px-4 py-2 hover:bg-black">Save</button>
        </div>
      </div>
    </div>
  );
}

export function ChecklistEditModal({
  checklist,
  onClose,
  onSave
}: {
  checklist: Checklist;
  onClose: () => void;
  onSave: (checklist: Checklist) => void;
}) {
  const [formData, setFormData] = useState<Checklist>(checklist);
  const [editingImage, setEditingImage] = useState<{ idx: number, current: string } | null>(null);
  const [editingIcon, setEditingIcon] = useState<{ idx: number, current: string } | null>(null);

  const updateItem = (idx: number, field: string, value: any) => {
    const newItems = [...formData.items];
    newItems[idx] = { ...newItems[idx], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      text: '',
      completed: false,
      subtitle: '',
      image: ''
    };
    setFormData({ ...formData, items: [...formData.items, newItem] });
  };

  const removeItem = (idx: number) => {
    const newItems = [...formData.items];
    newItems.splice(idx, 1);
    setFormData({ ...formData, items: newItems });
  };

  const handleSaveImage = (url: string) => {
    if (editingImage) {
      updateItem(editingImage.idx, 'image', url);
      setEditingImage(null);
    }
  };

  const handleSaveIcon = (icon: string) => {
    if (editingIcon) {
      updateItem(editingIcon.idx, 'image', icon);
      setEditingIcon(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-paper shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-graphite/10 shrink-0">
          <h3 className="font-serif text-2xl text-graphite">Edit Checklist</h3>
          <button onClick={onClose} className="p-2 hover:bg-graphite/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-graphite/50" />
          </button>
        </div>
        <div className="p-8 space-y-10 overflow-y-auto flex-1">
          {/* Basic Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-sans tracking-widest uppercase text-graphite/40 font-semibold border-b border-graphite/10 pb-2">Basic Info</h4>
            
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Title</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-serif text-xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Category</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'food', icon: Icons.Utensils, label: 'Food' },
                    { id: 'restaurant', icon: Icons.Coffee, label: 'Restaurant' },
                    { id: 'souvenir', icon: Icons.Gift, label: 'Souvenir' },
                    { id: 'packing', icon: Icons.ShoppingBag, label: 'Packing' },
                    { id: 'general', icon: Icons.Star, label: 'General' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setFormData({...formData, category: cat.id as any})}
                      className={`flex items-center gap-2 px-3 py-2 rounded border transition-colors ${formData.category === cat.id ? 'border-sunset bg-sunset/5 text-sunset' : 'border-graphite/20 text-graphite/60 hover:border-graphite/40 hover:bg-graphite/5'}`}
                    >
                      <cat.icon className="w-4 h-4" />
                      <span className="text-xs font-sans uppercase tracking-widest">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Type</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'normal', icon: Icons.List, label: 'Normal' },
                    { id: 'image', icon: Icons.Image, label: 'Image' },
                    { id: 'ranking', icon: Icons.Trophy, label: 'Ranking' },
                  ].map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({...formData, type: type.id as any})}
                      className={`flex items-center gap-2 px-3 py-2 rounded border transition-colors ${formData.type === type.id ? 'border-sunset bg-sunset/5 text-sunset' : 'border-graphite/20 text-graphite/60 hover:border-graphite/40 hover:bg-graphite/5'}`}
                    >
                      <type.icon className="w-4 h-4" />
                      <span className="text-xs font-sans uppercase tracking-widest">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-graphite/10 pb-2">
              <h4 className="text-sm font-sans tracking-widest uppercase text-graphite/40 font-semibold">Items</h4>
              <button onClick={addItem} className="text-xs text-sunset hover:text-sunset/80 uppercase tracking-widest font-medium">+ Add Item</button>
            </div>
            <div className="space-y-4">
              {formData.items.map((item, idx) => {
                const isImageUrl = item.image?.startsWith('http') || item.image?.startsWith('data:');
                const IconCmp = !isImageUrl && item.image ? (Icons as any)[item.image] : null;

                return (
                  <div key={item.id} className="p-4 border border-graphite/10 bg-graphite/5 relative group flex gap-4 items-start">
                    <button onClick={() => removeItem(idx)} className="absolute top-2 right-2 p-1 text-graphite/40 hover:text-sunset opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-4 h-4" /></button>
                    
                    <div className="flex flex-col gap-2 shrink-0">
                      <button 
                        onClick={() => setEditingImage({ idx, current: isImageUrl ? item.image || '' : '' })}
                        className="w-16 h-16 bg-graphite/10 border border-graphite/20 flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity rounded"
                        title="Edit Image"
                      >
                        {isImageUrl ? <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <span className="text-[10px] text-graphite/40 uppercase">Img</span>}
                      </button>
                      <button 
                        onClick={() => setEditingIcon({ idx, current: !isImageUrl ? item.image || '' : '' })}
                        className="w-16 h-8 bg-graphite/10 border border-graphite/20 flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity rounded"
                        title="Edit Icon"
                      >
                        {IconCmp ? <IconCmp className="w-4 h-4 text-graphite/60" /> : <span className="text-[10px] text-graphite/40 uppercase">Icon</span>}
                      </button>
                    </div>

                    <div className="flex-1 space-y-3 min-w-0 pr-6">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={item.completed} onChange={e => updateItem(idx, 'completed', e.target.checked)} className="w-4 h-4 accent-sunset" />
                        <input value={item.text} onChange={e => updateItem(idx, 'text', e.target.value)} placeholder="Item Text" className="flex-1 bg-transparent border-b border-graphite/20 py-1 focus:outline-none focus:border-sunset font-serif text-lg" />
                      </div>
                      <input value={item.subtitle || ''} onChange={e => updateItem(idx, 'subtitle', e.target.value)} placeholder="Subtitle / Description" className="w-full bg-transparent border-b border-graphite/20 py-1 focus:outline-none focus:border-sunset font-sans text-sm" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-graphite/10 flex justify-between gap-4 shrink-0 bg-paper">
          <button onClick={() => onSave({ ...formData, _delete: true } as any)} className="px-6 py-2 text-xs font-sans tracking-widest uppercase text-red-500 hover:text-red-600 transition-colors">Delete</button>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-6 py-2 text-xs font-sans tracking-widest uppercase text-graphite/60 hover:text-graphite transition-colors">Cancel</button>
            <button onClick={() => onSave(formData)} className="px-6 py-2 bg-graphite text-paper text-xs font-sans tracking-widest uppercase hover:bg-black transition-colors">Save Changes</button>
          </div>
        </div>
      </div>

      {editingImage && (
        <ImageEditModal 
          initialUrl={editingImage.current} 
          onClose={() => setEditingImage(null)} 
          onSave={handleSaveImage} 
        />
      )}
      {editingIcon && (
        <IconEditModal 
          initialIcon={editingIcon.current} 
          onClose={() => setEditingIcon(null)} 
          onSave={handleSaveIcon} 
        />
      )}
    </div>
  );
}

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
  route?: string[];
  keywords?: string[];
  weather?: string;
  date?: string;
  duration?: string;
  pace?: string;
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

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Route (comma separated)</label>
            <input 
              type="text" 
              value={formData.route?.join(', ') || ''}
              onChange={e => setFormData({...formData, route: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
              className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans"
              placeholder="e.g. Osaka, Kyoto, Nara"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Keywords (comma separated)</label>
            <input 
              type="text" 
              value={formData.keywords?.join(', ') || ''}
              onChange={e => setFormData({...formData, keywords: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
              className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans"
              placeholder="e.g. Culture, Food, Photography"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Dates</label>
              <input 
                type="text" 
                value={formData.date || ''}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans"
                placeholder="e.g. Oct 12 - Oct 18"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Duration</label>
              <input 
                type="text" 
                value={formData.duration || ''}
                onChange={e => setFormData({...formData, duration: e.target.value})}
                className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans"
                placeholder="e.g. 7 Days"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Weather</label>
              <input 
                type="text" 
                value={formData.weather || ''}
                onChange={e => setFormData({...formData, weather: e.target.value})}
                className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans"
                placeholder="e.g. 15°C - 22°C, Mostly Sunny"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Pace</label>
              <input 
                type="text" 
                value={formData.pace || ''}
                onChange={e => setFormData({...formData, pace: e.target.value})}
                className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans"
                placeholder="e.g. Moderate"
              />
            </div>
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

export function CityEditModal({ 
  city, 
  onClose, 
  onSave 
}: { 
  city: City; 
  onClose: () => void; 
  onSave: (city: City) => void;
}) {
  const [formData, setFormData] = useState<City>(city);
  const [editingImage, setEditingImage] = useState<{ group: 'cover' | 'unique' | 'core' | 'basic' | 'general', idx?: number, current: string } | null>(null);
  const [editingIcon, setEditingIcon] = useState<{ group: 'basic' | 'general', idx: number, current: string } | null>(null);

  const updatePositioningArray = (group: 'unique' | 'core' | 'basic' | 'general', idx: number, field: string, value: string) => {
    const newArray = [...formData.positioning[group]] as any[];
    newArray[idx] = { ...newArray[idx], [field]: value };
    setFormData({
      ...formData,
      positioning: { ...formData.positioning, [group]: newArray }
    });
  };

  const addPositioningItem = (group: 'unique' | 'core' | 'basic' | 'general') => {
    const newItem = (group === 'basic' || group === 'general') ? { keyword: '', desc: '', icon: '' } : { keyword: '', desc: '', image: '' };
    setFormData({
      ...formData,
      positioning: { ...formData.positioning, [group]: [...formData.positioning[group], newItem] }
    });
  };

  const removePositioningItem = (group: 'unique' | 'core' | 'basic' | 'general', idx: number) => {
    const newArray = [...formData.positioning[group]] as any[];
    newArray.splice(idx, 1);
    setFormData({
      ...formData,
      positioning: { ...formData.positioning, [group]: newArray }
    });
  };

  const handleSaveImage = (url: string) => {
    if (!editingImage) return;
    if (editingImage.group === 'cover') {
      setFormData({ ...formData, coverImage: url });
    } else if (editingImage.idx !== undefined) {
      updatePositioningArray(editingImage.group, editingImage.idx, 'image', url);
    }
    setEditingImage(null);
  };

  const handleSaveIcon = (icon: string) => {
    if (!editingIcon) return;
    updatePositioningArray(editingIcon.group, editingIcon.idx, 'icon', icon);
    setEditingIcon(null);
  };

  const renderPositioningGroup = (group: 'unique' | 'core' | 'basic' | 'general', title: string, hasIcon: boolean = false) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-graphite/10 pb-2">
        <h4 className="text-sm font-sans tracking-widest uppercase text-graphite/40 font-semibold">{title}</h4>
        <button onClick={() => addPositioningItem(group)} className="text-xs text-sunset hover:text-sunset/80 uppercase tracking-widest font-medium">+ Add</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formData.positioning[group].map((item: any, idx: number) => {
          const IconCmp = hasIcon && item.icon ? (Icons as any)[item.icon] : null;
          return (
            <div key={idx} className="p-3 border border-graphite/10 bg-graphite/5 relative group flex gap-3 items-start">
              <button onClick={() => removePositioningItem(group, idx)} className="absolute top-1 right-1 p-1 text-graphite/40 hover:text-sunset opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
              
              {/* Media Button */}
              <button 
                onClick={() => hasIcon ? setEditingIcon({ group: group as any, idx, current: item.icon || '' }) : setEditingImage({ group, idx, current: item.image || '' })}
                className="w-16 h-16 shrink-0 bg-graphite/10 border border-graphite/20 flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity rounded"
                title={hasIcon ? "Edit Icon" : "Edit Image"}
              >
                {hasIcon ? (
                  IconCmp ? <IconCmp className="w-8 h-8 text-graphite/60" /> : <span className="text-[10px] text-graphite/40 uppercase">Icon</span>
                ) : (
                  item.image ? <img src={item.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <span className="text-[10px] text-graphite/40 uppercase">Img</span>
                )}
              </button>

              <div className="flex-1 space-y-2 min-w-0 pr-4">
                <input value={item.keyword} onChange={e => updatePositioningArray(group, idx, 'keyword', e.target.value)} placeholder="Keyword" className="w-full bg-transparent border-b border-graphite/20 py-1 focus:outline-none focus:border-sunset font-serif text-base truncate" />
                <textarea value={item.desc} onChange={e => updatePositioningArray(group, idx, 'desc', e.target.value)} placeholder="Description" className="w-full bg-transparent border-b border-graphite/20 py-1 focus:outline-none focus:border-sunset font-sans text-xs resize-none h-12 leading-tight" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-paper shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-graphite/10 shrink-0">
          <h3 className="font-serif text-2xl text-graphite">Edit Destination</h3>
          <button onClick={onClose} className="p-2 hover:bg-graphite/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-graphite/50" />
          </button>
        </div>
        <div className="p-8 space-y-10 overflow-y-auto flex-1">
          {/* Basic Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-sans tracking-widest uppercase text-graphite/40 font-semibold border-b border-graphite/10 pb-2">Basic Info</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Cover Image</label>
                <button 
                  onClick={() => setEditingImage({ group: 'cover', current: formData.coverImage })}
                  className="w-full h-32 bg-graphite/5 border border-graphite/20 rounded-lg overflow-hidden hover:opacity-90 transition-opacity relative group"
                >
                  {formData.coverImage ? (
                    <img src={formData.coverImage} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-graphite/40 text-sm uppercase tracking-widest">Click to add cover</div>
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs uppercase tracking-widest">Edit Cover</span>
                  </div>
                </button>
              </div>
              <div className="space-y-4 md:col-span-2">
                <div className="space-y-2">
                  <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">City Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-serif text-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Chinese Name</label>
                    <input type="text" value={formData.chineseName || ''} onChange={e => setFormData({...formData, chineseName: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-serif text-lg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Sort Order</label>
                    <input type="number" value={formData.order || 0} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans text-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Region</label>
                  <input type="text" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans" />
                </div>
              </div>
            </div>
          </div>

          {/* Positioning Groups */}
          <div className="space-y-10">
            {renderPositioningGroup('unique', 'Unique Identifier', false)}
            {renderPositioningGroup('core', 'Core Advantage', false)}
            {renderPositioningGroup('basic', 'Basic Feature', true)}
            {renderPositioningGroup('general', 'General Tags', true)}
          </div>
        </div>
        <div className="p-6 border-t border-graphite/10 flex justify-end gap-4 shrink-0 bg-paper">
          <button onClick={onClose} className="px-6 py-2 text-xs font-sans tracking-widest uppercase text-graphite/60 hover:text-graphite transition-colors">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-6 py-2 bg-graphite text-paper text-xs font-sans tracking-widest uppercase hover:bg-black transition-colors">Save Changes</button>
        </div>
      </div>

      {editingImage && (
        <ImageEditModal 
          initialUrl={editingImage.current} 
          onClose={() => setEditingImage(null)} 
          onSave={handleSaveImage} 
        />
      )}
      {editingIcon && (
        <IconEditModal 
          initialIcon={editingIcon.current} 
          onClose={() => setEditingIcon(null)} 
          onSave={handleSaveIcon} 
        />
      )}
    </div>
  );
}

export function SightEditModal({ sight, onClose, onSave }: { sight: Sight, onClose: () => void, onSave: (s: Sight) => void }) {
  const [formData, setFormData] = useState<Sight>(sight);
  const [editingImage, setEditingImage] = useState<boolean>(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-paper shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-graphite/10">
          <h3 className="text-xl font-serif text-graphite">Edit Sight</h3>
          <button onClick={onClose} className="p-2 hover:bg-graphite/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-graphite/50" />
          </button>
        </div>
        
        <div className="p-8 space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Image</label>
            <button 
              onClick={() => setEditingImage(true)}
              className="w-full h-48 bg-graphite/5 border border-graphite/20 rounded-lg overflow-hidden hover:opacity-90 transition-opacity relative group"
            >
              {formData.image ? (
                <img src={formData.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-graphite/40 text-sm uppercase tracking-widest">Click to add image</div>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-serif text-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Location</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Rating</label>
            <input type="number" step="0.1" value={formData.rating} onChange={e => setFormData({...formData, rating: parseFloat(e.target.value) || 0})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Summary</label>
            <textarea value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans resize-none h-20" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Details</label>
            <textarea value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans resize-none h-32" />
          </div>
        </div>

        <div className="p-6 border-t border-graphite/10 flex justify-between bg-graphite/5">
          <button onClick={() => onSave({ ...formData, _delete: true } as any)} className="px-6 py-2.5 text-red-500 hover:bg-red-500/10 rounded-full text-xs uppercase tracking-widest font-medium transition-colors">
            Delete
          </button>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-6 py-2.5 text-graphite/60 hover:text-graphite text-xs uppercase tracking-widest font-medium transition-colors">Cancel</button>
            <button onClick={() => onSave(formData)} className="px-8 py-2.5 bg-graphite text-paper rounded-full text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors shadow-lg">Save</button>
          </div>
        </div>
      </div>
      {editingImage && (
        <ImageEditModal
          initialUrl={formData.image}
          onSave={(url) => { setFormData({...formData, image: url}); setEditingImage(false); }}
          onClose={() => setEditingImage(false)}
        />
      )}
    </div>
  );
}

export function ActivityEditModal({ activity, onClose, onSave }: { activity: Activity, onClose: () => void, onSave: (a: Activity) => void }) {
  const [formData, setFormData] = useState<Activity>(activity);
  const [editingImage, setEditingImage] = useState<boolean>(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-paper shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-graphite/10">
          <h3 className="text-xl font-serif text-graphite">Edit Activity</h3>
          <button onClick={onClose} className="p-2 hover:bg-graphite/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-graphite/50" />
          </button>
        </div>
        
        <div className="p-8 space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Image</label>
            <button 
              onClick={() => setEditingImage(true)}
              className="w-full h-48 bg-graphite/5 border border-graphite/20 rounded-lg overflow-hidden hover:opacity-90 transition-opacity relative group"
            >
              {formData.image ? (
                <img src={formData.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-graphite/40 text-sm uppercase tracking-widest">Click to add image</div>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-serif text-xl" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Duration</label>
              <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Rating</label>
              <input type="number" step="0.1" value={formData.rating} onChange={e => setFormData({...formData, rating: parseFloat(e.target.value) || 0})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Reviews</label>
              <input type="number" value={formData.reviews} onChange={e => setFormData({...formData, reviews: parseInt(e.target.value) || 0})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Price Level</label>
              <input type="text" value={formData.priceLevel} onChange={e => setFormData({...formData, priceLevel: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Highlights (comma separated)</label>
            <input type="text" value={formData.highlights.join(', ')} onChange={e => setFormData({...formData, highlights: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Description</label>
            <textarea value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans resize-none h-20" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Details</label>
            <textarea value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans resize-none h-32" />
          </div>
        </div>

        <div className="p-6 border-t border-graphite/10 flex justify-between bg-graphite/5">
          <button onClick={() => onSave({ ...formData, _delete: true } as any)} className="px-6 py-2.5 text-red-500 hover:bg-red-500/10 rounded-full text-xs uppercase tracking-widest font-medium transition-colors">
            Delete
          </button>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-6 py-2.5 text-graphite/60 hover:text-graphite text-xs uppercase tracking-widest font-medium transition-colors">Cancel</button>
            <button onClick={() => onSave(formData)} className="px-8 py-2.5 bg-graphite text-paper rounded-full text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors shadow-lg">Save</button>
          </div>
        </div>
      </div>
      {editingImage && (
        <ImageEditModal
          initialUrl={formData.image}
          onSave={(url) => { setFormData({...formData, image: url}); setEditingImage(false); }}
          onClose={() => setEditingImage(false)}
        />
      )}
    </div>
  );
}

export function NoteEditModal({ note, onClose, onSave }: { note: Note, onClose: () => void, onSave: (n: Note) => void }) {
  const [formData, setFormData] = useState<Note>(note);
  const [editingImage, setEditingImage] = useState<boolean>(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-paper shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-6 border-b border-graphite/10">
          <h3 className="text-xl font-serif text-graphite">Edit Note</h3>
          <button onClick={onClose} className="p-2 hover:bg-graphite/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-graphite/50" />
          </button>
        </div>
        
        <div className="p-8 space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Image</label>
            <button 
              onClick={() => setEditingImage(true)}
              className="w-full h-48 bg-graphite/5 border border-graphite/20 rounded-lg overflow-hidden hover:opacity-90 transition-opacity relative group"
            >
              {formData.image ? (
                <img src={formData.image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-graphite/40 text-sm uppercase tracking-widest">Click to add image</div>
              )}
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Title</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-serif text-xl" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-sans tracking-widest uppercase text-graphite/50">Content</label>
            <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-transparent border-b border-graphite/20 py-2 focus:outline-none focus:border-sunset transition-colors font-sans resize-none h-48" />
          </div>
        </div>

        <div className="p-6 border-t border-graphite/10 flex justify-between bg-graphite/5">
          <button onClick={() => onSave({ ...formData, _delete: true } as any)} className="px-6 py-2.5 text-red-500 hover:bg-red-500/10 rounded-full text-xs uppercase tracking-widest font-medium transition-colors">
            Delete
          </button>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-6 py-2.5 text-graphite/60 hover:text-graphite text-xs uppercase tracking-widest font-medium transition-colors">Cancel</button>
            <button onClick={() => onSave(formData)} className="px-8 py-2.5 bg-graphite text-paper rounded-full text-xs uppercase tracking-widest font-medium hover:bg-black transition-colors shadow-lg">Save</button>
          </div>
        </div>
      </div>
      {editingImage && (
        <ImageEditModal
          initialUrl={formData.image || ''}
          onSave={(url) => { setFormData({...formData, image: url}); setEditingImage(false); }}
          onClose={() => setEditingImage(false)}
        />
      )}
    </div>
  );
}
