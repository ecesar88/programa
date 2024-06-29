import { Controller, Get } from '@decorators/express'
import { ClassResponseInterceptor } from '../interceptors'
import { InterceptResponse } from '../utils/responseInterceptor'

@ClassResponseInterceptor(InterceptResponse)
@Controller('/info')
export class InfoController {
  @Get('/')
  get() {
    return {
      version: '0.1'
    }
  }

  @Get('/abc')
  get2() {
    return {
      version: '0.2'
    }
  }
}
