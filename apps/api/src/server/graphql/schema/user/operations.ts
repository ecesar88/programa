import { authenticateResolver } from '../../../../utils/authenticateResolver'
import z from 'zod'
import { builder } from '../../builder'
import { CreateUserValidationSchema, UpdateUserValidationSchema } from './schemas'
import { User, UserCreateInput, UserUpdateInput } from './types'
import { InputValidationError } from '@pothos/plugin-validation'
import { getAll, getById, create, remove, update } from './resolvers'
import { Role } from '../../../../constants/role'

builder.mutationField('createUser', (t) =>
  t.field({
    description: 'Creates a new user',
    type: User,
    errors: {
      types: [InputValidationError]
    },
    args: {
      data: t
        .arg({
          type: UserCreateInput,
          required: true
        })
        .validate(CreateUserValidationSchema)
    },
    resolve: create
  })
)

builder.queryField('users', (t) =>
  t.field({
    description: 'List all users',
    type: [User],
    resolve: authenticateResolver(getAll, [Role.USER])
  })
)

builder.queryField('user', (t) =>
  t.field({
    type: User,
    description: 'Get a user by id',
    args: {
      id: t.arg.string({
        validate: z.uuid(),
        required: true
      })
    },
    resolve: authenticateResolver(getById)
  })
)

builder.mutationField('updateUser', (t) =>
  t.field({
    type: User,
    description: 'Update a specific user by id.',
    args: {
      input: t
        .arg({
          type: UserUpdateInput,
          required: true
        })
        .validate(UpdateUserValidationSchema)
    },
    resolve: authenticateResolver(update)
  })
)

builder.mutationField('deleteUser', (t) =>
  t.field({
    type: User,
    description: 'Delete a user',
    args: {
      id: t.arg.string({
        validate: z.uuid(),
        required: true
      })
    },
    resolve: authenticateResolver(remove)
  })
)
