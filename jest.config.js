module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "<rootDir>/src/tests/**/*.spec.ts"
  ],
  moduleNameMapper: {
    "@env$": "<rootDir>/src/environment",
    "@services$": "<rootDir>/src/services",
    "@controllers$": "<rootDir>/src/controllers/",
    "@models$": "<rootDir>/src/models/",
    "@middlewares$": "<rootDir>/src/middlewares/",
    "@helpers$": "<rootDir>/src/helpers/",
    "@enums$": "<rootDir>/src/enums/",
    "@mongo$": "<rootDir>/src/mongo/",
    "@repository$": "<rootDir>/src/repository/"
  }
};
