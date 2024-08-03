import react from '@vitejs/plugin-react';
import {defineConfig} from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import {viteStaticCopy} from "vite-plugin-static-copy";

export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		viteStaticCopy({
			targets: [
				{ src: './src/assets/images', dest: 'assets' },
			]
		})
	],
	build: {
		outDir: 'build',
		rollupOptions: {
			input: 'index.html',
		}
	},
	css: {
		modules: {
			localsConvention: 'camelCaseOnly',
		}
	},
});
