import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import CustomSelect from './CustomSelect'
import { PROPERTY_CATEGORIES, PROPERTY_TYPES } from '../lib/properties'

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
      className={`grid w-full gap-3 rounded-none bg-white p-4 shadow-[0_8px_24px_rgba(11,25,44,0.18)] sm:p-2 lg:rounded-none ${compact ? 'sm:grid-cols-[1fr_1fr_1.3fr_auto]' : 'md:grid-cols-[1fr_1fr_1.3fr_auto]'}`}
      role="search"
      aria-label="Property search filters"
    >
      <CustomSelect
        value={category}
        options={PROPERTY_CATEGORIES}
        onChange={setCategory}
        placeholder="Buy, Rent, Sell, Invest"
      />
      <CustomSelect
        value={type}
        options={PROPERTY_TYPES}
        onChange={setType}
        placeholder="Apartment, House, Villa, Commercial, Land"
      />
      <div className="min-w-0">
        <div className="flex h-12 items-center gap-3 rounded-xl border border-mist-200 bg-white px-4 transition-colors focus-within:border-navy-700 hover:border-navy-100 tap-target">
          <input
            id="filter-location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Nyarutarama, Kacyiru"
            className="h-full min-w-0 flex-1 bg-transparent text-[14.5px] font-medium text-navy-900 placeholder:font-medium placeholder:text-body-light focus:outline-none break-words"
          />
        </div>
      </div>
      <motion.button
        type="submit"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
        className="flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-navy-900 px-6 text-[13px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_12px_26px_-14px_rgba(11,25,44,0.95)] transition-colors hover:bg-navy-800 sm:w-auto tap-target"
      >
        Search
        <Search size={18} strokeWidth={3} aria-hidden="true" className="shrink-0" />
      </motion.button>
    </motion.form>
  )
}