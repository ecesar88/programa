import * as z from "zod/v4";
import { builder } from "../../builder";
import { RecordNotFoundError } from "../_errors/errors";
import {
	create,
	createOrUpdateMenuEntryLabel,
	deleteMenuEntryLabel,
	queryAll,
	queryAllMenuLabels,
	queryOne,
	remove,
	searchMenuEntryLabels,
	update,
} from "./resolvers";
import {
	MenuEntryCreateOrUpdateInput,
	MenuEntryLabelInput,
	MenuEntryLabelObject,
	MenuEntryObject,
} from "./types";
// import { MenuEntryCreateOrUpdateInputSchema } from './schemas'
import { MenuEntryCreateOrUpdateInputSchema } from "@repo/shared/resolvers";

builder.queryField("getAllMenuEntries", (t) =>
	t.field({
		type: [MenuEntryObject],
		args: {
			page: t.arg({
				type: "Int",
				defaultValue: 1,
				validate: {
					schema: z.number().positive("Page must be a positive integer"),
				},
			}),
		},
		resolve: queryAll,
	}),
);

builder.queryField("getMenuEntryById", (t) =>
	t.field({
		type: MenuEntryObject,
		errors: {
			types: [RecordNotFoundError],
		},
		args: {
			id: t.arg({
				type: "Int",
				required: true,
				validate: {
					schema: z.number().positive("Id must be a positive integer"),
				},
			}),
		},
		resolve: queryOne,
	}),
);

// builder.queryField('searchMenuEntries', (t) =>
//   t.field({
//     type: [MenuEntryType],
//     args: {
//       search: t.arg.string({
//         required: true,
//         validate: {
//           schema: z.string()
//         }
//       })
//     },
//     resolve: search
//   })
// )

builder.mutationField("createMenuEntry", (t) =>
	t.field({
		type: MenuEntryObject,
		args: {
			data: t.arg({
				type: MenuEntryCreateOrUpdateInput,
				required: true,
			}),
		},
		resolve: create,
	}),
);

builder.mutationField("updateMenuEntry", (t) =>
	t.field({
		type: MenuEntryObject,
		errors: {
			types: [RecordNotFoundError],
		},
		args: {
			id: t.arg({
				type: "Int",
				required: true,
				validate: {
					schema: z.number().positive(),
				},
			}),
			data: t.arg({
				type: MenuEntryCreateOrUpdateInput,
				required: true,
				validate: {
					schema: MenuEntryCreateOrUpdateInputSchema,
				},
			}),
		},
		resolve: update,
	}),
);

builder.mutationField("deleteMenuEntry", (t) =>
	t.field({
		type: MenuEntryObject,
		errors: {
			types: [RecordNotFoundError],
		},
		args: {
			id: t.arg({
				type: "Int",
				required: true,
				validate: {
					schema: z.number().positive(),
				},
			}),
		},
		resolve: remove,
	}),
);

//**************************************** MENU LABEL ************************************************ */

builder.queryField("getAllMenuEntryLabels", (t) =>
	t.field({
		type: [MenuEntryLabelObject],
		args: {
			page: t.arg({
				type: "Int",
				defaultValue: 1,
				validate: {
					schema: z.number().positive("Page must be a positive integer"),
				},
			}),
		},
		resolve: queryAllMenuLabels,
	}),
);

builder.queryField("searchMenuEntryLabels", (t) =>
	t.field({
		type: [MenuEntryLabelObject],
		args: {
			searchTerm: t.arg({
				type: "String",
				required: true,
				validate: {
					schema: z.string({ message: "Search argument must be a string" }),
				},
			}),
		},
		resolve: searchMenuEntryLabels,
	}),
);

builder.mutationField("createOrUpdateMenuEntryLabel", (t) =>
	t.field({
		type: MenuEntryLabelObject,
		errors: {
			types: [RecordNotFoundError],
		},
		args: {
			id: t.arg({
				type: "Int",
				required: false,

				validate: {
					schema: z.number().positive("Id must be a positive integer"),
				},
			}),
			data: t.arg({
				type: MenuEntryLabelInput,
				required: true,
			}),
		},
		resolve: createOrUpdateMenuEntryLabel,
	}),
);

builder.mutationField("deleteMenuEntryLabel", (t) =>
	t.field({
		type: MenuEntryLabelObject,
		errors: {
			types: [RecordNotFoundError],
		},
		args: {
			id: t.arg({
				type: "Int",
				required: true,

				validate: {
					schema: z.number().positive("Id must be a positive integer"),
				},
			}),
		},
		resolve: deleteMenuEntryLabel,
	}),
);
