// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-config-prettier'

export default withNuxt(prettier, {
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': ['error', { html: { void: 'always' } }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
})
