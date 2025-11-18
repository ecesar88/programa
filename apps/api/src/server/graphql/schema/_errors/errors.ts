/**
 * RecordNotFoundError
 */

export class RecordNotFoundError extends Error {
  constructor(recordName?: string) {
    super(`${recordName} was not found or does not exist.`)
    this.name = '[RecordNotFoundError]'
  }
}

/**
 * AuthError
 */

export class AuthError extends Error {
  constructor(message?: string) {
    super(message ? message : `Unauthorized`)
    this.name = '[AuthError]'
  }
}

/**
 * BusinessError
 */

type isValid = boolean
type BusinessErrors = { name: string; failMessage: string }[]

export class BusinessError extends Error {
  constructor(isValid: isValid, errors: BusinessErrors) {
    super('[BusinessError]')

    this.name = '[BusinessError]'
    this.isValid = isValid
    this.errors = errors
  }

  isValid: isValid
  errors: BusinessErrors
}

/**
 * Error Codes
 */

export enum ERROR_CODES {
  GENERIC_ERROR = 'INTERNAL_SERVER_ERROR',
  AUTH = 'UNAUTHORIZED',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND',
  PRISMA_CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION'
}
