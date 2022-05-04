import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = () => {
	const link = new HttpLink({
		uri: process.env.NEXT_PUBLIC_HOST_STRAPI,
		headers: {
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_HOST_TOKEN_API}`,
		},
	});

	return new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});
};

export default client;
