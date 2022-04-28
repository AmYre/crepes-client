import {
	BookOpenIcon,
	ChatAltIcon,
	HomeIcon,
	LoginIcon,
} from '@heroicons/react/solid';

export const NavBarData = [
	{
		title: 'Acceuil',
		icon: <HomeIcon />,
		link: '/',
	},
	{
		title: 'Menu',
		icon: <BookOpenIcon />,
		link: '/menu',
	},
	{
		title: 'Contact',
		icon: <ChatAltIcon />,
		link: '/contact',
	},
	{
		title: 'Connexion',
		icon: <LoginIcon />,
		link: '/api/auth/signin',
	},
];
