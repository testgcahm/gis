export interface EventData {
  slug: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  activities: string;
  audience: string;
  description: string;
  image: string;
  register?: boolean;
  speakers?: {
    name: string;
    bio: string;
  }[];
}

export const eventDetails: EventData[] = [
  {
    slug: 'islamic-fiesta-competition',
    title: "Islamic Fiesta' 2025 - Qirat and Naat Competition",
    date: 'May 2, 2025',
    time: '11:30 AM',
    venue: 'LH-4, GMC, GUJRANWALA',
    activities: 'Annual Qirat and Naat competition',
    audience: 'Open to all',
    description: `Incentives for participants (In sha Allah):\n1) Shields for top position holders\n2) Cash prize for top 3\n3) Certificates of participation\n\nResult of competition will be disclosed on 7th May.\n\nShields & cash prize will be presented to top 3/5 by Our Honourable Speakers on stage @Annual Fiesta'2025.`,
    image: '/gmc_fiesta.jpeg',
  },
  {
    slug: 'islamic-fiesta',
    title: "GMC Islamic Fiesta'2025",
    date: 'May 7, 2025',
    time: '10:30 AM - 2:30 PM',
    venue: 'Auditorium, 3rd Floor, GMC Teaching Hospital, Gujranwala',
    activities: '1- ISLAMIC SESSIONS BY GUEST SPEAKERS<br />2- PANEL DISCUSSION + Q&A SESSION<br />3- QIRAT & NAAT COMPETITION<br />4- CALLIGRAPHY COMPETITION',
    audience: 'Registered Members, Faculty and Gemcians only',
    description: "GMC Islamic Society presents ISLAMIC FIESTA' 2025. \nFeaturing:\n- Muhammad Raza Saqib Mustafai (Founding Chairman, Idara tul Mustafa International)\n- Raja Zia ul Haqq (CEO Youth Club)\nIncludes Islamic sessions, panel discussion, Q&A, Qirat & Naat, and Calligraphy competitions.",
    image: '/gmc_fiesta.jpeg',
    register: true,
    speakers: [
      {
        name: 'Muhammad Raza Saqib Mustafai',
        bio: 'A renowned Islamic scholar and speaker, Saqib Raza Mustafai is known for his engaging lectures and deep knowledge of Islamic teachings. He has inspired audiences worldwide with his wisdom and eloquence.'
      },
      {
        name: 'Raja Zia ul Haqq',
        bio: 'Raja Zia ul Haqq is a prominent motivational speaker and Islamic educator. He is recognized for his dynamic presentations and commitment to youth empowerment and community development.'
      }
    ]
  },
  {
    slug: 'friday-sessions',
    title: 'Friday Sessions',
    date: 'Every Friday',
    time: '12:00 PM - 12:30 PM',
    venue: 'Gujranwala Medical College, Lecture Hall',
    activities: 'Lectures, Guest Speakers, Dawah',
    audience: 'Open to all',
    description: 'No registration required. Just walk in and join the conversation!',
    image: '/Firday_sessions.png',
  },
];