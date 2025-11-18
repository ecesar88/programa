import type { Prisma } from '@prisma/client'
import { builder } from '../../builder'
import { CreateCarValidationSchema } from './schemas'

/* --- Interface Definitions --- */

export type TypeCar = Prisma.CarGetPayload<Record<never, never>>

/* --- Object Definitions --- */

const CarRef = builder.objectRef<TypeCar>('Car')

export const Car = CarRef.implement({
  description: 'A simple car',
  fields: (t) => ({
    id: t.exposeString('id', { description: 'The id of the car' }),
    make: t.exposeString('make'),
    model: t.exposeString('model'),
    year: t.exposeInt('year'),
    licensePlate: t.exposeString('licensePlate'),
    color: t.exposeString('color')
  })
})

/* --- Inputs Definitions --- */

export const CarCreateInput = builder
  .inputType('CarCreateInput', {
    fields: (t) => ({
      make: t.string({ description: 'The make of the car' }),
      model: t.string(),
      year: t.int(),
      licensePlate: t.string(),
      color: t.string()
    })
  })
  .validate(CreateCarValidationSchema)
