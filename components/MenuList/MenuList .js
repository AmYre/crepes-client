import CrepesSucrees from './CrepesSucrees';
import { css } from '@emotion/react';
import BounceLoader from 'react-spinners/BounceLoader';
import { useMenuList } from '../../hooks/queries/useMenuList';
import Boisson from './Boisson';

const MenuList = ({ data }) => {
	const { loading } = useMenuList();

	return (
		<div>
			<div className='h-96 mx-5 mt-2 mb-5 bg-white dark:bg-gray-800 shadow-md overflow-hidden overflow-y-scroll'>
				<div className='m-3 my-2 p-2 bg-white dark:bg-gray-800'>
					<CrepesSucrees data={data} />
					<Boisson data={data} />
				</div>
			</div>
		</div>
	);
};

export default MenuList;
