var globalCartFlag = true;
var ajaxContentType =  "application/json";
var fieldLoaderAddToCart = jQuery(".field-loader.field-loader-addtocart-call");
var globalErrorTemp = jQuery("#template.global-error p");
var miniCartCountBadge;
var miniCartSubtotalPrice;
var miniCartSubtotalDiscountPrice;
var miniCartTotalPrice;
jQuery(document).ready(function() {
  getCartBySession();
});
function generateRecentOrderQuery() {
  var query =
    "query { recentlyPurchasedProducts { id name sku meta_title is_saleable aw_sarp2_subscription_type url }}";
  query = JSON.stringify({
    query: query
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
    query: query
  });
  return ABBOTT.utils.formatGraphQLQuery(query);
}

/**
 * @function
 * @desc generates formated GraphQL query for fetch-cart request
 * @param {Object} data add to cart options
 * @return {String} formated GraphQL query for add to cart
 */
function fetchCartItem(data) {
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
    query: query
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
    query: query
  });

  return ABBOTT.utils.formatGraphQLQuery(query);
}

function updateItemCount(id, qty) {
  const prodInfo = {
    quantity: qty,
    prodId: id
  };


  const ajaxObj = {
    url: ABBOTT.config.getEndpointUrl("GRAPH_QL"),
    method: "POST",
    contentType: ajaxContentType,
    headers: {
      Store: ABBOTT.config.storeName
    }
  };
  let cartKey = null;
  if (ABBOTT.utils.isUserLoggedIn()) {
    ajaxObj.headers.Authorization =
      "Bearer " + ABBOTT.utils.getMagentoSessionToken();
  }
  cartKey = ABBOTT.utils.getCartKey();

  if (cartKey) {
    ajaxObj.data = updateItem({ cartKey, prodInfo });
    makeAjaxCall(ajaxObj).always(() => {
      jQuery("#overlay").hide();
    });
  }
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
    query: query
  });

  return ABBOTT.utils.formatGraphQLQuery(query);
}

function getCartBySession() {
  const cartKey = ABBOTT.utils.getCartKey();

  if (cartKey) {
    fetchCart(cartKey);
  }
}
/**
 * @function
 * @desc Fetch from Cart and Update CartData
 */
function fetchCart(cartKey) {
  if (cartKey !== "" && cartKey !== undefined) {
    fieldLoaderAddToCart.show();
    const ajaxObj = {
      url: ABBOTT.config.getEndpointUrl("GRAPH_QL"),
      method: "POST",

      contentType: ajaxContentType,
      headers: {
        Store: ABBOTT.config.storeName
      },

      data: fetchCartItem({ cartKey })
    };
    if (ABBOTT.utils.isUserLoggedIn()) {
      ajaxObj.headers.Authorization =
        "Bearer " + ABBOTT.utils.getMagentoSessionToken();
    }

    makeAjaxCall(ajaxObj).always(() => {
      jQuery("#overlay").hide();
      fieldLoaderAddToCart.hide();
    });
  }
}

/**
 * @function
 * @desc creates Empty Cart for the session and returns the cartID
 */
function createECart() {
  fieldLoaderAddToCart.show();
  const ajaxObj = {
    url: ABBOTT.config.getEndpointUrl("GRAPH_QL"),
    method: "POST",
    contentType: ajaxContentType,
    headers: {
      Store: ABBOTT.config.storeName
    },
    data: createEmptyCart()
  };

  return ABBOTT.http
    .makeAjaxCall(ajaxObj)
    .done(res => {
      var cookieConfig = {
        path: "/",
        domain: "similac.com"
      };
      ABBOTT.cookie("abt_cartKey", res.data.createEmptyCart, cookieConfig);
      return res;
    })
    .fail(function() {
      globalErrorTemp.html(getMessageForReg("GEN_ERR"));

      jQuery("#template").show();
    })
    .always(function() {
      fieldLoaderAddToCart.hide();
    });
}

function setPurchaserType(array_subscription_length) {
  if (array_subscription_length > 0) {
    window.localStorage.setItem("purchaser_type", "subscription_user");
  } else {
    window.localStorage.removeItem("purchaser_type");
  }
}

/**
 * @function
 * @desc Make ajax call to Delete item from Cart
 * @param {object} id
 * @param {*} qty
 */
