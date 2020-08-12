module.exports = {
    preset: 'ts-jest',
    transformIgnorePatterns: [],
    moduleNameMapper: {
        '^.+\\.(css|less)$': 'identity-obj-proxy'
    },
    transform: {
        '^.+\\.svg$': 'jest-transform-stub'
    },
    globals: {
        'ts-jest': { isolatedModules: true }
    }
};
