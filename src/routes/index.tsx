import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  ChartLine,
  Landmark,
  Mail,
  Palmtree,
  PiggyBank,
  Phone,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";

import logo from "@/assets/logo-lamyae.jpg.asset.json";
import predictisLogo from "@/assets/predictis.png.asset.json";
import groupePremiumLogo from "@/assets/groupe-premium.png.asset.json";
import abeilleLogo from "@/assets/abeille.png.asset.json";
import swisslifeLogo from "@/assets/swisslife.png.asset.json";
import groupamaLogo from "@/assets/groupama.png.asset.json";
import ag2rLogo from "@/assets/ag2r.png.asset.json";
import portrait from "@/assets/lamyae-ayoub.jpg.asset.json";
import heroImage from "@/assets/hero-meeting.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lamyae Ayoub — Gestion de patrimoine & audit offert" },
      {
        name: "description",
        content:
          "Optimisation fiscale, retraite, immobilier et prévoyance : Lamyae Ayoub, experte en gestion de patrimoine partenaire Predictis, vous accompagne avec des stratégies sur-mesure.",
      },
      { property: "og:title", content: "Lamyae Ayoub — Gestion de patrimoine" },
      {
        property: "og:description",
        content:
          "Votre patrimoine mérite une vision à 360°. Demandez votre audit patrimonial offert, sans engagement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CTA_HREF = "#audit";

const objectifs = [
  {
    icon: TrendingDown,
    title: "Réduire ma pression fiscale",
    text: "Impôts, défiscalisation, optimisation de votre revenu imposable.",
  },
  {
    icon: Palmtree,
    title: "Préparer ma retraite",
    text: "Anticipation, revenus complémentaires et maintien du niveau de vie.",
  },
  {
    icon: ChartLine,
    title: "Faire fructifier mon patrimoine",
    text: "Épargne, placements financiers et investissement immobilier.",
  },
  {
    icon: ShieldCheck,
    title: "Protéger mes proches ou mon activité",
    text: "Prévoyance, transmission et sécurisation de votre entreprise.",
  },
];

const solutions = [
  {
    icon: Landmark,
    label: "Bloc 1",
    title: "Immobilier & Financement",
    items: [
      "Défiscalisation immobilière",
      "Recherche de biens neufs et financement",
      "Négociation et regroupement de crédits, assurance emprunteur",
    ],
  },
  {
    icon: PiggyBank,
    label: "Bloc 2",
    title: "Épargne & Optimisation",
    items: [
      "Assurance vie en gestion privée",
      "PER — épargne retraite",
      "SCPI — immobilier de rendement",
      "Contrat de CAPI (trésorerie d'entreprise)",
    ],
  },
  {
    icon: Building2,
    label: "Bloc 3",
    title: "Protection Santé & Prévoyance",
    items: [
      "Mutuelle particuliers & entreprises, RC Pro",
      "Protection familiale",
      "Gestion et transmission de l'héritage",
    ],
  },
];

const etapes = [
  {
    step: "01",
    title: "L'Échange — 15 min",
    text: "Un premier appel pour faire connaissance et comprendre précisément vos besoins.",
  },
  {
    step: "02",
    title: "L'Analyse 360°",
    text: "Étude complète de votre situation fiscale, professionnelle, patrimoniale et familiale.",
  },
  {
    step: "03",
    title: "La Stratégie",
    text: "Présentation de vos solutions sur-mesure et accompagnement dans leur mise en place.",
  },
];

const formSchema = z.object({
  nom: z.string().trim().min(2, "Merci d'indiquer vos nom et prénom.").max(100),
  telephone: z
    .string()
    .trim()
    .min(8, "Merci d'indiquer un numéro de téléphone valide.")
    .max(25, "Numéro trop long."),
  email: z.string().trim().email("Adresse email invalide.").max(255),
  projet: z.string().min(1, "Merci de sélectionner votre projet principal."),
});

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <img
            src={logo.url}
            alt="Logo Lamyae Ayoub — Gestion de patrimoine"
            className="h-10 w-auto mix-blend-screen sm:h-12"
          />
        </div>
        <a
          href={CTA_HREF}
          className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5"
        >
          Audit offert <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-4 pt-4">
      <div className="relative overflow-hidden rounded-[2rem] surface-navy">
        <img
          src={heroImage}
          alt="Rendez-vous conseil en gestion de patrimoine"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.22_0.05_259/0.94)_0%,oklch(0.22_0.05_259/0.7)_45%,oklch(0.22_0.05_259/0.35)_100%)]" />
        <Header />
        <div className="relative mx-auto max-w-7xl px-6 pt-40 pb-10 md:pt-52 md:pb-14">
          <div className="max-w-3xl text-primary-foreground">
            <p className="eyebrow text-[oklch(0.82_0.07_84)]">
              Particuliers, Indépendants et Chefs d'entreprise
            </p>
            <h1 className="mt-5 text-4xl leading-[1.08] sm:text-6xl md:text-7xl">
              Votre patrimoine mérite une vision à 360°.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-85 sm:text-lg">
              Je vous accompagne dans l'optimisation, la structuration et la protection de vos
              projets de vie, avec des stratégies sur-mesure.
            </p>
            <a
              href={CTA_HREF}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[oklch(0.82_0.07_84)] px-7 py-4 text-sm font-bold text-[oklch(0.22_0.05_259)] transition-transform hover:-translate-y-0.5 sm:text-base"
            >
              <CalendarDays className="h-5 w-5" />
              Demander mon audit patrimonial offert
            </a>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-center">
            <div className="rounded-2xl border border-[oklch(1_0_0/0.2)] bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="eyebrow text-muted-foreground">Partenaire officiel</span>
              <img
                src={predictisLogo.url}
                alt="Predictis By Premium"
                className="mt-4 h-14 w-auto object-contain"
              />
              <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-navy-deep">
                <BadgeCheck className="h-4 w-4 text-navy-soft" />
                1er courtier en assurance vie-épargne en France
              </p>
            </div>
            <PartnersMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="eyebrow inline-block rounded-full border border-border bg-card px-4 py-2 text-muted-foreground">
        {eyebrow}
      </span>
      <h2 className="mt-6 text-3xl leading-tight text-navy-deep sm:text-5xl">{title}</h2>
    </div>
  );
}

