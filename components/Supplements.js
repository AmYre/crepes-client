import { useRef, useState, useEffect } from 'react';
import { useGlobalContext } from '../context/Context';
import { CheckIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { Switch } from '@mantine/core';

const Supplements = ({ currentCrepe, i }) => {
	const { supplements, setSupplements, suppls, setSuppls, numberSuppls, setNumberSuppls, totalSuppls, setTotalSuppls, supplPrice, setSupplPrice, order, setOrder, modal, setModal, total, setTotal } = useGlobalContext();
	const uid = currentCrepe + i;

	const handleChange = (e) => {
		const crepeName = e.target.value;
		const supplName = e.target.name;

		setOrder((prevOrder) => {
			const updatedOrder = prevOrder.map((crp) => (crp.uid == crepeName ? { ...crp, suppls: { ...crp.suppls, [supplName]: !crp.suppls[supplName] } } : crp));
			return updatedOrder;
		});
	};

	useEffect(() => {
		const supplsByCrepe = order.reduce((acc, crp) => {
			let { name, suppls } = crp;
			return { ...acc, [name]: [...(acc[name] || []), Object.values(suppls)] };
		}, {});
		const targetedSuppls = supplsByCrepe[currentCrepe];
		setTotalSuppls({ ...totalSuppls, [currentCrepe]: +(targetedSuppls.flat().filter((value) => value).length * supplPrice).toFixed(2) });
	}, [order]);

	return (
		<div key={`Div${i}`} className='flex-col text-center pt-3 px-3'>
			<h4 className='font-bold text-xl text-gray-800 my-4'>Suppléments {`Crêpe ${i + 1}`}</h4>
			<div className=''>
				{supplements
					?.filter((crp) => crp.attributes.name !== currentCrepe)
					.map(
						(
							{
								id,
								attributes: {
									name,
									price,
									img: {
										data: {
											attributes: { url },
										},
									},
								},
							},
							index
						) => (
							<div className='flex flex-row justify-between py-5' key={index}>
								<div className='flex flex-row items-center'>
									<Image src={url} width={30} height={30} alt={name} className='object-contain' />
									<p className='ml-3 text-sm sm:text-sm lg:text-base font-medium text-black cursor-pointer'>{name}</p>
								</div>
								<div className='flex flex-row items-center'>
									<Switch color='yellow' key={uid + name + index} type='checkbox' onChange={handleChange} name={name} value={uid} checked={order?.filter((crepe) => crepe.uid == uid)[0].suppls[name]} />
									<p className='ml-3 text-sm lg:text-base font-bold text-black cursor-pointer'>{price.toFixed(2)} €</p>
								</div>
							</div>
						)
					)}

				<button className='text-white bg-primary rounded-full py-2 px-6 mt-6' onClick={() => setModal(!modal)}>
					Fermer
				</button>
			</div>
		</div>
	);
};

export default Supplements;
