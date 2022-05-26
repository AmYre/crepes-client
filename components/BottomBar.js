import React from 'react';
import { useGlobalContext } from '../context/Context';
import { ChevronRightIcon } from '@heroicons/react/solid';

const BottomBar = () => {
	const { supplements, setSupplements, suppls, setSuppls, totalSuppls, setTotalSuppls, supplPrice, setSupplPrice, order, setOrder, modal, setModal, total, setTotal } = useGlobalContext();
	console.log();
	return (
		<div className='w-full fixed bottom-bar bg-white text-black flex justify-between items-center rounded-full px-4 py-4 pb-10 mt-8'>
			<div className='text-xl'>
				Total :{' '}
				<span className='font-bold'>
					{(
						order.reduce((acc, curr) => {
							return acc + curr.price;
						}, 0) +
						Object.values(totalSuppls).reduce((acc, curr) => {
							return acc + curr;
						}, 0)
					).toFixed(2)}
				</span>
				<span className='text-sm'>€</span>
			</div>
			<button className='bg-primary text-white rounded-full px-4 py-2 flex flex-row items-center'>
				Commander <ChevronRightIcon className='w-8 h-8 cursor-pointer p-1 text-white rounded-full' />
			</button>
		</div>
	);
};

export default BottomBar;
