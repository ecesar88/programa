import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://0.0.0.0:3001/graphql',
  overwrite: true,
  documents: ['**/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    // './src/renderer/queries/graphql/graphql-codegen.ts': {
    './apps/desktop/src/renderer/queries/graphql/graphql-codegen.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        useTypeImports: true
      }
    }
  }
}

export default config
