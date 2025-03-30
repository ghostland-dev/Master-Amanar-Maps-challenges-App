
import MainLayout from "@/components/layouts/MainLayout";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Cookies = () => {
  return (
    <MainLayout title="Politique de cookies" description="Comment nous utilisons les cookies sur Amanar Map">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Politique de Cookies</h1>
          <p className="text-muted-foreground mb-8">
            Dernière mise à jour : 1er novembre 2023
          </p>
          
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2>Introduction</h2>
            <p>
              Bienvenue sur Amanar Map. Cette Politique de Cookies explique comment nous utilisons des cookies 
              et technologies similaires pour vous reconnaître lorsque vous visitez notre site Web.
              Elle explique ce que sont ces technologies et pourquoi nous les utilisons, ainsi que vos droits 
              pour contrôler notre utilisation de celles-ci.
            </p>
            
            <h2>Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier contenant une chaîne de caractères qui est envoyé à votre ordinateur 
              lorsque vous visitez un site Web. Lorsque vous revisitez ce site, le cookie permet au site de reconnaître 
              votre navigateur. Les cookies peuvent stocker les préférences de l'utilisateur et d'autres informations.
            </p>
            <p>
              Les cookies jouent un rôle important. Sans eux, l'utilisation du Web serait une expérience beaucoup plus frustrante.
            </p>
            
            <h2>Types de cookies que nous utilisons</h2>
            
            <h3>Cookies strictement nécessaires</h3>
            <p>
              Ces cookies sont essentiels au fonctionnement de notre site et vous permettent d'utiliser ses fonctionnalités. 
              Sans ces cookies, nous ne pourrions pas fournir certains services que vous avez demandés.
            </p>
            
            <h3>Cookies de performance</h3>
            <p>
              Ces cookies collectent des informations sur la façon dont les visiteurs utilisent notre site, par exemple 
              quelles pages ils visitent le plus souvent et s'ils reçoivent des messages d'erreur. Ils nous aident à 
              améliorer le fonctionnement de notre site.
            </p>
            
            <h3>Cookies fonctionnels</h3>
            <p>
              Ces cookies permettent à notre site de se souvenir des choix que vous faites (comme votre nom d'utilisateur, 
              votre langue ou la région où vous vous trouvez) et fournissent des fonctionnalités améliorées et personnalisées.
            </p>
            
            <h3>Cookies de ciblage ou publicitaires</h3>
            <p>
              Ces cookies sont utilisés pour diffuser des publicités plus pertinentes pour vous et vos intérêts. 
              Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité et mesurer 
              l'efficacité des campagnes publicitaires.
            </p>
            
            <h2>Cookies tiers</h2>
            <p>
              En plus de nos propres cookies (cookies propriétaires), nous pouvons également utiliser diverses technologies 
              tierces pour vous aider à bénéficier d'une meilleure expérience sur notre site, et pour nous aider à comprendre 
              comment le site est utilisé.
            </p>
            
            <table className="w-full border-collapse my-6">
              <thead>
                <tr>
                  <th className="border border-border p-2 text-left">Tiers</th>
                  <th className="border border-border p-2 text-left">Finalité</th>
                  <th className="border border-border p-2 text-left">Politique</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">Google Analytics</td>
                  <td className="border border-border p-2">Analyse de l'audience du site</td>
                  <td className="border border-border p-2">
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Politique de confidentialité
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Facebook Pixel</td>
                  <td className="border border-border p-2">Publicité et analyse</td>
                  <td className="border border-border p-2">
                    <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Politique de confidentialité
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="border border-border p-2">Stripe</td>
                  <td className="border border-border p-2">Traitement des paiements</td>
                  <td className="border border-border p-2">
                    <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Politique de confidentialité
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <h2>Gestion des cookies</h2>
            <p>
              Vous pouvez généralement accepter ou refuser les cookies en modifiant les paramètres de votre navigateur. 
              Si vous souhaitez restreindre ou bloquer tous les cookies qui sont définis par notre site Web, vous pouvez 
              le faire via vos paramètres de navigateur. L'option "Aide" de votre navigateur vous indiquera comment.
            </p>
            
            <p>
              De manière alternative, vous pouvez visiter <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aboutcookies.org</a>, 
              qui contient des informations complètes sur la façon de procéder sur une grande variété de navigateurs.
            </p>
            
            <p>
              Veuillez noter que la restriction des cookies peut affecter la fonctionnalité de notre site Web.
            </p>
            
            <h2>Comment contacter Amanar Map à propos de cette Politique de Cookies</h2>
            <p>
              Si vous avez des questions concernant cette Politique de Cookies, vous pouvez nous contacter :
            </p>
            <ul>
              <li>Par email : privacy@amanarmap.com</li>
              <li>Par téléphone : +33 1 XX XX XX XX</li>
              <li>Par courrier : Amanar Map, 123 Avenue des Cookies, 75000 Paris, France</li>
            </ul>
            
            <h2>Modifications de cette Politique de Cookies</h2>
            <p>
              Nous pouvons mettre à jour cette Politique de Cookies de temps à autre afin de refléter, par exemple, 
              des changements dans les cookies que nous utilisons ou pour d'autres raisons opérationnelles, légales ou réglementaires. 
              Veuillez donc visiter régulièrement cette page pour rester informé de l'utilisation des cookies et des technologies associées.
            </p>
            <p>
              La date en haut de cette Politique de Cookies indique quand elle a été mise à jour pour la dernière fois.
            </p>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="/privacy-policy">Politique de confidentialité</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/terms-of-service">Conditions d'utilisation</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/gdpr">RGPD</a>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cookies;
