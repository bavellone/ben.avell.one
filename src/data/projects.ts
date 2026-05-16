// Single source of truth for projects. Consumed by both the full /projects
// page and the home "Selected projects" subset (anything with featured: true),
// so the two never drift. Dates/status are structured fields. The home cards
// render name + blurb only and omit them; /projects shows them.
import type { ImageMetadata } from "astro";
import metalDetectorCircuit from "~/assets/projects/metal-detector-circuit.png";

export interface ProjectImage {
  src: ImageMetadata;
  alt: string;
}

export interface ProjectFile {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  dates: string;
  status: string;
  blurb: string;
  stack: string[];
  url?: string;
  images?: ProjectImage[];
  files?: ProjectFile[];
  /** Surfaced on the home "Selected projects" list. */
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: "ben.avell.one",
    dates: "May 2026",
    status: "Live",
    blurb:
      "This site. Static Astro with no hydrated JavaScript, Tailwind v4 design tokens, and per-page OG cards rendered at build. Cloudflare Pages hosting and DNS, with the zone and Pages project managed end-to-end in Terraform.",
    stack: ["Astro", "TypeScript", "Tailwind CSS", "Cloudflare Pages", "Terraform"],
    files: [{ label: "Source on GitHub", href: "https://github.com/bavellone/ben.avell.one" }],
  },
  {
    name: "AI-First SaaS Rewrite",
    dates: "Early 2026 – Present",
    status: "In progress",
    blurb:
      "Rewriting a legacy internal PHP codebase into a modern TypeScript/React SaaS product, with Claude Code implementing under a short leash according to hand-authored specs and architectural review.",
    stack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Claude Code"],
    featured: true,
  },
  {
    name: "FSLA Membership Portal",
    dates: "April 2017 – June 2021",
    status: "Sunset",
    blurb:
      "React/Redux + isomorphic SSR + Neo4j. Relationship-rich member data in a graph database, rendered server-side and hydrated on the client.",
    stack: ["React", "Redux", "Node.js", "Neo4j", "SSR"],
    featured: true,
  },
  {
    name: "ScheduleGofer",
    dates: "2012 – 2015",
    status: "Legacy",
    blurb:
      "First substantive product: scheduling for restaurant operators, built within OrderCounter, Inc.",
    stack: ["AngularJS", "PHP", "MySQL"],
    featured: true,
  },
  {
    name: "Metal Detector (BFO)",
    dates: "2016",
    status: "Coursework",
    blurb:
      "A beat-frequency-oscillator metal detector: two Colpitts oscillators, one detuned by nearby metal, mixed down to an audible tone. Built for EEE 3308 (Electronic Circuits I) toward my B.S. in Computer Engineering.",
    stack: ["Analog circuit design", "Colpitts oscillator", "BFO"],
    images: [
      {
        src: metalDetectorCircuit,
        alt: "Schematic of the BFO metal detector: detector and reference Colpitts oscillators feeding a mixer, preamp, and audio amplifier.",
      },
    ],
    files: [{ label: "Project slides (PDF)", href: "/files/metal-detector-bfo.pdf" }],
  },
];
