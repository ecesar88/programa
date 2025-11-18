import { builder } from '../../builder'

type HealthCheck = {
  status: string
}

const HealthCheckRef = builder.objectRef<HealthCheck>('HealthCheck')

export const HealthCheck = HealthCheckRef.implement({
  description: 'API HealthCheck',
  fields: (t) => ({
    status: t.exposeString('status')
  })
})

builder.queryField('healthCheck', (t) =>
  t.field({
    type: HealthCheck,
    resolve: () => ({
      status: 'ok'
    })
  })
)
