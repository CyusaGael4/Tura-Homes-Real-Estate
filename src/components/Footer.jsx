import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'All Properties', to: '/properties' },
      { label: 'Buy in Kigali', to: '/properties?category=Buy' },
      { label: 'Rent in Kigali', to: '/properties?category=Rent' },
      { label: 'Investment Opportunities', to: '/properties?category=Invest' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Services', to: '/services' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy-900 text-white">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/assets/logo.png"
            alt="TuraHomes Real Estate"
            className="h-12 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            Transparent real estate across Rwanda — helping families, professionals and investors
            anchor down roots in pristine neighbourhoods.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="label-caps text-white/60">{col.title}</h4>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/85 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="label-caps text-white/60">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              KG 7 Ave, Kacyiru, Kigali, Rwanda
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-gold" />
              +250 788 000 111
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-gold" />
              hello@turahomes.rw
            </li>
          </ul>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-white/10"
      >
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/55 sm:flex-row">
          <p>© {new Date().getFullYear()} TuraHomes Real Estate. All rights reserved.</p>
          <p>Rwanda · The Land of a Thousand Hills</p>
        </div>
      </motion.div>
    </footer>
  )
}
