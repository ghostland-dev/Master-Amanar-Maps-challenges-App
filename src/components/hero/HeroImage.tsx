
const HeroImage = () => {
  return (
    <div className="mt-16 md:mt-20 rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
      <img 
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
        alt="FinQuest Dashboard" 
        className="w-full object-cover rounded-xl transform hover:scale-105 transition-transform duration-700"
      />
    </div>
  );
};

export default HeroImage;
