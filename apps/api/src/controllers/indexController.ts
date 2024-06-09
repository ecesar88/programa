import { Container, Controller, Get, Params } from '@decorators/express'
import { PrismaClient } from '@prisma/client'
import 'reflect-metadata'
import { PRISMA_SERVICE } from '../server'

@Controller('/')
export class IndexController {
  // constructor(@Optional() @Inject(PrismaService) private prisma: PrismaClient) {}
  constructor(private prisma: PrismaClient) {}

  // constructor() {
  //   Container.get(PRISMA_SERVICE).then((client) => {
  //     this.prisma = client as PrismaClient
  //   })
  // }

  // private prisma!: PrismaClient

  @Get('/test')
  async index(@Params() user: { name: string }) {
    console.log(user)
    console.log('this.prisma >> ', this.prisma)

    try {
      console.log('TRY >>>>>>>> ', this.prisma)
      const clients = await this.prisma.client.findMany({})
      // const clients = await injectedPrisma.client.findMany({})
      // console.log('clients >> \n\n', clients)
      return clients
    } catch (error) {
      console.log('error >>> \n', error)
      return
    }
  }
}
