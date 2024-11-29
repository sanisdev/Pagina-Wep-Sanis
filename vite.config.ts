import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
	plugins: [
		react(),
		createHtmlPlugin({
			inject: {
				data: {
					// Configuración de Content Security Policy
					contentSecurityPolicy: "default-src 'self'; script-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline';",
				},
			},
		}),
	],
});
