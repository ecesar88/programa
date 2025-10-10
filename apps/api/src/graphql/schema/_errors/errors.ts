import z from "zod";

export class RecordNotFoundError extends Error {
	constructor(recordName?: string) {
		super(`${recordName} was not found or does not exist.`);
		this.name = "RecordNotFoundError";
	}
}

export class LengthError extends Error {
	minLength: number;

	constructor(minLength: number) {
		super(`string length should be at least ${minLength}`);

		this.minLength = minLength;
		this.name = "LengthError";
	}
}
