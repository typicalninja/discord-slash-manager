/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// all colors are from discord
				primary: {
					"50": "#eaeaeb",
					"100": "#d5d5d6",
					"200": "#abacad",
					"300": "#808285",
					"400": "#56595c",
					"500": "#2c2f33",
					"600": "#232629",
					"700": "#1a1c1f",
					"800": "#121314",
					"900": "#09090a"
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
