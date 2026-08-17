import type { SiteContent } from "./content-types";

export const defaultContent: SiteContent = {
  settings: {
    siteName: "Prince Achar",
    siteDescription: "Handcrafted pickles and preserves from the heart of Old Delhi. Authentic flavors passed down through generations since 1980.",
    logoUrl: "/logo.jpeg",
    ogImageUrl: "/logo.jpeg",
    organization: {
      name: "Prince Achar",
      streetAddress: "Shop No. 6673, Khari Baoli Road, Fatehpuri, Chandni Chowk",
      addressLocality: "New Delhi",
      postalCode: "110006",
      addressCountry: "IN",
      telephone: "+91 98110 56593",
      email: "pannalaltavinderkumar@gmail.com",
      url: "https://princeachar.com",
      sameAs: ["https://www.instagram.com/princeacharindia/", "https://www.facebook.com/people/Prince-Achar/61553016616914/"],
    },
  },

  homepage: {
    hero: {
      slides: [
        { id: "default-1", imageUrl: "/hero.webp" },
      ],
      title: "Prince Achar",
      subtitle: "Authentic Delhi Flavors Since 1980",
      ctaText: "Explore Now",
      ctaLink: "/achar",
      autoPlayInterval: 3000,
    },
    marquee: {
      items: [
        "FREE DELIVERY ON ORDERS ABOVE \u20B9500",
        "HANDMADE IN DELHI SINCE 1980",
        "100% NATURAL INGREDIENTS",
      ],
    },
    story: {
      label: "About Us",
      heading: "A Legacy of Taste. A Tradition of Excellence.",
      paragraphs: [
        "Since 1980, Prince Achar has been dedicated to preserving the rich heritage of Indian flavors through products crafted with authenticity, care, and uncompromising quality. What began as a passion for traditional recipes has evolved into a trusted brand, loved for its exceptional taste and consistency across generations.",
        "Our portfolio features a thoughtfully curated range of premium pickles, murabbas, fruit candies, and ingredients for plum cakes. Each product is prepared using carefully selected ingredients, ensuring the perfect balance of tradition, flavor, and quality.",
        "At Prince Achar, we believe that great taste is timeless. By blending traditional craftsmanship with modern production standards, we deliver products that meet the expectations of today's consumers while retaining the authenticity that defines our legacy.",
        "As we continue to grow, we remain committed to building strong and lasting partnerships with distributors, retailers, and food businesses, bringing the finest flavors of India to every table.",
      ],
      closingLine: "A Promise of Quality. Prince Achar \u2014 Celebrating Authentic Flavors Since 1980.",
      imageUrl: "/about-us.webp",
    },
    video: {
      label: "Watch Our Story",
      heading: "Crafting Tradition, One Jar at a Time",
      description: "Go behind the scenes and see how Prince Achar brings the rich heritage of Delhi's pickle-making tradition to your table. From sourcing the finest mangoes to the final seal of every jar, witness the passion and dedication that goes into every batch.",
      ctaText: "Shop Now",
      ctaLink: "/achar",
      videoUrl: "/reel.mp4",
      coverUrl: "/video-cover.webp",
    },
    bestsellers: {
      label: "Customer Favorites",
      heading: "Featured Bestsellers",
      text: "Our most-loved jars, picked by the customers who keep coming back for the authentic taste of Delhi.",
      ctaText: "Shop All Pickles",
      ctaLink: "/achar",
      productHandles: [],
    },
    heroDialog: {
      enabled: true,
      heading: "Handcrafted with Love",
      text: "Experience the authentic flavors of Delhi, passed down through generations.",
      ctaText: "Explore Now",
      ctaLink: "/achar",
    },
  },

  achar: {
    hero: {
      label: "Our Collection",
      title: "Authentic Pickles",
      description: "Handcrafted in small batches using traditional Delhi recipes passed down since 1980. Every jar is a promise of purity, flavor, and heritage.",
      bannerUrl: "/achar-banner.webp",
    },
  },

  murabba: {
    hero: {
      label: "Slow-Cooked Fruit Preserves",
      title: "Murabba",
      description: "Slow-cooked fruit preserves made with time-honored recipes \u2014 simmered to perfection and sealed with tradition.",
      bannerUrl: "/murabba-banner.webp",
    },
    chutney: {
      label: "Sweet & Savory Companions",
      title: "Chutneys",
      description: "Bold, tangy condiments crafted to pair with everything from parathas to platters.",
      bannerUrl: "/chutney-banner.webp",
    },
  },

  contact: {
    hero: {
      label: "Get in Touch",
      title: "Contact Us",
      description: "Distributors, retailers, or pickle lovers \u2014 we're here for you. Reach out and we'll get back to you shortly.",
    },
    form: {
      label: "Get in Touch",
      heading: "We'd love to hear from you.",
      subjects: [
        "Wholesale & Distribution",
        "Retail / Stocking Inquiry",
        "Product Feedback",
        "Order Support",
        "Press & Media",
        "Other",
      ],
    },
    info: {
      store: {
        title: "Store",
        address: "Shop No. 6673, Khari Baoli Road, Fatehpuri, Chandni Chowk, New Delhi \u2013 110006",
        ctaText: "Get Directions",
        ctaLink: "https://www.google.com/maps/search/?api=1&query=Prince+Achar+Khari+Baoli+Delhi",
      },
      hours: {
        weekday: "Mon\u2013Sat: 9:00 AM \u2013 6:00 PM",
        sunday: "Sunday: Closed",
      },
      phone: {
        number: "+91 98110 56593",
        ctaText: "Call Now",
        ctaLink: "tel:+919811056593",
      },
      email: {
        address: "pannalaltavinderkumar@gmail.com",
        ctaText: "Email Us",
        ctaLink: "mailto:pannalaltavinderkumar@gmail.com",
      },
    },
    images: [
      "/store/store-front.webp",
      "/store/store-2.png",
      "/store/store-3.png",
      "/store/store-4.png",
    ],
  },

  faq: {
    hero: {
      label: "Help Center",
      title: "Frequently Asked Questions",
      description: "Everything you need to know about our products, orders, and services.",
    },
    items: [
      {
        question: "What are the ingredients used in Prince Achar pickles?",
        answer: "We use 100% natural ingredients \u2014 fresh fruits, mustard oil, red chili, turmeric, fenugreek, and other traditional spices. No preservatives, no artificial colors.",
      },
      {
        question: "How long do your pickles and murabbas last?",
        answer: "Unopened, our pickles and murabbas have a shelf life of 12 months from the date of manufacturing. Once opened, store in a cool, dry place and use within 3 months.",
      },
      {
        question: "Are your products vegetarian?",
        answer: "Yes, all Prince Achar products are 100% vegetarian.",
      },
      {
        question: "Do you offer bulk or wholesale orders?",
        answer: "Yes. We work with distributors, retailers, and food businesses across India. Contact us at pannalaltavinderkumar@gmail.com or call +91 98110 56593 for bulk pricing.",
      },
      {
        question: "Where can I buy Prince Achar products?",
        answer: "Our products are available at leading grocery stores and supermarkets across Delhi NCR and select cities. You can also visit our store at Shop No. 6673, Khari Baoli Road, Fatehpuri, Chandni Chowk, New Delhi, or order directly by contacting us.",
      },
      {
        question: "Are your pickles made in traditional style?",
        answer: "Absolutely. Every batch is handcrafted using recipes passed down since 1980. We blend traditional methods with modern hygiene standards to deliver authentic taste.",
      },
      {
        question: "Do you ship across India?",
        answer: "Yes, we ship to most locations across India. Delivery times may vary based on your pin code. Contact us for specific shipping inquiries.",
      },
    ],
    cta: {
      text: "Still have questions?",
      buttonText: "Contact Us",
      buttonLink: "/contact",
    },
  },

  footer: {
    tagline: "Authentic Delhi flavors, handcrafted with love since 1980.",
    socialLinks: {
      instagram: "https://www.instagram.com/princeacharindia/",
      facebook: "https://www.facebook.com/people/Prince-Achar/61553016616914/",
    },
    hours: {
      weekday: "Mon\u2013Sat: 9:00 AM \u2013 6:00 PM",
      sunday: "Sunday: Closed",
    },
  },

  products: {
    order: [],
  },
};
