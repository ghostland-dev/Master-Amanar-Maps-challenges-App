
import { Link } from "react-router-dom";
import { MapIcon, Compass } from "lucide-react";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="relative w-8 h-8 bg-gradient-to-br from-amber-300 to-amber-700 border border-amber-900 rounded-md flex items-center justify-center shadow-md">
        <Compass className="h-6 w-6 text-amber-900" strokeWidth={2} />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-amber-900 dark:text-amber-500">AMANAR</span>
        <span className="text-xs uppercase tracking-widest -mt-1 text-amber-800 dark:text-amber-600">MAP</span>
      </div>
    </Link>
  );
};
