export interface Room {
  id: string;
  name: string;
  category: 'villas' | 'pavilions' | 'penthouses';
  subtitle: string;
  description: string;
  pricePerNight: number;
  sizeSqM: number;
  maxGuests: number;
  bedType: string;
  view: string;
  image: string;
  gallery: string[];
  features: string[];
  amenities: string[];
}

export interface Amenity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  suiteStayed: string;
  comment: string;
  avatar: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  aspect: 'landscape' | 'portrait';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface CounterStat {
  id: string;
  target: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  description: string;
}
