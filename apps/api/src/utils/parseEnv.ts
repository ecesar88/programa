import { LOG_LEVEL, logger } from './logger'

export const parseEnv = <T extends string | number>(name: string, env?: string) => {
  if (!env) {
    logger({
      level: LOG_LEVEL.WARN,
      message: `env ${name} is not defined or does not exist`
    })

    return
  }

  return env as T
}
