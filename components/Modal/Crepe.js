import { useGlobalContext } from '../../context/Context';
import Image from 'next/image';
import { useState } from 'react';
import { useMenuList } from '../../hooks/queries/useMenuList';
import SupplementDetail from '../MenuList/SupplementDetail';
import { PlusIcon } from '@heroicons/react/solid';

const Crepe = ({ product_name, price, category_name, url, preparation_time, width, height, i }) => {
	const [modal, setModal] = useState(false);
	const [inputQuantity, setInputQuantity] = useState(1);

	const { productsList, setProductsList, randomNumber, supplementList, setSupplementList, preparationTime, setPreparationTime } = useGlobalContext();

	const { data } = useMenuList();

	const totalSupplement = Number(supplementList.reduce((a, b) => a + b.price, 0).toFixed(2));

	const myLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};

	return (
		<>
			<div className={`flex bg-white p-4 mt-8 mx-8 rounded shadow`}>
				<Image loader={myLoader} src={url} width={100} height={100} alt={product_name} className='object-contain' />
				<div className='flex flex-col justify-center'>
					<div className='text-xl font-bold text-gray-800'>{product_name}</div>
					<div className='text-md font-light text-gray-800'>{price.toFixed(2)} € </div>
					<div className='flex flex-row gap-4 text-xs text-gray-80'>
						<p>0.70€ par supplément</p>
						<PlusIcon
							onClick={() => {
								setModal(!modal);
							}}
							className='w-8 h-8 cursor-pointer'
						/>
					</div>
				</div>
				<div className='flex flex-col text-gray-800'>
					<div> - chiifre + </div>
					<div> Prix ss-total</div>
				</div>
			</div>
			<div className={`${modal ? 'bg-white' : 'hidden '}`}>
				<div className='bg-white py-0 rounded w-full sm:w-2/3 md:w-1/2'>
					<div className='py-10 px-3 bg-gray-100 dark:bg-gray-700'>
						<Image loader={myLoader} src={url} layout='responsive' width={370} height={180} alt={product_name} className='object-contain' />
						<p className='text-lg md:text-xl font-bold mt-5 uppercase m-7'>Supplément pour {product_name}</p>

						{/* <span className="text-xl font-bold mt-5">
								Supplement
							</span> */}

						<div className='h-36 w-full bg-white dark:bg-gray-600 p-3 mt-2 mb-5 shadow border rounded ring-blue-600 outline-none focus:ring-2 overflow-hidden overflow-y-scroll'>
							{data?.supplements.data.map(({ id, attributes: { name, price } }, index) => (
								<SupplementDetail name={name} price={price} index={index} key={index} id={id} modal={modal} />
							))}
						</div>
						<div className='absolute bottom-0 left-0 w-full'>
							<button
								className='w-full text-bold bg-gray-900 hover:bg-gray-800 text-white text-xl px-3 py-5'
								onClick={() => {
									setProductsList([
										...productsList,
										{
											product_name: product_name,
											category_name: category_name,
											price: price,
											supplement_list: supplementList,
											quantity: Number(inputQuantity),
											product_id: randomNumber,
										},
									]);
									setPreparationTime([...preparationTime, Number(preparation_time.slice(4, 5))]);
									setModal(!modal);
									setSupplementList([]);
								}}>
								Ajouter
							</button>
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
							<p className='text-xl font-bold'>{Number(price + totalSupplement).toFixed(2)} € </p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Crepe;
