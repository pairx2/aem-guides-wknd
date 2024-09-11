import React from "react";

const ShippingBanner = props => {
  return (
    <div className="abbott-minicart-shipping-banner">
        <span className="abbott-minicart-shipping-message">{props.shippingMessage}</span>
    </div>
  );
}

export default ShippingBanner;