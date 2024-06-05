import nodeColorLog from 'node-color-log'

export enum LOG_LEVEL {
  ERROR,
  WARN,
  INFO
}

export const logger = ({
  level,
  message,
  object
}: {
  level: LOG_LEVEL
  message: string
  object?: string
}) => {
  const errorLog = (message: string) => nodeColorLog.error(message)
  const warnLog = (message: string) => nodeColorLog.warn(message)
  const infoLog = (message: string) => nodeColorLog.info(message)

  const logPrefix = ' => '

  switch (level) {
    case LOG_LEVEL.ERROR: {
      errorLog(`${logPrefix} ${message}`)

      if (object) {
        nodeColorLog.log(`Error: ${object}`)
      }

      break
    }

    case LOG_LEVEL.WARN: {
      warnLog(`${logPrefix} ${message}`)
      if (object) {
        nodeColorLog.log(`${object}`)
      }

      break
    }

    case LOG_LEVEL.INFO: {
      infoLog(`${logPrefix} ${message}`)

      if (object) {
        nodeColorLog.log(`${object}`)
      }

      break
    }
  }
}
