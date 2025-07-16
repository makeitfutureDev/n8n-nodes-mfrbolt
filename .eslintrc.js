module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'n8n-nodes-base'],
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:n8n-nodes-base/nodes',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'n8n-nodes-base/node-param-default-missing': 'error',
    'n8n-nodes-base/node-param-placeholder-miscased-id': 'error',
    'n8n-nodes-base/node-param-option-name-wrong-for-get-all': 'error',
    'n8n-nodes-base/node-param-resource-without-no-data-expression': 'error',
    'n8n-nodes-base/node-param-operation-without-no-data-expression': 'error',
  },
};