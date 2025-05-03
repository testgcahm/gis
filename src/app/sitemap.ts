import { baseImage, baseUrl } from '@/components/utils'
import type { MetadataRoute } from 'next'

// Helper to fetch all events
async function fetchEvents() {
    try {
        const apiUrl = `${baseUrl}api/events`;
        const res = await fetch(apiUrl);
        if (!res.ok) return [];
        const data = await res.json();
        return data.eventsArray ?? [];
    } catch {
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        {
            url: `[${baseUrl}]`,
            lastModified: new Date(),
            priority: 1,
            images: baseImage
        },
        {
            url: `[${baseUrl}about]`,
            lastModified: new Date(),
            priority: 0.83,
            images: baseImage
        },
        {
            url: `[${baseUrl}events]`,
            lastModified: new Date(),
            priority: 0.83,
            images: baseImage
        },
        {
            url: `[${baseUrl}register]`,
            lastModified: new Date(),
            priority: 0.83,
            images: baseImage
        },
        {
            url: `[${baseUrl}admin]`,
            lastModified: new Date(),
            priority: 0.63,
            images: baseImage
        }
    ];

    // Fetch all events and add their dynamic URLs
    const events = await fetchEvents();
    const eventRoutes = events.map((event: any) => ({
        url: `${baseUrl}events/${event.slug}`,
        lastModified: new Date(),
        priority: 0.76,
        images: [
            `${baseUrl}_next/image?url=%2F${event.image}&w=1080&q=75`
        ]
    }));

    return [...staticRoutes, ...eventRoutes];
}