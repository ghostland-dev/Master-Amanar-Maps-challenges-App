
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
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
          setUser(JSON.parse(storedUser));
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
        role: email.includes('admin') ? 'admin' as const : 'user' as const
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
        role: 'user' as const
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('finquest_user');
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur FinQuest !",
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup
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
