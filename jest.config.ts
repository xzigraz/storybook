import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'constants/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.test.{ts,tsx}',
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};

// next/jest merges (rather than replaces) transformIgnorePatterns, so its own
// restrictive default still ends up ignoring (and thus not transforming) ESM-only
// packages this codebase depends on (the unified/remark/rehype pipeline in
// lib/markdown.ts, and react-syntax-highlighter's ESM style exports). Override the
// fully-resolved array afterwards instead, accounting for pnpm's nested
// node_modules/.pnpm/<pkg>@<version>/node_modules/<pkg> package layout.
const esmPackages = [
  'next',
  'unified',
  'react-syntax-highlighter',
  'bail',
  'ccount',
  'character-entities.*',
  'comma-separated-tokens',
  'decode-named-character-reference',
  'devlop',
  'escape-string-regexp',
  'gray-matter',
  'hast-.*',
  'hastscript',
  'html-.*',
  'is-plain-obj',
  'longest-streak',
  'markdown-table',
  'mdast-.*',
  'micromark.*',
  'parse-entities',
  'property-information',
  'rehype-.*',
  'remark-.*',
  'space-separated-tokens',
  'stringify-entities',
  'trim-lines',
  'trough',
  'unist-.*',
  'vfile.*',
  'zwitch',
].join('|');

export default async () => {
  const config = await createJestConfig(customJestConfig)();
  config.transformIgnorePatterns = [
    `node_modules/\\.pnpm/(?!(${esmPackages})@)`,
  ];
  return config;
};