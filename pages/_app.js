import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
// import Navbar from '../components/navbar';
import { AppProvider } from '../context/Context';
import 'tailwindcss/tailwind.css';
import { ApolloProvider } from '@apollo/client';
import client from '../hooks/apollo/apollo-client';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<ApolloProvider client={client()}>
				<SessionProvider>
					<ThemeProvider enableSystem={true} attribute="class">
						<Component {...pageProps} />
					</ThemeProvider>
				</SessionProvider>
			</ApolloProvider>
		</AppProvider>
	);
}

export default MyApp;
