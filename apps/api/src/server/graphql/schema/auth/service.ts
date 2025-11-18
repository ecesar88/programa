import type { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../../../../environment/env'
import { prisma } from '../../../services/prismaService'
import { RecordNotFoundError } from '../_errors/errors'
import type { UserEmailInput, UserIdAndPasswordInput } from './types'

const REMOVE_BEARER = 7 // Length of "Bearer "

async function authenticateUser(authHeader: string | null): Promise<User | null> {
  if (!authHeader || !authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(REMOVE_BEARER) // Remove "Bearer " prefix

  const payload = jwt.verify(token, Buffer.from(env.AUTH_PUBLIC_KEY, 'base64'), {
    algorithms: ['RS256']
  }) as string | jwt.JwtPayload

  if (typeof payload === 'string' || !payload.userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId }
  })

  return user
}

async function validatePassword(data: Required<(typeof UserIdAndPasswordInput)['$inferInput']>) {
  const user = await prisma.user.findFirst({
    where: {
      id: data.id as string
    }
  })

  if (!user) throw new RecordNotFoundError('user')

  return bcrypt.compare(data.password!, user.password)
}

async function me(data: Required<(typeof UserEmailInput)['$inferInput']>) {
  return prisma.user.findFirst({
    where: {
      email: data.email as string
    }
  })
}

export { authenticateUser, me, validatePassword }
