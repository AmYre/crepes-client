import Head from 'next/head';
import Cart from '../components/Cart.js';
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
			<main className='font-comfortaa text-white h-screen flex flex-col justify-center items-center bg-home bg-cover'>
				<img src='/logo.png' className='absolute left-0 top-0 w-40 pl-4' />
				<Cart />
				<section className='h-full mt-52'>
					<Crepes />
				</section>
				<BottomBar />
			</main>
		</>
	);
}
