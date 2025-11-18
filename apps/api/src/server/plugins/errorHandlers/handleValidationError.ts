import { InputValidationError } from '@pothos/plugin-validation'
import type { Response } from 'express'
import type { GraphQLError } from 'graphql'
import { colorizeAsJSON, LOG_LEVEL, logger } from '../../../utils/logger'
import { BaseErrorHandler } from './_baseErrorHandler'

export class InputValidationErrorHandler extends BaseErrorHandler<InputValidationError> {
  handle(error: GraphQLError, _res?: Response) {
    const isValidationError = error instanceof InputValidationError

    // Log validation errors
    if (isValidationError) {
      logger({
        level: LOG_LEVEL.ERROR,
        message: '[InputValidationError] [PothosValidationError]',
        object: colorizeAsJSON(JSON.stringify(error?.issues ?? []))
      })

      return true
    }

    return false
  }
}
