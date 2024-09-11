/**
 * @function
 * @desc generates formated GraphQL query for merge-cart request
 * @param {Object} data add to cart keys
 * @return {String} formated GraphQL query for merge cart
 */
function merge(data) {
    var query = `mutation {
        mergeCarts(
            source_cart_id: "${data.source}", 
            destination_cart_id: "${data.destination}"
        ) {
            success
            shipping_message{
                message
                percentage
                status
            }
            items {
                id
                subscription_details {
                    option_label
                    option_value
                }
                product {
                    sku
                    stock_status
                    price
                    name
                    image {
                        url
                        label
                    }
                    categories {
                        name
                    }
                    brand
                    product_form
                    product_flavor
                    case_of_product
                }
                quantity
                prices {
                    price {
                      value
                    }
                }
                aem_url
                dam_images
                backorder_status
                flavors
                size
            }
            prices {
                subtotal_excluding_tax {
                    value
                    currency
                }
            }
        }
    }`;

    query = JSON.stringify({
        query:query
    });

    return ABBOTT.utils.formatGraphQLQuery(query);
}

/**
 * @function
 * @desc generates formated GraphQL query for fetch-cart request
 * @param {Object} data add to cart options
 * @return {String} formated GraphQL query for add to cart
 */
function fetch(data) {
    var query = `{
        cart(cart_id:"${data.cartKey}")
        {
            success
            shipping_message{
                message
                percentage
                status
            }
            items {
                id
                subscription_details {
                    option_label
                    option_value
                }
                product {
                    sku
                    stock_status
                    price
                    name
                    image {
                        url
                        label
                    }
                    categories {
                        name
                    }
                    brand
                    product_form
                    product_flavor
                    case_of_product
                }
                quantity
                prices {
                    price {
                      value
                    }
                }
                aem_url
                dam_images
                backorder_status
                flavors
                size
            }
            prices {
                subtotal_excluding_tax {
                    value
                    currency
                }
            }
        }
    }`;

    query = JSON.stringify({
        query:query
    });

    return ABBOTT.utils.formatGraphQLQuery(query);
}

/**
 * @function
 * @desc generates formated GraphQL query for Add-to-cart request
 * @param {Object} data add to cart options
 * @return {String} formated GraphQL query for add to cart
 */
function addItem(data) {
    data.prodInfo = JSON.parse(data.prodInfo);
    var subscription = data.prodInfo.aw_sarp2_subscription_type;
    var subscriptionQuery = '';
    var customizable_options = '';

    if(subscription){
        subscriptionQuery = `aw_sarp2_subscription_type: ${data.prodInfo.aw_sarp2_subscription_type}`;
    }

    if(data.prodInfo.customizable_options) {
        customizable_options = `customizable_options: [{
            id: ${data.prodInfo.customizable_options.id}
            value_string: "${data.prodInfo.customizable_options.value_string}"
        }]`;
    }

    var query = `mutation
    {
        addSimpleProductsToCart( input: {
            cart_id: "${data.cartID}"
            cart_items: [{
                data: {
                    quantity: ${data.prodInfo.qty || 1}
                    sku: "${data.prodInfo.sku}"
                    ${subscriptionQuery}
                }
                ${customizable_options}
            }]
        })
        {
            cart {
                success
                shipping_message{
                    message
                    percentage
                    status
                }
                items {
                    subscription_details {
                        option_label
                        option_value
                    }
                    id
                    product {
                        sku
                        special_price
                        stock_status
                        price
                        name
                        image {
                            url
                            label
                        }
                        categories {
                            name
                        }
                        brand
                        product_form
                        product_flavor
                        case_of_product
                    }
                    quantity
                    prices {
                        price {
                          value
                        }
                    }
                    aem_url
                    dam_images
                    backorder_status
                    flavors
                    size
                }
                prices {
                    subtotal_excluding_tax {
                        value
                        currency
                    }
                }
            }
        }
    }`;

    query = JSON.stringify({
        query:query
    });

    return ABBOTT.utils.formatGraphQLQuery(query);
}

/**
 * @function
 * @desc generates formated GraphQL query for Add-to-cart request
 * @param {Object} data add to cart options
 * @return {String} formated GraphQL query for add to cart
 */
function updateItem(data) {
    var query = `mutation
    {
        updateCartItems( input: {
        cart_id: "${data.cartID}"
        cart_items: [
            {
                quantity: ${data.prodInfo.quantity}
                cart_item_id: ${data.prodInfo.prodId}
            }
        ]
        })
        {
        cart {
            success
            shipping_message{
                message
                percentage
                status
            }
            items {
            id
            subscription_details {
                option_label
                option_value
            }
            product {
                sku
                stock_status
                price
                name
                image {
                    url
                    label
                }
                categories {
                    name
                }
                brand
                product_form
                product_flavor
                case_of_product
            }
            quantity
            prices {
                price {
                  value
                }
            }
            aem_url
            dam_images
            backorder_status
            flavors
            size
            }
            prices {
                subtotal_excluding_tax {
                    value
                    currency
                }
            }
        }
        }
    }`;

    query = JSON.stringify({
        query:query
    });

    return ABBOTT.utils.formatGraphQLQuery(query);
}

/**
 * @function
 * @desc generates formated GraphQL query for Add-to-cart request
 * @param {Object} data add to cart options
 * @return {String} formated GraphQL query for add to cart
 */
function deleteItem(data) {
    var query = `mutation
    {
        removeItemFromCart( input: {
        cart_id: "${data.cartID}"
        cart_item_id: ${data.prodInfo.prodId}
        })
        {
        cart {
            success
            shipping_message{
                message
                percentage
                status
            }
            items {
            id
            subscription_details {
                option_label
                option_value
            }
            product {
                sku
                stock_status
                price
                name
                image {
                    url
                    label
                }
                categories {
                    name
                }
                brand
                product_form
                product_flavor
                case_of_product
            }
            quantity
            prices {
                price {
                  value
                }
            }
            aem_url
            dam_images
            backorder_status
            flavors
            size
            }
            prices {
                subtotal_excluding_tax {
                    value
                    currency
                }
            }
        }
        }
    }`;

    query = JSON.stringify({
        query:query
    });

    return ABBOTT.utils.formatGraphQLQuery(query);
}

/**
 * @function
 * @desc generates formated GraphQL query for create-empty-cart request
 */
function createEmptyCart() {
    var query = "mutation { createEmptyCart }";

    query = JSON.stringify({
        query:query
    });

    return ABBOTT.utils.formatGraphQLQuery(query);
}

let graphQLQuery = {
    createEmptyCart,
    fetch,
    merge,
    addItem,
    updateItem,
    deleteItem,
};

export default graphQLQuery;