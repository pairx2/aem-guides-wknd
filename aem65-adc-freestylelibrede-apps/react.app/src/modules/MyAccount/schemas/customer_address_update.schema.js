export const buildCustomerAddressUpdateSchema = (address_id, {rss_result_code, missing_verification, is_blacklisted, country_id, prefix, firstname, lastname, postcode, street, city, address_label, default_shipping, default_billing}) => `
	mutation {
        adcCustomerAddressUpdate(id: ${address_id}, input: {
            country_id: "${country_id}"
            prefix: "${prefix}"
            firstname: "${firstname}"
            lastname: "${lastname}"
            postcode: "${postcode}"
            street: ${JSON.stringify(street)}
            city: "${city}"
            address_label: "${address_label}"
            rss_result_code: "${rss_result_code}"
            missing_verification: ${missing_verification}
            is_blacklisted: ${is_blacklisted}
            default_shipping: ${!!default_shipping}
            default_billing: ${!!default_billing}
            telephone: ""
        }) {
            success {
            	code
            	message
            }
        }
    }
`;