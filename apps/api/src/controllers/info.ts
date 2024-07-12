import { Controller, Get } from '@decorators/express'
import { ClassResponseInterceptor } from '../interceptors'
import { InterceptResponse } from '../utils/interceptResponse'

@ClassResponseInterceptor(InterceptResponse)
@Controller('/healthcheck')
export class InfoController {
  @Get('/')
  get() {
    return {
      version: '0.1',
      status: 'OK'
    }
  }
}
