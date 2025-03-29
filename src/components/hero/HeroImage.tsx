
import { useEffect, useRef } from "react";
import { scaleIn } from "@/lib/animations";

const HeroImage = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (imageRef.current) scaleIn(imageRef.current);
  }, []);

  return (
    <div 
      ref={imageRef} 
      className="mt-16 md:mt-20 rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto group"
    >
      <img 
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
        alt="FinQuest Dashboard" 
        className="w-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
        <span className="text-white font-medium text-lg px-4 py-2 bg-primary/80 backdrop-blur-sm rounded-full">
          Notre plateforme intuitive
        </span>
      </div>
    </div>
  );
};

export default HeroImage;
