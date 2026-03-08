import { TravelData } from './types';

export const mockData: TravelData = {
  cities: [
    {
      id: "kyoto",
      name: "Kyoto",
      region: "Kansai, Japan",
      bgColor: "bg-[#F5F2ED]",
      coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
      positioning: {
        unique: [
          { keyword: "千年木构的寂静感", desc: "Living traditional arts in the historic Gion district.", image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1974&auto=format&fit=crop" },
          { keyword: "Geisha Culture", desc: "The elusive and beautiful world of Kyoto's traditional entertainers." }
        ],
        core: [
          { keyword: "Zen Gardens", desc: "Meticulously landscaped dry gardens offering profound peace.", image: "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=2070&auto=format&fit=crop" },
          { keyword: "Matcha Heritage", desc: "Centuries-old green tea cultivation and ceremonies.", image: "https://images.unsplash.com/photo-1545042746-ec9e5a59b359?q=80&w=1974&auto=format&fit=crop" }
        ],
        basic: [
          { keyword: "Temple Walks", desc: "Hundreds of accessible historic sites.", icon: "Map" },
          { keyword: "Kaiseki", desc: "Traditional multi-course dining.", icon: "Utensils" }
        ],
        general: ["Historic", "Cultural", "Quiet", "Walkable", "Seasonal"]
      }
    },
    {
      id: "paris",
      name: "Paris",
      region: "Île-de-France, France",
      bgColor: "bg-[#F0F4F8]",
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
      positioning: {
        unique: [
          { keyword: "流动的盛宴", desc: "A timeless romance woven into the city's architecture and cafe culture.", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop" },
          { keyword: "Haute Couture", desc: "The undisputed global capital of luxury fashion and design." }
        ],
        core: [
          { keyword: "Art Capital", desc: "Home to the Louvre, Musée d'Orsay, and countless galleries.", image: "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=2071&auto=format&fit=crop" }
        ],
        basic: [
          { keyword: "Bistros", desc: "Classic French dining on every corner.", icon: "Coffee" },
          { keyword: "Fashion", desc: "Global hub for haute couture.", icon: "ShoppingBag" }
        ],
        general: ["Romantic", "Historic", "Gastronomy", "Artistic"]
      }
    }
  ],
  checklists: [
    {
      id: 1,
      title: "Pre-trip Essentials",
      type: "normal",
      category: "packing",
      items: [
        { id: 101, text: "Purchase JR Pass (Before arrival)", completed: true, noteId: 301 },
        { id: 102, text: "Book pocket Wi-Fi", completed: true },
        { id: 103, text: "Reserve Kaiseki dinner", completed: false }
      ]
    },
    {
      id: 2,
      title: "Top 3 Matcha Spots",
      type: "ranking",
      category: "food",
      items: [
        { id: 201, text: "Tsujiri Gion Main Store", subtitle: "Best Parfaits", completed: false, noteId: 302 },
        { id: 202, text: "Nakamura Tokichi", subtitle: "Historic setting in Uji", completed: false },
        { id: 203, text: "Maccha House", subtitle: "Famous Matcha Tiramisu", completed: true }
      ]
    },
    {
      id: 3,
      title: "Must-Buy Souvenirs",
      type: "image",
      category: "souvenir",
      items: [
        { id: 301, text: "Yatsuhashi", subtitle: "Traditional sweet", completed: false, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=1965&auto=format&fit=crop" },
        { id: 302, text: "Kiyomizu Pottery", subtitle: "Handcrafted ceramics", completed: false, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2070&auto=format&fit=crop" }
      ]
    }
  ],
  activities: [
    {
      id: 1,
      name: "Traditional Tea Ceremony",
      image: "https://images.unsplash.com/photo-1545042746-ec9e5a59b359?q=80&w=1974&auto=format&fit=crop",
      desc: "Experience the way of tea in a historic machiya. Learn the etiquette and enjoy premium matcha.",
      rating: 4.9,
      reviews: 342,
      priceLevel: "$$",
      duration: "1.5 hrs",
      durationValue: 30,
      highlights: ["Authentic Machiya", "English Guide", "Wagashi Sweets"],
      details: "Join us in a 100-year-old Machiya townhouse for an authentic tea ceremony. You will learn the history of tea in Japan, the meaning behind the movements, and get to whisk your own bowl of matcha."
    },
    {
      id: 2,
      name: "Arashiyama Bamboo Grove Walk",
      image: "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=2070&auto=format&fit=crop",
      desc: "A serene early morning walk through the towering bamboo stalks. Best visited before 8 AM.",
      rating: 4.8,
      reviews: 1205,
      priceLevel: "Free",
      duration: "1-2 hrs",
      durationValue: 40,
      highlights: ["Photography", "Nature", "Iconic"],
      details: "The Arashiyama Bamboo Grove is one of Kyoto's top sights. The path cuts through a dense grove of tall bamboo stalks. When the wind blows, the wood creaks and the leaves rustle, creating a unique soundscape."
    }
  ],
  sights: [
    {
      id: 1,
      name: "Fushimi Inari Taisha",
      location: "Fushimi Ward, Kyoto",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=2070&auto=format&fit=crop",
      summary: "Iconic Shinto shrine famous for its thousands of vermilion torii gates trailing up the sacred Mount Inari.",
      details: "Fushimi Inari is the most important of several thousands of shrines dedicated to Inari, the Shinto god of rice. Foxes are thought to be Inari's messengers, resulting in many fox statues across the shrine grounds."
    },
    {
      id: 2,
      name: "Kiyomizu-dera",
      location: "Higashiyama Ward, Kyoto",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1974&auto=format&fit=crop",
      summary: "Historic wooden temple offering sweeping views of the city, especially beautiful during cherry blossom and autumn seasons.",
      details: "Kiyomizudera (literally \"Pure Water Temple\") is one of the most celebrated temples of Japan. It was founded in 780 on the site of the Otowa Waterfall in the wooded hills east of Kyoto."
    }
  ],
  notes: [
    {
      id: 301,
      title: "JR Pass Exchange Guide",
      content: "Exchange your voucher at Kyoto Station Central Gate. Expect a 30-min queue during peak hours (9 AM - 11 AM). Don't forget your physical passport!",
      image: "https://images.unsplash.com/photo-1552084117-56a98a961685?q=80&w=2014&auto=format&fit=crop",
      author: { name: "Traveler Jane", avatar: "https://i.pravatar.cc/150?u=jane" },
      likes: 124
    },
    {
      id: 302,
      title: "Tsujiri Queues & Tips",
      content: "The Gion main store often has a 1-hour wait. Try the Kyoto Station branch for a shorter queue. The seasonal parfaits are always worth it.",
      author: { name: "Matcha Lover", avatar: "https://i.pravatar.cc/150?u=matcha" },
      likes: 89
    },
    {
      id: 303,
      title: "Bus Pass Update",
      content: "The 700¥ daily bus pass is no longer sold on the bus. Buy it at the station or use an IC card (Suica/Pasmo works fine in Kyoto).",
      image: "https://images.unsplash.com/photo-1542051812871-758502109a58?q=80&w=2070&auto=format&fit=crop",
      author: { name: "Kyoto Local", avatar: "https://i.pravatar.cc/150?u=local" },
      likes: 256
    }
  ],
  blog: "Kyoto is a city where the past and present coexist beautifully. Walking through the streets of Gion at dusk, you might catch a glimpse of a geiko hurrying to an appointment, while just a few streets away, modern cafes serve innovative matcha creations.\n\nOur journey began at the iconic Fushimi Inari Taisha. Arriving at 7 AM was the best decision we made—the crisp morning air and the absence of crowds made the hike through the vermilion gates feel truly spiritual."
};
