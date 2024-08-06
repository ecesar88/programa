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

/*
 * Get text color based on relative luminance of the background
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export const getContrastingTextColor = (color: string) => {
  // Convert hex color to RGB
  let r: number, g: number, b: number
  if (color.length === 4) {
    r = parseInt(color[1] + color[1], 16)
    g = parseInt(color[2] + color[2], 16)
    b = parseInt(color[3] + color[3], 16)
  } else {
    r = parseInt(color[1] + color[2], 16)
    g = parseInt(color[3] + color[4], 16)
    b = parseInt(color[5] + color[6], 16)
  }

  // Calculate relative luminance
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

  // Determine text color based on luminance
  return luminance > 0.5 ? 'black' : 'white'
}
