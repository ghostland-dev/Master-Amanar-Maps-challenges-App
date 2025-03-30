
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommissionItem from "./CommissionItem";

interface CommissionPlanProps {
  title: string;
  description: string;
  commissions: Array<{
    percentage: string;
    description: string;
  }>;
  buttonText: string;
  buttonLink: string;
  variant?: "default" | "outline";
}

const CommissionPlan: React.FC<CommissionPlanProps> = ({
  title,
  description,
  commissions,
  buttonText,
  buttonLink,
  variant = "default",
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {commissions.map((commission, index) => (
          <CommissionItem
            key={index}
            percentage={commission.percentage}
            description={commission.description}
          />
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full" variant={variant} asChild>
        <Link to={buttonLink}>{buttonText}</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default CommissionPlan;
