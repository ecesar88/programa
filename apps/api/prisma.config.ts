import path from 'node:path'
import { defineConfig } from 'prisma/config'

const rootDatabasePath = ['src', 'prisma']
const MIGRATIONS_PATH = [...rootDatabasePath, 'migrations']
const SCHEMA_PATH = [...rootDatabasePath, 'schema.prisma']

import 'dotenv/config'

export default defineConfig({
  schema: path.join(...SCHEMA_PATH),
  migrations: {
    path: path.join(...MIGRATIONS_PATH),
    seed: 'pnpm tsx src/seeds/index.ts'
  }
})
