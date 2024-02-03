module.exports = {
  extends: [ 'eslint-config-astro-svelte-jsdoc-standard' ],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    "no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 0 }]
  }
}