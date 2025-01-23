type ErrorDetails = { name: 'ZodValidationError'; details: Record<string, unknown>[] }
type ZodError<T> = {
  __typename: 'ZodError'
  message: T
}

type BaseError = {
  __typename: 'BaseError'
  message: string
}

type RecordNotFoundError = {
  __typename: 'RecordNotFoundError'
  message: string
}

type Errors = BaseError | RecordNotFoundError

export const isBaseError = (res: { message?: string }): res is BaseError => {
  if (!res.message) return false

  try {
    JSON.parse(res?.message)
    return false
  } catch {
    return true
  }
}

export const isRecordNotFoundError = (res: Record<string, unknown>): res is RecordNotFoundError =>
  res.__typename === 'RecordNotFoundError'

export const isZodError = (res: { message?: string }): res is ZodError<string> => {
  if (!res.message) return false

  try {
    JSON.parse(res?.message)
  } catch {
    return false
  }

  return true
}

const checkResponseForError = <T extends Record<never, never>>(
  response: T
): [boolean, Record<never, never> | null] => {
  let errorBody: Errors | ZodError<ErrorDetails> | null = null
  let isThereAnError = true

  if (isBaseError(response)) {
    errorBody = response as BaseError
  } else if (isRecordNotFoundError(response)) {
    errorBody = response as RecordNotFoundError
  } else if (isZodError(response)) {
    try {
      errorBody = {
        __typename: 'ZodError',
        message: JSON.parse(response.message)
      }
    } catch (error) {
      console.error('Error parsing response error body: ', error)
    }
  } else {
    isThereAnError = false
  }

  return [isThereAnError, errorBody]
}

export const handleResponseStatus = <T extends object>({
  response,
  Ok,
  Err
}: {
  response: T
  Ok: (data: T) => void
  Err: (errorObject: Errors | ZodError<ErrorDetails>) => void
}) => {
  const [hasError, errObject] = checkResponseForError<T>(response)

  if (hasError) Err(errObject as Errors)
  else Ok(response)
}
