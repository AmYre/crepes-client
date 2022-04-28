import Head from 'next/head';
import Cart from '../components/Cart.js';
import Menu from '../components/Menu';
import BottomBar from '../components/BottomBar';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export default function Home({ data }) {
	return (
		<>
			<Head>
				<title>A Vos Crêpes !</title>
				<link rel='icon' href='/favi.png' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
				<link href='https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' rel='stylesheet' />
			</Head>
			<main className='font-comfortaa text-white h-screen flex flex-col justify-center items-center bg-home bg-cover'>
				<img src='/logo.png' className='absolute left-0 top-0 w-40 pl-4' />
				<Cart />
				<section className='h-full mt-52'>
					<Menu data={data} />
				</section>
				<BottomBar />
			</main>
		</>
	);
}

export async function getServerSideProps(context) {
	const client = new ApolloClient({
		uri: `${process.env.HOST_STRAPI}`,
		cache: new InMemoryCache(),
	});

	const { data } = await client.query({
		query: gql`
			query Foods {
				crepesSucrees {
					data {
						attributes {
							category_name
							price
							product_name
							preparation_time
							image {
								data {
									attributes {
										url
										width
										height
									}
								}
							}
						}
					}
				}
				boissons {
					data {
						attributes {
							category_name
							product_name
							price
							image {
								data {
									attributes {
										url
										width
										height
									}
								}
							}
						}
					}
				}
				supplements {
					data {
						id
						attributes {
							name
							price
						}
					}
				}
			}
		`,
	});

	return {
		props: {
			data: data,
		},
	};
}
