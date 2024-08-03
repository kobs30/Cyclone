/// <reference types="vitest" />
import {defineConfig} from "vite";
import react from '@vitejs/plugin-react';
import {viteStaticCopy} from "vite-plugin-static-copy";
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	test: {},
	plugins: [
		nodePolyfills(), // include only buffer in future
		react(),
		tsconfigPaths(),
		viteStaticCopy({
			targets: [
				{ src: './src/assets/manifest.json', dest: '' },
				{ src: './src/assets/background.js', dest: '' },
				{ src: './src/assets/content-script.js', dest: '' },
				{ src: './src/assets/images', dest: 'assets' },
				{ src: './src/assets/lib', dest: 'assets' },
			]
		})
	],
	build: {
		outDir: 'build',
		rollupOptions: {
			input: 'index.html',
			output: {
				assetFileNames: () => `assets/[name][extname]`,
				entryFileNames: () => `assets/[name].js`,
			}
		}
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		}
	},
});
