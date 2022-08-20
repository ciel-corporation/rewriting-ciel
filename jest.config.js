module.exports = {
	bail: 1,
	cacheDirectory: "/tmp/jest_rs",
	clearMocks: true,
	coverageProvider: "v8",
	coverageDirectory: "coverage",
	collectCoverage: true,
	testEnvironment: "jest-environment-node",
	testMatch: ["**/tests/**/*.test.js?(x)"],
};
