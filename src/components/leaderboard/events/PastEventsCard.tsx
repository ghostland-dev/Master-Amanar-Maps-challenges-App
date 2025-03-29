
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface PastEventProps {
  title: string;
  description: string;
  winner: string;
  xp: number;
}

interface PastEventsCardProps {
  events: PastEventProps[];
}

export const PastEventsCard = ({ events }: PastEventsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Records précédents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{event.title}</h3>
                <Badge variant="outline">Terminé</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {event.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">{event.winner}</span>
                </div>
                <Badge className="bg-amber-500/90">{event.xp} XP</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
