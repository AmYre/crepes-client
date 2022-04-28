module.exports = {
	// images: {
	// 	domains: ['res.cloudinary.com'],
	// },
	reactStrictMode: true,
	env: {
		stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
	},
	// experimental: {
	// 	concurrentFeatures: true,
	// 	serverComponents: true,
	// },
};
