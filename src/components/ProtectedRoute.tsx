
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
};

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Afficher un indicateur de chargement pendant la vérification de l'authentification
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion avec l'URL actuelle en state pour redirection après connexion
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    // Rediriger vers la page d'accueil si l'utilisateur n'est pas admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
