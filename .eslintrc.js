module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'prettier'], //prettier放最后解决冲突
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {}
}
