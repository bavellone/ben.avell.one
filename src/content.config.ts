import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const caseStudies = defineCollection({
  loader: glob({
    base: "./src/content/case-studies",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      oneline: z.string(),
      role: z.string(),
      client: z.string().optional(),
      dates: z.string(),
      stack: z.array(z.string()),
      liveUrl: z.string().url().optional(),
      companyUrl: z.string().url().optional(),
      heroTreatment: z.enum(["image", "typographic"]).default("image"),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      order: z.number(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { caseStudies };
