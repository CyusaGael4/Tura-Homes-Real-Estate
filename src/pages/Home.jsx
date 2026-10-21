import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Facebook, FileText, Instagram, Linkedin, MapPin, Sparkles, Users } from 'lucide-react'
import FilterHub from '../components/FilterHub'
import CountUp from '../components/CountUp'
import PropertyCard from '../components/PropertyCard'
import { PageTransition, Reveal, Stagger, StaggerItem } from '../components/motion'
import { useProperties } from '../context/PropertiesContext'
import { withDistributedPhotos } from '../lib/properties'

const achievements = [
  {
    icon: FileText,
    value: 300,
    label: 'Listings',
    note: 'Verified and updated weekly',
  },
  {
    icon: Users,
    value: 200,
    label: 'Real Estate Agents',
    note: 'Licensed professionals across Rwanda',
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
        {/* Hero */}
        <section className="relative [clip-path:inset(-100vh_0_-100vh_-100vw)] [overflow-x:clip] overflow-y-visible">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] overflow-hidden rounded-full bg-mist-100 blur-3xl"
          />
          <div className="container-x relative grid min-h-[calc(100svh_-_76px)] items-center gap-10 pb-8 pt-10 lg:grid-cols-2 lg:pt-14">
            <div>
              <h1 className="font-display text-[38px] font-semibold leading-[1.08] tracking-tight text-navy-900 sm:text-[48px] lg:text-[52px] text-balance">
                <motion.span
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  Finding Your
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.75, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-navy-600"
                >
                  “Perfect Space”
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  in the Land of
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  a Thousand Hills
                </motion.span>
              </h1>

              <Reveal delay={0.5}>
                <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-body break-words text-balance">
                  Buy, sell, rent, and invest across Kigali with Tura Homes — verified listings,
                  transparent pricing and a team that stays with you from first viewing to final
                  signature.
                </p>
              </Reveal>

              <Reveal delay={0.6}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/properties"
                      className="inline-flex items-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-7 py-3.5 text-[14.5px] font-semibold text-white shadow-[0_20px_38px_-18px_rgba(11,25,44,0.95)] transition-colors hover:bg-white hover:text-navy-900 tap-target"
                    >
                      Browse Properties
                      <ArrowRight size={17} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-2 rounded-full border border-mist-200 bg-white px-7 py-3.5 text-[14.5px] font-semibold text-navy-900 transition-colors hover:bg-mist-50 tap-target"
                    >
                      Our Services
                    </Link>
                  </motion.div>
                </div>
              </Reveal>
            </div>

          {/* Hero graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[36px] border border-mist-200 card-shadow-lg">
              <img
                src="/assets/luxury-villa.jpg"
                alt="Modern TuraHomes villa lit at dusk in Kigali"
                className="h-[300px] w-full object-cover sm:h-[380px] lg:h-[430px]"
                loading="eager"
                decoding="async"
                onError={(event) => {
                  if (!event.currentTarget.dataset.fallback) {
                    event.currentTarget.dataset.fallback = '1'
                    event.currentTarget.src = '/assets/mansion-kigali.jpg'
                  }
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="absolute -bottom-6 left-4 rounded-2xl border border-mist-200 bg-white px-5 py-4 card-shadow sm:left-8"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-body-light">
                Kigali market
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-navy-900">300+ listings</p>
              <p className="text-xs font-medium text-body">updated weekly</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -top-5 right-4 rounded-2xl border border-mist-200 bg-white px-5 py-4 card-shadow"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-body-light">
                Client rating
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-navy-900">4.9 / 5</p>
              <p className="text-xs font-medium text-body">across 1,200 transactions</p>
            </motion.div>
          </motion.div>
        </div>
        </section>

        {/* Search/filter bar — centered pill below the hero fold. */}
        <section className="container-x pb-2 pt-10">
          <div className="mx-auto max-w-4xl">
            <FilterHub />
          </div>
        </section>

        {/* Achievements */}
        <section className="container-x pt-10">
          <Stagger className="grid gap-5 md:grid-cols-3">
            {achievements.map((item) => (
              <StaggerItem key={item.label}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="flex h-full flex-col items-start gap-4 rounded-3xl border border-mist-200 bg-mist-50 p-8"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-navy-900 tap-target">
                    <item.icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-4xl font-semibold text-navy-900">
                      <CountUp value={item.value} />
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-navy-800 truncate">{item.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-body-light truncate-2">{item.note}</p>
                  </div>
                </motion.div>
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
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* Full-width CTA band */}
        <section className="pt-16">
          <Reveal>
            <div className="relative overflow-hidden bg-navy-900 px-6 py-14 text-center sm:px-16">
              <img
                src="/assets/hero-estate.jpg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-60"
                loading="eager"
                decoding="async"
                onError={(event) => {
                  if (!event.currentTarget.dataset.fallback) {
                    event.currentTarget.dataset.fallback = '1'
                    event.currentTarget.src = '/assets/estate-lawn.jpg'
                  }
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/75 to-navy-900/45"
              />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl font-display text-[32px] font-semibold leading-tight text-white sm:text-[42px] text-balance">
                  Ready to anchor down roots in a pristine neighbourhood?
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-white/75 break-words text-balance">
                  Talk to a TuraHomes advisor today and get a free valuation, shortlist and title-deed
                  review.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="mt-9 inline-block">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[14.5px] font-semibold text-navy-900 transition-colors hover:bg-navy-900 hover:text-white tap-target"
                  >
                    Meet TuraHomes <ArrowRight size={17} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Follow Us — compact strip: logo left, social icons right. */}
        <section className="container-x -mb-8 flex items-center justify-end py-4">
          <div className="flex items-center gap-3">
            <p className="font-display text-sm font-bold leading-none text-navy-900">Follow Us</p>
            <div className="flex items-center gap-1">
              <motion.a
                href="#"
                aria-label="TuraHomes on Facebook"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex h-11 w-11 items-center justify-center text-navy-900 transition-colors hover:text-navy-600 tap-target"
              >
                <Facebook size={20} strokeWidth={2} aria-hidden="true" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="TuraHomes on X"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex h-11 w-11 items-center justify-center text-navy-900 transition-colors hover:text-navy-600 tap-target"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                aria-label="TuraHomes on Instagram"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex h-11 w-11 items-center justify-center text-navy-900 transition-colors hover:text-navy-600 tap-target"
              >
                <Instagram size={20} strokeWidth={2} aria-hidden="true" />
              </motion.a>
              <motion.a
                href="#"
                aria-label="TuraHomes on LinkedIn"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="inline-flex h-11 w-11 items-center justify-center text-navy-900 transition-colors hover:text-navy-600 tap-target"
              >
                <Linkedin size={20} strokeWidth={2} aria-hidden="true" />
              </motion.a>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
