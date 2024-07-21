import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://0.0.0.0:3001/graphql',
  overwrite: true,
  documents: ['src/renderer/queries/graphql/documents/**/*.ts?(x)'],
  generates: {
    './src/renderer/queries/graphql/codegen/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config
