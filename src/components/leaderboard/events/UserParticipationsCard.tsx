
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface UserEventProps {
  title: string;
  description: string;
  date: string;
  status: "success" | "failure";
  xp: number;
}

interface UserParticipationsCardProps {
  events: UserEventProps[];
}

export const UserParticipationsCard = ({ events }: UserParticipationsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Vos participations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={idx} className="p-3 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{event.title}</h3>
                {event.status === "success" ? (
                  <Badge variant="success" className="bg-green-600">Réussi</Badge>
                ) : (
                  <Badge variant="destructive">Non terminé</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {event.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  {event.date}
                </div>
                {event.status === "success" ? (
                  <Badge className="bg-green-600/90">+{event.xp} XP</Badge>
                ) : (
                  <Badge variant="outline">0 XP</Badge>
                )}
              </div>
            </div>
          ))}
          
          <div className="flex justify-center mt-6">
            <Button variant="outline" size="sm">
              Voir toutes vos participations
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
