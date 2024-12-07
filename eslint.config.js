import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: { globals: {...globals.browser, ...globals.node} },
    rules: {
      "camelcase": "warn",
      "prefer-const": "warn",
      "curly": "warn",
      "dot-notation": "warn",
      "semi": "warn",
      "no-var": "error",
    }
  },

  pluginJs.configs.recommended,
];