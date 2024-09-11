import React, { useState, useEffect,useCallback } from "react";

import CartItem from "../../components/CartItem";
import CartFooter from "../../components/CartFooter";
import MessageBox from "../../components/MessageBox";
import cartGraphQLQuery from "../../services/cart.service.js";
import { getMessageForReg } from "../../common/api";
import FieldLoader from "../../components/FieldLoader";

const MiniCart = (props) => {

  const label = props.label;
  const [cartData, setcartData] = useState();
  let skuInfo = [];
  const [cartMessage, setcartMessage] = useState('');
  const [loader,setLoader] = useState([]);

  const showLoader = useCallback((id) => {
    setLoader(loader.concat([id]));
  },[loader]);

  const hideLoader = useCallback((id) => {
    const index = loader.indexOf(id);
    setLoader(loader.splice(index, 1));
  },[loader]);

  // listen for add to cart event in the site
  useEffect(() => {
    window.addEventListener("addToCart", (e) => {
      props.toggleCart();
          
      if (jQuery(window).width() < 768) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
      skuInfo = e.detail;
      addToCart(e.detail);
    });
    getCartBySession();
  }, []);

  // Set the cart badge cart items count 
  useEffect(() => {
    if (cartData && cartData.items) {
      if(cartData.items.indexOf(null) > -1){
        props.productCount(cartData.items.length -1);
      } else{
        props.productCount(cartData.items.length);
      }
      
      let array_subscription =[];
      let cartDataEcom  = cartData.items;
      cartDataEcom.map(function (item) {
        if (item && item.subscription_details !== null) {
          array_subscription.push(item.subscription_details);
        }
      });
   setPurchaserType(array_subscription.length);
   ABBOTT.main.setSocialIcons();
    }
  }, [cartData]);

  function getCartBySession() {

    let cartKey = ABBOTT.utils.getCartKey();
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
     
      $('.field-loader.field-loader-addtocart-call').show();
      let ajaxObj = {
        url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
        method: 'POST',
        
        contentType: "application/json",
        headers:
        {
          "Store": ABBOTT.config.storeName,
        },
       
        data: cartGraphQLQuery.fetch({ cartKey })
      };
      if (ABBOTT.utils.isUserLoggedIn()) {
        ajaxObj.headers.Authorization = 'Bearer ' + ABBOTT.utils.getMagentoSessionToken();
      }
      
      makeAjaxCall(ajaxObj).always(()=>{
        $("#overlay").hide();
        $('.field-loader.field-loader-addtocart-call').hide();
      });
    }
  }

  /**
  * @function
  * @desc creates Empty Cart for the session and returns the cartID
  */
  const createEmptyCart = useCallback(() => {
    $('.field-loader.field-loader-addtocart-call').show();
    let ajaxObj = {
      url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      contentType: "application/json",
      headers:
      {
        "Store": ABBOTT.config.storeName
      },
      data: cartGraphQLQuery.createEmptyCart()
    };

    return ABBOTT.http.makeAjaxCall(ajaxObj)
      .done(res => {
        var cookieConfig = {
          path: '/',
          domain: 'similac.com'
        };
        ABBOTT.cookie('abt_cartKey', res.data.createEmptyCart, cookieConfig);
        return res;
      }).fail(function() {
        $('#template.global-error p').html( getMessageForReg("GEN_ERR"));                    
        $('#template').show();
      }).always(function(){ $('.field-loader.field-loader-addtocart-call').hide();})
  },[]);


function setPurchaserType(array_subscription_length){
 
  if(array_subscription_length>0){
    window.localStorage.setItem("purchaser_type","subscription_user");
  }
  else{
    window.localStorage.removeItem("purchaser_type");
  }
}
   
