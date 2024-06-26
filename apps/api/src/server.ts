import { InjectionToken } from "@decorators/di";
import {
  Container,
  ERROR_MIDDLEWARE,
  attachControllers,
} from "@decorators/express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { ClientController } from "./controllers/client";
import { InfoController } from "./controllers/info";
import { OrderController } from "./controllers/order";
import { ErrorHandlerMiddleware, LoggerMiddleware } from "./middleware";
import { PrismaService } from "./services/prismaService";
import { LOG_LEVEL, logger } from "./utils/logger";
import { parseEnv } from "./utils/parseEnv";

const app = express();

export const PRISMA_SERVICE = new InjectionToken("PrismaService");

(async function start() {
  dotenv.config();

  const SERVER_PORT = parseEnv<number>("SERVER_PORT", process.env.SERVER_PORT);
  const SERVER_HOSTNAME = parseEnv<string>(
    "SERVER_HOSTNAME",
    process.env.SERVER_HOSTNAME
  );

  app.use(helmet());
  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  app.use(LoggerMiddleware);
  // app.use(errorHandlerMiddleware);

  Container.provide([
    {
      provide: ERROR_MIDDLEWARE,
      useClass: ErrorHandlerMiddleware,
    },
    {
      provide: PrismaService,
      useClass: PrismaService,
    },
  ]);

  await attachControllers(app, [
    InfoController,
    ClientController,
    OrderController,
  ]);

  app.listen(SERVER_PORT, SERVER_HOSTNAME, () => {
    logger({
      level: LOG_LEVEL.INFO,
      message: `Servidor rodando na porta ${SERVER_PORT}\n`,
    });
  });
})().catch(console.error);
