import { Config } from '@jest/types';

const options: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [],
    moduleNameMapper: {
        '^.+\\.(css|less)$': 'identity-obj-proxy'
    },
    globals: {
        'ts-jest': { isolatedModules: true }
    },
    setupFiles: ['<rootDir>/test/polyfill.ts']
};

export default options;
