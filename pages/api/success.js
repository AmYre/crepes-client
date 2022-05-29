import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
	const cart = await stripe.checkout.sessions.listLineItems(req.query.session_id);
	res.status(200).json({ session, cart });
}
