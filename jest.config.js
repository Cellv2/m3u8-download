/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
    testPathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/src/__tests__/setup/",
        "<rootDir>/dist/",
    ],
    globalSetup: "<rootDir>/global-setup.js",
    globalTeardown: "<rootDir>/global-teardown.js",
};
