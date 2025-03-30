
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Press = () => {
  return (
    <MainLayout title="Presse" description="Centre de presse Amanar Map - Actualités, communiqués et ressources médias">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Centre de presse</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez les dernières actualités, communiqués de presse et ressources médias d'Amanar Map.
          </p>
        </div>
        
        {/* Latest Press Release */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Dernier communiqué de presse</h2>
          <Card className="bg-muted/30">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">Amanar Map annonce une levée de fonds de 2 millions d'euros pour révolutionner la formation entrepreneuriale en ligne</CardTitle>
                  <CardDescription>15 Janvier 2023</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="#" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger le PDF
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Amanar Map, la plateforme éducative française spécialisée dans l'accompagnement des entrepreneurs digitaux, 
                annonce aujourd'hui avoir levé 2 millions d'euros auprès de plusieurs investisseurs de renom dont VC Capital, 
                Business Angels Network et Digital Ventures.
              </p>
              <p className="mb-4">
                Cette levée de fonds permettra à l'entreprise d'accélérer son développement international, d'enrichir 
                son catalogue de formations et de renforcer ses équipes, notamment dans les domaines de la technologie et du contenu pédagogique.
              </p>
              <p>
                "Nous sommes ravis de cette marque de confiance de la part de nos investisseurs", déclare Thomas Dubois, 
                fondateur et CEO d'Amanar Map. "Cette levée de fonds va nous permettre de poursuivre notre mission : 
                démocratiser l'accès aux compétences entrepreneuriales de qualité et aider davantage de personnes à 
                atteindre leur indépendance financière."
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/press/levee-fonds-2023" className="flex items-center">
                  Lire la suite
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Press Releases Archive */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Communiqués de presse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pressReleases.map((release) => (
              <Card key={release.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{release.title}</CardTitle>
                  <CardDescription>{release.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{release.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/press/${release.slug}`}>Lire</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="#">Télécharger</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/press/archives">
                Voir tous les communiqués
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Media Coverage */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Couverture médiatique</h2>
          <div className="space-y-6">
            {mediaCoverage.map((article) => (
              <div key={article.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{article.publisher} • {article.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Lire l'article
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <p className="text-muted-foreground">{article.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Media Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Ressources médias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kit presse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Notre kit presse comprend des logos haute résolution, des photos de l'équipe, des visualisations du produit et notre charte graphique.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <a href="#" className="flex items-center justify-center">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger le kit presse
                  </a>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fiche d'entreprise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Consultez notre fiche d'entreprise complète avec historique, chiffres clés, vision et informations sur les fondateurs.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link to="/press/entreprise">
                    Consulter la fiche
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Contact Press */}
        <div className="bg-muted/30 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Contact presse</h2>
              <p className="mb-4 text-muted-foreground">
                Pour toute demande d'information, interview ou requête presse, notre équipe de relations publiques est à votre disposition.
              </p>
              <div className="space-y-2">
                <p><strong>Email :</strong> presse@amanarmap.com</p>
                <p><strong>Téléphone :</strong> +33 (0)1 23 45 67 89</p>
                <p><strong>Contact :</strong> Marie Lambert, Relations Presse</p>
              </div>
            </div>
            <div className="md:w-1/3">
              <Button className="w-full" asChild>
                <Link to="/contact" className="flex items-center justify-center">
                  Formulaire de contact presse
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Données pour les communiqués de presse
const pressReleases = [
  {
    id: 1,
    title: "Amanar Map lance une nouvelle plateforme de formation interactive",
    date: "10 Décembre 2022",
    excerpt: "Amanar Map dévoile aujourd'hui sa nouvelle plateforme d'apprentissage interactive qui révolutionne la formation entrepreneuriale en ligne grâce à des parcours personnalisés et des défis pratiques.",
    slug: "nouvelle-plateforme-2022"
  },
  {
    id: 2,
    title: "Partenariat stratégique entre Amanar Map et BusinessSchool",
    date: "5 Octobre 2022",
    excerpt: "Amanar Map et BusinessSchool annoncent un partenariat stratégique pour proposer des formations certifiantes en entrepreneuriat digital, combinant expertise académique et approche pratique.",
    slug: "partenariat-businessschool-2022"
  },
  {
    id: 3,
    title: "Amanar Map franchit le cap des 50 000 utilisateurs",
    date: "15 Août 2022",
    excerpt: "Moins de deux ans après son lancement, Amanar Map célèbre une étape importante avec sa communauté qui atteint désormais 50 000 entrepreneurs et porteurs de projets dans plus de 30 pays.",
    slug: "50000-utilisateurs-2022"
  },
  {
    id: 4,
    title: "Lancement du programme 'Success Partners' pour accompagner les entrepreneurs",
    date: "2 Juin 2022",
    excerpt: "Amanar Map dévoile son nouveau programme d'accompagnement personnalisé 'Success Partners', permettant aux entrepreneurs digitaux de bénéficier d'un mentor dédié pendant 6 mois.",
    slug: "programme-success-partners-2022"
  }
];

// Données pour la couverture médiatique
const mediaCoverage = [
  {
    id: 1,
    title: "Amanar Map : l'EdTech qui réinvente l'apprentissage entrepreneurial",
    publisher: "Tech Insider",
    date: "20 Janvier 2023",
    excerpt: "La startup française qui se distingue par son approche novatrice de l'apprentissage par le challenge et son modèle communautaire.",
    url: "#"
  },
  {
    id: 2,
    title: "Les 10 startups EdTech françaises à suivre en 2023",
    publisher: "Business Magazine",
    date: "5 Janvier 2023",
    excerpt: "Amanar Map figure dans notre classement des startups EdTech les plus prometteuses de l'année, avec une croissance impressionnante et des retours utilisateurs exceptionnels.",
    url: "#"
  },
  {
    id: 3,
    title: "Interview exclusive avec Thomas Dubois, fondateur d'Amanar Map",
    publisher: "Entrepreneurs Daily",
    date: "12 Décembre 2022",
    excerpt: "Le fondateur nous dévoile sa vision de l'éducation entrepreneuriale et les coulisses de sa récente levée de fonds de 2 millions d'euros.",
    url: "#"
  },
  {
    id: 4,
    title: "Comment Amanar Map aide des milliers d'entrepreneurs à se lancer",
    publisher: "Digital Economy",
    date: "30 Novembre 2022",
    excerpt: "Focus sur cette plateforme qui démocratise l'accès aux compétences entrepreneuriales et aide les français à créer des sources de revenus alternatives.",
    url: "#"
  },
  {
    id: 5,
    title: "Le phénomène des 'challenges' dans l'éducation en ligne : étude de cas Amanar Map",
    publisher: "EdTech Review",
    date: "15 Octobre 2022",
    excerpt: "Analyse de l'approche par challenges développée par Amanar Map et de son impact sur l'engagement et les résultats des apprenants.",
    url: "#"
  }
];

export default Press;
