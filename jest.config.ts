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
    }
};

export default options;
