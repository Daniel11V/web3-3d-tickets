import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
	query GetEvents {
		events {
			id
			name
			code
			logoUrl
		}
	}
`;

export const GET_TICKETS_BY_USER = gql`
	query GetTicketsByUser($userAddress: String!) {
		ticketsByUser(user: $userAddress) {
			id
			tokenId
			user
			event {
				id
				name
				logoUrl
				code
			}
		}
	}
`;
