import { useGlobalContext } from '../../context/Context';
import Image from 'next/image';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';

const ModalBoissons = ({
	product_name,
	price,
	category_name,
	url,
	width,
	height,
	i,
}) => {
	const [modal, setModal] = useState(false);
	const [inputQuantity, setInputQuantity] = useState(1);

	const {
		productsList,
		setProductsList,
		randomNumber,
		supplementList,
		setSupplementList,
	} = useGlobalContext();

	const myLoader = ({ src, width, quality }) => {
		return `${src}?w=${width}&q=${quality || 75}`;
	};
	return (
		<div className="flex items-center border-t-2 z-50 hover:bg-gray-100 dark:hover:bg-gray-700">
			<div
				className={`${
					modal
						? 'flex items-center justify-center z-10 bg-white bg-opacity-70 h-screen w-full fixed bottom-0 left-0'
						: 'hidden '
				}`}
			>
				<div className="bg-white py-0 rounded w-full sm:w-2/3 md:w-1/2">
					<div className="w-full h-screen py-10 px-3 bg-gray-100 dark:bg-gray-700 relative">
						<Image
							loader={myLoader}
							src={url}
							layout="intrinsic"
							width={400}
							height={250}
							alt={product_name}
							className="object-contain"
						/>
						<p className="text-xl font-bold mt-5">{product_name}</p>
						<input
							className="h-10 w-full p-1 mt-2 mb-5 shadow border rounded form-input ring-blue-600 outline-none focus:ring-2"
							type="number"
							value={inputQuantity}
							onChange={(e) => setInputQuantity(e.target.value)}
							// defaultValue="1"
							min="1"
						/>

						<div className="absolute bottom-0 left-0 w-full">
							<button
								className="w-full text-bold bg-gray-900 hover:bg-gray-800 text-white text-xl px-3 py-5"
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
									setModal(!modal);
									setInputQuantity(1);
								}}
							>
								Ajouter aux panier
							</button>
						</div>
						<div className="flex justify-between">
							<button
								className="text-bold"
								onClick={() => {
									setModal(!modal);
									setInputQuantity(1);
								}}
							>
								Fermé
							</button>
							<p className="text-xl font-bold">
								{Number(inputQuantity * price).toFixed(2)} €{' '}
							</p>
						</div>
					</div>
				</div>
			</div>
			<Image
				loader={myLoader}
				src={url}
				width={100}
				height={100}
				alt={product_name}
				className="object-contain"
			/>

			<div className="flex justify-between w-full p-2">
				<p className="text-sm md:text-lg font-bold">{product_name}</p>
				<div className="flex space-x-2">
					<p className="text-sm md:text-lg font-bold">
						{price.toFixed(2)} €{' '}
					</p>
				</div>
			</div>
			<PlusIcon
				onClick={() => {
					setModal(!modal);
				}}
				className="w-8 h-8 cursor-pointer"
			/>
		</div>
	);
};

export default ModalBoissons;
