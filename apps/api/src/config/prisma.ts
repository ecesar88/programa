import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { env } from 'src/environment/env'
import { LOG_LEVEL, logger } from 'src/utils/logger'
import chalk from 'chalk'

export const sqliteAdapter = new PrismaBetterSqlite3({
  url: env.DATABASE_URL,
  fileMustExist: false,
  verbose: (queryMsg: any) => {
    const message = `${chalk.bgBlue.white('[PrismaBetterSqlite3]')} ${chalk.blue('prisma:query')}\n${queryMsg}`

    logger({
      level: LOG_LEVEL.INFO,
      message
    })

    return queryMsg
  }
})
