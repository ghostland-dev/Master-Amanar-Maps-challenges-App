import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, TrendingUp, Timer, BookOpen, Award, Users, BarChart2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { scaleIn, fadeIn, slideIn } from "@/lib/animations";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (heroRef.current) fadeIn(heroRef.current);
    if (featuresRef.current) slideIn(featuresRef.current, 'up');
    if (ctaRef.current) scaleIn(ctaRef.current);
    if (statsRef.current) slideIn(statsRef.current, 'up');
    if (testimonialRef.current) fadeIn(testimonialRef.current);
  }, []);

  return (
    <div className="pt-24 pb-0">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Hero section */}
        <div ref={heroRef} className="text-center max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary">
            <span className="text-xs font-medium">La plateforme qui gamifie l'apprentissage financier</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Apprenez à <span className="text-gradient">gagner de l'argent</span> en ligne
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Réalisez des petits challenges guidés pour réussir vos premiers euros sur internet, même sans diplôme ni expérience. Suivez simplement les étapes et progressez à votre rythme.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all">
              Commencer gratuitement
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/challenges">
              <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base glass hover:bg-primary/10 transition-all">
                Explorer les challenges
              </Button>
            </Link>
          </div>
          
          {/* Stats section */}
          <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12k+</div>
              <div className="text-sm text-muted-foreground mt-1">Utilisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">85+</div>
              <div className="text-sm text-muted-foreground mt-1">Challenges financiers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Taux de satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3.2M€</div>
              <div className="text-sm text-muted-foreground mt-1">Générés par nos utilisateurs</div>
            </div>
          </div>
        </div>
        
        {/* Section image mockup */}
        <div className="mt-16 md:mt-20 rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
            alt="FinQuest Dashboard" 
            className="w-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-700"
          />
        </div>
        
        {/* Features */}
        <div ref={featuresRef} className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Une approche simple pour <span className="text-gradient">gagner</span> vos premiers euros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass p-8 rounded-xl hover-lift">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simulateurs interactifs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Testez vos stratégies d'investissement sans risque financier grâce à nos simulateurs de ROI et budget.
              </p>
            </div>
            
            <div className="glass p-8 rounded-xl hover-lift">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Timer className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Challenges guidés</h3>
              <p className="text-muted-foreground leading-relaxed">
                Progressez étape par étape avec nos défis structurés pour développer de nouvelles compétences business.
              </p>
            </div>
            
            <div className="glass p-8 rounded-xl hover-lift">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ressources premium</h3>
              <p className="text-muted-foreground leading-relaxed">
                Accédez à une bibliothèque complète de guides, templates et études de cas créés par des experts.
              </p>
            </div>
            
            <div className="glass p-8 rounded-xl hover-lift">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Award className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Système de progression</h3>
              <p className="text-muted-foreground leading-relaxed">
                Gagnez des XP, des badges et montez dans le classement en relevant des défis progressifs.
              </p>
            </div>
          </div>
        </div>
        
        {/* Section "Pourquoi FinQuest" */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Pourquoi choisir <span className="text-gradient">FinQuest</span> ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="mb-5 h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Communauté active</h3>
              <p className="text-muted-foreground">
                Rejoignez des milliers d'utilisateurs qui partagent leurs stratégies et s'entraident mutuellement.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-5 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <BarChart2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progression mesurable</h3>
              <p className="text-muted-foreground">
                Suivez votre évolution avec des statistiques détaillées et des indicateurs de performance clairs.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-5 h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Contenus vérifiés</h3>
              <p className="text-muted-foreground">
                Des experts financiers valident tous nos challenges et ressources pour garantir leur qualité.
              </p>
            </div>
          </div>
        </div>
        
        {/* Témoignages */}
        <div ref={testimonialRef} className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Ce que nos utilisateurs <span className="text-gradient">en disent</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex gap-4 items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="User" />
                </div>
                <div>
                  <h4 className="font-medium">Thomas Dupont</h4>
                  <p className="text-sm text-muted-foreground">Entrepreneur</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "FinQuest m'a permis de structurer ma réflexion avant de lancer mon e-commerce. Les simulateurs m'ont aidé à optimiser mon budget marketing initial."
              </p>
              <div className="mt-3 flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
            <div className="glass p-8 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="flex gap-4 items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" />
                </div>
                <div>
                  <h4 className="font-medium">Sophie Martin</h4>
                  <p className="text-sm text-muted-foreground">Étudiante</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "La gamification rend l'apprentissage tellement plus engageant ! J'ai enfin compris les concepts clés du trading et de l'investissement."
              </p>
              <div className="mt-3 flex text-yellow-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div ref={ctaRef} className="mt-24 glass p-12 rounded-2xl text-center bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à gagner vos premiers euros en ligne ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Rejoignez notre communauté et commencez dès aujourd'hui avec des défis adaptés aux débutants.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 py-6 text-base shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-all">
              Créer un compte gratuit
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 text-base glass hover:bg-primary/10 transition-all">
              Découvrir les simulateurs
            </Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Aucune carte de crédit requise. Accès gratuit aux fonctionnalités de base.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
