
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

type SubscriptionTier = 'free' | 'premium' | 'enterprise';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  subscription: {
    tier: SubscriptionTier;
    active: boolean;
    expiresAt: Date | null;
  };
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasPremiumAccess: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  upgradeSubscription: (tier: SubscriptionTier) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('finquest_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // Ensure the user object has the required subscription structure
          if (!parsedUser.subscription) {
            parsedUser.subscription = {
              tier: 'free',
              active: true,
              expiresAt: null
            };
          }
          
          setUser(parsedUser);
        }
      } catch (error) {
        // Si erreur, on nettoie le localStorage
        localStorage.removeItem('finquest_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulation d'un délai d'authentification
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API d'authentification
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Pour la démo, on accepte n'importe quel email/mot de passe
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        role: email.includes('admin') ? 'admin' as const : 'user' as const,
        subscription: {
          tier: 'free' as SubscriptionTier,
          active: true,
          expiresAt: null
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('finquest_user', JSON.stringify(mockUser));
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur FinQuest !",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Veuillez vérifier vos identifiants",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API pour l'inscription
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: `${Date.now()}`,
        name: name,
        email: email,
        role: 'user' as const,
        subscription: {
          tier: 'free' as SubscriptionTier,
          active: true,
          expiresAt: null
        }
      };
      
      setUser(mockUser);
      localStorage.setItem('finquest_user', JSON.stringify(mockUser));
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès !",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: "Impossible de créer votre compte",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const upgradeSubscription = async (tier: SubscriptionTier) => {
    if (!user) return;

    setIsLoading(true);
    
    try {
      // Simulation d'un appel API pour la mise à jour de l'abonnement
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = {
        ...user,
        subscription: {
          tier: tier,
          active: true,
          expiresAt: tier === 'free' ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // expire dans 30 jours
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('finquest_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Abonnement mis à jour",
        description: `Votre abonnement a été mis à jour vers ${tier === 'premium' ? 'Premium' : tier === 'enterprise' ? 'Enterprise' : 'Gratuit'}.`,
      });
    } catch (error) {
      toast({
        title: "Erreur de mise à jour",
        description: "Impossible de mettre à jour votre abonnement",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('finquest_user');
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur FinQuest !",
    });
    navigate('/');
  };

  // Détermine si l'utilisateur a accès au contenu premium
  const hasPremiumAccess = Boolean(user?.subscription?.tier !== 'free' && user?.subscription?.active);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        hasPremiumAccess,
        login,
        logout,
        signup,
        upgradeSubscription
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
