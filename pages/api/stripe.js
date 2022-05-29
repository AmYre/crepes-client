import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const order = req.body.order;
		const totalSuppls = req.body.totalSuppls;
		const groupedCrepes = order.reduce((groupedCrp, crp) => {
			const name = crp.name;
			if (groupedCrp[name] == null) groupedCrp[name] = [];
			groupedCrp[name].push(crp);
			return groupedCrp;
		}, {});

		const groupedOrder = Array.from(new Set(order.map((crp) => crp.name))).map((name) => {
			return {
				name: name,
				price: order.find((crepe) => crepe.name === name).price,
				url: order.find((crepe) => crepe.name === name).url,
			};
		});

		const groupedSuppls = {
			name: 'Supplements',
			price: 0.7,
			url: 'https://icon-library.com/images/5631de589c.png',
			qtty: Math.round(Object.values(totalSuppls).reduce((a, b) => a + b) / 0.7),
		};

		const formattedOrder = { ...groupedOrder, groupedSuppls };
		const finalOrder = Object.values(formattedOrder);

		try {
			const session = await stripe.checkout.sessions.create({
				submit_type: 'pay',
				mode: 'payment',
				payment_method_types: ['card'],
				billing_address_collection: 'auto',
				line_items: finalOrder.map((crepe) => {
					return {
						price_data: {
							currency: 'eur',
							product_data: {
								name: crepe.name,
								images: [crepe.url],
							},
							unit_amount: crepe.price * 100,
						},
						quantity: crepe.name !== 'Supplements' ? groupedCrepes[crepe.name].length : crepe.qtty,
					};
				}),
				success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
			});
			res.status(200).json(session);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
			console.log(err.statusCode, err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
