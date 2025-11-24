import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { env } from 'src/environment/env'
import { LOG_LEVEL, logger } from 'src/utils/logger'
import chalk from 'chalk'

export const sqliteAdapter = new PrismaBetterSqlite3({
  url: env.DATABASE_URL,
  fileMustExist: false,
  verbose: (msg: any) => {
    logger({
      level: LOG_LEVEL.INFO,
      // message: `${chalk.bgBlueBright('[PrismaBetterSqlite3] prisma:query')} -> ${chalk.blueBright(msg)}`
      message: `[PrismaBetterSqlite3] prisma:query -> ${msg}`
    })
    return msg
  }
})
