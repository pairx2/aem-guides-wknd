import {cart} from './cart_structure_variables';

export const buildSetShippingAddressOnCartSchema = (cartId, {id, address_label, city, prefix, firstname, lastname, street, postcode, country_id, default_shipping, default_billing}, save, code, isBlacklisted, isVerified) => {
	const returnCode = `
		rss_result_code: "${code}"
	`;
	if (id) {
		return `
			mutation {
			  adcSetShippingAddressOnCart(input: {
				cart_id: "${cartId}"
				id: ${id}
				${code ? returnCode : ''}
				is_blacklisted: ${isBlacklisted}
				missing_verification: ${!isVerified}
			  }) {
				success {
				  code
				  message
				}
				${cart}
			}
		  }
		`;
	} else {
		return `
			mutation {
			  adcSetShippingAddressOnCart(input: {
				cart_id: "${cartId}"
				address: {
					address_label: "${address_label}",
					city: "${city}",
					prefix: "${prefix}",
					firstname: "${firstname}",
					lastname: "${lastname}",
					street: ${JSON.stringify(street)},
					postcode: "${postcode}",
					country_id: "${country_id}",
					default_shipping: ${default_shipping},
					default_billing: ${default_billing}
				}
				${code ? returnCode : ''}
				is_blacklisted: ${isBlacklisted}
				missing_verification: ${!isVerified}
				save_in_address_book: ${!!save}
			  }) {
				success {
				  code
				  message
				}
				${cart}
			}
		  }
		`;
	}
};