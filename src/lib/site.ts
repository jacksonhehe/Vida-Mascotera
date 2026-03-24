import type { SeoMetadata } from '@/types/content'

const fallbackSiteUrl = 'https://vidamascotera.com'

export const siteConfig = {
  siteName: 'Vida Mascotera',
  defaultTitle: 'Vida Mascotera | Cuidado, bienestar y decisiones mas claras para tu mascota',
  defaultDescription:
    'Guias, comparativas y recomendaciones editoriales para cuidar mejor a perros y gatos con una mirada calida, util y confiable.',
  defaultImage:
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80',
  get siteUrl() {
    return import.meta.env.VITE_SITE_URL ?? fallbackSiteUrl
  },
}

export function buildCanonicalUrl(path = '/') {
  return new URL(path, siteConfig.siteUrl).toString()
}

export function buildSeo(meta: Partial<SeoMetadata>): SeoMetadata {
  return {
    title: meta.title ?? siteConfig.defaultTitle,
    description: meta.description ?? siteConfig.defaultDescription,
    image: meta.image ?? siteConfig.defaultImage,
    type: meta.type ?? 'website',
    canonicalPath: meta.canonicalPath ?? '/',
  }
}
