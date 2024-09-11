export const buildSetUnitMeasurementSchema = (cartId, payload) => `
    mutation {
        adcSetUnitOfMeasurementInCart(cart_id: "${cartId}", uom: "${payload}") {
            success {
                code
                message
            }
        }
    }
`;