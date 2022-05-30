import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/Context';
import { useRouter } from 'next/router';
import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import Link from 'next/link';

const CREATE_ORDER = gql`
	mutation createCommande($session_id: String, $name: String, $mail: String, $crepe: [ComponentProductDetailProductsInput], $served: Boolean, $total: Int) {
		createCommande(data: { session_id: $session_id, name: $name, mail: $mail, crepe: $crepe, served: $served, total: $total }) {
			data {
				id
				attributes {
					session_id
					name
					mail
					crepe {
						name
						price
						suppls {
							name
						}
					}
					served
					total
				}
			}
		}
	}
`;

const success = () => {
	const { crepes } = useGlobalContext();

	const [user, setUser] = useState();
	const [cart, setCart] = useState();
	const [total, setTotal] = useState();
	const [order, setOrder] = useState();
	const [loaded, setLoaded] = useState(false);

	const router = useRouter();
	const { session_id } = router.query;

	const crepesImg = crepes?.map((crp) => ({ name: 'Supplements', url: '/suppls.png' }, { name: crp.attributes.name, url: crp.attributes.image.data.attributes.url }));
	const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);

	useEffect(() => {
		typeof window !== 'undefined' && setOrder(JSON.parse(localStorage.getItem('order')));
	}, []);

	useEffect(() => {
		session_id &&
			order &&
			fetch(`/api/success?session_id=${session_id}`)
				.then((res) => res.json())
				.then((data) => {
					setUser(data.session.customer_details);
					setCart(data.cart.data);
					setTotal(data.session.amount_total);
					setLoaded(true);
					createOrder({
						variables: {
							session_id,
							name: data.session.customer_details.name,
							mail: data.session.customer_details.email,
							crepe: order.map((crp, i) => ({
								name: crp.uid,
								price: crp.price,
								suppls: Object.keys(crp.suppls).map((suppl) => ({ name: suppl })),
							})),
							total: data.session.amount_total,
							served: false,
						},
					});
				});
	}, [session_id]);

	return (
		<div className='w-screen h-screen font-comfortaa text-white flex flex-col bg-home bg-cover'>
			<nav className='flex flex-row items-center justify-between'>
				<img src='/logo.png' className='w-40 pl-4' />
				<div className='flex flex-row'>
					<img src='/fr.png' className='pr-8 w-16' />
					<img src='/en.png' className='pr-8 w-16' />
				</div>
			</nav>
			{loaded && (
				<section className='relative flex flex-col justify-center items-center gap-3 bg-white p-4 mt-8 mx-4 rounded shadow'>
					<p className='text-green-500 font-thin italic text-center text-sm mb-6'>
						Merci {user.name}, votre commande à bien été prise en compte. Une facture vous a été adressée sur {user.email}
					</p>

					<p className='text-gray-800 font-bold text-xl mb-6'>Commande N° ...</p>
					<div className='flex flex-col text-left font-thin gap-3'>
						{cart?.map((product) => (
							<div key={product.description} className='w-full flex flex-row items-center gap-3 border-b-slate-100 border-b-1'>
								<div className='text-gray-800 text-left'>{crepesImg.map((crp) => crp.name == product.description && <img src={crp.url} className='w-10 object-contain' />)}</div>
								<div className='text-gray-800 text-left'>Crêpe {product.description}</div>
								<div className='text-gray-800 text-left text-xs'>x{product.quantity}</div>
							</div>
						))}
						<p className='text-gray-800 font-bold text-left mt-4'>Total : {(total / 100).toFixed(2)}€</p>
					</div>

					<Link href='/'>
						<button className='text-white bg-primary rounded-full py-2 px-6 mt-6 mb-20'>Commander à nouveau</button>
					</Link>

					<p className='w-full text-sm text-white text-center bg-secondary absolute bottom-0 px-4 py-3 rounded-b'>Votre temps d'attente est estimé à ...minutes</p>
				</section>
			)}
		</div>
	);
};

export default success;
