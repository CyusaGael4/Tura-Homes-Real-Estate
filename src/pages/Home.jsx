import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Handshake, MapPin } from 'lucide-react'
import FilterHub from '../components/FilterHub'
import CountUp from '../components/CountUp'
import PropertyCard from '../components/PropertyCard'
import { PageTransition, Reveal, Stagger, StaggerItem } from '../components/motion'
import { useProperties } from '../context/PropertiesContext'
import usePageMeta from '../hooks/usePageMeta'
import { withDistributedPhotos } from '../lib/properties'

const achievements = [
  {
    icon: FileText,
    value: 300,
    label: 'Listings',
    note: 'Verified and updated weekly',
  },
  {
    icon: Handshake,
    value: 700,
    suffix: '+',
    label: 'Transactions',
    note: 'Closed with clients since 2018',
  },
  {
    icon: MapPin,
    value: 15,
    label: 'Kigali Neighbourhoods covered',
    note: 'From Nyarutarama to Rusororo',
  },
]

export default function Home() {
  const { properties, loading } = useProperties()

  usePageMeta({
    description:
      'Find your perfect home in Kigali. Browse verified houses, apartments, villas and land to buy, rent or invest in across Nyarutarama, Kacyiru and 15 Kigali neighbourhoods.',
    path: '/',
  })

  const featured = useMemo(() => {
    const ordered = properties
      .filter((p) => p.featured)
      .concat(properties.filter((p) => !p.featured))
    return withDistributedPhotos(ordered.slice(0, 3), [
      '/assets/luxury-villa.jpg',
      '/assets/hero-estate.jpg',
    ])
  }, [properties])

  return (
    <PageTransition>
      <div>
        {/* Hero Section with Restructured Text Layout and Deep Native Curve */}
        <section 
          className="relative h-[calc(100vh_+_120px)] min-h-[750px] w-full flex flex-col justify-between"
          style={{
            clipPath: 'ellipse(140% 100% at 50% 0%)'
          }}
        >
          {/* Background Layer */}
          <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/assets/chatgpt-image-sep-4-2026-11-26-17-am.jpg"
              alt="Modern residential building in Kigali with landscaped gardens and paved street frontage"
              className="h-full w-full object-cover contrast-110 saturate-110 brightness-[0.85]"
              loading="eager"
              decoding="async"
              onError={(event) => {
                if (!event.currentTarget.dataset.fallback) {
                  event.currentTarget.dataset.fallback = '1'
                  event.currentTarget.src = '/assets/mansion-kigali.jpg'
                }
              }}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Top layout navbar spacer */}
          <div className="h-[76px] flex-shrink-0" />

          {/* Restructured Main Hero Content to match reference design */}
          <div className="container-x relative z-10 flex flex-grow flex-col items-center justify-center text-center pt-4 pb-48">
            <h1 className="font-display text-[38px] font-semibold leading-[1.15] tracking-tight text-white sm:text-[48px] lg:text-[56px] max-w-4xl text-balance">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Find your perfect home in
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                the Land of a Thousand Hills.
              </motion.span>
            </h1>

            {/* FilterHub positioned exactly underneath the main title */}
            <div className="w-full max-w-4xl mt-10">
              <FilterHub />
            </div>

            {/* Sub-text positioned below the FilterHub at the bottom of the banner */}
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-2xl text-[16px] md:text-[18px] font-medium text-white/95 drop-shadow-sm text-balance">
                Buy, sell, rent, and invest across Kigali with TuraHomes Real Estate.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Achievements Section - Sits cleanly underneath the hero curve in natural layout flow */}
        <section className="container-x mt-6 pb-10">
          <Stagger className="grid gap-5 md:grid-cols-3">
            {achievements.map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex h-full items-center gap-5 rounded-3xl border border-mist-200 bg-mist-50 p-8">
                  <item.icon
                    size={52}
                    strokeWidth={1.4}
                    className="shrink-0 text-navy-900"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-4xl font-semibold text-navy-900">
                      <CountUp value={item.value} suffix={item.suffix} decimals={item.decimals} />
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-navy-800 truncate">{item.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-body-light truncate-2">{item.note}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Featured listings */}
        <section className="container-x pt-16">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label-caps">Handpicked for you</p>
              <h2 className="mt-3 font-display text-[34px] font-semibold leading-tight sm:text-[40px] text-balance">
                Featured properties in Kigali
              </h2>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-body break-words text-balance">
                Every listing is inspected, documented and photographed by our team before it reaches
                this page.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 rounded-full border border-navy-900 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white tap-target"
              >
                View all listings <ArrowRight size={16} />
              </Link>
            </motion.div>
          </Reveal>

          {loading ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[430px] animate-pulse rounded-3xl bg-mist-100" aria-hidden="true" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>


        {/* Contact us */}
        <section className="container-x pt-16 pb-10">
          <Reveal className="rounded-3xl border border-mist-200 bg-mist-50 p-8 text-center sm:p-12">
            <p className="label-caps">Get in touch</p>
            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight sm:text-[34px] text-balance">
              Have questions? Talk to a TuraHomes advisor
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-body break-words text-balance">
              Whether you are buying, selling, renting or investing, our team is ready to help you
              find the right property in Kigali.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="mt-6 inline-block">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white hover:text-navy-900 tap-target"
              >
                Contact us <ArrowRight size={17} />
              </Link>
            </motion.div>
          </Reveal>
        </section>
      </div>
    </PageTransition>
  )
}
