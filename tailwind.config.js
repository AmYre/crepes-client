module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			transitionProperty: {
				height: 'height',
				spacing: 'margin, padding',
			},
			backgroundImage: {
				home: "url('/bg.jpg')",
			},
			colors: {
				primary: '#DBA72C',
				secondary: '#C94424',
			},
		},
	},
	plugins: [],
};
