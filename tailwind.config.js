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
					100: '#8D95FF',
					200: '#7E8FFC',
					300: '#6F89F9',
					400: '#6073F6',
					500: '#5865F2', // Original Color
					600: '#515BEF',
					700: '#4851EC',
					800: '#4047E9',
					900: '#333CE6',
				  },
			}
		}
	},
	plugins: []
};
