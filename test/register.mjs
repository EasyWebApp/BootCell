import { JSDOM } from 'jsdom';
import { registerHooks } from 'node:module';
import { fileURLToPath } from 'node:url';

// --import also runs in the coordinator, which should not create its own suite.
if (!process.execArgv.includes('--test')) {
    const { after, before } = await import('node:test');

    process.env.SWCRC = 'true';
    process.env.SWC_CONFIG_FILE = fileURLToPath(
        new URL('.swcrc', import.meta.url)
    );
    await import('@swc-node/register');

    registerHooks({
        resolve(specifier, context, nextResolve) {
            const result = nextResolve(specifier, context);

            return /\.(ts|tsx)$/.test(result.url)
                ? { ...result, format: 'commonjs' }
                : result;
        }
    });
    const { window } = new JSDOM('', { url: 'http://localhost/' });

    const domGlobals = new Set([
        'Event',
        'EventTarget',
        'CustomEvent',
        'AbortController',
        'AbortSignal'
    ]);

    for (const name of Object.getOwnPropertyNames(window)) {
        if (name in globalThis && !domGlobals.has(name)) continue;

        Object.defineProperty(globalThis, name, {
            configurable: true,
            get: () => window[name]
        });
    }

    before(async () => {
        if (window.document.readyState !== 'complete')
            await new Promise(resolve =>
                window.addEventListener('load', resolve, { once: true })
            );
        // Let documentReady polling finish before tests can close the window.
        await new Promise(resolve => setTimeout(resolve, 0));
    });

    after(() => window.close());
}
