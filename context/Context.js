import React, { useState, useEffect, createContext, useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [crepes, setCrepes] = useState();
	const [currentCrepe, setCurrentCrepe] = useState();
	const [supplements, setSupplements] = useState();
	const [supplPrice, setSupplPrice] = useState();
	const [suppls, setSuppls] = useState({});
	const [numberSuppls, setNumberSuppls] = useState();
	const [totalSuppls, setTotalSuppls] = useState({});
	const [total, setTotal] = useState((0).toFixed(2));
	const [order, setOrder] = useState([]);
	const [quantity, setQuantity] = useState(1);
	const [theme, setTheme] = useState(false);
	const [payed, setPayed] = useState(false);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [modal, setModal] = useState(false);

	const randomNumber = Math.floor(Math.random() * 100000 + 1);

	useEffect(() => {
		async function getCrepes() {
			const client = new ApolloClient({
				uri: process.env.NEXT_PUBLIC_HOST_STRAPI,
				cache: new InMemoryCache(),
				headers: {
					Authorization: `Bearer ${process.env.NEXT_PUBLIC_HOST_TOKEN_API}`,
				},
			});

			const { data } = await client.query({
				query: gql`
					query {
						crepes {
							data {
								attributes {
									name
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
									img {
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
					}
				`,
			});

			setCrepes(data?.crepes?.data);
			setSupplements(data?.supplements?.data);
			setSupplPrice(data?.supplements?.data[0]?.attributes?.price);
		}

		getCrepes();
	}, []);

	return (
		<AppContext.Provider
			value={{
				crepes,
				setCrepes,
				currentCrepe,
				setCurrentCrepe,
				supplements,
				setSupplements,
				supplPrice,
				setSupplPrice,
				numberSuppls,
				setNumberSuppls,
				totalSuppls,
				setTotalSuppls,
				order,
				setOrder,
				quantity,
				setQuantity,
				randomNumber,
				theme,
				setTheme,
				minutes,
				setMinutes,
				seconds,
				setSeconds,
				payed,
				setPayed,
				modal,
				setModal,
				suppls,
				setSuppls,
				total,
				setTotal,
			}}>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
