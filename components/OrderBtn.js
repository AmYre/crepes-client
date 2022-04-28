import { useMutation, useQuery } from '@apollo/client';
import { useGlobalContext } from '../context/Context';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';
import { GET_ORDER_TIME } from '../hooks/queries/useOrderTime';

const stripePromise = loadStripe(process.env.stripe_public_key);

const OrderBtn = ({ currentOrderId }) => {
	const { productsList, preparationTime } = useGlobalContext();
	const router = useRouter();
	const { loading, error, data } = useQuery(GET_ORDER_TIME);

	const waiting_time = data?.commandes.data // Get the total waiting time from the server
		.reduce((a, b) => a + b.attributes.preparation_time, 0);

	// concat all the arrays together and get all totals amounts
	const tot = productsList.map(({ supplement_list }) => supplement_list);
	const concatArrays = tot.reduce((a, b) => a.concat(b), []);
	const totalSupplement = concatArrays.reduce((a, b) => a + b?.price, 0);
	const totalPreparationTime = preparationTime.reduce((a, b) => a + b, 0);

	const [updateOrder] = useMutation(UPDATE_ORDER, {
		// update order with the products
		variables: {
			id: Number(currentOrderId) || Number(router.query.id), // ID form data return when create the order or from the query params
			preparation_time: Number(totalPreparationTime + waiting_time),
			products: productsList,
		},
	});

	const createCheckoutSession = async () => {
		localStorage.setItem('productList', JSON.stringify(productsList)); // save the basket in localStorage before paying
		localStorage.setItem('preperation time', totalPreparationTime);
		updateOrder();
		const stripe = await stripePromise;
		// Call the backend to create a checkout session..
		const checkoutSession = await axios.post(
			'/api/create-checkout-session',
			{
				id: Number(currentOrderId) || Number(router.query.id),
				products: productsList,
				supplement_total: totalSupplement,
			}
		);
		// Redirect user/customer to Stripe Checkout
		const result = await stripe.redirectToCheckout({
			sessionId: checkoutSession.data.id,
		});
		console.log(result);
		if (result.error) alert(result.error.message);
	};

	if (loading) return 'Loading ...';

	return (
		<>
			<button
				role="link"
				disabled={productsList.length === 0}
				onClick={createCheckoutSession}
				className="w-full text-bold text-xl bg-gray-800 hover:bg-gray-700 shadow-lg px-4 py-3 text-gray-50"
			>
				Commander
			</button>
		</>
	);
};

export default OrderBtn;
