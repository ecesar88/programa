import { Controller, Get } from '@decorators/express'
import { HttpStatusCode } from '@repo/shared/constants'

// @ClassResponseInterceptor(InterceptResponse)
@Controller('/info')
export class InfoController {
  @Get('/healthcheck')
  get() {
    return {
      version: '0.1',
      status: HttpStatusCode.OK
    }
  }
}
