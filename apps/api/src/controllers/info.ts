import { Controller, Get, Res } from '@decorators/express'
import { HttpStatusCode } from '@repo/shared/constants'
import type { Response } from 'express'
import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'path'

// @ClassResponseInterceptor(InterceptResponse)
@Controller('/info')
export class InfoController {
  @Get('/healthcheck')
  get() {
    return {
      version: '0.1',
      status: 'OK'
    }
  }

  @Get('/docs')
  async docs(@Res() res: Response) {
    const filePath = path.resolve(process.cwd(), 'public', 'index.html')

    if (!existsSync(filePath)) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: 'Documentation was not found or not generated .' })
    }

    const stat = statSync(filePath)

    res.writeHead(HttpStatusCode.OK, {
      'Content-Type': 'text/html',
      'Content-Length': stat.size
    })

    const file = readFileSync(filePath)
    return res.end(file)
  }
}
