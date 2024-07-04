import { builder } from './builder'

import './schema/errors/schemas'
import './schema/errors/errors'

import './schema/client/operations'
import './schema/client/types'

export const schema = builder.toSchema()
