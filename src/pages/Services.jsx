import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ClipboardCheck, LineChart, Scale, ShieldCheck, Headset, FileSignature } from 'lucide-react'
import { PageTransition, Reveal, Stagger, StaggerItem } from '../components/motion'

const services = [
  {
    icon: ClipboardCheck,
    kicker: '01 — Oversight',
    title: 'Property Management',
    copy: 'Complete listing administration and maintenance workflows: tenant sourcing, rent collection, inspections, repairs and monthly owner reporting — all handled by a dedicated portfolio manager.',
    points: ['Tenant screening & leasing', 'Rent collection and reconciliation', 'Maintenance ticketing & inspections'],
    image: '/assets/mansion-kigali.jpg',
  },
  {
    icon: LineChart,
    kicker: '02 — Growth',
    title: 'Investment Advisory',
    copy: 'Helping clients locate premium, high-yield land and commercial opportunities in fast-growing sectors — with yield modelling, corridor analysis and off-market access across Rwanda.',
    points: ['Yield & appreciation modelling', 'Commercial and land sourcing', 'Off-market development plots'],
    image: '/assets/estate-lawn.jpg',
  },
  {
    icon: Scale,
    kicker: '03 — Compliance',
    title: 'Legal Consultation',
    copy: 'Secure transactional processing, title deed verification and localized compliance support — from RDB registration and notarised transfers to mortgage-ready documentation.',
    points: ['Title deed verification & search', 'Notarised transfers and contracts', 'RDB and local compliance support'],
    image: '/assets/green-bungalow.jpg',
  },
]

const process = [
  { icon: Headset, title: 'Discovery call', note: 'We map your budget, timeline and preferred neighbourhoods.' },
  { icon: FileSignature, title: 'Shortlist & viewings', note: 'Curated options, scheduled viewings and honest guidance.' },
  { icon: ShieldCheck, title: 'Secure closing', note: 'Due diligence, transfer and handover handled end to end.' },
]

export default function Services() {
  return (
    <PageTransition>
      <section className="border-b border-mist-200 bg-mist-50">
        <div className="container-x py-16 text-center">
          <Reveal>
            <p className="label-caps">Our Services</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-[38px] font-semibold leading-tight sm:text-[50px]">
              Everything a property journey needs, under one roof
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16.5px] leading-relaxed text-body">
              From management to legal closure, TuraHomes pairs local expertise with
              institutional-grade process so every transaction feels effortless and safe.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-12">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={0.05}>
            <motion.article
              className={`grid items-center gap-8 bg-white p-6 sm:p-7 lg:grid-cols-2 lg:gap-10 ${
                index % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
              }`}
            >
              <figure className="relative overflow-hidden rounded-[24px]">
                <img
                  src={service.image}
                  alt={`${service.title} by TuraHomes`}
                  loading="lazy"
                  className="h-[240px] w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-[300px]"
                />
                <span className="absolute left-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 text-navy-900 backdrop-blur">
                  <service.icon size={21} aria-hidden="true" />
                </span>
              </figure>

              <div className="px-1 py-2">
                <p className="label-caps">{service.kicker}</p>
                <h2 className="mt-3 font-display text-[30px] font-semibold leading-tight sm:text-[34px]">
                  {service.title}
                </h2>
                <p className="mt-4 text-[15.5px] leading-relaxed text-body">{service.copy}</p>

                <ul className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <motion.li
                      key={point}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.1 }}
                      className="flex items-start gap-3 text-[14.5px] font-medium text-navy-800"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-900" />
                      {point}
                    </motion.li>
                  ))}
                </ul>

                <motion.div whileHover={{ x: 5 }} className="mt-7">
                  <Link
                    to="/properties"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-navy-900 underline-offset-4 hover:underline"
                  >
                    Explore related listings <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </section>

      <section className="container-x pb-2">
        <Reveal>
          <div className="bg-white p-8 sm:p-14">
            <h2 className="font-display text-[30px] font-semibold text-navy-900 sm:text-[36px]">
              How we work with you
            </h2>
            <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
              {process.map((step) => (
                <StaggerItem key={step.title}>
                  <div className="h-full bg-white p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-navy-900 tap-target">
                      <step.icon size={22} aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">{step.note}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
