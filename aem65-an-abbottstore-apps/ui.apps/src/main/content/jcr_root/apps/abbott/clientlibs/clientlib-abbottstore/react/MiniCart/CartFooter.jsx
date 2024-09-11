import React from "react";

/**
 * @function
 * @desc Return the Cart Footer with total and Subtotal to minicart
 * @param {object} props 
 */
const CartFooter = props => {
  const baseUrl = ABBOTT.config.getEndpointUrl('BASE');
  
  return (
    <div className="abbott-minicart-footer">
      <div className="minicart-subtotal">
        <span className="minicart-subtotal-label">Cart Subtotal</span>
        <span className="minicart-subtotal-price">{props.total.value.toFixed(2)}</span>
      </div>
      <div className="goto-cart">
        <a href={baseUrl + '/checkout/cart'} alt="Goto cart">
          View and edit Cart
        </a>
      </div>
      <div className={(ABBOTT.utils.getLimit.limit && ((ABBOTT.utils.getLimit.limit - props.total.value) < 0)) ? 'checkout disabled' : 'checkout'}>
        <a href={(ABBOTT.utils.getLimit.limit && ((ABBOTT.utils.getLimit.limit - props.total.value) < 0)) ? '#' : baseUrl + '/checkout'} id='minicart-checkout'>Checkout</a>
      </div>
    </div>
  );
}

export default CartFooter;