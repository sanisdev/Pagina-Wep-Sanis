/** @type {import('tailwindcss').Config} */

export default {
	darkMode: "class",
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"fondo-nav": "url(src/assets/logo.svg')",
				"fondo-aboutus": "url(./src/assets/home/fondo_abouts.png)",
				"fondo-aboutus2": "url(./src/assets/home/fondo_soft.png)",
				"fondo-inbuldingvMobil":
					"url(./src/assets/tournaments/construccion_v_movil.svg)",
				"fondo-inbulding":
					"url('./src/assets/tournaments/construccion.svg')",
				"fondo-aviso": "url('./src/assets/avisoescritorio.svg')",
				"fondo-aviso-movil": "url('./src/assets/avisomovil.svg')",
				"pl-1": "url('/assets/palapas/PALAPA1/PALAPA1-1.webp')",
				"pl-2": "url('/assets/palapas/PALAPA2/PALAPA2-1.webp')",
				"pl-3": "url('/assets/palapas/PALAPA3/PALAPA3-1.webp')",
				"pl-4": "url('/assets/palapas/PALAPA4/PALAPA4-1.webp')",
				"pl-5": "url('/assets/palapas/SARAPERA/1.webp')",
				"pl-ca": "url('/assets/palapas/CAPRICHO/1.webp')",
				"pl-6": "url('/assets/palapas/PALAPA6/PALAPA6-1.webp')",
				"pl-7": "url('/assets/palapas/PALAPA7/1.webp')",
				"bbq": "url('/assets/reservaciones/bbq.webp')",
				"sal": "url('/assets/reservaciones/salones.webp')",
		
				// 'instalaciones': `url(${Constants.tenisfondo})`,
			},
			height: {
				90: "90%",
			},
			width: {
				90: "90%",
				40: "40%"
			},

			blur: {
				xs: "2px",
			},

			backgroundColor: {
				"header-card": "#898989",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
			},
			animation: {
				fadeIn: "fadeIn 2s ease-in-out",
			},
		},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
};
