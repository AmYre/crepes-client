import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
	{
		crepes {
			data {
				attributes {
					price
					name
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
`;

export const useMenuList = () => {
	const { loading, error, data } = useQuery(GET_PRODUCTS);
	return { loading, error, data };
};
