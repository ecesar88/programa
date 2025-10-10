import z from "zod";

export const MenuEntryVariantInputSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	price: z.number(),
});

export const MenuEntryCategoryInputSchema = z.object({
	name: z.string(),
});

export const MenuEntryLabelInputSchema = z.object({
	name: z.string(),
	color: z.string(),
});

export const MenuEntryCreateOrUpdateInputSchema = z.object({
	name: z.string().min(3),
	description: z.string().optional(),
	variants: z.array(MenuEntryVariantInputSchema).optional().nullable(),
	labels: z.array(MenuEntryLabelInputSchema).optional().nullable(),
	categories: z.array(MenuEntryCategoryInputSchema).optional().nullable(),
});

export const MenuEntryUpdateSchema = z.object({
	id: z.number().positive().int(),
	data: MenuEntryCreateOrUpdateInputSchema,
});
