import { useGlobalContext } from '../context/Context';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../hooks/mutations/useCreateOrder';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Switch, Tabs } from '@mantine/core';
import { motion } from 'framer-motion';
import { PencilAltIcon, PlusIcon, TrashIcon, CheckIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';
import Supplements from './Supplements';

const Crepes = () => {
	const router = useRouter();
	const { crepes, setCrepes, supplements, setSupplements, quantity, setQuantity, randomNumber, theme, setTheme, minutes, setMinutes, seconds, setSeconds, payed, setPayed } = useGlobalContext();
	const [createOrder, { data: newOrderData }] = useMutation(CREATE_ORDER);
	const totalSupplement = Number(supplements?.reduce((a, b) => a + b.price, 0).toFixed(2));

	const myLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};

	const removeProduct = (id) => {
		const removedProduct = supplements?.filter((product) => product.id_list !== id);
		setSupplements(removedProduct);
	};

	const [order, setOrder] = useState([]);

	const [checked, setChecked] = useState(new Array(100).fill(false));
	const [modal, setModal] = useState(false);
	const [modalTitle, setModalTitle] = useState();
	const [modalImg, setModalImg] = useState();
	const [totalNutella, setTotalNutella] = useState();
	const [currentCrepe, setCurrentCrepe] = useState();

	const openModal = (name, url) => {
		if (order.filter((crepe) => crepe.name == name).length > 0) {
			setModal(!modal);
			setModalTitle(name);
			setModalImg(url);
			setCurrentCrepe(name);
		} else return;
	};

	const addCrepe = (name, price) => {
		setOrder([
			...order,
			{
				uid: name + order.filter((crepe) => crepe.name == name).length,
				name,
				price,
				suppls: [],
			},
		]);
	};

	const delCrepe = (name) => {
		const lengthID = order.filter((crepe) => crepe.name == name).length - 1;
		setOrder(order.filter((crepe) => crepe.uid !== name + lengthID));
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const localProduct = localStorage.getItem('productList');
			const localCrepes = JSON.parse(localProduct);
		}

		localCrepes && setOrder(localCrepes);
		localStorage.clear('productList');

		router.query.id &&
			createOrder({
				variables: {
					order_id: randomNumber,
					total: 0,
					confirm_order: false,
				},
			});
	}, [router]);

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
						<div className='flex flex-row gap-3 bg-white p-4 mt-8 mx-4 rounded shadow'>
							<Image loader={myLoader} src={url} width={80} height={80} alt={name} className='grow-0 object-contain' />
							<div className='grow flex-col'>
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
										<p className='bg-white flex items-center justify-center font-bold text-gray-800 text-xl rounded-full shadow-md w-8'>{order && order.filter((crepe) => crepe.name == name).length}</p>
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
									<div className='flex flex-row text-xs text-gray-80 items-center mr-3 gap-0'>
										<p className='text-black'>0.70€ par suppl.</p>
										<PencilAltIcon
											onClick={() => {
												openModal(name, url);
											}}
											className='w-8 h-8 cursor-pointer p-1 text-primary rounded-full shadow-md'
										/>
									</div>
									<div className='text-md font-semibold flex items-center text-gray-800'>
										{(order.filter((crepe) => crepe.name == name).length * price).toFixed(2)}
										<span className='text-xs'>€</span>
									</div>
								</div>
							</div>
						</div>
					)
				)
			) : (
				<div>Oops.. Nous n'avons pas pu accéder à la carte. Merci de signaler le dysfonctionnement</div>
			)}
			{modal && (
				<div className='flex flex-col items-center h-95 absolute top-0 left-0 right-0 z-10 bg-white shadow-modal m-4 mb-8 p-4'>
					<div className='flex flex-row relative'>
						<h3 className='text-xl font-bold text-gray-800'>{modalTitle}</h3>
						<div className='text-md font-semibold flex items-center text-gray-800'> {Number(totalNutella + totalSupplement).toFixed(2)} € </div>
						{/* <Image loader={myLoader} src={url} width={80} height={80} alt={name} className='absolute object-contain' /> */}
					</div>

					<Tabs orientation='horizontal' grow={true}>
						{order
							.filter((crp) => crp.name == currentCrepe)
							.map((crepe, i) => (
								<Tabs.Tab label={`Crepe ${i + 1}`}>
									<Supplements order={order} supplements={supplements} currentCrepe={currentCrepe} i={i} />
								</Tabs.Tab>
							))}
					</Tabs>
				</div>
			)}
		</>
	);
};

export default Crepes;
