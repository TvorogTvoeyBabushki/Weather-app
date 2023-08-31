import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src')
		},
		extensions: ['.ts', '.tsx', 'json', '.js']
	},
	server: {
		port: 7000,
		open: true,
		cors: true
	},
	base: './'
})
