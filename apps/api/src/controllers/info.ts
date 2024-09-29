import { Controller, Get } from '@decorators/express'
import { HttpStatusCode } from '@repo/shared/constants'
import { ROUTES } from '../routes'

// @ClassResponseInterceptor(InterceptResponse)
@Controller(ROUTES.INFO_ROOT, { strict: true })
export class InfoController {
  // @Get(`${ROUTES.INFO_ROOT}${ROUTES.INFO_HEALTHCHECK}`)
  @Get(ROUTES.INFO_HEALTHCHECK)
  get() {
    return {
      version: '0.1',
      status: HttpStatusCode.OK
    }
  }
}
