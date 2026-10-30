import { Room, Amenity, Review, GalleryPhoto, FaqItem, CounterStat } from '../types';

export const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2200&q=85',
    title: 'Where Silence Meets the Ocean',
    caption: 'Cliffside sanctuaries above the crystalline Mediterranean waters',
  },
  {
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=85',
    title: 'Architecture in Harmony With Light',
    caption: 'Handcrafted travertine terraces and private heated saltwater pools',
  },
  {
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2200&q=85',
    title: 'An Intimate Haven of Peace',
    caption: 'Curated wellness journeys and uninterrupted horizon views',
  },
];

export const COUNTER_STATS: CounterStat[] = [
  {
    id: 'rating',
    target: 4.98,
    suffix: ' / 5.0',
    decimals: 2,
    label: 'Guest Distinction',
    description: 'Based on 480+ verified reviews',
  },
  {
    id: 'rooms',
    target: 36,
    suffix: '',
    decimals: 0,
    label: 'Private Sanctuaries',
    description: 'Standalone villas & pavilions',
  },
  {
    id: 'guests',
    target: 99.4,
    suffix: '%',
    decimals: 1,
    label: 'Sanctuary Quietude',
    description: 'Acoustic seclusion guarantee',
  },
  {
    id: 'keys',
    target: 3,
    prefix: '✦ ',
    suffix: ' Keys',
    decimals: 0,
    label: 'MICHELIN Guide',
    description: 'Highest distinction of excellence',
  },
];

export const ROOMS: Room[] = [
  {
    id: 'oceanfront-cliff-villa',
    name: 'The Azure Oceanfront Villa',
    category: 'villas',
    subtitle: 'Unrestricted 180° Aegean Panorama with Private Infinity Plunge',
    description:
      'Perched directly upon the volcanic cliff edge, this signature sanctuary offers absolute acoustic seclusion. Featuring a master bedroom enveloped in natural limestone, bespoke teak furnishings, an outdoor copper soaking tub under the stars, and a heated infinity plunge pool overlooking the calm sea.',
    pricePerNight: 1650,
    sizeSqM: 145,
    maxGuests: 3,
    bedType: 'Super King Bed with Italian Organic Linen',
    view: 'Direct Panoramic Ocean & Sunset View',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
    ],
    features: ['Private heated infinity plunge pool', 'Sunken lounge with travertine fire pit', 'Private butler service 24/7', 'Daily wellness breakfast served on terrace'],
    amenities: ['Custom Dyson Supersonic suite', 'Sub-Zero private wine cellar', 'Bespoke Le Labo santal toiletries', 'High-fidelity Devialet acoustic system'],
  },
  {
    id: 'hillside-olive-pavilion',
    name: 'The Olive Grove Pavilion',
    category: 'pavilions',
    subtitle: 'Nestled Within Century-Old Olive Terraces & Wild Herbs',
    description:
      'Sheltered among fragrant wild thyme and ancient olive trees, the Pavilion balances earthen serenity with refined modern minimalism. Floor-to-ceiling glass walls slide back completely to dissolve the boundary between the living pavilion and the open-air stone courtyards.',
    pricePerNight: 1250,
    sizeSqM: 110,
    maxGuests: 2,
    bedType: 'Californian King Floating Platform Bed',
    view: 'Olive Groves & Glimpses of the Blue Bay',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    ],
    features: ['Double outdoor rainfall shower', 'Private shaded hammock loggia', 'Complimentary electric Vespa for estate tours', 'Artisanal olive oil pairing tasting in suite'],
    amenities: ['Cashmere robes & linen slippers', 'Curated botanical tea apothecary', 'Acoustic Bang & Olufsen soundbar', 'Evening lavender aromatherapy turndown'],
  },
  {
    id: 'royal-azure-penthouse',
    name: 'The Royal Belvedere Penthouse',
    category: 'penthouses',
    subtitle: 'The Estate’s Crown Residence with 360° Rooftop Observatory',
    description:
      'Occupying the highest vantage point of the promontory, the Royal Belvedere is a masterwork of light and proportion. It includes two grand king suites, a private formal dining salon, private chef kitchen, and an expansive 180 sqm rooftop deck with a glass-walled pool and celestial stargazing observatory.',
    pricePerNight: 3400,
    sizeSqM: 280,
    maxGuests: 6,
    bedType: 'Two Grand King Suites + Daybed Alcove',
    view: 'Panoramic 360° Coastline, Islands & Open Horizon',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    ],
    features: ['Dedicated master sommelier on call', 'Private glass-edge rooftop pool', 'Complimentary private Riva yacht day cruise', 'Private culinary chef dinner included'],
    amenities: ['Custom marble soaking baths', 'VIP helicopter helipad arrival', 'In-villa sound meditation bowls', 'Chilled Ruinart Champagne upon arrival'],
  },
  {
    id: 'sunset-cove-sanctuary',
    name: 'Sunset Cove Seclusion Suite',
    category: 'villas',
    subtitle: 'Direct Private Stairs to the Protected Sea Lagoon',
    description:
      'Carved into the shoreline rock with hand-chiselled stone steps leading straight down into crystal-clear turquoise waters. Watch sailboats drift across the sunset glow from your sunken daybed or while swimming in your warm saltwater pool.',
    pricePerNight: 1950,
    sizeSqM: 160,
    maxGuests: 2,
    bedType: 'Custom Handcrafted Teak King Bed',
    view: 'Private Cove & Golden Hour Sunsets',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    ],
    features: ['Private sea-swimming staircase & pontoon', 'Outdoor cedar sauna overlooking waves', 'Midnight stargazing platform', 'All-inclusive organic pantry & mixology bar'],
    amenities: ['Hand-harvested sea salt bath rituals', 'Dimmable architectural brass lamps', 'Curated library of art & philosophy', 'Personal valet unpacking service'],
  },
];

