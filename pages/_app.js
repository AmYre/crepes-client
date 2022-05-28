import { AppProvider } from '../context/Context';
import { ApolloProvider } from '@apollo/client';
import client from '../hooks/apollo/apollo-client';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<ApolloProvider client={client()}>
				<Component {...pageProps} />
			</ApolloProvider>
		</AppProvider>
	);
}

export default MyApp;
