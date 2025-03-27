
import { Challenge, ChallengeStep } from "@/utils/challenge/types";
import { generatePdfFromData } from "@/utils/pdf";
import { PdfGenerationOptions } from "@/utils/pdf/types";

export const generateChallengePdf = (challenge: Challenge, toast: any) => {
  const data = {
    "Challenge": {
      "Titre": challenge.title,
      "Niveau": challenge.difficulty || "Non spécifié",
      "Description": challenge.description,
      "Durée estimée": challenge.duration,
      "Date de début": new Date().toLocaleDateString(),
      "Progression": `${challenge.currentStep}/${challenge.totalSteps} étapes complétées`,
      "Objectif": challenge.objective || "Non spécifié",
    },
    "Prérequis": challenge.prerequisites || ["Aucun prérequis spécifique"],
    "Compétences à acquérir": challenge.learningOutcomes || ["Non spécifié"],
    "Étapes": challenge.steps.map(step => ({
      "Titre": step.title,
      "Description": step.description,
      "Difficulté": getDifficultyLabel(step.difficulty) || "Non spécifié",
      "Temps estimé": step.estimatedTime || "Non spécifié",
      "Status": step.isCompleted ? "Terminé" : step.isLocked ? "Bloqué" : "En cours",
      "Conseils": step.tips || ["Aucun conseil spécifique"]
    })),
    "Ressources": challenge.resources.map(resource => ({
      "Titre": resource.title,
      "Type": resource.type,
      "Description": resource.description || "Aucune description"
    })),
    "FAQ": challenge.faqs?.map(faq => ({
      "Question": faq.question,
      "Réponse": faq.answer
    })) || []
  };

  try {
    generatePdfFromData(data, {
      title: `Guide complet du challenge: ${challenge.title}`,
      filename: `challenge-${challenge.id}-guide.pdf`,
      subject: "Guide de challenge FinQuest"
    });
    
    toast({
      title: "Guide téléchargé",
      description: "Le guide complet du challenge a été téléchargé avec succès",
    });
  } catch (error) {
    toast({
      title: "Erreur",
      description: "Impossible de générer le PDF",
      variant: "destructive",
    });
  }
};

export const getDifficultyLabel = (difficulty?: string) => {
  switch (difficulty) {
    case "easy":
      return "Facile";
    case "medium":
      return "Intermédiaire";
    case "hard":
      return "Avancé";
    default:
      return "";
  }
};
