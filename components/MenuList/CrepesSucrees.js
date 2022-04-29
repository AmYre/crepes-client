import { useGlobalContext } from '../../context/Context';
import Crepe from '../Modal/Crepe';

const CrepesSucrees = () => {
	const { productsList, setProductsList, firstStep, setFirstStep, quantity, setQuantity, randomNumber, theme, setTheme, supplementList, setSupplementList, preparationTime, setPreparationTime, minutes, setMinutes, seconds, setSeconds, payed, setPayed, crepes, setCrepes } = useGlobalContext();

	return (
		<div>
			<h2 className='text-center text-xl font-bold mb-3'>Crepes</h2>
			<div>
				{crepes?.crepes.data.map(
					(
						{
							attributes: {
								name,
								price,
								time,
								image: {
									data: {
										attributes: { url, width, height },
									},
								},
							},
						},
						i
					) => (
						<Crepe product_name={name} price={price} preparation_time={time} url={url} width={width} height={height} key={i} />
					)
				)}
			</div>
		</div>
	);
};

export default CrepesSucrees;
