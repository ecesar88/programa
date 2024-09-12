import { Controller, Get } from '@decorators/express'
import { HttpStatusCode } from '@repo/shared/constants'
import { ROUTES } from '../routes'

// @ClassResponseInterceptor(InterceptResponse)
@Controller(ROUTES.INFO)
export class InfoController {
  @Get(ROUTES.INFO_HEALTHCHECK)
  get() {
    return {
      version: '0.1',
      status: HttpStatusCode.OK
    }
  }
}
