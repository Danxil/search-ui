/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  rules: {
    'quotes': [1, 'single'],
    'indent': [1, 2],
    'import/order': [1, {
      'newlines-between': 'always',
    }]
  }
};