function Objectifs() {
  return (
    <section id="objectifs" className="mx-auto max-w-7xl px-6 py-24">
      <SectionTitle eyebrow="Vos enjeux" title="Quels sont vos objectifs aujourd'hui ?" />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {objectifs.map((o, i) => (
          <Reveal key={o.title} delay={i * 80}>
            <article className="card-soft group h-full p-7 transition-transform hover:-translate-y-1">
              <span className="grid h-12 w-12 place-items-center rounded-full surface-navy">
                <o.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-xl text-navy-deep">{o.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="Solutions"
          title="Un accompagnement global sur toutes vos thématiques."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <article className="card-soft flex h-full flex-col p-8">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-muted-foreground">{s.label}</span>
                  <s.icon className="h-6 w-6 text-navy-soft" />
                </div>
                <h3 className="mt-6 text-2xl text-navy-deep">{s.title}</h3>
                <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function APropos() {
  return (
    <section id="a-propos" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1fr]">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-accent/60" />
            <img
              src={portrait.url}
              alt="Lamyae Ayoub, experte en gestion de patrimoine"
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[var(--shadow-soft)]"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="eyebrow text-muted-foreground">Qui suis-je ?</span>
          <h2 className="mt-5 text-3xl text-navy-deep sm:text-5xl">
            Lamyae Ayoub, votre interlocutrice de confiance.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            « Au cours de mon expérience, j'ai accompagné une clientèle diversifiée pour sécuriser
            et développer leur patrimoine. Mes maîtres-mots : Confiance, Transparence et
            Pédagogie. »
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Confiance", "Transparence", "Pédagogie"].map((v) => (
              <span
                key={v}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-navy-deep"
              >
                {v}
              </span>
            ))}
          </div>
          <div className="card-soft mt-8 flex gap-4 p-6">
            <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-navy-soft" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              En tant que partenaire de l'entité <strong className="text-navy-deep">Predictis</strong>{" "}
              (Groupe Premium), le 1er courtier en assurance vie-épargne en France, je vous garantis
              un accès aux solutions les plus performantes du marché.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Etapes() {
  return (
    <section className="px-4 pb-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] surface-navy px-6 py-20">
        <div className="mx-auto max-w-3xl text-center text-primary-foreground">
          <span className="eyebrow text-[oklch(0.82_0.07_84)]">Comment ça marche ?</span>
          <h2 className="mt-6 text-3xl leading-tight sm:text-5xl">
            Votre audit gratuit en 3 étapes simples.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {etapes.map((e, i) => (
            <Reveal key={e.step} delay={i * 100}>
              <article className="h-full rounded-2xl border border-[oklch(1_0_0/0.16)] bg-[oklch(1_0_0/0.07)] p-8 text-primary-foreground">
                <span className="font-display text-4xl text-[oklch(0.82_0.07_84)]">{e.step}</span>
                <h3 className="mt-4 text-xl">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-80">{e.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audit() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = formSchema.safeParse(data);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-navy-soft focus:ring-2 focus:ring-ring/30";

  return (
    <section id="audit" className="mx-auto max-w-7xl scroll-mt-8 px-6 pb-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div>
          <span className="eyebrow text-muted-foreground">Prendre rendez-vous</span>
          <h2 className="mt-5 text-3xl text-navy-deep sm:text-5xl">
            Prêt(e) à faire le point sur votre situation ?
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Remplissez ce formulaire ou prenez rendez-vous directement dans mon agenda. L'audit est
            100 % personnalisé et sans engagement.
          </p>
          <div className="mt-8 space-y-3">
            <a
              href="mailto:l.ayoub@predictis-mia.com"
              className="card-soft flex items-center gap-4 p-5 transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-5 w-5 text-navy-soft" />
              <span className="text-sm font-semibold text-navy-deep">l.ayoub@predictis-mia.com</span>
            </a>
            <div className="card-soft flex items-center gap-4 p-5">
              <Phone className="h-5 w-5 text-navy-soft" />
              <span className="text-sm text-muted-foreground">
                Réponse sous 1 jour ouvré, par téléphone ou visio.
              </span>
            </div>
          </div>
        </div>

        <div className="card-soft p-8 sm:p-10">
          {sent ? (
            <div className="py-10 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full surface-navy">
                <BadgeCheck className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-2xl text-navy-deep">Demande enregistrée</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Merci ! Je vous recontacte très rapidement pour convenir de votre premier échange de
                15 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="nom" className="text-sm font-semibold text-navy-deep">
                  Nom / Prénom
                </label>
                <input id="nom" name="nom" maxLength={100} className={fieldClass} />
                {errors["nom"] && <p className="mt-2 text-xs text-destructive">{errors["nom"]}</p>}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="telephone" className="text-sm font-semibold text-navy-deep">
                    Téléphone
                  </label>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    maxLength={25}
                    className={fieldClass}
                  />
                  {errors["telephone"] && (
                    <p className="mt-2 text-xs text-destructive">{errors["telephone"]}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-navy-deep">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    maxLength={255}
                    className={fieldClass}
                  />
                  {errors["email"] && (
                    <p className="mt-2 text-xs text-destructive">{errors["email"]}</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="projet" className="text-sm font-semibold text-navy-deep">
                  Votre projet principal
                </label>
                <select id="projet" name="projet" defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    Sélectionnez…
                  </option>
                  <option value="impots">Impôts</option>
                  <option value="retraite">Retraite</option>
                  <option value="immobilier">Immobilier</option>
                  <option value="autre">Autre</option>
                </select>
                {errors["projet"] && (
                  <p className="mt-2 text-xs text-destructive">{errors["projet"]}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-full surface-navy px-6 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5"
              >
                Obtenir mon audit gratuit
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Vos données sont utilisées uniquement pour vous recontacter (RGPD).
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="Logo LA" className="h-12 w-12 object-contain" />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg text-navy-deep">Lamyae Ayoub</span>
              <span className="eyebrow text-muted-foreground">Gestion de patrimoine</span>
            </span>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <a href="#objectifs" className="hover:text-navy-deep">
              Mentions légales
            </a>
            <a href="#objectifs" className="hover:text-navy-deep">
              Politique de confidentialité (RGPD)
            </a>
            <a href="mailto:l.ayoub@predictis-mia.com" className="hover:text-navy-deep">
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-10 space-y-2 border-t border-border pt-8 text-xs leading-relaxed text-muted-foreground">
          <p>
            Lamyae Ayoub — Mandataire en assurance et intermédiaire en opérations de banque et
            services de paiement, partenaire de Predictis (Groupe Premium). Activité de courtage
            enregistrée à l'ORIAS — n° ORIAS : à compléter (
            <a
              href="https://www.orias.fr"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-navy-deep"
            >
              www.orias.fr
            </a>
            ).
          </p>
          <p>
            Les informations présentées ne constituent pas un conseil en investissement. Tout
            placement présente un risque de perte en capital.
          </p>
          <p>© {new Date().getFullYear()} Lamyae Ayoub — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background">
      <Hero />
      <Objectifs />
      <Solutions />
      <APropos />
      <Etapes />
      <Audit />
      <Footer />
    </main>
  );
}
