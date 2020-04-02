module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transformIgnorePatterns: [],
    moduleNameMapper: {
        '^.+\\.(css|less)$': 'identity-obj-proxy'
    },
    globals: {
        'ts-jest': { isolatedModules: true }
    }
};
