
import { Search, Filter, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusLabels, roleLabels, planLabels } from "./types";

interface UserFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  planFilter: string;
  setPlanFilter: (plan: string) => void;
}

export const UserFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
  planFilter,
  setPlanFilter,
}: UserFiltersProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un utilisateur..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Statut
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  Tous les statuts
                  {statusFilter === "all" && <Check className="ml-2 h-4 w-4" />}
                </DropdownMenuItem>
                {Object.entries(statusLabels).map(([key, { label }]) => (
                  <DropdownMenuItem 
                    key={key}
                    onClick={() => setStatusFilter(key)}
                  >
                    {label}
                    {statusFilter === key && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Rôle
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setRoleFilter("all")}>
                  Tous les rôles
                  {roleFilter === "all" && <Check className="ml-2 h-4 w-4" />}
                </DropdownMenuItem>
                {Object.entries(roleLabels).map(([key, { label }]) => (
                  <DropdownMenuItem 
                    key={key}
                    onClick={() => setRoleFilter(key)}
                  >
                    {label}
                    {roleFilter === key && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Plan
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPlanFilter("all")}>
                  Tous les plans
                  {planFilter === "all" && <Check className="ml-2 h-4 w-4" />}
                </DropdownMenuItem>
                {Object.entries(planLabels).map(([key, { label }]) => (
                  <DropdownMenuItem 
                    key={key}
                    onClick={() => setPlanFilter(key)}
                  >
                    {label}
                    {planFilter === key && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
