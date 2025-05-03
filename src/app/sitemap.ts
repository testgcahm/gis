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
    // Helper to escape & in URLs for XML
    function escapeXmlUrl(url: string) {
        return url.replace(/&/g, '&amp;');
    }

    const staticRoutes = [
        {
            url: escapeXmlUrl(`${baseUrl}`),
            lastModified: new Date(),
            priority: 1,
            images: [escapeXmlUrl(baseImage)]
        },
        {
            url: escapeXmlUrl(`${baseUrl}about`),
            lastModified: new Date(),
            priority: 0.83,
            images: [escapeXmlUrl(baseImage)]
        },
        {
            url: escapeXmlUrl(`${baseUrl}events`),
            lastModified: new Date(),
            priority: 0.83,
            images: [escapeXmlUrl(baseImage)]
        },
        {
            url: escapeXmlUrl(`${baseUrl}register`),
            lastModified: new Date(),
            priority: 0.83,
            images: [escapeXmlUrl(baseImage)]
        },
        {
            url: escapeXmlUrl(`${baseUrl}admin`),
            lastModified: new Date(),
            priority: 0.63,
            images: [escapeXmlUrl(baseImage)]
        }
    ];

    // Fetch all events and add their dynamic URLs
    const events = await fetchEvents();
    const eventRoutes = events.map((event: any) => ({
        url: escapeXmlUrl(`${baseUrl}events/${event.slug}`),
        lastModified: new Date(),
        priority: 0.76,
        images: [
            escapeXmlUrl(`${baseUrl}_next/image?url=%2F${event.image}&w=1080&q=75`)
        ]
    }));

    return [...staticRoutes, ...eventRoutes];
}