import { Request, Response } from 'express'
import { HttpStatusCode } from '../../constants'

export const InfoController = {
  get: async (_req: Request, res: Response) => {
    return res.json({
      version: '0.1',
      status: HttpStatusCode.OK
    })
  }
}
