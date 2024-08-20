import { defineCollection, z } from 'astro:content';

const proceduresCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      tag: z.string(),
      title: z.string(),
      cover: image(),
      lang: z.string()
    })
});

const privacyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    lang: z.string()
  })
});

export const collections = {
  procedures: proceduresCollection,
  privacy: privacyCollection
};
