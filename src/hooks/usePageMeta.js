import { useEffect } from 'react'

export const SITE_NAME = 'TuraHomes Real Estate'
export const SITE_URL = 'https://turahomesrealestate.vercel.app'
export const SITE_DESCRIPTION =
  'TuraHomes Real Estate | buy, sell, rent and invest across Kigali, the Land of a Thousand Hills.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/chatgpt-image-sep-4-2026-11-26-17-am.jpg`

const setMeta = (attribute, key, content) => {
  if (!content) return
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const setCanonical = (href) => {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/**
 * Keeps the document head in sync with the current route so every page ships a
 * unique title, description and canonical URL for search engines and link previews.
 */
export default function usePageMeta({ title, description = SITE_DESCRIPTION, path = '/', image } = {}) {
  useEffect(() => {
    const fullTitle = title
      ? `${SITE_NAME} | ${title}`
      : `${SITE_NAME} | Houses, Apartments & Plots in Kigali`
    const url = `${SITE_URL}${path}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image || DEFAULT_OG_IMAGE)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setCanonical(url)
  }, [title, description, path, image])
}
