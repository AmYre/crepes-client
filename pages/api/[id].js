const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { id } = req.query;
	const session = await stripe.checkout.sessions.retrieve(id, {
		expand: ['payment_intent'],
	});

	res.status(200).json({ session });
};
