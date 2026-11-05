import { Link } from 'react-router-dom'
import { PageTransition, Reveal } from '../components/motion'
import usePageMeta from '../hooks/usePageMeta'

const sections = [
  {
    title: 'Who we are',
    body: [
      'TuraHomes Real Estate ("TuraHomes", "we", "us") is a real estate agency operating from KG 7 Ave, Kacyiru, Kigali, Rwanda. We help clients buy, sell, rent, manage and invest in property across Kigali and the wider country.',
      'This policy explains what personal information we collect through this website and our advisory service, why we collect it, and the choices you have.',
    ],
  },
  {
    title: 'Information we collect',
    body: [
      'Information you give us directly: your name, phone number, email address, the property or service you are asking about, and any message you send through the contact form, email, phone or WhatsApp.',
      'Information collected automatically: basic technical data such as the pages you view, the device and browser you use, and the approximate region you connect from. We use this only to keep the site working and to understand which listings are useful.',
      'We do not ask for payment card details, national ID numbers or financial account information through this website.',
    ],
  },
  {
    title: 'How we use your information',
    body: [
      'To respond to your enquiry, arrange viewings, and share listings that match what you asked for.',
      'To prepare documentation for a transaction you have asked us to handle, such as a sale, rental or management agreement.',
      'To keep records of our correspondence and to meet legal, tax and notarisation obligations that apply to property transactions in Rwanda.',
      'To improve the website: understanding which pages and listings visitors find useful, and fixing problems.',
    ],
  },
  {
    title: 'Sharing your information',
    body: [
      'We share information only with people who need it to deliver the service you requested: our advisors and portfolio managers, the notary, bank or legal counsel involved in your transaction, and the property owner or landlord where a viewing or tenancy requires it.',
      'We do not sell your personal information. We do not share it with advertisers.',
      'We may disclose information where Rwandan law requires it, or where it is necessary to protect our legal rights.',
    ],
  },
  {
    title: 'Cookies and analytics',
    body: [
      'This website uses only the storage needed to operate: your browser may keep a small amount of session data so a property page can display the listing you clicked, and our hosting provider may keep standard server logs.',
      'We do not run advertising trackers. If we add analytics or advertising tools in future, we will update this policy and, where required, ask for your consent first.',
    ],
  },
  {
    title: 'How long we keep information',
    body: [
      'Enquiries that do not lead to a transaction are kept for up to 24 months so we can pick the conversation back up if you return.',
      'Records relating to a completed sale, purchase, lease or management agreement are kept for the period required by Rwandan property, tax and anti-money-laundering rules, and then deleted or anonymised.',
    ],
  },
  {
    title: 'Your rights',
    body: [
      'Under Rwanda’s data protection law you may ask us to confirm what personal data we hold about you, correct anything inaccurate, delete data we no longer have a lawful reason to keep, or object to a particular use of your data.',
      'To exercise any of these rights, email hello@turahomes.rw or call +250 788 000 111. We aim to respond within 30 days. If you are not satisfied with our response, you may raise the matter with the National Cyber Security Authority of Rwanda, which supervises personal data protection.',
    ],
  },
  {
    title: 'Security',
    body: [
      'We limit access to client information to the advisors working on your enquiry, keep our devices and accounts protected, and store documents in access-controlled systems. No transmission over the internet is completely secure, so please avoid sending sensitive documents by unencrypted email unless we ask you to.',
    ],
  },
  {
    title: 'Children',
    body: [
      'Our services are intended for adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has sent us information, contact us and we will delete it.',
    ],
  },
  {
    title: 'Changes to this policy',
    body: [
      'We may update this policy as our services or the law change. The date below shows the latest revision, and material changes will be announced on this page.',
    ],
  },
]

export default function Privacy() {
  usePageMeta({
    title: 'Privacy Policy',
    description:
      'How TuraHomes Real Estate collects, uses, shares and protects your personal information when you enquire about property in Kigali.',
    path: '/privacy',
  })

  return (
    <PageTransition>
      <section className="border-b border-mist-200 bg-mist-50">
        <div className="container-x py-14 lg:py-20">
          <Reveal>
            <p className="label-caps">Legal</p>
            <h1 className="mt-4 max-w-3xl font-display text-[38px] font-semibold leading-tight sm:text-[50px] text-balance">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-body break-words">
              What we collect when you browse listings or contact our team, why we collect it, and
              how you can control it.
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
                Contact us about privacy
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-body">
                Questions about this policy or your data can go to{' '}
                <a href="mailto:hello@turahomes.rw" className="font-semibold text-navy-900 underline underline-offset-4">
                  hello@turahomes.rw
                </a>{' '}
                or +250 788 000 111, Monday to Friday, 8:00–18:00 CAT.
              </p>
              <p className="mt-6 text-[15.5px] leading-relaxed text-body">
                See also our{' '}
                <Link to="/terms" className="font-semibold text-navy-900 underline underline-offset-4">
                  Terms of Service
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
