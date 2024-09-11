export const buildDeleteProductSchema = (cartId, id) => `
	mutation {
        adcCartItemDelete(cart_id: "${cartId}", cart_item_id: ${id}) {
            success {
            	code
            	message
			}
        }
    }
`;