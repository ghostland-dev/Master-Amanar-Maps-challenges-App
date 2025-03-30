
import MainLayout from "@/components/layouts/MainLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GDPR = () => {
  return (
    <MainLayout title="RGPD" description="Droits et conformité RGPD sur Amanar Map">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Conformité RGPD</h1>
          <p className="text-muted-foreground mb-8">
            Dernière mise à jour : 1er novembre 2023
          </p>
          
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 p-4 rounded-md flex items-start mb-8">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-800 dark:text-yellow-400 text-sm">
              Cette page explique comment Amanar Map se conforme au Règlement Général sur la Protection des Données (RGPD) 
              et détaille vos droits en tant qu'utilisateur concernant vos données personnelles.
            </p>
          </div>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>Introduction au RGPD</h2>
            <p>
              Le Règlement Général sur la Protection des Données (RGPD) est un règlement de l'Union européenne qui renforce 
              et unifie la protection des données pour tous les individus au sein de l'Union européenne. Il aborde également 
              l'exportation de données personnelles en dehors de l'UE.
            </p>
            
            <h2>Notre engagement</h2>
            <p>
              Chez Amanar Map, nous prenons très au sérieux notre responsabilité concernant la sécurité et la confidentialité 
              de vos données. Nous nous engageons à respecter pleinement les exigences du RGPD et à assurer la transparence 
              dans la façon dont nous collectons, utilisons et protégeons vos informations.
            </p>
            
            <h2>Vos droits en vertu du RGPD</h2>
            <p>
              Le RGPD vous confère plusieurs droits concernant vos données personnelles. Ces droits incluent :
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Droit d'accès</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Vous avez le droit d'obtenir confirmation que nous traitons vos données personnelles et, 
                    le cas échéant, d'accéder à ces données personnelles et aux informations concernant la façon 
                    dont elles sont traitées.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Droit de rectification</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Vous avez le droit de faire corriger vos données personnelles si elles sont inexactes ou incomplètes.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Droit à l'effacement ('droit à l'oubli')</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Dans certaines circonstances, vous avez le droit de demander l'effacement de vos données personnelles, 
                    par exemple lorsque les données ne sont plus nécessaires au regard des finalités pour lesquelles elles 
                    ont été collectées.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Droit à la limitation du traitement</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Dans certaines circonstances, vous avez le droit de demander que nous limitions le traitement de 
                    vos données personnelles, par exemple lorsque vous contestez l'exactitude des données.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Droit à la portabilité des données</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Vous avez le droit de recevoir les données personnelles vous concernant que vous nous avez fournies, 
                    dans un format structuré, couramment utilisé et lisible par machine, et vous avez le droit de transmettre 
                    ces données à un autre responsable du traitement sans que nous y fassions obstacle.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger>Droit d'opposition</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Vous avez le droit de vous opposer au traitement de vos données personnelles lorsque celles-ci sont 
                    traitées sur la base de notre intérêt légitime. Si vous vous opposez, nous devons cesser de traiter 
                    vos données à moins que nous ne puissions démontrer des motifs légitimes et impérieux pour le traitement 
                    qui prévalent sur vos intérêts, droits et libertés, ou pour la constatation, l'exercice ou la défense 
                    de droits en justice.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-7">
                <AccordionTrigger>Droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement automatisé</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Vous avez le droit de ne pas faire l'objet d'une décision fondée exclusivement sur un traitement 
                    automatisé, y compris le profilage, produisant des effets juridiques vous concernant ou vous affectant 
                    de manière significative de façon similaire.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <h2 className="mt-8">Comment exercer vos droits</h2>
            <p>
              Pour exercer l'un de ces droits, veuillez nous contacter en utilisant les coordonnées fournies ci-dessous. 
              Nous répondrons à toutes les demandes dans un délai d'un mois.
            </p>
            
            <h2>Notre base légale pour le traitement des données</h2>
            <p>
              Nous traitons vos données personnelles sur différentes bases juridiques, selon les circonstances :
            </p>
            <ul>
              <li>
                <strong>Exécution d'un contrat :</strong> Lorsque le traitement est nécessaire à l'exécution d'un contrat 
                auquel vous êtes partie ou à l'exécution de mesures précontractuelles prises à votre demande.
              </li>
              <li>
                <strong>Consentement :</strong> Lorsque vous avez donné votre consentement au traitement de vos données 
                à caractère personnel pour une ou plusieurs finalités spécifiques.
              </li>
              <li>
                <strong>Obligations légales :</strong> Lorsque le traitement est nécessaire pour respecter une obligation 
                légale à laquelle nous sommes soumis.
              </li>
              <li>
                <strong>Intérêts légitimes :</strong> Lorsque le traitement est nécessaire aux fins des intérêts légitimes 
                que nous poursuivons, à moins que ne prévalent vos intérêts ou vos libertés et droits fondamentaux qui 
                exigent une protection de vos données à caractère personnel.
              </li>
            </ul>
            
            <h2>Transferts internationaux de données</h2>
            <p>
              Nous pouvons transférer vos données personnelles vers des pays situés en dehors de l'Espace économique européen (EEE). 
              Lorsque nous effectuons de tels transferts, nous nous assurons qu'un niveau de protection adéquat est en place, 
              par exemple en utilisant les clauses contractuelles types approuvées par la Commission européenne ou en nous 
              appuyant sur des décisions d'adéquation.
            </p>
            
            <h2>Sécurité des données</h2>
            <p>
              Nous avons mis en place des mesures de sécurité appropriées pour protéger vos données personnelles 
              contre la perte, l'utilisation abusive, l'altération ou la destruction. Seul le personnel autorisé a accès 
              à vos données dans le cadre de leurs fonctions spécifiques.
            </p>
            
            <h2>Conservation des données</h2>
            <p>
              Nous ne conservons vos données personnelles que le temps nécessaire aux fins pour lesquelles elles ont été 
              collectées, y compris pour satisfaire aux exigences légales, comptables ou de reporting.
            </p>
            
            <h2>Comment nous contacter</h2>
            <p>
              Si vous avez des questions concernant cette politique RGPD ou si vous souhaitez exercer l'un de vos droits, 
              veuillez nous contacter :
            </p>
            <ul>
              <li>Par email : privacy@amanarmap.com</li>
              <li>Par téléphone : +33 1 XX XX XX XX</li>
              <li>Par courrier : Amanar Map, 123 Avenue de la Protection des Données, 75000 Paris, France</li>
            </ul>
            
            <h2>Plaintes</h2>
            <p>
              Si vous estimez que notre traitement de vos données personnelles enfreint la législation sur la protection des données, 
              vous avez le droit de déposer une plainte auprès de l'autorité de contrôle compétente, notamment dans l'État membre de 
              votre résidence habituelle, de votre lieu de travail ou du lieu où la violation aurait été commise.
            </p>
            <p>
              En France, l'autorité compétente est la Commission Nationale de l'Informatique et des Libertés (CNIL), 
              que vous pouvez contacter via leur site web : <a href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.cnil.fr</a>.
            </p>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link to="/privacy-policy">Politique de confidentialité</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/terms-of-service">Conditions d'utilisation</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/cookies">Cookies</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GDPR;
