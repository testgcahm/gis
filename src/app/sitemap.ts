import { baseImage, baseUrl } from '@/components/utils'
import type { MetadataRoute } from 'next'

// Helper to fetch all events
async function fetchEvents() {
    try {
        const apiUrl = `${baseUrl}/api/events`;
        const res = await fetch(apiUrl);
        if (!res.ok) return [];
        const data = await res.json();
        return data.eventsArray ?? [];
    } catch {
        return [];
    }
}

// Helper to escape XML entities
function escapeXml(str: string) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        {
            url: escapeXml(`${baseUrl}`),
            lastModified: new Date(),
            priority: 1,
            images: ['']
        },
        {
            url: escapeXml(`${baseUrl}/about`),
            lastModified: new Date(),
            priority: 0.83,
            images: ['']
        },
        {
            url: escapeXml(`${baseUrl}/events`),
            lastModified: new Date(),
            priority: 0.83,
            images: ['']
        },
        {
            url: escapeXml(`${baseUrl}/register`),
            lastModified: new Date(),
            priority: 0.83,
            images: ['']
        }
    ];

    // Fetch all events and add their dynamic URLs
    const events = await fetchEvents();
    const eventRoutes = events.map((event: any) => ({
        url: escapeXml(`${baseUrl}/events/${event.slug}`),
        lastModified: new Date(),
        priority: 0.74,
        images: [event.image ? escapeXml(event.image) : '']
    }));

    return [...staticRoutes, ...eventRoutes];
}