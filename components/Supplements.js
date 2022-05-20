import { useRef, useState } from 'react';
import { useGlobalContext } from '../context/Context';
import { CheckIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { Switch } from '@mantine/core';

const Supplements = ({ currentCrepe, i }) => {
	const { supplements, setSupplements, totalSuppls, setTotalSuppls, supplPrice, setSupplPrice, suppls, setSuppls, order, setOrder } = useGlobalContext();

	const uid = currentCrepe + i;

	const handleChange = (e) => {
		e.preventDefault();
		const crepeName = e.target.value;
		const supplName = e.target.name;
		const targetedCrepe = order.filter((crp) => crp.uid == crepeName);

		targetedCrepe.reduce((acc, el, index) => {
			el.suppls[supplName][0] = !el.suppls[supplName][0];
			return acc;
		}, {});

		console.log(crepeName);
		console.log(supplName);
		console.log('After', order);
	};

	return (
		<div key={`Div${i}`} className='flex-col pt-3 px-3 dark:bg-gray-700'>
			<h4 className='font-bold text-gray-800'>Suppléments {`Crepe ${i + 1}`}</h4>
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
							<div className='flex flex-row items-center py-5' key={index}>
								<Image src={url} width={30} height={30} alt={name} className='object-contain' />
								<p className='ml-3 text-sm sm:text-sm lg:text-base font-medium text-black dark:text-gray-200 cursor-pointer'>{name}</p>
								<Switch color='yellow' key={uid + name + index} type='checkbox' onChange={handleChange} name={name} value={uid} checked={order[i].suppls[name][0]} />
								<p className='ml-3 text-sm lg:text-base font-bold text-black dark:text-gray-200 cursor-pointer'>{price.toFixed(2)} €</p>
							</div>
						)
					)}
			</div>
		</div>
	);
};

export default Supplements;