jQuery('.product-card a.btn-primary, #btn-cart, #btn-schedule').click(function(e){
  jQuery(this).addClass("disabled-add-cart");
})
jQuery('.recent-order a.btn-secondary').click(function(e){
  var $selected_products = $('input[name="product"]:checked');
  if($selected_products.length>0){
  jQuery(this).addClass("disabled-add-cart");
  }
})

  /**
   * @function
   * @desc Make ajax call to Magento to Add Item to Cart
   * @param {object} prodInfo 
   */
  const addToCart = useCallback((prodInfo) => {

    let array_subscription =[];
    $('.minicart-empty p.fieldLoader-initial').removeClass("d-none").addClass("d-block");
    let ajaxObj = {
      url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      contentType: "application/json",
      headers:
      {
        "Store": ABBOTT.config.storeName,
      }
    };
   
    let cartKey;
    if (ABBOTT.utils.isUserLoggedIn()) {
      ajaxObj.headers.Authorization = 'Bearer ' + ABBOTT.utils.getMagentoSessionToken();
    }
    cartKey = ABBOTT.utils.getCartKey();

    if (!cartKey) {
      createEmptyCart()

        .done(cart => {
          cartKey = cart.data.createEmptyCart;
          ajaxObj.data = cartGraphQLQuery.addItem({ cartKey, prodInfo });
          makeAjaxCall(ajaxObj).then(function(res){
            
            jQuery('.product-card a.btn-primary').removeClass("disabled-add-cart");
            jQuery('#btn-cart').removeClass("disabled-add-cart");
            jQuery('#btn-schedule').removeClass("disabled-add-cart");
            jQuery('.recent-order a.btn-secondary').removeClass("disabled-add-cart");
            if (res.data.addSimpleProductsToCart) {
              let cartDataEcom  = res.data.addSimpleProductsToCart.cart.items;
              cartDataEcom.map(function (item) {
                if (item && item.subscription_details !== null) {
                  array_subscription.push(item.subscription_details);
                }
              });

           setPurchaserType(array_subscription.length);
            }
          }).fail(function() {
            $('#template.global-error p').html( getMessageForReg("GEN_ERR"));                       
            $('#template').show();
          }).always(function(){ $('.field-loader.field-loader-addtocart-call').hide();$('.minicart-empty p.fieldLoader-initial').addClass("d-none");})
        });
    } else {
      $('.field-loader-addtocart-call').show();
      ajaxObj.data = cartGraphQLQuery.addItem({ cartKey, prodInfo });
      makeAjaxCall(ajaxObj).then(function(res){
        
        jQuery('.product-card a.btn-primary').removeClass("disabled-add-cart");
        jQuery('#btn-cart').removeClass("disabled-add-cart");
        jQuery('#btn-schedule').removeClass("disabled-add-cart");       
        jQuery('.recent-order a.btn-secondary').removeClass("disabled-add-cart");
        if (res.data.addSimpleProductsToCart) {
          let cartDataEcom  = res.data.addSimpleProductsToCart.cart.items;
          cartDataEcom.map(function (item) {
            if (item && item.subscription_details !== null) {
              array_subscription.push(item.subscription_details);
            }
          });
          
       setPurchaserType(array_subscription.length);
          }
      }).fail(function() {
        $('#template.global-error p').html( getMessageForReg("GEN_ERR"));                     
        $('#template').show();
      }).always(function(){$('.field-loader-addtocart-call').hide();$('.minicart-empty p.fieldLoader-initial').addClass("d-none");})
    }
    
  },[]);

  /**
    * @function
    * @desc Make ajax call to Delete item from Cart
    * @param {object} id 
    * @param {*} qty 
    */
  const deleteItem = useCallback((id) => {
    let prodInfo = {
      prodId: id
    };
    let array_subscription=[];
    showLoader(id);
    let ajaxObj = {
      url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      contentType: "application/json",
      headers: {
        "Store": ABBOTT.config.storeName
      }
    }

    let cartKey;
    if (ABBOTT.utils.isUserLoggedIn()) {
      ajaxObj.headers.Authorization = 'Bearer ' + ABBOTT.utils.getMagentoSessionToken();
    }
    cartKey = ABBOTT.utils.getCartKey();

    if (cartKey) {
      ajaxObj.data = cartGraphQLQuery.deleteItem({ cartKey, prodInfo });
      makeAjaxCall(ajaxObj).then(function(res){
 
            let cartDataEcom  = res.data.removeItemFromCart.cart.items;
            cartDataEcom.map(function (item) {
              if (item && item.subscription_details !== null) {
                array_subscription.push(item.subscription_details);
              }
            });

         setPurchaserType(array_subscription.length);
          
      })
      .always(()=>{
        hideLoader(id);
      })
    }
  },[]);

  /**
   * @function
   * @desc Make ajax call to Update Cart item
   * @param {object} id 
   * @param {*} qty 
   */
  const updateItem = useCallback((id, qty) => {
    let prodInfo = {
      quantity: qty,
      prodId: id
    };

    showLoader(id);

    let ajaxObj = {
      url: ABBOTT.config.getEndpointUrl('GRAPH_QL'),
      method: 'POST',
      contentType: "application/json",
      headers: {
        "Store": ABBOTT.config.storeName

      }
    }
    let cartKey;
    if (ABBOTT.utils.isUserLoggedIn()) {
      ajaxObj.headers.Authorization = 'Bearer ' + ABBOTT.utils.getMagentoSessionToken();
    }
    cartKey = ABBOTT.utils.getCartKey();

    if (cartKey) {
      ajaxObj.data = cartGraphQLQuery.updateItem({ cartKey, prodInfo });
      makeAjaxCall(ajaxObj).always(()=>{
        hideLoader(id);
      });
    }
  },[]);

  /**
   * @function
   * @desc A function to make ajax call and update Cart Data
   * @param {object} ajaxObj Configurations to make call.
   */
  function makeAjaxCall(ajaxObj) {
    $('.field-loader.field-loader-addtocart-call').show();
    return ABBOTT.http.makeAjaxCall(ajaxObj)
      .done(function (res) {
        if (res.errors) {
          let resErrorMessage = res.errors[0].message;
          let cookieConfig = {
            path: '/',
            domain: 'similac.com'
          };
           // When un-associated cart ID found, remove cart ID and don't show the message
           if(!!resErrorMessage.match(/could not find a cart with id/gi)) {
            ABBOTT.removeCookie('abt_cartKey',cookieConfig);
            return;
          } else if (!!resErrorMessage.match(/the current user cannot perform operations on cart/gi)){
            $('#template.global-error p').html( getMessageForReg("GEN_ERR"));
            $('#template').show();
           
            return;
          } else if (!!resErrorMessage.match(/Cart doesn't contain the/gi)){
            resErrorMessage = 'The product is being deleted from your cart.';
            $('#template.global-error p').html( getMessageForReg("GEN_ERR"));
            $('#template').show();
           
          }
          else if (!!resErrorMessage.match(/Some of the products are out/gi)){
            resErrorMessage = 'Some of the products are out of stock in your cart';
            $('#template.global-error p').html(resErrorMessage);
            $('#template').show();
          }          
          
          // Show if there is any other Error
          setcartMessage([resErrorMessage]);

        }
        if (res.data.cart || res.data.mergeCarts) {
          setCartDetails(res.data.cart || res.data.mergeCarts);
        }
        else if (res.data.addSimpleProductsToCart) {
          let cartItemData = res.data.addSimpleProductsToCart.cart;
          if(skuInfo.length > 0){
            skuInfo.map((element) => {
              cartItemData.items.map(item => {
                if(item.product.sku === element.sku){
                  ABBOTT.gtm.buildAndPush.addToCart(item.product); 
                }
              });
            });
          
          } else {
            cartItemData.items.map(item => {
              if(item.product.sku === skuInfo.sku){
              ABBOTT.gtm.buildAndPush.addToCart(item.product); 
              }
            });
          }
          setCartDetails(cartItemData);
        }
        else if (res.data.removeItemFromCart) {
          setCartDetails(res.data.removeItemFromCart.cart);
        }
        else if (res.data.updateCartItems) {
          setCartDetails(res.data.updateCartItems.cart);
        }

      }).always(function(){ $('.field-loader.field-loader-addtocart-call').hide();

    })
  }

  /**
  * @function
  * @description Set Cart Data and Impose Cart Limits
  * @param {object} cartDetails to be set.
  */
  function setCartDetails(cartDetails) {
    setcartData(cartDetails);
    if (cartDetails.success) {
      setcartMessage(cartDetails.success);
    }
  }

  /**
   * Function to close cart when clicked from out side container
   * @param {event} e 
   */
  function containertoggle(e) {
    if (jQuery(window).width() < 768) {
      if (e.target.className === "minicart-container active") {
        props.toggleCart();
      }
    }
  }

  return (
    <div className={`minicart-container ${props.showCart ? "active" : ""}`}
      onClick={(e) => containertoggle(e)}>
      <div className="minicart">
        <div className="minicart-header">
          <span className="minicart-header-title">{label.titleLabel}</span>
          <span className="minicart-close" onClick={(e) => { e.stopPropagation(); props.toggleCart(); }}>
            {label.closeLabel}</span>
        </div>
        {(cartMessage !== '') ?
          <MessageBox cartMessage={cartMessage} /> : ''}
        <div className="minicart-products">
          <ul className="minicart-products-list list-unstyled">
            {(cartData && cartData.items && cartData.items.length > 0) ? (
              cartData.items.map((item, index) =>
                (item) ?
                <CartItem loader={loader.includes(item.id)} cartItem={item} index={index} key={item.id} label={label}
                  changeCount={updateItem} deleteItem={deleteItem} /> : null
                )
            ) : (
                <div className="minicart-empty">
                  <p className="minicart-empty__title">{label.emptyLabel}</p>
                  <p className="d-none fieldLoader-initial mb-4 mt-4">{<FieldLoader name="addtocart-call" loader={loader} /> || null}</p>

                  <a href={label.productsURL} className="btn btn-primary">{label.emptyButtonLabel}</a>
                </div>)}
          </ul>
          <div className={`col-auto mr-auto field-level-loader ${(cartData && cartData.items && cartData.items.length > 0)?"":"d-none"}`}>{<FieldLoader name="addtocart-call" loader={loader} /> || null}</div>

        </div>
        {(cartData && cartData.items && cartData.items.length > 0 && cartData.prices) ? (
          <CartFooter prices={cartData.prices} label={label} cartItems={cartData.items} />
        ) : ('')}
      </div>
    </div>
  );
}

export default MiniCart;