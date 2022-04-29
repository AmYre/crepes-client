import { useMenuList } from '../../hooks/queries/useMenuList';
import Crepe from '../Modal/Crepe';

const CrepesSucrees = ({ data }) => {
	return (
		<div>
			<h2 className='text-center text-xl font-bold mb-3'>Crepes Sucrée</h2>
			<div>
				{data?.crepes.data.map(
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
