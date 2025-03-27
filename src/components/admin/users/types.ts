
import { z } from "zod";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "pending" | "blocked";
  plan: "free" | "premium";
  createdAt: string;
  avatar: string;
}

export const userSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  role: z.enum(["admin", "user"], {
    message: "Veuillez sélectionner un rôle",
  }),
  status: z.enum(["active", "pending", "blocked"], {
    message: "Veuillez sélectionner un statut",
  }),
  plan: z.enum(["free", "premium"], {
    message: "Veuillez sélectionner un plan",
  }),
});

export type UserFormValues = z.infer<typeof userSchema>;

export const roleLabels = {
  admin: { label: "Admin", color: "bg-purple-500" },
  user: { label: "Utilisateur", color: "bg-blue-500" },
};

export const statusLabels = {
  active: { label: "Actif", color: "bg-green-500" },
  pending: { label: "En attente", color: "bg-yellow-500" },
  blocked: { label: "Bloqué", color: "bg-red-500" },
};

export const planLabels = {
  free: { label: "Gratuit", color: "bg-slate-500" },
  premium: { label: "Premium", color: "bg-amber-500" },
};

export const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    role: "admin",
    status: "active",
    plan: "premium",
    createdAt: "2023-05-15T10:30:00.000Z",
    avatar: "",
  },
  {
    id: "2",
    name: "Marie Lambert",
    email: "marie.lambert@example.com",
    role: "user",
    status: "active",
    plan: "free",
    createdAt: "2023-06-22T14:45:00.000Z",
    avatar: "",
  },
  {
    id: "3",
    name: "Thomas Martin",
    email: "thomas.martin@example.com",
    role: "user",
    status: "active",
    plan: "premium",
    createdAt: "2023-07-10T09:15:00.000Z",
    avatar: "",
  },
  {
    id: "4",
    name: "Sophie Legrand",
    email: "sophie.legrand@example.com",
    role: "user",
    status: "blocked",
    plan: "free",
    createdAt: "2023-08-05T16:20:00.000Z",
    avatar: "",
  },
  {
    id: "5",
    name: "Luc Bernard",
    email: "luc.bernard@example.com",
    role: "user",
    status: "pending",
    plan: "free",
    createdAt: "2023-09-12T11:50:00.000Z",
    avatar: "",
  },
];
