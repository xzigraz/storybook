import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import storybook from "eslint-plugin-storybook";
import globals from "globals";

export default tseslint.config(
	{
		ignores: [
			"node_modules",
			".next",
			"storybook-static",
			"ui-component",
			"public",
		],
	},
	js.configs.recommended,
	tseslint.configs.recommended,
	{
		plugins: {
			"react-hooks": reactHooks,
			"@next/next": nextPlugin,
		},
		rules: {
			...reactHooks.configs.flat.recommended.rules,
			...nextPlugin.configs.recommended.rules,
		},
	},
	...storybook.configs["flat/recommended"],
	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.es2020,
			},
		},
	},
	{
		files: [
			"__mocks__/**",
			"tests/**",
			"*.config.{js,cjs,mjs,ts}",
			".storybook/**",
		],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
);
