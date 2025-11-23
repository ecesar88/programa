import { InputValidationError } from '@pothos/plugin-validation'
import { builder } from '../../builder'
import { BusinessError, RecordNotFoundError } from '../_errors/errors'
import { create, queryAll } from './resolvers'
import { Car, CarCreateInput } from './types'
import { authenticateResolver } from '../../../../utils/authenticateResolver'

builder.queryField('getAllCars', (t) =>
  t.field({
    type: [Car],
    errors: {
      types: [RecordNotFoundError]
    },
    resolve: queryAll
    // resolve: authenticateResolver(queryAll)
  })
)

builder.mutationField('createCar', (t) =>
  t.field({
    type: Car,
    description: 'Create a new car',
    errors: {
      types: [InputValidationError, BusinessError]
    },
    args: {
      data: t.arg({
        type: CarCreateInput,
        required: true
      })
    },
    resolve: authenticateResolver(create)
  })
)
