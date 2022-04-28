import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import { useState } from 'react';

const CuisineOrderFinish = ({ order_id, products, total }) => {
	const [activeTab, setActiveTab] = useState(false);

	return (
		<div className="flex flex-col min-h-full overflow-auto">
			{/* <img src={'./'} /> */}
			<div className="flex justify-around p-3 text-gray-100 bg-gray-900 hover:bg-gray-800 ">
				<h2 className="text-xl fond-bold">N° {order_id}</h2>
				<p className="text-xl text-green-500 ">Livrer</p>
				<p className="text-xl">Total: {total.toFixed(2)} €</p>

				{activeTab ? (
					<ChevronUpIcon
						onClick={() => setActiveTab(!activeTab)}
						className="w-5 cursor-pointer"
					/>
				) : (
					<ChevronDownIcon
						onClick={() => setActiveTab(!activeTab)}
						className="w-5 cursor-pointer"
					/>
				)}
			</div>

			{products.map(
				({ product_name, supplement_list, quantity, price }, i) => (
					<div
						key={i}
						className={`overflow-hidden bg-gray-200 dark:bg-gray-600`}
					>
						<div
							className={`flex justify-between px-2 duration-500 ${
								activeTab
									? 'h-16 border-gray-900 border-b-2'
									: 'h-0'
							} `}
						>
							<div className="flex flex-col">
								<div className="flex">
									<p className="text-sm md:text-base font-bold pr-5">
										{product_name}
									</p>
									<p className="text-sm md:text-base font-bold">
										x {quantity}
									</p>
								</div>
								<div className="flex flex-wrap my-2">
									{supplement_list?.map((item, i) => (
										<p
											className="font-light text-xs md:text-sm px-1"
											key={i}
										>
											{item.name} {item.price.toFixed(2)}{' '}
											€
										</p>
									))}
								</div>
							</div>

							<p className="text-sm md:text-base font-bold">
								{price.toFixed(2)} €
							</p>
						</div>
					</div>
				)
			)}
		</div>
	);
};

export default CuisineOrderFinish;
