import React, { useState, createContext, useContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
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
			}}>
			{children}
		</AppContext.Provider>
	);
};

const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
