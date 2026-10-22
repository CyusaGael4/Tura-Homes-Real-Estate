/**
 * Normalises a raw `properties` row from Supabase into the shape the UI renders.
 * The live table columns are: id, title, description, category, type, location,
 * price, currency, image_url, beds, baths, sqft, featured, created_at; the
 * mapping stays tolerant of alternative spellings just in case.
 */

export const LOCAL_PHOTOS = [
  '/assets/hero-estate.jpg',
  '/assets/villa-cream.jpg',
  '/assets/house-modern.jpg',
  '/assets/garden-bungalow.jpg',
  '/assets/mansion-kigali.jpg',
  '/assets/estate-lawn.jpg',
  '/assets/green-bungalow.jpg',
  '/assets/luxury-villa.jpg',
  '/assets/interior-lounge.jpg',
]

/**
 * Seed rows ship with placeholder URLs such as `https://unsplash.com`. These
 * render as broken images, so we treat them as missing and use a local photo.
 */
const isUsableImageUrl = (value) => {
  if (typeof value !== 'string' || !value.trim()) return false
  const raw = value.trim()
  if (!/^https?:\/\//i.test(raw)) return true // local path like /assets/...
  try {
    const url = new URL(raw)
    const blockedHosts = ['unsplash.com', 'www.unsplash.com', 'picsum.photos', 'example.com']
    if (blockedHosts.includes(url.hostname)) return false
    return url.pathname.length > 1 || Boolean(url.search)
  } catch {
    return false
  }
}

const hashSeed = (value) => {
  const text = String(value ?? '')
  let hash = 0
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0
  }
  return hash
}

const firstDefined = (row, keys) => {
  for (const key of keys) {
    const value = row?.[key]
    if (value !== undefined && value !== null && value !== '') return value
  }
  return null
}

const toNumber = (value) => {
  if (value === null || value === undefined || value === '') return null
  const parsed = Number(String(value).replace(/[^\d.]/g, ''))
  return Number.isFinite(parsed) ? parsed : null
}

const pickImage = (row) => {
  const raw = firstDefined(row, [
    'image_url',
    'imageUrl',
    'image',
    'photo_url',
    'cover_image',
    'cover',
    'thumbnail',
    'gallery',
    'photos',
  ])

  if (Array.isArray(raw)) {
    const first = raw[0]
    const firstUrl =
      typeof first === 'string' ? first : first && (first.url || first.public_url || first.src)
    return isUsableImageUrl(firstUrl) ? firstUrl : null
  }

  if (typeof raw === 'string' && raw.trim()) {
    // Some schemas store a JSON array of urls inside a text column.
    if (raw.trim().startsWith('[')) {
      try {
        const parsed = JSON.parse(raw)
        const first = Array.isArray(parsed) ? parsed[0] : null
        const firstUrl =
          typeof first === 'string' ? first : first && (first.url || first.src)
        return isUsableImageUrl(firstUrl) ? firstUrl : null
      } catch {
        /* fall through to the raw string */
      }
    }
    return isUsableImageUrl(raw) ? raw : null
  }

  return null
}

const titleCase = (value) =>
  String(value || '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()

const correctLocationSpelling = (value) => String(value || '').replace(/gaculiro/gi, 'Gacuriro')

export const PROPERTY_CATEGORIES = ['Buy', 'Rent', 'Sell', 'Invest']
export const PROPERTY_TYPES = ['Apartment', 'House', 'Villa', 'Commercial', 'Land']

export function normalizeProperty(row, index = 0) {
  if (!row || typeof row !== 'object') return null

  const id = firstDefined(row, ['id', 'uuid', 'property_id', 'listing_id']) ?? `row-${index}`
  const title = firstDefined(row, ['title', 'name', 'property_title', 'listing_title']) || null
  const categoryRaw = firstDefined(row, ['category', 'listing_type', 'offer_type', 'purpose'])
  const typeRaw = firstDefined(row, ['property_type', 'type', 'category_type', 'kind', 'subtype'])
  const location =
    firstDefined(row, ['location', 'neighbourhood', 'neighborhood', 'district', 'area', 'town']) ||
    'Kigali'

  return {
    id,
    title: correctLocationSpelling(title || titleCase(typeRaw) || 'Property'),
    description:
      firstDefined(row, ['description', 'summary', 'details', 'about', 'bio']) ||
      'A thoughtfully finished property in one of Kigali’s most sought-after neighbourhoods.',
    price: toNumber(firstDefined(row, ['price', 'amount', 'rent', 'rent_price', 'price_rwf'])),
    currency: titleCase(firstDefined(row, ['currency']) || 'RWF') || 'RWF',
    category: titleCase(categoryRaw) || 'Buy',
    type: titleCase(typeRaw) || 'House',
    location: titleCase(correctLocationSpelling(location)),
    city: titleCase(correctLocationSpelling(firstDefined(row, ['city', 'country']))),
    bedrooms: toNumber(firstDefined(row, ['bedrooms', 'beds', 'bed_rooms', 'num_bedrooms'])),
    bathrooms: toNumber(firstDefined(row, ['bathrooms', 'baths', 'bath_rooms', 'num_bathrooms'])),
    area: toNumber(
      firstDefined(row, ['sqft', 'sq_ft', 'area', 'size', 'size_sqft', 'square_feet', 'surface'])
    ),
    image: pickImage(row),
    featured: Boolean(firstDefined(row, ['featured', 'is_featured'])),
    status: titleCase(firstDefined(row, ['status', 'availability'])) || 'Available',
  }
}

/**
 * Fills every listing that lacks a usable hosted photo with a distinct local
 * photo, so the same picture never appears twice in one rendered batch.
 *
 * @param {Array} items normalised properties (or demo seeds with image: null)
 * @param {string[]} exclude local photos already used elsewhere on the page
 */
export function withDistributedPhotos(items, exclude = []) {
  const pool = LOCAL_PHOTOS.filter((photo) => !exclude.includes(photo))
  const source = pool.length ? pool : LOCAL_PHOTOS
  const used = new Set()

  return items.map((item, index) => {
    // Keep images explicitly selected for a listing, including bundled local assets.
    if (item?.image) return item

    let slot = hashSeed(item?.id ?? index) % source.length
    let guard = 0
    while (used.has(slot) && guard < source.length) {
      slot = (slot + 1) % source.length
      guard += 1
    }
    used.add(slot)

    return { ...item, image: source[slot] }
  })
}

export function formatRWF(value, currency = 'RWF') {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return 'Price on request'
  return `${String(currency || 'RWF').toUpperCase()} ${Number(value).toLocaleString('en-US')}`
}

export function formatArea(value) {
  if (!value) return null
  return `${Number(value).toLocaleString('en-US')} sqft`
}
