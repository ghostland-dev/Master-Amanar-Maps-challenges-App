
export interface User {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  xp: number; // Added xp property
  badges: {
    id: string;
    name: string;
    type: "default" | "secondary" | "destructive" | "outline";
    color?: string;
    icon?: string;
    description?: string;
  }[];
  progress: number;
  challenges: number;
  previousRank?: number;
  pointsHistory?: number[];
}

export interface BadgeData {
  name: string;
  value: number;
  icon?: string; // Added icon property
}
