import { defineConfig } from 'orval'

export default defineConfig({
  petstore: {
    output: {
      mode: 'tags-split',
      target: './src/generated/endpoints.ts',
      schemas: './src/generated/models',
      client: 'react-query',
      clean: true,
      override: {
        mutator: {
          path: './src/http.ts',
          name: 'http'
        }
      }
    },
    input: {
      target: 'http://localhost:4000/api/docs-json'
    }
  }
})
