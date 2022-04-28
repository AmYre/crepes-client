import { gql } from '@apollo/client';

export const DELETE_ORDER = gql`
	mutation deleteCommande($id: ID!) {
		deleteCommande(input: { where: { id: $id } }) {
			commande {
				client_name
				price
				table_number
				product_name
				category_name
			}
		}
	}
`;
