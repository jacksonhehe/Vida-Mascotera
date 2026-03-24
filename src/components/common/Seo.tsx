import { Helmet } from 'react-helmet-async'
import { buildCanonicalUrl, buildSeo, siteConfig } from '@/lib/site'
import type { SeoMetadata } from '@/types/content'

export function Seo({ title, description, image, type, canonicalPath }: Partial<SeoMetadata>) {
  const meta = buildSeo({ title, description, image, type, canonicalPath })
  const canonical = buildCanonicalUrl(meta.canonicalPath)

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description" />
      <link href={canonical} rel="canonical" />
      <meta content={siteConfig.siteName} property="og:site_name" />
      <meta content={meta.title} property="og:title" />
      <meta content={meta.description} property="og:description" />
      <meta content={meta.type} property="og:type" />
      <meta content={canonical} property="og:url" />
      <meta content={meta.image} property="og:image" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={meta.title} name="twitter:title" />
      <meta content={meta.description} name="twitter:description" />
      <meta content={meta.image} name="twitter:image" />
      <html lang="es" />
    </Helmet>
  )
}
