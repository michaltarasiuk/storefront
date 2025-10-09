/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  bracketSameLine: true,
  bracketSpacing: false,
  tailwindFunctions: ["cva", "cn"],
  plugins: ["prettier-plugin-tailwindcss"],
};
export default prettierConfig;
