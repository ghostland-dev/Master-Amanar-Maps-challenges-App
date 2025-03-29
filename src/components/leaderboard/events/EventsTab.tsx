
import React from "react";
import { EventCard } from "./EventCard";
import { PastEventsCard } from "./PastEventsCard";
import { UserParticipationsCard } from "./UserParticipationsCard";

// Event types
interface UpcomingEvent {
  name: string;
  date: string;
  xp: number;
  type: "challenge" | "competition" | "event";
  description: string;
}

interface PastEvent {
  title: string;
  description: string;
  winner: string;
  xp: number;
}

interface UserEvent {
  title: string;
  description: string;
  date: string;
  status: "success" | "failure";
  xp: number;
}

interface EventsTabProps {
  upcomingEvents: UpcomingEvent[];
  pastEvents: PastEvent[];
  userEvents: UserEvent[];
}

export const EventsTab = ({ upcomingEvents, pastEvents, userEvents }: EventsTabProps) => {
  return (
    <>
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Événements à venir</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event, idx) => (
            <EventCard
              key={idx}
              name={event.name}
              date={event.date}
              xp={event.xp}
              type={event.type}
              description={event.description}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PastEventsCard events={pastEvents} />
        <UserParticipationsCard events={userEvents} />
      </div>
    </>
  );
};
