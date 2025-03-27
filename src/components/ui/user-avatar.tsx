
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/components/admin/utils";
import { cn } from "@/lib/utils";

export interface UserAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  fallbackText?: string;
  fallbackColor?: string;
  size?: "sm" | "md" | "lg" | "xl";
  border?: boolean;
  borderColor?: string;
}

export function UserAvatar({
  user,
  fallbackText,
  fallbackColor = "bg-muted",
  size = "md",
  border = false,
  borderColor = "border-border",
  className,
  ...props
}: UserAvatarProps) {
  // Calculate the size class based on the size prop
  const sizeClass = React.useMemo(() => {
    switch (size) {
      case "sm":
        return "h-8 w-8";
      case "lg":
        return "h-12 w-12";
      case "xl":
        return "h-16 w-16";
      default:
        return "h-10 w-10"; // Medium (default)
    }
  }, [size]);

  // Determine fallback text
  const getFallbackText = React.useMemo(() => {
    if (fallbackText) return fallbackText;
    if (user?.name) return getInitials(user.name);
    if (user?.email) return user.email.substring(0, 2).toUpperCase();
    return "?";
  }, [fallbackText, user?.name, user?.email]);

  return (
    <Avatar 
      className={cn(
        sizeClass,
        border && `border-2 ${borderColor}`,
        className
      )} 
      {...props}
    >
      {user?.avatar && <AvatarImage src={user.avatar} alt={user?.name || "User avatar"} />}
      <AvatarFallback className={fallbackColor}>
        {getFallbackText}
      </AvatarFallback>
    </Avatar>
  );
}
