import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { ChevronDown, Plus } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Allocations · Company Org" },
      {
        name: "description",
        content:
          "Allocations team structure organized by pods, with reporting hierarchy and KRAs.",
      },
    ],
  }),
  component: OrgPage,
});

/* ---------- TYPES ---------- */

type Color =
  | "orange"
  | "indigo"
  | "rose"
  | "amber"
  | "teal"
  | "emerald"
  | "violet"
  | "pink"
  | "sky"
  | "cyan"
  | "lime"
  | "fuchsia"
  | "blue";

type Person = {
  name: string;
  role: string;
  title?: string;
  projects?: string[];
  kra: string[];
  /** dotted-line manager, in addition to the parent in the tree */
  also?: string;
};

type Node = Person & {
  /** inherited from the parent branch when omitted */
  color?: Color;
  /** present ⇒ node is a pod column: members stack vertically instead of branching */
  pod?: Person[];
  children?: Node[];
};

/* base = 500 shade (fills, borders), text = 300 shade (legible on near-black) */
const palette: Record<Color, { base: string; text: string }> = {
  orange: { base: "#f97316", text: "#fdba74" },
  indigo: { base: "#6366f1", text: "#a5b4fc" },
  rose: { base: "#f43f5e", text: "#fda4af" },
  amber: { base: "#f59e0b", text: "#fcd34d" },
  teal: { base: "#14b8a6", text: "#5eead4" },
  emerald: { base: "#10b981", text: "#6ee7b7" },
  violet: { base: "#8b5cf6", text: "#c4b5fd" },
  pink: { base: "#ec4899", text: "#f9a8d4" },
  sky: { base: "#0ea5e9", text: "#7dd3fc" },
  cyan: { base: "#06b6d4", text: "#67e8f9" },
  lime: { base: "#84cc16", text: "#bef264" },
  fuchsia: { base: "#d946ef", text: "#f0abfc" },
  blue: { base: "#3b82f6", text: "#93c5fd" },
};

/* ---------- DATA ---------- */

