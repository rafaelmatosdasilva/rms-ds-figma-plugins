import { defineConfig } from 'vitest/config';

// The design system's own checks: the core helpers and the shared UI's code hygiene. Each product built on it runs
// its own tests in its own repository (and in this repository's CI, against this checkout: see build.yml).
export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.test.js'],
    testTimeout: 20000,
  },
});
