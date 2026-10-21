import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Bath, BedDouble, Maximize, MapPin, Phone, Mail } from 'lucide-react'
import { PageTransition, Reveal } from '../components/motion'
import { formatArea, formatRWF } from '../lib/properties'

export default function PropertyDetail({ property, isLoading = false }) {
  const specs = [
    { icon: BedDouble, label: property.bedrooms ? `${property.bedrooms} Beds` : '—' },
    { icon: Bath, label: property.bathrooms ? `${property.bathrooms} Baths` : '—' },
    { icon: Maximize, label: formatArea(property.area) || '—' },
  ]

  return (
    <PageTransition>
      <section className="container-x flex flex-col gap-10 py-12">
        <Link to="/properties" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy-900 underline-offset-4 hover:underline">
          <ArrowLeft size={16} /> Back to properties
        </Link>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-mist-200 bg-mist-100 card-shadow-lg">
            <motion.img
              src={property.image}
              alt={property.title}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              decoding="async"
              onError={(event) => {
                if (!event.currentTarget.dataset.fallback) {
                  event.currentTarget.dataset.fallback = '1'
                  event.currentTarget.src = '/assets/luxury-villa.jpg'
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
          </div>

          <Reveal className="flex flex-col gap-5">
            <p className="label-caps">{isLoading ? 'Loading property' : `${property.category} · ${property.type}`}</p>

            <h1 className="font-display text-[34px] font-semibold leading-tight sm:text-[44px] text-balance">
              {property.title}
            </h1>

            <div className="flex items-start gap-3 text-body break-words">
              <MapPin size={17} className="shrink-0 text-navy-600" />
              <span>
                {property.location}
                {property.city ? `, ${property.city}` : ''}
              </span>
            </div>

            <p className="font-bold text-navy-900">
              {formatRWF(property.price, property.currency)}
              {property.category === 'Rent' && (
                <span className="font-semibold text-body"> /month</span>
              )}
            </p>

            <div>
              <p className="label-caps">About this property</p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-body break-words">
              {property.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-mist-200 pt-5">
              <div className="flex items-center justify-between gap-3">
                <p className="label-caps">Property details</p>
                <span className="text-xs font-semibold text-emerald-700">{property.status || 'Available'}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex flex-col items-center gap-1 rounded-2xl bg-white px-2 py-3 text-center tap-target"
                  >
                    <spec.icon size={18} className="text-navy-700" aria-hidden="true" />
                    <span className="text-[12px] font-semibold text-body truncate">
                      {spec.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <section className="grid gap-8 border-y border-mist-200 bg-mist-50 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-10">
            <div>
              <p className="label-caps">Private viewings</p>
              <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-navy-900 sm:text-[34px]">
                See {property.title} in person
              </h2>
              <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-body">
                Tell us your preferred day and time. A TuraHomes advisor will confirm availability,
                answer your questions and guide you through the viewing.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/contact?property=${encodeURIComponent(property.title)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy-900 tap-target"
                >
                  Arrange a viewing <ArrowRight size={16} />
                </Link>
                <a
                  href={`mailto:hello@turahomes.rw?subject=Enquiry about ${encodeURIComponent(property.title)}`}
                  className="inline-flex items-center gap-2 rounded-full border border-mist-200 bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-mist-100 tap-target"
                >
                  <Mail size={16} /> Email an advisor
                </a>
              </div>
            </div>
            <aside className="border-l-0 border-mist-200 pt-1 lg:border-l lg:pl-8">
              <p className="label-caps">Speak to an advisor</p>
              <a href="tel:+250788000111" className="mt-3 flex items-center gap-3 text-lg font-semibold text-navy-900 hover:underline">
                <Phone size={19} className="text-navy-700" /> +250 788 000 111
              </a>
              <p className="mt-3 text-sm leading-relaxed text-body">Available Monday–Friday, 8:00–18:00 CAT. We can also discuss financing, documentation and next steps.</p>
            </aside>
          </section>
        </Reveal>
      </section>
    </PageTransition>
  )
}
