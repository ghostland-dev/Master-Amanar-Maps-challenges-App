
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export const ChartCard = ({ title, description, children, className }: ChartCardProps) => {
  return (
    <Card className={`hover:shadow-md transition-all duration-300 animate-fade-in ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="w-full h-full">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};
