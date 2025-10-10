import { Prisma } from "@prisma/client";
import { builder } from "../../builder";

/* --- Interface Definitions --- */

export type TypeClient = Prisma.ClientGetPayload<{ include: { orders: true } }>;

/* --- Object Definitions --- */

const ClientRef = builder.objectRef<TypeClient>("Client");

export const Client = ClientRef.implement({
	description: "A client/customer on the application",
	fields: (t) => ({
		id: t.exposeInt("id", { description: "The id on the database" }),
		name: t.exposeString("name", { description: "The customer's name" }),
		phone: t.exposeString("phone", { nullable: true }),
	}),
});

/* --- Inputs Definitions --- */

export const ClientCreateOrUpdateInput = builder.inputType(
	"ClientCreateOrUpdateInput",
	{
		fields: (t) => ({
			name: t.string({ required: true }),
			phone: t.string(),
		}),
	},
);
