
import MainLayout from "@/components/layouts/MainLayout";
import { Info, Award, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  // Team members data
  const teamMembers = [
    {
      name: "Sophia Martin",
      role: "Fondatrice & CEO",
      image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Experte en marketing digital avec plus de 10 ans d'expérience dans le développement de stratégies innovantes."
    },
    {
      name: "Thomas Dubois",
      role: "Directeur technique",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Ingénieur en informatique passionné par les nouvelles technologies et l'intelligence artificielle."
    },
    {
      name: "Amina Ndiaye",
      role: "Responsable pédagogique",
      image: "https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Spécialiste en éducation numérique avec une expertise dans la création de parcours d'apprentissage personnalisés."
    },
    {
      name: "Lucas Moreau",
      role: "Growth Hacker",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Expert en acquisition et en stratégies de croissance pour les startups et les entreprises du digital."
    }
  ];

  return (
    <MainLayout 
      title="À propos" 
      description="Découvrez l'histoire et la mission d'Amanar Map"
    >
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-center mb-8">
          <Info className="h-12 w-12 text-primary mr-4" />
          <h1 className="text-3xl md:text-4xl font-bold">À propos d'Amanar Map</h1>
        </div>
        
        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Notre mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Amanar Map a été fondée avec une vision claire : démocratiser l'accès aux connaissances entrepreneuriales 
                et permettre à chacun de développer ses compétences dans le domaine du digital et des affaires.
              </p>
              <p className="text-lg text-muted-foreground">
                Nous croyons que l'apprentissage par la pratique est la clé du succès. C'est pourquoi notre plateforme 
                propose des défis concrets, des simulateurs interactifs et des ressources de qualité pour vous aider à 
                progresser étape par étape dans votre parcours.
              </p>
            </div>
            
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="L'équipe Amanar Map en réunion" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
                <span className="text-white font-medium">Brainstorming au bureau d'Amanar Map</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Nos valeurs fondamentales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-xl shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Excellence</h3>
              </div>
              <p className="text-muted-foreground">
                Nous visons l'excellence dans chaque aspect de notre plateforme, de la qualité des contenus 
                à l'expérience utilisateur, pour vous offrir le meilleur accompagnement possible.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Communauté</h3>
              </div>
              <p className="text-muted-foreground">
                Nous croyons en la force de l'apprentissage collectif et encourageons le partage de connaissances 
                et d'expériences entre tous les membres de notre communauté.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Innovation</h3>
              </div>
              <p className="text-muted-foreground">
                Nous restons à la pointe des tendances et des technologies pour vous proposer des contenus 
                et des outils toujours pertinents et actualisés.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Notre équipe</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-card rounded-xl overflow-hidden shadow-sm border">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* History Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Notre histoire</h2>
          
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 w-24 font-bold">2018</div>
              <div>
                <h3 className="font-semibold text-lg">Naissance de l'idée</h3>
                <p className="text-muted-foreground">
                  Sophia Martin, notre fondatrice, constate un manque d'outils pratiques pour les entrepreneurs du numérique 
                  et commence à développer le concept d'Amanar Map.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 font-bold">2019</div>
              <div>
                <h3 className="font-semibold text-lg">Premier prototype</h3>
                <p className="text-muted-foreground">
                  Après des mois de développement, le premier prototype d'Amanar Map voit le jour, proposant 
                  quelques simulateurs et une dizaine de défis.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 font-bold">2020</div>
              <div>
                <h3 className="font-semibold text-lg">Lancement officiel</h3>
                <p className="text-muted-foreground">
                  Amanar Map est officiellement lancé et rencontre rapidement un fort succès auprès des entrepreneurs 
                  et des professionnels du marketing digital.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 font-bold">2021</div>
              <div>
                <h3 className="font-semibold text-lg">Expansion de l'équipe</h3>
                <p className="text-muted-foreground">
                  Face à la croissance rapide de la plateforme, l'équipe s'agrandit pour inclure des experts 
                  en pédagogie, en marketing et en développement.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 font-bold">2022</div>
              <div>
                <h3 className="font-semibold text-lg">Introduction du système de badges</h3>
                <p className="text-muted-foreground">
                  Lancement du système de gamification avec des badges et des classements pour encourager 
                  la progression et l'engagement des utilisateurs.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 w-24 font-bold">2023</div>
              <div>
                <h3 className="font-semibold text-lg">Aujourd'hui</h3>
                <p className="text-muted-foreground">
                  Amanar Map continue d'innover et de développer de nouvelles fonctionnalités pour accompagner 
                  toujours mieux sa communauté grandissante.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <div className="bg-primary/10 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Rejoignez l'aventure Amanar Map</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Prêt à développer vos compétences et à relever des défis passionnants ? 
            Rejoignez notre communauté d'entrepreneurs et d'apprenants motivés.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth?tab=register">
              <Button size="lg">
                S'inscrire gratuitement
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
