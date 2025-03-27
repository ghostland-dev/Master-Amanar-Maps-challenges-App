
export interface ChallengeStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isLocked: boolean;
  estimatedTime?: string; // Durée estimée pour compléter l'étape
  difficulty?: "easy" | "medium" | "hard"; // Niveau de difficulté de l'étape
  tips?: string[]; // Conseils pour réussir l'étape
  resources?: {
    title: string;
    url: string;
    type: string;
  }[]; // Ressources spécifiques à l'étape
}

export interface ChallengeResource {
  id: number;
  title: string;
  type: string;
  url: string;
  description?: string; // Description de la ressource
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  xp: number;
  progress: number;
  currentStep: number;
  totalSteps: number;
  objective?: string; // Objectif principal du challenge
  prerequisites?: string[]; // Prérequis pour commencer le challenge
  learningOutcomes?: string[]; // Ce que l'utilisateur va apprendre
  steps: ChallengeStep[];
  resources: ChallengeResource[];
  faqs?: {
    question: string;
    answer: string;
  }[]; // FAQ sur le challenge
}
