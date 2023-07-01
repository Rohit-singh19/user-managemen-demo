module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|svg|ttf|woff|woff2)$": "jest-transform-stub",
    "^axios$": "<rootDir>/__mocks__/axios.js",
  },
  transformIgnorePatterns: ["node_modules/(?!axios)/"],
};
