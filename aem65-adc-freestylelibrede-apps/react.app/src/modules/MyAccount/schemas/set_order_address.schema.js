export const buildSetOrderAddressSchema = (addressID, shipping, billing) => `
	mutation {
        adcCustomerAddressUpdate(id: ${addressID}, input: {
            default_shipping: ${shipping}
            default_billing: ${billing}
        }) {
            success {
            	code
            	message
            }
        }
    }
`;