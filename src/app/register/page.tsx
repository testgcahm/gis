import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: 'Register | GMC Islamic Society',
  description: 'Register for upcoming events at Gujranwala Medical College Islamic Society. Secure your spot and join our community.',
  keywords: [
    "GMC Islamic Society",
    "Gujranwala Medical College",
    "Islamic Society",
    "GMC",
    "Medical College",
    "Gujranwala",
    "Society",
    "Register",
    "Event Registration",
    "Islamic Fiesta"
  ],
  icons: {
    icon: '/logo.ico',
  },
  alternates: {
    canonical: 'https://gmc-islamic-society.vercel.app/register',
  },
  openGraph: {
    title: 'Register | GMC Islamic Society',
    description: 'Register for upcoming events at Gujranwala Medical College Islamic Society. Secure your spot and join our community.',
    url: 'https://gmc-islamic-society.vercel.app/register',
    siteName: 'GMC Islamic Society',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Register GMC Islamic Society',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
};

export default function RegisterPage() {
  return <RegisterClient />;
}