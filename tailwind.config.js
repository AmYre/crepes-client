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
			boxShadow: {
				modal: '0px 0px 30px 5px rgba(0, 0, 0, 0.2)',
				circle: '0px 0px 0px 10px white',
			},
			spacing: {
				95: '95vh',
				115: '115%',
				ximg: '-10%',
				yimg: '-30%',
				bar: '-36px',
			},
		},
	},
	plugins: [],
};
