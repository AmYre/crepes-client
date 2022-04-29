import React, { useState, useEffect, createContext, useContext } from 'react';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [crepes, setCrepes] = useState({});
	const [firstStep, setFirstStep] = useState(false);
	// const [secondStep, setSecondStep] = useState(false);
	const [productsList, setProductsList] = useState([]);
	const [quantity, setQuantity] = useState(1);
	const [theme, setTheme] = useState(false);
	const [payed, setPayed] = useState(false);
	const [supplementList, setSupplementList] = useState([]);
	const [preparationTime, setPreparationTime] = useState([]);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const randomNumber = Math.floor(Math.random() * 100000 + 1);

	useEffect(() => {
		async function getCrepes() {
			const client = new ApolloClient({
				uri: 'https://gentle-wave-45799.herokuapp.com/graphql',
				cache: new InMemoryCache(),
				headers: {
					Authorization: 'Bearer 979a57e2fbdbd57f7327c42010f71ac5fda4ad4a7c342f25eac86905bb70d2c7c8945251fc8b19cb1770bada223c4a6bd43c68c20d57f51d2a84a236d19b6c7f808a7f8eb3d471cb938356a103f62f1541c9a6ab6560ca95b519e6042b2794ea21b8e9d4f109146533b735d89f37c8d16d5c3b946f9a0fec34a1330b86bc1868',
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
									time
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
			setCrepes(data);
		}

		getCrepes();
	}, []);

	return (
		<AppContext.Provider
			value={{
				productsList,
				setProductsList,
				firstStep,
				setFirstStep,
				quantity,
				setQuantity,
				randomNumber,
				theme,
				setTheme,
				supplementList,
				setSupplementList,
				preparationTime,
				setPreparationTime,
				minutes,
				setMinutes,
				seconds,
				setSeconds,
				payed,
				setPayed,
				crepes,
				setCrepes,
			}}>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
