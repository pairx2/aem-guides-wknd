export const buildDeleteOrderAddressSchema = address_id => `
	mutation {
        adcCustomerAddressDelete(id: ${address_id}) {
            success {
            	code
            	message
            }
        }
    }
`;