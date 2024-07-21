import { LOG_TYPE, logger } from './logger'

export const parseEnv = <T extends string | number>(name: string): T => {
  if (!process.env[name]) {
    logger({
      level: LOG_TYPE.ERROR,
      message: `env ${name} is not defined or does not exist`
    })

    process.exit(1)
  }

  return process.env[name] as T
}
