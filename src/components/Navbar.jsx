import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'Our Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

function Logo() {
  return (
    <Link to="/" className="group flex items-center" aria-label="TuraHomes home">
      <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="block">
        <img
          src="/assets/logo.png"
          alt="TuraHomes Real Estate"
          className="h-12 w-auto sm:h-[62px]"
        />
      </motion.span>
    </Link>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && mobileOpen) setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <>
      <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`sticky top-0 z-40 border-b bg-white/90 backdrop-blur-md transition-colors duration-300 ${scrolled ? 'border-mist-200 shadow-[0_10px_30px_-24px_rgba(11,25,44,0.6)]' : 'border-transparent'}`}
        >
          <div className="container-x flex h-[76px] items-center justify-between gap-6">
            <Logo />

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className="relative px-4 py-2"
                >
                  {({ isActive }) => (
                    <>
                      <motion.span
                        whileHover={{ y: -1 }}
                        className={`text-[14.5px] font-semibold transition-colors ${isActive ? 'text-navy-900' : 'text-body hover:text-navy-900'}`}
                      >
                        {link.label}
                      </motion.span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3 -bottom-[6px] h-[2px] rounded-full bg-navy-900"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-mist-200 bg-white text-navy-900 transition-colors hover:bg-mist-50 lg:hidden tap-target"
              >
                <span className="relative h-[22px] w-[22px]" aria-hidden="true">
                  <motion.span
                    animate={mobileOpen ? { y: 0, rotate: 45 } : { y: -6, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-1/2 h-0.5 w-full rounded-full bg-current"
                  />
                  <motion.span
                    animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-1/2 h-0.5 w-full rounded-full bg-current"
                  />
                  <motion.span
                    animate={mobileOpen ? { y: 0, rotate: -45 } : { y: 6, rotate: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-1/2 h-0.5 w-full rounded-full bg-current"
                  />
                </span>
              </button>
            </div>
          </div>
          <AnimatePresence initial={false}>
            {mobileOpen && (
              <motion.nav
                id="mobile-menu"
                key="mobile-menu"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-x-0 top-full border-b border-mist-200 bg-white shadow-lg lg:hidden"
              >
                <div className="container-x flex flex-col py-2">
                  {LINKS.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors ${
                          isActive
                            ? 'bg-mist-50 text-navy-900'
                            : 'text-body hover:bg-mist-50 hover:text-navy-900'
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
      </motion.header>
    </>
  )
}