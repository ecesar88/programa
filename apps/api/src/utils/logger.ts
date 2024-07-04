import nodeColorLog from 'node-color-log'

export enum LOG_TYPE {
  ERROR,
  WARN,
  INFO
}

export const logger = ({
  level,
  message,
  object
}: {
  level: LOG_TYPE
  message: string
  object?: string
}) => {
  const dateString = `[${new Date().toISOString()}]`
  const separator = ' :: '
  const logPrefix = '=> '

  const errorLogger = (message: string) =>
    nodeColorLog
      .color('yellow')
      .append(dateString)
      .reset()
      .append(separator)
      .color('red')
      .append(`[ERROR] ${logPrefix}`)
      .reset()
      .log(message)

  const warnLogger = (message: string) =>
    nodeColorLog
      .color('yellow')
      .append(dateString)
      .reset()
      .append(separator)
      .color('yellow')
      .append(`[WARN] ${logPrefix}`)
      .reset()
      .log(message)

  const infoLogger = (message: string) =>
    nodeColorLog
      .color('yellow')
      .append(dateString)
      .reset()
      .append(separator)
      .color('cyan')
      .append(`[INFO] ${logPrefix}`)
      .reset()
      .log(message)

  switch (level) {
    case LOG_TYPE.ERROR: {
      errorLogger(message)

      if (object) {
        nodeColorLog.log(`Error: ${object}`)
      }

      break
    }

    case LOG_TYPE.WARN: {
      warnLogger(message)

      if (object) {
        nodeColorLog.reset().log(`${object}`)
      }

      break
    }

    case LOG_TYPE.INFO: {
      infoLogger(message)

      if (object) {
        nodeColorLog.reset().log(`${object}`)
      }

      break
    }
  }
}
