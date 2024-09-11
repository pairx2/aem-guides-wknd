import React from "react";
import CartEmpty from './CartEmpty.jsx'

const CartPopup = props => {
  const magentoBaseUrl = ABBOTT.config.getEndpointUrl('BASE')
  const aemBaseUrl = jQuery('#aem-base-url').val();

  const deleteItem = (e, id) => {
    e.stopPropagation();
    props.deleteItem(id);
  };

  return (
    <div className="cart-popup__wrapper">
      <div className="cart-popup-close">
        <i className="ai-close"></i>
      </div>
      {(props.cartData && props.cartData.items && props.cartData.items.length > 0) ? (
        <div className="cart-popup-product">
            <div className="cart-popup-description">
                <div className="description-label">Total Item(s)</div>
                <div className="description-label justify-content-end">Cart Subtotal</div>
                <div className="description-label count">{props.cartData.items[0].quantity}</div>
                <div className="description-label justify-content-end subtotal">${props.cartData.prices.subtotal_excluding_tax.value.toFixed(2)}</div>
                <a className="checkout" href={magentoBaseUrl + '/checkout'}>Subscribe and Checkout</a>
            </div>
            <div className="cart-popup-product-details">
            {(props.cartData && props.cartData.items.length > 0) ?
                    ( props.cartData.items.map( (item, idx) =>  
                      <div className="cart-popup-item" key={idx}>
                      <div className="cart-popup-image-wrapper">
                        <img className="cart-popup-image" src={aemBaseUrl + item.dam_images} alt={item.product.image.label}/>
                      </div>
                      <div className="cart-popup-details-wrapper">
                        <div className="cart-popup-details">
                          <div className="cart-popup-details-name">{item.product.name}</div>
                          <div className="cart-popup-details-size">{item.product.size_or_weight}</div>
                          <div className="cart-popup-details-price">${item.product.price.toFixed(2)}</div>
                          <div className="cart-popup-details-qty">{item.quantity}
                            <div className="cart-popup-delete">
                              <i className="ai-bin" onClick={(e) => deleteItem(e, item.id)}></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    )) : ''}
            </div>
            <a href={magentoBaseUrl + '/checkout/cart'} alt="View Cart" className="cart-popup-cart-link">VIEW Cart
            </a>
        </div>
        ) : (<CartEmpty cartMessage={(props.message) ? props.message : "You have no items in your shopping cart."} />)}
    </div>
  );
}

export default CartPopup;