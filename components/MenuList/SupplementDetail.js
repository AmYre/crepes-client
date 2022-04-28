import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/Context';
import { PlusIcon, TrashIcon } from '@heroicons/react/solid';

const SupplementDetail = ({ name, price, index, id, modal }) => {
	const { supplementList, setSupplementList } = useGlobalContext();
	const [activeTab, setActiveTab] = useState(false);

	useEffect(() => {
		setActiveTab(false);
	}, [modal]);

	const removeProduct = (id) => {
		const removedProduct = supplementList.filter(
			(product) => product.id_list !== id
		);
		setSupplementList(removedProduct);
	};

	return (
		<div
			className={`flex items-center h-5 py-5 border-b-2 ${
				activeTab && 'bg-gray-200 dark:bg-gray-700'
			} `}
			key={index}
		>
			<label className={`flex w-full justify-between`}>
				<span className="ml-3 text-sm sm:text-sm lg:text-base font-medium text-black dark:text-gray-200 cursor-pointer">
					{name}
				</span>{' '}
				<span className="ml-3 text-sm lg:text-base font-bold text-black dark:text-gray-200 cursor-pointer">
					{price.toFixed(2)} €
				</span>
			</label>
			{activeTab ? (
				<TrashIcon
					className="w-4 h-4 cursor-pointer mx-2"
					onClick={() => {
						setActiveTab(!activeTab);
						removeProduct(id);
					}}
				/>
			) : (
				<PlusIcon
					className="w-4 h-4 cursor-pointer mx-2"
					onClick={() => {
						setActiveTab(!activeTab);
						setSupplementList([
							...supplementList,
							{ name: name, price: price, id_list: id },
						]);
					}}
				/>
			)}
		</div>
	);
};

export default SupplementDetail;
