
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      // Reset success message after a while
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <MainLayout 
      title="Contact" 
      description="Contactez l'équipe Amanar Map pour toute question ou demande d'information"
    >
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Contactez-nous</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">Message envoyé avec succès!</h3>
                <p className="text-muted-foreground">
                  Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nom complet
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Votre nom"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    placeholder="Sujet de votre message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Détaillez votre demande ici..."
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <span className="flex items-center">
                      <Send className="h-4 w-4 mr-2" />
                      Envoyer
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
          
          <div className="bg-card rounded-xl p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@amanarmap.com</p>
                  <p className="text-muted-foreground">support@amanarmap.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Téléphone</h3>
                  <p className="text-muted-foreground">+33 (0)1 23 45 67 89</p>
                  <p className="text-muted-foreground">Du lundi au vendredi, 9h-18h</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                <div>
                  <h3 className="font-medium">Adresse</h3>
                  <p className="text-muted-foreground">
                    Amanar Map<br />
                    123 Avenue des Entrepreneurs<br />
                    75001 Paris, France
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="font-medium mb-2">Réseaux sociaux</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-2 bg-background rounded-full hover:bg-muted transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-background rounded-full hover:bg-muted transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-background rounded-full hover:bg-muted transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="p-2 bg-background rounded-full hover:bg-muted transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w-full h-96 rounded-xl overflow-hidden shadow-sm border">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047033509!2d2.3417314!3d48.8588377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sfr!2sfr!4v1654789542867!5m2!1sfr!2sfr" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
