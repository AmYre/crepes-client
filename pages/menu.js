import { useGlobalContext } from '../context/Context';
import MenuList from '../components/MenuList/MenuList ';
import Orders from '../components/Orders';
import { useMutation } from '@apollo/client';
import { useMenuList } from '../hooks/queries/useMenuList';
import { CREATE_ORDER } from '../hooks/mutations/useCreateOrder';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { TrashIcon } from '@heroicons/react/solid';
import Navbar from '../components/Navbar/Navbar';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const Menu = ({ data }) => {
	const router = useRouter();

	const { productsList, setProductsList, theme, firstStep, setFirstStep, randomNumber, supplementList, preparationTime, setPreparationTime } = useGlobalContext();

	const [createOrder, { data: newOrderData }] = useMutation(CREATE_ORDER);

	const currentOrderId = newOrderData?.createCommande.data.id;

	const removeProduct = (id) => {
		// remove the crepes from the recap list when click on trash icon
		const removedProduct = productsList.filter((product) => product.product_id !== id);
		setProductsList(removedProduct);
		localStorage.clear();
	};

	const removeTime = (index) => {
		// remove the time of a single crepes from the recap list when click on trash icon
		preparationTime.splice(index, 1);
	};

	// concat all the arrays together and get all totals amounts
	const tot = productsList?.map(({ supplement_list }) => supplement_list);
	const concatArrays = tot?.reduce((a, b) => a.concat(b), []);
	const totalSupplement = concatArrays.reduce((a, b) => a + b?.price, 0);
	const total = productsList.reduce((a, b) => a + b.price * b.quantity, 0);

	let preperationT = 0;
	if (typeof window !== 'undefined') {
		// require to have localstorage to work with next
		const localProduct = localStorage.getItem('productList');
		preperationT = localStorage.getItem('preperation time');
		const parserdData = JSON.parse(localProduct);
	}

	useEffect(() => {
		if (parserdData) {
			setProductsList(parserdData);
			setPreparationTime([...preparationTime, Number(preperationT)]);
		}
		localStorage.clear('productList');
		localStorage.clear('preperation time');
	}, []);

	useEffect(() => {
		setFirstStep(false);
	}, [router]);

	return (
		<div className='h-screen'>
			<Navbar />
			{firstStep || router.query.id ? (
				<div className='flex flex-col justify-between'>
					<main>
						<MenuList data={data} />
					</main>
					<section>
						<div className='flex flex-col justify-center mx-5 h-96 bg-gray-800 rounded text-gray-50 shadow gap-8 px-10'>
							<h2 className='font-bold text-lg md:text-xl uppercase border-b-2 py-1'>Récap' de votre commande</h2>
							<div className='flex justify-between font-bold'>
								<p className='text-sm md:text-lg'>Produit</p>
								<p className='text-sm md:text-lg'>prix</p>
							</div>
							<div className='flex flex-col h-28 pb-2 overflow-auto'>
								{productsList.map(({ product_name, price, product_id, quantity, supplement_list }, index) => (
									<div className='flex justify-between' key={index}>
										<div className='flex flex-col'>
											<div className='flex'>
												<p className='text-sm md:text-base font-bold pr-5'>{product_name}</p>
												<p className='text-sm md:text-base font-bold'>x {quantity}</p>
											</div>
											<div className='flex flex-wrap my-2'>
												{supplement_list?.map((item, i) => (
													<p className='font-light text-xs md:text-sm px-1' key={i}>
														{item.name} {item.price.toFixed(2)} €
													</p>
												))}
											</div>
										</div>
										<div className='flex items-center'>
											<p className='px-2 font-semibold'>{price.toFixed(2)} €</p>
											<TrashIcon
												onClick={() => {
													removeProduct(product_id);
													removeTime(index);
												}}
												className='cursor-pointer w-4 h-4'
											/>
										</div>
									</div>
								))}
							</div>
							<div className='flex justify-between w-full border-t-2 border-gray-50'>
								<p className='text-lg md:text-xl font-bold'>Total</p>
								<p className='text-lg font-bold'>{Number(totalSupplement + total).toFixed(2)} €</p>
							</div>
						</div>
					</section>
					<Orders currentOrderId={currentOrderId} />
				</div>
			) : (
				<div className='h-2/3 flex justify-center items-center bg-white dark:bg-gray-700 my-14 mx-10'>
					<button
						className='bg-red-500 hover:bg-red-400 rounded-md shadow-lg px-4 py-3 text-gray-50'
						onClick={() => {
							setFirstStep(!firstStep);
							createOrder({
								variables: {
									order_id: randomNumber,
									total: 0,
									confirm_order: false,
								},
							});
							// refetch(); // removed on the 12/3
						}}>
						Choisir une crépes
					</button>
				</div>
			)}
		</div>
	);
};

export default Menu;

export async function getServerSideProps(context) {
	const client = new ApolloClient({
		uri: `${process.env.HOST_STRAPI}`,
		cache: new InMemoryCache(),
	});

	const { data } = await client.query({
		query: gql`
			query Foods {
				crepesSucrees {
					data {
						attributes {
							category_name
							price
							product_name
							preparation_time
							image {
								data {
									attributes {
										url
										width
										height
									}
								}
							}
						}
					}
				}
				boissons {
					data {
						attributes {
							category_name
							product_name
							price
							image {
								data {
									attributes {
										url
										width
										height
									}
								}
							}
						}
					}
				}
				supplements {
					data {
						id
						attributes {
							name
							price
						}
					}
				}
			}
		`,
	});

	return {
		props: {
			data: data,
		},
	};
}
