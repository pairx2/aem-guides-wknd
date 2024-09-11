/**
 * @function
 * @desc generates formated GraphQL query for fetch-cart request
 * @param {Object} data add to cart options
 * @return {String} formated GraphQL query for add to cart
 */
function fetch(data) {
    var query = `{
        cart(cart_id: "${data.cartKey}") {
            success
            items {
                id
                product {
                    id
                    name
                    sku
                    size_or_weight
                    price
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
                aem_url
                dam_images
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
    var query = `mutation
    {
        addSimpleProductsToCart( input: {
        cart_id: "${data.cartID}"
            cart_items: [{
                data: {
                    quantity: ${data.prodInfo.qty || 1}
                    sku: "${data.prodInfo.sku}"
                    aw_sarp2_subscription_type: ${data.prodInfo.aw_sarp2_subscription_type}
                }
            }]
        })
        {
            cart {
                success
                items {
                    id
                    product {
                        id
                        name
                        sku
                        size_or_weight
                        stock_status
                        price
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
                    aem_url
                    dam_images
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
            items {
                id
                product {
                    id
                    name
                    sku
                    size_or_weight
                    stock_status
                    price
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
                aem_url
                dam_images
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
    addItem,
    deleteItem,
    merge
};

export default graphQLQuery;