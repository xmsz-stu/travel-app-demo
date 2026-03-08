export interface CityPositioning {
  unique: { keyword: string; desc: string; image?: string }[];
  core: { keyword: string; desc: string; image?: string }[];
  basic: { keyword: string; desc: string; icon?: string }[];
  general: { keyword: string; desc: string; image?: string; icon?: string }[];
}

export interface City {
  id: string;
  name: string;
  chineseName?: string;
  region: string;
  bgColor: string;
  coverImage: string;
  positioning: CityPositioning;
  order?: number;
}

export type ChecklistType = 'normal' | 'image' | 'ranking';
export type ChecklistCategory = 'food' | 'restaurant' | 'souvenir' | 'packing' | 'general';

export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
  noteId?: number;
  image?: string;
  subtitle?: string;
}

export interface Checklist {
  id: number;
  cityId: string;
  title: string;
  type: ChecklistType;
  category: ChecklistCategory;
  items: ChecklistItem[];
}

export interface Activity {
  id: number;
  cityId: string;
  name: string;
  image: string;
  desc: string;
  rating: number;
  reviews: number;
  priceLevel: string; // e.g., "$$$"
  duration: string;
  durationValue: number; // 0-100 for progress bar
  highlights: string[];
  details: string; // For modal
}

export interface Sight {
  id: number;
  cityId: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  summary: string;
  details: string; // For modal
}

export interface Note {
  id: number;
  cityId: string;
  title: string;
  content: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
}

export interface TravelData {
  cities: City[];
  checklists: Checklist[];
  activities: Activity[];
  sights: Sight[];
  notes: Note[];
  blog: string;
}
