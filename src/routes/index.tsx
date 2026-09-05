import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { bookAppointment, getAvailability, projectOptions } from "@/lib/booking.functions";

import {
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  ChartLine,
  ChevronLeft,
  ChevronRight,
  Landmark,

  Mail,
  Palmtree,
  PiggyBank,
  Phone,
  ShieldCheck,
  Star,
  TrendingDown,
} from "lucide-react";

import logo from "@/assets/logo-la-new.png";
import predictisLogo from "@/assets/predictis.png";
import abeilleLogo from "@/assets/abeille.png";
import swisslifeLogo from "@/assets/swisslife.png";
import groupamaLogo from "@/assets/groupama-new.png";
import ag2rLogo from "@/assets/ag2r.png";
import portrait from "@/assets/lamyae-bureau.png";
import portraitCutout from "@/assets/lamyae-cutout.png";
import heroImage from "@/assets/hero-paris.jpg";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";

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

const formSchema = z
  .object({
    nom: z.string().trim().min(2, "Merci d'indiquer vos nom et prénom.").max(100),
    telephone: z
      .string()
      .trim()
      .min(8, "Merci d'indiquer un numéro de téléphone valide.")
      .max(25, "Numéro trop long."),
    email: z.string().trim().email("Adresse email invalide.").max(255),
    projet: z.string().min(1, "Merci de sélectionner votre projet principal."),
    precision: z.string().trim().max(600, "Message trop long (600 caractères maximum).").optional(),
    slot: z.string().min(1, "Merci de choisir une date et une heure."),
    website: z.string().max(0).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.projet === "autre" && !data.precision?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["precision"],
        message: "Merci de préciser votre demande.",
      });
    }
  });

const PARIS = "Europe/Paris";

const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  timeZone: PARIS,
  hour: "2-digit",
  minute: "2-digit",
});

const longDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  timeZone: PARIS,
  weekday: "long",
  day: "numeric",
  month: "long",
});

const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });

const weekDayLabels = ["L", "M", "M", "J", "V", "S", "D"];

function toDayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}




function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="#" className="inline-flex items-center rounded-2xl bg-card px-5 py-2.5 shadow-[var(--shadow-card)]">
          <img
            src={logo}
            alt="Logo Lamyae Ayoub — Gestion de patrimoine"
            className="h-12 w-auto"
          />
        </a>
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

const partners = [
  { src: abeilleLogo, name: "Abeille Assurances" },
  { src: swisslifeLogo, name: "Swiss Life" },
  { src: groupamaLogo, name: "Groupama" },
  { src: ag2rLogo, name: "AG2R La Mondiale" },
];

