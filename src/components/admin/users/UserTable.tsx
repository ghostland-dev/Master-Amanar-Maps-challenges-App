import { 
  PenSquare, AlertCircle, 
  Edit, Lock, Unlock, Mail, Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { User, roleLabels, statusLabels, planLabels } from "./types";
import { formatDate } from "../utils";

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onSendPasswordReset: (user: User) => void;
}

export const UserTable = ({
  users,
  onEditUser,
  onDeleteUser,
  onToggleStatus,
  onSendPasswordReset
}: UserTableProps) => {
  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead className="hidden md:table-cell">Rôle</TableHead>
              <TableHead className="hidden md:table-cell">Plan</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="hidden md:table-cell">Inscrit le</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                  Aucun utilisateur ne correspond à votre recherche
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="md:hidden flex flex-wrap gap-1 mt-1">
                          <Badge className={roleLabels[user.role].color + " text-xs"}>
                            {roleLabels[user.role].label}
                          </Badge>
                          <Badge className={planLabels[user.plan].color + " text-xs"}>
                            {planLabels[user.plan].label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className={roleLabels[user.role].color}>
                      {roleLabels[user.role].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className={planLabels[user.plan].color}>
                      {planLabels[user.plan].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusLabels[user.status].color}>
                      {statusLabels[user.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <PenSquare className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditUser(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onToggleStatus(user)}>
                          {user.status === "active" ? (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              Bloquer
                            </>
                          ) : (
                            <>
                              <Unlock className="mr-2 h-4 w-4" />
                              Activer
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onSendPasswordReset(user)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Réinitialiser le mot de passe
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDeleteUser(user)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
