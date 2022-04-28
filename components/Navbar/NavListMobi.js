import Link from 'next/link';
import { useRouter } from 'next/router';
import { NavBarData } from './NavBarData';

const NavListMobi = () => {
	const router = useRouter();

	return (
		<div className={`flex items-center flex-col font-bold space-y-10`}>
			{NavBarData.map((item, i) => (
				<div
					key={i}
					className={
						router.pathname == item.link
							? 'text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 transition duration-200 flex items-center justify-center w-full'
							: 'text-black dark:text-gray-200 hover:bg-black hover:text-white py-2 px-4 transition duration-200 flex items-center justify-center w-full'
					}
				>
					<p className="h-5 w-5">{item.icon}</p>
					<div className="flex-1 ml-3">
						<Link href={`${item.link}`}>
							<a>{item.title}</a>
						</Link>
					</div>
				</div>
			))}
		</div>
	);
};

export default NavListMobi;
