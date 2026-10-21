import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react'
import { PageTransition, Reveal } from '../components/motion'

const enquiries = ['Buy a property', 'Rent a property', 'Sell my property', 'Property management', 'Investment advice', 'Other']

export default function Contact() {
  const [searchParams] = useSearchParams()
  const selectedProperty = searchParams.get('property') || ''
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [enquiry, setEnquiry] = useState(selectedProperty ? 'Buy a property' : '')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (selectedProperty) setEnquiry('Buy a property')
  }, [selectedProperty])

  const submit = (event) => {
    event.preventDefault()
    const subject = selectedProperty
      ? `Viewing enquiry: ${selectedProperty}`
      : `TuraHomes enquiry: ${enquiry}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Enquiry: ${enquiry}`,
      selectedProperty ? `Property: ${selectedProperty}` : '',
      '',
      message,
    ].filter(Boolean).join('\n')

    window.location.href = `mailto:hello@turahomes.rw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <PageTransition>
      <section className="border-b border-mist-200 bg-mist-50">
        <div className="container-x py-14 text-center lg:py-20">
          <Reveal>
            <p className="label-caps">Contact TuraHomes</p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-[40px] font-semibold leading-tight sm:text-[52px] text-balance">
              Let’s talk about your next move
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-body text-balance">
              Speak with a Kigali property advisor about buying, selling, renting or managing a home.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <Reveal className="flex flex-col gap-8">
          <div>
            <p className="label-caps">Talk to our team</p>
            <h2 className="mt-3 font-display text-[30px] font-semibold leading-tight sm:text-[36px]">
              Local advice, from first viewing to handover
            </h2>
          </div>

          <div className="space-y-6">
            <a href="tel:+250788000111" className="flex items-start gap-4 text-body transition-colors hover:text-navy-900">
              <Phone size={21} className="mt-0.5 shrink-0 text-navy-700" />
              <span><strong className="block text-navy-900">Call or WhatsApp</strong>+250 788 000 111</span>
            </a>
            <a href="mailto:hello@turahomes.rw" className="flex items-start gap-4 text-body transition-colors hover:text-navy-900">
              <Mail size={21} className="mt-0.5 shrink-0 text-navy-700" />
              <span><strong className="block text-navy-900">Email</strong>hello@turahomes.rw</span>
            </a>
            <a href="https://maps.google.com/?q=KG+7+Ave,+Kacyiru,+Kigali,+Rwanda" target="_blank" rel="noreferrer" className="flex items-start gap-4 text-body transition-colors hover:text-navy-900">
              <MapPin size={21} className="mt-0.5 shrink-0 text-navy-700" />
              <span><strong className="block text-navy-900">Visit our office</strong>KG 7 Ave, Kacyiru, Kigali, Rwanda</span>
            </a>
            <div className="flex items-start gap-4 text-body">
              <Clock3 size={21} className="mt-0.5 shrink-0 text-navy-700" />
              <span><strong className="block text-navy-900">Office hours</strong>Monday–Friday, 8:00–18:00 CAT</span>
            </div>
          </div>

          <div className="border-l-2 border-navy-900 pl-5 text-sm leading-relaxed text-body">
            Prefer to see a property first? Tell us what you’re looking for and we’ll arrange a suitable viewing time.
          </div>

          <Link to="/properties" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy-900 underline-offset-4 hover:underline">
            Browse available properties <ArrowRight size={16} />
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          {sent ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="border border-emerald-200 bg-emerald-50 p-8 sm:p-10">
              <Send size={25} className="text-emerald-700" />
              <h2 className="mt-5 font-display text-2xl font-semibold text-emerald-800">Your email draft is ready</h2>
              <p className="mt-3 leading-relaxed text-body">Your email app has opened with the enquiry details. Send it when you are ready, and our advisors will respond as soon as possible.</p>
              <button type="button" onClick={() => setSent(false)} className="mt-7 text-sm font-semibold text-navy-900 underline underline-offset-4">Send another enquiry</button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="border border-mist-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <CalendarDays size={21} className="text-navy-700" />
                <div><p className="font-display text-2xl font-semibold">Request a viewing or callback</p><p className="mt-1 text-sm text-body">We’ll help you take the next step.</p></div>
              </div>
              {selectedProperty && <p className="mt-6 border-l-2 border-navy-900 bg-mist-50 px-4 py-3 text-sm text-navy-900">Enquiring about: <strong>{selectedProperty}</strong></p>}
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-navy-900">Full name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border border-mist-200 px-4 py-3 font-normal text-body outline-none transition-colors focus:border-navy-700" /></label>
                <label className="text-sm font-semibold text-navy-900">Phone number<input required type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-2 w-full border border-mist-200 px-4 py-3 font-normal text-body outline-none transition-colors focus:border-navy-700" /></label>
                <label className="text-sm font-semibold text-navy-900">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-mist-200 px-4 py-3 font-normal text-body outline-none transition-colors focus:border-navy-700" /></label>
                <label className="text-sm font-semibold text-navy-900">How can we help?<select required value={enquiry} onChange={(event) => setEnquiry(event.target.value)} className="mt-2 w-full border border-mist-200 bg-white px-4 py-3 font-normal text-body outline-none transition-colors focus:border-navy-700"><option value="" disabled>Select an option</option>{enquiries.map((item) => <option key={item}>{item}</option>)}</select></label>
              </div>
              <label className="mt-5 block text-sm font-semibold text-navy-900">Message<textarea required rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell us your preferred location, budget or viewing time." className="mt-2 w-full resize-y border border-mist-200 px-4 py-3 font-normal leading-relaxed text-body outline-none transition-colors placeholder:text-body-light focus:border-navy-700" /></label>
              <button type="submit" className="mt-6 inline-flex items-center gap-2 border border-navy-900 bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy-900"><Send size={16} />Prepare email enquiry</button>
            </form>
          )}
        </Reveal>
      </section>
    </PageTransition>
  )
}
