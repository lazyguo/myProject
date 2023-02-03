module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "prettier/prettier": "off",
    "no-unused-vars":"off",
    "vue/no-unused-vars":"off",
    "@typescript-eslint/no-unused-vars": "off",
    '@typescript-eslint/no-explicit-any': "off",
    "prefer-const":'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-this-alias':'off',
    "@typescript-eslint/no-var-requires":'off',
  },
};
