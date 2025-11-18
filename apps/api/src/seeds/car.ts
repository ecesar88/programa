import type { PrismaClient } from '@prisma/client'
import { LOG_LEVEL, logger } from '../utils/logger'

export const createCars = async (prisma: PrismaClient) => {
  logger({
    level: LOG_LEVEL.INFO,
    message: 'Seeding car table...'
  })

  const existingCars = await prisma.car.findMany()

  if (existingCars) {
    logger({
      level: LOG_LEVEL.INFO,
      message: 'Car record already exists, skipping...'
    })

    return existingCars
  }

  return prisma.car.create({
    data: {
      make: 'Nissan',
      model: 'Frontier Pro 4X',
      color: 'black',
      licensePlate: 'ABC-1234',
      year: 2025
    }
  })
}
