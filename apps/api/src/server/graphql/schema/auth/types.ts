import z from 'zod'
import { builder } from '../../builder'

/* --- Interface Definitions --- */

export type TypeAuth = {
  token: string
  refreshToken: string
}

export type TypeMeAuth = {
  id: string
  name: string
  email: string
}

/* --- Object Definitions --- */

const AuthRef = builder.objectRef<TypeAuth>('Auth')
const MeAuthRef = builder.objectRef<TypeMeAuth>('MeAuth')

export const Auth = AuthRef.implement({
  description: 'Tokens generated on authentication',
  fields: (t) => ({
    token: t.exposeString('token'),
    refreshToken: t.exposeString('refreshToken')
  })
})

export const MeAuth = MeAuthRef.implement({
  description: 'Authenticated user information',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    email: t.exposeString('email')
  })
})

/* --- Inputs Definitions --- */

export const AuthCreateInput = builder.inputType('AuthCreateInput', {
  fields: (t) => ({
    email: t.string(),
    password: t.string()
  })
})

export const AuthRefreshTokenInput = builder.inputType('AuthRefreshTokenInput', {
  fields: (t) => ({
    refreshToken: t.string()
  })
})

export const UserIdAndPasswordInput = builder.inputType('UserIdAndPasswordInput', {
  fields: (t) => ({
    id: t.string(),
    password: t.string()
  })
})

export const UserEmailInput = builder.inputType('UserEmailInput', {
  fields: (t) => ({
    email: t.string()
  })
})
