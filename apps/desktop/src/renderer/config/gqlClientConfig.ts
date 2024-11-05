import { GraphQLClient } from 'graphql-request'

export const gqlClient = new GraphQLClient(import.meta.env.VITE_API_ENDPOINT)
