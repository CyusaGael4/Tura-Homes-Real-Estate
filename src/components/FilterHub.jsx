import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, Search } from 'lucide-react'
import CustomSelect from './CustomSelect'
import { PROPERTY_CATEGORIES, PROPERTY_TYPES } from '../lib/properties'

/**
 * Floating filter hub: Property Category, Property Type and Property Location.
 * Submitting pushes the query onto the Properties feed so both stay in sync.
 */
export default function FilterHub({ initial = {}, compact = false }) {
  const navigate = useNavigate()
  const [category, setCategory] = useState(initial.category || '')
  const [type, setType] = useState(initial.type || '')
  const [location, setLocation] = useState(initial.location || '')

  const submit = (event) => {
    event?.preventDefault?.()
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (type) params.set('type', type)
    if (location.trim()) params.set('location', location.trim())
    const query = params.toString()
    navigate(`/properties${query ? `?${query}` : ''}`)
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`grid w-full gap-4 rounded-[28px] border border-mist-200 bg-white p-5 card-shadow sm:p-6 lg:rounded-full ${
        compact ? 'sm:grid-cols-[1fr_1fr_1.3fr_auto]' : 'md:grid-cols-[1fr_1fr_1.3fr_auto]'
      }`}
      role="search"
      aria-label="Property search filters"
    >
      <CustomSelect
        label="Property Category"
        value={category}
        options={PROPERTY_CATEGORIES}
        onChange={setCategory}
        placeholder="Buy, Rent, Invest…"
      />

      <CustomSelect
        label="Property Type"
        value={type}
        options={PROPERTY_TYPES}
        onChange={setType}
        placeholder="Apartment, Villa…"
      />

      <div className="min-w-0">
        <label
          htmlFor="filter-location"
          className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-body-light"
        >
          Property Location
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-mist-200 bg-white px-4 py-3.5 transition-colors focus-within:border-navy-700 hover:border-navy-100 tap-target">
          <MapPin size={20} className="shrink-0 text-navy-600" aria-hidden="true" />
          <input
            id="filter-location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Nyarutarama, Kacyiru"
            className="flex-1 bg-transparent text-[14.5px] font-medium text-navy-900 placeholder:font-medium placeholder:text-body-light focus:outline-none break-words"
          />
        </div>
      </div>

      <div className="flex items-end">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-navy-900 bg-navy-900 px-6 text-[15px] font-semibold text-white shadow-[0_18px_36px_-14px_rgba(11,25,44,0.95)] ring-4 ring-navy-900/10 transition-colors hover:bg-white hover:text-navy-900 sm:h-14 sm:w-14 sm:px-0 tap-target"
          aria-label="Search properties"
        >
          <Search size={24} strokeWidth={2.6} aria-hidden="true" />
          <span className="sm:hidden">Search Properties</span>
        </motion.button>
      </div>
    </motion.form>
  )
}
