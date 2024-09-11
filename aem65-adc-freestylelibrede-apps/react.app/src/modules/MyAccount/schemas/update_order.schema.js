export const buildUpdateOrderSchema = ({order_id, order_type, address_type, address_id, set_as_default, prefix, firstname, lastname, postcode, country_id, city, street, rssResultCode, isBlacklisted, isVerified}) => {
	if (address_id) {
		return `
            mutation {
                adcOrderAddressUpdate(order_id: "${order_id}", order_type: "${order_type}", input: {
                    address_type: "${address_type}",
                    address_id: ${address_id},
                    set_as_default: ${set_as_default},
                    rss_result_code: "${rssResultCode}",
                    is_blacklisted: ${isBlacklisted},
                    is_verified: ${isVerified}
                }) {
                    success {
                        code
                        message
                    }
                    order {
                        increment_id
                    }
                }
            }
        `;
	} else {
		return `
            mutation {
                adcOrderAddressUpdate(order_id: "${order_id}", order_type: "${order_type}", input: {
                    address_type: "${address_type}",
                    set_as_default: ${set_as_default},
                    address: {
                        prefix: "${prefix}",
                        firstname: "${firstname}",
                        lastname: "${lastname}",
                        postcode: "${postcode}",
                        country_id: "${country_id}",
                        city: "${city}",
                        street: ${JSON.stringify(street)}
                    },
                    rss_result_code: "${rssResultCode}",
                    is_blacklisted: ${isBlacklisted},
                    is_verified: ${isVerified}
                }) {
                    success {
                        code
                        message
                    }
                    order {
                        increment_id
                    }
                }
            }
        `;
	}
};
