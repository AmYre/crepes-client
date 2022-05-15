import React, { useState, useEffect, createContext, useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [crepes, setCrepes] = useState();
	const [supplements, setSupplements] = useState();
	const [quantity, setQuantity] = useState(1);
	const [theme, setTheme] = useState(false);
	const [payed, setPayed] = useState(false);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

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

			setCrepes(data.crepes.data);
			setSupplements(data.supplements.data);
		}

		getCrepes();
	}, []);

	return (
		<AppContext.Provider
			value={{
				crepes,
				setCrepes,
				supplements,
				setSupplements,
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
			}}>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
