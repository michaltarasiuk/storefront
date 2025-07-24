import {dirname} from "node:path";

import {FlatCompat} from "@eslint/eslintrc";
import {globalIgnores} from "eslint/config";
import formatjs from "eslint-plugin-formatjs";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  reactRefresh.configs.recommended,
  {
    rules: {
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    plugins: {
      formatjs,
    },
    rules: {
      "formatjs/enforce-id": [
        "error",
        {idInterpolationPattern: "[sha512:contenthash:base64:6]"},
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
    files: ["src/app/**/layout.tsx", "src/app/**/page.tsx"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  globalIgnores([".next"]),
];
export default eslintConfig;

/**
 * ESLint rule to prevent direct imports of "react-intl".
 * Enforces usage of "@/i18n/react-intl" instead of "react-intl" for imports.
 * Allows direct imports when module also imports "server-only".
 *
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
          'Direct import of "react-intl" is not allowed. Use "@/i18n/react-intl" instead.',
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
                return fixer.replaceText(node.source, '"@/i18n/react-intl"');
              },
            });
          }
        },
      };
    },
  };
}
