import {cart} from './cart_structure_variables';

export const buildUpdateProductSchema = (cartId, itemId, quantity) => `
  mutation {
        adcCartItemsUpdate(cart_id: "${cartId}", input: {
            cart_items: [
                {item_id: ${itemId}, qty: ${quantity}}
            ]}
        ) {
        ${cart}
        }
    }
`;