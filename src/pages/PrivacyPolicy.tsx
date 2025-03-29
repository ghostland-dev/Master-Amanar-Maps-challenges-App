
import MainLayout from "@/components/layouts/MainLayout";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <MainLayout 
      title="Politique de confidentialité" 
      description="Politique de confidentialité et de protection des données d'Amanar Map"
    >
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <Shield className="h-12 w-12 text-primary mr-4" />
          <h1 className="text-3xl md:text-4xl font-bold">Politique de confidentialité</h1>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
          </p>
          
          <h2>1. Collecte des données personnelles</h2>
          <p>
            Amanar Map recueille les informations suivantes lorsque vous vous inscrivez:
          </p>
          <ul>
            <li>Informations de contact (nom, prénom, adresse email)</li>
            <li>Informations de profil (nom d'utilisateur, photo de profil)</li>
            <li>Données d'utilisation et de progression dans les défis</li>
            <li>Informations techniques (adresse IP, type de navigateur)</li>
          </ul>
          
          <h2>2. Utilisation des données</h2>
          <p>Nous utilisons vos données personnelles pour:</p>
          <ul>
            <li>Fournir et améliorer nos services</li>
            <li>Personnaliser votre expérience</li>
            <li>Communiquer avec vous concernant votre compte</li>
            <li>Vous envoyer des mises à jour et des informations marketing (si vous y avez consenti)</li>
            <li>Analyser l'utilisation de notre plateforme</li>
          </ul>
          
          <h2>3. Partage des données</h2>
          <p>
            Nous ne vendons pas vos informations personnelles à des tiers. Nous pouvons partager certaines informations avec:
          </p>
          <ul>
            <li>Nos fournisseurs de services qui nous aident à exploiter notre plateforme</li>
            <li>Les autorités légales si requis par la loi</li>
            <li>D'autres utilisateurs pour les fonctionnalités sociales (par exemple, classements)</li>
          </ul>
          
          <h2>4. Protection des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger 
            vos données personnelles contre la perte, l'accès non autorisé et la divulgation.
          </p>
          
          <h2>5. Cookies et technologies similaires</h2>
          <p>
            Amanar Map utilise des cookies et des technologies similaires pour améliorer votre expérience, 
            analyser le trafic et personnaliser le contenu. Vous pouvez contrôler l'utilisation des cookies 
            dans les paramètres de votre navigateur.
          </p>
          
          <h2>6. Droits des utilisateurs</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants:</p>
          <ul>
            <li>Droit d'accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit à l'effacement de vos données</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d'opposition au traitement</li>
          </ul>
          
          <h2>7. Conservation des données</h2>
          <p>
            Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services 
            ou pour respecter nos obligations légales, résoudre des litiges et faire appliquer nos politiques.
          </p>
          
          <h2>8. Modification de la politique de confidentialité</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique à tout moment. Les modifications seront 
            publiées sur cette page et, si les modifications sont importantes, nous vous en informerons par email.
          </p>
          
          <h2>9. Contact</h2>
          <p>
            Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à 
            l'adresse suivante: privacy@amanarmap.com
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
