import type { UserConfig } from 'vite'

export default defineAppConfig({
    // vite.config.js
    optimizeDeps: {
        esbuildOptions: {
            target: 'esnext'
        }
    },
    build: {
        target: 'esnext'
    }
} satisfies UserConfig
)