module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false
  },
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    '@typescript-eslint/no-unused-vars': warn,
    '@typescript-eslint/no-inferrable-types': warn
  }
}
