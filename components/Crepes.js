import { useEffect, useState } from 'react';
import { useGlobalContext } from '../context/Context';
import { PencilAltIcon } from '@heroicons/react/solid';
import { Popover, Tabs, Loader } from '@mantine/core';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Supplements from './Supplements';

const Crepes = () => {
	const { crepes, currentCrepe, setCurrentCrepe, totalSuppls, setTotalSuppls, supplPrice, order, setOrder, modal, setModal } = useGlobalContext();

	const [warning, setWarning] = useState(false);
	const [currentCrepeImg, setCurrentCrepeImg] = useState();
	const [currentCrepePrice, setCurrentCrepePrice] = useState();

	const openModal = (name, url, price) => {
		if (order.filter((crepe) => crepe.name == name).length > 0) {
			setWarning(false);
			setModal(!modal);
			setCurrentCrepe(name);
			setCurrentCrepeImg(url);
			setCurrentCrepePrice(price);
		} else setWarning(name);
	};

	const addCrepe = (name, price, url) => {
		setCurrentCrepe(name);
		setOrder([
			...order,
			{
				uid: name + order?.filter((crepe) => crepe.name == name).length,
				name,
				price,
				url,
				suppls: {},
			},
		]);
	};

	const delCrepe = (name) => {
		setCurrentCrepe(name);
		if (order.filter((crepe) => crepe.name == name).length > 0) {
			const supplsByCrepe = order.reduce((acc, crp) => {
				let { name, suppls } = crp;
				return { ...acc, [name]: [...(acc[name] || []), Object.values(suppls)] };
			}, {});
			const targetedSuppls = supplsByCrepe[name];

			const lengthID = order?.filter((crepe) => crepe.name == name).length - 1;
			setOrder(order?.filter((crepe) => crepe.uid !== name + lengthID));

			setOrder((prevOrder) => {
				const updatedOrder = prevOrder.map((crp) => (crp.uid == name + lengthID ? { ...crp, suppls: {} } : crp));
				return updatedOrder;
			});

			setTotalSuppls({ ...totalSuppls, [name]: targetedSuppls[0].length !== 0 ? +(targetedSuppls?.flat().filter((value) => value).length * supplPrice).toFixed(2) : 0 });
		} else return;
	};

	useEffect(() => {
		if (order.length >= 0) {
			const supplsByCrepe = order.reduce((acc, crp) => {
				let { name, suppls } = crp;
				return { ...acc, [name]: [...(acc[name] || []), Object.values(suppls)] };
			}, {});
			const targetedSuppls = supplsByCrepe[currentCrepe];

			setTotalSuppls({ ...totalSuppls, [currentCrepe]: targetedSuppls !== undefined ? +(targetedSuppls.flat().filter((value) => value).length * supplPrice).toFixed(2) : 0 });
		}
	}, [order]);

	return (
		<>
			{crepes ? (
				crepes?.map(
					(
						{
							attributes: {
								name,
								price,
								image: {
									data: {
										attributes: { url, width, height },
									},
								},
							},
						},
						i
					) => (
						<div key={name} className='flex flex-row gap-3 bg-white p-4 mt-8 mx-4 rounded shadow'>
							<Image src={url} width={80} height={80} alt={name} className='grow-0 object-contain' />
							<div key={name} className='grow flex-col'>
								<div className='flex flex-row justify-between'>
									<div className='text-xl font-bold text-gray-800'>{name}</div>
									<div className='flex flex-row justify-between bg-primary rounded-full px-2 w-22'>
										<p
											className='font-bold text-gray-800 text-2xl px-1 cursor-pointer'
											onClick={() => {
												delCrepe(name);
											}}>
											-
										</p>
										<p className='bg-white flex items-center justify-center font-bold text-gray-800 text-xl rounded-full shadow-md w-8'>{order && order?.filter((crepe) => crepe.name == name).length}</p>
										<p
											className='font-bold text-gray-800 text-2xl px-1 cursor-pointer'
											onClick={() => {
												addCrepe(name, price, url);
											}}>
											+
										</p>
									</div>
								</div>
								<div className='text-md font-medium text-gray-800'>{price.toFixed(2)} € </div>
								<div className='flex flex-row text-gray-800 justify-between'>
									<Popover
										key={name}
										opened={name == warning}
										onClose={() => setWarning(false)}
										target={
											<button
												className='flex flex-row bg-secondary text-xs text-white items-center mt-2 px-2 shadow-md rounded-full cursor-pointer'
												onClick={() => {
													openModal(name, url, price);
												}}>
												<p>
													{Object.keys(totalSuppls).includes(name) && (
														<span className='rounded-full text-black font-bold px-1 bg-white mr-1'>
															{
																order
																	.reduce((acc, crp) => {
																		let { name, suppls } = crp;
																		return { ...acc, [name]: [...(acc[name] || []), Object.values(suppls)] };
																	}, {})
																	[name]?.flat()
																	.filter((value) => value).length
															}
														</span>
													)}
													Suppléments
												</p>
												<PencilAltIcon className='w-7 h-7 p-1' />
											</button>
										}
										width={260}
										position='bottom'
										withArrow>
										<div style={{ display: 'flex' }}>
											<p size='sm'>Vou n'avez pas encore ajouté de crêpe...</p>
										</div>
									</Popover>

									<motion.div key={(order?.filter((crepe) => crepe.name == name).length * price).toFixed(2)} animate={{ rotate: 360 }} className='text-md font-semibold flex items-center text-gray-800'>
										{totalSuppls[name] === undefined ? (order?.filter((crepe) => crepe.name == name).length * price).toFixed(2) : (order?.filter((crepe) => crepe.name == name).length * price + totalSuppls[name]).toFixed(2)}
										<span className='text-xs'>€</span>
									</motion.div>
								</div>
							</div>
						</div>
					)
				)
			) : (
				<div className='h-95 flex flex-col justify-center items-center gap-8  text-center px-4'>
					<div className='font-bold text-3xl'>Bienvenue chez Pomme de Pain</div>
					<div>Veuillez patienter quelques instants...</div>
					<Loader color='yellow' variant='dots' size={150} />
					<div>On prépare vos crêpes</div>
				</div>
			)}
			{modal && (
				<div className='my-modal flex flex-col items-center h-95 absolute top-0 left-0 right-0 z-10 bg-white shadow-modal m-4 mb-8 p-4 rounded-3xl'>
					<div className='w-full flex flex-row relative justify-between items-start'>
						<h3 className='text-2xl font-bold text-gray-800'>{currentCrepe}</h3>
						<div className='text-md font-semibold mt-1 text-gray-800'>{(order?.filter((crepe) => crepe.name == currentCrepe).length * currentCrepePrice + totalSuppls[currentCrepe]).toFixed(2)}€</div>
						<Image className='shadow-circle overflow-visible translate-x-ximg translate-y-yimg bg-white p-32 rounded-full' src={currentCrepeImg} width={80} height={80} />
					</div>

					<Tabs orientation='horizontal' className='w-full overflow-scroll' grow={true}>
						{order
							?.filter((crp) => crp.name == currentCrepe)
							.map((crepe, i) => (
								<Tabs.Tab label={`Crêpe ${i + 1}`}>
									<Supplements currentCrepe={currentCrepe} i={i} />
								</Tabs.Tab>
							))}
					</Tabs>
				</div>
			)}
		</>
	);
};

export default Crepes;
