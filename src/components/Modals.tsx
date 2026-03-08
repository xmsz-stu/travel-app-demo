import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Heart, Upload } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Note, Activity, Sight, City } from '../types';

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
