/**
 * @type {import('prettier').Config}
 */
module.exports = {
  printWidth: 100,
  tabWidth: 4,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  plugins: [
    '../../packages/config/node_modules/prettier-plugin-tailwindcss/dist/index.mjs'
  ]
}
