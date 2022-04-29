import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = () => {
	const link = new HttpLink({
		//uri: 'http://localhost:1337/graphql',
		uri: 'https://gentle-wave-45799.herokuapp.com/graphql',
		headers: {
			Authorization: 'Bearer 979a57e2fbdbd57f7327c42010f71ac5fda4ad4a7c342f25eac86905bb70d2c7c8945251fc8b19cb1770bada223c4a6bd43c68c20d57f51d2a84a236d19b6c7f808a7f8eb3d471cb938356a103f62f1541c9a6ab6560ca95b519e6042b2794ea21b8e9d4f109146533b735d89f37c8d16d5c3b946f9a0fec34a1330b86bc1868',
		},
	});

	return new ApolloClient({
		link,
		cache: new InMemoryCache(),
	});
};

export default client;
