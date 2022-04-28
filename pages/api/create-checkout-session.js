const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
	const { products, supplement_total, id } = req.body;

	const transformedItem = products?.map((item) => ({
		price_data: {
			product_data: {
				name: item.product_name,
			},
			currency: 'eur',
			unit_amount: Number(
				item.price * 100 +
					item.supplement_list
						.reduce((a, b) => a.concat(b), [])
						.reduce((a, b) => a + b.price, 0)
						.toFixed(2) *
						100
			),
		},
		quantity: item.quantity,
		description:
			item.supplement_list.map((sup) => sup.name).join(' ') ||
			'Sans supplement',
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: transformedItem,
		mode: 'payment',
		success_url: `${process.env.HOST}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.HOST}/menu?id=${id}`,
		metadata: {
			id: id,
		},
	});

	res.status(200).json({ id: session.id });
};
