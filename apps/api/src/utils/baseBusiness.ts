/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
import { err, ok, type Result } from 'neverthrow'
import { BusinessError } from '../server/graphql/schema/_errors/errors'

export type Validation<T extends Record<never, never>> = {
  failMessage?: string
  validate: (entity: T) => Promise<boolean> | boolean
}

export type ValidationResult<T extends Record<never, never>> = Array<
  Omit<Validation<T>, 'validate'> & { success: boolean; name: string }
>

export type isValidReturnType = Promise<Result<true, BusinessError>>

export interface BaseBusinessService<T extends Record<never, never>> {
  validationsToBeRun: Array<Validation<T>>
  validate(entity: T): isValidReturnType
}

export abstract class BaseBusinessTemplate<T extends Record<never, never>>
  implements BaseBusinessService<T>
{
  abstract validationsToBeRun: Array<Validation<T>>

  async validate(entity: T): Promise<Result<true, BusinessError>> {
    const validationsRun: ValidationResult<T> = []

    for (const { validate, failMessage } of this.validationsToBeRun) {
      const result = await validate(entity)
      validationsRun.push({ name: validate.name, success: result, failMessage })
    }

    const somethingInvalid = validationsRun.some((vl) => !vl.success)

    if (somethingInvalid) {
      const failures = validationsRun.filter((vl) => !vl.success)
      return err(new BusinessError(false, failures as any))
    }

    return ok(true)
  }
}
