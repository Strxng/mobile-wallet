// jest.config.js
/** @type {import('jest').Config} */

const config = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  modulePathIgnorePatterns: ["<rootDir>/.history"],
};

module.exports = config;
