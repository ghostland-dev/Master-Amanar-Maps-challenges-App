
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
      className="mt-16 md:mt-20 relative max-w-5xl mx-auto"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/40 rounded-2xl blur-2xl opacity-70"></div>
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
        <img 
          src="https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1500" 
          alt="Amanar Map Dashboard" 
          className="w-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
          <div className="text-white font-medium text-lg px-6 py-3 bg-primary/80 backdrop-blur-sm rounded-full shadow-lg">
            Notre plateforme intuitive
          </div>
        </div>
      </div>
      
      {/* Floating elements for decoration */}
      <div className="absolute -top-4 -right-4 h-16 w-16 bg-gradient-to-br from-primary/40 to-primary/60 rounded-full blur-md animate-pulse"></div>
      <div className="absolute -bottom-6 -left-6 h-20 w-20 bg-gradient-to-br from-amber-400/30 to-amber-600/50 rounded-full blur-md animate-pulse delay-700"></div>
    </div>
  );
};

export default HeroImage;
