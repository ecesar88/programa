import { Controller, Get, Params } from "@decorators/express";
import { PrismaService } from "../services/prismaService";

@Controller("/")
export class IndexController {
  public constructor(private prisma: PrismaService) {}

  @Get("/test")
  async index(@Params() user: { name: string }) {
    try {
      const clients = await this.prisma.client.findMany({});
      return clients;
    } catch (error) {
      console.log("error >>> \n", error);
      return;
    }
  }
}
