import React from "react";

const CartEmpty = props => {
  const clickHandler = () => {
    let _target = jQuery("#start-shopping").val();
    if(_target){
        window.location.href = _target;
    }else {
        window.location.href = window.location.host + "/";
    }
  }
  return (
    <div className="abbott-minicart-products-list--empty text-center">
      <div>
        <p className="abbott-minicart-products-list--empty__title">YOUR CART IS EMPTY</p>
        <p className="abbott-minicart-products-list--empty__description">{props.cartMessage}</p>
        <button type="button" className="btn btn-primary" onClick={clickHandler}>START SHOPPING</button>
      </div>
    </div>
  );
}

export default CartEmpty;