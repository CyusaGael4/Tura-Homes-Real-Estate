import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes, useLocation, Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Properties from './pages/Properties'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import PropertyDetail from './pages/PropertyDetail'
import { PropertiesProvider, useProperties } from './context/PropertiesContext'
import { localPropertyCatalog } from './data/demoProperties'
import { PageTransition } from './components/motion'
import { useMemo } from 'react'
import { normalizeProperty } from './lib/properties'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PropertyDetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const { properties, loading } = useProperties()
  const selectedProperty =
    location.state?.property && String(location.state.property.id) === id
      ? location.state.property
      : null
  const savedProperty = useMemo(() => {
    try {
      const saved = sessionStorage.getItem(`turahomes:property:${id}`)
      const property = saved ? JSON.parse(saved) : null
      const normalized = normalizeProperty(property)
      return normalized && String(normalized.id) === id ? normalized : null
    } catch {
      return null
    }
  }, [id])

  const property = useMemo(
    () => {
      const fromList = properties.find((p) => String(p.id) === id)
      if (fromList) return normalizeProperty(fromList)

      if (selectedProperty) {
        const normalized = normalizeProperty(selectedProperty)
        if (normalized && String(normalized.id) === id) return normalized
      }

      if (savedProperty) {
        const normalized = normalizeProperty(savedProperty)
        if (normalized && String(normalized.id) === id) return normalized
      }

      return localPropertyCatalog.find((p) => String(p.id) === id) ?? null
    },
    [id, properties, selectedProperty, savedProperty],
  )

  if (!property && loading) {
    return (
      <PageTransition>
        <section className="container-x py-24"><p className="label-caps">Loading property details</p></section>
      </PageTransition>
    )
  }

  if (!property) return <NotFound />

  return <PropertyDetail property={property} isLoading={loading && !selectedProperty} />
}

function NotFound() {
  return (
    <PageTransition>
      <section className="container-x flex flex-col items-center py-32 text-center">
        <p className="font-display text-[96px] font-semibold leading-none text-navy-900">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">This page seems to be off the map</h1>
        <p className="mt-3 max-w-md text-body">
          The listing or page you were looking for may have been sold, rented or moved.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full border border-navy-900 bg-navy-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy-900"
        >
          Back to home
        </Link>
      </section>
    </PageTransition>
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <PropertiesProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">
            <AppRoutes />
          </div>
          <Footer />
        </div>
      </PropertiesProvider>
    </BrowserRouter>
  )
}
