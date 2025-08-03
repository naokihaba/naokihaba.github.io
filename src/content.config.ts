import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const talks = defineCollection({
	loader: glob({ base: './src/content/talks', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			date: z.coerce.date(),
			event: z.string(),
			slideUrl: z.string().url().optional(),
			videoUrl: z.string().url().optional(),
			heroImage: image().optional(),
		}),
});

const writings = defineCollection({
	loader: glob({ base: './src/content/writings', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			publication: z.string(),
			articleUrl: z.string().url(),
			heroImage: image().optional(),
		}),
});

export const collections = { talks, writings };
