import type { usePayloadFormatter } from 'graphql-yoga'

export const payloadFormatter: Parameters<typeof usePayloadFormatter>['0'] = (res) => res
