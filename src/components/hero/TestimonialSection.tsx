
import { useEffect, useRef } from "react";
import { fadeIn } from "@/lib/animations";

const TestimonialSection = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (testimonialRef.current) fadeIn(testimonialRef.current);
  }, []);

  return (
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
  );
};

export default TestimonialSection;
