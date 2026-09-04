import expoConfig from 'eslint-config-expo/flat.js'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import { configs as tsConfigs } from 'typescript-eslint'

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/.expo/**',
      '**/dist/**',
      '**/.next/**',
      '**/android/**',
      '**/ios/**',
      '**/expo-env.d.ts',
      'eslint.config.mjs'
    ]
  },

  expoConfig,
  { settings: { react: { version: '19.2' } } },
  ...tsConfigs.recommended,
  reactHooks.configs.flat.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    }
  }
])
