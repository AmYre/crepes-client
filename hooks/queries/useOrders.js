import { useQuery, gql } from '@apollo/client';

export const GET_ORDER = gql`
	query getOrders($sort: [String], $limit: Int, $start: Int, $eq: Boolean) {
		commandes(
			sort: $sort
			pagination: { limit: $limit, start: $start }
			filters: { is_prepared: { eq: $eq } }
		) {
			data {
				id
				attributes {
					order_id
					is_prepared
					is_payed
					preparation_time
					total
					updatedAt
					products {
						id
						quantity
						product_name
						category_name
						price
						supplement_list {
							id
							name
							price
						}
					}
				}
			}
		}
	}
`;

export const useOrders = () => {
	const { loading, error, data, refetch } = useQuery(GET_ORDER);
	return { loading, error, data, refetch };
};
