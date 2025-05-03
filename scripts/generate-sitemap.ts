// scripts/generate-sitemap.ts
import { writeFileSync } from 'fs';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../src/lib/firebase';
import 'dotenv/config';

const BASE_URL = 'https://gmc-islamic-society.vercel.app';
const STATIC_PATHS = [
  '',
  'about',
  'contact',
  'register',
  'events',
];

async function generateSitemap() {
  // Fetch all event slugs from Firestore
  const eventsCol = collection(db, 'events');
  const eventsSnapshot = await getDocs(eventsCol);
  const eventSlugs = eventsSnapshot.docs.map(doc => doc.data().slug).filter(Boolean);

  // Build XML
  const urls = [
    ...STATIC_PATHS.map(path => ({
      loc: `${BASE_URL}/${path}`,
      lastmod: new Date().toISOString(),
      priority: path === '' ? '1.00' : '0.80',
    })),
    ...eventSlugs.map(slug => ({
      loc: `${BASE_URL}/events/${slug}`,
      lastmod: new Date().toISOString(),
      priority: '0.74',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      ({ loc, lastmod, priority }) =>
        `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`
    )
    .join('')}\n</urlset>`;

  writeFileSync('public/sitemap.xml', xml);
  console.log('sitemap.xml generated!');
}

generateSitemap();
