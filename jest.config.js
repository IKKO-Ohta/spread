module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  testMatch: ['<rootDir>/test/**/*.ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/components/**/*.vue', '<rootDir>/pages/**/*.vue']
}
