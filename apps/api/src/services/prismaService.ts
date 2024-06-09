import { Injectable } from "@decorators/di";
import { PrismaClient } from "@prisma/client";
import { LOG_LEVEL, logger } from "../utils/logger";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ log: ["query", "error", "info", "warn"] });
    logger({ level: LOG_LEVEL.INFO, message: "Prisma: Connected" });
  }
}