export const AMENITIES: Amenity[] = [
  {
    id: 'hydro-pool',
    name: 'Infinity Hydrothermal Pool',
    tagline: 'Saltwater suspended above the azure tide',
    description: 'Mineral-infused seawater maintained at 31°C year-round, engineered with silent underwater acoustics and uninterrupted sea horizon vistas.',
    iconName: 'Waves',
    badge: '31°C Year-Round',
  },
  {
    id: 'ayurveda-spa',
    name: 'Subterranean Ayurvedic Spa',
    tagline: 'Carved directly from ancient stone',
    description: 'Bespoke therapies inspired by Hellenic herbalism and Ayurvedic balance, featuring thermal steam caves and cold plunge pools.',
    iconName: 'Sparkles',
    badge: 'Award Winning',
  },
  {
    id: 'michelin-dining',
    name: 'Olea Gastronomy Table',
    tagline: 'Hyper-local zero-kilometer cuisine',
    description: 'Led by Chef Elena Vassili, honoring biodynamic produce from our cliffside gardens and line-caught seafood from local artisanal fishermen.',
    iconName: 'UtensilsCrossed',
    badge: 'MICHELIN Star',
  },
  {
    id: 'yacht-charters',
    name: 'Private Riva Yacht Excursions',
    tagline: 'Effortless exploration of hidden coves',
    description: 'Board our private 48-foot Riva Dolceriva directly from our jetty for secluded island picnics, snorkeling, or sunset champagne sails.',
    iconName: 'Compass',
    badge: 'Private Fleet',
  },
  {
    id: 'yoga-pavilion',
    name: 'Sunset Yoga & Meditation',
    tagline: 'Breathwork bathed in golden amber light',
    description: 'Open-air cedar pavilion oriented toward the setting sun, offering daily morning vinyasa, sound baths, and guided stillness sessions.',
    iconName: 'Sun',
    badge: 'Daily Guided',
  },
  {
    id: 'butler-service',
    name: '24/7 Dedicated Butler Concierge',
    tagline: 'Intuitive hospitality, never intrusive',
    description: 'From unpacking your wardrobe and arranging bespoke island itineraries to curating bespoke in-suite vinyl records and candlelit dinners.',
    iconName: 'Bell',
    badge: 'Discrete & Attentive',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Lady Victoria Sterling',
    location: 'London & Geneva',
    rating: 5,
    date: 'October 2026',
    suiteStayed: 'The Royal Belvedere Penthouse',
    comment:
      'In forty years of traveling to sanctuaries around the globe, The Hotel Sunset stands apart. The rhythm here slows the heartbeat within twenty minutes of arrival. The subtle fragrance of wild thyme and stone, the completely silent pool mornings, and the graciousness of the team are simply peerless.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-2',
    author: 'Julian & Claire Moreau',
    location: 'Paris, France',
    rating: 5,
    date: 'September 2026',
    suiteStayed: 'The Azure Oceanfront Villa',
    comment:
      'We spent our tenth anniversary in the Azure Villa. Stepping out onto the terrace at dusk with the Aegean fading into twilight was a memory etched forever. The food at Olea was poetic, fresh, and deeply respectful of the earth. We have already booked our return.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-3',
    author: 'Kenji & Mariko Takahashi',
    location: 'Kyoto, Japan',
    rating: 5,
    date: 'August 2026',
    suiteStayed: 'The Olive Grove Pavilion',
    comment:
      'The architecture embodies true wabi-sabi through quiet Mediterranean craft. Every material breathes. There is an absence of excess that allows the mind to find pure stillness. The private sound meditation at sunset was extraordinary.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-4',
    author: 'Dr. Evelyn Reed',
    location: 'Zurich, Switzerland',
    rating: 5,
    date: 'July 2026',
    suiteStayed: 'Sunset Cove Seclusion Suite',
    comment:
      'A true masterclass in architectural grace and gentle pampering. The private stairs straight into the crystalline lagoon meant swimming each dawn before breakfast was our private sanctuary. Impeccable attention to every detail.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    title: 'Cliffside Infinity Edge',
    category: 'Architecture',
    aspect: 'landscape',
  },
  {
    id: 'gal-2',
    src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    title: 'The Master Suite at Dawn',
    category: 'Interiors',
    aspect: 'landscape',
  },
  {
    id: 'gal-3',
    src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    title: 'Sunken Travertine Lounge',
    category: 'Sanctuary',
    aspect: 'landscape',
  },
  {
    id: 'gal-4',
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    title: 'Warm Saltwater Thermal Bath',
    category: 'Wellness',
    aspect: 'portrait',
  },
  {
    id: 'gal-5',
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    title: 'Penthouse Horizon Terrace',
    category: 'Architecture',
    aspect: 'portrait',
  },
  {
    id: 'gal-6',
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    title: 'Holistic Herbal Massage Ritual',
    category: 'Wellness',
    aspect: 'landscape',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do guests arrive at The Hotel Sunset?',
    answer:
      'We arrange private, seamless chauffeured Mercedes-Maybach transfers directly from the international airport (45 minutes) or private jet terminal. For direct aerial arrivals, our on-site helicopter landing pad accommodates private charters directly to the estate.',
    category: 'Arrival & Logistics',
  },
  {
    id: 'faq-2',
    question: 'What is included in the suite and villa reservations?',
    answer:
      'Every stay includes daily artisanal organic breakfast served in your suite or at Olea restaurant, 24/7 dedicated butler service, full access to our subterranean thermal spa and hydrotherapy pools, packing and unpacking assistance, daily sunset sound meditation, and private chauffeured estate buggies.',
    category: 'Stay Inclusions',
  },
  {
    id: 'faq-3',
    question: 'Can dietary preferences and wellness regimes be customized?',
    answer:
      'Prior to your arrival, our Executive Chef and Lead Wellness Practitioner conduct a private pre-stay consultation to tailor every menu, pillow menu, aromatherapy preference, and wellness regime specifically to your nutritional and physical goals.',
    category: 'Wellness & Dining',
  },
  {
    id: 'faq-4',
    question: 'What is your cancellation and reservation modification policy?',
    answer:
      'We offer calm flexibility. Reservations may be modified or cancelled with full credit up to 21 days prior to scheduled arrival. For royal penthouses and multi-villa reservations, our private concierge coordinates personalized terms.',
    category: 'Booking & Policies',
  },
  {
    id: 'faq-5',
    question: 'Are private yacht charters and helicopter tours bookable on-site?',
    answer:
      'Yes. Our private Riva fleet and aerial concierge are stationed directly at our deep-water pier and private helipad. Your dedicated butler will coordinate departure times, champagne pairings, and private beach picnic baskets seamlessly.',
    category: 'Experiences',
  },
];
