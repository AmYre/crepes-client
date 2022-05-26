import Head from 'next/head';
import Crepes from '../components/Crepes';
import BottomBar from '../components/BottomBar';

export default function Home() {
	return (
		<>
			<Head>
				<title>A Vos Crêpes !</title>
				<link rel='icon' href='/favi.png' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
				<link href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet' />
			</Head>
			<main className='w-screen h-screen font-comfortaa text-white flex flex-col bg-home bg-cover'>
				<nav className='flex flex-row items-center justify-between'>
					<img src='/logo.png' className='w-40 pl-4' />
					<img src='/cart.png' className='pr-8 w-16' />
				</nav>
				<section className='pb-28 overflow-scroll'>
					<Crepes />
				</section>
				<BottomBar />
			</main>
		</>
	);
}
