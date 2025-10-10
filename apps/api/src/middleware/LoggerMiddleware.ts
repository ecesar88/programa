import { HttpStatusCode } from "@repo/shared/constants";
import { NextFunction, Request, Response } from "express";
import nodeColorLog from "node-color-log";

export function HTTPLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
	// Do not log GraphQl queries, they will be handled by the useLogger envelop plugin
	if (req.path.includes("graphql")) {
		next();
		return;
	}

	const log = () => {
		const separator = " :: ";
		const logPrefix = " => ";
		const baseLogger = nodeColorLog
			.color("yellow")
			.append(`[${new Date().toISOString()}]`)
			.reset()
			.append(separator);

		const REQ_METHOD = req.method;
		const RES_STATUS = res.statusCode;
		const ENDPOINT = req.originalUrl;
		const CLIENT_IP = req.ip;

		const getAppropriateColorBasedOnResponseCode = (responseCode: HttpStatusCode) => {
			switch (responseCode) {
				case HttpStatusCode.OK: {
					return baseLogger.bgColor("green").color("black");
				}

				case HttpStatusCode.UNAUTHORIZED: {
					return baseLogger.bgColor("yellow").color("black");
				}

				case HttpStatusCode.INTERNAL_SERVER_ERROR: {
					return baseLogger.bgColor("red").color("black");
				}

				case HttpStatusCode.BAD_REQUEST: {
					return baseLogger.bgColor("yellow").color("black");
				}

				default: {
					return baseLogger.bgColor("green").color("black");
				}
			}
		};

		getAppropriateColorBasedOnResponseCode(RES_STATUS)
			.append(`[${RES_STATUS}]`)
			.reset()
			.color("green")
			.append(logPrefix)
			.color("yellow")
			.append(REQ_METHOD)
			.color("green")
			.append(" on ")
			.color("yellow")
			.append(`${ENDPOINT}`)
			.color("green")
			.append(" from ")
			.color("yellow")
			.append(CLIENT_IP)
			.append("\n")
			.log();
	};

	res.on("finish", log);

	next();
}
