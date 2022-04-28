import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { UPDATE_ORDER } from '../hooks/mutations/useUpdateOrder';
import { useMutation } from '@apollo/client';
import { useGlobalContext } from '../context/Context';
import { useQuery } from '@apollo/client';
import { useReactToPrint } from 'react-to-print';
import { GET_ORDER_SUCCESS } from '../hooks/queries/useOrderSuccess';

const Success = () => {
	const componentRef = useRef(); // Print the page
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const router = useRouter();
	const [statusCrepes, setStatusCrepes] = useState('');
	const { setProductsList, minutes, setMinutes, seconds, setSeconds } =
		useGlobalContext();

	const { data, error } = useSWR(
		router.query.session_id ? `/api/${router.query.session_id}` : null,
		(url) =>
			fetch(url)
				.then((res) => res.json())
				.catch((err) => console.log(err.message))
	);

	const {
		error: errorOrder,
		data: orderData,
		loading,
	} = useQuery(GET_ORDER_SUCCESS, {
		variables: { id: data?.session.metadata.id },
	});

	const [updateOrder, { data: OrderDataUpdate, called }] = useMutation(
		UPDATE_ORDER,
		{
			variables: {
				id: Number(data?.session.metadata.id),
				is_payed: true,
				total: data?.session.amount_total / 100,
			},
		}
	);

	useEffect(() => {
		if (data !== undefined && data.session.id.startsWith('cs_')) {
			updateOrder();
			setProductsList(OrderDataUpdate);
			handleTimer();
			localStorage.clear();
		}
	}, [data, orderData]);

	let time = Number(
		orderData?.commande.data.attributes.preparation_time * 60
	);

	const timerCountDown = () => {
		if (time > 0) {
			setMinutes(Math.floor(time / 60));
			setSeconds(time % 60);
			time--;
			seconds < 10 ? `0${seconds}` : seconds;
		} else {
			return;
		}
	};

	useEffect(() => {
		if (minutes < 15 && minutes >= 10) {
			setStatusCrepes('Attente estimé moins de 15 minutes');
		} else if (minutes < 10 && minutes >= 5) {
			setStatusCrepes('Attente estimé moins de 10 minutes');
		} else if (minutes < 5) {
			setStatusCrepes('Votre crépes est en cuisson');
		} else {
			setStatusCrepes('Plus de 15 minutes');
		}
	}, [minutes]);

	const handleTimer = () => {
		setInterval(() => {
			const timer = timerCountDown();
			return clearInterval(timer);
		}, 1000);
	};

	if (loading) return 'Loading ...';

	return (
		<>
			{data ? (
				<div className="bg-gray-100 dark:bg-black h-screen">
					<main className="max-w-screen-lg mx-auto">
						<div className="flex flex-col p-10 bg-white dark:bg-black dark:text-gray-200">
							<div className="space-x-2 mb-5">
								<h1 className="font-semibold text-xl md:text-2xl px-3">
									Merci de votre achat, votre commandes est
									confirmé!
								</h1>
							</div>

							<div ref={componentRef}>
								<h2 className="font-bold text-sm md:text-xl  uppercase text-gray-100 bg-zinc-900 hover:bg-zinc-800 py-5 px-3">
									Détail de votre commande n°{' '}
									{
										orderData?.commande.data.attributes
											.order_id
									}
								</h2>
								<div className="flex flex-col justify-center pb-5 text-gray-900 rounded gap-8 border-gray-900 border-b-2 bg-gray-200 dark:bg-zinc-800">
									{orderData?.commande.data.attributes.products.map(
										(
											{
												product_name,
												supplement_list,
												quantity,
												price,
											},
											i
										) => (
											<div
												className="flex justify-between px-2 pt-2 border-gray-900 border-t-2 bg-gray-200 dark:bg-zinc-800 dark:text-gray-200"
												key={i}
											>
												<div className="flex flex-col">
													<div className="flex">
														<p className="text-sm md:text-base font-bold pr-5">
															{product_name}
														</p>
														<p className="text-sm md:text-base font-bold">
															x {quantity}
														</p>
													</div>
													<div className="flex flex-wrap my-2">
														{supplement_list?.map(
															(item, i) => (
																<p
																	className="font-light text-xs md:text-sm px-1"
																	key={i}
																>
																	{item.name}{' '}
																	{item.price.toFixed(
																		2
																	)}{' '}
																	€
																</p>
															)
														)}
													</div>
												</div>
												<p className="text-sm md:text-base font-bold">
													{price.toFixed(2)} €
												</p>
											</div>
										)
									)}
								</div>
								<p className="text-xl md:text-2xl font-semibold text-right pt-5 pl-2">
									Total:{' '}
									{Number(
										data?.session.amount_total / 100
									).toFixed(2)}{' '}
									€
								</p>
							</div>
							<button
								className="text-xs md:text-base bg-zinc-900 hover:bg-zinc-800 text-white w-1/4 px-2 py-3 rounded mx-auto my-5"
								onClick={handlePrint}
							>
								{' '}
								Imprimer{' '}
							</button>
							{called ? (
								<div className="bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 flex flex-col items-center justify-center py-5 border-gray-900 border-b-2">
									<h2 className="space-x-2 my-5 text-lg md:text-2xl font-semibold px-2">
										Votre commande est en cours de
										préparation ...
									</h2>
									<p>{!loading && statusCrepes}</p>
								</div>
							) : (
								'Loading...'
							)}
						</div>
					</main>
				</div>
			) : (
				'Loading'
			)}
		</>
	);
};

export default Success;
