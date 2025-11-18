import { Role } from '../../../../constants/role'
import { authenticateResolver } from '../../../../utils/authenticateResolver'
import { builder } from '../../builder'
import { authRefresh, login, meAuth } from './resolvers'
import { LoginSchema } from './schema'
import { Auth, AuthCreateInput, AuthRefreshTokenInput, MeAuth } from './types'

builder.mutationField('login', (t) =>
  t.field({
    type: Auth,
    args: {
      data: t
        .arg({
          type: AuthCreateInput,
          required: true
        })
        .validate(LoginSchema)
    },
    resolve: login
  })
)

builder.mutationField('refreshToken', (t) =>
  t.field({
    type: Auth,
    args: {
      data: t.arg({
        type: AuthRefreshTokenInput,
        required: true
      })
    },
    resolve: authenticateResolver(authRefresh)
  })
)

builder.queryField('me', (t) =>
  t.field({
    type: MeAuth,
    resolve: authenticateResolver(meAuth, [Role.USER])
  })
)
