export interface HeroSlide {
  imageUrl: string;
  link?: string;
  title?: string;
  subtitle?: string;
  id: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  ogImageUrl: string;
  organization: {
    name: string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
    telephone: string;
    email: string;
    url: string;
    sameAs: string[];
  };
}

export interface HomepageContent {
  hero: {
    slides: HeroSlide[];
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    autoPlayInterval: number;
  };
  marquee: {
    items: string[];
  };
  story: {
    label: string;
    heading: string;
    paragraphs: string[];
    closingLine: string;
    imageUrl: string;
  };
  video: {
    label: string;
    heading: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    videoUrl: string;
    coverUrl: string;
  };
  bestsellers: {
    label: string;
    heading: string;
    text: string;
    ctaText: string;
    ctaLink: string;
    productHandles: string[];
  };
  heroDialog: {
    enabled: boolean;
    heading: string;
    text: string;
    ctaText: string;
    ctaLink: string;
  };
}

export interface AcharContent {
  hero: {
    label: string;
    title: string;
    description: string;
    bannerUrl: string;
  };
}

export interface MurabbaContent {
  hero: {
    label: string;
    title: string;
    description: string;
    bannerUrl: string;
  };
  chutney: {
    label: string;
    title: string;
    description: string;
    bannerUrl: string;
  };
}

export interface ContactContent {
  hero: {
    label: string;
    title: string;
    description: string;
  };
  form: {
    label: string;
    heading: string;
    subjects: string[];
  };
  info: {
    store: { title: string; address: string; ctaText: string; ctaLink: string };
    hours: { weekday: string; sunday: string };
    phone: { number: string; ctaText: string; ctaLink: string };
    email: { address: string; ctaText: string; ctaLink: string };
  };
  images: string[];
}

export interface FaqContent {
  hero: {
    label: string;
    title: string;
    description: string;
  };
  items: { question: string; answer: string }[];
  cta: {
    text: string;
    buttonText: string;
    buttonLink: string;
  };
}

export interface FooterContent {
  tagline: string;
  socialLinks: {
    instagram: string;
    facebook: string;
  };
  hours: {
    weekday: string;
    sunday: string;
  };
}

export interface ProductsContent {
  order: string[];
}

export interface SiteContent {
  settings: SiteSettings;
  homepage: HomepageContent;
  achar: AcharContent;
  murabba: MurabbaContent;
  contact: ContactContent;
  faq: FaqContent;
  footer: FooterContent;
  products: ProductsContent;
}
