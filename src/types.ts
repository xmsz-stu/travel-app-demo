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

export interface DiscoveryPost {
  id: string;
  type: 'video' | 'text';
  author: {
    name: string;
    avatar: string;
    platform: string;
  };
  title: string;
  content: string;
  thumbnail?: string;
  tags: {
    country: string;
    city: string;
    sight?: string;
  };
  aiSummary: string;
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface FlightSegment {
  airline: string;
  airlineLogo?: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  duration: string;
}

export interface FlightOption {
  id: string;
  price: number;
  outbound: FlightSegment;
  returnFlight?: FlightSegment;
  stops: number;
  totalDuration: string;
  type: 'Best' | 'Cheapest' | 'Fastest' | 'Other';
}

export interface FlightSubscription {
  id: string;
  name: string;
  holidayRange: string;
  makeupDays: string[];
  durations: {
    days: number;
    options: FlightSubscriptionRow[];
  }[];
}

export interface FlightSubscriptionRow {
  id: string;
  departureDate: string;
  returnDate: string;
  leaveDays: number;
  remarks: string;
  solutions: FlightSolution[];
}

export interface FlightSolution {
  id: string;
  name: string;
  price: number;
  remarks: string;
  isAlternative: boolean;
  outbound: FlightSegment[];
  returnFlights: FlightSegment[];
}

export interface TravelData {
  cities: City[];
  checklists: Checklist[];
  activities: Activity[];
  sights: Sight[];
  notes: Note[];
  blog: string;
  discoveryPosts?: DiscoveryPost[];
  flights?: FlightOption[];
  subscriptions?: FlightSubscription[];
}