const org: Node = {
  name: "Kingsley",
  role: "CEO",
  title: "Chief Executive Officer",
  color: "orange",
  kra: ["Overall company vision", "Executive leadership across Allocations"],
  children: [
    {
      name: "Brian Fischer",
      role: "COO",
      title: "Chief Operating Officer",
      color: "indigo",
      kra: ["Company operations", "Owns finance, tax and services"],
      children: [
        {
          name: "Finance & Tax",
          role: "",
          kra: [],
          pod: [
            {
              name: "Blake Richards",
              role: "VP of Finance",
              projects: ["Finance"],
              kra: ["Finance leadership", "Reports to Brian"],
            },
            {
              name: "Michael",
              role: "Tax Director",
              projects: ["Tax"],
              kra: ["Owns tax strategy and filings", "Reports to Brian"],
            },
          ],
        },
        {
          name: "Taylor",
          role: "VP Engineering",
          title: "Vice President, Engineering",
          color: "sky",
          also: "Kingsley",
          projects: ["Allocations"],
          kra: ["US-hours support coverage", "Co-manages QA Automation"],
          children: [
            {
              name: "Support & Ops",
              role: "",
              kra: [],
              pod: [
                {
                  name: "Anshul",
                  role: "Support Engineer",
                  projects: ["AllocationsX", "Hercules", "Poseidon"],
                  also: "Pankaj",
                  kra: ["US-hours full stack support", "Reports to Pankaj & Taylor"],
                },
                {
                  name: "Sanjay",
                  role: "Support Engineer",
                  projects: ["Hercules", "Poseidon"],
                  also: "Pankaj",
                  kra: ["US-hours full stack support", "Reports to Pankaj & Taylor"],
                },
              ],
            },
          ],
        },
        {
          name: "Titus Gulbis",
          role: "VP of Services",
          title: "VP of Services, Allocations",
          color: "cyan",
          also: "Kingsley",
          projects: ["Services"],
          kra: ["Owns services delivery", "Reports to Brian & Kingsley"],
          children: [
            {
              name: "Services",
              role: "",
              kra: [],
              pod: [
                {
                  name: "Avinash",
                  role: "Director of Services",
                  projects: ["Offshore", "Compliance"],
                  kra: [
                    "Services, offshore & compliance",
                    "Reports to Titus",
                  ],
                },
                {
                  name: "Punit",
                  role: "Senior Fund Admin Associate",
                  projects: ["Fund Admin"],
                  kra: ["Fund admin delivery", "Reports to Titus"],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Kurt Nunez",
      role: "Chief Compliance Officer",
      color: "rose",
      projects: ["Compliance"],
      kra: ["Owns compliance across Allocations", "Reports to Kingsley"],
      children: [
        {
          name: "Compliance",
          role: "",
          kra: [],
          pod: [
            {
              name: "Rich Thoms",
              role: "Assistant Chief Compliance Officer",
              projects: ["Compliance"],
              kra: ["Compliance execution", "Reports to Kurt"],
            },
          ],
        },
      ],
    },
    {
      name: "Luis",
      role: "Chief Revenue Officer",
      title: "US Ops",
      color: "amber",
      projects: ["Revenue", "US Ops"],
      kra: ["Owns revenue", "Reports to Kingsley"],
    },
    {
      name: "Rich N",
      role: "Director of Process & Project Management",
      title: "Director of Operations · AllocationsX",
      color: "teal",
      projects: ["AllocationsX", "Operations"],
      kra: [
        "Process and project management",
        "Operations on AllocationsX",
        "Reports to Kingsley",
      ],
    },
    {
      name: "GTM",
      role: "Go-To-Market",
      title: "Team — to be staffed",
      color: "blue",
      projects: ["GTM"],
      kra: ["Owns go-to-market", "Reports to Kingsley"],
    },
    {
      name: "Jitin",
      role: "Director of Finance",
      color: "lime",
      projects: ["Finance"],
      kra: ["Finance leadership", "Reports to Kingsley"],
    },
    {
      name: "Priyanka",
      role: "VP of Talent",
      title: "Chief of Staff",
      color: "fuchsia",
      projects: ["Talent"],
      kra: ["Owns talent", "Chief of Staff", "Reports to Kingsley"],
      children: [
        {
          name: "Business Ops",
          role: "",
          kra: [],
          pod: [
            {
              name: "Smita",
              role: "Business Operations Head",
              projects: ["Business Ops"],
              kra: ["Owns business operations", "Reports to Priyanka"],
            },
          ],
        },
      ],
    },
    {
      name: "Pankaj",
      role: "Head of Engineering",
      title: "Director of Engineering",
      color: "emerald",
      projects: ["AllocationsX", "Hercules", "Poseidon", "OpenStocks", "AI"],
      kra: [
        "Looks after all engineering projects",
        "Direct manager for all team leads",
        "Owns delivery across products",
      ],
      children: [
        {
          name: "AI & Data",
          role: "",
          kra: [],
          pod: [
            {
              name: "Ranjan",
              role: "AI + Full Stack Engineer",
              projects: ["AllocationsX", "Hercules", "Poseidon"],
              kra: ["AI + Full Stack delivery", "Cross-product features"],
            },
            {
              name: "Manish",
              role: "Data Engineer",
              projects: ["Allocations"],
              kra: ["Data scraping on AllocationsX"],
            },
          ],
        },
        {
          name: "Platform Eng",
          role: "",
          kra: [],
          pod: [
            {
              name: "Ayush",
              role: "Director of Engineering",
              projects: ["AllocationsX", "Hercules", "Poseidon"],
              kra: ["Backend + Blockchain", "Platform features"],
            },
            {
              name: "Dhruvin",
              role: "Director of Engineering",
              projects: ["AllocationsX", "Hercules", "Poseidon", "Allocations"],
              kra: ["Frontend-heavy full stack", "Cross-product UI"],
            },
            {
              name: "Soban",
              role: "Senior Engineer",
              projects: ["Hercules", "Poseidon"],
              kra: ["Full stack delivery", "Hercules & Poseidon"],
            },
          ],
        },
        {
          name: "QA",
          role: "",
          kra: [],
          pod: [
            {
              name: "Manoj",
              role: "QA Automation Lead",
              projects: ["All"],
              also: "Taylor",
              kra: ["QA automation across products", "Reports to Pankaj & Taylor"],
            },
          ],
        },
      ],
    },
    {
      name: "Guillaume",
      role: "Part-time CTO",
      title: "Part-time Chief Technology Officer",
      color: "violet",
      projects: ["Allocations", "Hercules", "Poseidon", "OpenStocks", "AI"],
      kra: ["Technical advisory across products", "Architecture guidance"],
      children: [
        {
          name: "OpenStocks",
          role: "",
          kra: [],
          pod: [
            {
              name: "Tushar",
              role: "OpenStocks Lead",
              projects: ["OpenStocks", "Allocations"],
              kra: ["Leads OpenStocks delivery", "Reports to Guillaume"],
            },
            {
              name: "Mayank",
              role: "Engineer",
              projects: ["OpenStocks"],
              kra: ["OpenStocks backend", "Reports to Tushar"],
            },
          ],
        },
      ],
    },
    {
      name: "Addhyan",
      role: "Director of Marketing",
      title: "Head of Marketing",
      color: "pink",
      projects: ["Marketing", "Brand", "Design"],
      kra: [
        "Owns marketing strategy across Allocations",
        "Leads brand, growth and design",
        "Reports to Kingsley",
      ],
      children: [
        {
          name: "Marketing & Design",
          role: "",
          kra: [],
          pod: [
            {
              name: "Vishesh",
              role: "Associate Director, Marketing",
              projects: ["Marketing"],
              kra: ["Marketing leadership", "Reports to Addhyan"],
            },
            {
              name: "Nitin Dwivedi",
              role: "Senior Marketing Manager",
              projects: ["Marketing"],
              kra: ["Senior marketing execution", "Reports to Addhyan"],
            },
            {
              name: "Nitin Yadav",
              role: "Email Marketing & Automation",
              projects: ["Automation"],
              kra: ["Email marketing", "Marketing automation"],
            },
            {
              name: "Lav",
              role: "UI/UX Designer",
              projects: ["Design"],
              kra: ["Product & marketing design", "Reports to Addhyan"],
            },
            {
              name: "Sweety",
              role: "UI/UX Designer",
              projects: ["Design"],
              kra: ["Product & marketing design", "Reports to Addhyan"],
            },
          ],
        },
      ],
    },
  ],
};

/* ---------- CARD PIECES ---------- */

/** One non-wrapping row: the dotted-line badge, then chips, then a +N overflow pill. */
function Chips({ items = [], also }: { items?: string[]; also?: string }) {
  const max = also ? 2 : 3;
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  return (
    <div className="mt-2 flex h-[18px] w-full items-center justify-center gap-1 overflow-hidden">
      {also && (
        <span
          title={`also reports to ${also}`}
          className="shrink-0 whitespace-nowrap rounded-md border border-dashed border-[var(--c)]/50 px-1.5 py-0.5 text-[9px] text-muted-foreground"
        >
          also {also}
        </span>
      )}
      {shown.map((p) => (
        <span
          key={p}
          className="shrink-0 whitespace-nowrap rounded-md border border-[var(--c)]/30 bg-[var(--c)]/10 px-1.5 py-0.5 text-[9px] font-medium text-[var(--ct)]"
        >
          {p}
        </span>
      ))}
      {extra > 0 && (
        <span
          title={items.slice(max).join(" · ")}
          className="shrink-0 rounded-md border border-[var(--c)]/20 px-1 py-0.5 text-[9px] text-muted-foreground"
        >
          +{extra}
        </span>
      )}
    </div>
  );
}

function KeyResults({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-md border border-[var(--c)]/30 bg-background/40 px-2 py-1.5 text-[10px] font-medium text-[var(--ct)] transition-colors hover:border-[var(--c)]/60 hover:bg-[var(--c)]/10"
      >
        <Plus className="h-3 w-3" />
        <span>Key Results</span>
        <span className="ml-0.5 rounded-full bg-background/60 px-1.5 text-[9px]">
          {items.length}
        </span>
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* 0fr → 1fr animates a height the browser can't otherwise transition to auto */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="mt-2 space-y-1 text-left">
            {items.map((k) => (
              <li
                key={k}
                className="flex items-start gap-1.5 rounded-md bg-background/40 px-2 py-1.5 text-[11px] text-foreground/85"
              >
                <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[var(--ct)]" />
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function PersonCard({ p, lead = false }: { p: Person; lead?: boolean }) {
  return (
    // w-full, never a fixed width: the container decides, so a card can't
    // overflow the pod box that holds it.
    <div className="w-full rounded-xl border border-[var(--c)]/35 bg-surface/70 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-[var(--c)]/70 hover:shadow-[0_12px_32px_-14px_var(--c)]">
      <div className="flex flex-col items-center px-3 pb-3 pt-4 text-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--c)] text-sm font-bold text-background ring-4 ring-[var(--c)]/15">
          {p.name.slice(0, 1)}
        </div>
        {/* every row is one fixed-height line: cards in a tier end up identical, and
            long titles ellipsize instead of wrapping. Full text stays in the tooltip. */}
        <div
          title={p.name}
          className="mt-2 w-full truncate text-sm font-semibold leading-5 text-foreground"
        >
          {p.name}
        </div>
        <div
          title={p.role}
          className={`w-full truncate text-[11px] leading-4 ${lead ? "font-medium text-[var(--ct)]" : "text-muted-foreground"}`}
        >
          {p.role}
        </div>
        <div
          title={p.title}
          className="w-full truncate text-[10px] leading-4 text-muted-foreground/70"
        >
          {p.title ?? " "}
        </div>
        <Chips items={p.projects} also={p.also} />
        {p.kra.length > 0 && <KeyResults items={p.kra} />}
      </div>
    </div>
  );
}

function PodStack({ node }: { node: Node }) {
  return (
    <div className="flex w-full flex-col gap-3 rounded-xl border border-[var(--c)]/30 bg-background/40 p-3">
      <div className="flex items-center gap-2 px-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--ct)]" />
        <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ct)]">
          {node.name}
        </div>
      </div>
      {node.pod!.map((m) => (
        <PersonCard key={m.name} p={m} />
      ))}
    </div>
  );
}

/* ---------- TREE ---------- */

/**
 * Each node draws its own connectors relative to itself, so lines land on card
 * centres for any number of children. Columns are spaced with padding rather
 * than a grid gap — sibling edges touch, so the horizontal bus stays unbroken.
 */
function TreeNode({
  node,
  inherited,
  bus,
  first = true,
  last = true,
  root = false,
}: {
  node: Node;
  inherited: Color;
  /** parent's base colour — the bus belongs to the parent */
  bus?: string;
  first?: boolean;
  last?: boolean;
  root?: boolean;
}) {
  const color = node.color ?? inherited;
  const { base, text } = palette[color];
  const kids = node.children ?? [];

  return (
    // no padding on the li itself: the connector row spans the column edge-to-edge
    // so adjacent siblings' bus segments touch. Gutters live on the card instead.
    <li
      className="flex flex-col items-center"
      style={{ "--c": base, "--ct": text } as CSSProperties}
    >
      {!root && (
        <div className="relative h-7 w-full shrink-0">
          <div
            className="absolute top-0 h-px"
            style={{
              background: `${bus}80`,
              left: first ? "50%" : 0,
              right: last ? "50%" : 0,
            }}
          />
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--c)]/60" />
        </div>
      )}

      {/* the one place a column's width is declared — COL wide, incl. gutters */}
      <div className="w-[256px] px-2">
        {node.pod ? <PodStack node={node} /> : <PersonCard p={node} lead={!!kids.length} />}
      </div>

      {kids.length > 0 && (
        <>
          <div className="h-7 w-px shrink-0 bg-[var(--c)]/60" />
          <ul className="flex items-start">
            {kids.map((k, i) => (
              <TreeNode
                key={k.name}
                node={k}
                inherited={color}
                bus={base}
                first={i === 0}
                last={i === kids.length - 1}
              />
            ))}
          </ul>
        </>
      )}
    </li>
  );
}

/* ---------- FIT TO SCREEN ---------- */

/** card 240px + 8px gutter each side */
const COL = 256;

/** Natural width comes from the data, so no measure/re-measure pass is needed. */
function treeWidth(n: Node): number {
  const kids = n.children ?? [];
  return kids.length
    ? Math.max(COL, kids.reduce((sum, k) => sum + treeWidth(k), 0))
    : COL;
}

const NATURAL_W = treeWidth(org);

/**
 * ponytail: `zoom` (not transform) so the container reflows to the scaled height
 * on its own. Floored at 0.4 — below that the labels are unreadable and the
 * scroll container takes over.
 */
function useFitZoom() {
  const [zoom, setZoom] = useState(1);
  useEffect(() => {
    // 48 main padding + 40 panel padding + 8 slack
    const fit = () =>
      setZoom(Math.max(0.4, Math.min(1, (window.innerWidth - 96) / NATURAL_W)));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return zoom;
}

/* ---------- PAGE ---------- */

function OrgPage() {
  const zoom = useFitZoom();
  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(20,184,166,0.06),transparent_70%)]" />

      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-accent-foreground">
              A
            </div>
            <div className="text-sm font-semibold tracking-tight">Allocations</div>
          </div>
          <div className="text-xs text-muted-foreground">
            Company Org · Pod Structure
          </div>
        </div>
      </header>

      <main className="relative px-6 py-10">
        {/* dot grid lives on the unzoomed panel, so the grid pitch stays constant
            no matter how far the tree scales down to fit */}
        <div
          className="overflow-x-auto rounded-2xl border border-border/70 bg-surface/20 p-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        >
          <div style={{ zoom }}>
            <ul className="mx-auto flex w-max">
              <TreeNode node={org} inherited="orange" root />
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-[1000px] rounded-lg border border-border bg-surface/40 px-4 py-3 text-center text-[11px] text-muted-foreground">
          Dashed badges mark dotted-line reporting · Taylor and Titus report to
          both Brian &amp; Kingsley · Anshul, Sanjay and Manoj report into both
          Pankaj &amp; Taylor
        </div>
      </main>
    </div>
  );
}