function deleteItemCount(id, length) {
  const prodInfo = {
    prodId: id
  };
  const array_subscription = [];
  const ajaxObj = {
    url: ABBOTT.config.getEndpointUrl("GRAPH_QL"),
    method: "POST",
    contentType: ajaxContentType,
    headers: {
      Store: ABBOTT.config.storeName
    }
  };

  let cartKey = null;
  if (ABBOTT.utils.isUserLoggedIn()) {
    ajaxObj.headers.Authorization =
      "Bearer " + ABBOTT.utils.getMagentoSessionToken();
  }
  cartKey = ABBOTT.utils.getCartKey();
  if (cartKey) {
    ajaxObj.data = deleteItem({ cartKey, prodInfo });
    makeAjaxCall(ajaxObj)
      .then(function(res) {
        const cartDataEcom = res.data.removeItemFromCart.cart.items;
        jQuery("#" + id).remove();
        if (cartDataEcom.length > 0) {
          miniCartCountBadge.text(length);
          miniCartCountBadge.show();
        } else {
          miniCartCountBadge.hide();
        }
        cartDataEcom.map(function(item) {
          if (item.subscription_details !== null) {
            array_subscription.push(item.subscription_details);
          }
        });

        setPurchaserType(array_subscription.length);
      })
      .always(() => {
        jQuery("#overlay").hide();
      });
  }
}

/**
 * @function
 * @desc A function to make ajax call and update Cart Data
 * @param {object} ajaxObj Configurations to make call.
 */
