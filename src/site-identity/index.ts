// src/site-identity/index.ts
import { SITE_ASSETS } from './assets';

export interface SiteIdentity {
  name: string;
  shortName: string;
  description: string;
  tagline?: string;
  domain: string;
  brand: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  contact: {
    phone: {
      display: string;
      raw: string;
    };
    email: {
      support: string;
      admissions: string;
      general?: string;
    };
    address: {
      office: string;
      city: string;
      country: string;
      mapLink?: string;
    };
    socials: {
      whatsapp: string;
      instagram: string;
      linkedin: string;
      facebook?: string;
      twitter?: string;
    };
  };
  assets: {
    logo: {
      main: string;
      favicon: string;
      appleTouchIcon: string;
    };
    icons: {
      icon192: string;
      icon512: string;
    };
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    ogImage?: string;
  };
  business: {
    established: number;
    type: string;
    services: string[];
  };
}

export const SITE_IDENTITY: SiteIdentity = {
  name: "AlphaWorld Education",
  shortName: "AlphaWorld Edu",
  description: "Comprehensive education services and college guidance for international students",
  tagline: "Your Gateway to Global Education",
  domain: "alphaworldeducation.com",
  brand: {
    primaryColor: "#ea580c", // Orange color from manifest
    secondaryColor: "#ffffff",
    accentColor: "#1f2937", // Dark gray for contrast
  },
  contact: {
    phone: {
      display: "+92-305-2223011",
      raw: "+923052223011",
    },
    email: {
      support: "support@globaledu.com",
      admissions: "admissions@globaledu.com",
      general: "info@alphaworldeducation.com",
    },
    address: {
      office: "123 Education Lane, Block A",
      city: "Karachi",
      country: "Pakistan",
      mapLink: "https://goo.gl/maps/example",
    },
    socials: {
      whatsapp: "https://wa.me/923052223011",
      instagram: "https://instagram.com/globaledu",
      linkedin: "https://linkedin.com/company/globaledu",
    },
  },
  assets: SITE_ASSETS,
  meta: {
    title: "AlphaWorld Education - Your Gateway to Global Education",
    description: "Comprehensive education services and college guidance for international students. Expert counseling, university admissions, and career guidance.",
    keywords: [
      "education",
      "college guidance",
      "university admissions",
      "international students",
      "career counseling",
      "study abroad",
      "education services"
    ],
    author: "AlphaWorld Education",
    ogImage: "/logo.png",
  },
  business: {
    established: 2020,
    type: "Education Services",
    services: [
      "College Guidance",
      "University Admissions",
      "Career Counseling",
      "Study Abroad Support",
      "Educational Consulting"
    ],
  },
};

// Export individual sections for convenience
export const { name, contact, brand, assets, meta } = SITE_IDENTITY;

// Helper functions
export const getFullAddress = () =>
  `${SITE_IDENTITY.contact.address.office}, ${SITE_IDENTITY.contact.address.city}, ${SITE_IDENTITY.contact.address.country}`;

export const getMetaTags = () => ({
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords.join(", "),
  author: meta.author,
  "og:title": meta.title,
  "og:description": meta.description,
  "og:image": meta.ogImage,
  "og:type": "website",
});

export const getManifestData = () => ({
  name: SITE_IDENTITY.name,
  short_name: SITE_IDENTITY.shortName,
  description: SITE_IDENTITY.description,
  start_url: "/",
  display: "standalone",
  background_color: SITE_IDENTITY.brand.secondaryColor,
  theme_color: SITE_IDENTITY.brand.primaryColor,
  icons: [
    {
      src: SITE_IDENTITY.assets.icons.icon192,
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: SITE_IDENTITY.assets.icons.icon512,
      sizes: "512x512",
      type: "image/png",
    },
  ],
});