function PartnersMarquee() {
  return (
    <div className="min-w-0 rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur">
      <span className="eyebrow px-1 text-primary-foreground opacity-70">
        Nos compagnies partenaires
      </span>
      <div className="group relative mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-4 group-hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="grid h-20 w-40 shrink-0 place-items-center rounded-xl bg-card px-5"
            >
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
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
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#25273cf2_0%,#191a25c7_45%,#00032e80_100%)]" />
        <Header />
        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-10 md:pt-40 md:pb-14">
          <div className="grid items-end gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl pb-6 text-primary-foreground">
            <p className="eyebrow text-gold">
              Particuliers, Indépendants et Chefs d'entreprise
            </p>
            <h1 className="mt-5 text-4xl leading-[1.08] sm:text-6xl md:text-7xl">
              Votre patrimoine mérite une vision à 360°
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed opacity-85 sm:text-lg">
              Je vous accompagne dans l'optimisation, la structuration et la protection de vos
              projets de vie, avec des stratégies sur-mesure.
            </p>
            <a
              href={CTA_HREF}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:text-base"
            >
              <CalendarDays className="h-5 w-5" />
              Demander mon audit patrimonial offert
            </a>
          </div>
            <div className="relative hidden justify-center lg:flex">
              <div className="absolute bottom-0 h-[78%] w-[78%] rounded-t-full bg-gold/25 blur-[2px]" />
              <img
                src={portraitCutout}
                alt="Lamyae Ayoub, experte en gestion de patrimoine"
                className="relative z-10 h-[30rem] w-auto object-contain object-bottom drop-shadow-[0_25px_50px_rgb(0_3_46/0.5)]"
              />
            </div>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-center">
            <div className="rounded-2xl border border-white/20 bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="eyebrow text-muted-foreground">Partenaire officiel</span>
              <img
                src={predictisLogo}
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
              src={portrait}
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
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-[linear-gradient(115deg,#3a4079_0%,#252a5c_50%,#10154d_100%)] px-6 py-20 text-primary-foreground">
        <div className="mx-auto max-w-3xl text-center text-primary-foreground">
          <span className="eyebrow text-gold">Comment ça marche ?</span>
          <h2 className="mt-6 text-3xl leading-tight sm:text-5xl">
            Votre audit gratuit en 3 étapes simples.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {etapes.map((e, i) => (
            <Reveal key={e.step} delay={i * 100}>
              <article className="h-full rounded-2xl border border-white/15 bg-white/[0.07] p-8 text-primary-foreground">
                <span className="font-display text-4xl font-bold text-gold">{e.step}</span>
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
  const [projet, setProjet] = useState("");
  const [precision, setPrecision] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [monthCursor, setMonthCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [confirmed, setConfirmed] = useState("");

  const submitBooking = useServerFn(bookAppointment);
  const loadAvailability = useServerFn(getAvailability);

  const refreshAvailability = useCallback(async () => {
    setLoadingSlots(true);
    try {
      const result = await loadAvailability();
      const map: Record<string, string[]> = {};
      for (const day of result.days) map[day.date] = day.slots;
      setAvailability(map);
      const firstDay = result.days[0]?.date ?? "";
      setSelectedDay((current) => (current && map[current] ? current : firstDay));
    } catch (error) {
      console.error(error);
      setSendError(
        "L'agenda est momentanément indisponible. Merci de m'écrire à l.ayoub@predictis-mia.com.",
      );
    } finally {
      setLoadingSlots(false);
    }
  }, [loadAvailability]);

  useEffect(() => {
    void refreshAvailability();
  }, [refreshAvailability]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = formSchema.safeParse({ ...data, slot: selectedSlot });
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
    setSendError("");
    setSending(true);
    try {
      const response = await submitBooking({ data: { ...result.data, slot: selectedSlot } });
      if (!response.ok) {
        setSendError("Ce créneau vient d'être réservé. Merci d'en choisir un autre.");
        setSelectedSlot("");
        await refreshAvailability();
        return;
      }
      setConfirmed(selectedSlot);
      setSent(true);
    } catch (error) {
      console.error(error);
      setSendError(
        "La réservation a échoué. Merci de réessayer dans quelques instants, ou de m'écrire à l.ayoub@predictis-mia.com.",
      );
    } finally {
      setSending(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-navy-soft focus:ring-2 focus:ring-ring/30";

  const monthStart = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1);
  const daysInMonth = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 0).getDate();
  const leadingBlanks = (monthStart.getDay() + 6) % 7;
  const monthCells: Array<{ key: string; day: number } | null> = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), index + 1);
      return { key: toDayKey(date), day: index + 1 };
    }),
  ];

  const daySlots = selectedDay ? (availability[selectedDay] ?? []) : [];

  return (
    <section id="audit" className="mx-auto max-w-7xl scroll-mt-8 px-6 pb-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        <div>
          <span className="eyebrow text-muted-foreground">Prendre rendez-vous</span>
          <h2 className="mt-5 text-3xl text-navy-deep sm:text-5xl">
            Réservez votre premier échange
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Choisissez directement la date et l'heure qui vous conviennent dans mon agenda. Un
            échange de 30 minutes, offert et sans engagement.
          </p>
          <div className="mt-8 space-y-3">
            <div className="card-soft flex items-center gap-4 p-5">
              <CalendarDays className="h-5 w-5 text-navy-soft" />
              <span className="text-sm text-muted-foreground">
                Créneaux de 30 min — du lundi au vendredi 9h–19h et le samedi matin.
              </span>
            </div>
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
                Rendez-vous par téléphone ou en visio, selon votre préférence.
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
              <h3 className="mt-6 text-2xl text-navy-deep">Rendez-vous confirmé</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {confirmed
                  ? `Nous nous parlons ${longDateFormatter.format(new Date(confirmed))} à ${timeFormatter.format(new Date(confirmed))}. Vous recevez l'invitation par email.`
                  : "Vous recevez l'invitation par email."}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy-deep">
                    Choisissez votre créneau
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Mois précédent"
                      onClick={() =>
                        setMonthCursor(
                          (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1),
                        )
                      }
                      className="grid h-8 w-8 place-items-center rounded-full border border-input text-navy-deep transition-colors hover:bg-secondary"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="min-w-32 text-center text-sm font-semibold capitalize text-navy-deep">
                      {monthFormatter.format(monthCursor)}
                    </span>
                    <button
                      type="button"
                      aria-label="Mois suivant"
                      onClick={() =>
                        setMonthCursor(
                          (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1),
                        )
                      }
                      className="grid h-8 w-8 place-items-center rounded-full border border-input text-navy-deep transition-colors hover:bg-secondary"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
                  {weekDayLabels.map((label, index) => (
                    <span key={`${label}-${index}`}>{label}</span>
                  ))}
                </div>
                <div className="mt-1 grid grid-cols-7 gap-1">
                  {monthCells.map((cell, index) => {
                    if (!cell) return <span key={`blank-${index}`} />;
                    const hasSlots = (availability[cell.key] ?? []).length > 0;
                    const isSelected = selectedDay === cell.key;
                    return (
                      <button
                        key={cell.key}
                        type="button"
                        disabled={!hasSlots}
                        onClick={() => {
                          setSelectedDay(cell.key);
                          setSelectedSlot("");
                          setErrors((current) => ({ ...current, slot: "" }));
                        }}
                        className={`h-10 rounded-xl text-sm transition-colors ${
                          isSelected
                            ? "surface-navy font-bold"
                            : hasSlots
                              ? "bg-secondary font-semibold text-navy-deep hover:bg-secondary/70"
                              : "text-muted-foreground/40"
                        }`}
                      >
                        {cell.day}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5">
                  {loadingSlots ? (
                    <p className="text-sm text-muted-foreground">Chargement de mon agenda…</p>
                  ) : daySlots.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Sélectionnez un jour disponible (en surbrillance) pour voir les horaires.
                    </p>
                  ) : (
                    <>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {longDateFormatter.format(new Date(daySlots[0] ?? ""))} — heure de Paris
                      </p>
                      <div className="mt-3 grid max-h-44 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
                        {daySlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedSlot(slot);
                              setErrors((current) => ({ ...current, slot: "" }));
                            }}
                            className={`rounded-xl border px-2 py-2 text-sm font-semibold transition-colors ${
                              selectedSlot === slot
                                ? "surface-navy border-transparent"
                                : "border-input text-navy-deep hover:bg-secondary"
                            }`}
                          >
                            {timeFormatter.format(new Date(slot))}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                  {errors["slot"] && (
                    <p className="mt-2 text-xs text-destructive">{errors["slot"]}</p>
                  )}
                </div>
              </div>

              <div className="h-px bg-border" />

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
                <select
                  id="projet"
                  name="projet"
                  defaultValue=""
                  className={fieldClass}
                  onChange={(event) => {
                    setProjet(event.target.value);
                    setErrors((current) => ({ ...current, projet: "", precision: "" }));
                    if (event.target.value !== "autre") setPrecision("");
                  }}
                >
                  <option value="" disabled>
                    Sélectionnez…
                  </option>
                  {projectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors["projet"] && (
                  <p className="mt-2 text-xs text-destructive">{errors["projet"]}</p>
                )}
              </div>
              {projet === "autre" && (
                <div>
                  <label htmlFor="precision" className="text-sm font-semibold text-navy-deep">
                    Précisez votre demande
                  </label>
                  <textarea
                    id="precision"
                    name="precision"
                    rows={5}
                    maxLength={600}
                    value={precision}
                    onChange={(event) => setPrecision(event.target.value.slice(0, 600))}
                    placeholder="Décrivez votre besoin en quelques mots… (3 paragraphes maximum)"
                    className={fieldClass}
                  />
                  <p className="mt-1 text-right text-xs text-navy-deep/50">{precision.length}/600</p>
                  {errors["precision"] && (
                    <p className="mt-2 text-xs text-destructive">{errors["precision"]}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                disabled={sending}
                className="h-auto w-full rounded-full surface-navy px-6 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {sending
                  ? "Réservation en cours…"
                  : selectedSlot
                    ? `Confirmer le ${longDateFormatter.format(new Date(selectedSlot))} à ${timeFormatter.format(new Date(selectedSlot))}`
                    : "Confirmer mon rendez-vous"}
              </Button>
              {sendError && (
                <p role="alert" className="text-center text-xs text-destructive">
                  {sendError}
                </p>
              )}

              <p className="text-center text-xs text-muted-foreground">
                Vos données sont utilisées uniquement pour votre rendez-vous (RGPD).
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
            <img
              src={logo}
              alt="Logo Lamyae Ayoub — Gestion de patrimoine"
              className="h-12 w-auto"
            />
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link to="/mentions-legales" className="hover:text-navy-deep">
              Mentions légales
            </Link>
            <Link to="/confidentialite" className="hover:text-navy-deep">
              Politique de confidentialité (RGPD)
            </Link>
            <a href="mailto:l.ayoub@predictis-mia.com" className="hover:text-navy-deep">
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-10 space-y-2 border-t border-border pt-8 text-xs leading-relaxed text-muted-foreground">
          <p>
            Lamyae Ayoub — Mandataire en assurance et intermédiaire en opérations de banque et
            services de paiement, partenaire de Predictis (Groupe Premium). Activité de courtage
            enregistrée à l'ORIAS — n° ORIAS : 26000052 (
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
          <p>© {new Date().getFullYear()} Lamyae Ayoub — Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

function Temoignages() {
  const items = [
    {
      name: "Dr. Benali",
      role: "Chirurgien-dentiste, Lyon",
      text: "Honnêtement, je repoussais ce sujet depuis des années. Lamyae a pris le temps de tout reprendre à zéro avec moi, et elle a réussi à faire baisser mes impôts tout en lançant mon épargne retraite. Merci pour votre patience !",
    },
    {
      name: "Pr. Marchand",
      role: "Professeure des universités, Paris",
      text: "Ce que j'ai apprécié, c'est qu'elle ne m'a jamais rien vendu. Elle explique, elle compare, puis elle laisse décider. Lamyae a su rendre simple quelque chose qui me paraissait très opaque.",
    },
    {
      name: "M. Rivière",
      role: "Chef d'entreprise, Bordeaux",
      text: "Lamyae a réussi à renégocier mon assurance emprunteur en trois semaines : plus de 9 000 € économisés sur la durée du prêt. Elle a aussi placé la trésorerie de ma société. Réactive et vraiment carrée, bravo.",
    },
    {
      name: "Mme Delcourt",
      role: "Cadre dirigeante, Nantes",
      text: "J'avais surtout peur de mal protéger mes enfants. Lamyae a remis ma prévoyance et ma transmission en ordre, et elle répond toujours quand j'ai une question. Je la recommande sans hésiter.",
    },
  ];

  return (
    <section id="temoignages" className="mx-auto max-w-7xl px-6 py-24">
      <SectionTitle eyebrow="Témoignages" title="Ils m'ont fait confiance." />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t, i) => (
          <Reveal key={t.name} delay={i * 80}>
            <figure className="card-soft flex h-full flex-col p-7">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                « {t.text} »
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <span className="block text-sm font-semibold text-navy-deep">{t.name}</span>
                <span className="block text-xs text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Remonter en haut de la page"
      className={`fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full bg-navy-deep p-3 text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:bg-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

function Index() {
  return (
    <main className="bg-background">
      <Hero />
      <Temoignages />
      <Objectifs />
      <Solutions />
      <APropos />
      <Etapes />
      <Audit />
      <Footer />
      <BackToTop />
    </main>
  );
}
