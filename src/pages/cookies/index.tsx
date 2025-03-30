
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Link } from "react-router-dom";

const Cookies = () => {
  return (
    <MainLayout title="Politique de cookies" description="Découvrez comment nous utilisons les cookies sur Amanar Map">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Politique de cookies</h1>
          <p className="text-muted-foreground mb-8">
            Dernière mise à jour : 15 janvier 2023
          </p>
          
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              La présente politique de cookies explique comment Amanar Map ("nous", "notre", "nos") utilise les cookies 
              et technologies similaires pour reconnaître votre visite lorsque vous accédez à notre site web https://amanarmap.com 
              ("le Site"). Elle explique ce que sont ces technologies et pourquoi nous les utilisons, ainsi que vos droits 
              pour contrôler notre utilisation de celles-ci.
            </p>
            
            <h2>2. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier contenant des lettres et des chiffres que nous stockons dans votre navigateur 
              ou sur le disque dur de votre ordinateur si vous donnez votre accord. Les cookies contiennent des informations 
              qui sont transférées sur le disque dur de votre ordinateur.
            </p>
            
            <h3>Nous utilisons les types de cookies suivants :</h3>
            <ul>
              <li>
                <strong>Cookies strictement nécessaires.</strong> Ces cookies sont nécessaires au fonctionnement du Site 
                et ne peuvent pas être désactivés dans nos systèmes. Ils sont généralement établis en réponse à des actions 
                de votre part qui constituent une demande de services, telles que la définition de vos préférences de confidentialité, 
                la connexion ou le remplissage de formulaires. Vous pouvez configurer votre navigateur pour qu'il bloque ou vous 
                alerte de l'existence de ces cookies, mais certaines parties du Site ne fonctionneront alors pas.
              </li>
              <li>
                <strong>Cookies de performance.</strong> Ces cookies nous permettent de compter les visites et les sources 
                de trafic afin que nous puissions mesurer et améliorer les performances de notre Site. Ils nous aident à savoir 
                quelles pages sont les plus et les moins populaires et à voir comment les visiteurs se déplacent sur le Site. 
                Toutes les informations recueillies par ces cookies sont agrégées et donc anonymisées.
              </li>
              <li>
                <strong>Cookies de fonctionnalité.</strong> Ces cookies permettent au Site de fournir une fonctionnalité et 
                une personnalisation améliorées. Ils peuvent être mis en place par nous ou par des fournisseurs tiers dont nous 
                avons ajouté les services à nos pages. Si vous n'autorisez pas ces cookies, certains ou tous ces services peuvent 
                ne pas fonctionner correctement.
              </li>
              <li>
                <strong>Cookies de ciblage.</strong> Ces cookies peuvent être mis en place par nos partenaires publicitaires 
                via notre Site. Ils peuvent être utilisés par ces entreprises pour établir un profil de vos intérêts et vous 
                proposer des publicités pertinentes sur d'autres sites. Ils ne stockent pas directement des informations personnelles, 
                mais sont basés sur l'identification unique de votre navigateur et appareil internet.
              </li>
            </ul>
            
            <h2>3. Comment utilisons-nous les cookies ?</h2>
            <p>
              Nous utilisons des cookies pour les finalités suivantes :
            </p>
            <ul>
              <li>Authentifier les utilisateurs et maintenir leur session</li>
              <li>Mémoriser les préférences et paramètres des utilisateurs</li>
              <li>Analyser le comportement des utilisateurs pour améliorer notre Site</li>
              <li>Fournir des fonctionnalités personnalisées</li>
              <li>Mesurer l'efficacité de nos campagnes marketing</li>
              <li>Prévenir la fraude et améliorer la sécurité du Site</li>
            </ul>
            
            <h2>4. Cookies tiers</h2>
            <p>
              En plus de nos propres cookies, nous pouvons également utiliser divers cookies tiers pour vous proposer du contenu et des services, 
              notamment pour analyser votre navigation et personnaliser votre expérience sur notre Site. Ces cookies tiers 
              peuvent provenir notamment des services suivants :
            </p>
            <ul>
              <li>Google Analytics (analyse d'audience)</li>
              <li>Facebook Pixel (publicité et mesure de conversion)</li>
              <li>Hotjar (analyse comportementale)</li>
              <li>Intercom (support client)</li>
              <li>Stripe (traitement des paiements)</li>
            </ul>
            
            <h2>5. Contrôle des cookies</h2>
            <p>
              La plupart des navigateurs vous permettent de contrôler les cookies via leurs paramètres. Voici comment accéder 
              aux paramètres des cookies dans les navigateurs les plus courants :
            </p>
            <ul>
              <li><strong>Chrome</strong> : Menu > Paramètres > Confidentialité et sécurité > Cookies et autres données des sites</li>
              <li><strong>Firefox</strong> : Menu > Options > Vie privée et sécurité > Cookies et données de sites</li>
              <li><strong>Safari</strong> : Préférences > Confidentialité > Cookies et données de sites web</li>
              <li><strong>Edge</strong> : Paramètres > Confidentialité, recherche et services > Effacer les données de navigation</li>
            </ul>
            <p>
              Toutefois, sachez que si vous désactivez ou refusez les cookies, certaines parties de ce Site pourraient 
              devenir inaccessibles ou ne pas fonctionner correctement.
            </p>
            
            <h2>6. Cookies et durée de conservation</h2>
            <p>
              La durée pendant laquelle un cookie reste sur votre ordinateur ou appareil mobile dépend de sa nature :
            </p>
            <ul>
              <li><strong>Cookies de session</strong> : ces cookies ne sont stockés que temporairement pendant une session de navigation et sont supprimés de votre appareil lorsque vous fermez votre navigateur.</li>
              <li><strong>Cookies persistants</strong> : ces cookies restent sur votre appareil jusqu'à leur expiration ou jusqu'à ce que vous les supprimiez manuellement. Ils nous permettent de vous reconnaître lorsque vous revenez sur notre Site.</li>
            </ul>
            
            <h2>7. Modifications de la politique de cookies</h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de cookies à tout moment. Toute modification sera publiée 
              sur cette page avec une date de mise à jour révisée. Nous vous encourageons à consulter régulièrement cette page 
              pour être informé de tout changement.
            </p>
            
            <h2>8. Contactez-nous</h2>
            <p>
              Si vous avez des questions concernant notre politique de cookies ou nos pratiques en matière de protection 
              de la vie privée, n'hésitez pas à nous contacter :
            </p>
            <ul>
              <li>Email : privacy@amanarmap.com</li>
              <li>Courrier : Amanar Map, 123 rue de la République, 75001 Paris, France</li>
            </ul>
            
            <p className="mt-8">
              Pour plus d'informations sur notre traitement des données personnelles, veuillez consulter notre {" "}
              <Link to="/privacy-policy" className="text-primary underline">Politique de confidentialité</Link>.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cookies;
