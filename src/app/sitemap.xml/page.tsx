// File: pages/sitemap.xml.ts
import { EventData } from '@/components/events/types'
import { baseUrl } from '@/components/utils'

const STATIC_PATHS = [
  '',
  'about',
  'contact',
  'register',
  'events',
  'admin',
]

export async function GET() {
  const apiUrl = `${baseUrl}/api/events`
  const fetchRes = await fetch(apiUrl, { cache: 'force-cache' })

  if (!fetchRes.ok) {
    console.error('Failed to fetch events:', fetchRes.statusText)
  }

  const { eventsArray }: { eventsArray: EventData[] } = await fetchRes.json()

  const urls = [
    ...STATIC_PATHS.map((path) => ({
      loc: `${baseUrl}/${path}`,
      lastmod: new Date().toISOString(),
      priority: path === '' ? '1.00' : '0.80',
    })),
    ...eventsArray.map(({ slug }) => ({
      loc: `${baseUrl}/events/${slug}`,
      lastmod: new Date().toISOString(),
      priority: '0.74',
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      ({ loc, lastmod, priority }) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
