import { useMenuList } from '../../hooks/queries/useMenuList';
import Crepe from '../Modal/Crepe';

const CrepesSucrees = ({ data }) => {
	return (
		<div>
			<h2 className='text-center text-xl font-bold mb-3'>Crepes Sucrée</h2>
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
		</div>
	);
};

export default CrepesSucrees;
