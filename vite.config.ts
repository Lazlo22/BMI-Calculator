import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteTsconfigPaths()],
    server: {
        open: true,
        port: 8000,
        host: '127.0.0.1'
    },
    build: {
        manifest: true,
        outDir: 'build'
    },
})
