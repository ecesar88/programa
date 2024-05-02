import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  const clients = await prisma.client.createMany({
    data: Array.from({ length: 50 }, (_v, k) => k).map(() => ({
      name: faker.person.fullName(),
      phone: faker.helpers.fromRegExp('[0-9]{11}')
    }))
  })
}

main()
