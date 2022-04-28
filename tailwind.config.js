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
		},
	},
	plugins: [],
};
