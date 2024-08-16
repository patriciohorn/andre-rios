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

export const collections = {
  procedures: proceduresCollection
};
