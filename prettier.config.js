import prettierConfig from '@adonisjs/prettier-config' assert { type: 'json' }

export default {
  ...prettierConfig,
  plugins: [
    ...prettierConfig.plugins,
    'prettier-plugin-organize-attributes',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss',
  ],
  attributeGroups: [
    '^((v-bind)?:?|v-)is$',
    '^v-for$',
    '^v-(if|else-if|else|show|cloak)$',
    '^v-(once|pre|memo)$',
    '^(v-bind)?:?id$',
    '^(v-bind)?:?key$',
    '^(v-bind)?:?ref$',
    '^(v-)?slot$',
    '^#',
    '^v-model$',
    '^v-(?!bind(:|$)|on(:|$)|html$|text$)',
    '^class$',
    '^(v-bind)?:class$',
    '^((v-bind)?:)?(?!data-|v-|:|@|#)',
    '$DEFAULT',
    '^((v-bind)?:)?data-',
    '^v-bind$',
    '^v-on:',
    '^@',
    '^v-html$',
    '^v-text$',
  ],
}