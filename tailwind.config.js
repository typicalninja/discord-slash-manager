/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// all colors are from discord
				primary: {
					100: '#7A7E85',
					200: '#686C73',
					300: '#55585B',
					400: '#43464D',
					500: '#2C2F33', // Original Color
					600: '#23262A',
					700: '#191B1F',
					800: '#0F1014',
					900: '#050507',
				},
				blurple: {
					"50": "#eef0fe",
					"100": "#dee0fc",
					"200": "#bcc1fa",
					"300": "#9ba3f7",
					"400": "#7984f5",
					"500": "#5865f2",
					"600": "#4651c2",
					"700": "#353d91",
					"800": "#232861",
					"900": "#121430"
				  },
			}
		}
	},
	plugins: []
};
