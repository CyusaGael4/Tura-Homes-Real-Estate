import { createContext, useContext } from 'react'
import { demoProperties, newPhotoProperties } from '../data/demoProperties'
import { withDistributedPhotos } from '../lib/properties'

const PropertiesContext = createContext(null)
const properties = withDistributedPhotos([...demoProperties, ...newPhotoProperties])
const propertiesContextValue = { properties, loading: false }

export function PropertiesProvider({ children }) {
  return (
    <PropertiesContext.Provider value={propertiesContextValue}>
      {children}
    </PropertiesContext.Provider>
  )
}

export function useProperties() {
  const ctx = useContext(PropertiesContext)
  if (!ctx) throw new Error('useProperties must be used inside <PropertiesProvider>')
  return ctx
}

export function filterProperties(list, { category = '', type = '', location = '' } = {}) {
  const cat = category.trim().toLowerCase()
  const typ = type.trim().toLowerCase()
  const loc = location.trim().toLowerCase()

  return list.filter((p) => {
    const matchesCategory = !cat || String(p.category).toLowerCase() === cat
    const matchesType = !typ || String(p.type).toLowerCase() === typ
    const matchesLocation =
      !loc ||
      String(p.location).toLowerCase().includes(loc) ||
      String(p.city || '').toLowerCase().includes(loc) ||
      String(p.title).toLowerCase().includes(loc)
    return matchesCategory && matchesType && matchesLocation
  })
}
