
import MainLayout from "@/components/layouts/MainLayout";
import { FileText } from "lucide-react";

const TermsOfService = () => {
  return (
    <MainLayout 
      title="Conditions d'utilisation" 
      description="Conditions générales d'utilisation d'Amanar Map"
    >
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <FileText className="h-12 w-12 text-primary mr-4" />
          <h1 className="text-3xl md:text-4xl font-bold">Conditions d'utilisation</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
          </p>
          
          <h2>1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant Amanar Map, vous acceptez d'être lié par les présentes Conditions d'utilisation. 
            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
          </p>
          
          <h2>2. Description du service</h2>
          <p>
            Amanar Map est une plateforme éducative qui propose des défis, des simulateurs et des ressources 
            pour apprendre et progresser dans divers domaines liés à l'entrepreneuriat et au marketing digital.
          </p>
          
          <h2>3. Comptes utilisateurs</h2>
          <p>
            Pour utiliser certaines fonctionnalités du service, vous devez créer un compte. Vous êtes responsable 
            de maintenir la confidentialité de votre compte et de votre mot de passe. Vous acceptez de nous informer 
            immédiatement de toute utilisation non autorisée de votre compte.
          </p>
          
          <h2>4. Propriété intellectuelle</h2>
          <p>
            Tout le contenu disponible sur Amanar Map, y compris mais sans s'y limiter, les textes, graphiques, 
            logos, icônes, images, clips audio, téléchargements numériques et compilations de données, est la propriété 
            d'Amanar Map ou de ses fournisseurs de contenu et est protégé par les lois internationales sur le droit d'auteur.
          </p>
          
          <h2>5. Restrictions d'utilisation</h2>
          <p>
            Vous acceptez de ne pas:
          </p>
          <ul>
            <li>Utiliser le service d'une manière qui pourrait endommager, désactiver ou surcharger Amanar Map</li>
            <li>Accéder à des données qui ne vous sont pas destinées</li>
            <li>Copier, distribuer ou divulguer toute partie du service</li>
            <li>Tenter de décompiler ou de reconstituer tout logiciel contenu dans le service</li>
          </ul>
          
          <h2>6. Modifications des conditions</h2>
          <p>
            Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet 
            immédiatement après leur publication sur cette page. Votre utilisation continue du service après de telles 
            modifications constitue votre acceptation des nouvelles conditions.
          </p>
          
          <h2>7. Limitation de responsabilité</h2>
          <p>
            Amanar Map ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs 
            résultant de l'utilisation ou de l'incapacité d'utiliser nos services.
          </p>
          
          <h2>8. Droit applicable</h2>
          <p>
            Ces conditions sont régies par les lois françaises. Tout litige relatif à ces conditions sera soumis 
            à la juridiction exclusive des tribunaux français.
          </p>
          
          <h2>9. Contact</h2>
          <p>
            Si vous avez des questions concernant ces conditions, veuillez nous contacter à l'adresse suivante: contact@amanarmap.com
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsOfService;
