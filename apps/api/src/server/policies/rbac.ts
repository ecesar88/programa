import { AbilityBuilder, Ability } from '@casl/ability'
import { Role } from '@prisma/client'

// Type that defines the structure of the Ability for your app
export type AppAbility = Ability<[string, string]> // [action, subject]

/**
 * // Impl pending //
 * Define abilities for each role.
 */
export function defineAbilitiesFor(role: Role): AppAbility {
  const { can, cannot, build } = new AbilityBuilder()

  switch (role) {
    case Role.DEVELOPER:
      // Developers can perform any action on any resource for development and testing purposes
      can('manage', 'all') // 'manage' means all actions: read, create, update, delete, etc.
      break

    case Role.SUPER_ADMIN:
      // Super Admin has full access to everything except developer-related operations
      can('manage', 'all') // Full access to all resources
      cannot('manage', 'DeveloperWork') // Can't manage Developer-related work
      break

    case Role.MANAGER:
      // Managers can manage only their own company's data, but not other companies'
      can('read', 'Company') // Managers can read their own company data
      can('update', 'Company') // Managers can update their own company data

      // Additional restrictions: can't access other companies' data
      cannot('read', 'Company', {
        network: { not: { id: 'currentCompanyId' } }
      }) // Assuming 'currentCompanyId' is dynamically available
      cannot('update', 'Company', {
        network: { not: { id: 'currentCompanyId' } }
      }) // Same for update
      break

    case Role.USER:
      // Regular users can only read their own data
      can('read', 'User') // Users can read their own data
      break

    default:
      throw new Error(`Unknown role: ${role}`)
  }

  return build() // Build and return the abilities object
}
