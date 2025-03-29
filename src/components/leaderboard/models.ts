
import { LucideIcon } from "lucide-react";

export interface User {
  id: number;
  name: string;
  avatar: string;
  points: number;
  rank: number;
  xp: number;
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
  icon?: string;
  percentage?: number;
}

export interface CategoryStats {
  participants: number;
  challengesCompleted: number;
  avgXp: number;
}

export interface CategoryData {
  id: string;
  name: string;
  icon: LucideIcon;
  stats: CategoryStats;
}

export interface UpcomingEvent {
  name: string;
  date: string;
  xp: number;
  type: "challenge" | "competition" | "event";
  description: string;
}

export interface PastEvent {
  title: string;
  description: string;
  winner: string;
  xp: number;
}

export interface UserEvent {
  title: string;
  description: string;
  date: string;
  status: "success" | "failure";
  xp: number;
}
