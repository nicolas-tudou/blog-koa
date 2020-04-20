module.exports = {
  root: true,
  extends: ['stylelint-config-standard'],
  rules: {
    'rule-empty-line-before': null,
    'number-leading-zero': 'never',
    'unit-case': null,
    'function-comma-space-after': 'never',
    'function-url-quotes': 'never',
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': [true, {
      'ignoreAtRules': ['function', 'if', 'each', 'include', 'mixin', 'extend', 'for', 'return']
    }],
    'order/properties-order': require('fs-css-order').propertiesOrder
  }
}
