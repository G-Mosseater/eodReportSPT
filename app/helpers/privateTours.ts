import { Boat } from "../components/BoatTabs";

export type Tour = {
  id: number;
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  whatsIncluded: string[];
  image: string;
  boats: Boat[];
};

export const privateTours: Tour[] = [
  {
    id: 1,
    name: "Whale Watching",
    slug: "whale-watching",
    description: "Experience majestic whales up close on a guided tour.",
    fullDescription: `Join a private whale watching tour from Reykjavik on boats Andrea, Lilja, or Rósin. Tours are fully customizable in duration and priced per hour.
Spot humpback whales, minke whales, harbour porpoises, white-beaked dolphins, and enjoy Iceland’s rich seabird life. 
Our expert guides provide interactive, educational insights while ensuring comfort, safety, and environmental care.`,
    whatsIncluded: [
      "Guided boat tour",
      "Educational & interactive focus",
      "Warm floatable overalls for comfort & safety",
      "Wi-Fi, Café, and souvenir shop on board",
      "WCs on board",
    ],
    image: "/whale.png",
    boats: [
      {
        name: "Andrea",
        image: "/boats/andrea.png",
        description:
          "One of Iceland’s largest and most comfortable whale watching vessels. Built in 1972, Andrea accommodates up to 198 passengers with spacious indoor lounges, large panoramic windows, and open viewing decks. Designed for all-weather comfort, it features a café, souvenir shop, multiple seating areas, and full accessibility. Ideal for stable, relaxed whale watching with excellent visibility and onboard facilities.",
      },
      {
        name: "Lilja",
        image: "/boats/lilja.png",
        description:
          "High-speed modern catamaran designed for express whale watching. Built for comfort and stability with indoor and outdoor viewing decks, Lilja quickly reaches Faxaflói Bay wildlife areas. Ideal for larger groups and fast, efficient tours with excellent visibility in all conditions.",
      },
      {
        name: "Rosin",
        image: "/boats/Rosin.png",
        description:
          "A fast and modern mid-sized vessel designed for efficient and comfortable wildlife tours. Rosin reaches whale and bird areas quickly with a cruising speed of up to 24 knots, while offering heated indoor seating, large viewing windows, and outdoor decks. Ideal for both whale watching and Northern Lights cruises, combining speed with comfort and excellent visibility in all weather conditions.",
      },
    ],
  },

  {
    id: 2,
    name: "Northern Lights",
    slug: "northern-lights",
    description:
      "Experience the Northern Lights from the sea on a 2–3 hour aurora hunting cruise from Reykjavík.",
    fullDescription: `Join a Northern Lights by Boat tour from Reykjavík and sail into the North Atlantic in search of the aurora borealis. 
Only 15–20 minutes from the city lights, you reach ideal viewing conditions at sea with dark skies and open horizons.

During the tour, our expert guides explain the science and myths behind the Northern Lights, while you enjoy views of Reykjavík’s coastline and surrounding mountains. 
Warm overalls are provided, and you can relax inside with hot drinks or watch our onboard Northern Lights presentation.

Please note: sightings depend on weather and solar activity, but if you don’t see the aurora, you receive a free return ticket to try again.`,
    whatsIncluded: [
      "Guided Northern Lights boat tour",
      "Warm flotation overalls (adult & children sizes)",
      "Onboard Northern Lights presentation",
      "Free Wi-Fi on board",
      "Café / bar access",
      "WCs on board",
      "Free return ticket if no sightings",
    ],
    image: "/nlb.png",
    boats: [
      {
        name: "Andrea",
        image: "/boats/andrea.png",
        description:
          "One of Iceland’s largest and most comfortable whale watching vessels. Built in 1972, Andrea accommodates up to 198 passengers with spacious indoor lounges, large panoramic windows, and open viewing decks. Designed for all-weather comfort, it features a café, souvenir shop, multiple seating areas, and full accessibility. Ideal for stable, relaxed whale watching with excellent visibility and onboard facilities.",
      },
      {
        name: "Lilja",
        image: "/boats/lilja.png",
        description:
          "High-speed modern catamaran designed for express whale watching. Built for comfort and stability with indoor and outdoor viewing decks, Lilja quickly reaches Faxaflói Bay wildlife areas. Ideal for larger groups and fast, efficient tours with excellent visibility in all conditions.",
      },
      {
        name: "Rosin",
        image: "/boats/Rosin.png",
        description:
          "A fast and modern mid-sized vessel designed for efficient and comfortable wildlife tours. Rosin reaches whale and bird areas quickly with a cruising speed of up to 24 knots, while offering heated indoor seating, large viewing windows, and outdoor decks. Ideal for both whale watching and Northern Lights cruises, combining speed with comfort and excellent visibility in all weather conditions.",
      },
    ],
  },

  {
    id: 3,
    name: "Whale Watching by RIB",
    slug: "rib-express",
    description:
      "High-speed RIB boat adventure for close encounters with whales and wildlife.",
    fullDescription: `Experience a thrilling whale watching adventure aboard a high-speed RIB boat from Reykjavík.

This tour brings you closer to whales, dolphins, and seabirds in less time, reaching the best wildlife areas quickly due to the boat’s speed and agility.

Our expert guides ensure a safe and exciting experience while sharing knowledge about Icelandic marine life and nature.

Ideal for guests looking for a more adventurous and fast-paced alternative to traditional whale watching.`,
    whatsIncluded: [
      "High-speed RIB whale watching tour",
      "Expert wildlife guide",
      "Close-up whale and dolphin encounters",
      "Safety equipment (thermal suits, life jackets)",
      "Small group experience",
      "Scenic coastal cruise in Faxaflói Bay",
    ],
    image: "/rib.png",

    boats: [
      {
        name: "Dagmar",
        image: "/boats/dagmar.png",
        description:
          "A high-speed, custom-built RIB (2017) designed for small groups of up to 12 passengers. Equipped with advanced shock seats for a smoother, more comfortable ride, even in rough seas. Cruising at 32 knots, Dagmar offers a fast and exciting wildlife experience, combining whale watching, puffin spotting, and coastal views around Reykjavík.",
      },
      {
        name: "Katla",
        image: "/boats/dagmar.png",
        description: "Fast modern boat for small groups.",
      },
    ],
  },

  {
    id: 4,
    name: "Puffin Tours",
    slug: "puffin-tour",
    description:
      "1-hour Puffin Express boat tour from Reykjavík to nearby nesting islands. Just a short 15-minute sail to Akurey, where you can observe thousands of puffins in their natural habitat while enjoying scenic views of Reykjavík’s coastline and expert wildlife guidance onboard.",
    fullDescription: `Join a 1-hour Puffin Express tour from Reykjavík and visit nearby islands where thousands of puffins nest during summer.

Only a short 15-minute sail from the Old Harbour, you’ll reach puffin colonies on Akurey and surrounding islands. 
Your guide will share fun facts about puffins and local birdlife while you observe them up close in their natural habitat.

The boat is specially designed to approach the islands quietly, giving you great viewing and photography opportunities.`,
    whatsIncluded: [
      "Guided puffin watching boat tour",
      "Close approach to puffin nesting islands",
      "Expert birdlife commentary",
      "Binocular assistance onboard",
      "Great photography opportunities",
    ],
    image: "/puffin.png",
    boats: [
      {
        name: "Skuli",
        image: "/boats/skuli.png",
        description:
          "A classic wooden boat built in 1959, used for puffin watching tours. With a shallow draft, Skúlaskeið is ideal for getting close to bird colonies around the islands while offering a cozy and traditional sailing experience for small groups.",
      },
      {
        name: "Rosin",
        image: "/boats/Rosin.png",
        description:
          "A fast and modern mid-sized vessel designed for efficient and comfortable wildlife tours. Rosin reaches whale and bird areas quickly with a cruising speed of up to 24 knots, while offering heated indoor seating, large viewing windows, and outdoor decks. Ideal for both whale watching and Northern Lights cruises, combining speed with comfort and excellent visibility in all weather conditions.",
      },
    ],
  },

  {
    id: 5,
    name: "Sea Angling",
    slug: "sea-angling",
    description:
      "Relaxing fishing trip in Faxaflói Bay with experienced crew, fresh catch, and onboard BBQ.",
    fullDescription: `Join a Sea Angling tour from Reykjavík and experience traditional fishing in the rich waters of Faxaflói Bay.

Set off from the Old Harbour and head to productive fishing grounds where cod, haddock, pollock, and rockfish are commonly caught. 
Our experienced crew will guide you through the process, making it suitable even for complete beginners.

All equipment is provided, and the crew assists with baiting and fishing techniques throughout the trip. 
After fishing, your catch is grilled on board and served fresh with potatoes and sauce, creating a true Icelandic sea-to-table experience.

This tour is both relaxing and interactive, ideal for families, groups, and anyone wanting an authentic fishing experience in Iceland.`,
    whatsIncluded: [
      "Guided sea angling tour in Faxaflói Bay",
      "Fishing rods and equipment included",
      "Experienced crew assistance",
      "Protective clothing provided",
      "Onboard BBQ of your catch",
      "WCs onboard",
    ],
    image: "/angling.png",
    boats: [
      {
        name: "Rosin",
        image: "/boats/Rosin.png",
        description:
          "A fast and modern mid-sized vessel designed for efficient and comfortable wildlife tours. Rosin reaches whale and bird areas quickly with a cruising speed of up to 24 knots, while offering heated indoor seating, large viewing windows, and outdoor decks. Ideal for both whale watching and Northern Lights cruises, combining speed with comfort and excellent visibility in all weather conditions.",
      },
    ],
  },
];
