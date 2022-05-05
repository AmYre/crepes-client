import { useGlobalContext } from '../context/Context';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../hooks/mutations/useCreateOrder';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Supplements from './Supplements';
import { PlusIcon } from '@heroicons/react/solid';

const Crepes = () => {
	const router = useRouter();

	const { productsList, setProductsList, firstStep, setFirstStep, quantity, setQuantity, randomNumber, theme, setTheme, supplementList, setSupplementList, preparationTime, setPreparationTime, minutes, setMinutes, seconds, setSeconds, payed, setPayed, crepes, setCrepes } = useGlobalContext();

	const [createOrder, { data: newOrderData }] = useMutation(CREATE_ORDER);
	// TODO : change the way to create Order when there is  actually an order !

	const totalSupplement = Number(supplementList.reduce((a, b) => a + b.price, 0).toFixed(2));
	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);

	if (typeof window !== 'undefined') {
		// require to have localstorage to work with next
		const localProduct = localStorage.getItem('productList');
		const localCrepes = JSON.parse(localProduct);
	}

	const [modal, setModal] = useState(false);

	const myLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};

	const addCrepe = (name, price) => {
		setProductsList([
			...productsList,
			{
				uid: name + productsList.filter((crepe) => crepe.name == name).length,
				name,
				price,
				supplement_list: [],
			},
		]);
	};

	const delCrepe = (name) => {
		const lengthID = productsList.filter((crepe) => crepe.name == name).length - 1;
		setProductsList(productsList.filter((crepe) => crepe.uid !== name + lengthID));
	};

	useEffect(() => {
		localCrepes && setProductsList(localCrepes);
		localStorage.clear('productList');

		if (router.query.id) {
			createOrder({
				variables: {
					order_id: randomNumber,
					total: 0,
					confirm_order: false,
				},
			});
		}
	}, [router]);

	useEffect(() => {
		console.log(productsList);
		console.log(productsList.filter((crepe) => crepe.name == 'Nutella').length);
	}, [productsList]);

	return (
		<>
			{crepes.crepes?.data ? (
				<div>
					{crepes.crepes.data.map(
						(
							{
								attributes: {
									name,
									price,
									time,
									image: {
										data: {
											attributes: { url, width, height },
										},
									},
								},
							},
							i
						) => (
							<>
								<div className={`flex bg-white p-4 mt-8 mx-8 rounded shadow`}>
									<Image loader={myLoader} src={url} width={100} height={100} alt={name} className='object-contain' />
									<div className='flex flex-col justify-center'>
										<div className='text-xl font-bold text-gray-800'>{name}</div>
										<div className='text-md font-light text-gray-800'>{price.toFixed(2)} € </div>
										<div className='flex flex-row gap-4 text-xs text-gray-80'>
											<p className='text-black'>0.70€ par supplément</p>
											<PlusIcon
												onClick={() => {
													setModal(!modal);
												}}
												className='w-8 h-8 cursor-pointer bg-red-500'
											/>
										</div>
									</div>
									<div className='flex flex-col text-gray-800'>
										<div className='flex flex-row'>
											<p
												onClick={() => {
													delCrepe(name);
												}}>
												-
											</p>
											<p>{productsList && productsList.filter((crepe) => crepe.name == name).length}</p>
											<p
												onClick={() => {
													addCrepe(name, price);
												}}>
												+
											</p>
										</div>
										<div> Prix ss-total</div>
									</div>
								</div>
								<div className={`${modal ? 'bg-white' : 'hidden '}`}>
									<div className='bg-white py-0 rounded w-full sm:w-2/3 md:w-1/2'>
										<div className='py-10 px-3 bg-gray-100 dark:bg-gray-700'>
											<div className='h-36 w-full bg-white dark:bg-gray-600 p-3 mt-2 mb-5 shadow border rounded ring-blue-600 outline-none focus:ring-2 overflow-hidden overflow-y-scroll'>
												{crepes?.supplements.data.map(({ id, attributes: { name, price } }, index) => (
													<Supplements name={name} price={price} index={index} key={index} id={id} modal={modal} />
												))}
											</div>
											<div className='absolute bottom-0 left-0 w-full'>
												<button className='w-full text-bold bg-gray-900 hover:bg-gray-800 text-white text-xl px-3 py-5'>Ajouter</button>
											</div>

											<div className='flex justify-between'>
												<button
													className='text-bold'
													onClick={() => {
														setModal(!modal);
														setSupplementList([]);
													}}>
													Fermé
												</button>
												<p className='text-xl font-bold'>{Number(total + totalSupplement).toFixed(2)} € </p>
											</div>
										</div>
									</div>
								</div>
							</>
						)
					)}
				</div>
			) : (
				<div>Oops.. Nous n'avons pas pu accéder à la carte. Merci de signaler le dysfonctionnement</div>
			)}
		</>
	);
};

export default Crepes;
