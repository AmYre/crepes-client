import React, { useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { PlusIcon, TrashIcon, CheckIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { Switch } from '@mantine/core';

const Supplements = ({ order, supplements, currentCrepe, i }) => {
	const uid = currentCrepe + i;
	const persistentOrder = useRef(order);

	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control,
		name: uid,
	});

	const onSubmit = (data) => {
		const crepeUid = Object.entries(data)[0][0];
		const crepeNbr = crepeUid[0].slice(-1);
		const crepeSuppls = Object.entries(data)[0][1].map((suppl) => suppl.value);
		const targetedCrepe = persistentOrder.current.filter((crp) => crp.uid == crepeUid);
		const addSuppls = targetedCrepe.reduce((acc, el, index) => {
			el.suppls = crepeSuppls;
			return acc;
		}, {});
	};

	return (
		<div className='flex-col pt-3 px-3 dark:bg-gray-700'>
			<form key={`Form${i}`} id={`Form${i}`} onSubmit={handleSubmit(onSubmit)}>
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
									<Switch color='yellow' type='checkbox' key={index} {...register(`${uid}.${index}.value`)} value={`${currentCrepe}${i}${name}`} checked={persistentOrder.current[i].suppls[index]} />
									<p className='ml-3 text-sm lg:text-base font-bold text-black dark:text-gray-200 cursor-pointer'>{price.toFixed(2)} €</p>
									<TrashIcon
										className='w-4 h-4 cursor-pointer mx-2 text-primary'
										onClick={() => {
											setActiveTab(!activeTab);
											removeProduct(id);
										}}
									/>
									<PlusIcon
										className='w-4 h-4 cursor-pointer mx-2 text-primary'
										onClick={() => {
											setActiveTab(!activeTab);
											setSupplements([...supplements, { name: name, price: price, id_list: id }]);
										}}
									/>
								</div>
							)
						)}
				</div>
				<button type='submit' form={`Form${i}`} className='flex flex-row items-center justify-center gap-2 bg-primary text-white rounded-full font-light py-2 px-4'>
					<CheckIcon className='w-6' /> <p>Valider</p>
				</button>
			</form>
		</div>
	);
};

export default Supplements;
