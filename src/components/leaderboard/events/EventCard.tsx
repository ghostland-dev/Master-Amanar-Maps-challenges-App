
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface EventCardProps {
  name: string;
  date: string;
  xp: number;
  type: "challenge" | "competition" | "event";
  description: string;
}

export const EventCard = ({ name, date, xp, type, description }: EventCardProps) => {
  const getBgColor = () => {
    if (type === "challenge") return "bg-blue-600";
    if (type === "competition") return "bg-purple-600";
    return "bg-amber-600";
  };

  const getTypeLabel = () => {
    if (type === "challenge") return "Challenge";
    if (type === "competition") return "Compétition";
    return "Événement";
  };

  return (
    <Card className="overflow-hidden border-border/70">
      <div className={`p-2 text-center text-white ${getBgColor()}`}>
        <Badge variant="outline" className="bg-white/20 border-white/40 text-white">
          {getTypeLabel()}
        </Badge>
      </div>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{name}</h3>
          <Badge variant="outline" className="bg-primary/10 text-primary whitespace-nowrap">
            {xp} XP
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {date}
          </div>
          <Button variant="outline" size="sm">
            S'inscrire
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
