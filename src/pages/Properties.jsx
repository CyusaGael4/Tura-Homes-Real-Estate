import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import CustomSelect from '../components/CustomSelect'
import PropertyCard from '../components/PropertyCard'
import { PageTransition, Reveal } from '../components/motion'
import { filterProperties, useProperties } from '../context/PropertiesContext'
import { PROPERTY_CATEGORIES, PROPERTY_TYPES } from '../lib/properties'

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { properties, loading } = useProperties()

  const category = searchParams.get('category') || ''
  const type = searchParams.get('type') || ''
  const location = searchParams.get('location') || ''

  const [categoryDraft, setCategoryDraft] = useState(category)
  const [typeDraft, setTypeDraft] = useState(type)
  const [locationDraft, setLocationDraft] = useState(location)

  useEffect(() => {
    setCategoryDraft(category)
    setTypeDraft(type)
    setLocationDraft(location)
  }, [category, type, location])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: false })
  }

  const results = useMemo(
    () => filterProperties(properties, { category, type, location }),
    [properties, category, type, location],
  )

  const hasFilters = Boolean(category || type || location)

  return (
    <PageTransition>
      <section className="border-b border-mist-200 bg-mist-50">
        <div className="container-x py-10">
          <Reveal>
            <p className="label-caps">Property feed</p>
            <h1 className="mt-3 max-w-2xl font-display text-[36px] font-semibold leading-tight sm:text-[46px] text-balance">
              Find a space that fits your life in Kigali
            </h1>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-body break-words text-balance">
              Search every live listing across Kigali’s neighbourhoods. Buy, rent, sell or invest
              with fully documented properties.
            </p>
          </Reveal>

          {/* Live filter bar stays in sync with the hero filter hub. */}
          <Reveal delay={0.15} className="relative z-50 mt-9">
            <div className="grid gap-4 rounded-[26px] border border-mist-200 bg-white p-5 card-shadow sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_auto]">
              <CustomSelect
                label="Property Category"
                value={categoryDraft}
                options={PROPERTY_CATEGORIES}
                onChange={(value) => {
                  setCategoryDraft(value)
                  updateParam('category', value)
                }}
                placeholder="Buy, Rent, Invest…"
              />
              <CustomSelect
                label="Property Type"
                value={typeDraft}
                options={PROPERTY_TYPES}
                onChange={(value) => {
                  setTypeDraft(value)
                  updateParam('type', value)
                }}
                placeholder="Apartment, Villa…"
              />
              <div className="min-w-0">
                <label
                  htmlFor="props-location"
                  className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-body-light"
                >
                  Property Location
                </label>
                <input
                  id="props-location"
                  type="text"
                  value={locationDraft}
                  onChange={(event) => setLocationDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') updateParam('location', locationDraft)
                  }}
                  onBlur={() => updateParam('location', locationDraft)}
                  placeholder="e.g. Kacyiru, Gisozi"
                  className="w-full rounded-xl border border-mist-200 bg-white px-4 py-3.5 text-[14.5px] font-medium text-navy-900 placeholder:font-medium placeholder:text-body-light transition-colors hover:border-navy-100 focus:border-navy-700 focus:outline-none break-words tap-target"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => {
                    setCategoryDraft('')
                    setTypeDraft('')
                    setLocationDraft('')
                    setSearchParams({})
                  }}
                  className="h-[50px] w-full rounded-full border border-mist-200 px-6 text-[14px] font-semibold text-navy-900 transition-colors hover:bg-mist-50 lg:w-auto tap-target"
                >
                  Reset
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold text-navy-900">
            <motion.span
              key={results.length}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-block"
            >
              {loading ? 'Loading listings…' : `${results.length} ${results.length === 1 ? 'property' : 'properties'}`}
            </motion.span>
            {hasFilters && !loading && (
              <span className="font-medium text-body-light"> matching your filters</span>
            )}
          </p>

          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setSearchParams({})}
              className="inline-flex items-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-navy-900 tap-target"
            >
              Clear all filters
            </motion.button>
          )}
        </div>



        {/* Empty state when filters match nothing. */}
        {!loading && results.length === 0 && properties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center rounded-3xl border border-dashed border-mist-200 bg-mist-50 px-8 py-20 text-center"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy-700 card-shadow tap-target">
              <SearchX size={24} />
            </span>
            <h2 className="mt-6 font-display text-2xl font-semibold">No properties match those filters</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-body break-words text-center">
              Try widening your search, clear the location or switch the category to see more of
              our Kigali portfolio.
            </p>
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="mt-7 rounded-full border border-navy-900 bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy-900 tap-target"
            >
              Browse all properties
            </button>
          </motion.div>
        )}

        {/* Truly empty database state. */}
        {!loading && properties.length === 0 && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center rounded-3xl border border-dashed border-mist-200 bg-mist-50 px-8 py-20 text-center"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy-700 card-shadow tap-target">
              <SearchX size={24} />
            </span>
            <h2 className="mt-6 font-display text-2xl font-semibold">No properties yet</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-body break-words text-center">
              There are no listings at the moment. Check back soon or contact our team to add your
              property.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy-900 tap-target"
            >
              Contact us
            </Link>
          </motion.div>
        )}

        {/* Loading skeleton for the results grid. */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading properties">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-[430px] animate-pulse rounded-3xl bg-mist-100" aria-hidden="true" />
            ))}
          </div>
        )}

        {/* Actual results. */}
        {!loading && results.length > 0 && (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {results.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} data-property-id={property.id} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </PageTransition>
  )
}
