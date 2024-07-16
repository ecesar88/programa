import { Controller, Get } from '@decorators/express'
import { HttpStatusCode } from '@repo/shared/constants'
import HTTP_ROUTES from '../routes'

// @ClassResponseInterceptor(InterceptResponse)
@Controller(HTTP_ROUTES.info.routes.root)
export class InfoController {
  @Get(HTTP_ROUTES.info.routes.healthcheck)
  get() {
    return {
      version: '0.1',
      status: HttpStatusCode.OK
    }
  }
}
