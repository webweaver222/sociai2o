const path = require("path");

module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  //tell jest to mock all sass files by style-mock.js
  moduleNameMapper: {
    "\\.(sass|css|html)$": require.resolve("./test/style-mock.js")
  },
  moduleDirectories: ["node_modules", path.join(__dirname, "test")]
};
