import { gql } from '@apollo/client';

export const GET_ORDER_TIME = gql`
	query commandes {
		commandes(
			filters: { is_payed: { eq: true }, is_prepared: { eq: false } }
		) {
			data {
				id
				attributes {
					preparation_time
				}
			}
		}
	}
`;
