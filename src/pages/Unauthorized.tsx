
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldX, Home, ArrowLeft } from 'lucide-react';

const Unauthorized: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <ShieldX className="h-24 w-24 text-destructive" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Accès refusé</h1>
        
        <p className="text-muted-foreground mb-8">
          Vous n'avez pas les autorisations nécessaires pour accéder à cette page. 
          Veuillez contacter un administrateur si vous pensez que c'est une erreur.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
          
          <Link to="/">
            <Button className="flex items-center gap-2 w-full">
              <Home className="h-4 w-4" /> Accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
