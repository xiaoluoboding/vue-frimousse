import { useHead } from '@vueuse/head'
import type { MaybeRef } from '@vueuse/core'

export interface SEOMetadata {
  title?: string
  description?: string
  keywords?: string
  author?: string
  image?: string
  url?: string
  siteName?: string
  type?: 'website' | 'article' | 'product' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  locale?: string
  canonical?: string
}

export function useSEO(metadata: MaybeRef<SEOMetadata>) {
  const defaultMetadata: SEOMetadata = {
    title: 'Vue Frimousse',
    description:
      'Vue Frimousse is an open-source, lightweight, unstyled, and composable emoji picker for Vue and Nuxt. Styles can be applied with CSS, Tailwind CSS, and more.',
    keywords: 'vue, nuxt, emoji, picker, component, typescript, composable, lightweight',
    author: 'Robert Shaw',
    image: 'https://vue-frimousse.robertshaw.id/og-image.png',
    url: 'https://vue-frimousse.robertshaw.id',
    siteName: 'Vue Frimousse',
    type: 'website',
    twitterCard: 'summary_large_image',
    locale: 'en_US'
  }

  useHead(() => {
    const meta = typeof metadata === 'object' && 'value' in metadata ? metadata.value : metadata
    const finalMetadata = { ...defaultMetadata, ...meta }

    return {
      title: finalMetadata.title,
      meta: [
        // Basic meta tags
        { name: 'description', content: finalMetadata.description },
        { name: 'keywords', content: finalMetadata.keywords },
        { name: 'author', content: finalMetadata.author },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: finalMetadata.locale?.split('_')[0] || 'en' },

        // Open Graph meta tags
        { property: 'og:title', content: finalMetadata.title },
        { property: 'og:description', content: finalMetadata.description },
        { property: 'og:image', content: finalMetadata.image },
        { property: 'og:url', content: finalMetadata.url },
        { property: 'og:site_name', content: finalMetadata.siteName },
        { property: 'og:type', content: finalMetadata.type },
        { property: 'og:locale', content: finalMetadata.locale },

        // Twitter Card meta tags
        { name: 'twitter:card', content: finalMetadata.twitterCard },
        { name: 'twitter:title', content: finalMetadata.title },
        { name: 'twitter:description', content: finalMetadata.description },
        { name: 'twitter:image', content: finalMetadata.image },

        // Additional SEO meta tags
        { name: 'theme-color', content: '#ffffff' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: finalMetadata.siteName }
      ],
      link: [
        // Canonical URL
        ...(finalMetadata.canonical ? [{ rel: 'canonical', href: finalMetadata.canonical }] : []),
        // Favicon and icons
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/icon.svg' },
        { rel: 'apple-touch-icon', href: '/icon.svg' }
      ],
      script: [
        // Structured data for better SEO
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: finalMetadata.siteName,
            description: finalMetadata.description,
            url: finalMetadata.url,
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            author: {
              '@type': 'Person',
              name: finalMetadata.author
            },
            keywords: finalMetadata.keywords,
            image: finalMetadata.image,
            programmingLanguage: 'TypeScript'
          })
        }
      ]
    }
  })
}

export default useSEO
