
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, Shield, Building, Link as LinkIcon, 
  BarChart3, Crown, UserCircle 
} from "lucide-react";
import { useAuth, UserRole } from "@/context/AuthContext";

const roleIcons: Record<UserRole, React.ReactNode> = {
  user: <UserCircle className="h-5 w-5 text-blue-500" />,
  client: <User className="h-5 w-5 text-green-500" />,
  partner: <Building className="h-5 w-5 text-amber-500" />,
  affiliate: <LinkIcon className="h-5 w-5 text-purple-500" />,
  commercial: <BarChart3 className="h-5 w-5 text-cyan-500" />,
  admin: <Shield className="h-5 w-5 text-red-500" />,
  super_admin: <Crown className="h-5 w-5 text-orange-500" />,
};

const roleDescriptions: Record<UserRole, string> = {
  user: "Accès standard à la plateforme",
  client: "Accès aux services standards pour les clients",
  partner: "Partenaire avec accès au portail de partenariat",
  affiliate: "Affiliateur avec outils de marketing et suivi",
  commercial: "Commercial avec accès au CRM et analytiques",
  admin: "Administrateur avec accès à la gestion de la plateforme",
  super_admin: "Super administrateur avec tous les droits d'accès",
};

const roleBadgeColors: Record<UserRole, string> = {
  user: "bg-blue-500",
  client: "bg-green-500",
  partner: "bg-amber-500",
  affiliate: "bg-purple-500",
  commercial: "bg-cyan-500",
  admin: "bg-red-500",
  super_admin: "bg-orange-500",
};

const accessRightLabels: Record<keyof import('@/context/AuthContext').AccessRights, string> = {
  canAccessDashboard: "Dashboard",
  canAccessChallenges: "Challenges",
  canAccessPremiumContent: "Contenu premium",
  canManageUsers: "Gestion des utilisateurs",
  canManageChallenges: "Gestion des challenges",
  canManageSubscriptions: "Gestion des abonnements",
  canViewAnalytics: "Statistiques",
  canAccessPartnerPortal: "Portail partenaire",
  canAccessAffiliateTools: "Outils d'affiliation",
  canAccessCommercialDashboard: "Dashboard commercial",
};

export const RoleInfo = () => {
  const { user, accessRights } = useAuth();

  if (!user) {
    return null;
  }

  const role = user.role as UserRole;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {roleIcons[role]}
            <CardTitle>Rôle et Accès</CardTitle>
          </div>
          <Badge className={roleBadgeColors[role]}>
            {role.charAt(0).toUpperCase() + role.slice(1).replace('_', ' ')}
          </Badge>
        </div>
        <CardDescription>{roleDescriptions[role]}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Droits d'accès</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(accessRights)
              .filter(([_, hasAccess]) => hasAccess)
              .map(([right]) => (
                <Badge key={right} variant="outline" className="bg-secondary/50">
                  {accessRightLabels[right as keyof typeof accessRights]}
                </Badge>
              ))}
          </div>
          
          {user.subscription && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Niveau d'abonnement</h3>
              <Badge className={user.subscription.tier === 'premium' ? 'bg-primary' : user.subscription.tier === 'enterprise' ? 'bg-purple-600' : 'bg-muted'}>
                {user.subscription.tier.charAt(0).toUpperCase() + user.subscription.tier.slice(1)}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
