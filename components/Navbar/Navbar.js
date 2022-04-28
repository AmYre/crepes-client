import Image from 'next/image';
import {
	MenuIcon,
	MoonIcon,
	ShoppingBagIcon,
	SunIcon,
} from '@heroicons/react/solid';
import { useGlobalContext } from '../../context/Context';
import { useRouter } from 'next/router';
import { GET_ORDER, useOrders } from '../../hooks/queries/useOrders';
import { useEffect, useState } from 'react';
import NavListMobi from './NavListMobi';
import Link from 'next/link';
import NavListDesk from './NavListDesk';
import { useQuery } from '@apollo/client';

const Navbar = () => {
	const router = useRouter();
	const { data, loading, refetch } = useQuery(GET_ORDER, {
		variables: {
			limit: 200,
			eq: false,
		},
	});

	const [active, setActive] = useState(false);

	useEffect(() => {
		setInterval(() => {
			const timer = refetch();
			return clearInterval(timer);
		}, 10000);
	}, []);

	const handleClick = () => {
		setActive(!active);
	};

	return (
		<header
			className={`flex bg-white dark:bg-gray-700 dark:text-gray-100 justify-between px-7 items-center shadow-md h-20`}
		>
			<div className="relative flex items-center h-10 cursor-pointer my-auto">
				<a href="/">
					<Image
						src="/logo.png"
						alt="logo"
						objectFit="contain"
						objectPosition="left"
						width={100}
						height={'80%'}
					/>
				</a>
			</div>
			<nav
				className={`md:flex md:gap-3 font-bold transition duration-500 ease-in-out delay-150 bg-white dark:bg-gray-700 dark:text-gray-100 ${
					active
						? 'translate-x-0 md:hidden fixed top-0 right-0 h-full w-48 flex items-center flex-col'
						: 'translate-x-full fixed top-0 right-0 h-full w-48 flex items-center flex-col '
				}`}
			>
				<div className="flex justify-between w-full items-center p-5">
					<h2 className="text-sm font-light md:hidden ">
						{data?.commandes.data.length} Commande en cours ...
					</h2>
					<div className="md:hidden cursor-pointer">
						<MenuIcon
							onClick={handleClick}
							className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-600"
						/>
					</div>
				</div>
				<div className="w-full">
					<NavListMobi />
				</div>
			</nav>
			<div className="hidden md:flex">
				<NavListDesk />
			</div>
			<div className="hidden md:flex">
				<h2 className="text-sm">
					{data?.commandes.data.length} Commande en cours ...
				</h2>
			</div>
			{/* <div>
				<a href="/login">Connexion</a>
			</div> */}
			{/* <div onClick={() => setTheme(!theme)}>
				{theme ? (
					<SunIcon className="w-6" />
				) : (
					<MoonIcon className="w-6" />
				)}
			</div> */}
			<div className="md:hidden cursor-pointer">
				{!active && (
					<MenuIcon
						onClick={handleClick}
						className="w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
					/>
				)}
			</div>
		</header>
	);
};
export default Navbar;
