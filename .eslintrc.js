module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    extraFileExtensions: ['.html', '.sass'],
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: [
        '@typescript-eslint',
        'unused-imports',
        'simple-import-sort',
        'eslint-plugin-html',
      ],
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        extraFileExtensions: ['.html', '.sass'],
      },
      rules: {
        'prettier/prettier': [
          'error',
          { singleQuote: true, endOfLine: 'auto' },
        ],
        'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
        'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
        '@typescript-eslint/no-unused-vars': 'off',
        'no-underscore-dangle': 'off',
        'no-console': 'off',
        'new-cap': ['off', { newIsCap: true }],
        'no-plusplus': 'off',
        '@typescript-eslint/naming-convention': [
          'warn',
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
          },
        ],
        '@typescript-eslint/no-use-before-define': 'off',
        indent: 'off',
        '@typescript-eslint/indent': 'off',

        'import/no-cycle': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
        'no-restricted-exports': [
          'off',
          { restrictedNamedExports: ['default'] },
        ],
        'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
        'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`,
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
