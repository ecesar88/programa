import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://0.0.0.0:3001/graphql',
  overwrite: true,
  documents: './apps/desktop/src/renderer/queries/graphql/documents/*.gql',
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './apps/desktop/src/renderer/queries/graphql/graphql-codegen.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        fetcher: 'fetch'
      }
    }
  }
}

export default config
