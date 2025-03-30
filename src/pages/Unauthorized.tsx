
import { useNavigate } from 'react-router-dom';
import { Shield, Home } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layouts/MainLayout';
import { useAuth } from '@/context/AuthContext';

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <MainLayout title="Accès refusé" description="Vous n'avez pas les droits nécessaires pour accéder à cette page">
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-destructive/10">
                <Shield className="h-10 w-10 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl">Accès refusé</CardTitle>
            <CardDescription>
              Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-center mb-4">
              {user ? (
                <p>
                  Vous êtes connecté en tant que <span className="font-semibold">{user.name}</span> avec le 
                  rôle <span className="font-semibold">{user.role}</span>, qui ne dispose pas des droits d'accès pour cette section.
                </p>
              ) : (
                <p>Veuillez vous connecter avec un compte disposant des droits nécessaires.</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              onClick={() => navigate("/")}
              className="w-full"
            >
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="w-full"
            >
              Retour à la page précédente
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Unauthorized;
