import { flattenErrors } from "../../../utils/misc";
import { ZodError } from "zod";
import { builder } from "../../builder";
import { LengthError, RecordNotFoundError } from "./errors";

export const ErrorInterface = builder.interfaceRef<Error>("Error").implement({
	fields: (t) => ({
		message: t.exposeString("message"),
	}),
});

builder.objectType(Error, {
	name: "BaseError",
	interfaces: [ErrorInterface],
	fields: (t) => ({
		message: t.exposeString("message"),
	}),
});

builder.objectType(RecordNotFoundError, {
	name: "RecordNotFoundError",
	interfaces: [ErrorInterface],
	fields: (t) => ({
		message: t.exposeString("message"),
	}),
});

builder.objectType(LengthError, {
	name: "LengthError",
	interfaces: [ErrorInterface],
	fields: (t) => ({
		minLength: t.exposeInt("minLength"),
	}),
});

// A type for the individual validation issues
export const ZodFieldError = builder
	.objectRef<{
		message: string;
		path: string[];
	}>("ZodFieldError")
	.implement({
		fields: (t) => ({
			message: t.exposeString("message"),
			path: t.exposeStringList("path"),
		}),
	});

// The actual error type
builder.objectType(ZodError, {
	name: "ZodError",
	interfaces: [ErrorInterface],
	fields: (t) => ({
		fieldErrors: t.field({
			type: [ZodFieldError],
			resolve: (err) => flattenErrors(err.format(), []),
		}),
	}),
});
