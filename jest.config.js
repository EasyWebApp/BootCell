module.exports = {
    preset: 'ts-jest',
    transformIgnorePatterns: [],
    moduleNameMapper: {
        '^.+\\.(css|less)$': 'identity-obj-proxy'
    },
    globals: {
        'ts-jest': { isolatedModules: true }
    },
    setupFiles: ['<rootDir>/test/polyfill.ts']
};
