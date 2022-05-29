import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const success = () => {
	const [user, setUser] = useState();
	const [cart, setCart] = useState();
	const [total, setTotal] = useState();
	const [loaded, setLoaded] = useState(false);
	const router = useRouter();
	const { session_id } = router.query;

	useEffect(() => {
		session_id &&
			fetch(`/api/success?session_id=${session_id}`)
				.then((res) => res.json())
				.then((data) => {
					console.log('first', data);
					setUser(data.session.customer_details.name);
					setCart(data.cart.data);
					setTotal(data.session.amount_total);
					setLoaded(true);
				});
	}, [session_id]);

	return (
		<main className='w-screen h-screen font-comfortaa text-white flex flex-col bg-home bg-cover'>
			<nav className='flex flex-row items-center justify-between'>
				<img src='/logo.png' className='w-40 pl-4' />
				<div className='flex flex-row'>
					<img src='/fr.png' className='pr-8 w-16' />
					<img src='/en.png' className='pr-8 w-16' />
				</div>
			</nav>
			{loaded && (
				<section className=''>
					<p>Félicitations {user}</p>
					{cart?.map((product) => (
						<div key={product.description}>{product.description}</div>
					))}
					<p>Total {total}</p>
				</section>
			)}
		</main>
	);
};

export default success;
