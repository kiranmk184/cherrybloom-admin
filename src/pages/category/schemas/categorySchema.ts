import { z } from "zod";

export const categorySchema = z.intersection(
    z.object({
        id: z.string().nullable(),
        parentId: z.string().min(1), // varchar
        displayMode: z.string().nullable(), // varchar
        position: z.number().nonnegative(), // int
        _lft: z.number().nonnegative(), // varchar
        _rgt: z.number().nonnegative(), // varchar
        categoryImg: z.string().nullable(), // varchar
        categoryIcon: z.string().nullable(), // varchar
        status: z.boolean().default(false), // bool or tinyint
        additional: z.array(z.string()).nullable(), // json
        createdAt: z.string(), // json
        updatedAt: z.string(), // json
    }),

    z.discriminatedUnion("variant", [
        z.object({ variant: z.literal("create") }),
        z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
);

export type CategorySchema = z.infer<typeof categorySchema>;

export const defaultValues: CategorySchema = {
    id: null,
    variant: "create",
    parentId: "",
    displayMode: null,
    position: 1,
    _lft: 0,
    _rgt: 0,
    categoryImg: null,
    categoryIcon: "",
    status: true,
    additional: [],
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
};