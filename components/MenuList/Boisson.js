import { useMenuList } from '../../hooks/queries/useMenuList';
import ModalBoissons from '../Modal/ModalBoissons';

const Boisson = ({ data }) => {
	return (
		<div>
			<h2 className="text-center text-xl font-bold mb-3">Boissons</h2>
			<div>
				{data?.boissons.data.map(
					(
						{
							attributes: {
								product_name,
								price,
								category_name,
								image: {
									data: {
										attributes: { url, width, height },
									},
								},
							},
						},
						i
					) => (
						<ModalBoissons
							product_name={product_name}
							price={price}
							category_name={category_name}
							url={url}
							width={width}
							height={height}
							key={i}
						/>
					)
				)}
			</div>
		</div>
	);
};

export default Boisson;
