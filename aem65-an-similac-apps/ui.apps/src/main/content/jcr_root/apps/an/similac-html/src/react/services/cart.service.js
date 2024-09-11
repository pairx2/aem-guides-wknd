function generateRecentOrderQuery() {
  var query =
    "query { recentlyPurchasedProducts { id name sku meta_title is_saleable aw_sarp2_subscription_type url }}";
    query = JSON.stringify({
      query: query,
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
    query: query,
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
  var subscription = data.prodInfo.aw_sarp2_subscription_type;
  var subscriptionQuery = "";
  var customizable_options = "";

  if (subscription) {
    subscriptionQuery = `aw_sarp2_subscription_type: ${data.prodInfo.aw_sarp2_subscription_type}`;
  }

  if (data.prodInfo.customizable_options) {
    customizable_options = `customizable_options: [{
            id: ${data.prodInfo.customizable_options.id}
            value_string: "${data.prodInfo.customizable_options.value_string}"
        }]`;
  }
  var cartItemsQuery = "";
  if (data.prodInfo.length > 0) {
    var items = data.prodInfo.map((element) => {
      return ` {data: {
           quantity: ${element.qty || 1}
           sku: "${element.sku}"
           ${
             element.aw_sarp2_subscription_type !== undefined
               ? `aw_sarp2_subscription_type:${element.aw_sarp2_subscription_type}`
               : ``
           }
       }}`;
    });
    cartItemsQuery = ` [
     ${items}
  ]`;
  } else {
    cartItemsQuery = ` [{
    data: {
        quantity: ${data.prodInfo.qty || 1}
        sku: "${data.prodInfo.sku}"
        ${subscriptionQuery}
    }
    ${customizable_options}
}]`;
  }

  var query = `mutation
    {
        addSimpleProductsToCart( input: {
            cart_id: "${data.cartKey}"
            cart_items: ${cartItemsQuery}
        })
        {
            cart {
                success
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
                        meta_title
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
                }
                prices {
                    subtotal_excluding_tax {
                        value
                        currency
                    }
                    discounts { 
                      amount { value } 
                      label  
                    } 
                    grand_total { 
                      value 
                    }
                }
            }
        }
    }`;

  query = JSON.stringify({
    query: query,
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
                    meta_title
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
            }
            prices {
              subtotal_excluding_tax {
                value
                currency
            }
            discounts { 
              amount { value } 
              label  
            } 
            grand_total { 
              value 
            }
            }
        }
    }`;

  query = JSON.stringify({
    query: query,
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
        cart_id: "${data.cartKey}"
        cart_item_id: ${data.prodInfo.prodId}
        })
        {
        cart {
            success
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
                meta_title
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
            }
            prices {
              subtotal_excluding_tax {
                value
                currency
            }
            discounts { 
              amount { value } 
              label  
            } 
            grand_total { 
              value 
            }
            }
        }
        }
    }`;

  query = JSON.stringify({
    query: query,
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
        cart_id: "${data.cartKey}"
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
                meta_title
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
            }
            prices {
              subtotal_excluding_tax {
                value
                currency
            }
            discounts { 
              amount { value } 
              label  
            } 
            grand_total { 
              value 
            }
            }
        }
        }
    }`;

  query = JSON.stringify({
    query: query,
  });

  return ABBOTT.utils.formatGraphQLQuery(query);
}

let cartGraphQLQuery = {
  createEmptyCart,
  fetch,
  addItem,
  deleteItem,
  updateItem,
  generateRecentOrderQuery,
};
export default cartGraphQLQuery;
