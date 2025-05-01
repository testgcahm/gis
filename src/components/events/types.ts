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