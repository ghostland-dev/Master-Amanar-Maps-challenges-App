
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CommissionItem from "./CommissionItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const CommissionPlansSection = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-10">Plans de commission</h2>
      <Tabs defaultValue="standard" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
        </TabsList>
        <TabsContent value="standard">
          <Card>
            <CardHeader>
              <CardTitle>Plan Standard</CardTitle>
              <CardDescription>Pour tous les affiliés qui débutent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <CommissionItem
                  percentage="20%"
                  description="Sur les abonnements mensuels"
                />
                <CommissionItem
                  percentage="25%"
                  description="Sur les abonnements annuels"
                />
                <CommissionItem
                  percentage="10%"
                  description="Sur les renouvellements"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to="/affiliate-dashboard">Démarrer maintenant</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="premium">
          <Card>
            <CardHeader>
              <CardTitle>Plan Premium</CardTitle>
              <CardDescription>Pour les affiliés qui génèrent plus de 10 ventes par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <CommissionItem
                  percentage="25%"
                  description="Sur les abonnements mensuels"
                />
                <CommissionItem
                  percentage="30%"
                  description="Sur les abonnements annuels"
                />
                <CommissionItem
                  percentage="15%"
                  description="Sur les renouvellements"
                />
                <CommissionItem
                  percentage="5%"
                  description="Commission à 2 niveaux sur les affiliés que vous parrainez"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" asChild>
                <Link to="/contact">Contacter l'équipe</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommissionPlansSection;
