import js from "@eslint/js"
import nextPlugin from "@next/eslint-plugin-next"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
  {
    ignores: ["node_modules/", ".next/", "out/", "public/models/"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
]

