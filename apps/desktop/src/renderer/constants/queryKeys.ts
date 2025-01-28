type MutationQueryKey = `${string}Mutation`
type QueryQueryKey = `${string}Query`

interface QueryKeysBase {
  getAll?: QueryQueryKey[]
  delete?: MutationQueryKey[]
}

interface CreateAndUpdateQK extends QueryKeysBase {
  createOrUpdate?: never
  create: MutationQueryKey[]
  update: MutationQueryKey[]
}

interface CreateOrUpdateQK extends QueryKeysBase {
  createOrUpdate?: MutationQueryKey[]
  create?: never
  update?: never
}

type QueryKeys = {
  [queryKeyName: string]: CreateOrUpdateQK | CreateAndUpdateQK
}

export const queryKeys = {
  menuEntryLabels: {
    getAll: ['getAllMenuEntryLabelsQuery'],
    createOrUpdate: ['createOrUpdateMenuEntryLabelMutation'],
    delete: ['deleteMenuEntryLabelMutation']
  },
  clients: {
    getAll: ['getAllClientsQuery'],
    create: ['createClientMutation'],
    update: ['updateClientMutation'],
    delete: ['deleteClientMutation']
  },
  menu: {
    getAll: ['getAllMenuEntriesQuery'],
    create: ['createMenuEntryMutation'],
    update: ['updateMenuEntryMutation'],
    delete: ['deleteMenuEntryMutation']
  }
} as const satisfies QueryKeys
