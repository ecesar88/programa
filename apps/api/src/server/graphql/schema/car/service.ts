import type { Prisma } from '@prisma/client'
import { prisma } from '../../../services/prismaService'
import { BaseBusinessTemplate, type Validation } from '../../../../utils/baseBusiness'

type Input = Prisma.CarCreateInput

export class CarBusinessService extends BaseBusinessTemplate<Input> {
  private validateLicensePlate(car: Input) {
    console.log('Validating license plate')

    const { licensePlate } = car
    const LICENSE_PLATE_REGEX = new RegExp(/([A-Z]{3})-([0-9]{4})/i)

    return licensePlate.match(LICENSE_PLATE_REGEX) !== null
  }

  private async validateVehicleDoesNotAlreadyExist(car: Input) {
    const carWithSameLicensePlateExistsInDb = await prisma.car.findFirst({
      where: {
        licensePlate: car.licensePlate
      }
    })

    if (carWithSameLicensePlateExistsInDb) return false
    return true
  }

  validationsToBeRun: Validation<Prisma.CarCreateInput>[] = [
    {
      validate: this.validateLicensePlate,
      failMessage: 'License plate is not valid'
    },
    {
      validate: this.validateVehicleDoesNotAlreadyExist,
      failMessage: 'Vehicle already exists in the database!'
    }
  ]
}

export const carBusinessService = new CarBusinessService()
