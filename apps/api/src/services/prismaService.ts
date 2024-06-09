// import { Injectable } from '@decorators/di'
import { Injectable } from '@decorators/di'
import { PrismaClient } from '@prisma/client'

@Injectable({
  providedIn: 'root',
})
export class PrismaService extends PrismaClient {
  constructor() {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    super({ log: ['query', 'error', 'info', 'warn'] })
    // super.$connect()
  }
}
