// biome-ignore assist/source/organizeImports: Can't sort imports automatically
import {
	useEngine,
	useErrorHandler,
	useMaskedErrors,
	usePayloadFormatter,
} from "@envelop/core";
import { renderGraphiQL } from "@graphql-yoga/render-graphiql"; // Not working?
import cors from "cors";
import dotenv from "dotenv";
import Express from "express";
import figlet from "figlet";
import { execute, parse, specifiedRules, subscribe, validate } from "graphql";
import { createYoga, useLogger } from "graphql-yoga";
import helmet, { type HelmetOptions } from "helmet";
import nodeColorLog from "node-color-log";
import path from "node:path";
import "reflect-metadata";
import { InfoController } from "./controllers/info";
import { env } from "./env";
import { context } from "./graphql/context";
import { schema } from "./graphql/schema";
import { HTTPLoggerMiddleware } from "./middleware";
import { ROUTES } from "./routes";
import { gqlLogger } from "./utils/graphqlLogger";
import { LOG_TYPE, logger } from "./utils/logger";
import { printRouteTable } from "./utils/printRouteTable";

const helmetOptions: HelmetOptions = {
	contentSecurityPolicy: {
		directives: {
			"style-src-elem": ["'self'", "unpkg.com", "'unsafe-inline'"],
			"script-src": ["'self'", "unpkg.com", "'unsafe-inline'", "'unsafe-eval'"],
			"img-src": ["'self'", "raw.githubusercontent.com"],
			"worker-src": ["*", "blob:"],
		},
	},
};

dotenv.config();

const SERVER_PORT = env.SERVER_PORT;
const SERVER_HOSTNAME = env.SERVER_HOSTNAME;
const APP_NAME = env.APP_NAME;

const PUBLIC_FOLDER_NAME = "public";
const PUBLIC_FOLDER_PATH = path.join(process.cwd(), PUBLIC_FOLDER_NAME);

(async function bootstrap() {
	const express = Express();
	const yoga = createYoga({
		batching: true,
		renderGraphiQL,
		logging: "debug",
		schema,
		context,
		plugins: [
			useEngine({
				parse,
				validate,
				specifiedRules,
				execute,
				subscribe,
			}),
			useLogger({
				logFn: gqlLogger,
			}),
			useMaskedErrors(),
			useErrorHandler((errorHandler) => {
				// This callback is called once, containing all GraphQLError emitted during execution phase
				logger({
					level: LOG_TYPE.ERROR,
					message: "Generic error",
					object: JSON.stringify(
						{ errors: errorHandler.errors, args: errorHandler.context },
						null,
						2,
					),
				});
			}),
			usePayloadFormatter((_result, _executionArgs) => {
				// Return a modified result here,
				// Or `false`y value to keep it as-is.
				return false;
			}),
		],
	});

	express.use(
		`${ROUTES.INFO_ROOT}${ROUTES.INFO_DOCS}`,
		Express.static(PUBLIC_FOLDER_PATH),
	);
	express.use(helmet(helmetOptions));
	express.use(Express.json());
	express.use(cors({ origin: "http://localhost:5173" })); // 5173 is the port Electron's renderer runs
	express.use(yoga.graphqlEndpoint, yoga);

	express.use(HTTPLoggerMiddleware);

	// Register InfoController
	express.get(
		`${ROUTES.INFO_ROOT}${ROUTES.INFO_HEALTHCHECK}`,
		InfoController.get,
	);

	express.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
		figlet(
			APP_NAME,
			{
				width: 80,
				whitespaceBreak: true,
			},
			(_, figlet) => {
				logger({
					level: LOG_TYPE.INFO,
					message: `🚀 Server ready on ${SERVER_HOSTNAME}:${SERVER_PORT}`,
				});

				nodeColorLog.color("yellow").log(figlet);

				printRouteTable(express);
			},
		);
	});
})().catch(console.error);
