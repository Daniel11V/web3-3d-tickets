import { gql } from "@apollo/client";

export const CREATE_TICKET = gql`
	mutation CreateTicket($user: String!, $event: String!, $tokenId: String!) {
		createTicket(user: $user, event: $event, tokenId: $tokenId) {
			id
			user
			tokenId
			event {
				id
				name
			}
		}
	}
`;