function makeAjaxCall(ajaxObj) {
  fieldLoaderAddToCart.show();
  return ABBOTT.http
    .makeAjaxCall(ajaxObj)
    .done(function(res) {
      fieldLoaderAddToCart.hide();
      if (res.errors) {
        const resErrorMessage = res.errors[0].message;
        const cookieConfig = {
          path: "/",
          domain: "similac.com"
        };
       
        // When un-associated cart ID found, remove cart ID and dont show the message
        if (!!resErrorMessage.match(/could not find a cart with id/gi)) {
          ABBOTT.removeCookie("abt_cartKey", cookieConfig);
          return;
        } else if (
          !!resErrorMessage.match(
            /the current user cannot perform operations on cart/gi
          )
        ) {
          globalErrorTemp.html(getMessageForReg("GEN_ERR"));
          jQuery("#template").show();
         
          return;
        } else if (!!resErrorMessage.match(/Cart doesn't contain the/gi)) {
          globalErrorTemp.html(getMessageForReg("GEN_ERR"));
          jQuery("#template").show();
         
        }

        // Show if there is any other Error
       
      }
      if (res.data.cart || res.data.mergeCarts) {
        setCartDetails(res.data.cart || res.data.mergeCarts);
      } else if (res.data.removeItemFromCart) {
        setCartDetails(res.data.removeItemFromCart.cart, "itemRemoved");
      } else if (res.data.updateCartItems) {
        setCartDetails(res.data.updateCartItems.cart, "itemUpdated");
      }
    })
    .always(function() {
      fieldLoaderAddToCart.hide();
    });
}
/**
 * @function
 * @description Set Cart Data and Impose Cart Limits
 * @param {object} cartDetails to be set.
 */
function setCartDetails(cartData, status) {
  var cartHasData = cartData && cartData.items && cartData.items.length > 0;
  var cartLengthZero = cartData && cartData.items && cartData.items.length === 0;
  miniCartCountBadge = jQuery(".minicart-logo__badge");
  miniCartSubtotalPrice =  jQuery(".minicart-footer-subtotal-price.subtotal");
  miniCartSubtotalDiscountPrice = jQuery(".minicart-footer-subtotal-price.discount");
  miniCartTotalPrice = jQuery(".minicart-footer-subtotal-price.totalprice");
  if (cartHasData) {
    jQuery(".minicart-empty").hide();
    jQuery(".minicart-footer").show();
    miniCartCountBadge.text(cartData.items.length);
    miniCartCountBadge.show();
  } else if (!cartData || !cartData.items || cartData.items.length === 0) {
    jQuery(".minicart-empty").show();
    jQuery(".minicart-footer").hide();
  }
  else if (cartLengthZero) {
    miniCartCountBadge.hide();
  }

  cartHasData &&
  status === undefined
    ? addNewItemToCart(cartData)
    : itemUpdated(cartData, status);
}


function addNewItemToCart(cartData){
  var defaultImageUrl = jQuery("#aem-default-image-url").val();
  cartData.items.map((item) => {
    const prod_img = item.dam_images ? item.dam_images : defaultImageUrl;
    const product_name = item.product.meta_title || item.product.name;
    jQuery('#cartListItem .minicart-item').attr('id', item.id);
    jQuery('#cartListItem a.product-image').attr('href', item.aem_url);
    jQuery('#cartListItem a.product-image img').attr('src', prod_img);
    jQuery('#cartListItem a.product-image img').attr('alt', item.product.image.label);
    jQuery('#cartListItem a.product-title').attr('href', item.aem_url);
    jQuery('#cartListItem a.product-title').text(product_name);
    
    jQuery('#cartListItem input.cart-qty').val(item.quantity);
    jQuery('#cartListItem input.cart-qty').attr('type','number');
    jQuery('#cartListItem span.product-price').text('$'+item.prices.price.value.toFixed(2));
    
    jQuery('#cartListItem  #'+item.id+ ' .product-remove').attr('onclick', 'decreaseCount('+item.id+', '+cartData.items.length+','+true+')');
    jQuery('#cartListItem #'+item.id+ ' .decrease-item').attr('onclick', 'decreaseCount('+item.id+', '+cartData.items.length+')');
    jQuery('#cartListItem #'+item.id+ ' .add-item').attr('onclick', "increaseCount("+item.id+", "+item.quantity+")");

    var mt = jQuery('#cartListItem').html();

    jQuery(".minicart-products-list").append(mt);
    miniCartSubtotalPrice.text(
      "$" + cartData.prices.subtotal_excluding_tax.value.toFixed(2)
    );
    

    if (cartData.prices.discounts && cartData.prices.discounts.length) {
      var totalprice = cartData.prices.grand_total.value.toFixed(
        2
      );
      var discount = cartData.prices.discounts[0].amount.value.toFixed(2);
      var sub_label = cartData.prices.discounts[0].label;
      updateDiscounts(discount, totalprice, sub_label);
    } else {
      hideDiscount();
    }
    if (item.subscription_details) {
      jQuery("#" + item.id + " .minicart-subscription").show();
      item.subscription_details.map((sd) => {
        var sdd = `<span>${sd.option_label}</span>${" "}<span>${
          sd.option_value
        }</span><br/>`;
        jQuery("#" + item.id + " .minicart-subscription").append(sdd);
      });
    }
  })
}

function updatedCartAction(cartData, isUpdated = false){
  cartData.items.map((item, index) => {
    if(isUpdated === true){
      jQuery("#" + item.id + " input").attr("value", item.quantity);
    }
    jQuery("#" + item.id +" .product-price").text('$'+item.prices.price.value.toFixed(2));
  });
  miniCartSubtotalPrice.text(
    "$" + cartData.prices.subtotal_excluding_tax.value.toFixed(2)
  );
  if (cartData.prices.discounts && cartData.prices.discounts.length) {
    const totalprice = cartData.prices.grand_total.value.toFixed(2);
    const discount = cartData.prices.discounts[0].amount.value.toFixed(2);
    const sub_label = cartData.prices.discounts[0].label;
    updateDiscounts(discount, totalprice, sub_label);
  } else {
    hideDiscount();
  }
}

function itemUpdated(cartData, status) {
  if (status === "itemRemoved") {
    updatedCartAction(cartData);
  } else if (status === "itemUpdated") {
    updatedCartAction(cartData, true);
  }
}

function decreaseCount(id, count, removed) {
  if (
    parseInt(jQuery("#" + id + " input").attr("value")) - 1 === 0 ||
    removed
  ) {
    deleteItemCount(id, count);
  } else {
    updateItemCount(
      id,
      parseInt(jQuery("#" + id + " input").attr("value")) - 1
    );
  }
}

function increaseCount(id) {
  updateItemCount(id, parseInt(jQuery("#" + id + " input").attr("value")) + 1);
}

function updateDiscounts(discount, totalprice, sub_label) {
  miniCartSubtotalDiscountPrice.text("-$" + discount);
  jQuery(".minicart-footer-subtotal-label-sub").text("("+sub_label+")");
  miniCartTotalPrice.text("$" + totalprice);
  miniCartSubtotalDiscountPrice.show();
  miniCartTotalPrice.show();
  jQuery(".discount_label").show();
  jQuery(".totalprice_label").show();
}

function hideDiscount() {
  miniCartSubtotalDiscountPrice.hide();
  miniCartTotalPrice.hide();
  jQuery(".discount_label").hide();
  jQuery(".totalprice_label").hide();
}