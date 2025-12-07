import { z } from 'zod';

export const postSchema = z.object({
    title: z.string().regex(/^[^\r\n]{1,150}$/, {
        message: "Invalid title",
    }),

    slug: z
        .string()
        .lowercase()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: "Invalid slug",
        }),

    content: z
        .string()
        .max(4000)
        .regex(/^[\s\S]{1,4000}$/, {
            message: "Content cannot be empty",
        }),

    keywords: z
        .array(
            z
                .string()
                .max(15)
                .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, {
                    message: "Invalid keyword",
                })
        )
        .max(6),
});
