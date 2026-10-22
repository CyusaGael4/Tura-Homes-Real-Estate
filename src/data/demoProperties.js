import lakesideVillaPhoto from '../../assets/WhatsApp-Image-2024-11-06-at-14.54.15-1.jpeg'
import pastelHomePhoto from '../../assets/1c20d678-beab-4d2e-8dc1-9159f7dfbf87.jpg'
import urbanVillaPhoto from '../../assets/images (5).jpg'
import gatedResidencePhoto from '../../assets/images (6).jpg'
import familyBungalowPhoto from '../../assets/fcb46f01-8429-40bc-b79a-30ca83313397.jpg'
import gardenHomePhoto from '../../assets/house1.jpg'
import contemporaryVillaPhoto from '../../assets/1756577927_68b340879a72d_1756577456138.jpg'
import cityVillaPhoto from '../../assets/900679317.jpg'

/**
 * Curated sample listings shown only when the Supabase `properties` table is
 * unreachable (offline dev, missing anon SELECT grant, empty table, ...).
 * They mirror the normalised schema produced by src/lib/properties.js.
 */
const seedProperties = [
  {
    id: 'demo-1',
    title: 'Elegant 3-Story Smart Mansion',
    description:
      'A serene hillside villa with expansive living areas, a landscaped garden and panoramic views over the valleys of Kigali.',
    price: 780000000,
    category: 'Buy',
    type: 'Villa',
    location: 'Nyarutarama',
    city: 'Kigali',
    bedrooms: 5,
    bathrooms: 4,
    area: 420,
    image: '/assets/luxury-villa.jpg',
    featured: true,
    status: 'Available',
  },
  {
    id: 'demo-2',
    title: 'Modern Architectural Mansion',
    description:
      'A contemporary family home steps from Kimihurura’s cafés, with an open kitchen, staff quarters and a secure gated driveway.',
    price: 520000000,
    category: 'Buy',
    type: 'House',
    location: 'Kimihurura',
    city: 'Kigali',
    bedrooms: 5,
    bathrooms: 4,
    area: 380,
    image: '/assets/house-modern.jpg',
    featured: true,
    status: 'Available',
  },
  {
    id: 'demo-3',
    title: 'Elegant Family Villa with Garden',
    description:
      'Part of a premium brick-clad estate overlooking the city, this residence pairs warm local materials with modern detailing.',
    price: 285000000,
    category: 'Buy',
    type: 'House',
    location: 'Gisozi',
    city: 'Kigali',
    bedrooms: 3,
    bathrooms: 2,
    area: 240,
    image: '/assets/garden-bungalow.jpg',
    featured: false,
    status: 'Available',
  },
  {
    id: 'demo-4',
    title: 'Modern Gated Rental Residence',
    description:
      'A fully furnished apartment in Kacyiru’s diplomatic quarter, with fibre internet, backup power and rooftop lounge access.',
    price: 1500000,
    category: 'Rent',
    type: 'Apartment',
    location: 'Kacyiru',
    city: 'Kigali',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    image: '/assets/white-villa-street.jpg',
    featured: false,
    status: 'Available',
  },
  {
    id: 'demo-5',
    title: 'The Green-Acre Family Villa',
    description:
      'A spacious family villa with a large garden, generous parking and a calm setting in Rusororo.',
    price: 350000000,
    category: 'Buy',
    type: 'House',
    location: 'Rusororo',
    city: 'Kigali',
    bedrooms: 4,
    bathrooms: 3,
    area: 360,
    image: '/assets/estate-lawn.jpg',
    featured: false,
    status: 'Available',
  },
  {
    id: 'demo-6',
    title: 'Luxurious Furnished Apartment',
    description:
      'A refined, fully furnished apartment with a generous open-plan lounge, dining space and contemporary lighting.',
    price: 1800000,
    category: 'Rent',
    type: 'Apartment',
    location: 'Remera',
    city: 'Kigali',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: '/assets/interior-lounge.jpg',
    featured: false,
    status: 'Available',
  },
  {
    id: 'demo-7',
    title: 'Luxury Pool Residence',
    description:
      'A release of nine townhouses designed for strong rental yields in one of Kigali’s fastest-appreciating corridors.',
    price: 850000000,
    category: 'Invest',
    type: 'House',
    location: 'Batsinda',
    city: 'Kigali',
    bedrooms: 3,
    bathrooms: 3,
    area: 210,
    image: '/assets/pool-residence.jpg',
    featured: true,
    status: 'Available',
  },
  {
    id: 'demo-8',
    title: 'The Teal Crest Residence',
    description:
      'A neatly finished bungalow with a secure frontage and an easy-to-maintain outdoor area in Jali.',
    price: 165000000,
    category: 'Buy',
    type: 'House',
    location: 'Jali',
    city: 'Kigali',
    bedrooms: 3,
    bathrooms: 2,
    area: 170,
    image: '/assets/green-bungalow.jpg',
    featured: false,
    status: 'Available',
  },
  {
    id: 'demo-9',
    title: 'The Imperial Estate',
    description:
      'A generous cream-coloured villa with covered balconies, secure parking and flexible family living areas.',
    price: 385000000,
    category: 'Buy',
    type: 'Villa',
    location: 'Muyenga',
    city: 'Kigali',
    bedrooms: 4,
    bathrooms: 3,
    area: 300,
    image: '/assets/villa-cream.jpg',
    featured: false,
    status: 'Available',
  },
]

