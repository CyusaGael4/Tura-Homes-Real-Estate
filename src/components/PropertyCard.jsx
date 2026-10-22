import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bath, BedDouble, Maximize, MapPin } from 'lucide-react'
import { formatArea, formatRWF, LOCAL_PHOTOS } from '../lib/properties'

export default function PropertyCard({ property, index = 0 }) {
  const saveSelectedProperty = () => {
    try {
      sessionStorage.setItem(`turahomes:property:${property.id}`, JSON.stringify(property))
    } catch {
      // Detail links continue to work through router state if storage is unavailable.
    }
  }

  const specs = [
    { icon: BedDouble, label: property.bedrooms ? `${property.bedrooms} Beds` : '-' },
    { icon: Bath, label: property.bathrooms ? `${property.bathrooms} Baths` : '-' },
    { icon: Maximize, label: formatArea(property.area) || '-' },
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.025, y: -6 }}
      viewport={{ once: true }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-mist-200 bg-white transition-shadow duration-300 card-shadow hover:shadow-[0_28px_60px_-22px_rgba(11,25,44,0.3)]"
      aria-label={property.title}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist-100">
        <motion.img
          src={property.image}
          alt={property.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onError={(event) => {
            if (!event.currentTarget.dataset.fallback) {
              event.currentTarget.dataset.fallback = '1'
              event.currentTarget.src = LOCAL_PHOTOS[index % LOCAL_PHOTOS.length]
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-900 backdrop-blur">
          {property.category}
        </span>

        <span className="absolute bottom-[10px] left-3 right-3 text-base leading-tight font-extrabold text-white drop-shadow-sm text-balance pointer-events-none">
          {formatRWF(property.price, property.currency)}
          {property.category === 'Rent' && (
            <span className="text-[11px] font-semibold text-white/85"> /month</span>
          )}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div>
          <p className="label-caps">{property.type}</p>
          <h3 className="mt-1 font-display text-[16px] font-semibold leading-snug text-navy-900 truncate">
            {property.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-[13px] text-body break-words">
            <MapPin size={13} className="shrink-0 text-navy-600" />
            {property.location}
            {property.city ? `, ${property.city}` : ''}
          </p>
        </div>

        <p className="line-clamp-2 text-[12.5px] leading-relaxed text-body-light break-words">
          {property.description}
        </p>

        <div className="mt-auto grid grid-cols-3 gap-1">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="flex flex-col items-center gap-0.5 rounded-2xl bg-mist-50 px-0.5 py-1 text-center transition-colors group-hover:bg-mist-100 tap-target"
              aria-label={spec.label}
            >
              <spec.icon size={13} className="text-navy-700" aria-hidden="true" />
              <span className="text-[10px] font-semibold text-body truncate">{spec.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-mist-200 p-2.5 pt-2">
        <Link
          to={`/properties/${property.id}`}
          state={{ property }}
          onClick={saveSelectedProperty}
          className="block w-full rounded-full border border-navy-900 bg-navy-900 px-4 py-1.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-navy-900 tap-target"
        >
          View details <ArrowRight size={12} className="ml-1.5 inline" />
        </Link>
      </div>
    </motion.article>
  )
}
