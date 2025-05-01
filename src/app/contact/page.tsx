import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
    title: 'Contact | GMC Islamic Society',
    description: 'Contact the Gujranwala Medical College Islamic Society for questions, feedback, or collaboration opportunities.',
    keywords: [
      "GMC Islamic Society",
      "Gujranwala Medical College",
      "Islamic Society",
      "GMC",
      "Medical College",
      "Gujranwala",
      "Society",
      "Contact",
      "Feedback",
      "Collaboration"
    ],
    icons: {
      icon: '/logo.ico',
    },
    alternates: {
      canonical: 'https://gmc-islamic-society.vercel.app/contact',
    },
    openGraph: {
      title: 'Contact | GMC Islamic Society',
      description: 'Contact the Gujranwala Medical College Islamic Society for questions, feedback, or collaboration opportunities.',
      url: 'https://gmc-islamic-society.vercel.app/contact',
      siteName: 'GMC Islamic Society',
      images: [
        {
          url: '/og.png',
          width: 1200,
          height: 630,
          alt: 'Contact GMC Islamic Society',
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
  };

export default function ContactPage() {
  return <ContactClient />;
}