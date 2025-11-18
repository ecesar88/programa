import dotenv from 'dotenv'
import { execSync } from 'node:child_process'
import path from 'node:path'

export default async function globalSetup() {
  const env_path = path.join(process.cwd(), '.env.test')
  dotenv.config({ path: env_path }) // Load the .env.test file

  // Run Prisma migrations programmatically
  execSync('pnpm prisma migrate deploy', { stdio: 'inherit' })
}
