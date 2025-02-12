import { z } from "zod";

export const categorySchema = z.intersection(
    z.object({
        parentId: z.string().min(1), // varchar
        position: z.number().min(1), // int
        name: z.string().min(1), // varchar
        slug: z.string().min(1), // varchar
        displayMode: z.string().nullable(), // varchar
        description: z.string().min(1), // text
        categoryIcon: z.string().nullable(), // varchar
        status: z.boolean().default(false), // bool or tinyint
        additional: z.array(z.string()), // json
    }),

    z.discriminatedUnion("variant", [
        z.object({ variant: z.literal("create") }),
        z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
);

export type CategorySchema = z.infer<typeof categorySchema>;

export const defaultValues: CategorySchema = {
    variant: "create",
    parentId: "",
    position: 1,
    name: "",
    slug: "",
    displayMode: null,
    description: "",
    categoryIcon: null,
    status: true,
    additional: [],
};
