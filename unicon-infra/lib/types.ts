export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: "Residential" | "Commercial" | "Villas" | "Township";
  status: "Ongoing" | "Completed" | "Upcoming";
  priceRange: string;
  coverImage: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  amenities: string[];
  specifications: { label: string; value: string }[];
  area: string;
  units: string;
  possession: string;
  lat: number;
  lng: number;
  order: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
  order: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  order: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  category: "Residential" | "Commercial" | "Villas" | "Township";
  label: string;
  order: number;
}

export interface JointVenture {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
  order: number;
}

export interface ThemeColors {
  gold: string;
  goldLight: string;
  goldDark: string;
  black: string;
  charcoal: string;
  panel: string;
  ivory: string;
}

export interface ThemeFonts {
  /** Google Font family name used for headings / display text. */
  display: string;
  /** Google Font family name used for body copy. */
  body: string;
}

export interface ThemeSettings {
  colors: ThemeColors;
  fonts: ThemeFonts;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  siteIcon: string;
  logo: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
  instagramAccessToken?: string;
  instagramEmbedCode?: string;
  youtubeChannelUrl?: string;
  theme: ThemeSettings;
}

export interface VideoItem {
  id: string;
  youtubeUrl: string;
  order: number;
}

export interface FounderProfile {
  photo: string;
  name: string;
  title: string;
  bio: string;
  message: string;
}

export interface SeoSetting {
  page: string;
  label: string;
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export type SubmissionType = "contact" | "site-visit" | "brochure";

export interface ContactSubmission {
  id: string;
  type: SubmissionType;
  name: string;
  phone: string;
  email: string;
  project?: string;
  message?: string;
  createdAt: string;
  read: boolean;
}
