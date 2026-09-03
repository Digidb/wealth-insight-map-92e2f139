import { createFileRoute } from "@tanstack/react-router";

import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité (RGPD) — Lamyae Ayoub" },
      {
        name: "description",
        content:
          "Politique de protection des données personnelles : destinataires, transferts hors UE, droits RGPD et contact du DPO.",
      },
      { property: "og:title", content: "Politique de confidentialité — Lamyae Ayoub" },
      {
        property: "og:description",
        content:
          "Comment vos données personnelles sont collectées, protégées et comment exercer vos droits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Confidentialite,
});

function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <h2>Préambule</h2>
      <p>
        La société PREDICTIS (ci-après « PREDICTIS ») est une société par Actions Simplifiée au
        capital de 500.000 €, ayant son siège social sis 14 rue de la ferme, 92100
        Boulogne-Billancourt et enregistrée au Registre du Commerce et des Sociétés de Nanterre sous
        le numéro 411 415 565.
      </p>
      <p>
        PREDICTIS s'engage à se conformer à la législation en vigueur en France et en Europe
        (Règlement 2016/679 du 27 avril 2016), à assurer la protection, la confidentialité et la
        sécurité des Données personnelles, ainsi qu'à assurer le respect de la vie privée.
      </p>
      <p>
        La présente Politique de protection des Données personnelles (ci-après « la Politique »)
        décrit la manière dont PREDICTIS collecte et traite les données personnelles des personnes
        concernées, dans le cadre de son activité de courtage en assurances et en opérations de
        banque et services de paiement.
      </p>

      <h2>Article 1 – Politiques de protection des données de nos partenaires assureurs</h2>
      <p>
        Certains traitements sont mis en œuvre par nos partenaires assureurs agissant en qualité de
        responsables de traitement. Leurs politiques de protection des données sont accessibles sur
        leurs sites respectifs, par exemple SwissLife :{" "}
        <a
          className="font-semibold text-navy-deep underline"
          href="https://www.swisslife.fr/Protection-des-donnees"
          target="_blank"
          rel="noreferrer"
        >
          https://www.swisslife.fr/Protection-des-donnees
        </a>
        .
      </p>

      <h2>Article 4 – Quels sont les destinataires de vos données ?</h2>
      <p>
        Seules les personnes ayant besoin de connaître vos données dans le cadre de leurs missions y
        ont accès. Il s'agit :
      </p>
      <ul>
        <li>
          Des partenaires assureurs de PREDICTIS et de leurs délégataires de gestion pouvant revêtir
          la qualité de responsables de traitement selon le traitement considéré ;
        </li>
        <li>Des salariés ;</li>
        <li>
          Des mandataires d'intermédiaires en assurance indépendants partenaires de PREDICTIS ;
        </li>
        <li>
          Des autorités administratives et judiciaires pour satisfaire aux obligations légales et
          réglementaires ;
        </li>
        <li>Des sous-traitants de PREDICTIS, si besoin.</li>
      </ul>

      <h2>Article 5 – Transfert de données hors de l'Union Européenne</h2>
      <p>
        Lorsque le traitement de vos données implique un transfert hors de l'Union Européenne, ces
        transferts sont effectués en contrepartie de garanties appropriées en matière de
        confidentialité et sécurité des données, en toute conformité avec la règlementation
        applicable. Les transferts hors de l'Union Européenne reposent sur des clauses
        contractuelles standards, conformément aux modèles de clause validés par la Commission
        Européenne.
      </p>

      <h2>Article 6 – De quels droits disposez-vous sur vos données personnelles ?</h2>
      <p>Vous disposez, sur vos Données personnelles, des droits suivants :</p>
      <h3>Droit d'accès</h3>
      <p>
        Vous avez le droit d'obtenir de notre part la confirmation que vos données personnelles sont
        ou non traitées par nous, ainsi que certaines autres informations sur la manière dont elles
        sont utilisées.
      </p>
      <h3>Droit de rectification</h3>
      <p>
        Vous pouvez nous demander de prendre des mesures pour corriger vos données personnelles si
        elles sont inexactes ou incomplètes (par exemple si nous avons le mauvais nom ou la mauvaise
        adresse).
      </p>
      <h3>Droit à l'effacement (« droit à l'oubli »)</h3>
      <p>
        Vous pouvez demander l'effacement ou la suppression de vos données personnelles (par exemple
        lorsqu'il n'existe pas de raison impérieuse pour nous de continuer à les utiliser ou si leur
        utilisation est illégale).
      </p>
      <h3>Droit à la limitation</h3>
      <p>
        Vous avez le droit de limiter ou d'empêcher l'utilisation ultérieure de vos données
        personnelles. La limitation du traitement n'empêche pas la conservation de vos données
        personnelles, mais nous ne pourrons pas les utiliser au-delà des limites que vous souhaitez.
      </p>
      <h3>Droit à la portabilité</h3>
      <p>
        Vous avez le droit de récupérer et de réutiliser certaines données personnelles. Ce droit
        s'applique uniquement aux données personnelles que vous nous avez fournies, que nous
        traitons avec votre consentement et à des fins d'exécution du contrat et qui sont traitées
        par des moyens automatisés. Le cas échéant, nous vous fournirons une copie de vos données
        dans un format structuré, couramment utilisé et lisible par une machine (lorsque cela est
        techniquement possible). Nous pourrons également transmettre vos données directement à un
        autre responsable de traitement.
      </p>
      <h3>Droit d'opposition</h3>
      <p>
        Vous avez le droit de vous opposer à certains types de traitements, pour des raisons liées à
        votre situation particulière, à tout moment, dans la mesure où ce traitement a eu lieu aux
        fins d'intérêts légitimes poursuivis par PREDICTIS. Nous serons autorisés à continuer à
        traiter vos données personnelles si nous pouvons démontrer que le traitement est justifié
        par des libertés ou si nous en avons besoin pour l'établissement, l'exercice ou la défense
        d'actions en justice.
      </p>
      <h3>Droit de retrait du consentement</h3>
      <p>
        Lorsque nous traitons vos données personnelles sur la base de votre consentement, vous avez
        le droit de retirer votre consentement à tout moment. La personne concernée est informée que
        le retrait n'affecte pas la licéité du traitement qui a eu lieu avant ce retrait.
      </p>
      <h3>Directives sur l'utilisation de vos données personnelles après votre décès</h3>
      <p>
        Vous pouvez contacter PREDICTIS afin de fournir des directives anticipées sur le sort de vos
        données personnelles après votre décès.
      </p>
      <p>
        Pour mieux connaître vos droits, vous pouvez vous rendre sur le site de la CNIL (
        <a
          className="font-semibold text-navy-deep underline"
          href="http://www.cnil.fr/fr/comprendre-vos-droits"
          target="_blank"
          rel="noreferrer"
        >
          cnil.fr
        </a>
        ). Les droits indiqués ci-dessus s'exercent dans le cadre légal et réglementaire dans la
        limite de nos obligations contractuelles vis-à-vis de vous ou des assureurs avec lesquels
        nous travaillons. Lors d'une demande d'exercice de droits, un titre d'identité peut être
        demandé, notamment afin de préserver la sécurité du traitement faisant l'objet de la
        demande.
      </p>

      <h2>Article 7 – Comment sont protégées vos données à caractère personnel ?</h2>
      <p>
        Nous mettons en place les mesures techniques et organisationnelles appropriées pour éviter
        la perte, la mauvaise utilisation, l'altération et la suppression de vos données
        personnelles. Ces mesures sont adaptées selon le niveau de sensibilité des données traitées
        et le niveau de risque que présente le traitement ou sa mise en œuvre.
      </p>
      <p>
        Si une atteinte à la sécurité des données vous concernant se produit, nous vous en
        informerons dans les délais et selon les modalités précisées par les dispositions légales et
        règlementaires en vigueur.
      </p>

      <h2>Article 8 – Comment exercer mes droits ?</h2>
      <p>
        Pour exercer vos droits, le Délégué à la Protection des Données (DPO) de PREDICTIS est à
        votre disposition à l'adresse mail dpo@predictis.com ou à l'adresse postale PREDICTIS – DPO,
        14 rue de la ferme – 92100 Boulogne-Billancourt.
      </p>
      <p>
        Une réponse vous sera adressée, suivant la complexité de votre demande, dans les délais
        prescrits par l'article 12.3 du RGPD. Ainsi, PREDICTIS dispose d'un mois pour répondre à
        votre demande, et ce délai peut être prorogé de deux mois, compte tenu de la complexité et
        du nombre de demandes.
      </p>
      <p>
        Lorsque PREDICTIS traite vos données en qualité de sous-traitant (par exemple d'une
        compagnie d'assurance), votre demande d'exercice des droits peut être transmise à cette
        société.
      </p>
      <p>
        Pour toute réclamation à la Commission Nationale Informatique et Libertés (CNIL), vous
        pouvez écrire à l'adresse suivante : CNIL, 3 place de Fontenoy, TSA 80715, 75334 Paris cedex
        07.
      </p>
    </LegalLayout>
  );
}
