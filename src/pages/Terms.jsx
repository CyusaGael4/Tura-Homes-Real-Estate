import { Link } from 'react-router-dom'
import { PageTransition, Reveal } from '../components/motion'
import usePageMeta from '../hooks/usePageMeta'

const sections = [
  {
    title: 'Agreement to these terms',
    body: [
      'These Terms of Service govern your use of the TuraHomes Real Estate website and the advisory services we provide. By browsing this site, submitting an enquiry or instructing us, you agree to these terms. If you do not agree, please do not use the site or our services.',
    ],
  },
  {
    title: 'About TuraHomes',
    body: [
      'TuraHomes Real Estate is a real estate agency based at KG 7 Ave, Kacyiru, Kigali, Rwanda. We act as an agent for buyers, sellers, landlords and tenants, and we provide property management, investment advisory and legal coordination support.',
      'Unless we confirm otherwise in writing, we represent the party who has instructed us and we are not the owner of the properties listed on this site.',
    ],
  },
  {
    title: 'Listings and information on this site',
    body: [
      'We work to keep every listing accurate, but property details, photographs, floor areas and availability can change without notice. Prices are quoted in Rwandan francs (RWF) and exclude taxes, notary fees and statutory charges unless stated otherwise.',
      'A listing on this site is an invitation to enquire, not a binding offer. Nothing here constitutes a contract of sale, a lease, or an assurance that a property is still available.',
    ],
  },
  {
    title: 'Viewings and enquiries',
    body: [
      'You agree to give accurate contact details when you enquire, so we can confirm viewings and follow up on your request.',
      'Viewings are arranged subject to the owner’s or landlord’s availability. If a property is sold or let before a viewing, we will tell you and suggest alternatives.',
      'You are responsible for your own conduct during a viewing and for any damage caused at the property.',
    ],
  },
  {
    title: 'Offers, fees and payments',
    body: [
      'Any offer you make is subject to the owner’s acceptance and to written confirmation from us. Reservation, agency and management fees are quoted separately before you commit, and are payable in Rwandan francs.',
      'We do not accept cash payments for agency fees without a written receipt, and we never ask for payment through the contact form on this site.',
    ],
  },
  {
    title: 'Your responsibilities',
    body: [
      'You agree not to misuse this website: no scraping, automated harvesting of listings, attempts to access restricted areas, uploading malicious code, or using our content to mislead others.',
      'Where you instruct us on a transaction, you agree to provide the documents we reasonably need, such as identification and proof of funds, for compliance with Rwandan law.',
    ],
  },
  {
    title: 'Intellectual property',
    body: [
      'The TuraHomes name, logo, photography, listing descriptions and site design are owned by us or licensed to us. You may share links to our listings, but you may not reproduce our photographs or descriptions for commercial use without written permission.',
    ],
  },
  {
    title: 'Third-party links and services',
    body: [
      'This site may link to third-party maps, email clients or partner websites. We do not control those services and are not responsible for their content or privacy practices.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      'We provide this website and its listing information on an "as available" basis. To the extent permitted by Rwandan law, we are not liable for indirect or consequential losses arising from your use of the site, or from decisions you take based on listing information alone.',
      'Nothing in these terms limits liability for fraud, or for any liability that cannot lawfully be excluded.',
    ],
  },
  {
    title: 'Governing law',
    body: [
      'These terms are governed by the laws of Rwanda. Any dispute will first be discussed in good faith with our team; if it is not resolved, it will be submitted to the competent courts of Kigali.',
    ],
  },
  {
    title: 'Changes to these terms',
    body: [
      'We may update these terms as our services or the law change. The date below shows the latest revision, and continuing to use the site after a change means you accept the updated terms.',
    ],
  },
]

export default function Terms() {
  usePageMeta({
    title: 'Terms of Service',
    description:
      'The terms that apply when you use the TuraHomes Real Estate website, enquire about a listing, or instruct us to handle a property transaction in Kigali.',
    path: '/terms',
  })

  return (
    <PageTransition>
      <section className="border-b border-mist-200 bg-mist-50">
        <div className="container-x py-14 lg:py-20">
          <Reveal>
            <p className="label-caps">Legal</p>
            <h1 className="mt-4 max-w-3xl font-display text-[38px] font-semibold leading-tight sm:text-[50px] text-balance">
              Terms of Service
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-body break-words">
              The ground rules for using our website and working with the TuraHomes team.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-body-light">
              Last updated 4 November 2026
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-12 lg:py-16">
        <div className="max-w-3xl">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={Math.min(index * 0.03, 0.15)}>
              <article className="border-t border-mist-200 py-8 first:border-t-0 first:pt-0">
                <h2 className="font-display text-[22px] font-semibold leading-snug text-navy-900 sm:text-[26px]">
                  {section.title}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-[15.5px] leading-relaxed text-body break-words">
                    {paragraph}
                  </p>
                ))}
              </article>
            </Reveal>
          ))}

          <Reveal>
            <div className="border-t border-mist-200 pt-8">
              <h2 className="font-display text-[22px] font-semibold text-navy-900 sm:text-[26px]">
                Contact us about these terms
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-body">
                Write to{' '}
                <a href="mailto:hello@turahomes.rw" className="font-semibold text-navy-900 underline underline-offset-4">
                  hello@turahomes.rw
                </a>{' '}
                or call +250 788 000 111, Monday to Friday, 8:00–18:00 CAT.
              </p>
              <p className="mt-6 text-[15.5px] leading-relaxed text-body">
                See also our{' '}
                <Link to="/privacy" className="font-semibold text-navy-900 underline underline-offset-4">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
