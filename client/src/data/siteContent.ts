// Quiet Glow Atelier reminder: keep business content calm, local, personal, and easy to edit without touching layout code.

export const siteContent = {
  businessName: "PureEssence",
  descriptor: "Beauty Studio",
  location: "Longford, Tasmania, Australia",
  tagline: "Beauty, confidence & self-care, from the comfort of home.",
  intro:
    "Your local home-based beauty studio in Longford, Tasmania, offering personalised beauty services designed to help you look and feel your best.",
  about:
    "PureEssence was created to provide a comfortable, personalised beauty experience where you can take some time for yourself. Based in Longford, Tasmania, PureEssence offers a range of beauty services in a relaxed home studio environment.",
  bookingNote:
    "Enquiries are requests, not automatic appointment confirmations. We’ll be in touch to discuss your preferred time and next steps.",
  seoTitle: "PureEssence | Beauty Studio in Longford Tasmania",
  seoDescription:
    "PureEssence is a home-based beauty studio in Longford, Tasmania offering eyelash extensions, hair extensions, hair colouring, tanning, waxing and cosmetic tattooing.",
  contact: {
    phone: "Phone details coming soon",
    email: "Email details coming soon",
    instagram: "Instagram details coming soon",
    facebook: "Facebook details coming soon",
  },
};

export type Service = {
  id: string;
  label: string;
  name: string;
  description: string;
  items: string[];
  price: string;
  duration: string;
  accent: string;
};

export const services: Service[] = [
  {
    id: "lashes",
    label: "01 / EYES",
    name: "Lashes",
    description:
      "Soft, considered lash services designed to frame your eyes and fit your own style.",
    items: [
      "Classic Eyelash Extensions",
      "Hybrid Eyelash Extensions",
      "Volume Eyelash Extensions",
      "Eyelash Infills",
      "Lash Lift",
    ],
    price: "Price coming soon",
    duration: "Duration coming soon",
    accent: "#d6b88f",
  },
  {
    id: "hair-extensions",
    label: "02 / LENGTH",
    name: "Hair Extensions",
    description:
      "A personalised consultation-led approach to adding length, fullness, or a fresh change.",
    items: ["Hair Extensions", "Hair Extension Maintenance", "Hair Extension Consultation"],
    price: "Price coming soon",
    duration: "Duration coming soon",
    accent: "#b5a08a",
  },
  {
    id: "hair",
    label: "03 / COLOUR",
    name: "Hair",
    description:
      "Colouring, dying, and styling services shaped around the look you want to wear.",
    items: ["Hair Colouring", "Hair Dying", "Hair Styling"],
    price: "Price coming soon",
    duration: "Duration coming soon",
    accent: "#9d836d",
  },
  {
    id: "tanning",
    label: "04 / GLOW",
    name: "Tanning",
    description: "A warm, even-looking glow for the moments you want to feel a little sun-kissed.",
    items: ["Spray Tanning", "Tanning Services"],
    price: "Price coming soon",
    duration: "Duration coming soon",
    accent: "#c9a87c",
  },
  {
    id: "waxing",
    label: "05 / CARE",
    name: "Waxing",
    description: "Simple, thoughtful waxing services for a polished addition to your self-care ritual.",
    items: ["Eyebrow Waxing", "Facial Waxing", "Body Waxing"],
    price: "Price coming soon",
    duration: "Duration coming soon",
    accent: "#a9957f",
  },
  {
    id: "cosmetic-tattoo",
    label: "06 / DEFINITION",
    name: "Cosmetic Tattoo",
    description:
      "Cosmetic tattooing enquiries for those considering a little more definition in their routine.",
    items: ["Cosmetic Tattooing", "Eyebrow Cosmetic Tattooing"],
    price: "Price coming soon",
    duration: "Duration coming soon",
    accent: "#7f7165",
  },
];

export type GalleryItem = {
  id: string;
  category: string;
  title: string;
  alt: string;
  image: string;
};

export const galleryItems: GalleryItem[] = [
  {
    id: "lash-detail",
    category: "Lashes",
    title: "Quiet detail",
    alt: "Lash extension tools arranged on warm linen",
    image: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&q=88",
  },
  {
    id: "hair",
    category: "Hair",
    title: "Soft movement",
    alt: "Long softly styled hair in warm natural light",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "extensions",
    category: "Hair Extensions",
    title: "A little more length",
    alt: "Glossy neutral hair texture in an editorial beauty crop",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "tanning",
    category: "Tanning",
    title: "Warm glow",
    alt: "Sunlit skin and linen textures in a warm beauty editorial",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "cosmetic-tattoo",
    category: "Cosmetic Tattoo",
    title: "Refined definition",
    alt: "Close-up beauty portrait with softly defined brows",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "studio",
    category: "Studio",
    title: "Your quiet corner",
    alt: "Warm home beauty studio with cream walls and natural textures",
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=88",
  },
];

export const galleryCategories = ["All", ...Array.from(new Set(galleryItems.map((item) => item.category)))];
