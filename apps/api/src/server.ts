import { InjectionToken } from "@decorators/di";
import { Container, attachControllers } from "@decorators/express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { ClientController } from "./controllers/client";
import { IndexController } from "./controllers/indexController";
import { OrderController } from "./controllers/order";
import { errorHandlerMiddleware, loggerMiddleware } from "./middleware";
import { PrismaService } from "./services/prismaService";
import { LOG_LEVEL, logger } from "./utils/logger";
import { parseEnv } from "./utils/parseEnv";
// import { Module } from "@decorators/server";

const app = express();

export const PRISMA_SERVICE = new InjectionToken("PrismaService");

(async function start() {
  dotenv.config();

  app.use(helmet());

  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  app.use(loggerMiddleware);

  app.get("/info", (_req, res) => {
    res.send("Version 0.0.1");
  });

  app.use(errorHandlerMiddleware);

  const SERVER_PORT = parseEnv<number>("SERVER_PORT", process.env.SERVER_PORT);
  const SERVER_HOSTNAME = parseEnv<string>(
    "SERVER_HOSTNAME",
    process.env.SERVER_HOSTNAME
  );

  Container.provide([
    {
      provide: PrismaService,
      useClass: PrismaService,
    },
  ]);

  await attachControllers(app, [
    IndexController,
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

// @Module()
// class AppModule {}
