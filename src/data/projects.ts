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
      "This site. Static Astro with no hydrated JavaScript, Tailwind v4. Cloudflare Pages hosting and DNS, with the zone and Pages project managed end-to-end in Terraform.",
    stack: ["Astro", "TypeScript", "Tailwind CSS", "Cloudflare Pages", "Terraform"],
    files: [{ label: "Source on GitHub", href: "https://github.com/bavellone/ben.avell.one" }],
    featured: true,
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
    name: "ScheduleGofer",
    dates: "2012 – 2015",
    status: "Legacy",
    blurb:
      "Scheduling platform for restaurant operators to manage hourly employee shifts, time-off requests and store-wide communication. Built within OrderCounter, Inc.",
    stack: ["AngularJS", "PHP", "MySQL"],
    files: [{label: "Home page", href: "https://home.schedulegofer.com"}]
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
