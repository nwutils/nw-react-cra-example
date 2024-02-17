import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    /* this is required so that Vite produces relative links to assets in the index.html*/
    base: './',
    plugins: [react()],
    build: {
        outDir: './out/react'
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.js'
    }
})
