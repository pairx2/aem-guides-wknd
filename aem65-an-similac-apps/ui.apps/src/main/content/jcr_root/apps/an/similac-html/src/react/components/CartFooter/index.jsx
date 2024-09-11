import React from "react";

/**
 * @function
 * @desc Return the Cart Footer with total and Subtotal to mini cart
 * @param {object} props 
 */
const CartFooter = props => {
  const baseUrl = ABBOTT.config.getEndpointUrl('BASE');
  let discountMsg = "";
  let discountAmt = 0;
  let isOutofStock = false;
  if(props.prices.discounts){
    props.prices.discounts.map(disc => {
      discountMsg = discountMsg + (discountMsg ? ', ' : '') + disc.label;
      discountAmt = discountAmt + disc.amount.value
    });
    props.cartItems && props.cartItems.forEach((item) => {
      if(item && item.product.stock_status == 'OUT_OF_STOCK'){
        isOutofStock = true;
      }
    });
  }

  return (
    <div className="minicart-footer">
      <div className="minicart-footer-subtotal">

        <div>
          <span className="minicart-footer-subtotal-label">{props.label.subTotalLabel}</span>
          <span className="minicart-footer-subtotal-price">${props.prices.subtotal_excluding_tax.value.toFixed(2)}</span>
        </div>
        {props.prices.discounts && props.prices.discounts.length > 0 && <>
          <div>
            <span className="minicart-footer-subtotal-label">{discountMsg}</span>
            <span className="minicart-footer-subtotal-price">-${discountAmt.toFixed(2)}</span>
          </div>
          <div>
            <span className="minicart-footer-subtotal-label">{props.label.totalLabel}</span>
            <span className="minicart-footer-subtotal-price">${props.prices.grand_total.value.toFixed(2)}</span>
          </div>
        </>}
      </div>
      <div className="goto-cart">
        <a href={props.label.cartURL} alt="Goto cart">
          {props.label.editLabel}
        </a>
      </div>
      {(!isOutofStock) ?
      <div className="checkout">
        <a className="btn btn-primary" href={props.label.checkoutURL}>{props.label.buttonLabel}</a>
      </div> : null
      }
    </div>
  );
}

export default CartFooter;