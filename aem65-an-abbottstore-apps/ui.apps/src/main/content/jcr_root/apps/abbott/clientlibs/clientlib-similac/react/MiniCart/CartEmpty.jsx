import React from "react";

const CartEmpty = props => {
  return (
  <div className="cart-popup-empty">
    {props.cartMessage}
  </div>
  );
}

export default CartEmpty;