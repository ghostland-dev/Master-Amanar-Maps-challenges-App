
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
      className="mt-16 md:mt-20 rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto group relative"
    >
      <img 
        src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1500" 
        alt="Amanar Map Dashboard" 
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
