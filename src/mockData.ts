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
        general: [
          { keyword: "Historic", desc: "Rich in history and ancient traditions" },
          { keyword: "Cultural", desc: "Deep cultural roots and arts" },
          { keyword: "Quiet", desc: "Peaceful and serene atmosphere" },
          { keyword: "Walkable", desc: "Easy to explore on foot" },
          { keyword: "Seasonal", desc: "Beautiful changes across four seasons" }
        ]
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
        general: [
          { keyword: "Romantic", desc: "The city of love and romance" },
          { keyword: "Historic", desc: "Centuries of European history" },
          { keyword: "Gastronomy", desc: "World-class culinary experiences" },
          { keyword: "Artistic", desc: "A global center for art and culture" }
        ]
      }
    }
  ],
  checklists: [
    {
      id: 1,
      cityId: '1',
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
      cityId: '1',
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
      cityId: '1',
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
      cityId: '1',
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
      cityId: '1',
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
      cityId: '1',
      name: "Fushimi Inari Taisha",
      location: "Fushimi Ward, Kyoto",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=2070&auto=format&fit=crop",
      summary: "Iconic Shinto shrine famous for its thousands of vermilion torii gates trailing up the sacred Mount Inari.",
      details: "Fushimi Inari is the most important of several thousands of shrines dedicated to Inari, the Shinto god of rice. Foxes are thought to be Inari's messengers, resulting in many fox statues across the shrine grounds."
    },
    {
      id: 2,
      cityId: '1',
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
      cityId: '1',
      title: "JR Pass Exchange Guide",
      content: "Exchange your voucher at Kyoto Station Central Gate. Expect a 30-min queue during peak hours (9 AM - 11 AM). Don't forget your physical passport!",
      image: "https://images.unsplash.com/photo-1552084117-56a98a961685?q=80&w=2014&auto=format&fit=crop",
      author: { name: "Traveler Jane", avatar: "https://i.pravatar.cc/150?u=jane" },
      likes: 124
    },
    {
      id: 302,
      cityId: '1',
      title: "Tsujiri Queues & Tips",
      content: "The Gion main store often has a 1-hour wait. Try the Kyoto Station branch for a shorter queue. The seasonal parfaits are always worth it.",
      author: { name: "Matcha Lover", avatar: "https://i.pravatar.cc/150?u=matcha" },
      likes: 89
    },
    {
      id: 303,
      cityId: '1',
      title: "Bus Pass Update",
      content: "The 700¥ daily bus pass is no longer sold on the bus. Buy it at the station or use an IC card (Suica/Pasmo works fine in Kyoto).",
      image: "https://images.unsplash.com/photo-1542051812871-758502109a58?q=80&w=2070&auto=format&fit=crop",
      author: { name: "Kyoto Local", avatar: "https://i.pravatar.cc/150?u=local" },
      likes: 256
    }
  ],
  blog: "Kyoto is a city where the past and present coexist beautifully. Walking through the streets of Gion at dusk, you might catch a glimpse of a geiko hurrying to an appointment, while just a few streets away, modern cafes serve innovative matcha creations.\n\nOur journey began at the iconic Fushimi Inari Taisha. Arriving at 7 AM was the best decision we made—the crisp morning air and the absence of crowds made the hike through the vermilion gates feel truly spiritual.",
  discoveryPosts: [
    {
      id: 'd1',
      type: 'video',
      author: {
        name: 'TravelWithMe',
        avatar: 'https://i.pravatar.cc/150?u=twm',
        platform: 'TikTok'
      },
      title: 'Kyoto Hidden Gems You MUST Visit!',
      content: 'I spent 3 days in Kyoto and found these amazing spots that no one tells you about. From secret temples to the best street food!',
      thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
      tags: { country: 'Japan', city: 'Kyoto', sight: 'Arashiyama' },
      aiSummary: 'This video highlights lesser-known locations in Kyoto, specifically focusing on the Arashiyama area. It recommends visiting early to avoid crowds and identifies three specific "secret" temples with beautiful moss gardens.',
      stats: { likes: 12500, comments: 450, shares: 2100 }
    },
    {
      id: 'd2',
      type: 'text',
      author: {
        name: 'NomadExplorer',
        avatar: 'https://i.pravatar.cc/150?u=nomad',
        platform: 'Instagram'
      },
      title: 'Ultimate Osaka Food Guide 2024',
      content: 'Osaka is truly the kitchen of Japan. Here is my complete list of what to eat in Dotonbori and beyond. Don\'t miss the takoyaki at the corner stall!',
      thumbnail: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2109&auto=format&fit=crop',
      tags: { country: 'Japan', city: 'Osaka', sight: 'Dotonbori' },
      aiSummary: 'A comprehensive culinary guide to Osaka. The author emphasizes Dotonbori as the primary food destination and provides a ranked list of street food vendors. Key recommendations include specific takoyaki and okonomiyaki spots.',
      stats: { likes: 8900, comments: 120, shares: 540 }
    },
    {
      id: 'd3',
      type: 'video',
      author: {
        name: 'CultureSeeker',
        avatar: 'https://i.pravatar.cc/150?u=culture',
        platform: 'YouTube'
      },
      title: 'The Truth About Fushimi Inari',
      content: 'Is it worth the hike? I climbed to the very top of Mount Inari to show you what it\'s really like beyond the first few gates.',
      thumbnail: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop',
      tags: { country: 'Japan', city: 'Kyoto', sight: 'Fushimi Inari' },
      aiSummary: 'An evaluative look at the Fushimi Inari shrine hike. The creator concludes that while the lower sections are crowded, the upper trails offer a peaceful experience and unique views of Kyoto. Suggests allowing 2-3 hours for the full loop.',
      stats: { likes: 45000, comments: 1200, shares: 8900 }
    },
    {
      id: 'd4',
      type: 'video',
      author: {
        name: 'JapanVibes',
        avatar: 'https://i.pravatar.cc/150?u=jv',
        platform: 'Instagram'
      },
      title: 'Nara Deer Park Survival Guide',
      content: 'The deer are cute but they are hungry! Here is how to feed them without getting chased.',
      thumbnail: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop',
      tags: { country: 'Japan', city: 'Nara', sight: 'Nara Park' },
      aiSummary: 'Practical advice for interacting with Nara\'s famous deer. Recommends buying crackers only when ready to feed and using specific hand signals to show you\'re out of food.',
      stats: { likes: 15600, comments: 340, shares: 1200 }
    },
    {
      id: 'd5',
      type: 'text',
      author: {
        name: 'ZenTraveler',
        avatar: 'https://i.pravatar.cc/150?u=zen',
        platform: 'LittleRedBook'
      },
      title: 'Morning Zen at Ryoan-ji',
      content: 'The rock garden at Ryoan-ji is best experienced at 8 AM. The silence is profound.',
      thumbnail: 'https://images.unsplash.com/photo-1528164344705-4754268799af?q=80&w=2070&auto=format&fit=crop',
      tags: { country: 'Japan', city: 'Kyoto', sight: 'Ryoan-ji' },
      aiSummary: 'A meditative guide to Kyoto\'s most famous rock garden. Suggests arriving at opening time to experience the intended tranquility and provides historical context on Zen aesthetics.',
      stats: { likes: 3200, comments: 85, shares: 420 }
    },
    {
      id: 'd6',
      type: 'video',
      author: {
        name: 'StreetFoodKing',
        avatar: 'https://i.pravatar.cc/150?u=sfk',
        platform: 'YouTube'
      },
      title: 'Nishiki Market: What to Eat',
      content: 'I ate EVERYTHING at Nishiki Market so you don\'t have to. Here are the top 5 stalls.',
      thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop',
      tags: { country: 'Japan', city: 'Kyoto', sight: 'Nishiki Market' },
      aiSummary: 'A high-energy food tour of Kyoto\'s "Kitchen". Identifies the best soy milk donuts, grilled seafood skewers, and tamagoyaki. Warns about the "no eating while walking" rule.',
      stats: { likes: 67000, comments: 2100, shares: 15000 }
    }
  ],
  flights: [
    {
      id: 'f1',
      price: 850,
      outbound: {
        airline: 'Japan Airlines',
        airlineLogo: 'https://images.unsplash.com/photo-1612255375371-51203b1231f0?w=100&h=100&fit=crop',
        flightNumber: 'JL 001',
        departureTime: '10:30',
        arrivalTime: '14:45',
        origin: 'SFO',
        destination: 'NRT',
        duration: '11h 15m'
      },
      returnFlight: {
        airline: 'Japan Airlines',
        airlineLogo: 'https://images.unsplash.com/photo-1612255375371-51203b1231f0?w=100&h=100&fit=crop',
        flightNumber: 'JL 002',
        departureTime: '17:00',
        arrivalTime: '10:15',
        origin: 'NRT',
        destination: 'SFO',
        duration: '9h 15m'
      },
      stops: 0,
      totalDuration: '20h 30m',
      type: 'Best'
    },
    {
      id: 'f2',
      price: 620,
      outbound: {
        airline: 'United Airlines',
        airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop',
        flightNumber: 'UA 837',
        departureTime: '11:15',
        arrivalTime: '15:30',
        origin: 'SFO',
        destination: 'NRT',
        duration: '11h 15m'
      },
      returnFlight: {
        airline: 'United Airlines',
        airlineLogo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop',
        flightNumber: 'UA 838',
        departureTime: '18:00',
        arrivalTime: '11:20',
        origin: 'NRT',
        destination: 'SFO',
        duration: '9h 20m'
      },
      stops: 0,
      totalDuration: '20h 35m',
      type: 'Cheapest'
    },
    {
      id: 'f3',
      price: 1200,
      outbound: {
        airline: 'ANA',
        airlineLogo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=100&h=100&fit=crop',
        flightNumber: 'NH 007',
        departureTime: '12:00',
        arrivalTime: '15:15',
        origin: 'SFO',
        destination: 'NRT',
        duration: '10h 15m'
      },
      returnFlight: {
        airline: 'ANA',
        airlineLogo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=100&h=100&fit=crop',
        flightNumber: 'NH 008',
        departureTime: '16:30',
        arrivalTime: '09:45',
        origin: 'NRT',
        destination: 'SFO',
        duration: '9h 15m'
      },
      stops: 0,
      totalDuration: '19h 30m',
      type: 'Fastest'
    },
    {
      id: 'f4',
      price: 550,
      outbound: {
        airline: 'Zipair',
        airlineLogo: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=100&h=100&fit=crop',
        flightNumber: 'ZG 021',
        departureTime: '14:00',
        arrivalTime: '18:30',
        origin: 'SFO',
        destination: 'NRT',
        duration: '11h 30m'
      },
      returnFlight: {
        airline: 'Zipair',
        airlineLogo: 'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=100&h=100&fit=crop',
        flightNumber: 'ZG 022',
        departureTime: '20:00',
        arrivalTime: '13:00',
        origin: 'NRT',
        destination: 'SFO',
        duration: '9h 00m'
      },
      stops: 1,
      totalDuration: '20h 30m',
      type: 'Other'
    }
  ]
};
