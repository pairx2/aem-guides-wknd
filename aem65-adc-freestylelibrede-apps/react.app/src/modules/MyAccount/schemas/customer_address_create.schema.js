export const buildCustomerAddressCreateSchema = ({rss_result_code, missing_verification, is_blacklisted, country_id, prefix, firstname, lastname, postcode, street, city, address_label, default_shipping, default_billing}) => `
mutation {
    adcCustomerAddressCreate (input:{
        country_id: "${country_id}"
        prefix: "${prefix}"
        firstname: "${firstname}"
        lastname: "${lastname}"
        postcode: "${postcode}"
        street: ${JSON.stringify(street)}
        city: "${city}"
        address_label: "${address_label}"
        default_shipping: ${default_shipping}
        default_billing: ${default_billing}
        rss_result_code: "${rss_result_code}"
        missing_verification: ${missing_verification}
        is_blacklisted: ${is_blacklisted}
        telephone: ""
    }) {
        success {
            code
            message
        }
    }
}
`;

