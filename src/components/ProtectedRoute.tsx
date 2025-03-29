
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
  superAdminOnly?: boolean;
  premiumOnly?: boolean;
  requiredAccess?: keyof typeof import('@/context/AuthContext').AccessRights;
  roles?: Array<import('@/context/AuthContext').UserRole>;
};

const ProtectedRoute = ({ 
  children, 
  adminOnly = false, 
  superAdminOnly = false,
  premiumOnly = false,
  requiredAccess,
  roles
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading, hasPremiumAccess, accessRights } = useAuth();
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
    return <Navigate to="/auth?tab=login" state={{ from: location.pathname }} replace />;
  }

  // Vérification du rôle admin
  if (adminOnly && user?.role !== 'admin' && user?.role !== 'super_admin') {
    // Rediriger vers la page d'accueil si l'utilisateur n'est pas admin
    return <Navigate to="/" replace />;
  }

  // Vérification du rôle super_admin
  if (superAdminOnly && user?.role !== 'super_admin') {
    // Rediriger vers la page d'accueil si l'utilisateur n'est pas super admin
    return <Navigate to="/" replace />;
  }

  // Vérification de l'accès premium
  if (premiumOnly && !hasPremiumAccess) {
    // Rediriger vers la page d'abonnement si l'utilisateur n'a pas d'accès premium
    return <Navigate to="/subscriptions" state={{ from: location.pathname }} replace />;
  }

  // Vérification des droits d'accès spécifiques
  if (requiredAccess && !accessRights[requiredAccess]) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Vérification des rôles autorisés
  if (roles && roles.length > 0 && user && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
