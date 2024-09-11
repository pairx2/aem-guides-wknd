export const buildGetProductPriceSchema = sku => `
  query {
    adcProductDetails(sku: "${sku}") {
        success {
            code
            message
        }
        product {
            id
            sku
            name
            uom
            max_sale_qty
            price
            tax_value
            min_sale_qty
            is_subscription
            cs_delivery_frequency
            product_type
            product_version
            cs_product_type
			first_delivery_date_after
			bundle_options {
				id
				label
				position
				values {
                    quantity
                    price
					id
				}
			}
        }
    }
}
`;