import React from 'react';
import { useGlobalContext } from '../context/Context';
import { ChevronRightIcon } from '@heroicons/react/solid';
import getStripe from '../hooks/utils/getStripe';

const BottomBar = () => {
	const { totalSuppls, setTotalSuppls, order, setOrder } = useGlobalContext();

	const handleCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ order, totalSuppls }),
		});

		if (response.statusCode === 500) return;

		const data = await response.json();

		//add feedback UI here to redirecting... for example
		stripe.redirectToCheckout({ sessionId: data.id });
	};

	return (
		<div className='w-full fixed bottom-bar bg-white text-black flex justify-between items-center rounded-full px-4 py-4 pb-10 mt-8'>
			<div className='text-xl'>
				Total :{' '}
				<span className='font-bold'>
					{(
						order.reduce((acc, curr) => {
							return acc + curr.price;
						}, 0) +
						Object.values(totalSuppls).reduce((acc, curr) => {
							return acc + curr;
						}, 0)
					).toFixed(2)}
				</span>
				<span className='text-sm'>€</span>
			</div>
			<button className='bg-primary text-white rounded-full px-4 py-2 flex flex-row items-center' onClick={handleCheckout}>
				Commander <ChevronRightIcon className='w-8 h-8 cursor-pointer p-1 text-white rounded-full' />
			</button>
		</div>
	);
};

export default BottomBar;
