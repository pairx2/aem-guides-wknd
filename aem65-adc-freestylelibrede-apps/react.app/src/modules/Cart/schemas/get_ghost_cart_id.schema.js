export const GET_GHOST_CART_ID_SCHEMA = `
mutation {
	adcInitWebRxCart {
		success {
			code
			message
		}
		cart {
			id
			rxmc_number
		}
	}
}`;