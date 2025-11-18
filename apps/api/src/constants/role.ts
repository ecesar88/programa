import { Role as PrismaRoles } from '@prisma/client'

export const Role: Record<keyof typeof PrismaRoles, PrismaRoles> = {
  DEVELOPER: 'DEVELOPER',
  MANAGER: 'MANAGER',
  SUPER_ADMIN: 'SUPER_ADMIN',
  USER: 'USER'
} as const
