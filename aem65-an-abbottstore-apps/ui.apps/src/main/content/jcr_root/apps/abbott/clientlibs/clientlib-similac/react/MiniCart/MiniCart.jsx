import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import CartPopup from './CartPopup.jsx';
import CartSlider from './CartSlider.jsx';
import graphQLQuery from './graphql-query.js';


const MiniCart = () => {

  //Creating REACT hooks
  const [cartData, setcartData] = React.useState();
  const [cartStatus, setcartStatus] = React.useState(true);
  const [errorMessage, seterrorMessage] = React.useState('');
  const [toggleData, settoggleData] = React.useState('');
  const storeData = useSelector(state => state.storeData);
  const dispatch = useDispatch();
  const cartActionEl = document.getElementById('similac-cart-action');

  /**
   * @function
   * @description Compare two objects
   * @param {Object} storeObject 
   * @param {object} cartObject 
   */
  const deepEqual = (storeObject, cartObject) => {
    const convertToArray = Object.keys;
    const typeOfStoreObject = typeof storeObject;
    const typeOfCartObject = typeof cartObject;

    return storeObject && cartObject && typeOfStoreObject === 'object' && typeOfStoreObject === typeOfCartObject ? (
      convertToArray(storeObject).length === convertToArray(cartObject).length &&
      convertToArray(storeObject).every(key => deepEqual(storeObject[key], cartObject[key]))
    ) : (storeObject === cartObject);
  }

  // Use to render data only once
  useEffect(() => {
    getCartBySession();
  }, []);

  // Call updatePrice only on Grand-total Price update
  useEffect(() => {
    updatePrice();
    dispatch({type : "UPDATE", newcartData : cartData});
  }, [cartData]);

  // Update CartData on change of the Store Data
  useEffect(() => {
    if(!deepEqual(storeData, cartData)) {
      setcartData(storeData);
    }
  }, [storeData]);

  // Update CartData any error occurs.
  useEffect(() => {
    let newCartData = cartData || {};
    newCartData.success = errorMessage;
    setcartData(newCartData);
  }, [errorMessage]);

  // Create mutation observer to listen change in element
  let cartObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if(mutation.type === 'attributes') {
        addToCart(cartActionEl.dataset.product);
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
   * 
   */
  const setCartToggle = () => {
    if( toggleData != '') {
      settoggleData('');
    }
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
        domain: 'similacstore.com',
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
      domain: 'similacstore.com'
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
      // Handle Errors
      if(res.errors) {
        let resErrorMessage = res.errors[0].message;

        // When un-associated cart ID found, remove cart ID and dont show the message
        if(!!resErrorMessage.match(/could not find a cart with id/gi)) {
          jQuery.cookie.json = false;
          jQuery.removeCookie('abt_cartKey', {
            path: '/',
            domain: 'similacstore.com'
          });
          return;
        } else if (!!resErrorMessage.match(/the current user cannot perform operations on cart/gi)){
          location.href = jQuery('#logout-link').attr('href') + '?redirect=1';
          return;
        }

        // Proceed showing error if anything else than above
        seterrorMessage(resErrorMessage);
        setcartStatus(false);
        toggleCart();

        let cookieConfig = {
          path: '/',
          domain: 'similacstore.com'
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
        setcartData(res.data.cart || res.data.mergeCarts);
      }
      else if(res.data.addSimpleProductsToCart) {
        toggleCart();
        setcartData(res.data.addSimpleProductsToCart.cart);
      }
      else if(res.data.removeItemFromCart) {
        toggleCart();
        setcartStatus('deleted');
        setcartData(res.data.removeItemFromCart.cart);
      }
    });
  }

  /**
   * @function
   * @desc Toggle Cart Slider
   */
  function toggleCart() {
    if ( !jQuery('.similac-minicart__wrapper').hasClass('open')) {
      settoggleData('open');
      jQuery('#mini-cart__comp--mobile').find('.similac-minicart-trigger').trigger('click');
    }
  }

  /**
   * @function
   * @desc Update the Price on the mnicart trigger
   * @param {object} price 
   */
  function updatePrice() {
    jQuery(document).find('.similac-header__cart--count').text((cartData && cartData.items && cartData.items.length) ? cartData.items[0].quantity : '0');
  }

  //Return MiniCart to the Root DOM
  return (
    <>
      <CartPopup cartData={cartData} deleteItem={deleteItem}/>
      <CartSlider cartData={cartData} deleteItem={deleteItem}  cartStatus={cartStatus} toggleData={toggleData} setCartToggle={setCartToggle}/>
    </>
  );
}

export default MiniCart;