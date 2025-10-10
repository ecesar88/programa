import { Prisma } from "@prisma/client";
import { LOG_TYPE, logger } from "./logger";

/*
 * Error codes reference: https://www.prisma.io/docs/orm/reference/error-reference#error-codes
 */

enum PrismaErrorCodes {
	P2002 = "P2002",
	P1000 = "P1000",
	P1001 = "P1001",
	P1002 = "P1002",
	P1003 = "P1003",
	P1008 = "P1008",
	P1009 = "P1009",
	P1010 = "P1010",
	P1011 = "P1011",
	P1012 = "P1012",
	P1013 = "P1013",
	P1014 = "P1014",
	P1015 = "P1015",
	P1016 = "P1016",
	P1017 = "P1017",
	P1018 = "P1018",
}

const PREFIX = "[Prisma Error]:";

export function handlePrismaErrors(e: Error) {
	if (e instanceof Prisma.PrismaClientKnownRequestError) {
		logger({
			level: LOG_TYPE.ERROR,
			message: `${PREFIX} ${e.name} - ${e.message}`,
		});

		// The .code property can be accessed in a type-safe manner
		if (e.code === PrismaErrorCodes.P2002) {
			return {
				message: "Unique constraint failed",
			};
		}
	}
}
