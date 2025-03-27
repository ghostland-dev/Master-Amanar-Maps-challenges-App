
import { User, BadgeData } from "./models";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Sophie Martin",
    avatar: "",
    points: 3750,
    rank: 1,
    previousRank: 1,
    badges: [
      { name: "Expert en Épargne", type: "secondary" },
      { name: "Investisseur Pro", type: "secondary" },
    ],
    progress: 92,
    challenges: 28,
    pointsHistory: [3450, 3560, 3605, 3650, 3750],
  },
  {
    id: 2,
    name: "Thomas Dubois",
    avatar: "",
    points: 3420,
    rank: 2,
    previousRank: 3,
    badges: [
      { name: "Maître Budget", type: "secondary" },
      { name: "Challenger", type: "outline" },
    ],
    progress: 87,
    challenges: 25,
    pointsHistory: [3100, 3200, 3290, 3350, 3420],
  },
  {
    id: 3,
    name: "Emma Petit",
    avatar: "",
    points: 3100,
    rank: 3,
    previousRank: 2,
    badges: [
      { name: "Débutant", type: "outline" },
      { name: "Épargnant", type: "secondary" },
    ],
    progress: 75,
    challenges: 20,
    pointsHistory: [3200, 3190, 3150, 3120, 3100],
  },
  {
    id: 4,
    name: "Lucas Bernard",
    avatar: "",
    points: 2800,
    rank: 4,
    previousRank: 4,
    badges: [
      { name: "Analyste", type: "secondary" },
    ],
    progress: 65,
    challenges: 18,
    pointsHistory: [2600, 2650, 2700, 2750, 2800],
  },
  {
    id: 5,
    name: "Camille Roux",
    avatar: "",
    points: 2450,
    rank: 5,
    previousRank: 6,
    badges: [
      { name: "Débutant", type: "outline" },
    ],
    progress: 58,
    challenges: 15,
    pointsHistory: [2200, 2280, 2350, 2400, 2450],
  },
  {
    id: 6,
    name: "Hugo Leroy",
    avatar: "",
    points: 2100,
    rank: 6,
    previousRank: 5,
    badges: [
      { name: "Novice", type: "outline" },
    ],
    progress: 45,
    challenges: 12,
    pointsHistory: [2200, 2180, 2150, 2120, 2100],
  },
  {
    id: 7,
    name: "Léa Moreau",
    avatar: "",
    points: 1900,
    rank: 7,
    previousRank: 7,
    badges: [
      { name: "Débutant", type: "outline" },
    ],
    progress: 40,
    challenges: 10,
    pointsHistory: [1800, 1820, 1850, 1880, 1900],
  },
];

// Données pour le graphique des badges
export const badgeDistributionData: BadgeData[] = [
  { name: "Investisseur", value: 25 },
  { name: "Épargnant", value: 35 },
  { name: "Budget", value: 20 },
  { name: "Débutant", value: 20 },
];
