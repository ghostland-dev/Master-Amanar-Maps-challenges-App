
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <MainLayout title="Blog" description="Articles, guides et conseils pour réussir dans le monde digital">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos derniers articles, guides et conseils pour vous aider dans votre parcours vers la liberté financière.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full">{post.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-primary hover:underline">
                  Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

// Mock data - à remplacer par des données réelles
const blogPosts = [
  {
    id: 1,
    title: "Comment démarrer dans l'affiliation sans budget",
    excerpt: "Découvrez comment vous lancer dans le marketing d'affiliation même avec un budget limité. Stratégies et conseils pour débutants.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    category: "Affiliation",
    date: "12 Mai 2023",
  },
  {
    id: 2,
    title: "5 crypto-monnaies à surveiller en 2023",
    excerpt: "Analyse des crypto-monnaies émergentes qui pourraient connaître une forte croissance cette année. Conseils d'investissement et tendances.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2574&auto=format&fit=crop",
    category: "Crypto",
    date: "3 Juin 2023",
  },
  {
    id: 3,
    title: "Les bases du copywriting qui convertit",
    excerpt: "Apprenez les techniques de copywriting qui transforment les visiteurs en clients. Guide complet pour rédiger des textes persuasifs.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop",
    category: "Copywriting",
    date: "17 Juillet 2023",
  },
  {
    id: 4,
    title: "Comment créer une boutique Shopify rentable",
    excerpt: "Guide étape par étape pour lancer une boutique e-commerce rentable sur Shopify. De la sélection des produits au marketing.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop",
    category: "E-commerce",
    date: "29 Août 2023",
  },
  {
    id: 5,
    title: "Automatiser son business: outils et stratégies",
    excerpt: "Découvrez comment automatiser les tâches répétitives de votre business en ligne pour gagner du temps et augmenter votre productivité.",
    image: "https://images.unsplash.com/photo-1531651008558-ed1740375b39?q=80&w=2874&auto=format&fit=crop",
    category: "Productivité",
    date: "10 Septembre 2023",
  },
  {
    id: 6,
    title: "Les erreurs à éviter lors de votre premier lancement",
    excerpt: "Analysez les erreurs les plus communes commises par les entrepreneurs lors de leur premier lancement et apprenez à les éviter.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop",
    category: "Entrepreneuriat",
    date: "5 Octobre 2023",
  },
];

export default Blog;
