import {defineConfig, globalIgnores} from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import formatjs from "eslint-plugin-formatjs";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import storybook from "eslint-plugin-storybook";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...storybook.configs["flat/recommended"],
  reactRefresh.configs.recommended,
  {
    rules: {
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
    },
  },
  {
    plugins: {
      formatjs,
    },
    rules: {
      "formatjs/enforce-id": [
        "error",
        {
          idInterpolationPattern: "[sha512:contenthash:base64:6]",
        },
      ],
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
  {
    plugins: {
      custom: {
        rules: {
          "no-react-intl": noReactIntlRule(),
        },
      },
    },
    rules: {
      "custom/no-react-intl": "error",
    },
  },
  {
    files: ["src/app/**/layout.tsx", "src/app/**/page.tsx", "**/*.story.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  globalIgnores([
    ".cursor/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
export default eslintConfig;

/**
 * @returns {import('eslint').Rule.RuleModule}
 */
function noReactIntlRule() {
  return {
    meta: {
      type: "problem",
      docs: {
        description:
          "Prevent direct imports of react-intl, use @i18n/react-intl instead",
      },
      fixable: "code",
      messages: {
        noDirectReactIntl:
          'Direct import of "react-intl" is not allowed. Use "#app/i18n/react-intl" instead.',
      },
    },
    create(context) {
      let hasServerOnly = false;
      return {
        Program() {
          hasServerOnly = false;
        },
        ImportDeclaration(node) {
          if (node.source.value === "server-only") {
            hasServerOnly = true;
          } else if (node.source.value === "react-intl" && !hasServerOnly) {
            context.report({
              node: node.source,
              messageId: "noDirectReactIntl",
              fix(fixer) {
                return fixer.replaceText(node.source, '"#app/i18n/react-intl"');
              },
            });
          }
        },
      };
    },
  };
}
