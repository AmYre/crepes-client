import { gql } from '@apollo/client';

export const GET_ORDER_SUCCESS = gql`
	query commande($id: ID) {
		commande(id: $id) {
			data {
				id
				attributes {
					order_id
					is_prepared
					is_payed
					preparation_time
					total
					products {
						quantity
						product_name
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
