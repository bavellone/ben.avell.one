// Per-page Open Graph card generation.
// Branded with the site identity: "BEN AVELLONE" wordmark + accent rule on
// top, page title + description centered, ben.avell.one + full-bleed accent
// base-band on the bottom (echoes the favicon's accent band).
//
// Satori lays out + word-wraps the text and emits SVG with glyphs as vector
// paths (using the vendored static Inter weights), so the rasterizer needs no
// fonts. sharp turns that SVG into the PNG. Static-built: one
// .png per route at build time.
import fs from "node:fs";
import satori from "satori";
import sharp from "sharp";
import { getCollection } from "astro:content";

// cwd-relative: `astro build` runs from the project root.
const interRegular = fs.readFileSync("./src/assets/og-fonts/Inter-Regular.ttf");
const interExtraBold = fs.readFileSync(
  "./src/assets/og-fonts/Inter-ExtraBold.ttf",
);

const caseStudies = await getCollection("caseStudies", ({ data }) => !data.draft);

const pages: Record<string, { title: string; description: string }> = {
  home: {
    title: "Ben Avellone",
    description: "Full-stack engineer building products end-to-end for SMBs.",
  },
  about: {
    title: "About",
    description:
      "Full-stack engineer and founder of CodeScalar LLC. Remote, U.S. Central time.",
  },
  projects: {
    title: "Projects",
    description: "Selected work across a decade of production systems.",
  },
  "case-studies": {
    title: "Case Studies",
    description: "Deep dives on shipped, reliable products.",
  },
  "404": {
    title: "Not here.",
    description: "There's nothing at this address.",
  },
};

for (const cs of caseStudies) {
  pages[`case-studies/${cs.id}`] = {
    title: cs.data.title,
    description: cs.data.oneline,
  };
}

// OG descriptions read better short. Trim long onelines at a word boundary.
function clamp(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

const ACCENT = "#1e40af";
const BG = "#fafafa";
const INK = "#0a0a0a";
const INK_SOFT = "#5a5a5a";

function card(title: string, description: string) {
  // Size the title to stay on one line. The instanced Inter-ExtraBold renders
  // a spurious wide first space when satori wraps it across lines (the Regular
  // weight used for the description is unaffected); single-line sidesteps it.
  // 0.58 is a deliberately generous per-char advance estimate (Inter ExtraBold
  // averages ~0.55em) so the fit is conservative. Text width ≈ 1040px.
  const titleSize = Math.max(
    40,
    Math.min(64, Math.floor(1040 / (title.length * 0.58))),
  );
  return {
    type: "div",
    props: {
      style: {
        position: "relative",
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: BG,
        paddingTop: 80,
        paddingBottom: 76,
        paddingLeft: 80,
        paddingRight: 80,
        fontFamily: "Inter",
      },
      children: [
        // Wordmark + accent rule
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 38,
                    fontWeight: 800,
                    letterSpacing: -0.5,
                    color: INK,
                  },
                  children: "BEN AVELLONE",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    marginTop: 18,
                    width: 104,
                    height: 6,
                    borderRadius: 2,
                    backgroundColor: ACCENT,
                  },
                },
              },
            ],
          },
        },
        // Title + description (vertically centered between header and footer)
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              justifyContent: "center",
              paddingTop: 36,
              paddingBottom: 36,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: titleSize,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: INK,
                  },
                  children: title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    marginTop: 26,
                    fontSize: 30,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    color: INK_SOFT,
                  },
                  children: clamp(description),
                },
              },
            ],
          },
        },
        // Domain
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              fontSize: 26,
              fontWeight: 400,
              letterSpacing: 0.3,
              color: INK_SOFT,
            },
            children: "ben.avell.one",
          },
        },
        // Full-bleed accent base-band (ignores padding via absolute)
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 1200,
              height: 14,
              backgroundColor: ACCENT,
            },
          },
        },
      ],
    },
  };
}

export function getStaticPaths() {
  return Object.keys(pages).map((key) => ({ params: { route: `${key}.png` } }));
}

export async function GET({ params }: { params: { route: string } }) {
  const key = params.route.replace(/\.png$/, "");
  const page = (pages[key] ?? pages.home)!;

  const svg = await satori(
    card(page.title, page.description) as Parameters<typeof satori>[0],
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interExtraBold, weight: 800, style: "normal" },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
