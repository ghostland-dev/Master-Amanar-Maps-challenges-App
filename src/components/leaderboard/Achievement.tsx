
import React from "react";

interface AchievementProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export const Achievement = ({ title, desc, icon }: AchievementProps) => (
  <div className="flex items-start p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-primary/5 transition-colors">
    <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full mr-3 text-primary">
      {icon}
    </div>
    <div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  </div>
);
