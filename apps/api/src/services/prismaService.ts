import { Injectable } from "@decorators/di";
import { PrismaClient } from "@prisma/client";
import { LOG_TYPE, logger } from "../utils/logger";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({ log: ["query", "error", "info", "warn"] });
    logger({ level: LOG_TYPE.INFO, message: "Prisma: Connected" });
  }
}
