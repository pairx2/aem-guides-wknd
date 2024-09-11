const product = `
    product {
        sku
        name
        min_sale_qty
        max_sale_qty
        uom
        is_subscription
        cs_product_short_name
        product_type
        product_version
    }
`;
const price = `
    price {
        value
        currency
    }
    item_price {
        value
        currency
    }
`;
const bundle_options = `
	bundle_options {
		id
		label
		values {
			id
			label
			quantity
			price
		}
	}
`;
export const items = `
    items {
        id
        qty
        delivery_date
        ${price}
		${product}
		${bundle_options}
    }
`;
const selected_shipping_method = `
    selected_shipping_method {
        carrier_code
        method_code
        carrier_title
        amount {
            value
            currency
        }
    }
`;
const selected_payment_method = `
	selected_payment_method {
		code
		title
		payon_checkout_id
	}
`;
export const prices = `
    prices {
        grand_total{
            value
            currency
        }
        subtotal_including_tax {
            value
            currency
        }
        subtotal_excluding_tax {
            value
            currency
        }
        applied_taxes {
            amount {
                value
                currency
            }
            label
            tax_value
        }
        discount {
            value
            currency
        }
    }
`;
export const applied_coupon = `
    applied_coupon {
        code
    }`
;
const cartId = 'id';
const cart_address_atributes = `
    id
    prefix
    firstname
    lastname
    postcode
    country_id
    country_name
    city
    street
    telephone
    address_id
`;
const billing_address = `
    billing_address {
        ${cart_address_atributes}
    }
`;
const shipping_address = `
    shipping_address {
        ${cart_address_atributes}
    }
`;
export const cart = `
	warning_messages {
        code
        message
    }
    cart {
        ${cartId}
        ${items}
        ${applied_coupon}
        ${selected_shipping_method}
        ${selected_payment_method}
        ${prices}
        ${billing_address}
        ${shipping_address}
    }
`;
