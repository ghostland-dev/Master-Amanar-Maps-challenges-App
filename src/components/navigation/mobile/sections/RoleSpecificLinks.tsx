
import { Building, LinkIcon, BarChart3, Shield } from "lucide-react";
import { MobileNavLink } from "../MobileNavLink";
import { Badge } from "@/components/ui/badge";

interface RoleSpecificLinksProps {
  accessRights: {
    canAccessPartnerPortal?: boolean;
    canAccessAffiliateTools?: boolean;
    canAccessCommercialDashboard?: boolean;
  };
  user: {
    role?: string;
  } | null;
  isActive: (path: string) => boolean;
  onCloseMenu: () => void;
}

export const RoleSpecificLinks = ({
  accessRights,
  user,
  isActive,
  onCloseMenu,
}: RoleSpecificLinksProps) => {
  if (!accessRights.canAccessPartnerPortal && 
      !accessRights.canAccessAffiliateTools && 
      !accessRights.canAccessCommercialDashboard && 
      user?.role !== 'admin' && 
      user?.role !== 'super_admin') {
    return null;
  }

  return (
    <div className="border-b border-border pt-2">
      {accessRights.canAccessPartnerPortal && (
        <MobileNavLink
          to="/partner-portal"
          label="Partenaires"
          icon={Building}
          isActive={isActive("/partner-portal")}
          onClick={onCloseMenu}
        />
      )}

      {accessRights.canAccessAffiliateTools && (
        <MobileNavLink
          to="/affiliate-dashboard"
          label="Affiliation"
          icon={LinkIcon}
          isActive={isActive("/affiliate-dashboard")}
          onClick={onCloseMenu}
        />
      )}

      {accessRights.canAccessCommercialDashboard && (
        <MobileNavLink
          to="/commercial-dashboard"
          label="Commercial"
          icon={BarChart3}
          isActive={isActive("/commercial-dashboard")}
          onClick={onCloseMenu}
        />
      )}

      {(user?.role === "admin" || user?.role === "super_admin") && (
        <MobileNavLink
          to="/admin"
          label="Admin"
          icon={Shield}
          isActive={isActive("/admin")}
          badge={
            <Badge
              variant="outline"
              className="bg-red-500/10 text-red-700 border-red-500 text-xs"
            >
              {user?.role === "super_admin" ? "Super Admin" : "Admin"}
            </Badge>
          }
          onClick={onCloseMenu}
        />
      )}
    </div>
  );
};
