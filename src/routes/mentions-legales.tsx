import { createFileRoute } from "@tanstack/react-router";

import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Lamyae Ayoub, gestion de patrimoine" },
      {
        name: "description",
        content:
          "Mentions légales du site : éditeur PREDICTIS, hébergeur, contenu du site, droits d'auteur et liens hypertextes.",
      },
      { property: "og:title", content: "Mentions légales — Lamyae Ayoub" },
      {
        property: "og:description",
        content: "Informations légales relatives à l'éditeur du site et à l'hébergeur.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales">
      <h2>Article 1 – Identification</h2>
      <h3>1.1 Éditeur du site</h3>
      <p>
        Société par Actions Simplifiée de courtage en assurances, en opération de banque et en
        service de paiement, et mandataire non exclusif en opération de banque et en service de
        paiement, au capital de 500.000 € – Siège social : 14 rue de la ferme, 92100
        Boulogne-Billancourt – Téléphone : 01.46.10.22.50 (coût d'un appel local) – Courriel :
        contact@predictis.com
      </p>
      <p>
        Numéro de TVA Intracommunautaire : FR83 411 415 565. – Immatriculée au Registre du Commerce
        et des Sociétés de Nanterre sous le n°411 415 565 – Code APE 6622Z – Immatriculée à l'ORIAS
        sous le n°07 001 325 (www.orias.fr). PREDICTIS est soumise au contrôle de l'Autorité de
        Contrôle Prudentiel et de Résolution (ACPR), 4 Place de Budapest, CS 92459, 75436 Paris
        Cedex 09 (https://acpr.banque-france.fr/). PREDICTIS exerce son activité conformément aux
        dispositions du Code des assurances, notamment aux articles L521-1, L521-2 II.1° b et
        suivants, et du Code monétaire et financier, notamment aux articles L519-4-1, L519-4-2 et
        suivants.
      </p>
      <p>
        Directeur de la publication : Monsieur Olivier FAROUZ, Président de la société PREMIUM
        PARTNERS, personne morale désignée comme présidente de la société PREDICTIS.
      </p>
      <h3>1.2 Hébergeur</h3>
      <p>Le site web www.predictis.com est hébergé sur le serveur de la société :</p>
      <p>
        Kinsta Inc. 8605 Santa Monica Blvd #92581 West Hollywood, CA 90069-4109, United States.
      </p>

      <h2>Article 2 – Contenu du site</h2>
      <p>
        Ce site a été élaboré avec soin et rigueur dans un souci de qualité et d'éthique
        professionnelle.
      </p>
      <p>
        L'information présentée sur ce site l'est à titre indicatif et général. Elle ne saurait en
        aucun cas être considérée comme exhaustive et ne peut être assimilée à une offre commerciale
        ou à des conseils. PREDICTIS se réserve le droit de modifier le contenu de son site à tout
        instant et sans préavis.
      </p>
      <p>
        Malgré tout le sérieux et l'attention apportés à la réalisation de ce site et à son
        actualisation régulière, certaines informations peuvent être erronées et PREDICTIS ne pourra
        en être tenu pour responsable. L'utilisateur est seul responsable de l'utilisation qu'il
        fait des informations accessibles, la responsabilité de PREDICTIS ne pouvant en aucun cas
        être recherchée à ce titre.
      </p>
      <p>
        PREDICTIS décline toute responsabilité pour tous dommages directs et indirects, quels qu'en
        soient les causes, origines, nature ou conséquence, en raison de l'accès à ce site ou de
        l'impossibilité d'y accéder, de même que de l'utilisation de ce site et/ou du crédit accordé
        à une quelconque information qui en est directement ou indirectement retirée.
      </p>

      <h2>Article 3 – Droits d'auteur</h2>
      <p>
        L'ensemble des contenus de tous types présents sur ce site est la propriété exclusive de
        PREDICTIS et sont protégés par la législation française et/ou internationale sur les droits
        d'auteur et la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, revente ou distribution, même à titre gratuit, de quelque information
        que ce soit en provenance de ce site sans l'autorisation écrite préalable de PREDICTIS est
        strictement interdite et constitue une violation des lois françaises et européennes du code
        de la propriété intellectuelle, sanctionnée par les articles L.355-2 et suivants du code de
        la propriété intellectuelle. Cette interdiction s'étend notamment, sans que cette liste ne
        soit limitative, à tout élément rédactionnel figurant sur le site, à la présentation des
        écrans, aux logiciels nécessaires à l'exploitation, aux logos, images, photos, graphiques,
        de quelque nature qu'ils soient. En outre, il est formellement interdit de collecter et
        d'utiliser les informations disponibles sur le site à des fins commerciales. Les marques
        citées sur ce site sont déposées par leurs propriétaires respectifs. Toute reproduction ou
        représentation faites sans leur accord préalable est une contrefaçon.
      </p>

      <h2>Article 4 – Liens hypertextes</h2>
      <p>
        Les liens qui seraient mis en place depuis ce site vers des sites extérieurs ne sauraient
        engager la responsabilité de PREDICTIS quant au contenu de ces sites.
      </p>
      <p>
        PREDICTIS précise que tous les sites tiers reliés au site www.predictis.com par des liens
        hypertextes sont soumis à leurs propres conditions d'utilisation et politiques de protection
        des données personnelles et décline toute responsabilité quant aux contenus publiés sur ces
        sites.
      </p>
      <p>
        PREDICTIS n'est pas responsable des liens susceptibles de pointer sur son site. Par
        ailleurs, la mise en place de tels liens est interdite sans accord préalable et écrit de
        PREDICTIS. PREDICTIS se réserve le droit à tout moment, sans préavis et sans avoir à motiver
        sa décision, d'interdire certains de ces liens. Le site concerné, après en avoir été
        informé, disposera de 2 jours ouvrés pour retirer le lien concerné.
      </p>
    </LegalLayout>
  );
}
