
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

export type SubscriptionTier = 'free' | 'premium' | 'enterprise';

export type UserRole = 'user' | 'client' | 'partner' | 'affiliate' | 'commercial' | 'admin' | 'super_admin';

export interface AccessRights {
  canAccessDashboard: boolean;
  canAccessChallenges: boolean;
  canAccessPremiumContent: boolean;
  canManageUsers: boolean;
  canManageChallenges: boolean;
  canManageSubscriptions: boolean;
  canViewAnalytics: boolean;
  canAccessPartnerPortal: boolean;
  canAccessAffiliateTools: boolean;
  canAccessCommercialDashboard: boolean;
}

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
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
  accessRights: AccessRights;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role?: UserRole) => Promise<void>;
  upgradeSubscription: (tier: SubscriptionTier) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Définition des droits d'accès par rôle
const getRoleAccessRights = (role: UserRole, hasPremium: boolean): AccessRights => {
  const baseAccess = {
    canAccessDashboard: true,
    canAccessChallenges: true,
    canAccessPremiumContent: hasPremium,
    canManageUsers: false,
    canManageChallenges: false,
    canManageSubscriptions: false,
    canViewAnalytics: false,
    canAccessPartnerPortal: false,
    canAccessAffiliateTools: false,
    canAccessCommercialDashboard: false,
  };

  switch (role) {
    case 'client':
      return {
        ...baseAccess,
        // Le client a les accès de base
      };
    case 'partner':
      return {
        ...baseAccess,
        canAccessPartnerPortal: true,
        canAccessPremiumContent: true,
      };
    case 'affiliate':
      return {
        ...baseAccess,
        canAccessAffiliateTools: true,
      };
    case 'commercial':
      return {
        ...baseAccess,
        canAccessCommercialDashboard: true,
        canViewAnalytics: true,
      };
    case 'admin':
      return {
        ...baseAccess,
        canManageUsers: true,
        canManageChallenges: true,
        canViewAnalytics: true,
        canManageSubscriptions: true,
        canAccessPremiumContent: true,
      };
    case 'super_admin':
      return {
        canAccessDashboard: true,
        canAccessChallenges: true,
        canAccessPremiumContent: true,
        canManageUsers: true,
        canManageChallenges: true,
        canManageSubscriptions: true,
        canViewAnalytics: true,
        canAccessPartnerPortal: true,
        canAccessAffiliateTools: true,
        canAccessCommercialDashboard: true,
      };
    default:
      return baseAccess;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessRights, setAccessRights] = useState<AccessRights>({
    canAccessDashboard: false,
    canAccessChallenges: false,
    canAccessPremiumContent: false,
    canManageUsers: false,
    canManageChallenges: false,
    canManageSubscriptions: false,
    canViewAnalytics: false,
    canAccessPartnerPortal: false,
    canAccessAffiliateTools: false,
    canAccessCommercialDashboard: false,
  });
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

          // Mettre à jour les droits d'accès
          const hasPremium = parsedUser.subscription.tier !== 'free' && parsedUser.subscription.active;
          const rights = getRoleAccessRights(parsedUser.role, hasPremium);
          setAccessRights(rights);
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
      
      // Détermination du rôle basé sur l'email pour la démo
      let role: UserRole = 'user';
      if (email.includes('client')) role = 'client';
      else if (email.includes('partner')) role = 'partner';
      else if (email.includes('affiliate')) role = 'affiliate';
      else if (email.includes('commercial')) role = 'commercial';
      else if (email.includes('admin')) role = 'admin';
      else if (email.includes('superadmin')) role = 'super_admin';
      
      // Création de l'utilisateur mock
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        role: role,
        subscription: {
          tier: role === 'admin' || role === 'super_admin' || role === 'partner' ? 'premium' as SubscriptionTier : 'free' as SubscriptionTier,
          active: true,
          expiresAt: null
        }
      };
      
      // Mise à jour de l'état utilisateur
      setUser(mockUser);
      
      // Mise à jour des droits d'accès
      const hasPremium = mockUser.subscription.tier !== 'free' && mockUser.subscription.active;
      const rights = getRoleAccessRights(mockUser.role, hasPremium);
      setAccessRights(rights);
      
      localStorage.setItem('finquest_user', JSON.stringify(mockUser));
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue sur FinQuest ! Vous êtes connecté en tant que ${role}.`,
      });
      
      // Rediriger vers la page appropriée en fonction du rôle
      if (role === 'admin' || role === 'super_admin') {
        navigate('/admin');
      } else if (role === 'commercial') {
        navigate('/commercial-dashboard');
      } else if (role === 'partner') {
        navigate('/partner-portal');
      } else if (role === 'affiliate') {
        navigate('/affiliate-dashboard');
      } else {
        navigate('/dashboard');
      }
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

  const signup = async (name: string, email: string, password: string, role: UserRole = 'user') => {
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API pour l'inscription
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUser = {
        id: `${Date.now()}`,
        name: name,
        email: email,
        role: role,
        subscription: {
          tier: 'free' as SubscriptionTier,
          active: true,
          expiresAt: null
        }
      };
      
      setUser(mockUser);
      
      // Mise à jour des droits d'accès
      const hasPremium = mockUser.subscription.tier !== 'free' && mockUser.subscription.active;
      const rights = getRoleAccessRights(mockUser.role, hasPremium);
      setAccessRights(rights);
      
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
      
      // Mise à jour des droits d'accès avec le nouveau niveau d'abonnement
      const hasPremium = updatedUser.subscription.tier !== 'free' && updatedUser.subscription.active;
      const rights = getRoleAccessRights(updatedUser.role, hasPremium);
      setAccessRights(rights);
      
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
    setAccessRights({
      canAccessDashboard: false,
      canAccessChallenges: false,
      canAccessPremiumContent: false,
      canManageUsers: false,
      canManageChallenges: false,
      canManageSubscriptions: false,
      canViewAnalytics: false,
      canAccessPartnerPortal: false,
      canAccessAffiliateTools: false,
      canAccessCommercialDashboard: false,
    });
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
        accessRights,
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
