import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...args: Parameters<typeof clsx>) => twMerge(clsx(args))

// get types from import.meta.env ??
const parseEnv = (name: string) => {
  const envValue = import.meta.env[name]

  if (!envValue) {
    throw new Error(`Env ${name} is undefined`)
  }

  return envValue
}

export { cn, parseEnv }
