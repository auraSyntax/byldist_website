import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  category: string;
  location: string;
  area: string;
  year: string;
  status: "Completed" | "In Progress";
  image: string;
  images: string[];
  overview: string;
  philosophy: string;
  features: ProjectFeature[];
}

export const projectsData: ProjectData[] = [
  {
    id: "white-house-residence",
    title: "The White House Residence",
    tagline: "Where minimalist elegance meets modern living",
    category: "Residential",
    location: "Chennai, India",
    area: "4,500 sq. ft",
    year: "2023",
    status: "Completed",
    image: project1,
    images: [project1, project2, project3, project4],
    overview: "The White House Residence represents the pinnacle of contemporary residential design, seamlessly blending minimalist aesthetics with functional luxury. This bespoke project was conceived to create a sanctuary for a discerning family seeking an urban retreat that embodies sophistication without compromising on comfort. Every element, from the sweeping open floor plans to the carefully curated material palette, speaks to an unwavering commitment to architectural excellence.",
    philosophy: "Our design philosophy centered on the interplay of light and space. We embraced the concept of 'less is more,' allowing natural materials and abundant daylight to become the primary decorative elements. The result is a home that breathes, evolves with the seasons, and provides a timeless backdrop for modern living.",
    features: [
      {
        title: "Open-Concept Living",
        description: "Seamless flow between living, dining, and outdoor spaces creates an expansive atmosphere that adapts to both intimate gatherings and large celebrations."
      },
      {
        title: "Sustainable Materials",
        description: "Locally sourced stone, reclaimed wood, and low-VOC finishes ensure minimal environmental impact while creating a healthy indoor environment."
      },
      {
        title: "Smart Home Integration",
        description: "Invisible technology seamlessly controls lighting, climate, and security, responding intuitively to the residents' daily rhythms."
      },
      {
        title: "Indoor-Outdoor Living",
        description: "Floor-to-ceiling glass panels and a cantilevered terrace dissolve the boundaries between interior spaces and landscaped gardens."
      }
    ]
  },
  {
    id: "meridian-dining",
    title: "Meridian Dining Experience",
    tagline: "A culinary stage designed for the senses",
    category: "Interior",
    location: "Delhi, India",
    area: "2,800 sq. ft",
    year: "2023",
    status: "Completed",
    image: project2,
    images: [project2, project1, project4, project3],
    overview: "Meridian Dining represents a bold reimagining of the fine dining experience. Commissioned by visionary restaurateurs, this interior project transforms a heritage building into a contemporary gastronomic destination. The space orchestrates a journey from the bustling street through a series of carefully choreographed moments, culminating in an intimate dining environment that elevates every meal into an occasion.",
    philosophy: "We approached this project as theater designers might approach a stage. Every sight line, every lighting cue, every acoustic consideration was calibrated to enhance the dining narrative. The architecture recedes to support the culinary artistry, creating a canvas where food, service, and ambiance perform in harmony.",
    features: [
      {
        title: "Acoustic Excellence",
        description: "Custom acoustic panels and strategic material choices ensure intimate conversation while maintaining the energy of a vibrant restaurant."
      },
      {
        title: "Theatrical Lighting",
        description: "A layered lighting system transitions seamlessly from bright lunch service to intimate evening ambiance, highlighting architectural features and table presentations."
      },
      {
        title: "Heritage Restoration",
        description: "Original architectural elements were carefully restored and juxtaposed against contemporary interventions, creating a dialogue between past and present."
      },
      {
        title: "Bespoke Furnishings",
        description: "Every piece of furniture was custom-designed and crafted by local artisans, ensuring comfort while reinforcing the restaurant's unique identity."
      }
    ]
  },
  {
    id: "horizon-corporate",
    title: "Horizon Corporate HQ",
    tagline: "Redefining the modern workplace",
    category: "Commercial",
    location: "Bangalore, India",
    area: "25,000 sq. ft",
    year: "2022",
    status: "Completed",
    image: project3,
    images: [project3, project4, project1, project2],
    overview: "Horizon Corporate HQ challenges conventional notions of office design, creating a workplace that prioritizes human wellbeing alongside productivity. This expansive headquarters for a leading technology company was conceived as a campus within a building—a collection of neighborhoods that foster collaboration, creativity, and focus in equal measure. The result is a space that attracts top talent and inspires breakthrough innovation.",
    philosophy: "We believe that great work emerges from great environments. Our design philosophy prioritized biophilic elements, flexible spaces, and technology integration that empowers rather than intrudes. The workplace becomes a tool that adapts to diverse working styles and evolving organizational needs.",
    features: [
      {
        title: "Biophilic Design",
        description: "Living walls, natural light optimization, and organic materials connect occupants with nature, reducing stress and enhancing cognitive performance."
      },
      {
        title: "Activity-Based Working",
        description: "Diverse work settings—from focused pods to collaborative lounges—allow employees to choose environments that match their tasks and preferences."
      },
      {
        title: "Wellness Infrastructure",
        description: "Integrated fitness facilities, meditation rooms, and ergonomic furniture support physical and mental wellbeing throughout the workday."
      },
      {
        title: "Sustainable Operations",
        description: "LEED Platinum certification achieved through renewable energy integration, water recycling, and comprehensive waste management systems."
      }
    ]
  },
  {
    id: "grand-sapphire",
    title: "Grand Sapphire Hotel",
    tagline: "Luxury hospitality reimagined",
    category: "Hospitality",
    location: "Goa, India",
    area: "85,000 sq. ft",
    year: "2024",
    status: "In Progress",
    image: project4,
    images: [project4, project3, project2, project1],
    overview: "Grand Sapphire Hotel represents the future of coastal luxury hospitality. This ambitious project transforms a pristine beachfront site into a world-class resort that honors its natural setting while offering unparalleled guest experiences. The design draws inspiration from traditional Goan architecture and Portuguese colonial influences, reinterpreted through a contemporary lens that appeals to the modern luxury traveler.",
    philosophy: "Our approach celebrates the genius loci—the spirit of place. Every design decision responds to the unique character of this coastal location, from the orientation that maximizes ocean views to the material palette that echoes the hues of sand, sea, and tropical foliage. Sustainability is woven into the fabric of the design, ensuring the resort gives back more than it takes.",
    features: [
      {
        title: "Ocean-Forward Design",
        description: "Every suite offers unobstructed ocean views through full-height glazing, with private terraces that frame the horizon."
      },
      {
        title: "Cultural Integration",
        description: "Local artisans and craftspeople contributed to custom installations, ensuring authentic cultural expression throughout the property."
      },
      {
        title: "Wellness Destination",
        description: "A 12,000 sq. ft spa sanctuary offers holistic treatments inspired by Ayurvedic traditions, complemented by yoga pavilions and meditation gardens."
      },
      {
        title: "Net-Zero Operations",
        description: "Solar integration, rainwater harvesting, and organic waste processing enable carbon-neutral operations without compromising guest comfort."
      }
    ]
  },
  {
    id: "coastal-villa",
    title: "Coastal Villa Retreat",
    tagline: "Serenity by the sea",
    category: "Residential",
    location: "Alibaug, India",
    area: "6,200 sq. ft",
    year: "2022",
    status: "Completed",
    image: project1,
    images: [project1, project4, project2, project3],
    overview: "Coastal Villa Retreat embodies the essence of tropical modernism, creating a weekend sanctuary that blurs the boundaries between architecture and landscape. Designed for a family seeking respite from urban intensity, this villa embraces its waterfront setting with generous outdoor living spaces, natural ventilation, and a material palette that ages gracefully with salt air and sunshine.",
    philosophy: "We designed this home to be discovered rather than displayed. The approach sequence reveals the ocean view gradually, building anticipation. Interior spaces frame specific landscape moments. The architecture serves as a filter between the raw coastal environment and the refined comfort within.",
    features: [
      {
        title: "Passive Cooling",
        description: "Strategic orientation and cross-ventilation minimize air conditioning needs while maximizing comfort during coastal summers."
      },
      {
        title: "Infinity Pool Integration",
        description: "A vanishing-edge pool merges visually with the Arabian Sea, creating a seamless aquatic connection to the horizon."
      },
      {
        title: "Weather-Resistant Materials",
        description: "Marine-grade finishes, weathering steel, and treated timber ensure longevity in the harsh coastal environment."
      },
      {
        title: "Outdoor Living Rooms",
        description: "Covered terraces, pergolas, and garden rooms extend living spaces beyond the building envelope, accommodating the coastal lifestyle."
      }
    ]
  },
  {
    id: "tech-hub",
    title: "Tech Hub Workspace",
    tagline: "Innovation meets inspiration",
    category: "Commercial",
    location: "Hyderabad, India",
    area: "18,000 sq. ft",
    year: "2024",
    status: "In Progress",
    image: project3,
    images: [project3, project1, project4, project2],
    overview: "Tech Hub Workspace pioneers a new paradigm for startup and scale-up companies seeking flexible, inspiring work environments. This multi-tenant creative campus provides plug-and-play infrastructure for technology companies at every stage of growth. The design celebrates the energy and optimism of the startup ecosystem while providing the professional environment that attracts enterprise clients and institutional investors.",
    philosophy: "We designed for adaptability and community. The space must accommodate rapid growth, organizational pivots, and evolving work patterns. Common areas become the social infrastructure that binds diverse companies into a collaborative ecosystem. Individual suites provide brand identity while participating in the larger campus experience.",
    features: [
      {
        title: "Modular Suites",
        description: "Configurable office modules accommodate teams from 5 to 50, with expansion options that eliminate the friction of relocation."
      },
      {
        title: "Community Amenities",
        description: "Shared auditoriums, maker spaces, and rooftop terraces foster cross-pollination between companies and attract external events."
      },
      {
        title: "Fiber Backbone",
        description: "Enterprise-grade connectivity and redundant systems ensure uninterrupted operations for mission-critical applications."
      },
      {
        title: "Showcase Spaces",
        description: "Dedicated demo rooms and presentation facilities help startups pitch to investors and demonstrate products to potential clients."
      }
    ]
  }
];

export function getProjectById(id: string): ProjectData | undefined {
  return projectsData.find(project => project.id === id);
}

export function getRelatedProjects(currentId: string, limit: number = 3): ProjectData[] {
  return projectsData
    .filter(project => project.id !== currentId)
    .slice(0, limit);
}
