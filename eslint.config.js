export default [
  {
    root: true,
    ignores: [
      'node_modules/*',
      '.pnp',
      '.pnp.js',
      'coverage/*',
      '.next/*',
      'out/*',
      'build/*',
      'dist/*',
      '.DS_Store',
      '*.pem',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.pnpm-debug.log*',
      '.env*.local',
      '.vercel',
      '.env',
    ],
    globals: {
      vitest: 'readonly',
    },
    extends: [
      'next/core-web-vitals',
      'eslint:recommended',
      'plugin:jest-dom/recommended',
      'prettier',
    ],
    plugins: ['testing-library', '@typescript-eslint', 'jest-dom', 'prettier'],
    rules: {
      'no-unused-vars': 'warn',
    },
    overrides: [
      {
        files: [
          'src/**/__tests__/**/*.[jt]s?(x)',
          'src/**/?(*.)+(spec|test).[jt]s?(x)',
        ],
        extends: ['plugin:testing-library/react'],
      },
    ],
    env: {
      jest: true,
    },
  },
]
