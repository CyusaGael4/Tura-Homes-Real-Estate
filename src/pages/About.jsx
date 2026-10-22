import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Users } from 'lucide-react'
import CountUp from '../components/CountUp'
import { PageTransition, Reveal, Stagger, StaggerItem } from '../components/motion'
import aboutImage from '../../assets/chatgpt-image-sep-4-2026-11-26-17-am.jpg'

const values = [
  {
    title: 'Transparency',
    copy: 'Verified listings, honest pricing and clear documentation at every step, with no hidden fees or surprises at the closing table.',
  },
  {
    title: 'Excellence',
    copy: 'Institutional-grade process applied to every transaction, from professional photography and valuation to notarised transfer.',
  },
  {
    title: 'Community-Driven',
    copy: 'We invest in the neighbourhoods we serve, supporting local agents, builders and the families who put down roots there.',
  },
]

const stats = [
  { value: 300, label: 'Active listings' },
  { value: 200, label: 'Licensed agents' },
  { value: 15, label: 'Kigali neighbourhoods' },
  { value: 1200, label: 'Closed transactions' },
]

export default function About() {
  return (
    <PageTransition>
      {/* Brand story */}
      <section className="container-x grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <Reveal>
            <p className="label-caps">About TuraHomes</p>
            <h1 className="mt-4 font-display text-[38px] font-semibold leading-[1.1] sm:text-[50px]">
              A Kigali real estate brand built on transparency
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 text-[16.5px] leading-relaxed text-body">
              TuraHomes Real Estate was founded in Kigali with one conviction: buying, selling and
              renting property should be a documented, predictable and dignified experience. We pair
              deep local knowledge of Rwanda’s hills and neighbourhoods with modern, data-driven
              practice.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 text-[16.5px] leading-relaxed text-body">
              Today our team covers more than fifteen Kigali neighbourhoods, from Nyarutarama and
              Kimihurura to Gisozi, Rusororo and the airport corridor, and we are expanding across
              Rwanda, one verified listing at a time. Our proudest work is helping families anchor
              down roots in pristine neighbourhoods they can call home for decades.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/properties"
                  className="inline-flex items-center gap-2 rounded-full border border-navy-900 bg-navy-900 px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-white hover:text-navy-900"
                >
                  Browse our portfolio <ArrowRight size={17} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-mist-200 bg-white px-7 py-3.5 text-[14.5px] font-semibold text-navy-900 transition-colors hover:bg-mist-50"
                >
                  Work with us
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[32px] border border-mist-200 card-shadow-lg">
            <img
              src={aboutImage}
              alt="TuraHomes about us image"
              className="h-[320px] w-full object-cover sm:h-[420px]"
            />
          </div>
          <div className="absolute -bottom-6 right-6 rounded-2xl border border-mist-200 bg-white px-6 py-5 card-shadow">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-body-light">
              Serving Rwanda since
            </p>
            <p className="mt-1 font-display text-3xl font-semibold text-navy-900">2018</p>
          </div>
        </motion.div>
      </section>

      {/* Mission matrix */}
      <section className="container-x pb-2 pt-10">
        <Reveal className="max-w-2xl">
          <p className="label-caps">Our mission matrix</p>
          <h2 className="mt-3 font-display text-[32px] font-semibold leading-tight sm:text-[40px]">
            Three principles behind every listing
          </h2>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((value, index) => (
            <StaggerItem key={value.title}>
              <div className="relative h-full px-8 py-4">
                <span className="absolute right-8 top-0 font-display text-[54px] font-bold leading-none text-navy-900/20" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-body">{value.copy}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Stats */}
      <section className="container-x pt-12">
        <Reveal>
          <div className="grid gap-8 rounded-[32px] border border-mist-200 bg-mist-50 px-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl font-semibold text-navy-900">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-2 text-sm font-medium text-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Closing note */}
      <section className="container-x py-14">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <Users size={26} className="text-navy-600" />
          <p className="max-w-3xl font-display text-[24px] font-medium leading-relaxed text-navy-900 sm:text-[30px]">
            “Whether you are a first-time buyer, a returning investor or a family relocating to
            Kigali, our promise is the same: honest advice, verified property and a team that stays
            with you until the keys are in your hand.”
          </p>
          <p className="label-caps">The TuraHomes Team, Kigali, Rwanda</p>
        </Reveal>
      </section>
    </PageTransition>
  )
}
