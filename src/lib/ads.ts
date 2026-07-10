export type Ad = {
  id: number;
  title: string;
  desc: string;
  image: string;
  link: string;
};

export const adPool: Ad[] = [
  {
    id: 1,
    title: "ChatGPT",
    desc: "Your instant AI assistant for writing, learning, and brainstorming.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLpxYXyN1mhFr81MGg005ub5i2axd7mldG9I0NCGq9Gg&s=10",
    link: "https://chatgpt.com",
  },
  {
    id: 2,
    title: "Inzora Rooftop Café",
    desc: "Great coffee, amazing books, and a stellar view of Kigali.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2NuWXU2qSpiE33mLNT465OnRRS2JusRqA1Xm243CXJQ&s=10",
    link: "#",
  },
  {
    id: 3,
    title: "Apple",
    desc: "The new iPhone is here. Titanium design, ultra-fast chips, and next-gen cameras.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JRmMaGWuzwX7IuiE6BoVT9V4JvUuYa9gaMyc5pKpuA&s=10",
    link: "https://apple.com",
  },
  {
    id: 4,
    title: "Vuba Vuba",
    desc: "Hungry? Get your favorite meals from Kigali's best restaurants delivered fast.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9rlhzQj0JvmfYmHyO6Hq1_m_y0TKoOQtNLsUfaONEng&s=10",
    link: "#",
  },
  {
    id: 5,
    title: "Spotify",
    desc: "Millions of songs and podcasts. Play your favorites anytime, anywhere.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_VsbtZQutxneWAakK6dvzxRWkeNsuCjsb1EoVCi7k7g&s=10",
    link: "https://spotify.com",
  },
  {
    id: 6,
    title: "Akagera Safaris",
    desc: "Book your weekend getaway today! Spot the Big Five with 10% off.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB5X2xEIjaae6OrxiJRzhNsxaOwupZ72VSw0v_EaEVWg&s=10",
    link: "#",
  },
  {
    id: 7,
    title: "Nike",
    desc: "Just Do It. Discover the latest in high-performance sportswear and sneakers.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60",
    link: "https://nike.com",
  },
  {
    id: 8,
    title: "Gemini",
    desc: "Supercharge your creativity and productivity with Google's advanced AI tool.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0j7J3W-RY2NuQPmgIXvZ_IK9VeF4AGXm9yZYzieF7Uw&s=10",
    link: "https://gemini.google.com",
  },
  {
    id: 9,
    title: "Kigali Tech Hub",
    desc: "Co-working spaces, fast internet, and tech community events in the city.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=60",
    link: "#",
  },
  {
    id: 10,
    title: "Instagram",
    desc: "Bring yourself closer to the people and things you love. Share your moments.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&auto=format&fit=crop&q=60",
    link: "https://instagram.com",
  },
  {
    id: 11,
    title: "Mamba Club",
    desc: "Bowling, swimming, volleyball, and great food in Kiyovu.",
    image:
      "https://images.unsplash.com/photo-1538510166367-5450e1faecaa?w=400&auto=format&fit=crop&q=60",
    link: "#",
  },
  {
    id: 12,
    title: "DeepSeek",
    desc: "Experience powerful, lightning-fast open-source AI reasoning.",
    image:
      "https://images.unsplash.com/photo-1680814921949-0cf241d7d061?w=400&auto=format&fit=crop&q=60",
    link: "https://deepseek.com",
  },
  {
    id: 13,
    title: "Samsung",
    desc: "Unfold your world. Experience the ultimate AI-powered Galaxy ecosystem.",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop&q=60",
    link: "https://samsung.com",
  },
  {
    id: 14,
    title: "Igihe News",
    desc: "Stay updated with the latest breaking news, politics, and culture in Rwanda.",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&auto=format&fit=crop&q=60",
    link: "https://igihe.com",
  },
  {
    id: 15,
    title: "TikTok",
    desc: "Real people. Real videos. Find your community and endless entertainment.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&auto=format&fit=crop&q=60",
    link: "https://tiktok.com",
  },
  {
    id: 16,
    title: "Question Coffee",
    desc: "Sustainably sourced, locally grown, and expertly roasted Rwandan coffee.",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&auto=format&fit=crop&q=60",
    link: "#",
  },
  {
    id: 17,
    title: "Amazon",
    desc: "Fast global shipping, millions of items, and incredible daily deals.",
    image:
      "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&auto=format&fit=crop&q=60",
    link: "https://amazon.com",
  },
  {
    id: 18,
    title: "Pinterest",
    desc: "Find fresh ideas for your next project, home decor, fashion, and recipes.",
    image:
      "data:image/png;base64,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",
    link: "https://pinterest.com",
  },
  {
    id: 19,
    title: "Yego Cabs",
    desc: "Safe, metered, and 100% reliable rides across Kigali anytime.",
    image:
      "https://play-lh.googleusercontent.com/wY7bdgT1Uq0DwbTbv8RSc6yOH3qq3AtO6pmRZ8iZqla6NSwtmgVsylu0ZrPnIMucoTulo1aMG864AD6coGupty0=w240-h480-rw",
    link: "#",
  },
  {
    id: 20,
    title: "Coca-Cola",
    desc: "Real Magic. Refresh your day and open happiness with an ice-cold Coke.",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=60",
    link: "https://coca-cola.com",
  },
  {
    id: 21,
    title: "Winner.rw",
    desc: "Your home for sports entertainment, live match updates, and scores.",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=60",
    link: "https://winner.rw",
  },
  {
    id: 22,
    title: "Netflix",
    desc: "Stream your favorite trending TV shows, movies, and anime anytime.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg",
    link: "https://netflix.com",
  },
  {
    id: 23,
    title: "Pili Pili Lounge",
    desc: "Wood-fired pizzas, poolside relaxation, and weekend sunset vibes.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=60",
    link: "#",
  },
  {
    id: 24,
    title: "Zilla Fitness",
    desc: "State-of-the-art gym equipment, yoga classes, and premium trainers.",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=60",
    link: "#",
  },
  {
    id: 25,
    title: "Sawa Citi Supermarket",
    desc: "Your neighborhood grocery store with fresh produce and essentials.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=60",
    link: "#",
  },
];

// Backwards-compatible export for existing imports
export const AD_POOL: Ad[] = adPool;


// Deterministic seeded PRNG (mulberry32)
function seeded(seed: number) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Returns 5 unique ads for the given date (all users see same selection per day)
export function getDailyAds(forDate = new Date(), count = 5): Ad[] {
  const today = new Date(forDate.getFullYear(), forDate.getMonth(), forDate.getDate());
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const rng = seeded(dayOfYear + today.getFullYear());
  // Create deterministic shuffle
  const pool = AD_POOL.slice();
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export function getDayKey(forDate = new Date()) {
  const d = new Date(forDate.getFullYear(), forDate.getMonth(), forDate.getDate());
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
