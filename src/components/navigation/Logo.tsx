
import { Link } from "react-router-dom";
import { Trophy } from "lucide-react";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Trophy className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold text-primary">FinQuest</span>
    </Link>
  );
};
