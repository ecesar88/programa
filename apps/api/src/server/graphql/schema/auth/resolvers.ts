import jwt from 'jsonwebtoken'
import { env } from '../../../../environment/env'
import { logError, logInfo, OPERATION_TYPE } from '../../../../utils/logger'
import type { Resolver } from 'src/utils/types/shared'
import { AuthError } from '../_errors/errors'
import { me, validatePassword } from './service'
import type { AuthCreateInput, AuthRefreshTokenInput } from './types'

const table = 'Auth'

export const login: Resolver<{
  data: (typeof AuthCreateInput)['$inferInput']
}> = async (_parent, args, _ctx, _info) => {
  const { data } = args

  logInfo({ operation: OPERATION_TYPE.LOGIN, args })

  const user = await me({ email: data.email! })
  if (!user) throw new AuthError()

  const isValid = await validatePassword({
    id: user.id,
    password: data.password!
  })

  if (!isValid) throw new AuthError()

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    Buffer.from(env.SECRET_KEY, 'base64'),
    {
      algorithm: 'HS256',
      expiresIn: '3h'
    }
  )

  const refreshToken = jwt.sign(
    { userId: user.id, email: user.email },
    Buffer.from(env.SECRET_KEY, 'base64'),
    {
      algorithm: 'HS256',
      expiresIn: '3d'
    }
  )

  return { token, refreshToken }
}

export const authRefresh: Resolver<{
  data: (typeof AuthRefreshTokenInput)['$inferInput']
}> = (_parent, args, _ctx, _info) => {
  const { data } = args

  logInfo({ operation: OPERATION_TYPE.CREATE, table })

  const payload = jwt.verify(data.refreshToken!, Buffer.from(env.SECRET_KEY, 'base64'), {
    algorithms: ['RS256']
  }) as string | jwt.JwtPayload

  const isTokenInvalid = typeof payload === 'string' || !payload.userId
  if (isTokenInvalid) {
    logError({
      operation: OPERATION_TYPE.CREATE,
      table,
      error: 'Invalid refresh token'
    })

    throw new Error('Invalid refresh token')
  }

  const token = jwt.sign(
    { userId: payload.userId, email: payload.email },
    Buffer.from(env.SECRET_KEY, 'base64'),
    {
      algorithm: 'RS256',
      expiresIn: '1h'
    }
  )

  return {
    token,
    refreshToken: data.refreshToken
  }
}

export const meAuth: Resolver = async (_parent, _args, ctx, _info) => {
  logInfo({ operation: OPERATION_TYPE.READ, table })

  if (!ctx.user) throw Error('User not found')

  const user = await me({ email: ctx.user?.email })

  if (!user) {
    logError({
      operation: OPERATION_TYPE.READ,
      table,
      error: 'User not found'
    })

    throw new Error('User not found')
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}
