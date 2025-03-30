
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: "default" | "secondary" | "outline";
}

const CallToAction: React.FC<CallToActionProps> = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  variant = "default" 
}) => (
  <motion.div
    className="text-center bg-gradient-to-r from-primary/10 to-secondary/50 p-10 rounded-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
      {description}
    </p>
    <Button size="lg" variant={variant} asChild>
      <Link to={buttonLink}>
        {buttonText}
      </Link>
    </Button>
  </motion.div>
);

export default CallToAction;
