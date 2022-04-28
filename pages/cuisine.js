import { GET_ORDER } from '../hooks/queries/useOrders';
import { useEffect, useState } from 'react';
import CuisineOrder from '../components/Cuisine/CuisineOrder';
import CuisineOrderFinish from '../components/Cuisine/CuisineOrderFinish';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import {
	ArrowNarrowLeftIcon,
	ArrowNarrowRightIcon,
} from '@heroicons/react/solid';

const Kitchen = () => {
	const { data: session, status } = useSession();
	const [page, setPage] = useState(0);
	const {
		data: dataPrepared,
		loading: loadPrepared,
		refetch,
	} = useQuery(GET_ORDER, {
		variables: {
			sort: 'updatedAt:DESC',
			limit: 5,
			start: page,
			eq: true,
		},
	});
	const {
		data: dataNoPrepared,
		loading: loadNoPrepared,
		refetch: refetchNoPrepared,
	} = useQuery(GET_ORDER, {
		variables: {
			sort: 'updatedAt',
			limit: 100,
		},
	});

	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	let startingMinutes = 0;
	let time = startingMinutes * 60;

	const timerCountDown = () => {
		setMinutes(Math.floor(time / 60));
		setSeconds(time % 60);
		time--;
		seconds < 10 ? `0${seconds}` : seconds;
	};

	useEffect(() => {
		setInterval(() => {
			const timer = refetch();
			const timer2 = refetchNoPrepared();
			return clearInterval(timer, timer2);
		}, 30000);
		setInterval(() => {
			const timer = timerCountDown();
			return clearInterval(timer);
		}, 1000);
	}, []);

	if (loadNoPrepared) return 'Loading ...';

	if (status === 'authenticated') {
		return (
			<>
				<main className="flex flex-col gap-10 justify-center items-center p-10 bg-gray-200 dark:bg-gray-900">
					<section className="w-full">
						<div className="flex flex-col justify-center py-5 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-200 rounded shadow-lg gap-8 px-10 overflow-auto">
							<h2 className="font-bold text-lg md:text-xl uppercase border-gray-900 border-b-2 py-1">
								Commande en cours
							</h2>
							<div className="flex justify-around font-bold">
								<p className="text-sm md:text-lg">Commande</p>
								<p>Temps</p>
								<p className="text-sm md:text-lg">prix</p>
							</div>
							{dataNoPrepared?.commandes.data
								.filter(
									({
										attributes: { is_prepared, is_payed },
									}) =>
										is_prepared === false &&
										is_payed === true
								)
								.map(
									(
										{
											id,
											attributes: {
												confirm_order,
												order_id,
												is_prepared,
												products,
												updatedAt,
												total,
												preparation_time,
											},
										},
										i
									) => (
										<div key={i}>
											{loadPrepared ? (
												'Loading...'
											) : (
												<CuisineOrder
													order_id={order_id}
													id={id}
													updatedAt={updatedAt}
													products={products}
													total={total}
													preparation_time={
														preparation_time
													}
													minutes={minutes}
												/>
											)}
										</div>
									)
								)}
							<h2 className="font-bold text-lg md:text-xl uppercase border-gray-900 border-b-2 py-1">
								Commande terminée
							</h2>
							<div>
								{dataPrepared?.commandes.data.map(
									(
										{
											attributes: {
												products,
												order_id,
												total,
											},
										},
										i
									) => (
										<div key={i}>
											{loadNoPrepared ? (
												'Loading...'
											) : (
												<CuisineOrderFinish
													products={products}
													order_id={order_id}
													total={total}
												/>
											)}
										</div>
									)
								)}
							</div>
							<div className="flex justify-between">
								<ArrowNarrowLeftIcon
									className={`w-6 h-6 cursor-pointer ${
										page === 0 ? 'invisible' : ''
									}`}
									onClick={() => setPage(page - 5)}
								/>
								<ArrowNarrowRightIcon
									className={`w-6 h-6 cursor-pointer ${
										page >
										dataPrepared?.commandes.data.length
											? 'invisible'
											: ''
									}`}
									onClick={() => setPage(page + 5)}
								/>
							</div>
						</div>
						<div className="w-full mt-5 flex justify-center">
							<button
								className="text-bold text-xl rounded bg-gray-900 hover:bg-gray-800 dark:bg-black dark:hover:bg-gray-800 shadow-lg px-4 py-3 text-gray-50"
								onClick={() => signOut()}
							>
								Déconnection
							</button>
						</div>
					</section>
				</main>
			</>
		);
	}
	return (
		<div className="bg-gray-100 h-screen">
			<div className="bg-white p-5">
				<div className="flex flex-col justify-center items-center">
					<h2 className="text-xl font-semibold p-5">
						Vous devez etre connecté pour aller sur cette page{' '}
						<br />
					</h2>
					<button
						className="text-bold text-xl rounded bg-gray-900 hover:bg-gray-800 shadow-lg px-4 py-3 text-gray-50"
						onClick={() => signIn()}
					>
						Connection
					</button>
				</div>
			</div>
		</div>
	);
};

export default Kitchen;
