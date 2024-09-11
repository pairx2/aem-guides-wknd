import React, { useEffect } from "react";
import CartItem from './CartItem.jsx';
import CartEmpty from './CartEmpty.jsx';
import CartFooter from './CartFooter.jsx';
import graphQLQuery from './graphql-query.js';
import MessageBox from "./MessageBox.jsx";
import ShippingBanner from "./ShippingBanner.jsx";

const MiniCart = () => {

  // Creating REACT hooks
  const [cartData, setcartData] = React.useState({});
  const [cartStatus, setcartStatus] = React.useState(true);
  const [errorMessage, seterrorMessage] = React.useState('');
  const cartActionEl = document.getElementById('abbott-cart-action');

  // Use to render data only once
  useEffect(() => {
    getCartBySession();
  }, []);

  // Call updatePrice only on Grand-total Price update
  React.useEffect(() => {
    if(cartData && cartData.prices && cartData.prices.subtotal_excluding_tax) {
      updatePrice();
    }
  }, [cartData]);

  // Update Cart
  React.useEffect(() => {
    setcartData((prevState) => {return {...prevState,success:errorMessage}} );
    jQuery('.product-remove').removeClass('disabled');
  }, [errorMessage]);

  // Create mutation observer to listen change in element
  let cartObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if(mutation.type === 'attributes') {
        let actionFrom = JSON.parse(cartActionEl.dataset.product).actionFrom;
        if(actionFrom == "magento"){
            getCartBySession();
        }else{
            addToCart(cartActionEl.dataset.product);
        }
      }
    });
  });

  // Configure element to listen to attributes
  if(!cartActionEl.getAttribute('data-watch')) {
    cartActionEl.setAttribute('data-watch', true);
    cartObserver.observe(cartActionEl, {
      attributes: true
    });
  }

  /**
 * @function
 * @desc Make ajax call to Delete item from Cart
 * @param {object} id 
 * @param {*} qty 
 */
  const deleteItem = (id) => {
    let prodInfo = {
      prodId : id
    };

    let ajaxObj = {
      url : ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'store': ABBOTT.utils.storeName,
        'Authorization' : 'Bearer ' + ABBOTT.utils.getSessionToken()
      }
    }

    let cartID = ABBOTT.utils.getCartKey();

    if(!cartID) {
      createEmptyCart()
        .done(cart => {
          cartID = cart.data.createEmptyCart;
          ajaxObj.data = graphQLQuery.deleteItem({cartID, prodInfo});
          makeAjaxCall(ajaxObj)
        });
    } else {
      ajaxObj.data = graphQLQuery.deleteItem({cartID, prodInfo});
      makeAjaxCall(ajaxObj);
    }
  }

