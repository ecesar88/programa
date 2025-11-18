export interface GenericGQLResponse<T extends Record<never, never>> {
  data: T
}
