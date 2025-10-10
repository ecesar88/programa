import { ZodFormattedError } from "zod";

export const capitalize = (str?: string) => `${str?.split("")[0].toUpperCase()}${str?.slice(1)}`;

export const fixJson = (badJSON: string) => {
	return (
		badJSON
			// Replace ":" with "@colon@" if it's between double-quotes
			.replace(/:\s*"([^"]*)"/g, function (_match, p1) {
				return ': "' + p1.replace(/:/g, "@colon@") + '"';
			})

			// Replace ":" with "@colon@" if it's between single-quotes
			.replace(/:\s*'([^']*)'/g, function (_match, p1) {
				return ': "' + p1.replace(/:/g, "@colon@") + '"';
			})

			// Add double-quotes around any tokens before the remaining ":"
			.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?\s*:/g, '"$2": ')

			// Turn "@colon@" back into ":"
			.replace(/@colon@/g, ":")
	);
};

export const getRandomInteger = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min)) + min;
};

// Util for flattening zod errors into something easier to represent in your Schema.
export function flattenErrors(
	error: ZodFormattedError<unknown>,
	path: string[],
): { path: string[]; message: string }[] {
	const errors = error._errors.map((message) => ({
		path,
		message,
	}));

	Object.keys(error).forEach((key) => {
		if (key !== "_errors") {
			errors.push(
				...flattenErrors((error as Record<string, unknown>)[key] as ZodFormattedError<unknown>, [
					...path,
					key,
				]),
			);
		}
	});

	return errors;
}
