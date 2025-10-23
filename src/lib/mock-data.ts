import { Dinner, Host, Location, Review } from '@/types'

export const mockData = {
  dinners: [
    {
      id: "dinner_001",
      title: "Authentic Italian Family Feast",
      host: {
        id: "host_001",
        name: "Maria Rossi",
        avatar: "/avatars/maria.jpg",
        rating: 4.9,
        reviewCount: 47,
        superhost: true,
        memberSince: "2020",
        responseRate: 98,
        languages: ["English", "Italian"],
        joinedDate: "2020-01-15",
        responseTime: "within an hour"
      },
      price: 65,
      currency: "USD",
      date: "2024-02-15",
      time: "19:00",
      duration: 3,
      capacity: 8,
      available: 3,
      images: [
        "/dinners/italian-1.jpg",
        "/dinners/italian-2.jpg",
        "/dinners/italian-3.jpg",
        "/dinners/italian-4.jpg",
        "/dinners/italian-5.jpg"
      ],
      cuisine: "Italian",
      dietary: ["vegetarian-friendly"],
      rating: 4.8,
      reviewCount: 23,
      instantBook: true,
      location: {
        city: "Brooklyn",
        state: "NY",
        neighborhood: "Park Slope",
        address: "123 Main St"
      },
      description: "Join our Italian family for an authentic dining experience featuring homemade pasta, traditional sauces, and family recipes passed down through generations.",
      menu: [
        "Antipasto platter with cured meats and cheeses",
        "Homemade fettuccine with mushroom ragu",
        "Osso buco with risotto milanese",
        "Tiramisu made fresh daily"
      ],
      included: ["Welcome aperitivo", "3-course meal", "Wine pairing", "Espresso and dessert"],
      houseRules: [
        "Please arrive on time",
        "Let us know about dietary restrictions in advance",
        "No smoking indoors",
        "Children welcome with advance notice"
      ]
    },
    {
      id: "dinner_002",
      title: "Modern Japanese Omakase Experience",
      host: {
        id: "host_002",
        name: "Takeshi Yamamoto",
        avatar: "/avatars/takeshi.jpg",
        rating: 4.95,
        reviewCount: 89,
        superhost: true,
        memberSince: "2019",
        responseRate: 100,
        languages: ["English", "Japanese"],
        joinedDate: "2019-03-20",
        responseTime: "within an hour"
      },
      price: 120,
      currency: "USD",
      date: "2024-02-16",
      time: "18:30",
      duration: 2.5,
      capacity: 6,
      available: 2,
      images: [
        "/dinners/japanese-1.jpg",
        "/dinners/japanese-2.jpg",
        "/dinners/japanese-3.jpg"
      ],
      cuisine: "Japanese",
      dietary: ["gluten-free options"],
      rating: 4.9,
      reviewCount: 45,
      instantBook: false,
      location: {
        city: "Manhattan",
        state: "NY",
        neighborhood: "East Village",
        address: "456 2nd Ave"
      },
      description: "An intimate omakase experience featuring seasonal ingredients and traditional Japanese techniques in a modern setting.",
      menu: [
        "Seasonal sashimi selection",
        "Hand-rolled sushi with premium fish",
        "Miso soup with house-made tofu",
        "Matcha ice cream with mochi"
      ],
      included: ["Welcome tea", "Omakase tasting menu", "Sake pairing", "Traditional dessert"],
      houseRules: [
        "Counter seating only",
        "No photography during meal preparation",
        "Minimum age 16",
        "Please inform of allergies when booking"
      ]
    },
    {
      id: "dinner_003",
      title: "French Countryside Bistro Night",
      host: {
        id: "host_003",
        name: "Sophie Dubois",
        avatar: "/avatars/sophie.jpg",
        rating: 4.7,
        reviewCount: 32,
        superhost: false,
        memberSince: "2021",
        responseRate: 95,
        languages: ["English", "French"],
        joinedDate: "2021-06-10",
        responseTime: "within a few hours"
      },
      price: 85,
      currency: "USD",
      date: "2024-02-17",
      time: "19:30",
      duration: 3,
      capacity: 10,
      available: 5,
      images: [
        "/dinners/french-1.jpg",
        "/dinners/french-2.jpg",
        "/dinners/french-3.jpg"
      ],
      cuisine: "French",
      dietary: ["vegetarian options"],
      rating: 4.6,
      reviewCount: 18,
      instantBook: true,
      location: {
        city: "San Francisco",
        state: "CA",
        neighborhood: "Mission District",
        address: "789 Mission St"
      },
      description: "Classic French bistro cuisine in a cozy apartment setting, featuring seasonal ingredients and traditional cooking methods.",
      menu: [
        "French onion soup gratinée",
        "Coq au vin with herbed potatoes",
        "Ratatouille provençale",
        "Crème brûlée with vanilla bean"
      ],
      included: ["Apéritif", "3-course meal", "French wine selection", "Coffee and petit fours"],
      houseRules: [
        "BYOB welcome",
        "Casual dress code",
        "Please remove shoes at entrance",
        "Pet-friendly household"
      ]
    }
  ],
  reviews: [
    {
      id: "review_001",
      dinnerId: "dinner_001",
      author: {
        name: "John Doe",
        avatar: "/avatars/john.jpg"
      },
      rating: 5,
      date: "2024-01-20",
      text: "Amazing experience! Maria's cooking reminded me of my grandmother's recipes. The atmosphere was warm and welcoming, and the other guests were delightful company.",
      hostResponse: "Thank you so much John! It was lovely having you and hearing your family stories. You're welcome back anytime!"
    },
    {
      id: "review_002",
      dinnerId: "dinner_001",
      author: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah.jpg"
      },
      rating: 5,
      date: "2024-01-15",
      text: "Absolutely perfect evening. The food was incredible and Maria made everyone feel like family. The pasta was the best I've had outside of Italy!",
      hostResponse: "Grazie mille Sarah! Your enthusiasm for Italian culture made the evening even more special."
    }
  ]
}

export default mockData