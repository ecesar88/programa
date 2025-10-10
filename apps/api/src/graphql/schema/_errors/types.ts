import { builder } from "../../builder";

/* --- Interface Definitions --- */

export interface ZodValidationErrorDetailType {
	validation: string;
	code: string;
	message: string;
	path: string[];
}

export interface ZodValidationErrorType {
	name: string;
	details: ZodValidationErrorDetailType[];
}

/* --- Object Definitions --- */

const ZodValidationErrorDetailRef = builder.objectRef<ZodValidationErrorDetailType>(
	"ZodValidationErrorDetail",
);
export const ZodValidationErrorDetailObject = ZodValidationErrorDetailRef.implement({
	description: "An error detail from Zod that shows the details of the validations that failed",
	fields: (t) => ({
		validation: t.exposeString("validation"),
		code: t.exposeString("code"),
		message: t.exposeString("message"),
		path: t.exposeStringList("path"),
	}),
});

const ZodValidationErrorRef = builder.objectRef<ZodValidationErrorType>("ZodValidationError");
export const ZodValidationErrorObject = ZodValidationErrorRef.implement({
	description:
		"A validation error from Zod that is thrown whenever the data does not satisfy the schema",
	fields: (t) => ({
		name: t.exposeString("name"),
		details: t.field({
			type: [ZodValidationErrorDetailObject],
			resolve: (t) => t.details,
		}),
	}),
});
