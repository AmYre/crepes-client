import { useGlobalContext } from '../context/Context';
import MenuList from './MenuList/MenuList ';
import Orders from './Orders';
import { useMutation } from '@apollo/client';
import { useMenuList } from '../hooks/queries/useMenuList';
import { CREATE_ORDER } from '../hooks/mutations/useCreateOrder';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { TrashIcon } from '@heroicons/react/solid';
import Navbar from './Navbar/Navbar';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import Crepe from './Modal/Crepe';

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

	useEffect(() => {
		if (firstStep || router.query.id) {
			setFirstStep(!firstStep);
			createOrder({
				variables: {
					order_id: randomNumber,
					total: 0,
					confirm_order: false,
				},
			});
		}
	});

	return (
		<>
			{data ? (
				<div>
					{data?.crepesSucrees.data.map(
						(
							{
								attributes: {
									product_name,
									price,
									category_name,
									preparation_time,
									image: {
										data: {
											attributes: { url, width, height },
										},
									},
								},
							},
							i
						) => (
							<Crepe product_name={product_name} price={price} preparation_time={preparation_time} category_name={category_name} url={url} width={width} height={height} key={i} />
						)
					)}
				</div>
			) : (
				<div>Oops.. Nous n'avons pas pu accéder à la carte. Merci de signaler le dysfonctionnement</div>
			)}
		</>
	);
};

export default Menu;
