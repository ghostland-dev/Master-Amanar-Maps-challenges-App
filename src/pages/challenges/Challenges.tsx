
import React, { useState, useEffect } from 'react';
import ChallengeViewTabs from './components/ChallengeViewTabs';
import ChallengeStats from './components/ChallengeStats';
import ChallengeList from './components/ChallengeList';
import { useToast } from '@/hooks/use-toast';

// Importation des défis depuis les utilitaires
import { getAllChallenges } from '@/utils/challenge';

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        // Utiliser la fonction d'utilitaire pour obtenir les défis
        const allChallenges = getAllChallenges();
        setChallenges(allChallenges);
      } catch (error) {
        console.error("Erreur lors du chargement des défis:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les défis. Veuillez réessayer plus tard.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [toast]);

  const filteredChallenges = challenges.filter((challenge) => {
    if (viewMode === 'all') return true;
    if (viewMode === 'progress') return challenge.progress > 0 && challenge.progress < 100;
    if (viewMode === 'completed') return challenge.progress === 100;
    if (viewMode === 'new') return challenge.isNew;
    return true;
  });

  const resetFilters = () => {
    setViewMode('all');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Challenges</h1>
          <p className="text-muted-foreground">
            Relevez des défis pour améliorer vos compétences et gagner des récompenses
          </p>
        </div>
      </div>

      {/* Stats des challenges */}
      <ChallengeStats challenges={challenges} />

      {/* Onglets de filtrage */}
      <ChallengeViewTabs viewMode={viewMode} setViewMode={setViewMode} />

      {/* Liste des challenges */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <ChallengeList challenges={filteredChallenges} resetFilters={resetFilters} />
      )}
    </div>
  );
};

export default Challenges;
