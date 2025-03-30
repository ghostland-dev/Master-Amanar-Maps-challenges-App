
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const GDPR = () => {
  return (
    <MainLayout title="Conformité RGPD" description="Comment Amanar Map respecte le Règlement Général sur la Protection des Données">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Conformité RGPD</h1>
          <p className="text-muted-foreground mb-8">
            Comment nous protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>

          <div className="prose prose-lg max-w-none">
            <h2>Notre engagement envers la protection des données</h2>
            <p>
              Chez Amanar Map, nous prenons très au sérieux la protection de vos données personnelles. 
              Notre objectif est de respecter pleinement le Règlement Général sur la Protection des Données (RGPD) 
              de l'Union Européenne, qui constitue l'une des réglementations les plus strictes au monde en matière 
              de protection de la vie privée.
            </p>

            <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 my-8">
              <h3 className="text-xl font-bold mb-4">Ce que vous devez savoir</h3>
              <ul className="space-y-2">
                <li>Nous recueillons uniquement les données nécessaires à la fourniture de nos services</li>
                <li>Vous gardez le contrôle sur vos données personnelles</li>
                <li>Nous ne vendons jamais vos informations personnelles à des tiers</li>
                <li>Nous utilisons des mesures de sécurité avancées pour protéger vos données</li>
              </ul>
            </div>

            <h2>Vos droits selon le RGPD</h2>
            
            <Accordion type="single" collapsible className="w-full mb-8">
              <AccordionItem value="right-1">
                <AccordionTrigger>Droit d'accès</AccordionTrigger>
                <AccordionContent>
                  Vous avez le droit de demander une copie des données personnelles que nous détenons à votre sujet. 
                  Pour exercer ce droit, vous pouvez accéder à votre profil dans les paramètres ou contacter notre 
                  délégué à la protection des données à privacy@amanarmap.com.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="right-2">
                <AccordionTrigger>Droit de rectification</AccordionTrigger>
                <AccordionContent>
                  Si vous constatez que les informations que nous détenons à votre sujet sont inexactes ou incomplètes, 
                  vous pouvez nous demander de les corriger. La plupart des informations peuvent être mises à jour 
                  directement depuis votre profil utilisateur.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="right-3">
                <AccordionTrigger>Droit à l'effacement</AccordionTrigger>
                <AccordionContent>
                  Aussi connu sous le nom de "droit à l'oubli", ce droit vous permet de demander la suppression de 
                  vos données personnelles lorsqu'il n'y a pas de raison impérieuse pour nous de continuer à les 
                  traiter. Vous pouvez supprimer votre compte depuis les paramètres ou nous contacter pour une 
                  suppression complète.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="right-4">
                <AccordionTrigger>Droit à la limitation du traitement</AccordionTrigger>
                <AccordionContent>
                  Dans certaines circonstances, vous avez le droit de nous demander de limiter le traitement de 
                  vos données personnelles, par exemple si vous contestez l'exactitude des données ou si vous vous 
                  opposez au traitement.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="right-5">
                <AccordionTrigger>Droit à la portabilité des données</AccordionTrigger>
                <AccordionContent>
                  Vous avez le droit de recevoir vos données personnelles dans un format structuré, couramment 
                  utilisé et lisible par machine. Vous pouvez également nous demander de transférer ces données 
                  directement à un autre responsable du traitement lorsque cela est techniquement possible.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="right-6">
                <AccordionTrigger>Droit d'opposition</AccordionTrigger>
                <AccordionContent>
                  Vous avez le droit de vous opposer à tout moment au traitement de vos données personnelles 
                  à des fins de marketing direct. Vous pouvez gérer vos préférences de communication dans les 
                  paramètres de votre compte ou en utilisant le lien de désabonnement dans nos emails.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <h2>Comment nous traitons vos données</h2>
            <p>
              Nous traitons vos données personnelles uniquement sur l'une des bases légales suivantes :
            </p>
            
            <ul>
              <li><strong>Consentement</strong> : nous traitons certaines données uniquement avec votre consentement explicite.</li>
              <li><strong>Exécution d'un contrat</strong> : le traitement est nécessaire pour exécuter le contrat que nous avons avec vous.</li>
              <li><strong>Obligation légale</strong> : le traitement est nécessaire pour nous conformer à une obligation légale.</li>
              <li><strong>Intérêts légitimes</strong> : le traitement est nécessaire pour nos intérêts légitimes ou ceux d'un tiers, 
              à moins que vos intérêts ou droits fondamentaux ne prévalent.</li>
            </ul>
            
            <h2>Mesures de sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles, notamment :
            </p>
            <ul>
              <li>Chiffrement des données sensibles</li>
              <li>Authentification à deux facteurs</li>
              <li>Contrôles d'accès stricts</li>
              <li>Audits de sécurité réguliers</li>
              <li>Formation régulière de notre personnel sur les questions de protection des données</li>
            </ul>
            
            <h2>Transferts internationaux de données</h2>
            <p>
              Certaines de nos opérations peuvent impliquer le transfert de vos données personnelles en dehors de l'Espace économique européen (EEE). 
              Dans ces cas, nous nous assurons que des garanties appropriées sont en place, telles que les clauses contractuelles types 
              approuvées par la Commission européenne.
            </p>
            
            <h2>Notre délégué à la protection des données</h2>
            <p>
              Nous avons nommé un délégué à la protection des données (DPO) qui est responsable de superviser les questions relatives à cette 
              politique de confidentialité. Si vous avez des questions concernant cette politique ou nos pratiques en matière de protection des 
              données, veuillez contacter notre DPO :
            </p>
            
            <div className="bg-muted/30 p-6 rounded-lg my-6">
              <p><strong>Email</strong> : dpo@amanarmap.com</p>
              <p><strong>Adresse</strong> : Amanar Map, 123 rue de la République, 75001 Paris, France</p>
            </div>
            
            <h2>Comment exercer vos droits</h2>
            <p>
              Pour exercer vos droits en vertu du RGPD, vous pouvez :
            </p>
            <ol>
              <li>Utiliser les outils disponibles dans les paramètres de votre compte</li>
              <li>Nous contacter directement à privacy@amanarmap.com</li>
              <li>Remplir notre formulaire de demande d'accès aux données</li>
            </ol>
            <p>
              Nous nous efforcerons de répondre à toutes les demandes légitimes dans un délai d'un mois. 
              Occasionnellement, cela peut nous prendre plus d'un mois si votre demande est particulièrement complexe 
              ou si vous avez fait plusieurs demandes. Dans ce cas, nous vous informerons et vous tiendrons au courant.
            </p>
            
            <h2>Modifications de notre politique</h2>
            <p>
              Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Toute modification sera publiée 
              sur cette page et, si les changements sont importants, nous vous en informerons par email ou par une notification 
              sur notre site web.
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Besoin d'aide concernant vos données ?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/privacy-policy">Notre politique de confidentialité</Link>
              </Button>
              <Button asChild>
                <Link to="/contact">Contacter notre DPO</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GDPR;
