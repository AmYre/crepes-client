import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
	mutation createCommande($order_id: Int, $total: Float, $is_payed: Boolean) {
		createCommande(
			data: { order_id: $order_id, total: $total, is_payed: $is_payed }
		) {
			data {
				id
				attributes {
					order_id
					total
					is_payed
				}
			}
		}
	}
`;