/**
 * @function
 * @desc Make ajax call to Update Cart item
 * @param {object} id 
 * @param {*} qty 
 */
  const updateItem = (id, qty) => {
    let prodInfo = {
      quantity : qty,
      prodId : id
    };

    let ajaxObj = {
      url : ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'store': ABBOTT.utils.storeName,
        'Authorization' : 'Bearer ' + ABBOTT.utils.getSessionToken()
      }
    }

    let cartID = ABBOTT.utils.getCartKey();

    if(!cartID) {
      createEmptyCart()
        .done(cart => {
          cartID = cart.data.createEmptyCart;
          ajaxObj.data = graphQLQuery.updateItem({cartID, prodInfo});
          makeAjaxCall(ajaxObj)
        });
    } else {
      ajaxObj.data = graphQLQuery.updateItem({cartID, prodInfo});
      makeAjaxCall(ajaxObj);
    }
  }

  /**
   * @function
   * @desc creates Empty Cart for the session and returns the cartID
   */
  const createEmptyCart = () => {
    return ABBOTT.http.makeAjaxCall({
      url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'store': ABBOTT.utils.storeName
      },
      data: graphQLQuery.createEmptyCart()
    })
    .done(res => {
      var cookieConfig = {
        path: '/',
        domain: 'abbottstore.com',
        secure: true
      };
      jQuery.cookie('abt_cartKey', res.data.createEmptyCart, cookieConfig);
      return res;
    });
  };

  /**
   * @function
   * @desc Make ajax call to Magento to Add Item to Cart
   * @param {object} prodInfo 
   */
  const addToCart = (prodInfo) => {
    let ajaxObj = {
      url : ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      xhrFields: {
        withCredentials: true
      },
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest'
        'Content-Type': 'application/json',
        'store': ABBOTT.utils.storeName,
        'Authorization' : 'Bearer ' + ABBOTT.utils.getSessionToken()
      }
    }

    let cartID = ABBOTT.utils.getCartKey();

    if(!cartID) {
      createEmptyCart()
        .done(cart => {
          cartID = cart.data.createEmptyCart;
          ajaxObj.data = graphQLQuery.addItem({cartID, prodInfo});
          makeAjaxCall(ajaxObj)
        });
    } else {
      ajaxObj.data = graphQLQuery.addItem({cartID, prodInfo});
      makeAjaxCall(ajaxObj);
    }
  }

  /**
   * @function
   * @desc Fetch cart based on below cases:
   * CASE: 1
   *    Scenario: User logged-in, it has new cartKey & default cart Key
   *    Action: Merge Cart, Set new-cart-key as default, remove new-cart-key
   * 
   * CASE: 2
   *    Scenario: User logged-in, it has new cartKey but not default cart Key
   *    Action: Set new-cart-key as default, remove new-cart-key, fetch cart with new-cart-key
   * 
   * CASE: 3
   *    Scenario: User logged-in, it does not have new cartKey but default cart Key exists
   *    Action: fetch cart with default-cart-key
   * 
   * CASE: 4
   *    Scenario: User not logged-in, it has default cartKey
   *    Action: fetch cart with default-cart-key
   * 
   * CASE: 5
   *    Scenario: User not logged-in, does not have any cart-key
   *    Action: Do nothing
   */
  function getCartBySession() {
    let cookieConfig = {
      path: '/',
      domain: 'abbottstore.com'
    };

    let cartKey = {
      default: ABBOTT.utils.getCartKey(),
      sessionBased: ABBOTT.utils.getCartKey('abt_sesCartKey')
    };

    if(ABBOTT.utils.isUserLoggedIn()) {

      if(cartKey.sessionBased && cartKey.default) {
        // CASE: 1
        mergeCartSession(cartKey.default, cartKey.sessionBased);
        jQuery.cookie('abt_cartKey', cartKey.sessionBased, cookieConfig);
        jQuery.removeCookie('abt_sesCartKey', cookieConfig);

      } else if (cartKey.sessionBased) {
        // CASE: 2
        fetchCart(cartKey.sessionBased);
        jQuery.cookie('abt_cartKey', cartKey.sessionBased, cookieConfig);
        jQuery.removeCookie('abt_sesCartKey', cookieConfig);

      } else if(cartKey.default) {
        // CASE: 3
        fetchCart(cartKey.default);
      }

    } else {

      if(cartKey.default) {
        // CASE: 4
        fetchCart(cartKey.default);
      }
    }
  }

  /**
   * @function
   * @desc merges the cart session after login from AEM to Magento
   * @param {String} source Old Cart Key 
   * @param {String} destination New Cart Key
   */
  function mergeCartSession(source, destination) {
    let ajaxObj = {
      url : ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'store': ABBOTT.utils.storeName,
        'Authorization' : 'Bearer ' + ABBOTT.utils.getSessionToken()
      },
      data: graphQLQuery.merge({ source, destination })
    }

    makeAjaxCall(ajaxObj);
  }

  /**
   * @function 
   * @desc Fetch from Cart and Update CartData 
   */
  function fetchCart(cartKey) {
    let ajaxObj = {
      url : ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'store': ABBOTT.utils.storeName,
        'Authorization' : 'Bearer ' + ABBOTT.utils.getSessionToken()
      },
      data: graphQLQuery.fetch({cartKey})
    }

    makeAjaxCall(ajaxObj);
  }

  /**
   * @function
   * @desc A function to make ajax call and update Cart Data
   * @param {object} ajaxObj Configurations to make call.
   */
  function makeAjaxCall(ajaxObj) {
    return ABBOTT.http.makeAjaxCall(ajaxObj)
      .done(function(res) {
        // @todo Handle Errors
        if(res.errors) {
          let resErrorMessage = res.errors[0].message;
		  let newCartData = res || {};
          newCartData.success = resErrorMessage;
	      //setcartData(newCartData)  --  commented for ANAPOLLO-3408

          // When un-associated cart ID found, remove cart ID and dont show the message
          if(!!resErrorMessage.match(/could not find a cart with id/gi)) {
            jQuery.cookie.json = false;
            jQuery.removeCookie('abt_cartKey', {
              path: '/',
              domain: 'abbottstore.com'
            });
            return;
          } else if (!!resErrorMessage.match(/the current user cannot perform operations on cart/gi)){
            location.href = jQuery('#logout-link').attr('href') + '?redirect=1';
            return;
          } else if (!!resErrorMessage.match(/Cart doesn't contain the/gi)){
            resErrorMessage = 'The product is being deleted from your cart.';
            location.reload();
          }

          // Show if there is any other Error
          seterrorMessage(resErrorMessage);
          setcartStatus(false);
          jQuery('#mini-cart__comp').addClass('active');
          jQuery('.abbott-minicart-item .product-quantity').removeClass('updating');

          let cookieConfig = {
            path: '/',
            domain: 'abbottstore.com'
          };
          let errorCategory;

          if(res.errors.length && res.errors[0].extensions) {
            errorCategory = res.errors[0].extensions.category;
          }

          if(errorCategory === 'errorCategory') {
            jQuery.removeCookie('abt_cartKey', cookieConfig);
          }
          return;
        }

        setcartStatus(true);
        if(res.data.cart || res.data.mergeCarts) {
          setCartDetails(res.data.cart || res.data.mergeCarts);
        }
        else if(res.data.addSimpleProductsToCart) {
          jQuery('#mini-cart__comp').addClass('active');
          jQuery('.product-remove').removeClass('disabled');
          setCartDetails(res.data.addSimpleProductsToCart.cart);
        }
        else if(res.data.removeItemFromCart) {
          jQuery('.abbott-minicart-item .product-quantity').removeClass('updating');
          jQuery('.product-remove').removeClass('disabled');
          setCartDetails(res.data.removeItemFromCart.cart);
          setcartStatus('deleted');
        }
        else if(res.data.updateCartItems) {
          jQuery('.abbott-minicart-item .product-quantity').removeClass('updating');
          jQuery('.product-remove').removeClass('disabled');
          setCartDetails(res.data.updateCartItems.cart);
        }
      });
  }

  /**
  * @function
  * @description Set Cart Data and Impose Cart Limits
  * @param {object} cartDetails to be set.
  */
  function setCartDetails(cartDetails) {
    let limitDetails = ABBOTT.utils.getLimit;
    if ((limitDetails.limit != undefined || limitDetails.limit != null) && ((limitDetails.limit - cartDetails.prices.subtotal_excluding_tax.value) < 0)) {
      cartDetails.success = [];
      cartDetails.success[0] = limitDetails.message;
      setcartData(cartDetails);
      seterrorMessage(limitDetails.message);
      setcartStatus('deleted');
    }
    else {
      setcartData(cartDetails);
      if(cartDetails.success) {
      seterrorMessage(cartDetails.success[0]);
      } else {
        seterrorMessage('');
      }
    }
    if(cartDetails.shipping_message){
        if(cartDetails.items.length > 0)
            jQuery(".notification-menu-text .abt-shipping-display-msg").text(cartDetails.shipping_message[0].message);
        else
            jQuery(".notification-menu-text .abt-shipping-display-msg").html(jQuery(".notification-menu-text .abt-shipping-display-hidden-msg").html());
    }

    if(cartDetails.items.length > 0){
        jQuery(".abbott-topbar__action-link--cart--count").removeClass("hidden");
        jQuery(".abbott-topbar__action-link--cart--count").text(cartDetails.items.length);
    }else {
        jQuery(".abbott-topbar__action-link--cart--count").addClass("hidden");
        jQuery(".abbott-topbar__action-link--cart--count").text("0");
    }

  }

  /**
   * @function
   * @desc Update the Price on the mnicart trigger
   * @param {object} price 
   */
  function updatePrice() {
    jQuery(document).find('#abbott-mini-cart-trigger #total-amount').text(' $'+ cartData.prices.subtotal_excluding_tax.value.toFixed(2));
  }

  const handleScroll = () => {
    jQuery(".abbott-minicart").toggleClass("abbott-minicart__sticky", jQuery(window).scrollTop() > 40);
  }

  jQuery(window).on("scroll", handleScroll);

  //Return MiniCart to the Root DOM
  return (
    <React.Fragment>
      <div className="abbott-minicart-header">
        <span className="abbott-minicart-header-title">My Cart</span>
        <span className="abbott-minicart-close ai-close" id="abbott-minicart-close"></span>
      </div>
      {(cartData && cartData.shipping_message && cartData.shipping_message != '') ? <ShippingBanner shippingMessage={cartData.shipping_message[0].message}/> : ''}
      {(cartData  && cartData.success && cartData.success != '') ? <MessageBox cartStatus={cartStatus} cartMessage={cartData.success}/> : ''}
      <div className="abbott-minicart-products">
        <ul className="abbott-minicart-products-list list-unstyled">
          {(cartData && cartData.items && cartData.items.length > 0) ? (
            cartData.items.map( (item, index) =>
              <CartItem cartItem={item} index={index} key={item.id} increaseCount={updateItem} decreaseCount={updateItem} deleteItem={deleteItem} updateCount={updateItem}/>
            )
          ) :
          ( <CartEmpty cartMessage={(cartData) ? cartData.cart_empty_message || "You have no items in your cart at the moment" : "You have no items in your cart at the moment"}/>)}
        </ul>
      </div>
      {(cartData && cartData.items && cartData.items.length > 0 && cartData.prices) ? (
        <CartFooter total={cartData.prices.subtotal_excluding_tax} updatePrice={updatePrice}/>
      ) : ('')}
    </React.Fragment>
  );
}

export default MiniCart;