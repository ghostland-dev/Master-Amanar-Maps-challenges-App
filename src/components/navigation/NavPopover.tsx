
import { ContextualPopover } from "./ContextualPopover";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface NavPopoverProps {
  label: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const NavPopover = ({
  label,
  children,
  active = false,
  icon: Icon,
}: NavPopoverProps) => {
  return (
    <NavigationMenuItem>
      <ContextualPopover
        trigger={
          <Button
            variant="ghost"
            className={`px-4 py-2 flex items-center space-x-1 ${
              active ? "bg-primary/10 text-primary" : ""
            }`}
          >
            {Icon && <Icon className="h-4 w-4 mr-1" />}
            <span>{label}</span>
            <ChevronDown className="h-3 w-3 ml-1 opacity-60" />
          </Button>
        }
        content={
          <div className="bg-popover border border-border shadow-lg rounded-md p-2 backdrop-blur-lg">
            {children}
          </div>
        }
        contentClassName="w-64"
      />
    </NavigationMenuItem>
  );
};