export const demoProperties = seedProperties.map((property) => ({
  currency: 'RWF',
  ...property,
}))

export const newPhotoProperties = [
  {
    id: 'demo-24',
    title: 'Grand Courtyard Villa',
    description: 'An elegant family villa with generous entertaining spaces, a private garden and secure parking in Nyarutarama.',
    price: 850000000,
    category: 'Buy', type: 'Villa', location: 'Nyarutarama', city: 'Kigali', bedrooms: 5, bathrooms: 5, area: 460,
    image: lakesideVillaPhoto, featured: true, status: 'Available',
  },
  {
    id: 'demo-25',
    title: 'Premium Residential Townhouse',
    description: 'A light-filled home with spacious rooms, a landscaped compound and easy access to everyday amenities.',
    price: 325000000,
    category: 'Buy', type: 'House', location: 'Kibagabaga', city: 'Kigali', bedrooms: 4, bathrooms: 3, area: 280,
    image: pastelHomePhoto, featured: false, status: 'Available',
  },
  {
    id: 'demo-26',
    title: 'Avant-Garde Architectural Mansion',
    description: 'A modern multi-level residence with refined finishes, airy balconies and a quiet residential setting.',
    price: 520000000,
    category: 'Buy', type: 'Villa', location: 'Gacuriro', city: 'Kigali', bedrooms: 4, bathrooms: 4, area: 360,
    image: urbanVillaPhoto, featured: true, status: 'Available',
  },
  {
    id: 'demo-27',
    title: 'Executive Luxury Villa',
    description: 'A stylish gated villa with a polished exterior, private compound and comfortable indoor-outdoor living.',
    price: 1800000,
    category: 'Rent', type: 'Villa', location: 'Kicukiro', city: 'Kigali', bedrooms: 3, bathrooms: 3, area: 250,
    image: gatedResidencePhoto, featured: false, status: 'Available',
  },
  {
    id: 'demo-28',
    title: 'Turquoise Accent Residence',
    description: 'A well-kept bungalow with a secure perimeter, practical layout and room for relaxed family living.',
    price: 155000000,
    category: 'Buy', type: 'House', location: 'Kanombe', city: 'Kigali', bedrooms: 3, bathrooms: 2, area: 190,
    image: familyBungalowPhoto, featured: false, status: 'Available',
  },
  {
    id: 'demo-29',
    title: 'Arched-Window Villa',
    description: 'A welcoming detached home with a manicured garden, ample driveway space and a peaceful neighbourhood feel.',
    price: 340000000,
    category: 'Buy', type: 'House', location: 'Kabeza', city: 'Kigali', bedrooms: 4, bathrooms: 3, area: 290,
    image: gardenHomePhoto, featured: false, status: 'Available',
  },
  {
    id: 'demo-30',
    title: 'Designer Duplex Residence',
    description: 'A striking contemporary duplex with premium finishes, balconies and views across Kigali.',
    price: 3500000,
    category: 'Rent', type: 'Villa', location: 'Kacyiru', city: 'Kigali', bedrooms: 4, bathrooms: 4, area: 330,
    image: contemporaryVillaPhoto, featured: true, status: 'Available',
  },
  {
    id: 'demo-31',
    title: 'Architectural White Villa',
    description: 'A bright architectural home featuring dramatic glazing, a secure frontage and sophisticated detailing.',
    price: 620000000,
    category: 'Buy', type: 'Villa', location: 'Rebero', city: 'Kigali', bedrooms: 4, bathrooms: 4, area: 350,
    image: cityVillaPhoto, featured: false, status: 'Available',
  },
].map((property) => ({
  currency: 'RWF',
  ...property,
}))

// Stable lookup for local-card detail pages, including direct links and refreshes.
export const localPropertyCatalog = [...demoProperties, ...newPhotoProperties]
